import { connection } from "next/server";
import { missingBusinessDetails } from "@/lib/business";
import { db } from "@/lib/db";

export default async function AdminOverviewPage() {
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

  const stats = [
    { label: "Exams", value: exams },
    { label: "Questions", value: questions },
    { label: "Published questions", value: published },
    { label: "Users", value: users },
    { label: "Revenue (paid)", value: (revenue._sum.amountPaise ?? 0) / 100, isCurrency: true },
    { label: "Orders today", value: ordersToday },
    { label: "Attempts today", value: attemptsToday },
    { label: "Flagged attempts", value: flagged },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Overview</h1>
      {missing.length > 0 && (
        <p role="alert" className="rounded-xl border border-accent bg-accent-soft p-4 text-sm">
          <b>Before launch:</b> the Contact and policy pages are missing your {missing.join(", ")}. Fill them in{" "}
          <code>src/lib/business.ts</code> — Razorpay will not approve the account without them.
        </p>
      )}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {"isCurrency" in s && s.isCurrency ? "₹" : ""}
              {s.value.toLocaleString("en-IN")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
