import { describe, expect, it } from "vitest";
import { EXAM_PACKS, EXAM_SERIES } from "../../../prisma/exam-series";
import { CLERK_MOCKS, HC_SECTIONALS, PROCESS_SERVER_MOCKS, STENO_MOCKS } from "../../../prisma/high-court";
import { HPAS_FREE_TESTS } from "../../../prisma/hpas";
import { JOA_IT_TESTS } from "../../../prisma/joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "../../../prisma/panchayat-secretary";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { balanceAnswers } from "../../../prisma/patwari/types";
import { POLICE_TESTS } from "../../../prisma/police";
import { taxonomy } from "../../../prisma/taxonomy";
import { UPCOMING_FREE_TESTS } from "../../../prisma/upcoming-free";
import { questionTextHash } from "./text-hash";

const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const hash = (x: { en: [string, ...unknown[]] }) => questionTextHash(x.en[0]);
// Shared tests (the High Court sectionals) sit in several series but are seeded once
const ALL_TESTS = [...new Map(EXAM_SERIES.flatMap((s) => s.tests).map((t) => [t.slug, t])).values()];
const otherSeries = new Set(
  [...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS, ...UPCOMING_FREE_TESTS, ...HPAS_FREE_TESTS].flatMap((t) =>
    t.questions.map(hash),
  ),
);

describe("exam series built from the shared bank", () => {
  it("has unique test, series and product slugs across all code-defined series", () => {
    const slugs = [...ALL_TESTS, ...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS].map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const series = EXAM_SERIES.flatMap((s) => [s.series.slug, s.product.slug]);
    expect(new Set(series).size).toBe(series.length);
  });

  it("never gives the same question to two of these tests", () => {
    const seen = new Set<string>();
    for (const t of ALL_TESTS) {
      for (const x of t.questions) {
        const h = hash(x);
        expect(seen.has(h), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
        seen.add(h);
      }
    }
  });

  // The seed dedupes by stem hash, so a fresh question matching any seeded one would silently reuse that question
  it("writes every exam-specific question fresh", () => {
    const specific = new Set(["pedagogy", "forestry", "law", "nursing", "banking", "library-science"]);
    for (const t of ALL_TESTS) {
      for (const x of t.questions.filter((y) => specific.has(y.subject))) expect(otherSeries.has(hash(x)), `${t.slug}: ${x.en[0].slice(0, 60)}`).toBe(false);
    }
    const highCourt = [...HC_SECTIONALS.flatMap((t) => t.questions), ...[...PROCESS_SERVER_MOCKS, ...STENO_MOCKS, ...CLERK_MOCKS].flat()];
    for (const x of highCourt) expect(otherSeries.has(hash(x)), x.en[0].slice(0, 60)).toBe(false);
  });

  it("makes exactly the first mock of each series free", () => {
    for (const s of EXAM_SERIES) expect(s.tests.map((t) => !!t.isFree), s.key).toEqual(s.tests.map((_, i) => i === 0));
  });

  it("builds every pack from series that exist", () => {
    const series = new Set(EXAM_SERIES.map((s) => s.series.slug));
    for (const p of EXAM_PACKS) for (const slug of p.seriesSlugs) expect(series.has(slug), slug).toBe(true);
  });

  it("only uses subjects and topics that exist in the seeded taxonomy", () => {
    for (const t of ALL_TESTS) {
      for (const x of t.questions) expect(topics.has(`${x.subject}/${x.topic}`), `${t.slug}: ${x.subject}/${x.topic}`).toBe(true);
    }
  });
});

describe.each(ALL_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);

  it("keeps sections in order and none empty", () => {
    const order = qs.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    def.sections.forEach((sec, i) =>
      expect(
        qs.some((x) => x.s === i),
        sec.name,
      ).toBe(true),
    );
    expect(Math.max(...order)).toBe(def.sections.length - 1);
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

  it("spreads correct answers over A–D", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    counts.forEach((c) => expect(c).toBeGreaterThanOrEqual(qs.length * 0.15));
    counts.forEach((c) => expect(c).toBeLessThanOrEqual(qs.length * 0.35));
  });

  it("is exam-level or harder, and says so honestly", () => {
    const hard = qs.filter((x) => x.d === "H").length >= qs.length * 0.3;
    expect(def.instructions.includes("slightly above exam level")).toBe(hard);
    expect(qs.filter((x) => x.d === "E").length).toBeLessThanOrEqual(qs.length * 0.15);
  });

  it("matches computed answers for numeric questions", () => {
    for (const x of qs.filter((y) => y.chk)) {
      const value = Function(`"use strict"; return (${x.chk});`)() as number;
      expect(Math.abs(value - firstNumber(x.en[1][x.a])), x.en[0].slice(0, 60)).toBeLessThan(1e-6);
    }
  });
});
