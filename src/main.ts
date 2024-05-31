import "dotenv/config";
import { getExam2024Spring } from "./exams/2024-spring";
import { solveTasks } from "./utils/utils";
import { ollama } from "ollama-ai-provider";

async function main() {
  const tasks = getExam2024Spring();

  const model = {
    model: ollama("llama3:8b"),
    vision: false,
  };

  const { answers, tokensUsed } = await solveTasks({ tasks, model });

  console.log("");
  console.log(`Correct answers:`);
  console.log(`Verbal: ${answers.verbal.correct}/${answers.verbal.total}`);
  console.log(`Math: ${answers.math.correct}/${answers.math.total}`);
  console.log(`Total tokens used: ${tokensUsed}`);
}

main();
