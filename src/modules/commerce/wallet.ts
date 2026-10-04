import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { REWARD_PAISE } from "./referral-rules";
import { splitWallet, STALE_RESERVATION_MINUTES } from "./wallet-rules";

type Client = Prisma.TransactionClient;

const isUniqueViolation = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";

/** Gives back wallet money reserved for this student's orders that were never paid (closed tab, abandoned checkout). */
async function releaseStaleReservations(client: Client, userId: string): Promise<void> {
  const cutoff = new Date(Date.now() - STALE_RESERVATION_MINUTES * 60_000);
  const stale = await client.order.findMany({
    where: { userId, status: { in: ["CREATED", "FAILED"] }, walletPaise: { gt: 0 }, createdAt: { lt: cutoff } },
    select: { id: true },
  });
  if (stale.length) await client.walletTransaction.deleteMany({ where: { type: "PURCHASE", orderId: { in: stale.map((o) => o.id) } } });
}

async function balanceOf(client: Client, userId: string): Promise<number> {
  const sum = await client.walletTransaction.aggregate({ where: { userId }, _sum: { amountPaise: true } });
  return Math.max(0, sum._sum.amountPaise ?? 0); // a reversal can push the ledger below zero; the spendable balance never is
}

export async function getWalletBalance(userId: string): Promise<number> {
  await releaseStaleReservations(db, userId);
  return balanceOf(db, userId);
}

export type WalletEntry = { id: string; amountPaise: number; type: string; note: string | null; createdAt: Date };

export async function getWalletHistory(userId: string, take = 30): Promise<WalletEntry[]> {
  return db.walletTransaction.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take, select: { id: true, amountPaise: true, type: true, note: true, createdAt: true } });
}

/**
 * Creates the order and, when asked, reserves the wallet money for it in the same transaction. The student's row
 * is locked first so two checkouts started together can't both spend the same balance.
 * `totalPaise` is the price after any coupon; the order's amountPaise ends up as the cash part only.
 */
export async function createOrderWithWallet(a: { userId: string; productId: string; totalPaise: number; discountPaise: number; couponId: string | null; useWallet: boolean }) {
  return db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "user" WHERE id = ${a.userId} FOR UPDATE`;
    await releaseStaleReservations(tx, a.userId);
    const balance = a.useWallet ? await balanceOf(tx, a.userId) : 0;
    const { walletPaise, cashPaise } = splitWallet(a.totalPaise, balance);
    const order = await tx.order.create({
      data: { userId: a.userId, productId: a.productId, amountPaise: cashPaise, walletPaise, discountPaise: a.discountPaise, couponId: a.couponId, status: "CREATED" },
      include: { product: true },
    });
    if (walletPaise > 0) await tx.walletTransaction.create({ data: { userId: a.userId, amountPaise: -walletPaise, type: "PURCHASE", orderId: order.id } });
    return order;
  });
}

/** Gives the wallet money of an order back (the Razorpay order could not be created). */
export async function releaseOrderReservation(orderId: string): Promise<void> {
  await db.walletTransaction.deleteMany({ where: { type: "PURCHASE", orderId } });
}

/** The prepared write that turns an order's reservation into a final spend; also re-creates one that was released as stale. */
export function confirmSpendOp(order: { id: string; userId: string; walletPaise: number }) {
  return db.walletTransaction.upsert({
    where: { type_orderId: { type: "PURCHASE", orderId: order.id } },
    create: { userId: order.userId, amountPaise: -order.walletPaise, type: "PURCHASE", orderId: order.id },
    update: {},
  });
}

/** Credits the referrer when a friend's order that used their referral code is paid. Idempotent per order. */
export async function creditReferralReward(referrerId: string, friendOrderId: string, maxRewards: number): Promise<boolean> {
  if ((await db.walletTransaction.count({ where: { userId: referrerId, type: "REFERRAL_REWARD" } })) >= maxRewards) return false;
  try {
    await db.walletTransaction.create({ data: { userId: referrerId, amountPaise: REWARD_PAISE, type: "REFERRAL_REWARD", orderId: friendOrderId, note: "A friend joined with your code" } });
    return true;
  } catch (err) {
    if (isUniqueViolation(err)) return false; // already credited
    throw err;
  }
}

/**
 * Wallet side effects of a refund the owner already made on Razorpay: the wallet part of the order goes back to the
 * student, and the referral reward this order earned is taken back from the referrer.
 */
export async function settleWalletOnRefund(orderId: string): Promise<void> {
  const order = await db.order.findUnique({ where: { id: orderId }, select: { userId: true, walletPaise: true } });
  if (!order) return;
  if (order.userId && order.walletPaise > 0) {
    await db.walletTransaction
      .create({ data: { userId: order.userId, amountPaise: order.walletPaise, type: "REFUND", orderId, note: "Refunded order" } })
      .catch((e) => {
        if (!isUniqueViolation(e)) throw e;
      });
  }
  const reward = await db.walletTransaction.findUnique({ where: { type_orderId: { type: "REFERRAL_REWARD", orderId } } });
  if (reward) {
    await db.walletTransaction
      .create({ data: { userId: reward.userId, amountPaise: -reward.amountPaise, type: "REFERRAL_REVERSAL", orderId, note: "Friend's order was refunded" } })
      .catch((e) => {
        if (!isUniqueViolation(e)) throw e;
      });
  }
}
