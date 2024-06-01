// import { openai } from "@ai-sdk/openai";
import {
  CoreMessage,
  LanguageModel,
  generateObject,
  generateText,
  streamText,
} from "ai";
import { z } from "zod";
import { Exam } from "../exams/2024-spring";
import { ollama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SolveTasksProps {
  tasks: Exam[];
  model: {
    model: LanguageModel | any;
    vision: boolean;
    type: {
      verbal: boolean;
      math: boolean;
    };
  };
}

export async function solveTasks(props: SolveTasksProps) {
  const { model, tasks } = props;

  let question = 1;
  let answers = {
    verbal: {
      correct: 0,
      total: 0,
    },
    math: {
      correct: 0,
      total: 0,
    },
  };
  let tokensUsed = 0;

  for (const task of tasks) {
    console.log("");
    console.log(`Question ${question}:`);
    console.log(JSON.stringify(task.messages, null, 2));

    const { system, messages } = task;

    if (!model.vision) {
      let skipTask = false;

      for (const message of messages) {
        if (typeof message.content !== "string") {
          skipTask = true;
          break;
        }
      }

      if (skipTask) {
        console.log(
          `Skipping task because it's a vision task and the current model doesn't support vision tasks`
        );
        continue;
      }
    }

    if (model.type.verbal && !task.type.includes("verbal")) {
      console.log(`Skipping task because it's a math task`);
      continue;
    }

    if (model.type.math && !task.type.includes("math")) {
      console.log(`Skipping task because it's a verbal task`);
      continue;
    }

    const {
      text,
      answer,
      usage: { totalTokens },
    } = await solveTaskStream({ system, messages, model });

    // console.log("");
    // console.log("");
    // console.log(text);
    console.log("");

    /**
     * Answer checking
     */
    if (answer === task.answer) {
      console.log(`Correct answer! ${answer}`);
      answers[task.type].correct++;
    } else {
      console.log(`Wrong answer! Expected: ${task.answer}, got: ${answer}`);
    }

    answers[task.type].total++;

    console.log(`Correct answers:`);
    console.log(`Verbal: ${answers.verbal.correct}/${answers.verbal.total}`);
    console.log(`Math: ${answers.math.correct}/${answers.math.total}`);

    tokensUsed += totalTokens;
    question++;
  }

  return {
    answers,
    tokensUsed,
  };
}

interface SolveTaskProps {
  system: string;
  messages: CoreMessage[];
  model: {
    model: LanguageModel;
    vision: boolean;
  };
}

export async function solveTask(props: SolveTaskProps) {
  const { system, messages, model } = props;

  const { text, ...rest } = await generateText({
    model: model.model,
    system,
    messages,
  });

  const { object, ...rest2 } = await generateObject({
    model: ollama("llama3:70b"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D", "E"]),
    }),
    prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, D, eller E) är angivet?`,
  });

  return {
    skip: false,
    text,
    answer: object.answer,
    ...rest,
  };
}

export async function solveTaskStream(props: SolveTaskProps) {
  const { system, messages, model } = props;

  const result = await streamText({
    model: model.model,
    system,
    messages,
    temperature: 0.7,
  });
  let completeText = "";

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
    completeText += textPart;
  }

  const { object } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D", "E"]),
    }),
    prompt: `LÖSNING: ${completeText}\n\nFRÅGA:\nVilket svar (A, B, C, eller D) är angivet?`,
  });

  return {
    text: completeText,
    answer: object.answer,
    usage: {
      totalTokens: 0,
    },
  };
}
