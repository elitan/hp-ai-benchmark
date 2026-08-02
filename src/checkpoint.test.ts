import { afterEach, describe, expect, test } from "bun:test";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  loadCheckpoint,
  saveCheckpoint,
  validateCheckpoint,
} from "./checkpoint";

const temporaryDirectories: string[] = [];

afterEach(function () {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function createCheckpointPath(): string {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "hp-benchmark-test-"),
  );
  temporaryDirectories.push(directory);
  return path.join(directory, "checkpoint.json");
}

describe("checkpoint", function () {
  test("round-trips and validates a matching checkpoint", function () {
    const checkpointPath = createCheckpointPath();
    saveCheckpoint(checkpointPath, {
      version: 1,
      model: "example/model",
      vision: true,
      taskCount: 2,
      nextQuestionIndex: 1,
      completed: false,
      result: {
        model: "example/model",
        vision: true,
        verbal: { correct: 1, total: 1 },
        math: { correct: 0, total: 0, skipped: 0 },
        inputTokens: 10,
        outputTokens: 5,
        timeMs: 100,
      },
    });

    const checkpoint = loadCheckpoint(checkpointPath);
    validateCheckpoint(checkpoint, "example/model", true, 2);
    expect(checkpoint.nextQuestionIndex).toBe(1);
  });

  test("rejects a checkpoint for a different model", function () {
    const checkpointPath = createCheckpointPath();
    saveCheckpoint(checkpointPath, {
      version: 1,
      model: "example/model",
      vision: false,
      taskCount: 1,
      nextQuestionIndex: 0,
      completed: false,
      result: {
        model: "example/model",
        vision: false,
        verbal: { correct: 0, total: 0 },
        math: { correct: 0, total: 0, skipped: 0 },
        inputTokens: 0,
        outputTokens: 0,
        timeMs: 0,
      },
    });

    expect(function () {
      validateCheckpoint(
        loadCheckpoint(checkpointPath),
        "other/model",
        false,
        1,
      );
    }).toThrow("Checkpoint does not match");
  });
});
