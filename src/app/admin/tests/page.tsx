import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { TYPE_LABEL } from "@/modules/content/test-input";
import { listTests } from "@/modules/content/test-service";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../ui";

export const metadata: Metadata = { title: "Tests" };

export default async function TestsAdminPage() {
  await requirePermission("content:edit");
  await connection();
  const tests = await listTests();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">
          Tests <span className="text-base font-normal text-muted">({tests.length})</span>
        </h1>
        <Link href="/admin/tests/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          New test
        </Link>
      </div>

      {tests.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          No tests yet. <Link href="/admin/tests/new" className="text-primary underline">Create the first one</Link>.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {tests.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 p-4 text-sm">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/tests/${t.id}`} className="font-medium hover:text-primary">
                  {t.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <StatusBadge status={t.status} />
                  <span>{TYPE_LABEL[t.type]}</span>
                  <span>{t.exam?.name ?? "Common"}</span>
                  <span>{t.isFree ? "Free" : "Paid"}</span>
                  <span>/tests/{t.slug}</span>
                </div>
              </div>
              <span className="text-muted tabular-nums">
                {t._count.questions} Qs · {Math.round(t.durationSec / 60)} min · {t._count.attempts.toLocaleString("en-IN")} attempts
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
