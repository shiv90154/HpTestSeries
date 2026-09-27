import { describe, expect, it } from "vitest";
import { validateQuestionInput } from "./question-input";
import { emptyQuestionInput, type QuestionInput } from "./question-shape";
import { questionTextHash } from "./text-hash";

const ctx = { currentYear: 2026 };

function good(): QuestionInput {
  return {
    ...emptyQuestionInput(),
    topicId: "topic-1",
    correctIndex: 1,
    stem: { en: "  Which river is called Chandrabhaga? ", hi: "किस नदी को चंद्रभागा कहते हैं?" },
    explanation: { en: "Chandra + Bhaga", hi: "" },
    options: [
      { en: "Beas", hi: "ब्यास" },
      { en: "Chenab", hi: "चिनाब" },
      { en: "Ravi", hi: "रावी" },
      { en: "Sutlej", hi: "सतलुज" },
    ],
  };
}

describe("validateQuestionInput", () => {
  it("normalizes a valid bilingual question", () => {
    const r = validateQuestionInput(good(), ctx);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.question.contents).toEqual([
      { lang: "en", stem: "Which river is called Chandrabhaga?", explanation: "Chandra + Bhaga" },
      { lang: "hi", stem: "किस नदी को चंद्रभागा कहते हैं?", explanation: null },
    ]);
    expect(r.question.options[1]).toEqual([
      { lang: "en", text: "Chenab" },
      { lang: "hi", text: "चिनाब" },
    ]);
    // Same hash as the CSV import would compute, so duplicates are caught across both paths.
    expect(r.question.textHash).toBe(questionTextHash("Which river is called Chandrabhaga?"));
  });

  it("ignores text of a disabled language", () => {
    const q = good();
    q.langs.hi = false;
    q.options[0].hi = "";
    const r = validateQuestionInput(q, ctx);
    expect(r.ok && r.question.contents.map((c) => c.lang)).toEqual(["en"]);
    expect(r.ok && r.question.options[0]).toEqual([{ lang: "en", text: "Beas" }]);
  });

  it("hashes the Hindi text when only Hindi is enabled", () => {
    const q = good();
    q.langs.en = false;
    const r = validateQuestionInput(q, ctx);
    expect(r.ok && r.question.textHash).toBe(questionTextHash("किस नदी को चंद्रभागा कहते हैं?"));
  });

  it("reports empty text, empty options and a missing answer", () => {
    const q = good();
    q.stem.hi = " ";
    q.options[2].en = "";
    q.correctIndex = -1;
    const r = validateQuestionInput(q, ctx);
    expect(r.ok).toBe(false);
    expect(!r.ok && r.errors).toEqual(["English: option C is empty", "Hindi: question text is required", "Mark the correct answer"]);
  });

  it("requires at least one language and 2–5 options", () => {
    const q = good();
    q.langs = { en: false, hi: false };
    expect(validateQuestionInput(q, ctx)).toEqual({ ok: false, errors: ["Enable English, Hindi, or both"] });
    expect(validateQuestionInput({ ...good(), options: [{ en: "a", hi: "b" }] }, ctx).ok).toBe(false);
    expect(validateQuestionInput({ ...good(), options: Array(6).fill({ en: "a", hi: "b" }) }, ctx).ok).toBe(false);
  });

  it("rejects an answer pointing past the last option", () => {
    expect(validateQuestionInput({ ...good(), correctIndex: 4 }, ctx)).toEqual({ ok: false, errors: ["Mark the correct answer"] });
  });

  it("validates PYQ source", () => {
    const q: QuestionInput = { ...good(), sourceType: "PYQ", sourceExamId: null, sourceYear: 2030 };
    const r = validateQuestionInput(q, ctx);
    expect(!r.ok && r.errors).toEqual(["PYQ needs the exam it was asked in", "PYQ needs a year between 1990 and 2026"]);
    const ok = validateQuestionInput({ ...q, sourceExamId: "exam-1", sourceYear: 2023 }, ctx);
    expect(ok.ok && [ok.question.sourceExamId, ok.question.sourceYear]).toEqual(["exam-1", 2023]);
  });

  it("drops PYQ fields for original questions", () => {
    const r = validateQuestionInput({ ...good(), sourceExamId: "exam-1", sourceYear: 2023 }, ctx);
    expect(r.ok && [r.question.sourceExamId, r.question.sourceYear]).toEqual([null, null]);
  });

  it("rejects malformed payloads", () => {
    expect(validateQuestionInput(null, ctx).ok).toBe(false);
    expect(validateQuestionInput({ ...good(), topicId: "" }, ctx)).toEqual({ ok: false, errors: ["Choose a topic"] });
    expect(validateQuestionInput(emptyQuestionInput(), ctx)).toEqual({
      ok: false,
      errors: [
        "Choose a topic",
        "English: question text is required",
        ..."ABCD".split("").map((l) => `English: option ${l} is empty`),
        "Hindi: question text is required",
        ..."ABCD".split("").map((l) => `Hindi: option ${l} is empty`),
        "Mark the correct answer",
      ],
    });
  });
});
