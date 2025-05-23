import { getExam2024Spring } from "./exams/2024-spring";
import { solveTasks } from "./utils/utils";
import "dotenv/config";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

async function main() {
  const tasks = getExam2024Spring();

  const model = {
    model: anthropic("claude-sonnet-4-20250514"),
    vision: true,
    skipSystemPrompt: false,
    type: {
      verbal: true,
      math: true,
    },
  };

  const { answers, tokensUsed } = await solveTasks({
    tasks,
    model,
    delayBetweenTasks: 0,
  });

  console.log("");
  console.log(`Correct answers:`);
  console.log(`Verbal: ${answers.verbal.correct}/${answers.verbal.total}`);
  console.log(`Math: ${answers.math.correct}/${answers.math.total}`);
  console.log(`Total tokens used: ${tokensUsed}`);
}

main();
