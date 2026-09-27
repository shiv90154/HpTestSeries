import Papa from "papaparse";
import { describe, expect, it } from "vitest";
import { importTemplateCsv, IMPORT_COLUMNS, MAX_IMPORT_ROWS, parseQuestionCsv, type ImportLookups } from "./question-import";
import { normalizeForHash, questionTextHash } from "./text-hash";

const lookups: ImportLookups = {
  topics: new Map([
    ["hp-gk/rivers-lakes", "topic-rivers"],
    ["computer/ms-office", "topic-office"],
  ]),
  exams: new Map([["hprca/joa-it", "exam-joa"]]),
  currentYear: 2026,
};

function csv(rows: Record<string, string>[]): string {
  return Papa.unparse({ fields: [...IMPORT_COLUMNS], data: rows.map((r) => IMPORT_COLUMNS.map((c) => r[c] ?? "")) });
}

const good = {
  subject: "hp-gk",
  topic: "rivers-lakes",
  answer: "b",
  question_en: "Which river is called Chandrabhaga?",
  a_en: "Beas",
  b_en: "Chenab",
  c_en: "Ravi",
  d_en: "Sutlej",
};

describe("parseQuestionCsv", () => {
  it("parses the downloadable template (with BOM and Hindi) as one valid bilingual question", () => {
    const r = parseQuestionCsv(importTemplateCsv(), lookups);
    expect(r.fatal).toBeNull();
    expect(r.errors).toEqual([]);
    expect(r.questions).toHaveLength(1);
    const q = r.questions[0];
    expect(q).toMatchObject({ row: 2, topicId: "topic-rivers", difficulty: "EASY", correctIndex: 1, sourceType: "ORIGINAL" });
    expect(q.contents.map((c) => c.lang)).toEqual(["en", "hi"]);
    expect(q.options).toHaveLength(4);
    expect(q.options[1]).toEqual([
      { lang: "en", text: "Chenab" },
      { lang: "hi", text: "चिनाब" },
    ]);
  });

  it("accepts Hindi-only questions and 2–5 options", () => {
    const r = parseQuestionCsv(
      csv([
        { subject: "hp-gk", topic: "rivers-lakes", answer: "A", question_hi: "प्रश्न?", a_hi: "हाँ", b_hi: "नहीं" },
        { ...good, question_en: "Five options?", e_en: "Jhelum", answer: "E" },
      ]),
      lookups,
    );
    expect(r.errors).toEqual([]);
    expect(r.questions[0].contents).toEqual([{ lang: "hi", stem: "प्रश्न?", explanation: null }]);
    expect(r.questions[0].options).toHaveLength(2);
    expect(r.questions[1].options).toHaveLength(5);
    expect(r.questions[1].correctIndex).toBe(4);
  });

  it("reports every problem on a row with its spreadsheet row number", () => {
    const r = parseQuestionCsv(
      csv([
        good,
        { ...good, question_en: "Q2", subject: "hp-gk", topic: "nope", difficulty: "tough", answer: "D", d_en: "" },
      ]),
      lookups,
    );
    expect(r.questions).toHaveLength(1);
    expect(r.errors).toHaveLength(1);
    expect(r.errors[0].row).toBe(3);
    expect(r.errors[0].messages).toEqual([
      'Unknown subject/topic "hp-gk/nope"',
      'Difficulty must be easy, medium or hard (got "tough")',
      "Answer D has no matching option",
    ]);
  });

  it("rejects gaps in options, mismatched language option counts, and orphan options", () => {
    const r = parseQuestionCsv(
      csv([
        { ...good, question_en: "Gap", b_en: "" },
        { ...good, question_en: "Mismatch", question_hi: "असमान", a_hi: "क", b_hi: "ख", c_hi: "ग" },
        { ...good, question_en: "Orphan", a_hi: "क" },
      ]),
      lookups,
    );
    expect(r.questions).toHaveLength(0);
    expect(r.errors[0].messages).toContain("[en] options must be filled in order without gaps");
    expect(r.errors[1].messages).toContain("English has 4 options but Hindi has 3");
    expect(r.errors[2].messages).toContain("[hi] options/explanation given without question_hi");
  });

  it("validates PYQ source exam and year", () => {
    const r = parseQuestionCsv(
      csv([
        { ...good, question_en: "PYQ ok", source: "pyq", source_exam: "HPRCA/joa-it", source_year: "2024" },
        { ...good, question_en: "PYQ bad", source: "pyq", source_exam: "hppsc/unknown", source_year: "2031" },
      ]),
      lookups,
    );
    expect(r.questions[0]).toMatchObject({ sourceType: "PYQ", sourceExamId: "exam-joa", sourceYear: 2024 });
    expect(r.errors[0].messages).toHaveLength(2);
  });

  it("flags duplicates within the file even with different punctuation/case", () => {
    const r = parseQuestionCsv(csv([good, { ...good, question_en: "which river is called chandrabhaga" }]), lookups);
    expect(r.questions).toHaveLength(1);
    expect(r.errors[0]).toEqual({ row: 3, messages: ["Duplicate of row 2 in this file"] });
  });

  it("fails fast on missing columns, empty files, and oversized files", () => {
    expect(parseQuestionCsv("subject,topic\nhp-gk,x", lookups).fatal).toMatch(/answer, question_en or question_hi/);
    expect(parseQuestionCsv(IMPORT_COLUMNS.join(","), lookups).fatal).toMatch(/no question rows/);
    const many = csv(Array.from({ length: MAX_IMPORT_ROWS + 1 }, (_, i) => ({ ...good, question_en: `Q${i}` })));
    expect(parseQuestionCsv(many, lookups).fatal).toMatch(/Too many rows/);
  });

  it("accepts friendly header variants", () => {
    const text = "Subject,Topic,Answer,Question EN,A EN,B EN\nhp-gk,rivers-lakes,a,Q?,x,y";
    const r = parseQuestionCsv(text, lookups);
    expect(r.errors).toEqual([]);
    expect(r.questions).toHaveLength(1);
  });
});

describe("text hash", () => {
  it("ignores case, spacing, and punctuation but keeps Devanagari marks", () => {
    expect(normalizeForHash("  Which River?! ")).toBe("whichriver");
    expect(questionTextHash("Which river?")).toBe(questionTextHash("which  RIVER"));
    expect(normalizeForHash("नदी")).not.toBe(normalizeForHash("नद"));
  });
});
