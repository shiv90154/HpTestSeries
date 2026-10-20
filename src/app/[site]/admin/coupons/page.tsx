import type { Metadata } from "next";
import { connection } from "next/server";
import { rupees } from "@/lib/money";
import { listCoupons } from "@/modules/commerce/coupon-service";
import { requirePermission } from "@/modules/identity/session";
import { Table } from "../table";
import { StatusBadge } from "../ui";
import { CouponForm } from "./coupon-form";
import { CouponRowActions } from "./coupon-row-actions";

export const metadata: Metadata = { title: "Coupons" };

export default async function CouponsAdminPage() {
  await requirePermission("commerce:manage");
  await connection();
  const coupons = await listCoupons();

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Coupons</h1>
      <p className="text-sm text-muted">
        Each student can use a coupon once. A 100% coupon gives free access without payment. The partner tag shows which channel brought the sale.
      </p>
      <CouponForm />
      <Table
        caption="Coupons"
        rows={coupons}
        rowKey={(c) => c.id}
        emptyMessage="No coupons yet."
        columns={[
          { header: "Code", render: (c) => <span className="font-mono font-semibold">{c.code}</span> },
          { header: "Discount", render: (c) => (c.type === "PCT" ? `${c.value}% off` : `${rupees(c.value * 100)} off`) },
          { header: "Used", align: "right", render: (c) => `${c.usedCount}${c.maxUses ? ` / ${c.maxUses}` : ""}`, cellClassName: "tabular-nums" },
          { header: "Sales", align: "right", render: (c) => rupees(c.revenuePaise), cellClassName: "tabular-nums" },
          { header: "Valid till", render: (c) => (c.validTill ? c.validTill.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) : "—"), cellClassName: "text-muted" },
          { header: "Partner", render: (c) => c.affiliateTag ?? "—", cellClassName: "text-muted" },
          { header: "Status", render: (c) => <StatusBadge status={c.isActive ? "PAID" : "CREATED"} /> },
          { header: "", render: (c) => <CouponRowActions id={c.id} isActive={c.isActive} code={c.code} /> },
        ]}
      />
    </div>
  );
}
