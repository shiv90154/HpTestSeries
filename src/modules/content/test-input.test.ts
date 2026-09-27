import { describe, expect, it } from "vitest";
import { publishProblems, slugify, validateTestMeta, validateTestStructure } from "./test-input";

describe("slugify", () => {
  it("makes a URL-safe slug", () => {
    expect(slugify("HPRCA JOA IT — Mock Test 1 (2026)")).toBe("hprca-joa-it-mock-test-1-2026");
    expect(slugify("  Café  ")).toBe("cafe");
    expect(slugify("हिमाचल GK टेस्ट")).toBe("gk");
    expect(slugify("a".repeat(100))).toHaveLength(80);
  });
});

const meta = { title: "JOA IT Mock 1", titleHi: "", slug: "joa-it-mock-1", type: "MOCK", examId: null, durationMin: 120, isFree: true, instructions: "" };

describe("validateTestMeta", () => {
  it("accepts valid details", () => {
    expect(validateTestMeta(meta).ok).toBe(true);
  });

  it("rejects bad slugs, durations and types", () => {
    for (const slug of ["Joa-It", "joa--it", "-joa", "joa it", ""]) {
      expect(validateTestMeta({ ...meta, slug }).ok, slug).toBe(false);
    }
    expect(validateTestMeta({ ...meta, durationMin: 0 }).ok).toBe(false);
    expect(validateTestMeta({ ...meta, durationMin: 1.5 }).ok).toBe(false);
    expect(validateTestMeta({ ...meta, type: "QUIZ" }).ok).toBe(false);
  });
});

const section = { name: "GK", nameHi: "", marksCorrect: 1, marksWrong: 0.25, questionIds: ["q1", "q2"] };

describe("validateTestStructure", () => {
  it("accepts valid sections", () => {
    expect(validateTestStructure({ sections: [section, { ...section, name: "Maths", questionIds: ["q3"] }] }).ok).toBe(true);
  });

  it("rejects a question used twice across sections", () => {
    const r = validateTestStructure({ sections: [section, { ...section, questionIds: ["q2"] }] });
    expect(r).toEqual({ ok: false, errors: ["A question appears more than once in this test"] });
  });

  it("rejects empty tests, nameless sections and zero marks", () => {
    expect(validateTestStructure({ sections: [] }).ok).toBe(false);
    expect(validateTestStructure({ sections: [{ ...section, name: " " }] }).ok).toBe(false);
    expect(validateTestStructure({ sections: [{ ...section, marksCorrect: 0 }] }).ok).toBe(false);
    expect(validateTestStructure({ sections: [{ ...section, marksWrong: -1 }] }).ok).toBe(false);
  });
});

describe("publishProblems", () => {
  const q = { id: "q1", status: "PUBLISHED", correctOptions: 1, preview: "Q1" };

  it("passes a complete test", () => {
    expect(publishProblems([{ name: "GK", questions: [q] }])).toEqual([]);
  });

  it("lists every blocker", () => {
    expect(
      publishProblems([
        { name: "GK", questions: [{ ...q, status: "IN_REVIEW" }, { ...q, id: "q2", correctOptions: 0, preview: "Q2" }] },
        { name: "Maths", questions: [] },
      ]),
    ).toEqual(['Not published yet (in review): "Q1"', 'Needs exactly one correct option: "Q2"', 'Section "Maths" has no questions']);
    expect(publishProblems([])).toEqual(["Add at least one section"]);
  });
});
