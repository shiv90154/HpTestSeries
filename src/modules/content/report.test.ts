import { describe, expect, it } from "vitest";
import { MAX_REPORT_NOTE, stemPreview, validateReport } from "./report";

describe("validateReport", () => {
  it("accepts a reason with an optional note", () => {
    expect(validateReport({ questionId: "q1", reason: "WRONG_ANSWER", note: "  " })).toEqual({
      ok: true,
      value: { questionId: "q1", reason: "WRONG_ANSWER", note: "" },
    });
  });

  it('requires a note for "something else"', () => {
    expect(validateReport({ questionId: "q1", reason: "OTHER", note: "bad" })).toEqual({ ok: false, error: "note-required" });
    expect(validateReport({ questionId: "q1", reason: "OTHER", note: "Option C is repeated" }).ok).toBe(true);
  });

  it("rejects unknown reasons, long notes and missing ids", () => {
    expect(validateReport({ questionId: "q1", reason: "SPAM", note: "" })).toEqual({ ok: false, error: "invalid" });
    expect(validateReport({ questionId: "q1", reason: "TYPO", note: "x".repeat(MAX_REPORT_NOTE + 1) }).ok).toBe(false);
    expect(validateReport({ questionId: "", reason: "TYPO", note: "" }).ok).toBe(false);
    expect(validateReport(null).ok).toBe(false);
  });
});

describe("stemPreview", () => {
  it("strips markdown, images and maths delimiters", () => {
    expect(stemPreview("**Which** river ![map](https://x/y.png) flows $x^2$ [here](/a)?\n\n> quote")).toBe("Which river flows x^2 here? quote");
  });
  it("truncates long stems with an ellipsis", () => {
    const out = stemPreview("a ".repeat(200), 20);
    expect(out.length).toBeLessThanOrEqual(20);
    expect(out.endsWith("…")).toBe(true);
  });
});
