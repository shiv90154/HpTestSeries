// The free HPAS mock tests that are seeded. Adding a test = adding it here.

import { balanceAnswers, type PatwariQuestion } from "../patwari/types";
import { mock1 } from "./mock1";
import { mock2 } from "./mock2";

export const HPAS_FREE_SECTIONS = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
  { name: "General Studies", nameHi: "सामान्य अध्ययन" },
] as const;

const INSTRUCTIONS =
  "Free HPAS prelims-style mock: 30 questions, 30 marks, 30 minutes. Each correct answer gives 1 mark and each wrong answer " +
  "deducts 0.25 marks. Sections: Himachal GK (10) and General Studies (20: history, polity, geography, economy, science). " +
  "You can switch between Hindi and English at any time.";

export type FreeTestDef = {
  slug: string;
  title: string;
  titleHi: string;
  durationSec: number;
  instructions: string;
  questions: PatwariQuestion[];
};

export const HPAS_FREE_TESTS: FreeTestDef[] = [mock1, mock2].map((questions, i) => ({
  slug: `hpas-free-mock-${i + 1}`,
  title: `HPAS Free Mock Test ${i + 1}`,
  titleHi: `एचपीएएस फ्री मॉक टेस्ट ${i + 1}`,
  durationSec: 30 * 60,
  instructions: INSTRUCTIONS,
  questions: balanceAnswers(questions),
}));
