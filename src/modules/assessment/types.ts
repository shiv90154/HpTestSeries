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

/** Where "Pay now" leads for a paid test: the cheapest active product that unlocks it. */
export type DemoBuy = { href: string; title: string; priceInPaise: number; validityDays: number | null };

/** Present on a paper that is a free demo of a paid test (only the free questions are ever included). */
export type DemoInfo = {
  /** questions in the full test */
  totalQuestions: number;
  /** locked questions still behind the paywall, per section (same order as `Paper.sections`) */
  lockedPerSection: number[];
  lockedTotal: number;
  buy: DemoBuy | null;
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
  demo?: DemoInfo;
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
  /** Set when this is the result of a free demo: the rest of the test is locked. */
  demo?: { totalQuestions: number; lockedTotal: number; buy: DemoBuy | null };
};
