import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { FRIEND_DISCOUNT_PAISE, MAX_REWARDS_PER_USER, REWARD_PAISE, REWARD_VALID_DAYS, randomCode } from "./referral-rules";

const isUniqueViolation = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";

/** The student's personal referral code (a coupon), created on first use. */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const existing = await db.coupon.findUnique({ where: { referrerId: userId }, select: { code: true } });
  if (existing) return existing.code;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const c = await db.coupon.create({
        data: { code: randomCode("HP", 6), flatOffPaise: FRIEND_DISCOUNT_PAISE, referrerId: userId, affiliateTag: "referral" },
        select: { code: true },
      });
      return c.code;
    } catch (err) {
      if (!isUniqueViolation(err)) throw err;
      // Either the code collided (retry) or a parallel request just created this student's code (use it).
      const won = await db.coupon.findUnique({ where: { referrerId: userId }, select: { code: true } });
      if (won) return won.code;
    }
  }
  throw new Error("Could not create a referral code");
}

/**
 * Issues the referrer's reward once a friend's order that used their code is paid. Idempotent: the reward is keyed
 * on the order (unique rewardOrderId), so the checkout callback, the webhook and the reconcile job can all call it.
 * Self-referrals are blocked at quote time; the cap and the zero-amount check here keep farming and free orders out.
 */
export async function rewardReferrer(orderId: string): Promise<boolean> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { status: true, userId: true, amountPaise: true, coupon: { select: { referrerId: true } } },
  });
  const referrerId = order?.coupon?.referrerId;
  if (!order || order.status !== "PAID" || !order.userId || !referrerId || referrerId === order.userId || order.amountPaise <= 0) return false;
  if ((await db.coupon.count({ where: { ownerId: referrerId, rewardOrderId: { not: null } } })) >= MAX_REWARDS_PER_USER) return false;

  const validTill = new Date(Date.now() + REWARD_VALID_DAYS * 86_400_000);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await db.coupon.create({
        data: { code: randomCode("RW", 8), flatOffPaise: REWARD_PAISE, maxUses: 1, validTill, ownerId: referrerId, rewardOrderId: orderId, affiliateTag: "referral-reward" },
      });
      return true;
    } catch (err) {
      if (!isUniqueViolation(err)) throw err;
      if (await db.coupon.findUnique({ where: { rewardOrderId: orderId }, select: { id: true } })) return false; // already issued
      // otherwise the random code collided: try another
    }
  }
  return false;
}

export type ReferralSummary = {
  code: string;
  /** distinct friends whose paid order used this code */
  friends: number;
  rewards: { code: string; validTill: Date | null; used: boolean; expired: boolean }[];
};

export async function getReferralSummary(userId: string): Promise<ReferralSummary> {
  const code = await getOrCreateReferralCode(userId);
  const [friends, rewards] = await Promise.all([
    db.order.findMany({ where: { status: "PAID", amountPaise: { gt: 0 }, coupon: { referrerId: userId }, userId: { not: userId } }, distinct: ["userId"], select: { userId: true } }),
    db.coupon.findMany({ where: { ownerId: userId, rewardOrderId: { not: null } }, orderBy: { createdAt: "desc" }, take: 50 }),
  ]);
  const now = new Date();
  return {
    code,
    friends: friends.length,
    rewards: rewards.map((r) => ({ code: r.code, validTill: r.validTill, used: r.usedCount >= (r.maxUses ?? 1), expired: !!r.validTill && r.validTill < now })),
  };
}
