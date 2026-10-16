// Scratch: lists defence questions whose stem hash collides with any other seeded question or with each other.
import { EXAM_SERIES } from "../exam-series";
import { DEFENCE_QUESTIONS } from ".";
import { PATWARI_TESTS } from "../patwari";
import { POLICE_TESTS } from "../police";
import { JOA_IT_TESTS } from "../joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "../panchayat-secretary";
import { UPCOMING_FREE_TESTS } from "../upcoming-free";
import { HPAS_FREE_TESTS } from "../hpas";
import { questionTextHash } from "../../src/modules/content/text-hash";

const mine = new Set(DEFENCE_QUESTIONS);
const others = new Map<string, string>();
for (const t of [...EXAM_SERIES.flatMap((s) => s.tests), ...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS, ...UPCOMING_FREE_TESTS, ...HPAS_FREE_TESTS])
  for (const x of t.questions) if (!mine.has(x) && !DEFENCE_QUESTIONS.some((d) => d.en[0] === x.en[0] && d.hi[0] === x.hi[0] && d === x)) others.set(questionTextHash(x.en[0]), `${t.slug}: ${x.en[0].slice(0, 70)}`);
const seen = new Map<string, string>();
let n = 0;
for (const x of DEFENCE_QUESTIONS) {
  const h = questionTextHash(x.en[0]);
  if (others.has(h)) { n++; console.log("CLASH", x.en[0].slice(0, 80), "<->", others.get(h)); }
  if (seen.has(h)) { n++; console.log("DUP", x.en[0].slice(0, 80)); }
  seen.set(h, x.en[0]);
}
console.log(`${DEFENCE_QUESTIONS.length} defence questions, ${n} problems`);
