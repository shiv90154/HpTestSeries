import { connection } from "next/server";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpenCheck,
  Flag,
  IndianRupee,
  ListChecks,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { missingBusinessDetails } from "@/lib/business";
import { db } from "@/lib/db";
import { SITES, type SiteCode } from "@/sites";
import { OverviewCharts } from "./overview-charts";
import { siteDomain } from "./site-filter";

export async function OverviewData({ site }: { site: SiteCode | null }) {
  await connection(); // always render per request; counts must be live

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  // Money and people belong to a site; exams, questions and attempts are shared, so they are never filtered.
  const orderSite = site ? { site } : {};

  const [exams, questions, published, users, revenue, ordersToday, attemptsToday, flagged, bySite] = await Promise.all([
    db.exam.count(),
    db.question.count(),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.user.count({ where: site ? { signupSite: site } : {} }),
    db.order.aggregate({ where: { ...orderSite, status: "PAID" }, _sum: { amountPaise: true } }),
    db.order.count({ where: { ...orderSite, status: "PAID", createdAt: { gte: todayStart } } }),
    db.attempt.count({ where: { status: "SUBMITTED", submittedAt: { gte: todayStart } } }),
    db.attempt.count({ where: { flagged: true } }),
    siteBreakdown(),
  ]);

  const missing = missingBusinessDetails();

  type Stat = { label: string; value: number; icon: LucideIcon; isCurrency?: boolean; tone?: "danger" };

  const stats: Stat[] = [
    { label: "Exams", value: exams, icon: BookOpenCheck },
    { label: "Questions", value: questions, icon: ListChecks },
    { label: "Published questions", value: published, icon: ListChecks },
    { label: "Users", value: users, icon: Users },
    { label: "Revenue (paid)", value: (revenue._sum.amountPaise ?? 0) / 100, icon: IndianRupee, isCurrency: true },
    { label: "Orders today", value: ordersToday, icon: ShoppingBag },
    { label: "Attempts today", value: attemptsToday, icon: BookOpenCheck },
    { label: "Flagged attempts", value: flagged, icon: Flag, tone: flagged > 0 ? "danger" : undefined },
  ];

  const quickLinks = [
    { href: "/admin/questions/new", label: "Write a question" },
    { href: "/admin/questions/import", label: "Import questions CSV" },
    { href: "/admin/tests/new", label: "Create a test" },
    { href: "/admin/products/new", label: "Create a product" },
  ];

  return (
    <>
      {missing.length > 0 && (
        <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-accent bg-accent-soft p-4 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
          <span>
            <b>Before launch:</b> the Contact and policy pages are missing your {missing.join(", ")}. Fill them in{" "}
            <code>src/lib/business.ts</code> — Razorpay will not approve the account without them.
          </span>
        </p>
      )}

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
              <dt className="flex items-center gap-2 text-sm text-muted">
                <Icon className={`h-4 w-4 shrink-0 ${s.tone === "danger" ? "text-danger" : "text-primary"}`} />
                <span className="truncate">{s.label}</span>
              </dt>
              <dd className={`mt-2 text-2xl font-semibold tabular-nums ${s.tone === "danger" ? "text-danger" : ""}`}>
                {s.isCurrency ? "₹" : ""}
                {s.value.toLocaleString("en-IN")}
              </dd>
            </div>
          );
        })}
      </dl>

      <SiteBreakdown rows={bySite} current={site} />

      <OverviewCharts site={site} />

      <div className="rounded-xl border border-border bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted">Quick actions</h2>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

type SiteRow = { code: SiteCode; paidRupees: number; paidOrders: number; unpaidOrders: number; last30Rupees: number; users: number };

/** Paid revenue, orders and signups per domain, all time, plus the last 30 days of revenue. */
async function siteBreakdown(): Promise<SiteRow[]> {
  const since = new Date(Date.now() - 30 * 86_400_000);
  const [orders, recent, users] = await Promise.all([
    db.order.groupBy({ by: ["site", "status"], _sum: { amountPaise: true }, _count: { _all: true } }),
    db.order.groupBy({ by: ["site"], where: { status: "PAID", createdAt: { gte: since } }, _sum: { amountPaise: true } }),
    db.user.groupBy({ by: ["signupSite"], _count: { _all: true } }),
  ]);
  return Object.values(SITES).map(({ code }) => {
    const mine = orders.filter((o) => o.site === code);
    const paid = mine.find((o) => o.status === "PAID");
    return {
      code,
      paidRupees: (paid?._sum.amountPaise ?? 0) / 100,
      paidOrders: paid?._count._all ?? 0,
      unpaidOrders: mine.filter((o) => o.status === "CREATED" || o.status === "FAILED").reduce((n, o) => n + o._count._all, 0),
      last30Rupees: (recent.find((o) => o.site === code)?._sum.amountPaise ?? 0) / 100,
      users: users.find((u) => u.signupSite === code)?._count._all ?? 0,
    };
  });
}

function SiteBreakdown({ rows, current }: { rows: SiteRow[]; current: SiteCode | null }) {
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const total = rows.reduce((n, r) => n + r.paidRupees, 0);
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <caption className="px-4 pt-3 text-left text-sm font-semibold text-muted">Revenue by site</caption>
        <thead className="text-left text-xs text-muted">
          <tr>
            <th className="px-4 py-2">Domain</th>
            <th className="px-4 py-2 text-right">Revenue (paid)</th>
            <th className="px-4 py-2 text-right">Last 30 days</th>
            <th className="px-4 py-2 text-right">Paid orders</th>
            <th className="px-4 py-2 text-right">Not paid</th>
            <th className="px-4 py-2 text-right">Users</th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows.map((r) => (
            <tr key={r.code} className={`border-t border-border ${r.code === current ? "bg-primary-soft" : ""}`}>
              <td className="px-4 py-2">
                <Link href={`/admin/orders?site=${r.code}`} className="font-medium hover:text-primary hover:underline">
                  {siteDomain(r.code)}
                </Link>
              </td>
              <td className="px-4 py-2 text-right font-semibold">
                {inr(r.paidRupees)}
                {total > 0 && <span className="ml-1 text-xs font-normal text-muted">{Math.round((r.paidRupees / total) * 100)}%</span>}
              </td>
              <td className="px-4 py-2 text-right">{inr(r.last30Rupees)}</td>
              <td className="px-4 py-2 text-right">{r.paidOrders.toLocaleString("en-IN")}</td>
              <td className="px-4 py-2 text-right text-muted">{r.unpaidOrders.toLocaleString("en-IN")}</td>
              <td className="px-4 py-2 text-right">{r.users.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
