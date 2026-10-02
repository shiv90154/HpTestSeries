// Pure helpers that turn exam and body slugs into the names candidates search for. No database, so tests can import them.

/** The prefix that makes an exam name searchable, per recruiting body; other bodies get "HP ". */
const EXAM_PREFIX: Record<string, string> = {
  hprca: "HPRCA",
  hppsc: "HPPSC",
  pgimer: "PGIMER",
  hpsebl: "HPSEBL",
  hpscb: "HPSCB",
};

/** How candidates name a recruiting body in a sentence. */
const BODY_NAME: Record<string, string> = {
  ...EXAM_PREFIX,
  "hp-police": "HP Police",
  "hp-revenue": "HP Revenue Department",
  "hp-high-court": "HP High Court",
};

/**
 * The name candidates search for ("HPAS", "HP Patwari"), read from the admin-written SEO title ("<name> Mock Test {year} — ...").
 * Falls back to the full label when the title does not follow that shape, so a custom title can never garble the page.
 */
export function examShortName(label: string, seoTitle: string): string {
  const m = seoTitle.match(/^(.{3,40}?)\s+Mock Test\b/i);
  return m ? m[1] : label;
}

/** How candidates name a recruiting body: "HPRCA", "HP Police", "HP High Court". */
export function bodyShortName(bodySlug: string): string {
  return BODY_NAME[bodySlug] ?? bodySlug.toUpperCase();
}

/** SEO label: "HPRCA JOA IT", "HPPSC HPAS", "HP Police Constable", "HP TET", "HP Patwari", "HP High Court Clerk". */
export function examLabel(bodySlug: string, name: string): string {
  const prefix = EXAM_PREFIX[bodySlug];
  if (prefix) return name.toLowerCase().startsWith(prefix.toLowerCase()) ? name : `${prefix} ${name}`;
  return name.startsWith("HP ") ? name : `HP ${name}`;
}
