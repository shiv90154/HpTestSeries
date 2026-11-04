"use server";

import { revalidateSitePath } from "@/sites/revalidate";
import { addFinanceEntry, deleteFinanceEntry } from "@/modules/commerce/finance-service";
import { requirePermission } from "@/modules/identity/session";

type Result = { ok: true } | { ok: false; errors: string[] };

export async function addFinanceEntryAction(raw: unknown): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await addFinanceEntry(raw, user.id);
  if (res.ok) revalidateSitePath("/admin/finance");
  return res;
}

export async function deleteFinanceEntryAction(id: string): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await deleteFinanceEntry(id, user.id);
  revalidateSitePath("/admin/finance");
  return res;
}
