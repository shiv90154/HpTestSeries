import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { KIND_LABEL } from "@/modules/commerce/product-input";
import { listProducts } from "@/modules/commerce/product-service";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsAdminPage() {
  await requirePermission("commerce:manage");
  await connection();
  const products = await listProducts();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">
          Products <span className="text-base font-normal text-muted">({products.length})</span>
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="text-sm text-muted hover:text-primary">
            View orders →
          </Link>
          <Link href="/admin/products/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            New product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          No products yet. <Link href="/admin/products/new" className="text-primary underline">Create the first one</Link>.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {products.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 p-4 text-sm">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/products/${p.id}`} className="font-medium hover:text-primary">
                  {p.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span className={`rounded-md px-2 py-0.5 font-semibold ${p.isActive ? "bg-success-soft text-success" : "bg-surface-muted text-muted"}`}>
                    {p.isActive ? "active" : "inactive"}
                  </span>
                  <span>{KIND_LABEL[p.kind as keyof typeof KIND_LABEL]}</span>
                  <span>{p.validityDays ? `${p.validityDays} days` : "no expiry set"}</span>
                  <a href={`/buy/${p.slug}`} target="_blank" rel="noreferrer" className="text-primary underline">
                    /buy/{p.slug}
                  </a>
                </div>
              </div>
              <span className="text-muted tabular-nums">
                ₹{(p.priceInPaise / 100).toLocaleString("en-IN")} · {p.orderCount} orders · {p.entitlementCount} active grants
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
