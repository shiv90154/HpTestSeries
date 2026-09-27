import { describe, expect, it } from "vitest";
import { MAX_REPORT_NOTE, validateReport } from "./report";

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
