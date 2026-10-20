import type { Metadata } from "next";
import { Suspense } from "react";
import { requirePermission } from "@/modules/identity/session";
import { SkeletonTableRow } from "@/components/skeleton";
import { ReconcileButton } from "./reconcile-button";
import { OrdersTableData } from "./orders-table-data";

export const metadata: Metadata = { title: "Orders" };

function OrdersTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="bg-surface-muted text-left text-xs text-muted">
          <tr>
            <th className="px-4 py-2">When</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Razorpay</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonTableRow key={i} cols={6} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function OrdersAdminPage() {
  await requirePermission("commerce:manage");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Orders</h1>
        <ReconcileButton />
      </div>
      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrdersTableData />
      </Suspense>
    </div>
  );
}
