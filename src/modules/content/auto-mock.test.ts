import { describe, expect, it } from "vitest";
import { shuffle, suggestCounts, validateAutoMock } from "./auto-mock";

const base = { durationMin: 60, marksWrong: 0.25, publish: true };

describe("validateAutoMock", () => {
  it("drops zero rows and accepts the rest", () => {
    const r = validateAutoMock({ ...base, rows: [{ subjectId: "a", count: 10 }, { subjectId: "b", count: 0 }] });
    expect(r.ok && r.value.rows).toEqual([{ subjectId: "a", count: 10 }]);
  });
  it("needs at least one question", () => {
    expect(validateAutoMock({ ...base, rows: [{ subjectId: "a", count: 0 }] }).ok).toBe(false);
  });
  it("rejects a repeated subject", () => {
    expect(validateAutoMock({ ...base, rows: [{ subjectId: "a", count: 1 }, { subjectId: "a", count: 2 }] }).ok).toBe(false);
  });
});

describe("suggestCounts", () => {
  it("matches pattern rows to subjects by name", () => {
    const pattern = { sections: [{ name: "Himachal GK", questions: 30, marks: 30 }, { name: "Maths", questions: 20, marks: 20 }], durationMin: 120, negativeMarking: "", note: "" };
    const m = suggestCounts(pattern, [{ id: "s1", name: "Himachal GK" }, { id: "s2", name: "Mathematics" }, { id: "s3", name: "English" }]);
    expect(m.get("s1")).toBe(30);
    expect(m.has("s3")).toBe(false);
  });
});

describe("shuffle", () => {
  it("keeps all items", () => {
    expect(shuffle([1, 2, 3, 4]).sort()).toEqual([1, 2, 3, 4]);
  });
});
