"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, type ReactNode } from "react";
import { getSite, PRIMARY_SITE } from ".";
import type { SiteCode, SiteConfig } from "./types";

const SiteContext = createContext<SiteConfig>(PRIMARY_SITE);

/** Set once in the root layout; only the code crosses to the client, the config is looked up here. */
export function SiteProvider({ code, children }: { code: SiteCode; children: ReactNode }) {
  return <SiteContext.Provider value={getSite(code)}>{children}</SiteContext.Provider>;
}

/** The current site in Client Components. */
export function useSite(): SiteConfig {
  return useContext(SiteContext);
}

/**
 * usePathname() without the internal /{site} segment. A prerendered page sees its rewritten path ("/hp/exams")
 * on the server but the browser path ("/exams") on the client; stripping the prefix makes both agree.
 */
export function useSitePathname(): string {
  const pathname = usePathname();
  const { code } = useSite();
  if (pathname === `/${code}`) return "/";
  return pathname.startsWith(`/${code}/`) ? pathname.slice(code.length + 1) : pathname;
}
