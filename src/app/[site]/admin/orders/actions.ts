"use server";

import { revalidateSitePath } from "@/sites/revalidate";
import { reconcilePendingOrders } from "@/modules/commerce/orders";
import { requirePermission } from "@/modules/identity/session";

export async function reconcileAction(): Promise<{ checked: number; recovered: number; errors: number }> {
  await requirePermission("commerce:manage");
  const res = await reconcilePendingOrders();
  revalidateSitePath("/admin/orders");
  return res;
}
