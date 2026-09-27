import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getProductForEdit, listSeriesOptions } from "@/modules/commerce/product-service";
import { requirePermission } from "@/modules/identity/session";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  await requirePermission("commerce:manage");
  await connection();
  const { id } = await params;
  const [product, seriesOptions] = await Promise.all([getProductForEdit(id), listSeriesOptions()]);
  if (!product) notFound();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/products" className="text-sm text-muted">
          ← Products
        </Link>
        <h1 className="text-xl font-semibold">{product.title}</h1>
      </div>
      <ProductForm id={product.id} seriesOptions={seriesOptions} initial={product} />
    </div>
  );
}
