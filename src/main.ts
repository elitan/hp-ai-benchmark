import "dotenv/config";
import { solve } from "./utils/utils";
import { CoreMessage } from "ai";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

async function main() {
  const problemImages = [
    "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2-kvant/1.png",
    "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2-kvant/2.png",
    "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2-kvant/3.png",
  ];

  for (const problemImage of problemImages) {
    const messages: CoreMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(problemImage),
          },
        ],
      },
      {
        role: "user",
        content: "Lös denna uppgiften.",
      },
    ];

    const r = await solve(messages);

    console.log("");

    console.log(`Problem: ${problemImage}`);
    console.log("ANSWER:");
    console.log(r);
  }
}

main();
