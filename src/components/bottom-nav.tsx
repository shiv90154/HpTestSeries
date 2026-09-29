"use client";

import { LayoutDashboard, LayoutGrid, Newspaper, NotebookPen, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { href: string; icon: LucideIcon; label: string; desktopLabel?: string; also?: string[] };

const DASHBOARD: Tab = { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", also: ["/results"] };
const TESTS: Tab = { href: "/tests", icon: NotebookPen, label: "Tests", desktopLabel: "Mock Tests" };
const EXAMS: Tab = { href: "/exams", icon: LayoutGrid, label: "Exams" };
const UPDATES: Tab = { href: "/blog", icon: Newspaper, label: "Updates", desktopLabel: "Exam Updates" };
const PROFILE: Tab = { href: "/profile", icon: UserRound, label: "Profile" };
const ADMIN: Tab = { href: "/admin", icon: ShieldCheck, label: "Admin" };

function isActive(pathname: string, tab: Tab): boolean {
  return [tab.href, ...(tab.also ?? [])].some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Header links for logged-in pages on tablets and desktops (phones use BottomNav). */
export function AppDesktopNav({ showAdmin }: { showAdmin: boolean }) {
  const pathname = usePathname();
  const tabs = showAdmin ? [DASHBOARD, TESTS, EXAMS, UPDATES, ADMIN] : [DASHBOARD, TESTS, EXAMS, UPDATES];
  return (
    <nav aria-label="Main" className="hidden gap-5 text-sm font-medium text-muted md:flex">
      {tabs.map((t) => {
        const active = isActive(pathname, t);
        return (
          <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined} className={active ? "text-primary" : "hover:text-primary"}>
            {t.desktopLabel ?? t.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Fixed bottom tab bar for mobile — easier thumb-reach than a scrolling top nav strip. */
export function BottomNav({ showAdmin }: { showAdmin: boolean }) {
  const pathname = usePathname();
  // Five tabs at most (a sixth squeezes "Dashboard" past its 60px column on a 360px phone): staff get Admin
  // in place of Exam Updates.
  const items = showAdmin ? [DASHBOARD, TESTS, EXAMS, PROFILE, ADMIN] : [DASHBOARD, TESTS, EXAMS, UPDATES, PROFILE];

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((t) => {
        const active = isActive(pathname, t);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${active ? "text-primary" : "text-muted"}`}
            aria-current={active ? "page" : undefined}
          >
            <t.icon className="size-5" strokeWidth={active ? 2.4 : 2} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
