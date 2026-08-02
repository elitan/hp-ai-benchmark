# Högskoleprovet AI Benchmark

This repository contains a benchmark for AI models on the Swedish university admissions test, Högskoleprovet.

## Run the benchmark

The benchmark uses [OpenRouter](https://openrouter.ai/) and accepts its model slugs, such as `openai/gpt-4.1-mini` or `anthropic/claude-sonnet-4`.

1. Install dependencies with `bun install`.
2. Copy `.env-example` to `.env` and set `OPENROUTER_API_KEY`.
3. Run a model:

```bash
bun run start -- --model openai/gpt-4.1-mini
```

You may instead set `OPENROUTER_MODEL` in `.env`. The benchmarked model both solves and supplies the scoreable answer; there is no separate answer-judge model or request.

Each preflight and question attempt has a 90-second deadline and each transient failure is retried twice with exponential backoff. Adjust those defaults when needed:

```bash
bun run start -- --model openai/gpt-4.1-mini --request-timeout-ms 120000 --max-retries 3
```

Progress is atomically saved after each scored or skipped question in `.hp-ai-benchmark-checkpoint.json` (ignored by Git). To continue an incomplete matching run, use:

```bash
bun run start -- --model openai/gpt-4.1-mini --resume
```

Use `--checkpoint <path>` to choose another checkpoint file. A checkpoint mismatch (model, vision capability, or task selection) fails clearly rather than mixing results. Timeouts, transient provider failures, and unscoreable direct answers use the bounded retry policy; after retries are exhausted, the benchmark stops without scoring that question and the checkpoint can be resumed after the issue is resolved.

For a small local check, add `--limit 3`:

```bash
bun run start -- --model openai/gpt-4.1-mini --limit 3
```

The benchmark probes vision and calculator tool use before scoring. A model that explicitly rejects image input runs only non-vision questions and reports the skipped questions. Any other vision probe failure, or an unavailable calculator-tool interface, stops the run instead of producing a misleading score. After reasoning and any calculator calls, each answer must end with exactly `FINAL_ANSWER: X` (where `X` is A–E); missing, repeated, malformed, or non-final markers stop the run rather than being guessed or scored ambiguously.

## Results

### Högskoleprovet 2024 Spring

| Model                      | Verbal | Verbal Points | Math  | Math Points | Total |
| -------------------------- | :----: | :-----------: | :---: | :---------: | :---: |
| gemini-3-pro-preview       | 58/60  |      2.0      | 79/80 |     2.0     |  2.0  |
| xiaomi/mimo-v2.5           | 56/60  |      1.9      | 75/80 |     1.9     |  1.9  |
| gpt-4.1                    | 58/60  |      2.0      | 64/80 |     1.4     |  1.7  |
| gpt-4.1-mini               | 58/60  |      2.0      | 64/80 |     1.4     |  1.7  |
| claude-3-5-sonnet-20241022 | 58/60  |      2.0      | 61/80 |     1.3     | 1.65  |
| claude-3-5-sonnet-20240620 | 58/60  |      2.0      | 59/80 |     1.3     | 1.65  |
| gpt-4o                     | 58/60  |      2.0      | 59/80 |     1.3     | 1.65  |
| claude-4-sonnet-20250514   | 57/60  |      1.9      | 60/80 |     1.3     | 1.65  |
| gemini-2.0-flash-exp       | 57/60  |      1.9      | 61/80 |     1.3     |  1.6  |
| gpt-turbo                  | 57/60  |      1.9      | 47/80 |     1.0     | 1.45  |
| claude-3-opus-20240229     | 58/60  |      2.0      | 39/80 |     0.8     |  1.4  |
| gpt-4o-mini                | 55/60  |      1.8      | 46/80 |     1.0     |  1.4  |
| o3-mini                    | 55/60  |      1.8      | x/80  |     xx      |   x   |
| gpt-4.1-nano               | 48/60  |      1.0      | 41/80 |     0.8     |  0.9  |
| claude-3-5-haiku-20241022  | 58/60  |      2.0      |   -   |      -      |   -   |
| gemini-pro-vision          | 56/60  |      1.9      |   -   |      -      |   -   |
| claude-3-sonnet-20240229   | 55/60  |      1.8      |   -   |      -      |   -   |
| gemini-1.5-flash-latest    | 54/60  |      1.7      |   -   |      -      |   -   |
| claude-3-haiku-20240307    | 53/60  |      1.7      |   -   |      -      |   -   |
| gpt-3.5-turbo              | 51/60  |      1.6      |   -   |      -      |   -   |
| llama3-70b                 | 50/60  |      1.5      |   -   |      -      |   -   |
| llama3-7b                  | 31/60  |      0.8      |   -   |      -      |   -   |

Xiaomi MiMo-V2.5 completed the full 140-question run: 131/140 correct (94%), including verbal 56/60 (93%) and math/vision 75/80 (94%). The leaderboard scales the 60-question verbal result to the 80-question normeringstabell: 56/60 becomes 75/80 after rounding, which maps to 1.9; 75/80 quantitative also maps to 1.9. Its final score is therefore 1.90. It took about 129.6 minutes and reported 420,076 input and 92,249 output solver tokens; cost was unavailable. The run recovered from several bounded timeouts, malformed answers, and transient invalid-JSON responses without replaying checkpointed questions.

#### Test

[https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/](https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/)

- https://www.studera.nu/globalassets/hogskoleprovet/normeringstabeller/normering-vt-2023-25-mars/norm23a_verb.pdf
- https://www.studera.nu/globalassets/hogskoleprovet/normeringstabeller/normering-vt-2023-25-mars/norm23a_kvant.pdf
