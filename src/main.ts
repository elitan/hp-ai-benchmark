import { getExam2024Spring } from "./exams/2024-spring";
import { solveTasks } from "./utils/utils";
import { anthropic } from "@ai-sdk/anthropic";
import "dotenv/config";

async function main() {
  const tasks = getExam2024Spring();

  const model = {
    model: anthropic("claude-3-5-haiku-20241022"),
    vision: true,
    type: {
      verbal: false,
      math: true,
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
