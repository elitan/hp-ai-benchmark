import {
  Experimental_Agent as Agent,
  stepCountIs,
  tool,
  generateText,
  CoreMessage,
} from "ai";
import { z } from "zod";
import * as mathjs from "mathjs";
import { Exam } from "./exams/2024-spring";
import { openRouterModel } from "./openrouter";
import {
  BenchmarkCheckpoint,
  loadCheckpoint,
  saveCheckpoint,
  validateCheckpoint,
} from "./checkpoint";

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
  requestTimeoutMs: number;
  maxRetries: number;
  checkpointPath?: string;
  resume?: boolean;
  delayBetweenTasks?: number;
}

export interface RequestSettings {
  requestTimeoutMs: number;
  maxRetries: number;
}

const FINAL_ANSWER_INSTRUCTION = `Efter att du har resonerat klart och eventuellt använt verktyg måste du avsluta ditt svar med exakt en egen sista rad i detta format:
FINAL_ANSWER: X

Ersätt X med exakt ett svarsalternativ: A, B, C, D eller E. Skriv inte den här markören någon annanstans i svaret och skriv inget efter den.`;

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

function createAgent(
  model: string,
  system: string,
  skipSystemPrompt: boolean,
  abortSignal: AbortSignal,
) {
  return new Agent({
    model: openRouterModel(model),
    system: skipSystemPrompt
      ? undefined
      : `${system}\n\n${FINAL_ANSWER_INSTRUCTION}`,
    tools,
    stopWhen: stepCountIs(10),
    toolChoice: "auto",
    abortSignal,
    maxRetries: 0,
  });
}

export function parseFinalAnswer(text: string): "A" | "B" | "C" | "D" | "E" {
  const output = text.trimEnd();
  const matches = [...output.matchAll(/^FINAL_ANSWER:[ \t]*([A-E])[ \t]*$/gm)];
  const finalMarker = matches[0];

  if (
    matches.length !== 1 ||
    !finalMarker ||
    finalMarker.index + finalMarker[0].length !== output.length
  ) {
    throw new Error(
      "Model response must end with exactly one `FINAL_ANSWER: X` line, where X is A, B, C, D, or E. The question was not scored.",
    );
  }

  return finalMarker[1] as "A" | "B" | "C" | "D" | "E";
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

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export class RequestTimeoutError extends Error {
  constructor(label: string, timeoutMs: number) {
    super(`${label} timed out after ${timeoutMs}ms.`);
    this.name = "RequestTimeoutError";
  }
}

export class InvalidFinalAnswerError extends Error {
  readonly isRetryable = true;

  constructor(message: string) {
    super(message);
    this.name = "InvalidFinalAnswerError";
  }
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof RequestTimeoutError) return true;

  if (error && typeof error === "object") {
    const retryable = (error as { isRetryable?: unknown }).isRetryable;
    if (typeof retryable === "boolean") return retryable;
  }

  return /fetch failed|network|timed out|timeout|rate limit|invalid json|\b(408|429|502|503)\b/i.test(
    errorMessage(error),
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export async function runWithRetries<T>(
  label: string,
  settings: RequestSettings,
  operation: (abortSignal: AbortSignal) => Promise<T>,
): Promise<T> {
  for (let attempt = 0; attempt <= settings.maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(function () {
      controller.abort();
    }, settings.requestTimeoutMs);

    try {
      return await operation(controller.signal);
    } catch (error) {
      const timedOut = controller.signal.aborted;
      const failure = timedOut
        ? new RequestTimeoutError(label, settings.requestTimeoutMs)
        : error;
      const canRetry =
        attempt < settings.maxRetries && isRetryableError(failure);

      if (!canRetry) throw failure;

      const delayMs = Math.min(1000 * 2 ** attempt, 8000);
      console.log(
        `  >> RETRY: ${label} failed (${errorMessage(failure)}). Retrying in ${delayMs / 1000}s (${attempt + 1}/${settings.maxRetries})...`,
      );
      await sleep(delayMs);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`${label} failed without producing a result.`);
}

function isVisionUnsupported(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase();
  return (
    (message.includes("image") ||
      message.includes("vision") ||
      message.includes("multimodal")) &&
    (message.includes("not support") ||
      message.includes("unsupported") ||
      message.includes("not available") ||
      message.includes("invalid content"))
  );
}

export async function detectVision(
  model: string,
  settings: RequestSettings,
): Promise<boolean> {
  process.stdout.write(`  Detecting vision support... `);
  try {
    await runWithRetries(
      "vision preflight",
      settings,
      async function (abortSignal) {
        await generateText({
          model: openRouterModel(model),
          maxRetries: 0,
          abortSignal,
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
      },
    );
    console.log("OK");
    return true;
  } catch (error) {
    if (isVisionUnsupported(error)) {
      console.log("NOT SUPPORTED (vision questions will be skipped)");
      return false;
    }
    console.log("ERROR");
    throw new InvalidFinalAnswerError(
      `Could not determine vision support for ${model}: ${errorMessage(error)}`,
    );
  }
}

export async function detectToolUse(
  model: string,
  settings: RequestSettings,
): Promise<void> {
  process.stdout.write(`  Detecting tool-use support... `);
  try {
    const result = await runWithRetries(
      "tool-use preflight",
      settings,
      async function (abortSignal) {
        return generateText({
          model: openRouterModel(model),
          tools,
          toolChoice: "required",
          prompt: "Call the calculate tool with the expression 1 + 1.",
          maxRetries: 0,
          abortSignal,
        });
      },
    );
    if (result.toolCalls.length === 0) {
      throw new Error("The model returned without calling the required tool.");
    }
    console.log("OK");
  } catch (error) {
    console.log("NOT SUPPORTED");
    throw new Error(
      `Model ${model} cannot be benchmarked because calculator tool use is unavailable: ${errorMessage(error)}`,
    );
  }
}

export async function runExam(props: RunExamProps): Promise<ExamResult> {
  const {
    model,
    vision,
    tasks,
    requestTimeoutMs,
    maxRetries,
    checkpointPath,
    resume = false,
    delayBetweenTasks = 0,
  } = props;
  const startTime = Date.now();

  const emptyResult: ExamResult = {
    model,
    vision,
    verbal: { correct: 0, total: 0 },
    math: { correct: 0, total: 0, skipped: 0 },
    inputTokens: 0,
    outputTokens: 0,
    timeMs: 0,
  };

  const checkpoint = loadRunCheckpoint(
    checkpointPath,
    resume,
    model,
    vision,
    tasks.length,
  );
  const result = checkpoint?.result ?? emptyResult;
  const initialTimeMs = result.timeMs;

  const totalQuestions = tasks.length;

  if (checkpoint?.completed) {
    console.log(`Resumed completed checkpoint: ${checkpointPath}`);
    return result;
  }

  for (
    let taskIndex = checkpoint?.nextQuestionIndex ?? 0;
    taskIndex < tasks.length;
    taskIndex++
  ) {
    const question = taskIndex + 1;
    const task = tasks[taskIndex];

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
      persistCheckpoint(
        checkpointPath,
        model,
        vision,
        tasks.length,
        taskIndex + 1,
        result,
        initialTimeMs,
        startTime,
      );
      continue;
    }

    let solvedQuestion;
    try {
      solvedQuestion = await runWithRetries(
        `question ${question}/${totalQuestions}`,
        { requestTimeoutMs, maxRetries },
        async function (abortSignal) {
          const agent = createAgent(model, task.system, false, abortSignal);
          const agentResult = await agent.generate({ messages: task.messages });
          return { agentResult, answer: parseFinalAnswer(agentResult.text) };
        },
      );
    } catch (error) {
      persistCheckpoint(
        checkpointPath,
        model,
        vision,
        tasks.length,
        taskIndex,
        result,
        initialTimeMs,
        startTime,
        errorMessage(error),
      );
      throw new Error(
        `Question ${question}/${totalQuestions} failed after ${maxRetries + 1} attempt(s). Progress was saved${checkpointPath ? ` to ${checkpointPath}` : ""}. Resume with --resume. ${errorMessage(error)}`,
      );
    }

    const { agentResult, answer } = solvedQuestion;

    for (const step of agentResult.steps || []) {
      const reasoning = (step as { reasoning?: unknown }).reasoning;
      if (reasoning && typeof reasoning === "string") {
        console.log(`  [REASONING]`);
        for (const line of reasoning.split("\n")) {
          console.log(`    ${line}`);
        }
      } else if (reasoning) {
        console.log(`  [REASONING]`);
        console.log(
          `    ${JSON.stringify(reasoning, null, 2).split("\n").join("\n    ")}`,
        );
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
    persistCheckpoint(
      checkpointPath,
      model,
      vision,
      tasks.length,
      taskIndex + 1,
      result,
      initialTimeMs,
      startTime,
      undefined,
      taskIndex + 1 === tasks.length,
    );

    const vPct = result.verbal.total
      ? Math.round((100 * result.verbal.correct) / result.verbal.total)
      : 0;
    const mPct = result.math.total
      ? Math.round((100 * result.math.correct) / result.math.total)
      : 0;
    console.log(
      `  >> SCORE: V:${result.verbal.correct}/${result.verbal.total}(${vPct}%) M:${result.math.correct}/${result.math.total}(${mPct}%)`,
    );

    if (taskIndex + 1 < tasks.length && delayBetweenTasks > 0) {
      console.log(`Waiting ${delayBetweenTasks / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delayBetweenTasks));
    }
  }

  result.timeMs = initialTimeMs + Date.now() - startTime;
  return result;
}

function loadRunCheckpoint(
  checkpointPath: string | undefined,
  resume: boolean,
  model: string,
  vision: boolean,
  taskCount: number,
): BenchmarkCheckpoint | undefined {
  if (!checkpointPath || !resume) return undefined;

  const checkpoint = loadCheckpoint(checkpointPath);
  validateCheckpoint(checkpoint, model, vision, taskCount);
  return checkpoint;
}

function persistCheckpoint(
  checkpointPath: string | undefined,
  model: string,
  vision: boolean,
  taskCount: number,
  nextQuestionIndex: number,
  result: ExamResult,
  initialTimeMs: number,
  startTime: number,
  lastError?: string,
  completed = false,
): void {
  if (!checkpointPath) return;

  result.timeMs = initialTimeMs + Date.now() - startTime;
  saveCheckpoint(checkpointPath, {
    version: 1,
    model,
    vision,
    taskCount,
    nextQuestionIndex,
    result,
    completed,
    lastError,
  });
}
