import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateObject, generateText } from "ai";
import { z } from "zod";

interface SolveProps {
  system: string;
  messages: CoreMessage[];
}

export async function solve(props: SolveProps) {
  const { system, messages } = props;

  const { text, ...rest } = await generateText({
    model: openai("gpt-4o"),
    system,
    messages,
  });

  const { object, ...rest2 } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      answer: z.enum(["A", "B", "C", "D", "E"]),
    }),
    prompt: `LÖSNING: ${text}\n\nFRÅGA:\nVilket svar (A, B, C, eller D) är angivet?`,
  });

  return {
    text,
    answer: object.answer,
    ...rest,
  };
}
