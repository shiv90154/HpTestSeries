"use client";

import { Home, LayoutGrid, NotebookPen, Play, UserRound } from "lucide-react";
import Link from "next/link";
import { useSite, useSitePathname } from "@/sites/provider";
import { freeMockHref } from "@/sites";
import { authClient } from "@/modules/identity/auth-client";
import { useUiLang } from "./ui-lang";

/** App-style tab bar for public pages on phones; the free mock sits in the middle as the main action. */
export function PublicBottomNav() {
  const site = useSite();
  const pathname = useSitePathname();
  const { data: session } = authClient.useSession();
  const pa = useUiLang() === "pa";

  const tabs = [
    { href: "/", icon: Home, label: pa ? "ਹੋਮ" : "Home" },
    { href: "/exams", icon: LayoutGrid, label: pa ? "ਪ੍ਰੀਖਿਆਵਾਂ" : "Exams" },
    null, // centre action
    { href: "/tests", icon: NotebookPen, label: pa ? "ਟੈਸਟ" : "Tests" },
    { href: session ? "/dashboard" : "/login", icon: UserRound, label: session ? (pa ? "ਖਾਤਾ" : "Account") : pa ? "ਲੌਗ ਇਨ" : "Login" },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,27,51,0.06)] backdrop-blur md:hidden"
    >
      {tabs.map((t) =>
        t ? (
          <Link
            key={t.href}
            href={t.href}
            aria-current={isActive(t.href) ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${isActive(t.href) ? "text-primary" : "text-muted"}`}
          >
            <t.icon className="size-5" strokeWidth={isActive(t.href) ? 2.4 : 2} />
            {t.label}
          </Link>
        ) : (
          <Link key="free" href={freeMockHref(site)} className="flex flex-col items-center justify-end gap-0.5 pb-2 text-[11px] font-semibold text-accent-ink">
            <span className="-mt-6 grid size-13 place-items-center rounded-full bg-accent text-[#1f1300] shadow-lg ring-4 ring-surface">
              <Play className="size-6 fill-current" />
            </span>
            {pa ? "ਮੁਫ਼ਤ ਮੌਕ" : "Free Mock"}
          </Link>
        ),
      )}
    </nav>
  );
}
