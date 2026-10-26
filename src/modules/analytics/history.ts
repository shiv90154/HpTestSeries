import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { percentileFromRank } from "@/modules/assessment/grading";

export const HISTORY_PAGE_SIZE = 20;

/** A student's submitted attempts whose score may be shown (a live test's stays hidden until its window closes), optionally on one test. */
export function shownAttemptsWhere(userId: string, testSlug?: string, now: Date = new Date()): Prisma.AttemptWhereInput {
  return { userId, status: "SUBMITTED", test: { ...(testSlug && { slug: testSlug }), OR: [{ liveEndsAt: null }, { liveEndsAt: { lte: now } }] } };
}

export const attemptRowSelect = {
  id: true,
  testId: true,
  isFirst: true,
  score: true,
  correct: true,
  wrong: true,
  skipped: true,
  timeSpentSec: true,
  submittedAt: true,
  test: {
    select: {
      slug: true,
      title: true,
      durationSec: true,
      sections: { select: { marksCorrect: true, _count: { select: { questions: true } } } },
    },
  },
} satisfies Prisma.AttemptSelect;

/** Score, percentage and accuracy of one submitted attempt, as the dashboard and /results list it. */
export function attemptRow(a: Prisma.AttemptGetPayload<{ select: typeof attemptRowSelect }>) {
  const maxScore = a.test.sections.reduce((n, s) => n + s._count.questions * Number(s.marksCorrect), 0);
  const score = Number(a.score ?? 0);
  const attempted = (a.correct ?? 0) + (a.wrong ?? 0);
  return {
    id: a.id,
    testId: a.testId,
    isFirst: a.isFirst,
    slug: a.test.slug,
    title: a.test.title,
    score,
    maxScore,
    percent: maxScore ? Math.max(0, Math.round((score / maxScore) * 100)) : 0,
    accuracy: attempted ? Math.round(((a.correct ?? 0) / attempted) * 100) : 0,
    correct: a.correct ?? 0,
    wrong: a.wrong ?? 0,
    skipped: a.skipped ?? 0,
    timeSpentSec: a.timeSpentSec ?? 0,
    durationSec: a.test.durationSec,
    submittedAt: a.submittedAt!,
  };
}

export type AttemptRow = ReturnType<typeof attemptRow>;
export type RankedAttemptRow = AttemptRow & { rank: { rank: number; total: number; percentile: number } | null };

/** Adds the rank to first attempts (only those are ranked, so every candidate is compared fairly); one indexed count pair each. */
export function withRanks(rows: AttemptRow[]): Promise<RankedAttemptRow[]> {
  return Promise.all(
    rows.map(async (r) => {
      if (!r.isFirst) return { ...r, rank: null };
      const where = { testId: r.testId, isFirst: true, status: "SUBMITTED" as const, flagged: false };
      const [higher, total] = await Promise.all([
        db.attempt.count({ where: { ...where, score: { gt: r.score } } }),
        db.attempt.count({ where }),
      ]);
      return { ...r, rank: { rank: higher + 1, total, percentile: percentileFromRank(higher + 1, total) } };
    }),
  );
}

/**
 * One page of /results: every submitted attempt, newest first, optionally only one test's. A student has at most a few
 * hundred attempts, so all are loaded for the summary and the page is sliced from them.
 */
export async function getResultHistory(userId: string, opts: { page: number; testSlug?: string }) {
  const [attempts, everyTest] = await Promise.all([
    db.attempt.findMany({ where: shownAttemptsWhere(userId, opts.testSlug), orderBy: { submittedAt: "desc" }, select: attemptRowSelect }),
    // The tests to filter by: every test the student has a shown result in.
    db.attempt.groupBy({ by: ["testId"], where: shownAttemptsWhere(userId), _count: { _all: true } }),
  ]);
  const titles = await db.test.findMany({ where: { id: { in: everyTest.map((t) => t.testId) } }, select: { id: true, slug: true, title: true } });
  const countById = new Map(everyTest.map((t) => [t.testId, t._count._all]));

  const rows = attempts.map(attemptRow);
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / HISTORY_PAGE_SIZE));
  const page = Math.min(Math.max(1, opts.page), pages);
  const correct = rows.reduce((n, r) => n + r.correct, 0);
  const answered = rows.reduce((n, r) => n + r.correct + r.wrong, 0);

  return {
    rows: await withRanks(rows.slice((page - 1) * HISTORY_PAGE_SIZE, page * HISTORY_PAGE_SIZE)),
    total,
    page,
    pages,
    tests: titles
      .map((t) => ({ slug: t.slug, title: t.title, attempts: countById.get(t.id) ?? 0 }))
      .sort((a, b) => a.title.localeCompare(b.title)),
    summary: {
      avgPercent: total ? Math.round(rows.reduce((s, r) => s + r.percent, 0) / total) : 0,
      bestPercent: total ? Math.max(...rows.map((r) => r.percent)) : 0,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      totalMinutes: Math.round(rows.reduce((s, r) => s + r.timeSpentSec, 0) / 60),
    },
  };
}

export type ResultHistory = Awaited<ReturnType<typeof getResultHistory>>;

/** The student's results on one test, for the "your last score" box on the cached test page; null when they have none. */
export async function getMyTestResults(userId: string, testSlug: string) {
  const rows = (
    await db.attempt.findMany({ where: shownAttemptsWhere(userId, testSlug), orderBy: { submittedAt: "desc" }, select: attemptRowSelect })
  ).map(attemptRow);
  if (!rows.length) return null;
  const best = rows.reduce((b, r) => (r.score > b.score ? r : b), rows[0]);
  const last = rows[0];
  return {
    count: rows.length,
    last: { id: last.id, score: last.score, maxScore: last.maxScore, accuracy: last.accuracy, submittedAt: last.submittedAt },
    best: { id: best.id, score: best.score, maxScore: best.maxScore },
  };
}

export type MyTestResults = NonNullable<Awaited<ReturnType<typeof getMyTestResults>>>;
