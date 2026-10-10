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
  if (bodySlug === "hp-police") return "police";
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

/** Search: every typed word must appear in the exam's names or its category ("hc clerk", "nurse", "पटवारी"). */
export function matchesSearch(query: string, haystack: (string | null | undefined)[]): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = haystack.filter(Boolean).join(" ").toLowerCase();
  return words.every((w) => text.includes(w));
}

/** Extra words students type for an exam that are not in its name, e.g. "hc" for the High Court. */
export function searchAliases(bodySlug: string, examSlug: string): string[] {
  const out: string[] = [];
  if (bodySlug === "hp-high-court") out.push("hc", "high court");
  if (examSlug === "steno-typist" || examSlug === "stenographer") out.push("steno");
  if (examSlug.includes("nurs")) out.push("nurse", "nursing");
  if (examSlug === "hp-tet") out.push("tet", "teacher");
  return out;
}
