// Shared question bank for the smaller exam series: every question already written for the Patwari, Police, JOA IT
// and Panchayat Secretary series. General sections (Himachal GK, GS, reasoning, maths, languages, computer) are drawn
// from here so only the exam-specific sections have to be written fresh.
//
// Picks are deterministic and never hand the same question to two tests of these series. Seeding is by test slug,
// so a test already in the database keeps its questions even if a later edit to the source banks shifts the picks.

import { JOA_IT_TESTS } from "../joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "../panchayat-secretary";
import { PATWARI_TESTS } from "../patwari";
import type { PatwariQuestion } from "../patwari/types";
import { POLICE_TESTS } from "../police";
import { questionTextHash } from "../../src/modules/content/text-hash";

export type Pick = (x: PatwariQuestion) => boolean;

/** Questions that only make sense next to a passage, figure or table, or that belong to one exam's own syllabus. */
const STANDALONE_ONLY = /passage|figure|table (above|below)|graph|diagram/i;
const EXAM_SPECIFIC = (x: PatwariQuestion) => x.subject === "panchayati-raj" || (x.subject === "hp-gk" && x.topic === "revenue");

const hash = (x: PatwariQuestion) => questionTextHash(x.en[0]);

const BANK: PatwariQuestion[] = (() => {
  const seen = new Set<string>();
  const out: PatwariQuestion[] = [];
  for (const t of [...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS]) {
    for (const x of t.questions) {
      const h = hash(x);
      if (seen.has(h) || STANDALONE_ONLY.test(x.en[0]) || EXAM_SPECIFIC(x)) continue;
      seen.add(h);
      out.push(x);
    }
  }
  // Hard questions first (the mocks are set above exam level), then a stable shuffle by hash so sources mix.
  const rank = { H: 0, M: 1, E: 2 } as const;
  return out.sort((a, b) => rank[a.d] - rank[b.d] || (hash(a) < hash(b) ? -1 : 1));
})();

const used = new Set<string>();

/** Takes `n` unused bank questions matching `pick` and places them in section `s`. Throws if the bank runs dry. */
export function take(s: PatwariQuestion["s"], n: number, pick: Pick, label: string): PatwariQuestion[] {
  const out: PatwariQuestion[] = [];
  for (const x of BANK) {
    if (out.length === n) break;
    const h = hash(x);
    if (used.has(h) || !pick(x)) continue;
    used.add(h);
    out.push({ ...x, s });
  }
  if (out.length < n) throw new Error(`exam-series bank: only ${out.length} of ${n} questions left for ${label}`);
  return out;
}

/** Places freshly written questions in section `s` (their own `s` is ignored). */
export const fresh = (s: PatwariQuestion["s"], qs: PatwariQuestion[]) => qs.map((x) => ({ ...x, s }));

export const subject =
  (...subjects: string[]): Pick =>
  (x) =>
    subjects.includes(x.subject);
export const topic =
  (subj: string, ...topics: string[]): Pick =>
  (x) =>
    x.subject === subj && topics.includes(x.topic);
