import { CoreMessage } from "ai";

interface Exam {
  systemPrompt: string;
  messages: CoreMessage[];
  answer: string;
}

const SYSTEM_PROMPT_WORD_COMPREHENSION = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

Välj rätt synonym från de angivna alternativen.

Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ (A, B, C, eller D).`;

const SYSTEM_PROMPT_MATH = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

För varje fråga, läs texten och välj sedan det bästa svaret från de tillgängliga alternativen. Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ.`;

/**
 * https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/
 */
export function getExam2024Spring() {
  const exam: Exam[] = [
    /**
     * test pass 1
     *
     * Word comprehension
     */
    {
      systemPrompt: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**dispyt**
- A. brist
- B. gräl
- C. tvekan
- D. besvikelse
- E. undantag
`,
        },
      ],
      answer: "B",
    },

    /**
     * test pass 2
     *
     * Math
     */
    {
      systemPrompt: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/1.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
  ];

  return exam;
}
