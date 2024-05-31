import { createOpenAI } from "@ai-sdk/openai";
import "dotenv/config";

export const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
