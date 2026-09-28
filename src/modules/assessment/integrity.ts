import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";

/** A score this high in this little of the allowed time is worth a second look (BLUEPRINT §21). */
export const FAST_TIME_SHARE = 0.2;
export const FAST_SCORE_SHARE = 0.8;

export type SuspiciousAttempt = {
  id: string;
  student: string;
  contact: string;
  testTitle: string;
  score: number;
  maxScore: number;
  timeSpentSec: number;
  durationSec: number;
  violations: number;
  flagged: boolean;
  isFirst: boolean;
  submittedAt: Date;
  /** implausibly fast high score */
  fast: boolean;
};

/**
 * Submitted attempts with recorded tab-switch / fullscreen / copy violations, or already flagged. Flagged
 * attempts are left out of ranks and leaderboards; unflagging puts them back.
 */
export async function listSuspiciousAttempts(view: "flagged" | "all", take = 100): Promise<SuspiciousAttempt[]> {
  const where: Prisma.AttemptWhereInput =
    view === "flagged" ? { status: "SUBMITTED", flagged: true } : { status: "SUBMITTED", OR: [{ flagged: true }, { violationCount: { gt: 0 } }] };
  const rows = await db.attempt.findMany({
    where,
    orderBy: { submittedAt: "desc" },
    take,
    select: {
      id: true,
      score: true,
      timeSpentSec: true,
      violationCount: true,
      flagged: true,
      isFirst: true,
      submittedAt: true,
      user: { select: { name: true, email: true, phoneNumber: true } },
      test: { select: { title: true, durationSec: true, sections: { select: { marksCorrect: true, _count: { select: { questions: true } } } } } },
    },
  });
  return rows.map((a) => {
    const maxScore = a.test.sections.reduce((n, s) => n + s._count.questions * Number(s.marksCorrect), 0);
    const score = Number(a.score ?? 0);
    const timeSpentSec = a.timeSpentSec ?? 0;
    return {
      id: a.id,
      student: a.user.name,
      contact: a.user.phoneNumber ?? a.user.email,
      testTitle: a.test.title,
      score,
      maxScore,
      timeSpentSec,
      durationSec: a.test.durationSec,
      violations: a.violationCount,
      flagged: a.flagged,
      isFirst: a.isFirst,
      submittedAt: a.submittedAt ?? new Date(0),
      fast: maxScore > 0 && score >= FAST_SCORE_SHARE * maxScore && timeSpentSec < FAST_TIME_SHARE * a.test.durationSec,
    };
  });
}

export async function setAttemptFlagged(attemptId: string, flagged: boolean, actorId: string): Promise<boolean> {
  const res = await db.attempt.updateMany({ where: { id: attemptId, status: "SUBMITTED" }, data: { flagged } });
  if (res.count === 0) return false;
  await db.auditLog.create({ data: { actorId, entity: "attempt", entityId: attemptId, action: flagged ? "flag" : "unflag" } });
  return true;
}
