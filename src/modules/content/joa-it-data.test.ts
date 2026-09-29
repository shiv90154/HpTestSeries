import { describe, expect, it } from "vitest";
import { JOA_IT_TESTS } from "../../../prisma/joa-it";
import { SECTIONS, balanceAnswers } from "../../../prisma/joa-it/types";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { POLICE_TESTS } from "../../../prisma/police";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));

// Question text is rendered as markdown with KaTeX (src/components/rich-content.tsx). Outside `code spans`, a $ starts
// math, * or _ can start italics, and a leading #, +, -, * or "1. " turns the line into a heading or a list.
const markdownProblem = (text: string) => {
  const plain = text.replace(/`[^`]*`/g, "");
  if (/[$*_]/.test(plain)) return "has $, * or _ outside backticks";
  if (/^\s*(#|[-+*>]\s|\d+[.)]\s)/.test(plain)) return "starts like a markdown heading, list or quote";
  if ((text.match(/`/g) ?? []).length % 2) return "has an unclosed backtick";
  return null;
};

describe("HP JOA IT series", () => {
  it("has 1 full mock and 6 computer subject tests with unique slugs", () => {
    expect(JOA_IT_TESTS.filter((t) => t.type === "MOCK")).toHaveLength(1);
    expect(JOA_IT_TESTS.filter((t) => t.type === "SECTIONAL")).toHaveLength(6);
    const slugs = [...JOA_IT_TESTS, ...PATWARI_TESTS, ...POLICE_TESTS].map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate questions within the series or with the Patwari and Police series", () => {
    // The seed dedupes by English-stem hash, so a repeat would silently reuse the other question.
    const others = new Set([...PATWARI_TESTS, ...POLICE_TESTS].flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))));
    const seen = new Set<string>();
    for (const t of JOA_IT_TESTS) {
      for (const x of t.questions) {
        const h = questionTextHash(x.en[0]);
        expect(seen.has(h) || others.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of JOA_IT_TESTS) {
      for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
    }
  });

  it("only has text that renders as written", () => {
    for (const t of JOA_IT_TESTS) {
      t.questions.forEach((x, i) => {
        for (const text of [x.en[0], x.en[2], x.hi[0], x.hi[2], ...x.en[1], ...x.hi[1]]) {
          expect(markdownProblem(text), `${t.slug} #${i + 1}: ${text.slice(0, 60)}`).toBeNull();
        }
      });
    }
  });
});

describe.each(JOA_IT_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
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
      expect(qs.every((x) => x.s === 0 && x.subject === "computer")).toBe(true);
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

  it("balancing keeps the correct option's text unchanged in both languages", () => {
    qs.forEach((x, i) => {
      expect(x.en[1][x.a], `#${i + 1}`).toBe(def.questions[i].en[1][def.questions[i].a]);
      expect(x.hi[1][x.a], `#${i + 1}`).toBe(def.questions[i].hi[1][def.questions[i].a]);
    });
  });

  it("does not put the correct answer in one position too often", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    const [min, max] = mock ? [20, 40] : [3, 10];
    counts.forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(min);
      expect(c).toBeLessThanOrEqual(max);
    });
  });

  it("is exam-level or harder: enough hard questions and few easy ones", () => {
    const hard = qs.filter((x) => x.d === "H").length;
    const easy = qs.filter((x) => x.d === "E").length;
    expect(hard).toBeGreaterThanOrEqual(qs.length * (mock ? 0.35 : 0.25));
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

describe("HP JOA IT full mock maths", () => {
  it("checks every numeric maths answer with a computed expression", () => {
    for (const t of JOA_IT_TESTS.filter((x) => x.type === "MOCK")) {
      const maths = t.questions.filter((x) => x.subject === "quant");
      const unchecked = maths.filter((x) => !x.chk && !x.en[1].some((o) => Number.isNaN(firstNumber(o))));
      expect(unchecked.map((x) => x.en[0].slice(0, 50))).toEqual([]);
    }
  });
});
