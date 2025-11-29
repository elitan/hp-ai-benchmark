import {
  Experimental_Agent as Agent,
  stepCountIs,
  tool,
  generateObject,
  generateText,
  CoreMessage,
} from "ai";
import { z } from "zod";
import * as mathjs from "mathjs";
import { Exam } from "./exams/2024-spring";

import * as fs from "fs";
import * as path from "path";

const TEST_IMAGE_PATH = path.join(__dirname, "../assets/test-vision.png");

export interface ExamResult {
  model: string;
  vision: boolean;
  verbal: { correct: number; total: number };
  math: { correct: number; total: number; skipped: number };
  inputTokens: number;
  outputTokens: number;
  timeMs: number;
}

interface RunExamProps {
  tasks: Exam[];
  model: string;
  vision: boolean;
  delayBetweenTasks?: number;
}

const tools = {
  calculate: tool({
    description: `ANVÄND ALLTID detta verktyg för matematiska beräkningar. Räkna aldrig i huvudet.
Exempel: '2 + 2', '3 * 4', 'sqrt(9)', '3^2 + 4^2', '(5/2) * 100'`,
    inputSchema: z.object({
      expression: z.string().describe("Matematiskt uttryck att beräkna"),
    }),
    execute: async ({ expression }: { expression: string }) => {
      try {
        return mathjs.evaluate(expression);
      } catch {
        return "error";
      }
    },
  }),
};

function createAgent(model: string, system: string, skipSystemPrompt: boolean) {
  return new Agent({
    model,
    system: skipSystemPrompt ? undefined : system,
    tools,
    stopWhen: stepCountIs(10),
    toolChoice: "auto",
  });
}

async function extractAnswer(text: string): Promise<string> {
  try {
    const { object } = await generateObject({
      model: "anthropic/claude-3-haiku-20240307",
      schema: z.object({
        answer: z.enum(["A", "B", "C", "D", "E", "no-answer-found"]),
      }),
      prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, D, eller E) är angivet?`,
    });
    return object.answer;
  } catch (e) {
    console.log(e);
    return "no-answer-found";
  }
}

function hasImageContent(messages: CoreMessage[]): boolean {
  for (const message of messages) {
    if (Array.isArray(message.content)) {
      for (const part of message.content) {
        if (part.type === "image") return true;
      }
    }
  }
  return false;
}

function extractQuestionText(messages: CoreMessage[]): string {
  for (const msg of messages) {
    if (msg.role === "user") {
      if (typeof msg.content === "string") {
        return msg.content.trim();
      }
      if (Array.isArray(msg.content)) {
        const textParts = msg.content
          .filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text);
        return textParts.join(" ").trim();
      }
    }
  }
  return "(no question text)";
}

export async function detectVision(model: string): Promise<boolean> {
  process.stdout.write(`  Detecting vision support... `);
  try {
    await generateText({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image: fs.readFileSync(TEST_IMAGE_PATH) },
            { type: "text", text: "Say OK" },
          ],
        },
      ],
    });
    console.log("OK");
    return true;
  } catch {
    console.log("NOT SUPPORTED");
    return false;
  }
}

export async function runExam(props: RunExamProps): Promise<ExamResult> {
  const { model, vision, tasks, delayBetweenTasks = 0 } = props;
  const startTime = Date.now();

  const result: ExamResult = {
    model,
    vision,
    verbal: { correct: 0, total: 0 },
    math: { correct: 0, total: 0, skipped: 0 },
    inputTokens: 0,
    outputTokens: 0,
    timeMs: 0,
  };

  let question = 1;
  const totalQuestions = tasks.length;

  for (const task of tasks) {
    const isVisionTask = hasImageContent(task.messages);
    const tag = `${task.type.toUpperCase()}${isVisionTask ? "/VISION" : ""}`;

    console.log(
      `\n[${String(question).padStart(2, "0")}/${totalQuestions}] ${tag}`,
    );
    console.log("─".repeat(70));

    const questionText = extractQuestionText(task.messages);
    const preview = questionText.slice(0, 150).replace(/\n/g, " ");
    console.log(`  Q: ${preview}${questionText.length > 150 ? "..." : ""}`);

    if (!vision && isVisionTask) {
      console.log(`  >> SKIP: vision not supported`);
      if (task.type === "math") result.math.skipped++;
      question++;
      continue;
    }

    const agent = createAgent(model, task.system, false);
    const providerOptions =
      model.startsWith("xai/") && task.type === "math"
        ? { xai: { reasoningEffort: "medium" as const } }
        : undefined;
    const agentResult = await agent.generate({
      messages: task.messages,
      providerOptions,
    });

    for (const step of agentResult.steps || []) {
      const reasoning = (step as { reasoning?: unknown }).reasoning;
      if (reasoning && typeof reasoning === "string") {
        console.log(`  [REASONING]`);
        for (const line of reasoning.split("\n")) {
          console.log(`    ${line}`);
        }
      } else if (reasoning) {
        console.log(`  [REASONING]`);
        console.log(`    ${JSON.stringify(reasoning, null, 2).split("\n").join("\n    ")}`);
      }
      if (step.toolCalls && step.toolCalls.length > 0) {
        for (const tc of step.toolCalls) {
          const args = "args" in tc ? tc.args : "input" in tc ? tc.input : {};
          console.log(
            `  [TOOL] ${tc.toolName}(${JSON.stringify(args).slice(0, 50)})`,
          );
        }
      }
      if (step.text) {
        const lines = step.text.split("\n");
        for (const line of lines) {
          console.log(`  ${line}`);
        }
      }
    }

    const answer = await extractAnswer(agentResult.text);
    const correct = answer === task.answer;

    console.log("");
    if (correct) {
      console.log(`  RESULT: ${answer} [CORRECT]`);
      result[task.type].correct++;
    } else {
      console.log(`  RESULT: ${answer} [WRONG - expected ${task.answer}]`);
    }

    result[task.type].total++;
    const usage = agentResult.usage as {
      promptTokens?: number;
      completionTokens?: number;
      inputTokens?: number;
      outputTokens?: number;
    };
    result.inputTokens += usage?.promptTokens ?? usage?.inputTokens ?? 0;
    result.outputTokens += usage?.completionTokens ?? usage?.outputTokens ?? 0;
    question++;

    const vPct = result.verbal.total
      ? Math.round((100 * result.verbal.correct) / result.verbal.total)
      : 0;
    const mPct = result.math.total
      ? Math.round((100 * result.math.correct) / result.math.total)
      : 0;
    console.log(
      `  >> SCORE: V:${result.verbal.correct}/${result.verbal.total}(${vPct}%) M:${result.math.correct}/${result.math.total}(${mPct}%)`,
    );

    if (question <= tasks.length && delayBetweenTasks > 0) {
      console.log(`Waiting ${delayBetweenTasks / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delayBetweenTasks));
    }
  }

  result.timeMs = Date.now() - startTime;
  return result;
}
