// Bulk question import: CSV parsing + row validation (BLUEPRINT §7–8).
// Pure — DB lookups are passed in — so every rule is unit-tested.

import Papa from "papaparse";
import { questionTextHash } from "./text-hash";

export const MAX_IMPORT_ROWS = 2000;
const MAX_STEM = 5000;
const MAX_OPTION = 1000;
const MAX_EXPLANATION = 10000;

const LANGS = ["en", "hi"] as const;
type Lang = (typeof LANGS)[number];

const OPTION_LETTERS = ["a", "b", "c", "d", "e"] as const;

/** Column order for the downloadable template. */
export const IMPORT_COLUMNS = [
  "subject",
  "topic",
  "difficulty",
  "answer",
  "source",
  "source_exam",
  "source_year",
  "question_en",
  ...OPTION_LETTERS.map((l) => `${l}_en`),
  "explanation_en",
  "question_hi",
  ...OPTION_LETTERS.map((l) => `${l}_hi`),
  "explanation_hi",
] as const;

export type ImportLookups = {
  /** "subjectSlug/topicSlug" → topic id */
  topics: Map<string, string>;
  /** "bodySlug/examSlug" → exam id */
  exams: Map<string, string>;
  /** for source_year upper bound */
  currentYear: number;
};

export type ParsedQuestion = {
  row: number;
  topicId: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  sourceType: "ORIGINAL" | "PYQ";
  sourceExamId: string | null;
  sourceYear: number | null;
  correctIndex: number;
  contents: { lang: Lang; stem: string; explanation: string | null }[];
  /** options[i] = texts of option i per language */
  options: { lang: Lang; text: string }[][];
  textHash: string;
  /** short preview for the admin UI */
  preview: string;
};

export type RowError = { row: number; messages: string[] };

export type ImportParseResult = {
  questions: ParsedQuestion[];
  errors: RowError[];
  totalRows: number;
  /** file-level problems (missing columns, too many rows, unreadable CSV) */
  fatal: string | null;
};

function normalizeHeader(h: string): string {
  return h.replace(/^﻿/, "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function parseCsv(text: string): { rows: Record<string, string>[]; headers: string[]; error: string | null } {
  const result = Papa.parse<Record<string, string>>(text.replace(/^﻿/, ""), {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: normalizeHeader,
  });
  const fatal = result.errors.find((e) => e.type === "Quotes" || e.type === "Delimiter");
  return {
    rows: result.data,
    headers: result.meta.fields ?? [],
    error: fatal ? `Could not read the CSV (row ${(fatal.row ?? 0) + 2}): ${fatal.message}` : null,
  };
}

const DIFFICULTY: Record<string, ParsedQuestion["difficulty"]> = {
  easy: "EASY",
  e: "EASY",
  medium: "MEDIUM",
  m: "MEDIUM",
  hard: "HARD",
  h: "HARD",
};

function cell(row: Record<string, string>, key: string): string {
  return (row[key] ?? "").trim();
}

export function validateRows(rows: Record<string, string>[], headers: string[], lookups: ImportLookups): ImportParseResult {
  const base = { questions: [], errors: [], totalRows: rows.length };

  const required = ["subject", "topic", "answer"];
  const missing = required.filter((c) => !headers.includes(c));
  if (!headers.includes("question_en") && !headers.includes("question_hi")) missing.push("question_en or question_hi");
  if (missing.length) return { ...base, fatal: `Missing required column(s): ${missing.join(", ")}` };
  if (rows.length === 0) return { ...base, fatal: "The file has no question rows." };
  if (rows.length > MAX_IMPORT_ROWS) {
    return { ...base, fatal: `Too many rows (${rows.length}). Split the file into batches of ${MAX_IMPORT_ROWS}.` };
  }

  const questions: ParsedQuestion[] = [];
  const errors: RowError[] = [];
  const seenHashes = new Map<string, number>();

  rows.forEach((r, i) => {
    const row = i + 2; // spreadsheet row number (row 1 = header)
    const msgs: string[] = [];

    // Topic
    const topicKey = `${cell(r, "subject").toLowerCase()}/${cell(r, "topic").toLowerCase()}`;
    const topicId = lookups.topics.get(topicKey);
    if (!topicId) msgs.push(`Unknown subject/topic "${topicKey}"`);

    // Difficulty (defaults to medium)
    const diffRaw = cell(r, "difficulty").toLowerCase();
    const difficulty = diffRaw ? DIFFICULTY[diffRaw] : "MEDIUM";
    if (!difficulty) msgs.push(`Difficulty must be easy, medium or hard (got "${diffRaw}")`);

    // Languages and options
    const contents: ParsedQuestion["contents"] = [];
    const optionTexts: Record<Lang, string[]> = { en: [], hi: [] };

    for (const lang of LANGS) {
      const stem = cell(r, `question_${lang}`);
      const opts = OPTION_LETTERS.map((l) => cell(r, `${l}_${lang}`));
      const explanation = cell(r, `explanation_${lang}`);
      const anyOption = opts.some(Boolean);

      if (!stem) {
        if (anyOption || explanation) msgs.push(`[${lang}] options/explanation given without question_${lang}`);
        continue;
      }
      if (stem.length > MAX_STEM) msgs.push(`[${lang}] question is longer than ${MAX_STEM} characters`);
      if (explanation.length > MAX_EXPLANATION) msgs.push(`[${lang}] explanation is too long`);

      const lastFilled = opts.findLastIndex(Boolean);
      const count = lastFilled + 1;
      if (count < 2) msgs.push(`[${lang}] at least options A and B are required`);
      else if (opts.slice(0, count).some((o) => !o)) msgs.push(`[${lang}] options must be filled in order without gaps`);
      if (opts.some((o) => o.length > MAX_OPTION)) msgs.push(`[${lang}] an option is longer than ${MAX_OPTION} characters`);

      contents.push({ lang, stem, explanation: explanation || null });
      optionTexts[lang] = opts.slice(0, count);
    }

    if (contents.length === 0) msgs.push("Question text is required in English or Hindi");

    const counts = contents.map((c) => optionTexts[c.lang].length);
    const optionCount = counts[0] ?? 0;
    if (counts.length === 2 && counts[0] !== counts[1]) {
      msgs.push(`English has ${counts[0]} options but Hindi has ${counts[1]}`);
    }

    // Answer
    const answer = cell(r, "answer").toLowerCase();
    const correctIndex = OPTION_LETTERS.indexOf(answer as (typeof OPTION_LETTERS)[number]);
    if (correctIndex === -1) msgs.push(`Answer must be a letter A–E (got "${cell(r, "answer")}")`);
    else if (optionCount && correctIndex >= optionCount) msgs.push(`Answer ${answer.toUpperCase()} has no matching option`);

    // Source
    const sourceRaw = cell(r, "source").toLowerCase() || "original";
    let sourceType: ParsedQuestion["sourceType"] = "ORIGINAL";
    let sourceExamId: string | null = null;
    let sourceYear: number | null = null;
    if (sourceRaw === "pyq") {
      sourceType = "PYQ";
      const examKey = cell(r, "source_exam").toLowerCase();
      sourceExamId = lookups.exams.get(examKey) ?? null;
      if (!sourceExamId) msgs.push(`PYQ needs a known source_exam like "hprca/joa-it" (got "${examKey}")`);
      const year = Number(cell(r, "source_year"));
      if (!Number.isInteger(year) || year < 1990 || year > lookups.currentYear) {
        msgs.push(`PYQ needs a valid source_year (got "${cell(r, "source_year")}")`);
      } else sourceYear = year;
    } else if (sourceRaw !== "original") {
      msgs.push(`Source must be "original" or "pyq" (got "${sourceRaw}")`);
    }

    // Duplicates within the file
    const primary = contents[0];
    const textHash = primary ? questionTextHash(primary.stem) : "";
    if (textHash) {
      const firstRow = seenHashes.get(textHash);
      if (firstRow) msgs.push(`Duplicate of row ${firstRow} in this file`);
      else seenHashes.set(textHash, row);
    }

    if (msgs.length) {
      errors.push({ row, messages: msgs });
      return;
    }

    questions.push({
      row,
      topicId: topicId!,
      difficulty: difficulty!,
      sourceType,
      sourceExamId,
      sourceYear,
      correctIndex,
      contents,
      options: Array.from({ length: optionCount }, (_, i) => contents.map((c) => ({ lang: c.lang, text: optionTexts[c.lang][i] }))),
      textHash,
      preview: primary!.stem.slice(0, 140),
    });
  });

  return { questions, errors, totalRows: rows.length, fatal: null };
}

export function parseQuestionCsv(text: string, lookups: ImportLookups): ImportParseResult {
  const { rows, headers, error } = parseCsv(text);
  if (error) return { questions: [], errors: [], totalRows: rows.length, fatal: error };
  return validateRows(rows, headers, lookups);
}

/** CSV template with a UTF-8 BOM so Excel shows Hindi correctly. */
export function importTemplateCsv(): string {
  const sample: Record<string, string> = {
    subject: "hp-gk",
    topic: "rivers-lakes",
    difficulty: "easy",
    answer: "B",
    source: "original",
    question_en: "Which river is known as 'Chandrabhaga' in Himachal Pradesh?",
    a_en: "Beas",
    b_en: "Chenab",
    c_en: "Ravi",
    d_en: "Sutlej",
    explanation_en: "The Chandra and Bhaga rivers meet at Tandi to form the Chandrabhaga (Chenab).",
    question_hi: "हिमाचल प्रदेश में किस नदी को 'चंद्रभागा' के नाम से जाना जाता है?",
    a_hi: "ब्यास",
    b_hi: "चिनाब",
    c_hi: "रावी",
    d_hi: "सतलुज",
    explanation_hi: "चंद्रा और भागा नदियाँ तांदी में मिलकर चंद्रभागा (चिनाब) बनाती हैं।",
  };
  return "﻿" + Papa.unparse({ fields: [...IMPORT_COLUMNS], data: [IMPORT_COLUMNS.map((c) => sample[c] ?? "")] });
}
