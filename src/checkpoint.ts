import * as fs from "fs";
import * as path from "path";
import type { ExamResult } from "./solver";

const CHECKPOINT_VERSION = 1;

export interface BenchmarkCheckpoint {
  version: number;
  model: string;
  vision: boolean;
  taskCount: number;
  nextQuestionIndex: number;
  result: ExamResult;
  completed: boolean;
  lastError?: string;
}

export function loadCheckpoint(filePath: string): BenchmarkCheckpoint {
  const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (
    !parsed ||
    typeof parsed !== "object" ||
    (parsed as { version?: unknown }).version !== CHECKPOINT_VERSION
  ) {
    throw new Error(`Invalid benchmark checkpoint: ${filePath}`);
  }
  return parsed as BenchmarkCheckpoint;
}

export function saveCheckpoint(
  filePath: string,
  checkpoint: BenchmarkCheckpoint,
): void {
  const directory = path.dirname(filePath);
  fs.mkdirSync(directory, { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(checkpoint, null, 2)}\n`, {
    mode: 0o600,
  });
  fs.renameSync(temporaryPath, filePath);
}

export function validateCheckpoint(
  checkpoint: BenchmarkCheckpoint,
  model: string,
  vision: boolean,
  taskCount: number,
): void {
  if (
    checkpoint.model !== model ||
    checkpoint.vision !== vision ||
    checkpoint.taskCount !== taskCount
  ) {
    throw new Error(
      "Checkpoint does not match this model, vision capability, or task selection. Start a new run or choose the matching checkpoint.",
    );
  }
}
