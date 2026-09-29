"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { grantAccess, markOrderRefunded, revokeEntitlement } from "@/modules/identity/user-service";
import { requirePermission } from "@/modules/identity/session";

const id = z.string().min(1).max(64);
type Result = { ok: true } | { ok: false; error: string };

export async function grantAccessAction(userId: string, productId: string): Promise<Result> {
  const actor = await requirePermission("commerce:manage");
  const res = await grantAccess(id.parse(userId), id.parse(productId), actor.id);
  revalidatePath(`/admin/users/${userId}`);
  return res;
}

export async function revokeEntitlementAction(userId: string, entitlementId: string): Promise<Result> {
  const actor = await requirePermission("commerce:manage");
  const res = await revokeEntitlement(id.parse(entitlementId), actor.id);
  revalidatePath(`/admin/users/${userId}`);
  return res;
}

export async function markRefundedAction(userId: string, orderId: string): Promise<Result> {
  const actor = await requirePermission("commerce:manage");
  const res = await markOrderRefunded(id.parse(orderId), actor.id);
  revalidatePath(`/admin/users/${userId}`);
  return res;
}
