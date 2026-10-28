// Builds tests out of questions already in the bank (written and checked for the exam series), so a new mock adds no
// new facts. Used by the free Himachal GK mocks and the extra HPAS mocks.
//
// A picker never repeats a question, and never asks the same fact twice across the tests it is told about: the bank
// asks some facts several times in different words ("largest natural lake", "biggest natural lake").

import type { PrismaClient } from "../src/generated/prisma/client";
import { hp } from "../src/sites/hp";

type Difficulty = "EASY" | "MEDIUM" | "HARD";

/** `count` questions of `subject` (optionally only some of its topics) for section `section` of a test. */
export type Slot = { section: number; subject: string; topics?: string[]; count: number };

const questionFacts = {
  topics: { select: { topic: { select: { slug: true, subject: { select: { slug: true } } } } } },
  contents: { where: { lang: "en" as const }, select: { stem: true } },
  options: { where: { isCorrect: true }, select: { contents: { where: { lang: "en" as const }, select: { text: true } } } },
};

type FactSource = {
  topics: { topic: { slug: string; subject: { slug: string } } }[];
  contents: { stem: string }[];
  options: { contents: { text: string }[] }[];
};
type Candidate = { id: string; subject: string; topic: string; keys: string[]; words: Set<string> };

const DISTRICTS = new Set(hp.districts.flatMap((d) => d.toLowerCase().split(/[^a-z]+/)).filter(Boolean));
const STOP = new Set(["the", "of", "is", "in", "which", "what", "a", "an", "and", "to", "on", "at", "by", "for", "was", "as", "from", "with", "himachal", "pradesh", "h.p.", "hp", "india", "indian", "following"]);

/**
 * The facts a question asks, as keys: its topic with its correct answer ("rivers-lakes/renukalake") however it is
 * worded, and, when the answer names a person, dynasty or place that is not an HP district, that name alone
 * ("parmar", "katoch", "naggar"), so "first Chief Minister" and "architect of Himachal" count as one fact. Numeric
 * answers ("12", "1971") are too common to stand alone and keep only the topic key.
 */
function factKeys(q: FactSource): string[] {
  const t = q.topics[0]?.topic;
  const words = (q.options[0]?.contents[0]?.text ?? "")
    .toLowerCase()
    .replace(/\b(lord|shri|sri|ji|the|valley|district|dynasty|dr)\b/g, " ")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  const keys = [`${t?.subject.slug}/${t?.slug}/${words.join("")}`];
  const last = words.at(-1);
  if (last && /^[a-z]{4,}$/.test(last) && !DISTRICTS.has(last)) keys.push(last);
  return keys;
}

function contentWords(stem: string): Set<string> {
  return new Set(stem.toLowerCase().split(/[^a-z0-9.]+/).filter((w) => w.length > 2 && !STOP.has(w)));
}

/** Share of the shorter question's content words that the other also uses: 0.5 or more reads as the same question. */
function overlap(a: Set<string>, b: Set<string>): number {
  const small = a.size <= b.size ? a : b;
  const big = small === a ? b : a;
  if (!small.size) return 0;
  let n = 0;
  for (const w of small) if (big.has(w)) n++;
  return n / small.size;
}

/**
 * A picker over the published, bilingual, four-option questions of `subjects`, harder ones first when `difficulties`
 * lists them first. `avoidTests` are the tests whose questions (and facts) must not come back. Stems naming a recent
 * year (current affairs, "as of 2024") age badly and stems with images do not show in every view, so both are left out.
 * The fact check (`dedupe`) suits GK-style subjects; for reasoning and maths, where many questions share an answer
 * like "24", it is switched off and only exact repeats are avoided.
 */
export async function createBankPicker(
  db: PrismaClient,
  { subjects, difficulties, avoidTests, dedupe = true }: { subjects: string[]; difficulties: Difficulty[]; avoidTests: string[]; dedupe?: boolean },
) {
  const existing = await db.testQuestion.findMany({
    where: { test: { slug: { in: avoidTests } } },
    select: { questionId: true, question: { select: questionFacts } },
  });
  const used = new Set(existing.map((q) => q.questionId));
  const askedFacts = new Set(dedupe ? existing.flatMap((q) => factKeys(q.question)) : []);
  const askedStems = dedupe ? existing.map((q) => contentWords(q.question.contents[0]?.stem ?? "")) : [];

  const pool = await db.question.findMany({
    where: {
      status: "PUBLISHED",
      difficulty: { in: difficulties },
      topics: { some: { topic: { subject: { slug: { in: subjects } } } } },
      contents: { some: { lang: "hi" } },
    },
    orderBy: { textHash: "asc" },
    select: { id: true, difficulty: true, ...questionFacts, _count: { select: { options: true } } },
  });
  const rank = (d: string) => difficulties.indexOf(d as Difficulty);
  pool.sort((a, b) => rank(a.difficulty) - rank(b.difficulty));

  const candidates: Candidate[] = [];
  for (const q of pool) {
    if (used.has(q.id) || q._count.options !== 4) continue;
    const stem = q.contents[0]?.stem ?? "";
    if (/\b20(1[89]|2\d)\b/.test(stem) || stem.includes("![")) continue;
    const t = q.topics.find((x) => subjects.includes(x.topic.subject.slug))?.topic;
    if (!t) continue;
    candidates.push({ id: q.id, subject: t.subject.slug, topic: t.slug, keys: factKeys(q), words: contentWords(stem) });
  }

  /**
   * Takes up to `slot.count` fresh questions for the slot, spread over its topics in turn. With `relaxed`, the fact
   * check is skipped (a question itself still never repeats): for topping up a section the strict pass left short.
   */
  function take(slot: Slot, { relaxed = false }: { relaxed?: boolean } = {}): string[] {
    const fresh = (c: Candidate) => relaxed || isFresh(c);
    const fits = (c: Candidate, topic?: string) => c.subject === slot.subject && (topic ? c.topic === topic : !slot.topics || slot.topics.includes(c.topic));
    const topics = slot.topics ?? [...new Set(candidates.filter((c) => fits(c)).map((c) => c.topic))];
    const ids: string[] = [];
    // Round-robin over the topics so one big topic does not fill the section; then anything that fits.
    for (let round = 0; ids.length < slot.count && round < slot.count; round++) {
      let progressed = false;
      for (const topic of topics) {
        if (ids.length >= slot.count) break;
        const k = candidates.findIndex((c) => fits(c, topic) && fresh(c));
        if (k < 0) continue;
        ids.push(claim(k));
        progressed = true;
      }
      if (!progressed) break;
    }
    while (ids.length < slot.count) {
      const k = candidates.findIndex((c) => fits(c) && fresh(c));
      if (k < 0) break;
      ids.push(claim(k));
    }
    return ids;
  }

  function isFresh(c: Candidate): boolean {
    return !c.keys.some((key) => askedFacts.has(key)) && !askedStems.some((w) => overlap(w, c.words) >= 0.5);
  }

  function claim(k: number): string {
    const [c] = candidates.splice(k, 1);
    if (dedupe) {
      for (const key of c.keys) askedFacts.add(key);
      askedStems.push(c.words);
    }
    return c.id;
  }

  return { take };
}

/** Creates a published test from picked question ids, section by section. Returns the new test's id. */
export async function createBankTest(
  db: PrismaClient,
  def: {
    slug: string;
    title: string;
    titleHi: string;
    site?: string;
    examId?: string;
    durationSec: number;
    isFree: boolean;
    instructions: string;
    marksCorrect: number;
    marksWrong: number;
    sections: { name: string; nameHi: string; questionIds: string[] }[];
  },
): Promise<string> {
  const test = await db.test.create({
    select: { id: true, sections: { select: { id: true, order: true } } },
    data: {
      slug: def.slug,
      site: def.site ?? hp.code,
      examId: def.examId,
      title: def.title,
      titleHi: def.titleHi,
      type: "MOCK",
      durationSec: def.durationSec,
      isFree: def.isFree,
      status: "PUBLISHED",
      publishedAt: new Date(),
      instructions: def.instructions,
      sections: { create: def.sections.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: def.marksCorrect, marksWrong: def.marksWrong })) },
    },
  });
  const sectionId = new Map(test.sections.map((s) => [s.order, s.id]));
  await db.testQuestion.createMany({
    data: def.sections.flatMap((s, i) => s.questionIds.map((questionId, order) => ({ testId: test.id, sectionId: sectionId.get(i)!, questionId, order }))),
  });
  return test.id;
}
