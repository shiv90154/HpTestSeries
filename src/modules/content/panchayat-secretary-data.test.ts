import { describe, expect, it } from "vitest";
import { JOA_IT_TESTS } from "../../../prisma/joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "../../../prisma/panchayat-secretary";
import { SECTIONS, balanceAnswers } from "../../../prisma/panchayat-secretary/types";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { POLICE_TESTS } from "../../../prisma/police";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const otherSeries = new Set([...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS].flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))));
const hash = (x: { en: [string, ...unknown[]] }) => questionTextHash(x.en[0]);

describe("HP Panchayat Secretary series", () => {
  it("has unique test slugs across all code-defined series", () => {
    const slugs = [...PANCHAYAT_SECRETARY_TESTS, ...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS].map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("never repeats a question inside the series", () => {
    // The seed dedupes by English-stem hash, so a repeat would silently put the same question in two tests.
    const seen = new Set<string>();
    for (const t of PANCHAYAT_SECRETARY_TESTS) {
      for (const x of t.questions) {
        const h = hash(x);
        expect(seen.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  it("writes every full-mock question fresh; only subject tests borrow from other series, and at most 40% of each", () => {
    for (const t of PANCHAYAT_SECRETARY_TESTS) {
      const borrowed = t.questions.filter((x) => otherSeries.has(hash(x))).length;
      if (t.type === "MOCK") expect(borrowed, t.slug).toBe(0);
      else expect(borrowed, t.slug).toBeLessThanOrEqual(t.questions.length * 0.4);
    }
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of PANCHAYAT_SECRETARY_TESTS) {
      for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
    }
  });
});

describe.each(PANCHAYAT_SECRETARY_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);
  const mock = def.type === "MOCK";

  it("has the right number of questions per section", () => {
    if (mock) {
      expect(qs).toHaveLength(120);
      expect(def.sections).toHaveLength(SECTIONS.length);
      SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
      const order = qs.map((x) => x.s);
      expect(order).toEqual([...order].sort((a, b) => a - b));
    } else {
      expect(qs).toHaveLength(25);
      expect(def.sections).toHaveLength(1);
      expect(qs.every((x) => x.s === 0)).toBe(true);
    }
  });

  it("has 4 distinct options per language and a valid answer", () => {
    qs.forEach((x, i) => {
      const where = `#${i + 1} ${x.en[0].slice(0, 50)}`;
      for (const lang of [x.en, x.hi]) {
        expect(lang[0].trim().length, where).toBeGreaterThan(5);
        expect(lang[2].trim().length, where).toBeGreaterThan(5);
        expect(lang[1], where).toHaveLength(4);
        expect(new Set(lang[1].map((o) => o.trim())).size, `${where} duplicate options`).toBe(4);
        lang[1].forEach((o) => expect(o.trim().length, where).toBeGreaterThan(0));
      }
      expect([0, 1, 2, 3]).toContain(x.a);
    });
  });

  it("does not put the correct answer in one position too often", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    const [min, max] = mock ? [18, 42] : [3, 10];
    counts.forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(min);
      expect(c).toBeLessThanOrEqual(max);
    });
  });

  it("is exam-level or harder: enough hard questions and few easy ones", () => {
    const hard = qs.filter((x) => x.d === "H").length;
    const easy = qs.filter((x) => x.d === "E").length;
    expect(hard).toBeGreaterThanOrEqual(qs.length * (mock ? 0.35 : 0.2));
    expect(easy).toBeLessThanOrEqual(qs.length * 0.15);
  });

  it("matches computed answers for numeric questions", () => {
    for (const x of qs.filter((y) => y.chk)) {
      const value = Function(`"use strict"; return (${x.chk});`)() as number;
      const shown = firstNumber(x.en[1][x.a]);
      expect(Math.abs(value - shown), `${x.en[0].slice(0, 60)} → computed ${value}, option ${x.en[1][x.a]}`).toBeLessThan(1e-6);
    }
  });
});
