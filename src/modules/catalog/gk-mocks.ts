import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { liveTestWhere } from "./visibility";

/** Slug prefix of the free state GK mocks: the site's freeMockSlug is number 1 (hp-gk-free-mock-1). */
export const GK_FREE_MOCK_PREFIX = "hp-gk-free-mock-";

export type GkMock = { slug: string; title: string; titleHi: string | null; questionCount: number; durationMin: number; attempts: number };
export type GkSample = { stem: string; stemHi: string; options: string[]; optionsHi: string[]; answer: number; explanation: string };

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
 * A few Himachal GK questions from the first free mock, with answers, shown as text on the hub so the page answers
 * "hp gk questions" searches and students see the level before starting.
 */
export const getGkSampleQuestions = cache(async (testSlug: string, take = 5): Promise<GkSample[]> => {
  const rows = await db.testQuestion.findMany({
    where: { test: { slug: testSlug }, question: { topics: { some: { topic: { subject: { slug: "hp-gk" } } } } } },
    orderBy: [{ section: { order: "asc" } }, { order: "asc" }],
    take,
    select: {
      question: {
        select: {
          contents: { select: { lang: true, stem: true, explanation: true } },
          options: { orderBy: { order: "asc" }, select: { isCorrect: true, contents: { select: { lang: true, text: true } } } },
        },
      },
    },
  });
  return rows.map(({ question: q }) => {
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
