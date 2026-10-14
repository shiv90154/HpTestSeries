// Temporary: stats and collision report for the HP PGT mocks. Delete when done.
import { EXAM_SERIES } from "./prisma/exam-series";
import { PGT_SUBJECTS } from "./prisma/hp-pgt";
import { HPAS_FREE_TESTS } from "./prisma/hpas";
import { JOA_IT_TESTS } from "./prisma/joa-it";
import { PANCHAYAT_SECRETARY_TESTS } from "./prisma/panchayat-secretary";
import { PATWARI_TESTS } from "./prisma/patwari";
import { balanceAnswers } from "./prisma/patwari/types";
import { POLICE_TESTS } from "./prisma/police";
import { taxonomy } from "./prisma/taxonomy";
import { UPCOMING_FREE_TESTS } from "./prisma/upcoming-free";
import { questionTextHash } from "./src/modules/content/text-hash";

const only = process.argv[2];
const topics = new Set(taxonomy.flatMap((s) => s.topics.map(([t]) => `${s.slug}/${t}`)));
for (const p of PGT_SUBJECTS) {
  if (only && p.slug !== only) continue;
  p.mocks.forEach((qs, i) => {
    const b = balanceAnswers(qs);
    const sec = [0, 1, 2, 3].map((s) => qs.filter((x) => x.s === s).length);
    const d = ["E", "M", "H"].map((k) => qs.filter((x) => x.d === k).length);
    const a = [0, 1, 2, 3].map((k) => b.filter((x) => x.a === k).length);
    const order = qs.every((x, j) => j === 0 || qs[j - 1].s <= x.s);
    const bad = qs.filter((x) => new Set(x.en[1].map((o) => o.trim())).size !== 4 || new Set(x.hi[1].map((o) => o.trim())).size !== 4);
    const badTopic = qs.filter((x) => !topics.has(`${x.subject}/${x.topic}`)).map((x) => `${x.subject}/${x.topic}`);
    const chk = qs.filter((x) => x.chk).filter((x) => {
      const v = Function(`"use strict"; return (${x.chk});`)() as number;
      const m = x.en[1][x.a].match(/-?\d[\d,]*\.?\d*/);
      return !m || Math.abs(v - Number(m[0].replaceAll(",", ""))) > 1e-6;
    });
    console.log(`${p.slug} mock ${i + 1}: n=${qs.length} sec=${sec} E/M/H=${d} ans=${a} order=${order}` +
      (bad.length ? ` DUPOPT=${bad.map((x) => x.en[0].slice(0, 40))}` : "") +
      (badTopic.length ? ` BADTOPIC=${[...new Set(badTopic)]}` : "") +
      (chk.length ? ` CHKFAIL=${chk.map((x) => x.en[0].slice(0, 40))}` : ""));
  });
}

const h = (x: { en: [string, ...unknown[]] }) => questionTextHash(x.en[0]);
const other = new Set([...PATWARI_TESTS, ...POLICE_TESTS, ...JOA_IT_TESTS, ...PANCHAYAT_SECRETARY_TESTS, ...UPCOMING_FREE_TESTS, ...HPAS_FREE_TESTS].flatMap((t) => t.questions.map(h)));
const tests = [...new Map(EXAM_SERIES.flatMap((s) => s.tests).map((t) => [t.slug, t])).values()];
const owner = new Map<string, string>();
for (const t of tests) if (!t.slug.startsWith("hp-pgt")) for (const x of t.questions) owner.set(h(x), t.slug);
let n = 0;
for (const t of tests.filter((t) => t.slug.startsWith("hp-pgt"))) for (const x of t.questions) {
  const k = h(x);
  if (owner.has(k)) { n++; console.log("DUP", t.slug, "<->", owner.get(k), "|", x.en[0]); }
  else if (other.has(k)) { n++; console.log("DUP-OTHER", t.slug, "|", x.en[0]); }
  owner.set(k, t.slug);
}
console.log(`collisions: ${n}`);
