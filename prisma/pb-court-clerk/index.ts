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
import { courtClerkEnglishGrammar, courtClerkEnglishVocabulary } from "./sectionals-english";
import { courtClerkEconomyStatic, courtClerkGeoScience, courtClerkHistoryPolity, courtClerkPunjabGk } from "./sectionals-gk";

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

const SECTIONAL_INSTRUCTIONS = (subject: string) =>
  `${subject} sectional for the Punjab District Court Clerk written exam: 25 questions, 25 marks, 20 minutes. ` +
  "Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. You can switch between English and Hindi at any time.";

const sectional = (slug: string, title: string, titleHi: string, section: { name: string; nameHi: string }, questions: PatwariQuestion[]): TestDef => ({
  slug,
  title,
  titleHi,
  type: "SECTIONAL",
  durationSec: 20 * 60,
  instructions: SECTIONAL_INSTRUCTIONS(section.name),
  sections: [section],
  questions,
});

export const COURT_CLERK_SECTIONALS: TestDef[] = [
  sectional("punjab-court-clerk-punjab-gk-1", "Punjab Court Clerk Punjab GK Sectional Test 1", "पंजाब कोर्ट क्लर्क पंजाब GK सेक्शनल टेस्ट 1", { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान" }, courtClerkPunjabGk),
  sectional("punjab-court-clerk-history-polity-1", "Punjab Court Clerk History & Polity Sectional Test 1", "पंजाब कोर्ट क्लर्क इतिहास एवं राजव्यवस्था सेक्शनल टेस्ट 1", { name: "Indian History & Polity", nameHi: "भारतीय इतिहास एवं राजव्यवस्था" }, courtClerkHistoryPolity),
  sectional("punjab-court-clerk-geography-science-1", "Punjab Court Clerk Geography & Science Sectional Test 1", "पंजाब कोर्ट क्लर्क भूगोल एवं विज्ञान सेक्शनल टेस्ट 1", { name: "Geography & General Science", nameHi: "भूगोल एवं सामान्य विज्ञान" }, courtClerkGeoScience),
  sectional("punjab-court-clerk-economy-current-affairs-1", "Punjab Court Clerk Economy, Current Affairs & Static GK Sectional Test 1", "पंजाब कोर्ट क्लर्क अर्थव्यवस्था, समसामयिकी एवं स्टैटिक GK सेक्शनल टेस्ट 1", { name: "Economy, Current Affairs & Static GK", nameHi: "अर्थव्यवस्था, समसामयिकी एवं स्टैटिक GK" }, courtClerkEconomyStatic),
  sectional("punjab-court-clerk-english-grammar-1", "Punjab Court Clerk English Grammar Sectional Test 1", "पंजाब कोर्ट क्लर्क अंग्रेज़ी व्याकरण सेक्शनल टेस्ट 1", { name: "English Grammar", nameHi: "अंग्रेज़ी व्याकरण" }, courtClerkEnglishGrammar),
  sectional("punjab-court-clerk-english-vocabulary-1", "Punjab Court Clerk English Vocabulary Sectional Test 1", "पंजाब कोर्ट क्लर्क अंग्रेज़ी शब्दावली सेक्शनल टेस्ट 1", { name: "English Vocabulary", nameHi: "अंग्रेज़ी शब्दावली" }, courtClerkEnglishVocabulary),
];

export const COURT_CLERK_TESTS: TestDef[] = [
  mock(COURT_CLERK_FREE_MOCK_SLUG, "Punjab Court Clerk Free Mock Test 1", "पंजाब कोर्ट क्लर्क फ़्री मॉक टेस्ट 1", courtClerkFreeMock, true),
  ...PAID_MOCKS.map((questions, i) =>
    mock(`punjab-court-clerk-mock-${i + 1}`, `Punjab Court Clerk Full Mock ${i + 1}`, `पंजाब कोर्ट क्लर्क फ़ुल मॉक ${i + 1}`, questions),
  ),
  ...COURT_CLERK_SECTIONALS,
];
