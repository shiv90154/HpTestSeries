"use client";

import { LayoutGrid, NotebookPen, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/tests", icon: NotebookPen, label: "Tests" },
  { href: "/exams", icon: ShieldCheck, label: "Exams" },
] as const;

/** Fixed bottom tab bar for mobile — easier thumb-reach than a scrolling top nav strip. */
export function BottomNav({ showAdmin }: { showAdmin: boolean }) {
  const pathname = usePathname();
  const items = showAdmin ? [...tabs, { href: "/admin", icon: User, label: "Admin" }] : tabs;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${active ? "text-primary" : "text-muted"}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
