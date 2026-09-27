import type { Metadata } from "next";
import Link from "next/link";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  // Layout guard covers rendering; every admin server action must call requirePermission itself too.
  const user = await requirePermission("admin:access", "/admin");

  const nav = [
    { href: "/admin", label: "Overview", show: true },
    { href: "/admin/questions", label: "Questions", show: can(user.role, "content:edit") },
    { href: "/admin/tests", label: "Tests", show: can(user.role, "content:edit") },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3">
          <span className="font-semibold">Admin</span>
          <nav className="flex gap-4 text-sm">
            {nav
              .filter((n) => n.show)
              .map((n) => (
                <Link key={n.href} href={n.href} className="whitespace-nowrap text-muted hover:text-foreground">
                  {n.label}
                </Link>
              ))}
          </nav>
          <span className="ml-auto whitespace-nowrap text-xs text-muted">
            {user.name} · {user.role}
          </span>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</div>
    </div>
  );
}
