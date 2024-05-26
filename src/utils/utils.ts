import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateObject, generateText } from "ai";
import { z } from "zod";

export async function solve(systemPrompt: string, messages: CoreMessage[]) {
  const { text, ...rest } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  const { object, ...rest2 } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D", "E"]),
    }),
    prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, eller D) är angivet?`,
  });

  return object.answer;
}
