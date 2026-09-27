import type { Metadata } from "next";
import { connection } from "next/server";
import { listOrders } from "@/modules/commerce/order-service";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Orders" };

const statusStyle: Record<string, string> = {
  CREATED: "bg-surface-muted text-muted",
  PAID: "bg-success-soft text-success",
  FAILED: "bg-danger-soft text-danger",
  REFUNDED: "bg-accent-soft text-accent-strong",
};

export default async function OrdersAdminPage() {
  await requirePermission("commerce:manage");
  await connection();
  const orders = await listOrders();

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">
        Orders <span className="text-base font-normal text-muted">(latest {orders.length})</span>
      </h1>

      {orders.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">No orders yet.</p>
      ) : (
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
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-2 text-muted">{o.createdAt.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2">
                    <div>{o.userName}</div>
                    <div className="text-xs text-muted">{o.userEmail}</div>
                  </td>
                  <td className="px-4 py-2">{o.productTitle}</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹{(o.amountPaise / 100).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyle[o.status] ?? ""}`}>{o.status.toLowerCase()}</span>
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-muted">{o.paymentId ?? o.razorpayOrderId ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
