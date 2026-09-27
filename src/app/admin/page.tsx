import { connection } from "next/server";
import { missingBusinessDetails } from "@/lib/business";
import { db } from "@/lib/db";

export default async function AdminOverviewPage() {
  await connection(); // always render per request; counts must be live

  const [exams, questions, published, users] = await Promise.all([
    db.exam.count(),
    db.question.count(),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.user.count(),
  ]);

  const missing = missingBusinessDetails();

  const stats = [
    { label: "Exams", value: exams },
    { label: "Questions", value: questions },
    { label: "Published questions", value: published },
    { label: "Users", value: users },
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
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value.toLocaleString("en-IN")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
