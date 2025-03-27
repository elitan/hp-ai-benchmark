// import { openai } from "@ai-sdk/openai";
import {
  CoreMessage,
  LanguageModel,
  generateObject,
  generateText,
  streamText,
  tool,
} from "ai";
import { z } from "zod";
import { Exam } from "../exams/2024-spring";
import { openai } from "@ai-sdk/openai";
import * as mathjs from "mathjs";
import { anthropic } from "@ai-sdk/anthropic";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SolveTasksProps {
  /**
   * Array of exam tasks to be solved
   */
  tasks: Exam[];
  /**
   * Model configuration
   */
  model: {
    /**
     * The language model to use (can be any AI SDK model)
     */
    model: LanguageModel | any;
    /**
     * Whether the model supports vision/image processing
     */
    vision: boolean;
    /**
     * Whether to skip the system prompt
     */
    skipSystemPrompt: boolean;
    /**
     * Types of tasks the model should solve
     */
    type: {
      /**
       * Whether to solve verbal reasoning tasks
       */
      verbal: boolean;
      /**
       * Whether to solve mathematical tasks
       */
      math: boolean;
    };
  };
  /**
   * Optional delay in milliseconds between processing tasks
   */
  delayBetweenTasks?: number;
}

export async function solveTasks(props: SolveTasksProps) {
  const { model, tasks, delayBetweenTasks = 10000 } = props;

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
    } = await solveTask({ system, messages, model });

    // for (let i = 20; i > 0; i--) {
    //   process.stdout.write(`\r--- waiting ${i} seconds`);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }
    // process.stdout.write("\r" + " ".repeat(30) + "\r"); // Clear the line

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

    // Add delay between tasks (except after the last task)
    if (question <= tasks.length && delayBetweenTasks > 0) {
      console.log(
        `Waiting ${delayBetweenTasks / 1000} seconds before next task...`
      );
      await new Promise((resolve) => setTimeout(resolve, delayBetweenTasks));
    }
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
    skipSystemPrompt: boolean;
  };
}

export async function solveTask(props: SolveTaskProps) {
  const { system, messages, model } = props;

  const { text, ...rest } = await generateText({
    model: model.model,
    system: model.skipSystemPrompt ? undefined : system,
    messages,
    tools: {
      calculate: tool({
        description: `Ett verktyg för att utvärdera matematiska uttryck. Exempeluttryck: '2 + 2', '3 * 4', '5 / 2', 'sqrt(9)'`,
        parameters: z.object({
          expression: z.string(),
        }),
        execute: async ({ expression }) => {
          console.log("--- evaluating expression::: ", expression);
          let res;
          try {
            res = mathjs.evaluate(expression);
          } catch (e) {
            console.log(e);
            res = "error. please check the expression and try again.";
          }
          return res;
        },
      }),
    },
    maxTokens: 2000,
    toolChoice: "auto",
    maxSteps: 10,
  });

  console.log(text);

  let answer = "no-answer-found";
  try {
    const { object, ...rest2 } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      schema: z.object({
        answer: z.enum(["A", "B", "C", "D", "E", "no-answer-found"]),
      }),
      prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, D, eller E) är angivet?`,
    });
    answer = object.answer;
  } catch (e) {
    console.log(e);
  }

  return {
    skip: false,
    text,
    answer,
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
