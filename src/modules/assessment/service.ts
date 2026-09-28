import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { examLabel } from "@/modules/catalog/queries";
import { canAccessTest } from "@/modules/commerce/access";
import { getBuyOptionForSeries } from "@/modules/commerce/product-service";
import { demoDurationSec, planDemo } from "./demo";
import { gradeAttempt, percentileFromRank, type GradingSection, type GradeResult } from "./grading";
import { signClaim, verifyClaim } from "./guest-claim";
import { competitionRanks, publicName } from "./leaderboard";
import type { Bilingual, GuestClaim, LeaderboardRow, Paper, ResultData, SubmittedAnswers } from "./types";

/** Late submissions within this window still count (network delays at the deadline). */
const SUBMIT_GRACE_MS = 90_000;

const fullTestInclude = {
  sections: {
    orderBy: { order: "asc" },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              contents: true,
              options: { orderBy: { order: "asc" }, include: { contents: true } },
              topics: { include: { topic: { select: { id: true, name: true } } } },
            },
          },
        },
      },
    },
  },
  series: { select: { seriesId: true } },
  exam: { select: { slug: true, name: true, isActive: true, body: { select: { slug: true } } } },
} satisfies Prisma.TestInclude;

type FullTest = Prisma.TestGetPayload<{ include: typeof fullTestInclude }>;

const loadFullTest = cache(async (slug: string): Promise<FullTest | null> =>
  db.test.findFirst({ where: { slug, status: "PUBLISHED" }, include: fullTestInclude }),
);

function bilingual(rows: { lang: string; text?: string; stem?: string; explanation?: string | null }[], key: "text" | "stem" | "explanation"): Bilingual {
  const out: Bilingual = {};
  for (const r of rows) {
    const v = r[key];
    if (v && (r.lang === "en" || r.lang === "hi")) out[r.lang] = v;
  }
  return out;
}

// ─────────────── Access ───────────────

export async function canUserAccessTest(userId: string | null, test: { isFree: boolean; series: { seriesId: string }[] }) {
  if (test.isFree) return true;
  if (!userId) return false;
  const entitlements = await db.entitlement.findMany({
    where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
    select: {
      startsAt: true,
      expiresAt: true,
      revokedAt: true,
      product: { select: { kind: true, items: { select: { seriesId: true } } } },
    },
  });
  return canAccessTest(
    { isFree: test.isFree, seriesIds: test.series.map((s) => s.seriesId) },
    entitlements.map((e) => ({ ...e, product: { kind: e.product.kind, seriesIds: e.product.items.map((i) => i.seriesId) } })),
  );
}

// ─────────────── Paper (no answers) ───────────────

export async function getTestMeta(slug: string) {
  const t = await loadFullTest(slug);
  if (!t) return null;
  const questionCount = t.sections.reduce((n, s) => n + s.questions.length, 0);
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    titleHi: t.titleHi,
    type: t.type,
    isFree: t.isFree,
    durationSec: t.durationSec,
    instructions: t.instructions,
    questionCount,
    maxScore: t.sections.reduce((n, s) => n + s.questions.length * Number(s.marksCorrect), 0),
    sections: t.sections.map((s) => ({
      name: s.name,
      nameHi: s.nameHi,
      count: s.questions.length,
      marksCorrect: Number(s.marksCorrect),
      marksWrong: Number(s.marksWrong),
    })),
    series: t.series,
    // Hub pages exist only for active exams.
    exam: t.exam?.isActive ? { name: examLabel(t.exam.body.slug, t.exam.name), href: `/${t.exam.body.slug}/${t.exam.slug}` } : null,
  };
}

/** Admin "view as student": the paper of a test in any status, drafts included. */
export async function getPreviewPaper(testId: string): Promise<Paper | null> {
  const t = await db.test.findUnique({ where: { id: testId }, include: fullTestInclude });
  return t ? getPaper(t.slug, t) : null;
}

export async function getPaper(slug: string, override?: FullTest): Promise<Paper | null> {
  const t = override ?? (await loadFullTest(slug));
  if (!t) return null;
  const langs = new Set<"en" | "hi">();
  const sections = t.sections.map((s) => ({
    id: s.id,
    name: s.name,
    nameHi: s.nameHi,
    marksCorrect: Number(s.marksCorrect),
    marksWrong: Number(s.marksWrong),
    questions: s.questions.map(({ question: q }) => {
      q.contents.forEach((c) => (c.lang === "en" || c.lang === "hi") && langs.add(c.lang));
      return {
        id: q.id,
        stem: bilingual(q.contents, "stem"),
        // isCorrect is deliberately not included.
        options: q.options.map((o) => ({ id: o.id, text: bilingual(o.contents, "text") })),
      };
    }),
  }));
  return {
    slug: t.slug,
    title: t.title,
    titleHi: t.titleHi,
    durationSec: t.durationSec,
    instructions: t.instructions,
    isFree: t.isFree,
    languages: (["en", "hi"] as const).filter((l) => langs.has(l)),
    sections,
  };
}

// ─────────────── Grading & results ───────────────

function gradingSections(t: FullTest): GradingSection[] {
  return t.sections.map((s) => ({
    id: s.id,
    marksCorrect: Number(s.marksCorrect),
    marksWrong: Number(s.marksWrong),
    questions: s.questions.map(({ question: q }) => ({
      id: q.id,
      correctOptionId: q.options.find((o) => o.isCorrect)?.id ?? "",
      topicIds: q.topics.map((t) => t.topic.id),
    })),
  }));
}

/** Drops answers for unknown questions or options that do not belong to the question. */
function sanitizeAnswers(t: FullTest, answers: SubmittedAnswers): SubmittedAnswers {
  const valid = new Map<string, Set<string>>();
  for (const s of t.sections) for (const { question: q } of s.questions) valid.set(q.id, new Set(q.options.map((o) => o.id)));
  const clean: SubmittedAnswers = {};
  for (const [qid, a] of Object.entries(answers)) {
    const opts = valid.get(qid);
    if (!opts) continue;
    clean[qid] = { t: a.t ?? 0, ...(a.o && opts.has(a.o) && { o: a.o }), ...(a.m && { m: true }) };
  }
  return clean;
}

function buildResult(
  t: FullTest,
  answers: SubmittedAnswers,
  grade: GradeResult,
  extra: { attemptId: string | null; submittedAt: Date; rank: ResultData["rank"]; isFirstAttempt: boolean },
): ResultData {
  const topicNames = new Map<string, string>();
  let number = 0;
  const questions: ResultData["questions"] = [];
  for (const s of t.sections) {
    for (const { question: q } of s.questions) {
      q.topics.forEach((x) => topicNames.set(x.topic.id, x.topic.name));
      questions.push({
        id: q.id,
        number: ++number,
        section: s.name,
        stem: bilingual(q.contents, "stem"),
        options: q.options.map((o) => ({ id: o.id, text: bilingual(o.contents, "text") })),
        correctOptionId: q.options.find((o) => o.isCorrect)?.id ?? "",
        chosenOptionId: answers[q.id]?.o ?? null,
        explanation: bilingual(q.contents, "explanation"),
        timeSec: answers[q.id]?.t ?? 0,
        topic: q.topics[0]?.topic.name ?? null,
      });
    }
  }

  return {
    test: { slug: t.slug, title: t.title, titleHi: t.titleHi, durationSec: t.durationSec },
    attemptId: extra.attemptId,
    submittedAt: extra.submittedAt.toISOString(),
    score: grade.score,
    maxScore: t.sections.reduce((n, s) => n + s.questions.length * Number(s.marksCorrect), 0),
    correct: grade.correct,
    wrong: grade.wrong,
    skipped: grade.skipped,
    timeSpentSec: grade.timeSpentSec,
    rank: extra.rank,
    isFirstAttempt: extra.isFirstAttempt,
    sections: t.sections.map((s) => {
      const st = grade.sectionStats[s.id];
      return { name: s.name, score: st.score, maxScore: st.maxScore, correct: st.correct, wrong: st.wrong, skipped: st.skipped, timeSpentSec: st.timeSpentSec };
    }),
    topics: Object.entries(grade.topicStats)
      .map(([id, st]) => ({ name: topicNames.get(id) ?? "Other", ...st }))
      // Weakest attempted topics first (accuracy = correct / attempted); skipped-only topics last.
      .sort((a, b) => {
        const attA = a.correct + a.wrong;
        const attB = b.correct + b.wrong;
        if (!attA || !attB) return attB - attA;
        return a.correct / attA - b.correct / attB;
      }),
    questions,
  };
}

async function rankFor(testId: string, score: number): Promise<NonNullable<ResultData["rank"]>> {
  const where = { testId, isFirst: true, status: "SUBMITTED" as const, flagged: false };
  const [higher, agg] = await Promise.all([
    db.attempt.count({ where: { ...where, score: { gt: score } } }),
    db.attempt.aggregate({ where, _count: true, _max: { score: true }, _avg: { score: true } }),
  ]);
  const total = agg._count;
  const rank = higher + 1;
  return {
    rank,
    total,
    percentile: percentileFromRank(rank, total),
    topScore: Number(agg._max.score ?? score),
    avgScore: Math.round(Number(agg._avg.score ?? score) * 100) / 100,
  };
}

function claimSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is not set.");
  return secret;
}

/**
 * Free tests without login: graded statelessly, nothing stored, no rank. The result carries a signed
 * claim so the guest can save it to their account if they log in afterwards.
 */
export async function gradeGuestAttempt(slug: string, answers: SubmittedAnswers, violations = 0): Promise<ResultData | null> {
  const t = await loadFullTest(slug);
  if (!t || !t.isFree) return null;
  const clean = sanitizeAnswers(t, answers);
  const grade = gradeAttempt(gradingSections(t), clean);
  const gradedAt = Date.now();
  const token = signClaim({ slug, answers: clean, gradedAt, violations }, claimSecret());
  return {
    ...buildResult(t, clean, grade, { attemptId: null, submittedAt: new Date(gradedAt), rank: null, isFirstAttempt: false }),
    claim: { answers: clean, gradedAt, violations, token },
  };
}

/** Saves a signed guest result as the student's attempt. Counts for rank only if it is their first on the test. */
export async function claimGuestAttempt(userId: string, slug: string, claim: GuestClaim): Promise<{ attemptId: string } | { error: string }> {
  const t = await loadFullTest(slug);
  if (!t || !t.isFree) return { error: "This result can no longer be saved." };
  const clean = sanitizeAnswers(t, claim.answers);
  const check = verifyClaim({ slug, answers: clean, gradedAt: claim.gradedAt, violations: claim.violations }, claim.token, claimSecret());
  if (check !== "ok") return { error: check === "expired" ? "This result is too old to save — take the test again while logged in." : "This result could not be verified." };

  // The grading time identifies the guest result: it can be saved once, into one account.
  const submittedAt = new Date(claim.gradedAt);
  const already = await db.attempt.findFirst({ where: { testId: t.id, submittedAt }, select: { id: true, userId: true } });
  if (already) return already.userId === userId ? { attemptId: already.id } : { error: "This result is already saved to another account." };

  const grade = gradeAttempt(gradingSections(t), clean);
  const startedAt = new Date(submittedAt.getTime() - grade.timeSpentSec * 1000);
  const data = {
    userId,
    testId: t.id,
    testVersion: t.version,
    status: "SUBMITTED" as const,
    startedAt,
    deadlineAt: new Date(startedAt.getTime() + t.durationSec * 1000),
    submittedAt,
    answers: clean,
    score: grade.score,
    correct: grade.correct,
    wrong: grade.wrong,
    skipped: grade.skipped,
    timeSpentSec: grade.timeSpentSec,
    sectionStats: grade.sectionStats,
    topicStats: grade.topicStats,
    violationCount: claim.violations,
    flagged: claim.violations >= VIOLATION_FLAG_THRESHOLD,
  };
  const previous = await db.attempt.count({ where: { userId, testId: t.id } });
  try {
    const a = await db.attempt.create({ data: { ...data, isFirst: previous === 0 }, select: { id: true } });
    return { attemptId: a.id };
  } catch (err) {
    // Lost a race for the one first attempt per user+test (partial unique index): save it unranked.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const a = await db.attempt.create({ data: { ...data, isFirst: false }, select: { id: true } });
      return { attemptId: a.id };
    }
    throw err;
  }
}

// ─────────────── Free demo of a paid test ───────────────

/** The demo view of a paid test: only the free questions of each section, plus what is left locked. */
async function demoView(t: FullTest) {
  if (t.isFree) return null;
  const plan = planDemo(t.sections.map((s) => s.questions.length));
  if (plan.freeTotal === 0 || plan.lockedTotal === 0) return null;
  const view: FullTest = { ...t, sections: t.sections.map((s, i) => ({ ...s, questions: s.questions.slice(0, plan.free[i]) })) };
  const buy = await getBuyOptionForSeries(t.series.map((s) => s.seriesId));
  return { view, plan, buy, totalQuestions: plan.freeTotal + plan.lockedTotal };
}

/** Paper for the free demo. Locked questions never leave the server. Null for free tests or nothing to lock. */
export async function getDemoPaper(slug: string): Promise<Paper | null> {
  const t = await loadFullTest(slug);
  const demo = t && (await demoView(t));
  if (!demo) return null;
  const paper = await getPaper(slug, demo.view);
  if (!paper) return null;
  return {
    ...paper,
    durationSec: demoDurationSec(t.durationSec, demo.plan.freeTotal, demo.totalQuestions),
    demo: { totalQuestions: demo.totalQuestions, lockedPerSection: demo.plan.locked, lockedTotal: demo.plan.lockedTotal, buy: demo.buy },
  };
}

/** Grades a demo attempt statelessly (nothing stored, no rank), counting only the free questions. */
export async function gradeDemoAttempt(slug: string, answers: SubmittedAnswers): Promise<ResultData | null> {
  const t = await loadFullTest(slug);
  const demo = t && (await demoView(t));
  if (!demo) return null;
  const clean = sanitizeAnswers(demo.view, answers);
  const grade = gradeAttempt(gradingSections(demo.view), clean);
  const result = buildResult(demo.view, clean, grade, { attemptId: null, submittedAt: new Date(), rank: null, isFirstAttempt: false });
  return { ...result, demo: { totalQuestions: demo.totalQuestions, lockedTotal: demo.plan.lockedTotal, buy: demo.buy } };
}

// ─────────────── Logged-in attempts ───────────────

export type StartedAttempt = { attemptId: string; deadlineAt: string; answers: SubmittedAnswers; resumed: boolean };

export async function startAttempt(userId: string, slug: string): Promise<StartedAttempt | { error: string }> {
  const t = await loadFullTest(slug);
  if (!t) return { error: "Test not found." };
  if (!(await canUserAccessTest(userId, t))) return { error: "This test is part of a paid series." };

  const now = Date.now();
  const open = await db.attempt.findFirst({ where: { userId, testId: t.id, status: "IN_PROGRESS" } });
  if (open) {
    if (open.deadlineAt.getTime() + SUBMIT_GRACE_MS > now) {
      return { attemptId: open.id, deadlineAt: open.deadlineAt.toISOString(), answers: open.answers as SubmittedAnswers, resumed: true };
    }
    // Abandoned attempt past its deadline: grade what was autosaved so it still counts.
    await finalizeAttempt(t, open.id, open.answers as SubmittedAnswers);
  }

  const previous = await db.attempt.count({ where: { userId, testId: t.id } });
  const data = {
    userId,
    testId: t.id,
    testVersion: t.version,
    deadlineAt: new Date(now + t.durationSec * 1000),
  };
  try {
    const a = await db.attempt.create({ data: { ...data, isFirst: previous === 0 } });
    return { attemptId: a.id, deadlineAt: a.deadlineAt.toISOString(), answers: {}, resumed: false };
  } catch (err) {
    // Concurrent start (double tap): the partial unique indexes reject the duplicate; reuse the winner.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const existing = await db.attempt.findFirst({ where: { userId, testId: t.id, status: "IN_PROGRESS" } });
      if (existing) {
        return { attemptId: existing.id, deadlineAt: existing.deadlineAt.toISOString(), answers: existing.answers as SubmittedAnswers, resumed: true };
      }
    }
    throw err;
  }
}

/** Attempts with this many recorded tab-switch/fullscreen-exit/copy-paste violations are excluded from ranking. */
const VIOLATION_FLAG_THRESHOLD = 5;

export async function saveProgress(userId: string, attemptId: string, answers: SubmittedAnswers, violationCount?: number): Promise<boolean> {
  const res = await db.attempt.updateMany({
    where: { id: attemptId, userId, status: "IN_PROGRESS", deadlineAt: { gt: new Date(Date.now() - SUBMIT_GRACE_MS) } },
    data: { answers, ...(violationCount !== undefined && { violationCount }) },
  });
  return res.count === 1;
}

async function finalizeAttempt(t: FullTest, attemptId: string, answers: SubmittedAnswers, violationCount?: number) {
  const clean = sanitizeAnswers(t, answers);
  const grade = gradeAttempt(gradingSections(t), clean);
  await db.attempt.updateMany({
    where: { id: attemptId, status: "IN_PROGRESS" },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      answers: clean,
      score: grade.score,
      correct: grade.correct,
      wrong: grade.wrong,
      skipped: grade.skipped,
      timeSpentSec: grade.timeSpentSec,
      sectionStats: grade.sectionStats,
      topicStats: grade.topicStats,
      ...(violationCount !== undefined && { violationCount, flagged: violationCount >= VIOLATION_FLAG_THRESHOLD }),
    },
  });
}

export async function submitAttempt(
  userId: string,
  attemptId: string,
  answers: SubmittedAnswers,
  violationCount?: number,
): Promise<{ ok: true } | { error: string }> {
  const attempt = await db.attempt.findFirst({
    where: { id: attemptId, userId },
    include: { test: { select: { slug: true, title: true } } },
  });
  if (!attempt) return { error: "Attempt not found." };
  if (attempt.status !== "IN_PROGRESS") return { ok: true }; // already submitted (double submit / retry)

  const t = await loadFullTest(attempt.test.slug);
  if (!t) return { error: "Test not found." };

  // After the deadline (plus grace) only the last autosave counts — answers can't be changed late.
  const late = Date.now() > attempt.deadlineAt.getTime() + SUBMIT_GRACE_MS;
  await finalizeAttempt(t, attempt.id, late ? (attempt.answers as SubmittedAnswers) : answers, violationCount);
  void notifyResultReady(userId, attemptId, attempt.test.title).catch(() => {});
  return { ok: true };
}

async function notifyResultReady(userId: string, attemptId: string, testTitle: string): Promise<void> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { email: true, emailVerified: true } });
  if (!user?.email || !user.emailVerified) return;
  const { sendResultReadyEmail } = await import("@/modules/identity/email");
  await sendResultReadyEmail(user.email, testTitle, attemptId);
}

export async function getAttemptResult(userId: string, attemptId: string): Promise<ResultData | null> {
  const attempt = await db.attempt.findFirst({
    where: { id: attemptId, userId, status: "SUBMITTED" },
    include: { test: { select: { slug: true } } },
  });
  if (!attempt) return null;
  const t = await loadFullTest(attempt.test.slug);
  if (!t) return null;
  const answers = attempt.answers as SubmittedAnswers;
  // Re-grading from stored answers keeps results correct after an erratum fix.
  const grade = gradeAttempt(gradingSections(t), answers);
  const [rank, compare, leaderboard, nextTest] = await Promise.all([
    attempt.isFirst ? rankFor(t.id, Number(attempt.score ?? grade.score)) : null,
    sectionComparison(t.id),
    topAttempts(t.id, userId),
    nextTestFor(userId, t),
  ]);
  const result = buildResult(t, answers, grade, { attemptId: attempt.id, submittedAt: attempt.submittedAt ?? attempt.startedAt, rank, isFirstAttempt: attempt.isFirst });
  return {
    ...result,
    sections: result.sections.map((s, i) => ({ ...s, ...compare.get(t.sections[i].id) })),
    leaderboard,
    nextTest,
  };
}

/** What the shareable result image shows. Only the student who took the attempt can load it. */
export async function getResultCard(userId: string, attemptId: string) {
  const a = await db.attempt.findFirst({
    where: { id: attemptId, userId, status: "SUBMITTED" },
    select: {
      testId: true,
      isFirst: true,
      score: true,
      correct: true,
      wrong: true,
      user: { select: { name: true, district: true } },
      test: { select: { title: true, sections: { select: { marksCorrect: true, _count: { select: { questions: true } } } } } },
    },
  });
  if (!a) return null;
  const score = Number(a.score ?? 0);
  const attempted = (a.correct ?? 0) + (a.wrong ?? 0);
  return {
    name: publicName(a.user.name),
    district: a.user.district && a.user.district !== "Outside HP" ? a.user.district : null,
    testTitle: a.test.title,
    score,
    maxScore: a.test.sections.reduce((n, s) => n + s._count.questions * Number(s.marksCorrect), 0),
    accuracy: attempted ? Math.round(((a.correct ?? 0) / attempted) * 100) : 0,
    rank: a.isFirst ? await rankFor(a.testId, score) : null,
  };
}

const rankedWhere = (testId: string) => ({ testId, isFirst: true, status: "SUBMITTED" as const, flagged: false });

/** Per section: the topper's score and the average score of all ranked (first, unflagged) attempts. */
async function sectionComparison(testId: string): Promise<Map<string, { topper: number; average: number }>> {
  const [top, averages] = await Promise.all([
    db.attempt.findFirst({ where: rankedWhere(testId), orderBy: [{ score: "desc" }, { submittedAt: "asc" }], select: { sectionStats: true } }),
    db.$queryRaw<{ sectionId: string; average: number }[]>`
      SELECT s.key AS "sectionId", AVG((s.value->>'score')::numeric)::float8 AS "average"
      FROM "Attempt" a CROSS JOIN LATERAL jsonb_each(a."sectionStats") s
      WHERE a."testId" = ${testId} AND a."isFirst" AND a."status" = 'SUBMITTED' AND NOT a."flagged" AND a."sectionStats" IS NOT NULL
      GROUP BY s.key`,
  ]);
  const topStats = (top?.sectionStats ?? {}) as GradeResult["sectionStats"];
  const out = new Map<string, { topper: number; average: number }>();
  for (const { sectionId, average } of averages) {
    out.set(sectionId, { topper: topStats[sectionId]?.score ?? 0, average: Math.round(average * 100) / 100 });
  }
  return out;
}

const LEADERBOARD_SIZE = 10;

async function topAttempts(testId: string, userId: string): Promise<LeaderboardRow[]> {
  const rows = await db.attempt.findMany({
    where: rankedWhere(testId),
    orderBy: [{ score: "desc" }, { submittedAt: "asc" }],
    take: LEADERBOARD_SIZE,
    select: { userId: true, score: true, user: { select: { name: true, district: true } } },
  });
  const ranks = competitionRanks(rows.map((r) => Number(r.score ?? 0)));
  return rows.map((r, i) => ({
    rank: ranks[i],
    name: publicName(r.user.name),
    district: r.user.district && r.user.district !== "Outside HP" ? r.user.district : null,
    score: Number(r.score ?? 0),
    isYou: r.userId === userId,
  }));
}

/** A published test in the same exam the student hasn't attempted yet (free ones first), else any such test. */
async function nextTestFor(userId: string, t: FullTest): Promise<ResultData["nextTest"]> {
  const base = { status: "PUBLISHED" as const, id: { not: t.id }, attempts: { none: { userId } } };
  const select = { slug: true, title: true, isFree: true } as const;
  const orderBy = [{ isFree: "desc" as const }, { publishedAt: "asc" as const }];
  return (
    (t.examId ? await db.test.findFirst({ where: { ...base, examId: t.examId }, orderBy, select }) : null) ??
    (await db.test.findFirst({ where: base, orderBy, select }))
  );
}
