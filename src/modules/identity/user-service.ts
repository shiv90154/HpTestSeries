import "server-only";
import { db } from "@/lib/db";

/** Finds students by name, email or phone (staff lookup for support requests). */
export async function searchUsers(q: string) {
  const term = q.trim();
  if (term.length < 2) return [];
  return db.user.findMany({
    where: {
      OR: [
        { email: { contains: term, mode: "insensitive" } },
        { name: { contains: term, mode: "insensitive" } },
        { phoneNumber: { contains: term.replace(/\s/g, "") } },
        { id: term },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 25,
    select: { id: true, name: true, email: true, phoneNumber: true, role: true, createdAt: true },
  });
}

export async function getUserDetail(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
      district: true,
      createdAt: true,
      twoFactorEnabled: true,
      _count: { select: { attempts: true } },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          status: true,
          amountPaise: true,
          createdAt: true,
          product: { select: { title: true } },
          coupon: { select: { code: true } },
          payments: { select: { razorpayPaymentId: true }, take: 1 },
        },
      },
      entitlements: {
        orderBy: { createdAt: "desc" },
        select: { id: true, source: true, startsAt: true, expiresAt: true, revokedAt: true, orderId: true, product: { select: { title: true } } },
      },
    },
  });
  return user;
}

export async function listGrantableProducts() {
  return db.product.findMany({ where: { isActive: true }, orderBy: { title: "asc" }, select: { id: true, title: true, validityDays: true, validUntil: true } });
}

/** Gives a student free access to a product (support goodwill, exam winners, a refund gone wrong…). */
export async function grantAccess(userId: string, productId: string, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const product = await db.product.findUnique({ where: { id: productId }, select: { validityDays: true, validUntil: true } });
  if (!product) return { ok: false, error: "Product not found." };
  const now = new Date();
  const expiresAt = product.validUntil ?? new Date(now.getTime() + (product.validityDays ?? 365) * 86_400_000);
  if (expiresAt <= now) return { ok: false, error: "This product has already expired." };
  const e = await db.entitlement.create({ data: { userId, productId, source: "ADMIN", startsAt: now, expiresAt } });
  await db.auditLog.create({ data: { actorId, entity: "entitlement", entityId: e.id, action: "grant", diff: { userId, productId } } });
  return { ok: true };
}

export async function revokeEntitlement(entitlementId: string, actorId: string): Promise<{ ok: true }> {
  await db.entitlement.update({ where: { id: entitlementId }, data: { revokedAt: new Date() } });
  await db.auditLog.create({ data: { actorId, entity: "entitlement", entityId: entitlementId, action: "revoke" } });
  return { ok: true };
}

/**
 * Records a refund the owner already made from the Razorpay dashboard: the order shows as refunded and
 * the access it bought ends. This does NOT move money.
 */
export async function markOrderRefunded(orderId: string, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const order = await db.order.findUnique({ where: { id: orderId }, select: { status: true } });
  if (!order || order.status !== "PAID") return { ok: false, error: "Only paid orders can be marked as refunded." };
  await db.$transaction([
    db.order.update({ where: { id: orderId }, data: { status: "REFUNDED" } }),
    db.entitlement.updateMany({ where: { orderId, revokedAt: null }, data: { revokedAt: new Date() } }),
  ]);
  await db.auditLog.create({ data: { actorId, entity: "order", entityId: orderId, action: "mark-refunded" } });
  return { ok: true };
}
