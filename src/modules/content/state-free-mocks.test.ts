import { describe, expect, it } from "vitest";
import { punjabFreeMock } from "../../../prisma/punjab/free-mock";
import { rajasthanFreeMock } from "../../../prisma/rajasthan/free-mock";
import { COMMON_FREE_QUESTIONS } from "../../../prisma/seed-demo";
import { taxonomy } from "../../../prisma/taxonomy";
import { pb } from "@/sites/pb";
import { rj } from "@/sites/rj";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

const MOCKS = [
  { site: pb, subject: "punjab-gk", mock: punjabFreeMock(COMMON_FREE_QUESTIONS) },
  { site: rj, subject: "rajasthan-gk", mock: rajasthanFreeMock(COMMON_FREE_QUESTIONS) },
];

describe.each(MOCKS)("$site.code free mock", ({ site, subject, mock }) => {
  it("is the mock the site links as its free test, placed on that site", () => {
    expect(mock.slug).toBe(site.freeMockSlug);
    expect(mock.site).toBe(site.code);
  });

  it("has well-formed bilingual questions in every section", () => {
    for (const [i, q] of mock.questions.entries()) {
      const where = `question ${i + 1}`;
      expect(topics.has(`${q.subject}/${q.topic}`), `${where} topic`).toBe(true);
      expect(q.section, where).toBeLessThan(mock.sections.length);
      for (const lang of [q.en, q.hi]) {
        expect(lang.q.trim().length, where).toBeGreaterThan(10);
        expect(new Set(lang.o.map((o) => o.trim())).size, `${where} duplicate options`).toBe(4);
        expect(lang.e.trim().length, where).toBeGreaterThan(20);
      }
    }
    for (let s = 0; s < mock.sections.length; s++) expect(mock.questions.some((q) => q.section === s)).toBe(true);
  });

  it("shares only the non-state sections with the HP free mock and repeats no stem", () => {
    const own = mock.questions.filter((q) => q.section === 0);
    expect(own.every((q) => q.subject === subject)).toBe(true);
    const hashes = mock.questions.map((q) => questionTextHash(q.en.q));
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it("does not lean on one answer letter", () => {
    const counts = [0, 1, 2, 3].map((a) => mock.questions.filter((q) => q.section === 0 && q.answer === a).length);
    expect(Math.max(...counts)).toBeLessThanOrEqual(6);
  });
});

it("state free mocks share no stem with each other", () => {
  const own = MOCKS.flatMap(({ mock }) => mock.questions.filter((q) => q.section === 0).map((q) => questionTextHash(q.en.q)));
  expect(new Set(own).size).toBe(own.length);
});
