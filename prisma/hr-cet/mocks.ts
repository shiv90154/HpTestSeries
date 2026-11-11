// HSSC CET Group C full mocks: one free mock and paid mocks 1–2 (100 questions, 105 minutes, no negative marking).
// Haryana GK (25) is written new for each mock (mocks-gk.ts). The other five sections are not state specific, so they are
// taken from the HP Patwari / HP Police / PSSSB Patwari mocks and sectionals by a fixed rule: the seed matches questions by text
// hash and reuses the rows. A question appears at most once across the three mocks and never repeats a CET sectional question
// or the Haryana free mock. Questions naming Himachal, Punjab, Haryana or a recent year are skipped.

import { haryanaFreeMock } from "../haryana/free-mock";
import { PB_PATWARI_TESTS } from "../pb-patwari";
import { PATWARI_TESTS } from "../patwari";
import { revenueComputer1, revenueComputer2 } from "../patwari/sectional/revenue-computer";
import { balanceAnswers, type PatwariQuestion, type TestDef } from "../patwari/types";
import { POLICE_TESTS } from "../police";
import { COMMON_FREE_QUESTIONS } from "../seed-demo";
import { questionTextHash } from "../../src/modules/content/text-hash";
import { cetMockGkFree, cetMockGkPaid1, cetMockGkPaid2 } from "./mocks-gk";
import { cetHaryanaGkCultureEconomy, cetHaryanaGkPolityPeople } from "./sectionals-gk-2";
import { cetHaryanaGkGeography, cetHaryanaGkHistory } from "./sectionals-gk-1";

export const CET_SECTIONS = [
  { name: "Haryana GK", nameHi: "हरियाणा सामान्य ज्ञान", count: 25 },
  { name: "General Awareness", nameHi: "सामान्य जागरूकता", count: 15 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 20 },
  { name: "Maths", nameHi: "गणित", count: 15 },
  { name: "English & Hindi", nameHi: "अंग्रेज़ी एवं हिंदी", count: 15 },
  { name: "Computer", nameHi: "कंप्यूटर", count: 10 },
] as const;

export const CET_FREE_MOCK_SLUG = "hssc-cet-free-mock-1";

const sourceTests: TestDef[] = [...PATWARI_TESTS, ...POLICE_TESTS, ...PB_PATWARI_TESTS];
const sourceQuestions = (test: TestDef) => test.questions;

const LOCAL = /himachal|shimla|\bH\.?P\.?\b|punjab|haryana|chandigarh|kullu|manali|dharamshala|mandi|kangra|solan|sirmaur|chamba|una\b|hamirpur|bilaspur|kinnaur|lahaul|spiti/i;
const RECENT = /\b20(1[5-9]|2\d)\b/;

const used = new Set<string>(
  [
    ...cetHaryanaGkHistory,
    ...cetHaryanaGkGeography,
    ...cetHaryanaGkCultureEconomy,
    ...cetHaryanaGkPolityPeople,
    ...cetMockGkFree,
    ...cetMockGkPaid1,
    ...cetMockGkPaid2,
  ].map((x) => questionTextHash(x.en[0])),
);
for (const x of haryanaFreeMock(COMMON_FREE_QUESTIONS).questions) used.add(questionTextHash(x.en.q));

/** Questions of `subject`, interleaved across the source tests so each mock gets variety, with no repeats. */
function pool(subject: string, extra: PatwariQuestion[][] = []): PatwariQuestion[] {
  const lists = [
    ...sourceTests.map((t) => sourceQuestions(t).filter((x) => x.subject === subject)),
    ...extra.map((l) => l.filter((x) => x.subject === subject)),
  ].filter((l) => l.length);
  const seen = new Set<string>();
  const out: PatwariQuestion[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const l of lists) {
      const x = l[i];
      if (!x) continue;
      const h = questionTextHash(x.en[0]);
      const text = `${x.en[0]} ${x.en[1].join(" ")}`;
      if (seen.has(h) || used.has(h) || LOCAL.test(text) || RECENT.test(text)) continue;
      seen.add(h);
      out.push(x);
    }
  }
  return out;
}

const general = pool("general-studies");
const reasoning = pool("reasoning");
const maths = pool("quant");
const english = pool("english");
const hindi = pool("hindi");
const computer = pool("computer", [revenueComputer1, revenueComputer2]);

const take = (from: PatwariQuestion[], set: number, count: number, section: PatwariQuestion["s"]): PatwariQuestion[] =>
  from.slice(set * count, (set + 1) * count).map((x) => ({ ...x, s: section }));

function build(set: number, gk: PatwariQuestion[]): PatwariQuestion[] {
  const [, ga, rs, mt, , cp] = CET_SECTIONS;
  return balanceAnswers([
    ...gk.map((x) => ({ ...x, s: 0 as const })),
    ...take(general, set, ga.count, 1),
    ...take(reasoning, set, rs.count, 2),
    ...take(maths, set, mt.count, 3),
    ...take(english, set, 8, 4),
    ...take(hindi, set, 7, 4),
    ...take(computer, set, cp.count, 5),
  ]);
}

const mock = (slug: string, title: string, titleHi: string, questions: PatwariQuestion[], isFree = false): TestDef => ({
  slug,
  title,
  titleHi,
  type: "MOCK",
  durationSec: 105 * 60,
  marksWrong: 0,
  isFree,
  instructions:
    `Practice paper for the HSSC CET Group C exam: ${questions.length} questions, ${questions.length} marks, 105 minutes. ` +
    "The section split is ours (Haryana GK 25, General Awareness 15, Reasoning 20, Maths 15, English & Hindi 15, Computer 10) because HSSC publishes only part of it. " +
    "Each correct answer gives 1 mark. The 2026 aggregator reports say there is no negative marking for wrong answers, so none is applied; the reported penalty for unattempted questions is not simulated. " +
    "You can switch between English and Hindi at any time.",
  sections: CET_SECTIONS.map(({ name, nameHi }) => ({ name, nameHi })),
  questions,
});

export const CET_FREE_TEST: TestDef = mock(CET_FREE_MOCK_SLUG, "HSSC CET Group C Free Mock Test 1", "एचएसएससी सीईटी ग्रुप सी फ्री मॉक टेस्ट 1", build(0, cetMockGkFree), true);

export const CET_PAID_TESTS: TestDef[] = [cetMockGkPaid1, cetMockGkPaid2].map((gk, i) =>
  mock(`hssc-cet-mock-${i + 1}`, `HSSC CET Group C Mock Test ${i + 1}`, `एचएसएससी सीईटी ग्रुप सी मॉक टेस्ट ${i + 1}`, build(i + 1, gk)),
);
