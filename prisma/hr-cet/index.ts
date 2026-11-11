// HSSC CET Group C mock test series for hrtestseries.in. Plan and test counts: docs/HR-TEST-SERIES-PLAN.md §3.1.
// So far: a free full mock, two paid full mocks (mocks.ts) and four Haryana GK sectionals. More mocks and the other sectionals follow.
// Adding a test = writing its questions and adding it to CET_SECTIONALS (or a mock list).

import { balanceAnswers, type PatwariQuestion, type TestDef } from "../patwari/types";
import { CET_FREE_TEST, CET_PAID_TESTS } from "./mocks";
import { cetHaryanaGkGeography, cetHaryanaGkHistory } from "./sectionals-gk-1";
import { cetHaryanaGkCultureEconomy, cetHaryanaGkPolityPeople } from "./sectionals-gk-2";

const SECTIONAL_INSTRUCTIONS = (subject: string) =>
  `${subject} sectional for the HSSC CET Group C exam: 25 questions, 25 marks, 20 minutes. ` +
  "The CET has no negative marking for wrong answers in the 2026 aggregator reports, so none is applied here; the section split inside the CET is ours. " +
  "You can switch between English and Hindi at any time.";

const sectional = (slug: string, title: string, titleHi: string, section: { name: string; nameHi: string }, questions: PatwariQuestion[]): TestDef => ({
  slug,
  title,
  titleHi,
  type: "SECTIONAL",
  durationSec: 20 * 60,
  marksWrong: 0,
  instructions: SECTIONAL_INSTRUCTIONS(section.name),
  sections: [section],
  questions: balanceAnswers(questions),
});

const HARYANA_GK = { name: "Haryana GK", nameHi: "हरियाणा सामान्य ज्ञान" };

export const CET_SECTIONALS: TestDef[] = [
  sectional("hssc-cet-haryana-gk-1", "HSSC CET Haryana GK Sectional Test 1 (History)", "एचएसएससी सीईटी हरियाणा GK सेक्शनल टेस्ट 1 (इतिहास)", HARYANA_GK, cetHaryanaGkHistory),
  sectional("hssc-cet-haryana-gk-2", "HSSC CET Haryana GK Sectional Test 2 (Geography & Districts)", "एचएसएससी सीईटी हरियाणा GK सेक्शनल टेस्ट 2 (भूगोल एवं जिले)", HARYANA_GK, cetHaryanaGkGeography),
  sectional("hssc-cet-haryana-gk-3", "HSSC CET Haryana GK Sectional Test 3 (Culture & Economy)", "एचएसएससी सीईटी हरियाणा GK सेक्शनल टेस्ट 3 (संस्कृति एवं अर्थव्यवस्था)", HARYANA_GK, cetHaryanaGkCultureEconomy),
  sectional("hssc-cet-haryana-gk-4", "HSSC CET Haryana GK Sectional Test 4 (Polity & Personalities)", "एचएसएससी सीईटी हरियाणा GK सेक्शनल टेस्ट 4 (राजव्यवस्था एवं व्यक्तित्व)", HARYANA_GK, cetHaryanaGkPolityPeople),
];

export const CET_MOCKS: TestDef[] = [CET_FREE_TEST, ...CET_PAID_TESTS];

export const CET_TESTS: TestDef[] = [...CET_MOCKS, ...CET_SECTIONALS];
