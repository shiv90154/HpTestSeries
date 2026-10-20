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
import { OverviewCharts } from "./overview-charts";

export async function OverviewData() {
  await connection(); // always render per request; counts must be live

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [exams, questions, published, users, revenue, ordersToday, attemptsToday, flagged] = await Promise.all([
    db.exam.count(),
    db.question.count(),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.user.count(),
    db.order.aggregate({ where: { status: "PAID" }, _sum: { amountPaise: true } }),
    db.order.count({ where: { status: "PAID", createdAt: { gte: todayStart } } }),
    db.attempt.count({ where: { status: "SUBMITTED", submittedAt: { gte: todayStart } } }),
    db.attempt.count({ where: { flagged: true } }),
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

      <OverviewCharts />

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
