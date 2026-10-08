import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { requirePermission } from "@/modules/identity/session";
import { USERS_PAGE_SIZE, listUsers } from "@/modules/identity/user-service";
import { Table } from "../table";
import { input as inputCls } from "../ui";

export const metadata: Metadata = { title: "Users" };

export default async function UsersAdminPage({ searchParams }: PageProps<"/admin/users">) {
  await requirePermission("users:manage");
  await connection();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const page = Math.max(1, Math.floor(Number(typeof sp.page === "string" ? sp.page : 1)) || 1);
  const { rows: users, total } = await listUsers(q, page);
  const pages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE));
  const pageHref = (p: number) => `/admin/users?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Users</h1>
      <form className="flex gap-2">
        <input name="q" defaultValue={q} placeholder="Search by email, name or phone" className={`${inputCls} max-w-md`} />
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Search</button>
      </form>
      <p className="text-sm text-muted">{total} {q ? "matching " : ""}users</p>
      <Table
          caption="Users"
          rows={users}
          rowKey={(u) => u.id}
          emptyMessage="No matching users."
          columns={[
            {
              header: "Name",
              render: (u) => (
                <Link href={`/admin/users/${u.id}`} className="font-medium text-primary hover:underline">
                  {u.name}
                </Link>
              ),
            },
            { header: "Email", render: (u) => u.email, cellClassName: "text-muted" },
            { header: "Phone", render: (u) => u.phoneNumber ?? "—", cellClassName: "text-muted" },
            { header: "Role", render: (u) => u.role.toLowerCase() },
            { header: "Joined", render: (u) => u.createdAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }), cellClassName: "text-muted" },
          ]}
        />
      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center gap-3 text-sm">
          {page > 1 ? <Link href={pageHref(page - 1)} className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface">Previous</Link> : <span className="px-3 py-1.5 text-muted">Previous</span>}
          <span className="text-muted">Page {page} of {pages}</span>
          {page < pages ? <Link href={pageHref(page + 1)} className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface">Next</Link> : <span className="px-3 py-1.5 text-muted">Next</span>}
        </nav>
      )}
    </div>
  );
}
