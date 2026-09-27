// Single-question editor input: validation + normalization (same rules as the CSV import).
// Pure, so every rule is unit-tested. Server-side only (hashing uses node:crypto); forms use ./question-shape.

import { LANGS, OPTION_LETTERS, questionInputSchema, type Lang, type QuestionInput } from "./question-shape";
import { questionTextHash } from "./text-hash";

export type NormalizedQuestion = {
  topicId: string;
  difficulty: QuestionInput["difficulty"];
  sourceType: QuestionInput["sourceType"];
  sourceExamId: string | null;
  sourceYear: number | null;
  correctIndex: number;
  contents: { lang: Lang; stem: string; explanation: string | null }[];
  /** options[i] = texts of option i per language */
  options: { lang: Lang; text: string }[][];
  textHash: string;
};

export type QuestionValidation = { ok: true; question: NormalizedQuestion } | { ok: false; errors: string[] };

export function validateQuestionInput(raw: unknown, ctx: { currentYear: number }): QuestionValidation {
  const parsed = questionInputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, errors: [...new Set(parsed.error.issues.map((i) => i.message))] };
  const input = parsed.data;
  const errors: string[] = [];
  if (!input.topicId) errors.push("Choose a topic");

  const langs = LANGS.filter((l) => input.langs[l]);
  if (langs.length === 0) errors.push("Enable English, Hindi, or both");

  const contents: NormalizedQuestion["contents"] = [];
  for (const lang of langs) {
    const label = lang === "en" ? "English" : "Hindi";
    const stem = input.stem[lang].trim();
    if (!stem) errors.push(`${label}: question text is required`);
    input.options.forEach((o, i) => {
      if (!o[lang].trim()) errors.push(`${label}: option ${OPTION_LETTERS[i].toUpperCase()} is empty`);
    });
    contents.push({ lang, stem, explanation: input.explanation[lang].trim() || null });
  }

  if (input.correctIndex < 0 || input.correctIndex >= input.options.length) errors.push("Mark the correct answer");

  let sourceExamId: string | null = null;
  let sourceYear: number | null = null;
  if (input.sourceType === "PYQ") {
    if (!input.sourceExamId) errors.push("PYQ needs the exam it was asked in");
    else sourceExamId = input.sourceExamId;
    const y = input.sourceYear;
    if (y === null || y < 1990 || y > ctx.currentYear) errors.push(`PYQ needs a year between 1990 and ${ctx.currentYear}`);
    else sourceYear = y;
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    question: {
      topicId: input.topicId,
      difficulty: input.difficulty,
      sourceType: input.sourceType,
      sourceExamId,
      sourceYear,
      correctIndex: input.correctIndex,
      contents,
      options: input.options.map((o) => langs.map((lang) => ({ lang, text: o[lang].trim() }))),
      // Same primary language as the CSV import (English first), so duplicates are caught across both paths.
      textHash: questionTextHash(contents[0].stem),
    },
  };
}
