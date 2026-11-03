import { describe, expect, it } from "vitest";
import { catalogue } from "../../../prisma/catalogue";
import { JAM_QUESTIONS, JAM_SERIES } from "../../../prisma/jam";
import { balanceAnswers } from "../../../prisma/patwari/types";
import { taxonomy } from "../../../prisma/taxonomy";
import { questionTextHash } from "./text-hash";

const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([slug]) => `${s.slug}/${slug}`)));
const PAPERS = ["physics", "chemistry", "mathematics", "mathematical-statistics", "biotechnology", "biological-sciences", "geology"];

const firstNumber = (s: string) => Number(s.match(/-?\d[\d,]*\.?\d*/)?.[0].replaceAll(",", ""));

describe("IIT JAM series", () => {
  it("has one series for each of the seven JAM papers, all under the national iit-jam body", () => {
    expect(JAM_SERIES.map((s) => s.examSlug)).toEqual(PAPERS);
    const body = catalogue.find((b) => b.slug === "iit-jam");
    expect(body?.sites).toEqual(["*"]);
    expect(body?.exams.map((e) => e.slug)).toEqual(PAPERS);
  });

  it("never repeats a question across the papers", () => {
    const hashes = JAM_QUESTIONS.map((x) => questionTextHash(x.en[0]));
    expect(new Set(hashes).size).toBe(hashes.length);
  });
});

describe.each(JAM_SERIES.flatMap((s) => s.tests.map((t) => [t.slug, t, s.product.isActive] as const)))("%s", (_slug, def, active) => {
  const qs = balanceAnswers(def.questions);

  it("is a free 30-question, 90-minute MCQ mock with one-third negative marking", () => {
    expect(def.isFree).toBe(true);
    expect(qs).toHaveLength(30);
    expect(def.durationSec).toBe(90 * 60);
    expect(def.marksCorrect).toBe(1);
    expect(def.marksWrong).toBe(0.33);
    expect(def.sections).toHaveLength(1);
    expect(active).toBe(false);
  });

  it("only uses its own subject and topics that exist in the taxonomy", () => {
    const subjects = new Set(qs.map((x) => x.subject));
    expect(subjects.size).toBe(1);
    for (const x of qs) expect(topics.has(`${x.subject}/${x.topic}`), `${x.subject}/${x.topic}`).toBe(true);
  });

  it("has 4 distinct options, a valid answer and an explanation for every question", () => {
    qs.forEach((x) => {
      const where = x.en[0].slice(0, 50);
      expect(x.en[0].trim().length, where).toBeGreaterThan(15);
      expect(x.en[2].trim().length, where).toBeGreaterThan(10);
      expect(x.en[1], where).toHaveLength(4);
      expect(new Set(x.en[1].map((o) => o.trim())).size, `${where} duplicate options`).toBe(4);
    });
  });

  it("matches computed answers for numeric questions", () => {
    for (const x of qs.filter((y) => y.chk)) {
      const value = Function(`"use strict"; return (${x.chk});`)() as number;
      expect(Math.abs(value - firstNumber(x.en[1][x.a])), x.en[0].slice(0, 60)).toBeLessThan(1e-6);
    }
  });

  it("spreads correct answers over A–D after balancing", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    counts.forEach((c) => expect(c).toBeGreaterThanOrEqual(5));
    counts.forEach((c) => expect(c).toBeLessThanOrEqual(10));
  });
});
