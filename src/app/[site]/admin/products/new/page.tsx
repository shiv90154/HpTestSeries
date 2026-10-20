import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { listSeriesOptions } from "@/modules/commerce/product-service";
import { requirePermission } from "@/modules/identity/session";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
  await requirePermission("commerce:manage");
  await connection();
  const seriesOptions = await listSeriesOptions();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/products" className="text-sm text-muted">
          ← Products
        </Link>
        <h1 className="text-xl font-semibold">New product</h1>
      </div>
      <ProductForm
        id={null}
        seriesOptions={seriesOptions}
        initial={{ slug: "", title: "", titleHi: "", kind: "PASS", priceRupees: 0, validityDays: 365, isActive: true, seriesIds: [] }}
      />
    </div>
  );
}
