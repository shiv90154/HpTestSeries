import { connection } from "next/server";
import Link from "next/link";
import { StatusBadge } from "../ui";
import { Table } from "../table";
import { listOrders } from "@/modules/commerce/order-service";

export async function OrdersTableData() {
  await connection();
  const orders = await listOrders();

  return (
    <>
      <p className="mb-3 text-sm text-muted">Latest {orders.length}</p>
      <Table
        caption="Orders"
        rows={orders}
        rowKey={(o) => o.id}
        emptyMessage="No orders yet."
        columns={[
          { header: "When", render: (o) => o.createdAt.toLocaleString("en-IN"), cellClassName: "whitespace-nowrap text-muted" },
          {
            header: "User",
            render: (o) => (
              <>
                {o.userId ? (
                  <Link href={`/admin/users/${o.userId}`} className="hover:text-primary hover:underline">{o.userName}</Link>
                ) : (
                  <span className="italic">{o.userName}</span>
                )}
                <div className="text-xs text-muted">{o.userEmail}</div>
              </>
            ),
          },
          { header: "Product", render: (o) => o.productTitle },
          {
            header: "Amount",
            align: "right",
            render: (o) => `₹${(o.amountPaise / 100).toLocaleString("en-IN")}`,
            cellClassName: "tabular-nums",
          },
          { header: "Status", render: (o) => <StatusBadge status={o.status} /> },
          {
            header: "Razorpay",
            render: (o) => o.paymentId ?? o.razorpayOrderId ?? "—",
            cellClassName: "font-mono text-xs text-muted",
          },
        ]}
      />
    </>
  );
}
