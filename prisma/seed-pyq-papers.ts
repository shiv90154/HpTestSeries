// Seeds code-defined previous-year papers (type PYQ) for one exam, then links them into the Rs 29 PYQ pack.
// Idempotent: papers are matched by slug and only created when missing. Option order is kept exactly as printed in the paper.

import type { PrismaClient } from "../src/generated/prisma/client";
import type { PatwariQuestion } from "./patwari/types";
import { seedPyq } from "./seed-pyq";
import { upsertQuestion } from "./seed-series";

export type PyqPaper = {
  slug: string;
  title: string;
  titleHi: string;
  durationSec: number;
  instructions?: string;
  /** Marks per correct / wrong answer; defaults to 1 and 0.25. */
  marksCorrect?: number;
  marksWrong?: number;
  /** Sections of this paper; each question's `s` indexes into it. */
  sections: { name: string; nameHi: string }[];
  questions: PatwariQuestion[];
};

const INSTRUCTIONS =
  "Previous year paper, solved in the real exam format. Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. " +
  "Questions that could not be read clearly from the original paper are left out. You can switch between Hindi and English at any time.";

export async function seedPyqPapers(db: PrismaClient, cfg: { label: string; bodySlug: string; examSlug: string; papers: PyqPaper[] }) {
  const exam = await db.exam.findFirst({ where: { slug: cfg.examSlug, body: { slug: cfg.bodySlug } }, select: { id: true } });
  if (!exam) {
    console.warn(`${cfg.label}: exam ${cfg.bodySlug}/${cfg.examSlug} was deleted in admin, skipping`);
    return { created: 0, papers: 0, exams: 0 };
  }
  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  let created = 0;
  for (const p of cfg.papers) {
    if (await db.test.findUnique({ where: { slug: p.slug }, select: { id: true } })) continue;
    // Sections need their questions grouped; keep paper order inside each section.
    const questions = [...p.questions].sort((a, b) => a.s - b.s);
    const used = [...new Set(questions.map((x) => x.s))];
    const ids: string[] = [];
    for (const x of questions) ids.push(await upsertQuestion(db, cfg.label, x, topicId));

    await db.$transaction(async (tx) => {
      const t = await tx.test.create({
        select: { id: true, sections: { select: { id: true, order: true } } },
        data: {
          slug: p.slug, title: p.title, titleHi: p.titleHi, type: "PYQ", examId: exam.id, durationSec: p.durationSec,
          isFree: false, status: "PUBLISHED", publishedAt: new Date(), instructions: p.instructions ?? INSTRUCTIONS,
          sections: { create: used.map((s, order) => ({ name: p.sections[s].name, nameHi: p.sections[s].nameHi, order, marksCorrect: p.marksCorrect ?? 1, marksWrong: p.marksWrong ?? 0.25 })) },
        },
      });
      const sectionId = new Map(t.sections.map((s) => [used[s.order], s.id]));
      const perSection = new Map<number, number>();
      await tx.testQuestion.createMany({
        data: questions.map((x, i) => {
          const order = perSection.get(x.s) ?? 0;
          perSection.set(x.s, order + 1);
          return { testId: t.id, sectionId: sectionId.get(x.s)!, questionId: ids[i], order };
        }),
      });
    });
    created++;
  }
  const pack = await seedPyq(db);
  return { created, ...pack };
}
