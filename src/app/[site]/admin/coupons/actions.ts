"use server";

import { revalidateSitePath } from "@/sites/revalidate";
import { createCoupon, deleteCoupon, setCouponActive } from "@/modules/commerce/coupon-service";
import { requirePermission } from "@/modules/identity/session";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

export async function createCouponAction(raw: unknown): Promise<Result<{ id: string }>> {
  const user = await requirePermission("commerce:manage");
  const res = await createCoupon(raw, user.id);
  if (res.ok) revalidateSitePath("/admin/coupons");
  return res;
}

export async function setCouponActiveAction(id: string, isActive: boolean): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await setCouponActive(id, isActive, user.id);
  revalidateSitePath("/admin/coupons");
  return res;
}

export async function deleteCouponAction(id: string): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await deleteCoupon(id, user.id);
  if (res.ok) revalidateSitePath("/admin/coupons");
  return res;
}
