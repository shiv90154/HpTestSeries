import { describe, expect, it } from "vitest";
import { firstSentence } from "./exam-content";

describe("firstSentence", () => {
  it("returns the first sentence as plain text", () => {
    expect(firstSentence("**Clerk** in the [High Court](/x) is a ministerial post in the registry. It handles files and records.")).toBe(
      "Clerk in the High Court is a ministerial post in the registry.",
    );
  });

  it("cuts at the limit when there is no early full stop, and copes with empty input", () => {
    const long = "word ".repeat(100);
    expect(firstSentence(long, 60).length).toBeLessThanOrEqual(60);
    expect(firstSentence(null)).toBe("");
  });
});
