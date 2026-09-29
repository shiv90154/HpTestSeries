import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { requirePermission } from "@/modules/identity/session";
import { searchUsers } from "@/modules/identity/user-service";
import { Table } from "../table";
import { input as inputCls } from "../ui";

export const metadata: Metadata = { title: "Users" };

export default async function UsersAdminPage({ searchParams }: PageProps<"/admin/users">) {
  await requirePermission("users:manage");
  await connection();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const users = q ? await searchUsers(q) : [];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Users</h1>
      <form className="flex gap-2">
        <input name="q" defaultValue={q} placeholder="Search by email, name or phone" className={`${inputCls} max-w-md`} autoFocus />
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Search</button>
      </form>
      {q && (
        <Table
          caption="Users"
          rows={users}
          rowKey={(u) => u.id}
          emptyMessage={q.trim().length < 2 ? "Type at least 2 characters." : "No matching users."}
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
      )}
    </div>
  );
}
