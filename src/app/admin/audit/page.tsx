import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { auditEntityHref, listAuditLog } from "@/modules/analytics/audit";
import { requirePermission } from "@/modules/identity/session";
import { input, label, panel } from "../ui";

export const metadata: Metadata = { title: "Audit log" };

const when = (d: Date) => d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function AuditPage({ searchParams }: PageProps<"/admin/audit">) {
  await requirePermission("audit:view");
  await connection();
  const sp = await searchParams;
  const entity = one(sp.entity);
  const q = one(sp.q);
  const page = Math.max(1, Number(one(sp.page)) || 1);
  const { rows, total, pages, entities } = await listAuditLog({ entity: entity || undefined, q: q || undefined, page });

  const pageHref = (p: number) => `/admin/audit?${new URLSearchParams({ ...(entity && { entity }), ...(q && { q }), page: String(p) })}`;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Audit log</h1>
        <p className="text-sm text-muted">Who changed what: questions, tests, products, posts, exams, roles and flagged attempts. Newest first.</p>
      </div>

      <form className={`${panel} grid gap-3 sm:grid-cols-[180px_1fr_auto] sm:items-end`}>
        <div>
          <label className={label} htmlFor="entity">
            Record type
          </label>
          <select id="entity" name="entity" defaultValue={entity} className={input}>
            <option value="">All</option>
            {entities.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="q">
            Search action, record id or person
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="e.g. publish, reports-fixed, name@email.com" className={input} />
        </div>
        <button className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Filter</button>
      </form>

      <p className="text-sm text-muted">
        {total} entr{total === 1 ? "y" : "ies"}
        {pages > 1 && ` · page ${page} of ${pages}`}
      </p>

      {rows.length === 0 ? (
        <p className={`${panel} text-sm text-muted`}>No matching entries.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => {
            const href = auditEntityHref(r.entity, r.entityId);
            return (
              <li key={r.id} className={`${panel} space-y-1 text-sm`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-surface-muted px-2 py-0.5 text-xs text-muted">{when(r.at)}</span>
                  <span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">{r.entity}</span>
                  <span className="font-semibold">{r.action}</span>
                  {href ? (
                    <Link href={href} className="font-mono text-xs text-primary hover:underline">
                      {r.entityId}
                    </Link>
                  ) : (
                    <span className="font-mono text-xs text-muted">{r.entityId}</span>
                  )}
                </div>
                <p className="text-xs text-muted">by {r.actor ?? "system / script"}</p>
                {r.diff !== null && (
                  <details className="text-xs text-muted">
                    <summary className="cursor-pointer">Details</summary>
                    <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-surface-muted p-3">{JSON.stringify(r.diff, null, 2)}</pre>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {pages > 1 && (
        <nav className="flex items-center justify-between text-sm" aria-label="Pagination">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="font-medium text-primary hover:underline">
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          {page < pages && (
            <Link href={pageHref(page + 1)} className="font-medium text-primary hover:underline">
              Older →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
