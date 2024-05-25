import "dotenv/config";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const openai = createOpenAI();
const model = openai("gpt-4o");

async function main() {
  const { text, ...rest } = await generateText({
    model: openai("gpt-4o"),
    system:
      "Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL("https://i.imgur.com/55xZzew.png"),
          },
        ],
      },
      {
        role: "user",
        content: "Lös denna uppgiften.",
      },
    ],
  });

  console.log({ text });
  console.log(rest);

  const { object, ...rest2 } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D"]),
    }),
    prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, eller D) är angivet?`,
  });

  console.log({ object });
  console.log(rest2);
}

main();
