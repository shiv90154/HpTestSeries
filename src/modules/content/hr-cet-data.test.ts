import { describe, expect, it } from "vitest";
import { CET_TESTS } from "../../../prisma/hr-cet";
import { haryanaFreeMock } from "../../../prisma/haryana/free-mock";
import { COMMON_FREE_QUESTIONS } from "../../../prisma/seed-demo";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const freeMockStems = new Set(haryanaFreeMock(COMMON_FREE_QUESTIONS).questions.map((x) => questionTextHash(x.en.q)));

describe("HSSC CET Group C series", () => {
  it("has unique slugs and no question repeated within the series or from the Haryana free mock", () => {
    const slugs = CET_TESTS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const seen = new Set<string>();
    for (const t of CET_TESTS) {
      for (const x of t.questions) {
        const h = questionTextHash(x.en[0]);
        expect(seen.has(h) || freeMockStems.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of CET_TESTS) for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
  });

  describe.each(CET_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
    const qs = def.questions;

    it("is one section of 25 questions in 20 minutes with no negative marking", () => {
      expect(def.sections).toHaveLength(1);
      expect(qs).toHaveLength(25);
      expect(qs.every((x) => x.s === 0)).toBe(true);
      expect(def.durationSec).toBe(20 * 60);
      expect(def.marksWrong).toBe(0);
      expect(def.isFree).toBeFalsy();
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
      [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length).forEach((c) => {
        expect(c).toBeGreaterThanOrEqual(3);
        expect(c).toBeLessThanOrEqual(10);
      });
    });

    it("is exam-level: not too many easy questions", () => {
      expect(qs.filter((x) => x.d === "E").length).toBeLessThanOrEqual(qs.length * 0.3);
    });
  });
});
