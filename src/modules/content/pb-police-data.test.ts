import { describe, expect, it } from "vitest";
import { EXAM_SERIES } from "../../../prisma/exam-series";
import { COURT_CLERK_TESTS } from "../../../prisma/pb-court-clerk";
import { PAPER1_SECTIONS, POLICE_FREE_MOCK_SLUG, POLICE_FREE_TEST } from "../../../prisma/pb-police";
import { balanceAnswers } from "../../../prisma/patwari/types";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { POLICE_TESTS } from "../../../prisma/police";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

const otherStems = new Set(
  [...EXAM_SERIES.flatMap((s) => s.tests), ...PATWARI_TESTS, ...POLICE_TESTS, ...COURT_CLERK_TESTS].flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))),
);

describe("Punjab Police Constable free Paper I mock", () => {
  const def = POLICE_FREE_TEST;
  const qs = balanceAnswers(def.questions);

  it("is a free mock with no negative marking and the Paper I timing", () => {
    expect(def.slug).toBe(POLICE_FREE_MOCK_SLUG);
    expect(def.isFree).toBe(true);
    expect(def.marksWrong).toBe(0);
    expect(def.durationSec).toBe(120 * 60);
  });

  it("follows the Paper I pattern in section order", () => {
    expect(qs).toHaveLength(100);
    expect(def.sections).toHaveLength(PAPER1_SECTIONS.length);
    PAPER1_SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
    const order = qs.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(qs.filter((x) => x.s === 4).every((x) => x.subject === "punjabi")).toBe(true);
    expect(qs.filter((x) => x.s === 0 && x.subject === "punjab-gk").length).toBeGreaterThanOrEqual(10);
  });

  it("repeats no question within the mock or from other series", () => {
    const seen = new Set<string>();
    for (const x of qs) {
      const h = questionTextHash(x.en[0]);
      expect(seen.has(h) || otherStems.has(h), x.en[0].slice(0, 60)).toBe(false);
      seen.add(h);
    }
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
    [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length).forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(15);
      expect(c).toBeLessThanOrEqual(35);
    });
  });

  it("is exam-level: enough hard questions and not too many easy ones", () => {
    expect(qs.filter((x) => x.d === "H").length).toBeGreaterThanOrEqual(20);
    expect(qs.filter((x) => x.d === "E").length).toBeLessThanOrEqual(20);
  });

  it("matches computed answers for numeric questions", () => {
    for (const x of qs.filter((y) => y.chk)) {
      const value = Function(`"use strict"; return (${x.chk});`)() as number;
      const shown = firstNumber(x.en[1][x.a]);
      expect(Math.abs(value - shown), `${x.en[0].slice(0, 60)} → computed ${value}, option ${x.en[1][x.a]}`).toBeLessThan(1e-6);
    }
  });
});
