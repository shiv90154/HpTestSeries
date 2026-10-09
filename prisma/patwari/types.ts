// Shared shapes and the compact question builder for the HP Patwari mock tests.

export type Diff = "E" | "M" | "H";
export type Opts = [string, string, string, string];
/** [question, options, explanation] for one language. */
export type LangBlock = [q: string, o: Opts, e: string];

export type PatwariQuestion = {
  /** index into SECTIONS */
  s: 0 | 1 | 2 | 3 | 4 | 5;
  subject: string;
  topic: string;
  d: Diff;
  /** index of the correct option (0 = A) */
  a: 0 | 1 | 2 | 3;
  en: LangBlock;
  hi: LangBlock;
  /** Optional JS expression that must equal the correct option's number; checked in the unit test only. */
  chk?: string;
};

export const SECTIONS = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", count: 30 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 20 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 15 },
  { name: "Mathematics", nameHi: "गणित", count: 15 },
  { name: "Hindi & English", nameHi: "हिंदी एवं अंग्रेज़ी", count: 15 },
  { name: "Revenue & Computer", nameHi: "राजस्व एवं कंप्यूटर", count: 5 },
] as const;

export function q(
  s: PatwariQuestion["s"],
  subject: string,
  topic: string,
  d: Diff,
  a: PatwariQuestion["a"],
  en: LangBlock,
  hi: LangBlock,
  chk?: string,
): PatwariQuestion {
  return { s, subject, topic, d, a, en, hi, chk };
}

// Options that only make sense in a fixed position ("Both I and II", "None of these", …) must not be moved.
const FIXED_ORDER = /\b(both|neither|none|all of|only|same|no change|no error|either)\b/i;

/**
 * Spreads the correct answer evenly over A–D. Moves options only in questions where the order does not
 * matter, identically in both languages, so explanations and translations stay valid. Deterministic.
 */
export function balanceAnswers(questions: PatwariQuestion[]): PatwariQuestion[] {
  const counts = [0, 0, 0, 0];
  const out = questions.map((x) => ({ ...x }));
  const movable = out.map((x) => !x.en[1].some((o) => FIXED_ORDER.test(o)));
  out.forEach((x, i) => {
    if (!movable[i]) counts[x.a]++;
  });
  out.forEach((x, i) => {
    if (!movable[i]) return;
    // least-used position; ties go to the position after the last one used, so the pattern rotates
    let target = 0;
    for (let p = 1; p < 4; p++) if (counts[p] < counts[target]) target = p;
    if (counts[x.a] === counts[target]) target = x.a; // already as good as any: leave it
    const swap = (o: Opts): Opts => {
      const c = [...o] as Opts;
      [c[x.a], c[target]] = [c[target], c[x.a]];
      return c;
    };
    x.en = [x.en[0], swap(x.en[1]), x.en[2]];
    x.hi = [x.hi[0], swap(x.hi[1]), x.hi[2]];
    x.a = target as PatwariQuestion["a"];
    counts[target]++;
  });
  return out;
}

/** One test to seed: a full mock (six sections) or a single-subject sectional test. */
export type TestDef = {
  slug: string;
  title: string;
  titleHi: string;
  type: "MOCK" | "SECTIONAL";
  durationSec: number;
  /** Free demo share of every section (0 or omitted = no demo). Editable per test in the admin panel afterwards. */
  demoPercent?: number;
  /** Whole test free for everyone (the series' sample mock); demoPercent is then irrelevant. */
  isFree?: boolean;
  /** Marks deducted per wrong answer in every section; default 0.25. */
  marksWrong?: number;
  instructions: string;
  sections: { name: string; nameHi: string }[];
  questions: PatwariQuestion[];
};
