import { describe, expect, it } from "vitest";
import { gradeAttempt, percentileFromRank, type GradingSection } from "./grading";

const sections: GradingSection[] = [
  {
    id: "gk",
    marksCorrect: 1,
    marksWrong: 0.25,
    questions: [
      { id: "q1", correctOptionId: "a", topicIds: ["hp-rivers"] },
      { id: "q2", correctOptionId: "b", topicIds: ["hp-rivers", "hp-geo"] },
      { id: "q3", correctOptionId: "c", topicIds: ["hp-history"] },
    ],
  },
  {
    id: "computer",
    marksCorrect: 2,
    marksWrong: 0,
    questions: [
      { id: "q4", correctOptionId: "a", topicIds: ["ms-office"] },
      { id: "q5", correctOptionId: "d", topicIds: ["ms-office"] },
    ],
  },
];

describe("gradeAttempt", () => {
  it("applies per-section marks and negative marking", () => {
    const r = gradeAttempt(sections, {
      q1: { o: "a", t: 30 }, // +1
      q2: { o: "c", t: 20 }, // -0.25
      q3: { t: 5 }, // skipped (viewed, no option)
      q4: { o: "b", t: 10 }, // wrong, no negative
      q5: { o: "d", t: 15 }, // +2
    });

    expect(r.score).toBe(2.75);
    expect(r).toMatchObject({ correct: 2, wrong: 2, skipped: 1, timeSpentSec: 80 });
    expect(r.sectionStats.gk).toMatchObject({ score: 0.75, maxScore: 3, correct: 1, wrong: 1, skipped: 1 });
    expect(r.sectionStats.computer).toMatchObject({ score: 2, maxScore: 4 });
  });

  it("counts unanswered questions as skipped and allows negative totals", () => {
    const empty = gradeAttempt(sections, {});
    expect(empty).toMatchObject({ score: 0, correct: 0, wrong: 0, skipped: 5 });

    const allWrong = gradeAttempt(sections, { q1: { o: "x" }, q2: { o: "x" }, q3: { o: "x" } });
    expect(allWrong.score).toBe(-0.75);
  });

  it("aggregates topic stats across multi-tagged questions", () => {
    const r = gradeAttempt(sections, { q1: { o: "a" }, q2: { o: "a" } });
    expect(r.topicStats["hp-rivers"]).toEqual({ correct: 1, wrong: 1, skipped: 0 });
    expect(r.topicStats["hp-geo"]).toEqual({ correct: 0, wrong: 1, skipped: 0 });
    expect(r.topicStats["ms-office"]).toEqual({ correct: 0, wrong: 0, skipped: 2 });
  });

  it("avoids floating point drift with fractional negative marks", () => {
    const s: GradingSection[] = [
      {
        id: "s",
        marksCorrect: 1,
        marksWrong: 1 / 3,
        questions: Array.from({ length: 3 }, (_, i) => ({ id: `w${i}`, correctOptionId: "a", topicIds: [] })),
      },
    ];
    const r = gradeAttempt(s, { w0: { o: "b" }, w1: { o: "b" }, w2: { o: "b" } });
    expect(r.score).toBe(-1);
  });

  it("ignores negative or fractional time values", () => {
    const r = gradeAttempt(sections, { q1: { o: "a", t: -50 }, q2: { t: 12.9 } });
    expect(r.timeSpentSec).toBe(12);
  });
});

describe("percentileFromRank", () => {
  it("maps rank to share of candidates below", () => {
    expect(percentileFromRank(1, 101)).toBe(100);
    expect(percentileFromRank(101, 101)).toBe(0);
    expect(percentileFromRank(51, 101)).toBe(50);
    expect(percentileFromRank(1, 1)).toBe(100);
  });
});
