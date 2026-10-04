import "server-only";
import { db } from "@/lib/db";
import { applyCoupon, couponProblem, endOfDayIst, normalizeCode, validateCoupon, type CouponInput } from "./coupon-input";
import { referralCouponProblem } from "./referral-rules";

type Fail = { ok: false; errors: string[] };

export type CouponRow = {
  id: string;
  code: string;
  type: "PCT" | "FLAT";
  value: number;
  maxUses: number | null;
  usedCount: number;
  validTill: Date | null;
  affiliateTag: string | null;
  isActive: boolean;
  /** money taken through this coupon (paid orders) */
  revenuePaise: number;
};

export async function listCoupons(): Promise<CouponRow[]> {
  const [coupons, revenue] = await Promise.all([
    // Referral codes are per-student and numerous; they live on the student's /refer page.
    db.coupon.findMany({ where: { referrerId: null }, orderBy: { createdAt: "desc" } }),
    db.order.groupBy({ by: ["couponId"], where: { status: "PAID", couponId: { not: null } }, _sum: { amountPaise: true } }),
  ]);
  const byCoupon = new Map(revenue.map((r) => [r.couponId, r._sum.amountPaise ?? 0]));
  return coupons.map((c) => ({
    id: c.id,
    code: c.code,
    type: c.pctOff ? "PCT" : "FLAT",
    value: c.pctOff ?? (c.flatOffPaise ?? 0) / 100,
    maxUses: c.maxUses,
    usedCount: c.usedCount,
    validTill: c.validTill,
    affiliateTag: c.affiliateTag,
    isActive: c.isActive,
    revenuePaise: byCoupon.get(c.id) ?? 0,
  }));
}

function data(v: CouponInput) {
  return {
    code: v.code,
    pctOff: v.type === "PCT" ? v.value : null,
    flatOffPaise: v.type === "FLAT" ? Math.round(v.value * 100) : null,
    maxUses: v.maxUses,
    validTill: v.validTill ? endOfDayIst(v.validTill) : null,
    affiliateTag: v.affiliateTag || null,
    isActive: v.isActive,
  };
}

export async function createCoupon(raw: unknown, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const v = validateCoupon(raw);
  if (!v.ok) return v;
  if (await db.coupon.findUnique({ where: { code: v.value.code }, select: { id: true } })) {
    return { ok: false, errors: ["A coupon with this code already exists"] };
  }
  const c = await db.coupon.create({ data: data(v.value), select: { id: true } });
  await db.auditLog.create({ data: { actorId, entity: "coupon", entityId: c.id, action: "create" } });
  return { ok: true, id: c.id };
}

export async function setCouponActive(id: string, isActive: boolean, actorId: string): Promise<{ ok: true }> {
  await db.coupon.update({ where: { id }, data: { isActive } });
  await db.auditLog.create({ data: { actorId, entity: "coupon", entityId: id, action: isActive ? "activate" : "deactivate" } });
  return { ok: true };
}

export async function deleteCoupon(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  if ((await db.order.count({ where: { couponId: id } })) > 0) {
    return { ok: false, errors: ["This coupon has orders and can't be deleted — deactivate it instead"] };
  }
  await db.coupon.delete({ where: { id } });
  await db.auditLog.create({ data: { actorId, entity: "coupon", entityId: id, action: "delete" } });
  return { ok: true };
}

export type CouponQuote = { couponId: string; code: string; discountPaise: number; finalPaise: number };

/** Checks a code for this student and price. Each student can use a given coupon once (paid or free). */
export async function quoteCoupon(userId: string, rawCode: string, pricePaise: number): Promise<CouponQuote | { error: string }> {
  const code = normalizeCode(rawCode);
  if (!code) return { error: "Enter a coupon code." };
  const coupon = await db.coupon.findUnique({ where: { code } });
  if (!coupon) return { error: "This coupon code is not valid." };
  const problem = couponProblem(coupon);
  if (problem) return { error: problem };
  const used = await db.order.count({ where: { userId, couponId: coupon.id, status: "PAID" } });
  if (used > 0) return { error: "You have already used this coupon." };
  const hasPaidBefore = coupon.referrerId ? (await db.order.count({ where: { userId, status: "PAID" } })) > 0 : false;
  const refProblem = referralCouponProblem(coupon, userId, hasPaidBefore);
  if (refProblem) return { error: refProblem };
  return { couponId: coupon.id, code: coupon.code, ...applyCoupon(pricePaise, coupon) };
}

/** Counts a redemption once its order is paid. Never blocks fulfilment: the student has already paid. */
export async function recordRedemption(couponId: string): Promise<void> {
  await db.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } });
}
