"use server";

import { revalidatePath } from "next/cache";
import { reconcilePendingOrders } from "@/modules/commerce/orders";
import { requirePermission } from "@/modules/identity/session";

export async function reconcileAction(): Promise<{ checked: number; recovered: number; errors: number }> {
  await requirePermission("commerce:manage");
  const res = await reconcilePendingOrders();
  revalidatePath("/admin/orders");
  return res;
}
