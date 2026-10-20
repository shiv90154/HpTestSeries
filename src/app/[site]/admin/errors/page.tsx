import type { Metadata } from "next";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/modules/identity/session";
import { panel } from "../ui";

export const metadata: Metadata = { title: "Errors" };

export default async function ErrorsPage() {
  await requirePermission("users:manage");
  await connection();

  const errors = await db.errorLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Errors</h1>
        <p className="text-sm text-muted">
          Self-hosted crash log — no external monitoring (Sentry etc.) is wired up. This is everything the server has caught,
          newest first, capped at the last 100.
        </p>
      </div>

      {errors.length === 0 ? (
        <p className={`${panel} text-sm text-muted`}>No errors recorded. 🎉</p>
      ) : (
        <ul className="space-y-3">
          {errors.map((e) => (
            <li key={e.id} className={`${panel} space-y-1.5 text-sm`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-danger-soft px-2 py-0.5 text-xs font-semibold text-danger">
                  {e.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                </span>
                {e.path && <span className="rounded-md bg-surface-muted px-2 py-0.5 text-xs font-mono">{e.path}</span>}
                {e.userId && <span className="text-xs text-muted">user: {e.userId}</span>}
              </div>
              <p className="font-medium">{e.message}</p>
              {e.stack && (
                <details className="text-xs text-muted">
                  <summary className="cursor-pointer">Stack trace</summary>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-surface-muted p-3">{e.stack}</pre>
                </details>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
