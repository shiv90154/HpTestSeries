import { describe, expect, it } from "vitest";
import { punjabFreeMock } from "../../../prisma/punjab/free-mock";
import { COMMON_FREE_QUESTIONS } from "../../../prisma/seed-demo";
import { taxonomy } from "../../../prisma/taxonomy";
import { pb } from "@/sites/pb";
import { questionTextHash } from "./text-hash";

const mock = punjabFreeMock(COMMON_FREE_QUESTIONS);
const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

describe("pb free mock", () => {
  it("is the mock the pb site links as its free test, placed on pb", () => {
    expect(mock.slug).toBe(pb.freeMockSlug);
    expect(mock.site).toBe("pb");
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
    expect(own.every((q) => q.subject === "punjab-gk")).toBe(true);
    const hashes = mock.questions.map((q) => questionTextHash(q.en.q));
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it("does not lean on one answer letter", () => {
    const counts = [0, 1, 2, 3].map((a) => mock.questions.filter((q) => q.section === 0 && q.answer === a).length);
    expect(Math.max(...counts)).toBeLessThanOrEqual(6);
  });
});
