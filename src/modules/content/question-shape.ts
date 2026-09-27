// Question editor shape: schema, limits and types. No server imports, so client forms can use it too.

import { z } from "zod";

export const MAX_STEM = 5000;
export const MAX_OPTION = 1000;
export const MAX_EXPLANATION = 10000;

export const OPTION_LETTERS = ["a", "b", "c", "d", "e"] as const;

export const LANGS = ["en", "hi"] as const;
export type Lang = (typeof LANGS)[number];

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = OPTION_LETTERS.length;

const bilingual = <T extends z.ZodType>(t: T) => z.object({ en: t, hi: t });

/** What the editor form sends. Text for a disabled language is ignored. */
export const questionInputSchema = z.object({
  topicId: z.string(), // "" = not chosen yet (reported with the other form errors)
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  sourceType: z.enum(["ORIGINAL", "PYQ"]),
  sourceExamId: z.string().nullable(),
  sourceYear: z.number().int().nullable(),
  correctIndex: z.number().int(), // -1 = not chosen yet
  langs: bilingual(z.boolean()),
  stem: bilingual(z.string().max(MAX_STEM, `Question is longer than ${MAX_STEM} characters`)),
  explanation: bilingual(z.string().max(MAX_EXPLANATION, "Explanation is too long")),
  options: z
    .array(bilingual(z.string().max(MAX_OPTION, `An option is longer than ${MAX_OPTION} characters`)))
    .min(MIN_OPTIONS, `At least ${MIN_OPTIONS} options are required`)
    .max(MAX_OPTIONS, `At most ${MAX_OPTIONS} options are allowed`),
});

export type QuestionInput = z.infer<typeof questionInputSchema>;

/** Blank form state for a new question. */
export function emptyQuestionInput(): QuestionInput {
  return {
    topicId: "",
    difficulty: "MEDIUM",
    sourceType: "ORIGINAL",
    sourceExamId: null,
    sourceYear: null,
    correctIndex: -1,
    langs: { en: true, hi: true },
    stem: { en: "", hi: "" },
    explanation: { en: "", hi: "" },
    options: Array.from({ length: 4 }, () => ({ en: "", hi: "" })),
  };
}
