import { describe, expect, it } from "vitest";
import { clipDescription } from "./seo";

describe("clipDescription", () => {
  it("leaves a short description alone", () => {
    expect(clipDescription("Free HP Patwari mock tests.")).toBe("Free HP Patwari mock tests.");
  });

  it("cuts a long one at a word boundary, within the limit", () => {
    const long = "Solve HPPSC HPAS Combined Competitive Exam previous year papers in real CBT format with Hindi and English questions, solutions for every question and your HP rank.";
    const out = clipDescription(long, 100);
    expect(out.length).toBeLessThanOrEqual(100);
    expect(out.endsWith("…")).toBe(true);
    expect(long.startsWith(out.slice(0, -1))).toBe(true);
    expect(out).not.toMatch(/\s…$/);
  });
});
