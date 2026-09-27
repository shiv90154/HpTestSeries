import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { canAccessTest } from "@/modules/commerce/access";
import { gradeAttempt, percentileFromRank, type GradingSection, type GradeResult } from "./grading";
import type { Bilingual, Paper, ResultData, SubmittedAnswers } from "./types";

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
  };
}

export async function getPaper(slug: string): Promise<Paper | null> {
  const t = await loadFullTest(slug);
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

/** Free tests without login: graded statelessly, nothing stored, no rank. */
export async function gradeGuestAttempt(slug: string, answers: SubmittedAnswers): Promise<ResultData | null> {
  const t = await loadFullTest(slug);
  if (!t || !t.isFree) return null;
  const clean = sanitizeAnswers(t, answers);
  const grade = gradeAttempt(gradingSections(t), clean);
  return buildResult(t, clean, grade, { attemptId: null, submittedAt: new Date(), rank: null, isFirstAttempt: false });
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
  const rank = attempt.isFirst ? await rankFor(t.id, Number(attempt.score ?? grade.score)) : null;
  return buildResult(t, answers, grade, { attemptId: attempt.id, submittedAt: attempt.submittedAt ?? attempt.startedAt, rank, isFirstAttempt: attempt.isFirst });
}
