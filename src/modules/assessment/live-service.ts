import "server-only";
import { db } from "@/lib/db";
import { grantAccess } from "@/modules/identity/user-service";
import { liveState } from "./live";

const STANDING_SIZE = 10;

/** Same order as the public leaderboard: score, then the earlier submission. Flagged attempts are never ranked. */
const ranked = (testId: string) => ({ testId, isFirst: true, status: "SUBMITTED" as const, flagged: false });

/** What the admin sees once a live window has closed: the top of the table, the prizes, and how many attempts were flagged. */
export async function getLiveStanding(testId: string) {
  const t = await db.test.findUnique({
    where: { id: testId },
    select: {
      liveStartsAt: true,
      liveEndsAt: true,
      prizes: { orderBy: { rank: "asc" }, select: { id: true, rank: true, title: true, productId: true, awardedAt: true, winner: { select: { name: true, email: true } } } },
    },
  });
  if (!t?.liveStartsAt || !t.liveEndsAt) return null;
  const state = liveState(t);
  const [top, flagged, taken] =
    state === "ended"
      ? await Promise.all([
          db.attempt.findMany({
            where: ranked(testId),
            orderBy: [{ score: "desc" }, { submittedAt: "asc" }],
            take: STANDING_SIZE,
            select: { id: true, score: true, timeSpentSec: true, violationCount: true, user: { select: { name: true, email: true } } },
          }),
          db.attempt.count({ where: { testId, status: "SUBMITTED", flagged: true } }),
          db.attempt.count({ where: { testId, status: "SUBMITTED" } }),
        ])
      : [[], 0, await db.attempt.count({ where: { testId } })];
  return { state, endsAt: t.liveEndsAt, prizes: t.prizes, top, flagged, taken };
}

/**
 * Gives each unawarded prize to the student at that rank: records the winner and, when the prize has a
 * product, grants it as free access. Only after the window has closed; safe to run again (awarded prizes are skipped).
 */
export async function awardLivePrizes(testId: string, actorId: string): Promise<{ ok: true; awarded: number } | { ok: false; error: string }> {
  const t = await db.test.findUnique({ where: { id: testId }, select: { liveStartsAt: true, liveEndsAt: true, prizes: { orderBy: { rank: "asc" } } } });
  if (!t) return { ok: false, error: "Test not found." };
  if (liveState(t) !== "ended") return { ok: false, error: "Winners can be confirmed only after the live window closes." };
  const pending = t.prizes.filter((p) => !p.awardedAt);
  if (!pending.length) return { ok: false, error: "There are no unawarded prizes." };

  const maxRank = Math.max(...pending.map((p) => p.rank));
  const standing = await db.attempt.findMany({
    where: ranked(testId),
    orderBy: [{ score: "desc" }, { submittedAt: "asc" }],
    take: maxRank,
    select: { userId: true },
  });

  let awarded = 0;
  for (const prize of pending) {
    const winner = standing[prize.rank - 1];
    if (!winner) continue;
    if (prize.productId) {
      const g = await grantAccess(winner.userId, prize.productId, actorId);
      if (!g.ok) return { ok: false, error: `Rank ${prize.rank}: ${g.error}` };
    }
    await db.livePrize.update({ where: { id: prize.id }, data: { winnerId: winner.userId, awardedAt: new Date() } });
    await db.auditLog.create({ data: { actorId, entity: "livePrize", entityId: prize.id, action: "award", diff: { testId, rank: prize.rank, winnerId: winner.userId } } });
    awarded++;
  }
  return { ok: true, awarded };
}
