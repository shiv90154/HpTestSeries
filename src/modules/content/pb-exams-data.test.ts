import { describe, expect, it } from "vitest";
import { ALL_PB_EXAM_TESTS } from "../../../prisma/pb-exams";
import { balanceAnswers } from "../../../prisma/patwari/types";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const COUNTS: Record<string, { total: number; sections: number[]; minutes: number }> = {
  "psssb-group-d-free-mock-1": { total: 100, sections: [25, 25, 20, 20, 10], minutes: 100 },
  "psssb-clerk-free-mock-1": { total: 100, sections: [25, 20, 20, 15, 10, 10], minutes: 100 },
  "ppsc-pcs-prelims-free-mock-1": { total: 100, sections: [25, 30, 25, 20], minutes: 120 },
  "psssb-je-civil-free-mock-1": { total: 50, sections: [25, 10, 5, 5, 5], minutes: 60 },
  "psssb-je-electrical-free-mock-1": { total: 50, sections: [30, 8, 4, 4, 4], minutes: 60 },
};

describe("Punjab Group D, Clerk, JE and PCS free mocks", () => {
  it("covers exactly the five planned tests", () => {
    expect(ALL_PB_EXAM_TESTS.map((t) => t.slug).sort()).toEqual(Object.keys(COUNTS).sort());
  });

  it("never repeats a question between the tests", () => {
    const seen = new Set<string>();
    for (const t of ALL_PB_EXAM_TESTS)
      for (const x of t.questions) {
        const h = questionTextHash(x.en[0]);
        expect(seen.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
  });
});

describe.each(ALL_PB_EXAM_TESTS.map((t) => [t.slug, t] as const))("%s", (slug, def) => {
  const want = COUNTS[slug];
  const qs = balanceAnswers(def.questions);

  it("is free, with the planned length and a quarter-mark negative", () => {
    expect(def.isFree).toBe(true);
    expect(def.durationSec).toBe(want.minutes * 60);
    expect(def.marksWrong).toBe(0.25);
  });

  it("follows the section pattern in order", () => {
    expect(qs).toHaveLength(want.total);
    expect(def.sections).toHaveLength(want.sections.length);
    want.sections.forEach((count, i) => expect(qs.filter((x) => x.s === i), def.sections[i].name).toHaveLength(count));
    const order = qs.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("repeats no question within the test", () => {
    expect(new Set(qs.map((x) => questionTextHash(x.en[0]))).size).toBe(qs.length);
  });

  it("only uses subjects and topics that exist in the taxonomy", () => {
    for (const x of qs) expect(topics.has(`${x.subject}/${x.topic}`), `${x.subject}/${x.topic}`).toBe(true);
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
    const min = Math.floor(want.total * 0.15);
    const max = Math.ceil(want.total * 0.35);
    [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length).forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(min);
      expect(c).toBeLessThanOrEqual(max);
    });
  });

  it("has no Himachal GK question", () => {
    for (const x of qs) expect(x.subject, x.en[0].slice(0, 60)).not.toBe("hp-gk");
  });
});
