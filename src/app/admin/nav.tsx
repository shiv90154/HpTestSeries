"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, ClipboardList, Flag, GraduationCap, HelpCircle, LayoutDashboard, Mail, Newspaper, Package, ScrollText, ShieldAlert, ShieldCheck, ShoppingCart, Ticket, Users, type LucideIcon } from "lucide-react";

export type AdminNavIconKey = "overview" | "questions" | "tests" | "exams" | "blog" | "reports" | "products" | "orders" | "attempts" | "audit" | "errors" | "coupons" | "emails" | "users" | "security";

const ICONS: Record<AdminNavIconKey, LucideIcon> = {
  overview: LayoutDashboard,
  questions: HelpCircle,
  tests: ClipboardList,
  exams: GraduationCap,
  blog: Newspaper,
  reports: Flag,
  products: Package,
  orders: ShoppingCart,
  attempts: ShieldAlert,
  audit: ScrollText,
  errors: AlertTriangle,
  coupons: Ticket,
  emails: Mail,
  users: Users,
  security: ShieldCheck,
};

export type AdminNavItem = {
  href: string;
  label: string;
  icon: AdminNavIconKey;
  show: boolean;
};

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav({ items }: { items: AdminNavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin navigation" className="space-y-1">
      {items
        .filter((i) => i.show)
        .map(({ href, label, icon }) => {
          const active = isActive(pathname, href);
          const Icon = ICONS[icon];
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
    </nav>
  );
}

export function AdminMobileNav({ items }: { items: AdminNavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin sections" className="flex gap-1.5 overflow-x-auto px-3 pb-2.5">
      {items
        .filter((i) => i.show)
        .map(({ href, label, icon }) => {
          const active = isActive(pathname, href);
          const Icon = ICONS[icon];
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "bg-surface-muted text-muted"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          );
        })}
    </nav>
  );
}
