import "server-only";
import { db } from "@/lib/db";
import { percentileFromRank } from "@/modules/assessment/grading";
import { getPublishedTests } from "@/modules/catalog/queries";

type TopicTally = { correct: number; wrong: number; skipped: number };

export async function getDashboard(userId: string) {
  const [profile, attempts, inProgress, allTests] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true, district: true } }),
    db.attempt.findMany({
      where: { userId, status: "SUBMITTED" },
      orderBy: { submittedAt: "desc" },
      take: 50,
      select: {
        id: true,
        testId: true,
        isFirst: true,
        score: true,
        correct: true,
        wrong: true,
        skipped: true,
        timeSpentSec: true,
        submittedAt: true,
        topicStats: true,
        test: {
          select: {
            slug: true,
            title: true,
            sections: { select: { marksCorrect: true, _count: { select: { questions: true } } } },
          },
        },
      },
    }),
    db.attempt.findFirst({
      where: { userId, status: "IN_PROGRESS", deadlineAt: { gt: new Date() } },
      select: { deadlineAt: true, answers: true, test: { select: { slug: true, title: true } } },
    }),
    getPublishedTests(),
  ]);

  const rows = attempts.map((a) => {
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
      timeSpentSec: a.timeSpentSec ?? 0,
      submittedAt: a.submittedAt!,
      topicStats: (a.topicStats ?? {}) as Record<string, TopicTally>,
    };
  });

  // Ranks for the latest few first attempts (one indexed count each).
  const ranked = await Promise.all(
    rows.slice(0, 8).map(async (r) => {
      if (!r.isFirst) return [r.id, null] as const;
      const where = { testId: r.testId, isFirst: true, status: "SUBMITTED" as const, flagged: false };
      const [higher, total] = await Promise.all([
        db.attempt.count({ where: { ...where, score: { gt: r.score } } }),
        db.attempt.count({ where }),
      ]);
      return [r.id, { rank: higher + 1, total, percentile: percentileFromRank(higher + 1, total) }] as const;
    }),
  );
  const rankById = new Map(ranked);

  // Topic mastery across all attempts.
  const topicTotals = new Map<string, TopicTally>();
  for (const r of rows) {
    for (const [topicId, t] of Object.entries(r.topicStats)) {
      const acc = topicTotals.get(topicId) ?? { correct: 0, wrong: 0, skipped: 0 };
      acc.correct += t.correct;
      acc.wrong += t.wrong;
      acc.skipped += t.skipped;
      topicTotals.set(topicId, acc);
    }
  }
  const topicNames = topicTotals.size
    ? new Map(
        (await db.topic.findMany({ where: { id: { in: [...topicTotals.keys()] } }, select: { id: true, name: true, subject: { select: { name: true } } } })).map(
          (t) => [t.id, `${t.subject.name} · ${t.name}`],
        ),
      )
    : new Map<string, string>();
  const topics = [...topicTotals.entries()]
    .map(([id, t]) => {
      // Accuracy = correct ÷ attempted; topics only ever skipped say nothing about weakness yet.
      const attempted = t.correct + t.wrong;
      return { name: topicNames.get(id) ?? "Other", total: attempted, accuracy: attempted ? Math.round((t.correct / attempted) * 100) : 0 };
    })
    .filter((t) => t.total >= 1)
    .sort((a, b) => a.accuracy - b.accuracy);

  const n = rows.length;
  const totalCorrect = attempts.reduce((s, a) => s + (a.correct ?? 0), 0);
  const totalAttempted = attempts.reduce((s, a) => s + (a.correct ?? 0) + (a.wrong ?? 0), 0);
  const attemptedSlugs = new Set(rows.map((r) => r.slug));

  return {
    profile,
    stats: {
      tests: n,
      avgPercent: n ? Math.round(rows.reduce((s, r) => s + r.percent, 0) / n) : 0,
      bestPercent: n ? Math.max(...rows.map((r) => r.percent)) : 0,
      accuracy: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      totalMinutes: Math.round(rows.reduce((s, r) => s + r.timeSpentSec, 0) / 60),
    },
    inProgress: inProgress && {
      slug: inProgress.test.slug,
      title: inProgress.test.title,
      deadlineAt: inProgress.deadlineAt,
      answered: Object.values((inProgress.answers ?? {}) as Record<string, { o?: string }>).filter((a) => a.o).length,
    },
    recent: rows.slice(0, 8).map((r) => ({ ...r, rank: rankById.get(r.id) ?? null })),
    trend: rows.slice(0, 12).reverse().map((r) => ({ id: r.id, title: r.title, percent: r.percent, score: r.score, maxScore: r.maxScore, date: r.submittedAt })),
    weakTopics: topics.slice(0, 4),
    strongTopics: [...topics].reverse().filter((t) => t.accuracy >= 70).slice(0, 3),
    suggested: allTests.filter((t) => !attemptedSlugs.has(t.slug)).slice(0, 3),
  };
}
