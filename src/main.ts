import "dotenv/config";
import { getExam2024Spring } from "./exams/2024-spring";
import { solveTasks } from "./utils/utils";
import { anthropic } from "@ai-sdk/anthropic";

async function main() {
  const tasks = getExam2024Spring();

  const model = {
    model: anthropic("claude-3-opus-20240229"),
    vision: true,
    type: {
      verbal: true,
      math: false,
    },
  };

  const { answers, tokensUsed } = await solveTasks({ tasks, model });

  console.log("");
  console.log(`Correct answers:`);
  console.log(`Verbal: ${answers.verbal.correct}/${answers.verbal.total}`);
  console.log(`Math: ${answers.math.correct}/${answers.math.total}`);
  console.log(`Total tokens used: ${tokensUsed}`);
}

main();
