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
  let tokensUsed = 0;

  for (const task of tasks.slice(-3)) {
    console.log("");
    console.log(`Question ${question}:`);
    console.log(task.messages);

    const { system, messages } = task;
    const {
      answer,
      text,
      usage: { totalTokens },
    } = await solve({ system, messages });

    console.log(text);

    if (answer === task.answer) {
      console.log(`Correct answer! ${answer}`);
      correctAnswers++;
    } else {
      console.log(`Wrong answer! Expected: ${task.answer}, got: ${answer}`);
    }

    tokensUsed += totalTokens;
    question++;
  }

  console.log("");
  console.log(`Correct answers: ${correctAnswers}/${tasks.length}`);
  console.log(`Total tokens used: ${tokensUsed}`);
}

main();
