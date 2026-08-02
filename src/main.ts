import { getExam2024Spring } from "./exams/2024-spring";
import { requireOpenRouterConfiguration } from "./openrouter";
import { runExam, detectToolUse, detectVision, ExamResult } from "./solver";
import "dotenv/config";

function optionValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value.`);
  }
  return value;
}

function usage(): string {
  return [
    "Usage: bun run start -- --model <provider/model> [--limit <count>] [--request-timeout-ms <ms>] [--max-retries <count>] [--checkpoint <path>] [--resume]",
    "       OPENROUTER_MODEL=<provider/model> bun run start",
  ].join("\n");
}

function integerOption(name: string, defaultValue: number): number {
  const value = optionValue(name);
  if (value === undefined) return defaultValue;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return parsed;
}

const MODEL = optionValue("--model") ?? process.env.OPENROUTER_MODEL;

const LIMIT = optionValue("--limit");
const REQUEST_TIMEOUT_MS = integerOption("--request-timeout-ms", 90_000);
const MAX_RETRIES = integerOption("--max-retries", 2);
const CHECKPOINT_PATH =
  optionValue("--checkpoint") ?? ".hp-ai-benchmark-checkpoint.json";
const RESUME = process.argv.includes("--resume");

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function formatTokens(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1)}k`;
}

function printLeaderboard(results: ExamResult[]) {
  const sorted = [...results].sort((a, b) => {
    const aPct =
      (a.verbal.correct + a.math.correct) /
      (a.verbal.total + a.math.total || 1);
    const bPct =
      (b.verbal.correct + b.math.correct) /
      (b.verbal.total + b.math.total || 1);
    return bPct - aPct;
  });

  console.log("\n" + "=".repeat(100));
  console.log("  BENCHMARK RESULTS");
  console.log("=".repeat(100));
  console.log("");
  console.log(
    `  ${"MODEL".padEnd(30)} ${"VERBAL".padStart(8)} ${"MATH".padStart(8)} ${"TOTAL".padStart(8)} ${"TIME".padStart(8)} ${"IN-TOK".padStart(10)} ${"OUT-TOK".padStart(10)}`,
  );
  console.log("  " + "-".repeat(95));

  for (const r of sorted) {
    const total = r.verbal.correct + r.math.correct;
    const totalMax = r.verbal.total + r.math.total;
    const totalPct = totalMax > 0 ? Math.round((100 * total) / totalMax) : 0;
    const vPct =
      r.verbal.total > 0
        ? Math.round((100 * r.verbal.correct) / r.verbal.total)
        : 0;
    const mPct =
      r.math.total > 0 ? Math.round((100 * r.math.correct) / r.math.total) : 0;

    const name = r.model.length > 30 ? r.model.slice(0, 27) + "..." : r.model;
    const verbal = `${vPct}%`;
    const math = r.math.skipped > 0 ? `${mPct}% *` : `${mPct}%`;
    const totalStr = `${totalPct}%`;

    console.log(
      `  ${name.padEnd(30)} ${verbal.padStart(8)} ${math.padStart(8)} ${totalStr.padStart(8)} ${formatTime(r.timeMs).padStart(8)} ${formatTokens(r.inputTokens).padStart(10)} ${formatTokens(r.outputTokens).padStart(10)}`,
    );
  }

  console.log("  " + "-".repeat(95));

  const hasSkipped = sorted.some((r) => r.math.skipped > 0);
  if (hasSkipped) {
    console.log("  * math tasks skipped (model lacks vision support)");
  }

  console.log("\n" + "=".repeat(100));
}

async function main() {
  const model = MODEL;
  if (!model) {
    throw new Error(`An OpenRouter model slug is required.\n${usage()}`);
  }
  requireOpenRouterConfiguration();

  console.log("\n" + "=".repeat(60));
  console.log("  HP-AI-BENCHMARK v1.0");
  console.log("  Swedish Hogskoleprovet (University Aptitude Test)");
  console.log("=".repeat(60));

  let tasks = getExam2024Spring();

  if (LIMIT !== undefined) {
    const limit = Number(LIMIT);
    if (!Number.isInteger(limit) || limit <= 0) {
      throw new Error("--limit must be a positive integer.");
    }
    console.log(`\n  MODE: test (${limit} questions)`);
    tasks = tasks.slice(0, limit);
  } else {
    console.log(`\n  MODE: full exam (${tasks.length} questions)`);
  }

  console.log(`  MODEL: ${model}`);
  console.log(`  REQUEST TIMEOUT: ${REQUEST_TIMEOUT_MS}ms`);
  console.log(`  MAX RETRIES: ${MAX_RETRIES}`);
  console.log(`  CHECKPOINT: ${CHECKPOINT_PATH}${RESUME ? " (resume)" : ""}`);

  const results: ExamResult[] = [];

  console.log("\n" + "=".repeat(60));
  console.log(`  MODEL: ${model}`);
  console.log("=".repeat(60));

  const requestSettings = {
    requestTimeoutMs: REQUEST_TIMEOUT_MS,
    maxRetries: MAX_RETRIES,
  };
  const vision = await detectVision(model, requestSettings);
  await detectToolUse(model, requestSettings);
  console.log(`  CAPABILITIES: vision=${vision ? "yes" : "no"}`);
  console.log("");

  const result = await runExam({
    tasks,
    model,
    vision,
    ...requestSettings,
    checkpointPath: CHECKPOINT_PATH,
    resume: RESUME,
    delayBetweenTasks: 0,
  });
  results.push(result);

  const total = result.verbal.correct + result.math.correct;
  const totalMax = result.verbal.total + result.math.total;
  const pct = totalMax > 0 ? Math.round((100 * total) / totalMax) : 0;

  console.log("\n" + "-".repeat(60));
  console.log(`  COMPLETE: ${model}`);
  console.log(`  SCORE: ${total}/${totalMax} (${pct}%)`);
  console.log(`  TIME: ${formatTime(result.timeMs)}`);
  console.log(
    `  TOKENS: input=${formatTokens(result.inputTokens)} output=${formatTokens(result.outputTokens)}`,
  );

  printLeaderboard(results);
}

main();
