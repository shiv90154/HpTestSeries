import "server-only";
import { db } from "@/lib/db";
import { getPublishedTests } from "@/modules/catalog/queries";
import { liveTestWhere } from "@/modules/catalog/visibility";
import { canAccessTest } from "@/modules/commerce/access";
import { liveEntitlements } from "@/modules/commerce/purchases";
import { attemptRow, attemptRowSelect, shownAttemptsWhere, withRanks } from "./history";
import { preferredExams, rankSuggestions } from "./suggest";
import { currentStreak, testsThisWeek } from "./streak";

type TopicTally = { correct: number; wrong: number; skipped: number };

export async function getDashboard(site: string, userId: string) {
  const [profile, attempts, totalTests, inProgress, allTests, testMeta, entitlements, liveNext] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true, district: true } }),
    db.attempt.findMany({
      where: shownAttemptsWhere(userId),
      orderBy: { submittedAt: "desc" },
      take: 50,
      select: { ...attemptRowSelect, topicStats: true },
    }),
    // The list above stops at 50; "Tests taken" and "View all" need the real number.
    db.attempt.count({ where: shownAttemptsWhere(userId) }),
    db.attempt.findFirst({
      where: { userId, status: "IN_PROGRESS", deadlineAt: { gt: new Date() } },
      select: { deadlineAt: true, answers: true, test: { select: { slug: true, title: true } } },
    }),
    getPublishedTests(site),
    // What getPublishedTests does not carry: each test's exam, series and live window.
    db.test.findMany({
      where: liveTestWhere(),
      select: { slug: true, examId: true, site: true, exam: { select: { body: { select: { sites: true, passExcluded: true } } } }, liveStartsAt: true, series: { select: { seriesId: true } } },
    }),
    liveEntitlements(userId),
    // The next live test that has not closed yet (only one the student has not already taken).
    db.test.findFirst({
      where: { ...liveTestWhere(), liveStartsAt: { not: null }, liveEndsAt: { gt: new Date() }, attempts: { none: { userId } } },
      orderBy: { liveStartsAt: "asc" },
      select: { slug: true, title: true, liveStartsAt: true, liveEndsAt: true, prizes: { orderBy: { rank: "asc" }, select: { rank: true, title: true } } },
    }),
  ]);

  const rows = attempts.map((a) => ({ ...attemptRow(a), topicStats: (a.topicStats ?? {}) as Record<string, TopicTally> }));
  const recent = await withRanks(rows.slice(0, 8));

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

  // Recommendations: the exams the student practises or has paid for first; live tests have their own card.
  const meta = new Map(testMeta.map((m) => [m.slug, m]));
  const now = new Date();
  const candidates = allTests.map((t) => {
    const m = meta.get(t.slug);
    const seriesIds = m?.series.map((s) => s.seriesId) ?? [];
    const sites = m ? (m.exam ? m.exam.body.sites : [m.site]) : [];
    return { ...t, examId: m?.examId ?? null, isLive: !!m?.liveStartsAt, open: canAccessTest({ isFree: t.isFree, seriesIds, sites, passExcluded: m?.exam?.body.passExcluded }, entitlements, now) };
  });
  const preferred = preferredExams([...rows.map((r) => meta.get(r.slug)?.examId ?? null), ...candidates.filter((t) => t.open && !t.isFree).map((t) => t.examId)]);
  const ranked_ = rankSuggestions(candidates, attemptedSlugs, preferred);
  // The big "Take a mock test" button must lead somewhere the student can actually start.
  const startSlug = ranked_.find((t) => t.open)?.slug ?? null;

  return {
    profile,
    stats: {
      tests: totalTests,
      avgPercent: n ? Math.round(rows.reduce((s, r) => s + r.percent, 0) / n) : 0,
      bestPercent: n ? Math.max(...rows.map((r) => r.percent)) : 0,
      accuracy: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      totalMinutes: Math.round(rows.reduce((s, r) => s + r.timeSpentSec, 0) / 60),
      streak: currentStreak(rows.map((r) => r.submittedAt)),
      weekTests: testsThisWeek(rows.map((r) => r.submittedAt)),
    },
    inProgress: inProgress && {
      slug: inProgress.test.slug,
      title: inProgress.test.title,
      deadlineAt: inProgress.deadlineAt,
      answered: Object.values((inProgress.answers ?? {}) as Record<string, { o?: string }>).filter((a) => a.o).length,
    },
    recent,
    trend: rows.slice(0, 12).reverse().map((r) => ({ id: r.id, title: r.title, percent: r.percent, score: r.score, maxScore: r.maxScore, date: r.submittedAt })),
    weakTopics: topics.slice(0, 4),
    strongTopics: [...topics].reverse().filter((t) => t.accuracy >= 70).slice(0, 3),
    suggested: ranked_.slice(0, 3),
    startSlug,
    liveNext: liveNext && { open: liveNext.liveStartsAt! <= now, slug: liveNext.slug, title: liveNext.title, startsAt: liveNext.liveStartsAt!, endsAt: liveNext.liveEndsAt!, prizes: liveNext.prizes },
  };
}
