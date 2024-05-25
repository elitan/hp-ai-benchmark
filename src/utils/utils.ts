import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateObject, generateText } from "ai";
import { z } from "zod";

export async function solve(messages: CoreMessage[]) {
  const { text, ...rest } = await generateText({
    model: openai("gpt-4o"),
    system:
      "Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.",
    messages,
  });

  const { object, ...rest2 } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D"]),
    }),
    prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, eller D) är angivet?`,
  });

  return object.answer;
}
