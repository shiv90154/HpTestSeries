import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { demoCount } from "@/modules/assessment/demo";
import { liveTestWhere } from "./visibility";

/** Slug prefix of the free state GK mocks: the site's freeMockSlug is number 1 (hp-gk-free-mock-1). */
export const GK_FREE_MOCK_PREFIX = "hp-gk-free-mock-";

export type GkMock = { slug: string; title: string; titleHi: string | null; questionCount: number; durationMin: number; attempts: number };
export type SampleQuestion = { stem: string; stemHi: string; options: string[]; optionsHi: string[]; answer: number; explanation: string };

/** The free Himachal GK mocks, in number order, for the /himachal-gk-mock-test hub. */
export const getGkFreeMocks = cache(async (): Promise<GkMock[]> => {
  const tests = await db.test.findMany({
    where: { AND: [liveTestWhere(), { slug: { startsWith: GK_FREE_MOCK_PREFIX }, isFree: true }] },
    select: { slug: true, title: true, titleHi: true, durationSec: true, stats: { select: { attempts: true } }, _count: { select: { questions: true } } },
  });
  const n = (slug: string) => Number(slug.slice(GK_FREE_MOCK_PREFIX.length)) || 0;
  return tests
    .sort((a, b) => n(a.slug) - n(b.slug))
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      titleHi: t.titleHi,
      questionCount: t._count.questions,
      durationMin: Math.round(t.durationSec / 60),
      attempts: t.stats?.attempts ?? 0,
    }));
});

/**
 * The first questions of a free test, with answers and explanations, shown as text on a hub page so it answers
 * "... mock test with answers" searches and students see the level before starting. `subject` keeps only one subject
 * (the GK hub shows Himachal GK, not the reasoning section). Free tests, or the free demo of a paid one: its first
 * questions are the demo every visitor can already open.
 */
export const getSampleQuestions = cache(async (testSlug: string, take = 5, subject?: string): Promise<SampleQuestion[]> => {
  const test = await db.test.findUnique({
    where: { slug: testSlug },
    select: { isFree: true, demoPercent: true, sections: { select: { id: true, _count: { select: { questions: true } } } } },
  });
  if (!test || (!test.isFree && test.demoPercent <= 0)) return [];
  // A paid test shows only questions inside its free demo: the first demoCount() of each section.
  const open = new Map(test.sections.map((s) => [s.id, test.isFree ? s._count.questions : demoCount(s._count.questions, test.demoPercent)]));
  const rows = await db.testQuestion.findMany({
    where: { test: { slug: testSlug }, ...(subject ? { question: { topics: { some: { topic: { subject: { slug: subject } } } } } } : {}) },
    orderBy: [{ section: { order: "asc" } }, { order: "asc" }],
    take: 200,
    select: {
      sectionId: true,
      order: true,
      question: {
        select: {
          contents: { select: { lang: true, stem: true, explanation: true } },
          options: { orderBy: { order: "asc" }, select: { isCorrect: true, contents: { select: { lang: true, text: true } } } },
        },
      },
    },
  });
  return rows
    .filter((r) => r.order < (open.get(r.sectionId) ?? 0))
    .slice(0, take)
    .map(({ question: q }) => {
      const en = q.contents.find((c) => c.lang === "en");
      const hi = q.contents.find((c) => c.lang === "hi");
      const text = (lang: string) => q.options.map((o) => o.contents.find((c) => c.lang === lang)?.text ?? "");
      return {
        stem: en?.stem ?? "",
        stemHi: hi?.stem ?? "",
        options: text("en"),
        optionsHi: text("hi"),
        answer: q.options.findIndex((o) => o.isCorrect),
        explanation: en?.explanation ?? "",
      };
    });
});
