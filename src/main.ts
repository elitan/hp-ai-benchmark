import "dotenv/config";
import { getExam2024Spring } from "./exams/2024-spring";
import { solve } from "./utils/utils";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

async function main() {
  const tasks = getExam2024Spring();

  let question = 1;
  let correctAnswers = 0;

  for (const task of tasks) {
    console.log("");
    console.log(`Question ${question}:`);
    console.log(task.messages);

    const answer = await solve(task.system, task.messages);

    if (answer === task.answer) {
      console.log(`Correct answer! ${answer}`);
      correctAnswers++;
    } else {
      console.log(`Wrong answer! Expected: ${task.answer}, got: ${answer}`);
    }

    question++;
  }

  console.log("");
  console.log(`Correct answers: ${correctAnswers}/${tasks.length}`);
}

main();
