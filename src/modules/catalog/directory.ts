// Pure helpers for the "which exam?" grid on /tests: popularity order, job categories and search. No database.

/** Exam pages most students reach us through (Search Console, Oct 2026), most visited first. They lead the grid with a "Popular" tag. */
export const POPULAR_EXAMS = ["/hp-high-court/process-server", "/hp-high-court/stenographer", "/pgimer/nursing-officer", "/hp-high-court/clerk", "/hpbose/hp-tet"];

export const CATEGORIES = [
  { key: "court", label: "Court" },
  { key: "police", label: "Police" },
  { key: "teaching", label: "Teaching" },
  { key: "medical", label: "Nursing & Medical" },
  { key: "clerk", label: "Clerk & Office" },
  { key: "engineering", label: "Engineering" },
  { key: "forest", label: "Forest & Agriculture" },
  { key: "officer", label: "HPPSC Officer" },
  { key: "defence", label: "Defence" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

/** Exams whose slug alone would land in the wrong group. Keys are exam page paths. */
const CATEGORY_OF: Record<string, CategoryKey> = {
  "/hppsc/judicial-services": "court",
  "/hppsc/assistant-professor": "teaching",
  "/hppsc/ado": "forest",
  "/hppsc/veterinary-officer": "medical",
  "/hppsc/food-safety-officer": "medical",
  "/hppsc/medical-officer": "medical",
};

/** The job group an exam belongs to, from its body and slug, e.g. ("hprca", "staff-nurse") → "medical". */
export function examCategory(bodySlug: string, examSlug: string): CategoryKey {
  const fixed = CATEGORY_OF[`/${bodySlug}/${examSlug}`];
  if (fixed) return fixed;
  if (bodySlug === "hp-high-court") return "court";
  if (bodySlug === "hp-police" || bodySlug === "delhi-police") return "police";
  if (bodySlug === "upsc" || bodySlug === "iaf") return "defence";
  if (bodySlug === "pgimer" || /nurse|nursing|pharmac|medical|doctor/.test(examSlug)) return "medical";
  if (/tet|jbt|tgt|teacher|lecturer|professor/.test(examSlug)) return "teaching";
  if (bodySlug === "hpsebl" || /engineer|lineman|electric/.test(examSlug)) return "engineering";
  if (/forest|agri|horti|veterinary/.test(examSlug)) return "forest";
  if (bodySlug === "hppsc") return "officer";
  return "clerk";
}

/** Popular exams first in POPULAR_EXAMS order, then the rest with the most tests first. Returns a new array. */
export function sortForDirectory<T extends { href: string; tests: number; papers: number }>(exams: T[]): T[] {
  const rank = (href: string) => {
    const i = POPULAR_EXAMS.indexOf(href);
    return i === -1 ? POPULAR_EXAMS.length : i;
  };
  return [...exams].sort((a, b) => rank(a.href) - rank(b.href) || b.tests + b.papers - (a.tests + a.papers));
}

/**
 * Search: every typed word must appear in the exam's names or its category ("hc clerk", "nurse", "पटवारी"). A word
 * with a typo still matches a name word ("patwri", "proces", "constabel"): see `typoMatch`.
 */
export function matchesSearch(query: string, haystack: (string | null | undefined)[]): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = haystack.filter(Boolean).join(" ").toLowerCase();
  const textWords = text.split(/[^\p{L}\p{M}\p{N}]+/u).filter(Boolean);
  return words.every((w) => text.includes(w) || textWords.some((t) => typoMatch(w, t)));
}

/** Typos allowed in a typed word: none up to 3 letters (too many short names look alike), 1 up to 6, then 2. */
function allowedTypos(length: number): number {
  return length <= 3 ? 0 : length <= 6 ? 1 : 2;
}

/**
 * Whether typed word `w` is name word `t`, or the start of it while the student is still typing, with a few typos.
 * A typo is one wrong, missing, extra or swapped letter.
 */
export function typoMatch(w: string, t: string): boolean {
  const max = allowedTypos([...w].length);
  if (!max) return false;
  const a = [...w];
  const b = [...t];
  // Prefix lengths of `t` to compare against: the full word, and starts within `max` letters of what was typed.
  const lengths = new Set([b.length]);
  for (let n = a.length - max; n <= a.length + max; n++) if (n > 0 && n < b.length) lengths.add(n);
  for (const n of lengths) if (Math.abs(n - a.length) <= max && editDistance(a, b.slice(0, n)) <= max) return true;
  return false;
}

/** Optimal string alignment distance: insertions, deletions, substitutions and swaps of two neighbouring letters. */
function editDistance(a: string[], b: string[]): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i ? (j ? 0 : i) : j)));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Extra words students type for an exam that are not in its name, e.g. "hc" for the High Court. */
export function searchAliases(bodySlug: string, examSlug: string): string[] {
  const out: string[] = [];
  if (bodySlug === "hp-high-court") out.push("hc", "high court");
  if (examSlug === "steno-typist" || examSlug === "stenographer") out.push("steno");
  if (examSlug.includes("nurs")) out.push("nurse", "nursing");
  if (examSlug === "hp-tet") out.push("tet", "teacher");
  if (bodySlug === "upsc" || bodySlug === "iaf") out.push("defence", "army", "navy", "air force");
  if (examSlug === "cds") out.push("ima", "ota", "ina", "afa");
  if (bodySlug === "iaf") out.push("iaf", "flying");
  return out;
}
