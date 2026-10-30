// Punjab District Court Clerk (SSSC, Advt 37C/SSSC/PB/2026) mock test series for pbtestseries.in. The written CBT has
// 70 objective marks (General Knowledge 50, English 20) and 30 marks of typed English (essay, letter, précis,
// Punjabi→English translation); our CBT marks only objective questions, so the mocks cover the 70 marks and the
// subjective part is practised through a blog post. Plan and test counts: docs/PB-TEST-SERIES-PLAN.md §4.1.
// Adding a mock = writing mockN.ts and adding it to PAID_MOCKS.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { courtClerkFreeMock } from "./free-mock";
import { courtClerkMock1 } from "./mock1";
import { courtClerkMock2 } from "./mock2";
import { courtClerkMock3 } from "./mock3";
import { courtClerkMock4 } from "./mock4";
import { courtClerkMock5 } from "./mock5";
import { courtClerkMock6 } from "./mock6";

export const SECTIONS = [
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 50 },
  { name: "English Composition", nameHi: "अंग्रेज़ी रचना", count: 20 },
] as const;

export const COURT_CLERK_FREE_MOCK_SLUG = "punjab-court-clerk-free-mock-1";

const instructions = (questions: PatwariQuestion[]) =>
  `Objective part of the Punjab District Court Clerk written exam: ${questions.length} questions, ${questions.length} marks, 70 minutes. ` +
  "General Knowledge 50 and English Composition 20, as in the 2026 notice; the GK topic split inside the section is ours. " +
  "Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. " +
  "The real exam also has 30 marks of typed English (essay, letter, précis and Punjabi to English translation), which this mock does not cover. " +
  "You can switch between English and Hindi at any time.";

const mock = (slug: string, title: string, titleHi: string, questions: PatwariQuestion[], isFree = false): TestDef => ({
  slug,
  title,
  titleHi,
  type: "MOCK",
  durationSec: 70 * 60,
  isFree,
  instructions: instructions(questions),
  sections: SECTIONS.map(({ name, nameHi }) => ({ name, nameHi })),
  questions,
});

const PAID_MOCKS: PatwariQuestion[][] = [courtClerkMock1, courtClerkMock2, courtClerkMock3, courtClerkMock4, courtClerkMock5, courtClerkMock6];

export const COURT_CLERK_TESTS: TestDef[] = [
  mock(COURT_CLERK_FREE_MOCK_SLUG, "Punjab Court Clerk Free Mock Test 1", "पंजाब कोर्ट क्लर्क फ़्री मॉक टेस्ट 1", courtClerkFreeMock, true),
  ...PAID_MOCKS.map((questions, i) =>
    mock(`punjab-court-clerk-mock-${i + 1}`, `Punjab Court Clerk Full Mock ${i + 1}`, `पंजाब कोर्ट क्लर्क फ़ुल मॉक ${i + 1}`, questions),
  ),
];
