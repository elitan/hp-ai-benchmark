import { describe, expect, test } from "bun:test";
import {
  InvalidFinalAnswerError,
  RequestTimeoutError,
  parseFinalAnswer,
  runWithRetries,
} from "./solver";

describe("parseFinalAnswer", function () {
  test("accepts one final answer marker", function () {
    expect(parseFinalAnswer("Lösning\nFINAL_ANSWER: C")).toBe("C");
  });

  test("rejects a missing marker", function () {
    expect(function () {
      parseFinalAnswer("Jag väljer C.");
    }).toThrow("FINAL_ANSWER");
  });

  test("rejects an answer marker that is not final", function () {
    expect(function () {
      parseFinalAnswer("FINAL_ANSWER: A\nFörklaring");
    }).toThrow("FINAL_ANSWER");
  });

  test("rejects repeated answer markers", function () {
    expect(function () {
      parseFinalAnswer("FINAL_ANSWER: A\nFINAL_ANSWER: B");
    }).toThrow("FINAL_ANSWER");
  });

  test("rejects a malformed answer marker", function () {
    expect(function () {
      parseFinalAnswer("FINAL_ANSWER: F");
    }).toThrow("FINAL_ANSWER");
  });
});

describe("runWithRetries", function () {
  test("retries a timeout and returns a later success", async function () {
    let attempts = 0;
    const result = await runWithRetries(
      "test request",
      { requestTimeoutMs: 100, maxRetries: 1 },
      async function () {
        attempts++;
        if (attempts === 1) {
          throw new RequestTimeoutError("test request", 100);
        }
        return "ok";
      },
    );

    expect(result).toBe("ok");
    expect(attempts).toBe(2);
  });

  test("does not retry a non-transient failure", async function () {
    let attempts = 0;

    await expect(
      runWithRetries(
        "test request",
        { requestTimeoutMs: 100, maxRetries: 2 },
        async function () {
          attempts++;
          throw new Error("invalid final answer");
        },
      ),
    ).rejects.toThrow("invalid final answer");

    expect(attempts).toBe(1);
  });

  test("retries an invalid final answer", async function () {
    let attempts = 0;

    const result = await runWithRetries(
      "test request",
      { requestTimeoutMs: 100, maxRetries: 1 },
      async function () {
        attempts++;
        if (attempts === 1) {
          throw new InvalidFinalAnswerError("missing final answer");
        }
        return "ok";
      },
    );

    expect(result).toBe("ok");
    expect(attempts).toBe(2);
  });

  test("retries an invalid provider JSON response", async function () {
    let attempts = 0;

    const result = await runWithRetries(
      "test request",
      { requestTimeoutMs: 100, maxRetries: 1 },
      async function () {
        attempts++;
        if (attempts === 1) {
          throw new Error("Invalid JSON response");
        }
        return "ok";
      },
    );

    expect(result).toBe("ok");
    expect(attempts).toBe(2);
  });
});
