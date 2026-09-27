// Shapes shared by the server and the CBT client. The candidate paper never contains answers.

import { z } from "zod";

export type Bilingual = { en?: string; hi?: string };

export type PaperQuestion = {
  id: string;
  stem: Bilingual;
  options: { id: string; text: Bilingual }[];
};

export type PaperSection = {
  id: string;
  name: string;
  nameHi: string | null;
  marksCorrect: number;
  marksWrong: number;
  questions: PaperQuestion[];
};

export type Paper = {
  slug: string;
  title: string;
  titleHi: string | null;
  durationSec: number;
  instructions: string | null;
  isFree: boolean;
  languages: ("en" | "hi")[];
  sections: PaperSection[];
};

/** Answers submitted by the client: only saved answers count (real CBT behaviour). */
export const answersSchema = z
  .record(
    z.string().max(64),
    z.object({
      o: z.string().max(64).optional(),
      t: z.number().int().min(0).max(24 * 3600).optional(),
      m: z.boolean().optional(),
    }),
  )
  .refine((a) => Object.keys(a).length <= 500, "Too many answers");

export type SubmittedAnswers = z.infer<typeof answersSchema>;

export type ResultQuestion = {
  id: string;
  number: number;
  section: string;
  stem: Bilingual;
  options: { id: string; text: Bilingual }[];
  correctOptionId: string;
  chosenOptionId: string | null;
  explanation: Bilingual;
  timeSec: number;
  topic: string | null;
};

export type ResultData = {
  test: { slug: string; title: string; titleHi: string | null; durationSec: number };
  attemptId: string | null;
  submittedAt: string;
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeSpentSec: number;
  rank: { rank: number; total: number; percentile: number; topScore: number; avgScore: number } | null;
  isFirstAttempt: boolean;
  sections: { name: string; score: number; maxScore: number; correct: number; wrong: number; skipped: number; timeSpentSec: number }[];
  topics: { name: string; correct: number; wrong: number; skipped: number }[];
  questions: ResultQuestion[];
};
