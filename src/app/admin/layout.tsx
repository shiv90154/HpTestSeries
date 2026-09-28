import type { Metadata } from "next";
import { countOpenReports } from "@/modules/content/report-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { site } from "@/lib/site";
import { AdminMobileNav, AdminSidebarNav, type AdminNavItem } from "./nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  // Layout guard covers rendering; every admin server action must call requirePermission itself too.
  const user = await requirePermission("admin:access", "/admin");

  const openReports = can(user.role, "content:edit") ? await countOpenReports() : 0;

  const nav: AdminNavItem[] = [
    { href: "/admin", label: "Overview", icon: "overview", show: true },
    { href: "/admin/questions", label: "Questions", icon: "questions", show: can(user.role, "content:edit") },
    { href: "/admin/tests", label: "Tests", icon: "tests", show: can(user.role, "content:edit") },
    { href: "/admin/exams", label: "Exams", icon: "exams", show: can(user.role, "content:edit") },
    { href: "/admin/blog", label: "Blog", icon: "blog", show: can(user.role, "content:edit") },
    { href: "/admin/reports", label: openReports ? `Reports (${openReports})` : "Reports", icon: "reports", show: can(user.role, "content:edit") },
    { href: "/admin/products", label: "Products", icon: "products", show: can(user.role, "commerce:manage") },
    { href: "/admin/orders", label: "Orders", icon: "orders", show: can(user.role, "commerce:manage") },
    { href: "/admin/attempts", label: "Flagged attempts", icon: "attempts", show: can(user.role, "users:manage") },
    { href: "/admin/audit", label: "Audit log", icon: "audit", show: can(user.role, "audit:view") },
    { href: "/admin/errors", label: "Errors", icon: "errors", show: can(user.role, "users:manage") },
  ];

  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-1 flex-col md:flex-row">
      <aside aria-label="Admin sidebar" className="hidden shrink-0 border-r border-border bg-surface md:flex md:w-64 md:flex-col">
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {initials}
          </span>
          <div className="min-w-0 leading-tight">
            <div className="font-semibold">Admin</div>
            <div className="truncate text-xs text-muted">{site.name}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <AdminSidebarNav items={nav} />
        </div>
        <div className="border-t border-border px-4 py-3 text-xs">
          <div className="truncate font-medium text-foreground">{user.name}</div>
          <div className="truncate text-muted">{user.role}</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-surface md:hidden">
          <div className="flex items-center gap-2.5 px-4 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              {initials}
            </span>
            <span className="font-semibold">Admin</span>
            <span className="ml-auto truncate text-xs text-muted">{user.name}</span>
          </div>
          <AdminMobileNav items={nav} />
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
