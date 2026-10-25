import { describe, expect, it } from "vitest";
import { EXAM_SERIES } from "../../../prisma/exam-series";
import { HPAS_FREE_TESTS } from "../../../prisma/hpas";
import { JOA_IT_TESTS } from "../../../prisma/joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "../../../prisma/panchayat-secretary";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { balanceAnswers } from "../../../prisma/patwari/types";
import { COURT_CLERK_FREE_MOCK_SLUG, COURT_CLERK_TESTS, SECTIONS } from "../../../prisma/pb-court-clerk";
import { POLICE_TESTS } from "../../../prisma/police";
import { punjabFreeMock } from "../../../prisma/punjab/free-mock";
import { rajasthanFreeMock } from "../../../prisma/rajasthan/free-mock";
import { COMMON_FREE_QUESTIONS } from "../../../prisma/seed-demo";
import { taxonomy } from "../../../prisma/taxonomy";
import { UPCOMING_FREE_TESTS } from "../../../prisma/upcoming-free";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

// Every other code-defined question: the seed dedupes by English-stem hash, so a repeat would silently reuse it.
const otherStems = new Set([
  ...[...EXAM_SERIES.flatMap((s) => s.tests), ...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS, ...UPCOMING_FREE_TESTS, ...HPAS_FREE_TESTS]
    .flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))),
  ...[punjabFreeMock(COMMON_FREE_QUESTIONS), rajasthanFreeMock(COMMON_FREE_QUESTIONS)].flatMap((m) => m.questions.map((x) => questionTextHash(x.en.q))),
]);

describe("Punjab District Court Clerk series", () => {
  it("has one free mock first and paid full mocks after it, with unique slugs", () => {
    expect(COURT_CLERK_TESTS[0].slug).toBe(COURT_CLERK_FREE_MOCK_SLUG);
    expect(COURT_CLERK_TESTS[0].isFree).toBe(true);
    expect(COURT_CLERK_TESTS.slice(1).every((t) => !t.isFree)).toBe(true);
    expect(COURT_CLERK_TESTS.length).toBeGreaterThanOrEqual(3);
    const slugs = COURT_CLERK_TESTS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("repeats no question within the series or from any other bank", () => {
    const seen = new Set<string>();
    for (const t of COURT_CLERK_TESTS) {
      for (const x of t.questions) {
        const h = questionTextHash(x.en[0]);
        expect(seen.has(h) || otherStems.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of COURT_CLERK_TESTS) {
      for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
    }
  });
});

describe.each(COURT_CLERK_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);

  it("follows the exam pattern: GK 50 then English 20, in section order", () => {
    expect(qs).toHaveLength(70);
    expect(def.sections).toHaveLength(SECTIONS.length);
    SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
    const order = qs.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(qs.filter((x) => x.s === 0 && x.subject === "punjab-gk").length).toBeGreaterThanOrEqual(15);
    expect(qs.filter((x) => x.s === 1).every((x) => x.subject === "english")).toBe(true);
  });

  it("has 4 distinct options per language and a valid answer", () => {
    qs.forEach((x, i) => {
      const where = `#${i + 1} ${x.en[0].slice(0, 50)}`;
      for (const lang of [x.en, x.hi]) {
        expect(lang[0].trim().length, where).toBeGreaterThan(5);
        expect(lang[2].trim().length, where).toBeGreaterThan(5);
        expect(lang[1], where).toHaveLength(4);
        expect(new Set(lang[1].map((o) => o.trim())).size, `${where} duplicate options`).toBe(4);
      }
      expect([0, 1, 2, 3]).toContain(x.a);
    });
  });

  it("spreads the correct answer over A–D", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    counts.forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(10);
      expect(c).toBeLessThanOrEqual(25);
    });
  });

  it("is exam-level: enough hard questions and not too many easy ones", () => {
    expect(qs.filter((x) => x.d === "H").length).toBeGreaterThanOrEqual(qs.length * 0.25);
    expect(qs.filter((x) => x.d === "E").length).toBeLessThanOrEqual(qs.length * 0.2);
  });
});
