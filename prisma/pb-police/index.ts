// Punjab Police Constable (Advt. 01 of 2026) mock tests for pbtestseries.in. Paper I is 100 questions in 120 minutes
// with no negative marking, as reported for the 2026 CBT. Plan and test counts: docs/PB-TEST-SERIES-PLAN.md §4.2.
// The Punjabi questions are in Gurmukhi and should be checked by a Punjabi speaker.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { policeFreeMock } from "./free-mock";
import { policeMock1 } from "./mock1";
import { policeMock2 } from "./mock2";

export const PAPER1_SECTIONS = [
  { name: "General Awareness", nameHi: "सामान्य जागरूकता", count: 35 },
  { name: "Quantitative Aptitude", nameHi: "संख्यात्मक योग्यता", count: 20 },
  { name: "Mental Ability & Reasoning", nameHi: "मानसिक योग्यता एवं तर्कशक्ति", count: 20 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 10 },
  { name: "Punjabi", nameHi: "पंजाबी", count: 10 },
  { name: "Digital Literacy", nameHi: "डिजिटल साक्षरता", count: 5 },
] as const;

export const POLICE_FREE_MOCK_SLUG = "punjab-police-constable-free-mock-1";

const paper1 = (slug: string, title: string, titleHi: string, questions: PatwariQuestion[], isFree = false): TestDef => ({
  slug,
  title,
  titleHi,
  type: "MOCK",
  durationSec: 120 * 60,
  isFree,
  marksWrong: 0,
  instructions:
    `Paper I of the Punjab Police Constable CBT: ${questions.length} questions, ${questions.length} marks, 120 minutes. ` +
    "General Awareness 35, Quantitative Aptitude 20, Reasoning 20, English 10, Punjabi 10 and Digital Literacy 5, as reported for the 2026 test. " +
    "Each correct answer gives 1 mark and there is no negative marking. Paper II, the qualifying Punjabi paper, is not covered in this test. " +
    "You can switch between English and Hindi at any time.",
  sections: PAPER1_SECTIONS.map(({ name, nameHi }) => ({ name, nameHi })),
  questions,
});

export const POLICE_FREE_TEST: TestDef = paper1(
  POLICE_FREE_MOCK_SLUG,
  "Punjab Police Constable Free Mock Test 1 (Paper I)",
  "पंजाब पुलिस कांस्टेबल फ़्री मॉक टेस्ट 1 (पेपर I)",
  policeFreeMock,
  true,
);

const PAID_MOCKS: PatwariQuestion[][] = [policeMock1, policeMock2];

export const POLICE_PAID_TESTS: TestDef[] = PAID_MOCKS.map((questions, i) =>
  paper1(`punjab-police-constable-mock-${i + 1}`, `Punjab Police Constable Full Mock ${i + 1} (Paper I)`, `पंजाब पुलिस कांस्टेबल फ़ुल मॉक ${i + 1} (पेपर I)`, questions),
);

export const PB_POLICE_TESTS: TestDef[] = [POLICE_FREE_TEST, ...POLICE_PAID_TESTS];
