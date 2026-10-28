// Himachal GK Free Mock Tests 2-5: no-login, 25 Himachal GK questions each, for the /himachal-gk-mock-test hub.
//
// Students search "hp gk mock test" (and "... in hindi") more than any other free-test query, but only Free Mock 1
// existed. These mocks are drawn from the Himachal GK questions already in the bank (written and checked for the
// exam series), spread across topics, so no new facts are introduced here. No question repeats across the free GK
// mocks. Idempotent: an existing test (matched by slug) is left alone, so admin edits survive a re-seed.

import type { PrismaClient } from "../src/generated/prisma/client";
import { hp } from "../src/sites/hp";
import { DEMO_TEST_SLUG } from "./seed-demo";

export const HP_GK_FREE_MOCK_PREFIX = "hp-gk-free-mock-";

/** Questions per topic in each mock: 25 in all. */
const QUOTA: [topic: string, count: number][] = [
  ["history", 4],
  ["geography", 4],
  ["rivers-lakes", 3],
  ["districts", 3],
  ["culture-festivals", 4],
  ["economy", 2],
  ["polity-administration", 3],
  ["personalities", 2],
];

const MOCKS = [2, 3, 4, 5];

const questionFacts = {
  topics: { select: { topic: { select: { slug: true, subject: { select: { slug: true } } } } } },
  contents: { where: { lang: "en" as const }, select: { stem: true } },
  options: { where: { isCorrect: true }, select: { contents: { where: { lang: "en" as const }, select: { text: true } } } },
};

type Fact = { id: string; keys: string[]; words: Set<string>; topic?: string };
type FactSource = {
  topics: { topic: { slug: string; subject: { slug: string } } }[];
  options: { contents: { text: string }[] }[];
};

const DISTRICTS = new Set(hp.districts.flatMap((d) => d.toLowerCase().split(/[^a-z]+/)).filter(Boolean));

/**
 * The facts a question asks, as keys: its topic with its correct answer ("rivers-lakes/renukalake") however it is
 * worded, and, when the answer names a person, dynasty or place that is not a district, that name alone ("parmar",
 * "katoch", "naggar"), so "first Chief Minister" and "architect of Himachal" count as one fact.
 */
function factKeys(q: FactSource): string[] {
  const topic = q.topics.find((t) => t.topic.subject.slug === "hp-gk")?.topic.slug ?? "";
  const words = (q.options[0]?.contents[0]?.text ?? "").toLowerCase().replace(/(lord|shri|sri|ji|the|valley|district|dynasty|dr)/g, " ").split(/[^a-z0-9]+/).filter(Boolean);
  const keys = [`${topic}/${words.join("")}`];
  const last = words.at(-1);
  if (last && /^[a-z]{4,}$/.test(last) && !DISTRICTS.has(last)) keys.push(last);
  return keys;
}

const STOP = new Set(["the", "of", "is", "in", "which", "what", "a", "an", "and", "to", "on", "at", "by", "for", "was", "as", "from", "with", "himachal", "pradesh", "h.p.", "hp"]);

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

export async function seedHpGkFreeMocks(db: PrismaClient) {
  const slugs = MOCKS.map((n) => `${HP_GK_FREE_MOCK_PREFIX}${n}`);
  const existing = await db.test.findMany({
    where: { slug: { in: [DEMO_TEST_SLUG, ...slugs] } },
    select: { slug: true, questions: { select: { questionId: true, question: { select: questionFacts } } } },
  });
  const used = new Set(existing.flatMap((t) => t.questions.map((q) => q.questionId)));
  const have = new Set(existing.map((t) => t.slug));
  if (slugs.every((s) => have.has(s))) return { created: 0 };
  // The bank asks some facts several times in different words ("largest natural lake", "biggest natural lake").
  // A fact already in a free GK mock is not asked again in another one.
  const askedFacts = new Set(existing.flatMap((t) => t.questions.flatMap((q) => factKeys(q.question))));
  const askedStems = existing.flatMap((t) => t.questions.map((q) => contentWords(q.question.contents[0]?.stem ?? "")));

  // Published, bilingual Himachal GK questions with four options. Dated facts (current affairs, "as of 2024") age
  // badly in a free test that stays up for years, so stems naming a recent year are left out.
  const pool = await db.question.findMany({
    where: {
      status: "PUBLISHED",
      difficulty: { in: ["EASY", "MEDIUM"] },
      topics: { some: { topic: { subject: { slug: "hp-gk" } } } },
      contents: { some: { lang: "hi" } },
    },
    orderBy: { textHash: "asc" },
    select: { id: true, ...questionFacts, _count: { select: { options: true } } },
  });
  const byTopic = new Map<string, Fact[]>();
  for (const q of pool) {
    if (used.has(q.id) || q._count.options !== 4) continue;
    const stem = q.contents[0]?.stem ?? "";
    if (/\b20(1[89]|2\d)\b/.test(stem) || stem.includes("![")) continue;
    const topic = q.topics.find((t) => t.topic.subject.slug === "hp-gk")?.topic.slug;
    if (!topic) continue;
    byTopic.set(topic, [...(byTopic.get(topic) ?? []), { id: q.id, keys: factKeys(q), words: contentWords(stem) }]);
  }

  let created = 0;
  for (const [i, n] of MOCKS.entries()) {
    const slug = slugs[i];
    if (have.has(slug)) continue;
    const picked: Fact[] = [];
    const take = (topic: string, want: number) => {
      const candidates = byTopic.get(topic) ?? [];
      let got = 0;
      for (let k = 0; k < candidates.length && got < want; ) {
        const c = candidates[k];
        if (c.keys.some((key) => askedFacts.has(key)) || askedStems.some((w) => overlap(w, c.words) >= 0.5)) {
          k++;
          continue;
        }
        candidates.splice(k, 1);
        for (const key of c.keys) askedFacts.add(key);
        askedStems.push(c.words);
        picked.push({ ...c, topic });
        got++;
      }
    };
    for (const [topic, count] of QUOTA) take(topic, count);
    // A topic that ran out of fresh facts is made up from the others, in quota order.
    for (const [topic] of QUOTA) if (picked.length < 25) take(topic, 25 - picked.length);
    const ids = picked.map((f) => f.id);
    if (ids.length < 25) throw new Error(`Not enough Himachal GK questions for ${slug}: ${ids.length} of 25`);

    const test = await db.test.create({
      select: { id: true, sections: { select: { id: true } } },
      data: {
        slug,
        site: hp.code,
        title: `Himachal GK Free Mock Test ${n}`,
        titleHi: `हिमाचल GK फ्री मॉक टेस्ट ${n}`,
        type: "MOCK",
        durationSec: 20 * 60,
        isFree: true,
        status: "PUBLISHED",
        publishedAt: new Date(),
        instructions:
          "25 Himachal GK questions on history, geography, rivers, districts, culture, economy and polity of Himachal Pradesh: the section every HPRCA, HP Police, Patwari, High Court and HPAS exam has.",
        sections: { create: [{ name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", order: 0, marksCorrect: 1, marksWrong: 0.25 }] },
      },
    });
    await db.testQuestion.createMany({ data: ids.map((questionId, order) => ({ testId: test.id, sectionId: test.sections[0].id, questionId, order })) });
    created++;
  }
  return { created };
}
