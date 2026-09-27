"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  deleteProduct,
  setProductActive,
  updateProduct,
} from "@/modules/commerce/product-service";
import { requirePermission } from "@/modules/identity/session";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

export async function createProductAction(raw: unknown): Promise<Result<{ id: string }>> {
  const user = await requirePermission("commerce:manage");
  const res = await createProduct(raw, user.id);
  if (res.ok) revalidatePath("/admin/products");
  return res;
}

export async function updateProductAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await updateProduct(id, raw, user.id);
  if (res.ok) revalidatePath("/admin/products");
  return res;
}

export async function setProductActiveAction(id: string, isActive: boolean): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await setProductActive(id, isActive, user.id);
  if (res.ok) revalidatePath("/admin/products");
  return res;
}

export async function deleteProductAction(id: string): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  const res = await deleteProduct(id, user.id);
  if (res.ok) revalidatePath("/admin/products");
  return res;
}
