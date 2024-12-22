import { google } from "@ai-sdk/google";
import { getExam2024Spring } from "./exams/2024-spring";
import { solveTasks } from "./utils/utils";
import "dotenv/config";

async function main() {
  const tasks = getExam2024Spring();

  const model = {
    model: google("gemini-2.0-flash-exp"),
    vision: true,
    skipSystemPrompt: false,
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
