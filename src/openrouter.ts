import { createOpenRouter } from "@openrouter/ai-sdk-provider";

let openrouter: ReturnType<typeof createOpenRouter> | undefined;

export function requireOpenRouterConfiguration(): void {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is required. Add it to .env or export it before running the benchmark.",
    );
  }
}

function getOpenRouter() {
  if (openrouter) return openrouter;

  const apiKey = process.env.OPENROUTER_API_KEY;
  requireOpenRouterConfiguration();

  openrouter = createOpenRouter({ apiKey: apiKey!, compatibility: "strict" });
  return openrouter;
}

/** Create an AI SDK model from an OpenRouter model slug, e.g. openai/gpt-4.1-mini. */
export function openRouterModel(model: string) {
  return getOpenRouter()(model);
}
