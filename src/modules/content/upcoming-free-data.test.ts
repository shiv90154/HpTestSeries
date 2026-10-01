import { describe, expect, it } from "vitest";
import { UPCOMING_FREE_TESTS } from "../../../prisma/upcoming-free";
import { taxonomy } from "../../../prisma/taxonomy";
import { UPCOMING_EXAMS } from "../catalog/upcoming-exams";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

describe("free mocks for upcoming exams", () => {
  it("has unique slugs and no repeated question across the mocks", () => {
    const slugs = UPCOMING_FREE_TESTS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const hashes = UPCOMING_FREE_TESTS.flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0])));
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it("has a mock for every upcoming-exam card that is not HPAS", () => {
    const slugs = new Set(UPCOMING_FREE_TESTS.map((t) => t.slug));
    for (const e of UPCOMING_EXAMS.filter((x) => x.freeMockSlug !== "hpas-free-mock-1")) expect(slugs.has(e.freeMockSlug), e.name).toBe(true);
  });
});

describe.each(UPCOMING_FREE_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  it("only uses sections and topics that exist", () => {
    for (const x of def.questions) {
      expect(x.s, x.en[0]).toBeLessThan(def.sections.length);
      expect(topics.has(`${x.subject}/${x.topic}`), `${x.subject}/${x.topic}`).toBe(true);
    }
  });

  it("lists questions in section order, every section used, with valid options", () => {
    const order = def.questions.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    def.sections.forEach((s, i) => expect(order.includes(i as 0), s.name).toBe(true));
    for (const x of def.questions) {
      for (const lang of [x.en, x.hi]) {
        expect(lang[1]).toHaveLength(4);
        expect(new Set(lang[1].map((o) => o.trim())).size, x.en[0]).toBe(4);
        expect(lang[2].trim().length).toBeGreaterThan(5);
      }
      expect([0, 1, 2, 3]).toContain(x.a);
    }
  });
});
