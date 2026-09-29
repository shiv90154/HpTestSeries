import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { rupees } from "@/lib/money";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { getUserDetail, listGrantableProducts } from "@/modules/identity/user-service";
import { Table } from "../../table";
import { panel, StatusBadge } from "../../ui";
import { GrantAccess, RefundedButton, RevokeButton } from "./user-actions";

export const metadata: Metadata = { title: "User" };

const when = (d: Date) => d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default async function UserAdminPage({ params }: PageProps<"/admin/users/[id]">) {
  const actor = await requirePermission("users:manage");
  await connection();
  const { id } = await params;
  const [user, products] = await Promise.all([getUserDetail(id), listGrantableProducts()]);
  if (!user) notFound();
  const canEditMoney = can(actor.role, "commerce:manage");
  const now = new Date();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/users" className="text-sm text-muted">
          ← Users
        </Link>
        <h1 className="text-xl font-semibold">{user.name}</h1>
      </div>

      <dl className={`${panel} grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2`}>
        <div><dt className="text-xs text-muted">Email</dt><dd>{user.email}</dd></div>
        <div><dt className="text-xs text-muted">Phone</dt><dd>{user.phoneNumber ?? "—"}</dd></div>
        <div><dt className="text-xs text-muted">Role</dt><dd>{user.role.toLowerCase()}{user.twoFactorEnabled ? " · 2FA on" : ""}</dd></div>
        <div><dt className="text-xs text-muted">District</dt><dd>{user.district ?? "—"}</dd></div>
        <div><dt className="text-xs text-muted">Joined</dt><dd>{when(user.createdAt)}</dd></div>
        <div><dt className="text-xs text-muted">Tests attempted</dt><dd>{user._count.attempts}</dd></div>
      </dl>

      <section className="space-y-2">
        <h2 className="font-semibold">Access</h2>
        <Table
          caption="Entitlements"
          rows={user.entitlements}
          rowKey={(e) => e.id}
          emptyMessage="No access granted or purchased."
          columns={[
            { header: "Product", render: (e) => e.product.title },
            { header: "Source", render: (e) => e.source.toLowerCase().replace("_", " "), cellClassName: "text-muted" },
            { header: "From", render: (e) => when(e.startsAt), cellClassName: "text-muted" },
            { header: "Until", render: (e) => when(e.expiresAt), cellClassName: "text-muted" },
            {
              header: "State",
              render: (e) => (e.revokedAt ? "Revoked" : e.expiresAt < now ? "Expired" : e.startsAt > now ? "Upcoming" : "Active"),
            },
            { header: "", render: (e) => (canEditMoney && !e.revokedAt && e.expiresAt > now ? <RevokeButton userId={user.id} entitlementId={e.id} /> : null) },
          ]}
        />
        {canEditMoney && <GrantAccess userId={user.id} products={products} />}
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Orders</h2>
        <Table
          caption="Orders"
          rows={user.orders}
          rowKey={(o) => o.id}
          emptyMessage="No orders."
          columns={[
            { header: "When", render: (o) => when(o.createdAt), cellClassName: "whitespace-nowrap text-muted" },
            { header: "Product", render: (o) => o.product.title },
            { header: "Amount", align: "right", render: (o) => rupees(o.amountPaise), cellClassName: "tabular-nums" },
            { header: "Coupon", render: (o) => o.coupon?.code ?? "—", cellClassName: "text-muted" },
            { header: "Status", render: (o) => <StatusBadge status={o.status} /> },
            { header: "Payment", render: (o) => o.payments[0]?.razorpayPaymentId ?? "—", cellClassName: "font-mono text-xs text-muted" },
            { header: "", render: (o) => (canEditMoney && o.status === "PAID" ? <RefundedButton userId={user.id} orderId={o.id} /> : null) },
          ]}
        />
      </section>
    </div>
  );
}
