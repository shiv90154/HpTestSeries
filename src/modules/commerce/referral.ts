import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { FRIEND_DISCOUNT_PAISE, MAX_REWARDS_PER_USER, randomCode } from "./referral-rules";
import { creditReferralReward } from "./wallet";

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
 * Credits the referrer's wallet once a friend's order that used their code is paid. Idempotent: the credit is keyed
 * on the order, so the checkout callback, the webhook and the reconcile job can all call it.
 * Self-referrals are blocked at quote time; the cap and the zero-cash check here keep farming and free orders out.
 */
export async function rewardReferrer(orderId: string): Promise<boolean> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { status: true, userId: true, amountPaise: true, coupon: { select: { referrerId: true } } },
  });
  const referrerId = order?.coupon?.referrerId;
  if (!order || order.status !== "PAID" || !order.userId || !referrerId || referrerId === order.userId || order.amountPaise <= 0) return false;
  return creditReferralReward(referrerId, orderId, MAX_REWARDS_PER_USER);
}

export type ReferralSummary = {
  code: string;
  /** distinct friends whose paid order used this code */
  friends: number;
};

export async function getReferralSummary(userId: string): Promise<ReferralSummary> {
  const code = await getOrCreateReferralCode(userId);
  const friends = await db.order.findMany({
    where: { status: "PAID", amountPaise: { gt: 0 }, coupon: { referrerId: userId }, userId: { not: userId } },
    distinct: ["userId"],
    select: { userId: true },
  });
  return { code, friends: friends.length };
}
