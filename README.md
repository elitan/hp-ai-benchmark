# Högskoleprovet AI Benchmark

This repository contains a benchmark for AI models on the Swedish university admissions test, Högskoleprovet.

## Results

### Högskoleprovet 2024 Spring

| Model                          | Vision | Verbal | Verbal Points | Math  | Math Points | Total |
| ------------------------------ | :----: | :----: | :-----------: | :---: | :---------: | :---: |
| gpt-4o                         |  Yes   | 58/60  |      2.0      | 53/80 |     1.1     | 1.55  |
| gpt-turbo                      |  Yes   | 57/60  |      1.9      |   -   |      -      |   -   |
| models/gemini-pro-vision       |   No   | 56/60  |      1.9      |   -   |      -      |   -   |
| models/gemini-1.5-flash-latest |   No   | 54/60  |      1.7      |   -   |      -      |   -   |
| gpt-3.5-turbo                  |   No   | 51/60  |      1.6      |   -   |      -      |   -   |
| llama3-70b                     |   No   | 50/60  |      1.5      |   -   |      -      |   -   |
| llama3-7b                      |   No   | 31/60  |      0.8      |   -   |      -      |   -   |
| claude-3-haiku-20240307        |   No   |   -    |       -       |   -   |      -      |   -   |
| claude-3-sonnet-20240229       |   No   |   -    |       -       |   -   |      -      |   -   |
| claude-3-opus-20240229         |   No   |   -    |       -       |   -   |      -      |   -   |

#### Test

[https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/](https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/)

- https://www.studera.nu/globalassets/hogskoleprovet/normeringstabeller/normering-vt-2023-25-mars/norm23a_verb.pdf
- https://www.studera.nu/globalassets/hogskoleprovet/normeringstabeller/normering-vt-2023-25-mars/norm23a_kvant.pdf
