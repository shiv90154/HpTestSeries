import { describe, expect, it } from "vitest";
import { preferredExams, rankSuggestions, type SuggestCandidate } from "./suggest";

const c = (slug: string, o: Partial<SuggestCandidate> = {}): SuggestCandidate => ({ slug, examId: null, isFree: true, open: true, isLive: false, ...o });

describe("rankSuggestions", () => {
  it("drops taken and live tests", () => {
    const r = rankSuggestions([c("a"), c("b"), c("live", { isLive: true })], new Set(["a"]), []);
    expect(r.map((t) => t.slug)).toEqual(["b"]);
  });

  it("puts the student's own exam first, then general tests, then other exams", () => {
    const r = rankSuggestions([c("other", { examId: "x" }), c("general"), c("mine", { examId: "p" })], new Set(), ["p"]);
    expect(r.map((t) => t.slug)).toEqual(["mine", "general", "other"]);
  });

  it("puts tests the student can open before locked ones inside a group", () => {
    const r = rankSuggestions([c("locked", { examId: "p", isFree: false, open: false }), c("owned", { examId: "p", isFree: false, open: true })], new Set(), ["p"]);
    expect(r.map((t) => t.slug)).toEqual(["owned", "locked"]);
  });

  it("keeps the input order otherwise", () => {
    expect(rankSuggestions([c("a"), c("b"), c("c")], new Set(), []).map((t) => t.slug)).toEqual(["a", "b", "c"]);
  });
});

describe("preferredExams", () => {
  it("orders exams by how often they appear and ignores tests with no exam", () => {
    expect(preferredExams(["p", null, "q", "p", "q", "p"])).toEqual(["p", "q"]);
    expect(preferredExams([null])).toEqual([]);
  });
});
