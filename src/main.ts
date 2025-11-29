import { getExam2024Spring } from "./exams/2024-spring";
import { runExam, detectVision, ExamResult } from "./solver";
import "dotenv/config";

// ============================================
// CONFIGURATION
// ============================================
const MODEL = "xai/grok-4-fast-reasoning";
// ============================================

const LIMIT = process.argv.includes("--limit")
  ? parseInt(process.argv[process.argv.indexOf("--limit") + 1] || "3")
  : undefined;

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
  console.log("\n" + "=".repeat(60));
  console.log("  HP-AI-BENCHMARK v1.0");
  console.log("  Swedish Hogskoleprovet (University Aptitude Test)");
  console.log("=".repeat(60));

  let tasks = getExam2024Spring();

  if (LIMIT) {
    console.log(`\n  MODE: test (${LIMIT} questions)`);
    tasks = tasks.slice(0, LIMIT);
  } else {
    console.log(`\n  MODE: full exam (${tasks.length} questions)`);
  }

  console.log(`  MODEL: ${MODEL}`);

  const results: ExamResult[] = [];

  console.log("\n" + "=".repeat(60));
  console.log(`  MODEL: ${MODEL}`);
  console.log("=".repeat(60));

  const vision = await detectVision(MODEL);
  console.log(`  CAPABILITIES: vision=${vision ? "yes" : "no"}`);
  console.log("");

  const result = await runExam({
    tasks,
    model: MODEL,
    vision,
    delayBetweenTasks: 0,
  });
  results.push(result);

  const total = result.verbal.correct + result.math.correct;
  const totalMax = result.verbal.total + result.math.total;
  const pct = totalMax > 0 ? Math.round((100 * total) / totalMax) : 0;

  console.log("\n" + "-".repeat(60));
  console.log(`  COMPLETE: ${MODEL}`);
  console.log(`  SCORE: ${total}/${totalMax} (${pct}%)`);
  console.log(`  TIME: ${formatTime(result.timeMs)}`);
  console.log(
    `  TOKENS: input=${formatTokens(result.inputTokens)} output=${formatTokens(result.outputTokens)}`,
  );

  printLeaderboard(results);
}

main();
