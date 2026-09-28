import "server-only";
import { db } from "@/lib/db";
import { ownershipFor, type OwnedEntitlement, type Ownership } from "./ownership";

/** The student's unrevoked entitlements that haven't expired (including renewals that start later). */
export async function liveEntitlements(userId: string, now = new Date()): Promise<(OwnedEntitlement & { productSlug: string })[]> {
  const rows = await db.entitlement.findMany({
    where: { userId, revokedAt: null, expiresAt: { gt: now } },
    orderBy: { expiresAt: "asc" },
    select: {
      productId: true,
      startsAt: true,
      expiresAt: true,
      revokedAt: true,
      product: { select: { slug: true, title: true, kind: true, items: { select: { seriesId: true } } } },
    },
  });
  return rows.map((r) => ({
    productId: r.productId,
    productSlug: r.product.slug,
    productTitle: r.product.title,
    startsAt: r.startsAt,
    expiresAt: r.expiresAt,
    revokedAt: r.revokedAt,
    product: { kind: r.product.kind, seriesIds: r.product.items.map((i) => i.seriesId) },
  }));
}

export async function getOwnership(userId: string, productId: string): Promise<Ownership> {
  const [product, entitlements] = await Promise.all([
    db.product.findUnique({ where: { id: productId }, select: { id: true, kind: true, validUntil: true, items: { select: { seriesId: true } } } }),
    liveEntitlements(userId),
  ]);
  if (!product) return { kind: "none" };
  return ownershipFor({ id: product.id, kind: product.kind, validUntil: product.validUntil, seriesIds: product.items.map((i) => i.seriesId) }, entitlements);
}

export type Plan = { slug: string; title: string; kind: "SERIES" | "PACK" | "PASS"; startsAt: Date; expiresAt: Date; daysLeft: number; upcoming: boolean };

/** Active and already-bought upcoming plans, soonest-ending first — the dashboard "My plan" card. */
export async function getMyPlans(userId: string): Promise<Plan[]> {
  const now = new Date();
  return (await liveEntitlements(userId, now)).map((e) => ({
    slug: e.productSlug,
    title: e.productTitle,
    kind: e.product.kind,
    startsAt: e.startsAt,
    expiresAt: e.expiresAt,
    daysLeft: Math.max(0, Math.ceil((e.expiresAt.getTime() - now.getTime()) / 86_400_000)),
    upcoming: e.startsAt > now,
  }));
}

export type PurchaseRow = { id: string; productTitle: string; amountPaise: number; status: "PAID" | "REFUNDED"; createdAt: Date };

/** Completed purchases only: abandoned and failed checkouts would just confuse students. */
export async function getMyPurchases(userId: string): Promise<PurchaseRow[]> {
  const orders = await db.order.findMany({
    where: { userId, status: { in: ["PAID", "REFUNDED"] } },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, amountPaise: true, status: true, createdAt: true, product: { select: { title: true } } },
  });
  return orders.map((o) => ({ id: o.id, productTitle: o.product.title, amountPaise: o.amountPaise, status: o.status as "PAID" | "REFUNDED", createdAt: o.createdAt }));
}

/** Everything a payment receipt shows. Only the buyer can see it. */
export async function getReceipt(userId: string, orderId: string) {
  const order = await db.order.findFirst({
    where: { id: orderId, userId, status: { in: ["PAID", "REFUNDED"] } },
    select: {
      id: true,
      amountPaise: true,
      status: true,
      createdAt: true,
      razorpayOrderId: true,
      user: { select: { name: true, email: true, phoneNumber: true } },
      product: { select: { title: true, kind: true } },
      entitlement: { select: { startsAt: true, expiresAt: true } },
      payments: { orderBy: { createdAt: "asc" }, take: 1, select: { razorpayPaymentId: true, createdAt: true } },
    },
  });
  if (!order) return null;
  const payment = order.payments[0] ?? null;
  return {
    id: order.id,
    status: order.status as "PAID" | "REFUNDED",
    amountPaise: order.amountPaise,
    orderedAt: order.createdAt,
    paidAt: payment?.createdAt ?? order.createdAt,
    razorpayOrderId: order.razorpayOrderId,
    razorpayPaymentId: payment?.razorpayPaymentId ?? null,
    customer: order.user,
    product: order.product,
    access: order.entitlement,
  };
}
