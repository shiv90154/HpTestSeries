import { describe, expect, it } from "vitest";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { POLICE_TESTS } from "../../../prisma/police";
import { SECTIONS, balanceAnswers } from "../../../prisma/police/types";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

describe("HP Police Constable series", () => {
  it("has 9 full mocks and 12 subject tests with unique slugs", () => {
    expect(POLICE_TESTS.filter((t) => t.type === "MOCK")).toHaveLength(9);
    expect(POLICE_TESTS.filter((t) => t.type === "SECTIONAL")).toHaveLength(12);
    const slugs = [...POLICE_TESTS, ...PATWARI_TESTS].map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate questions within the series or with the Patwari series", () => {
    // The seed dedupes by English-stem hash, so a repeat would silently reuse the other question.
    const patwari = new Set(PATWARI_TESTS.flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))));
    const seen = new Set<string>();
    for (const t of POLICE_TESTS) {
      for (const x of t.questions) {
        const h = questionTextHash(x.en[0]);
        expect(seen.has(h) || patwari.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of POLICE_TESTS) {
      for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
    }
  });
});

describe.each(POLICE_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);
  const mock = def.type === "MOCK";

  it("has the right number of questions per section", () => {
    if (mock) {
      expect(qs).toHaveLength(100);
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
    const [min, max] = mock ? [15, 35] : [3, 10];
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

describe("HP Police Constable maths tests", () => {
  it("check every numeric answer with a computed expression", () => {
    for (const t of POLICE_TESTS.filter((x) => x.slug.includes("-maths-"))) {
      const numeric = t.questions.filter((x) => !x.en[1].some((o) => Number.isNaN(firstNumber(o))));
      const unchecked = numeric.filter((x) => !x.chk);
      expect(unchecked.length, `${t.slug}: ${unchecked.map((x) => x.en[0].slice(0, 40)).join(" | ")}`).toBeLessThanOrEqual(2);
    }
  });
});
