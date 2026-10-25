import type { SiteCode } from "./types";

const GA_ID = /^G-[A-Z0-9]+$/;

/**
 * The site's GA4 measurement ID from GA_ID_<CODE> (GA_ID_HP, GA_ID_PB, …), or undefined when unset or malformed.
 * hptestseries.in also accepts the older single NEXT_PUBLIC_GA_ID. Server-only: read at render, not baked into JS.
 */
export function gaIdFor(code: SiteCode, env: Record<string, string | undefined> = process.env): string | undefined {
  const id = (env[`GA_ID_${code.toUpperCase()}`] ?? (code === "hp" ? env.NEXT_PUBLIC_GA_ID : undefined))?.trim();
  return id && GA_ID.test(id) ? id : undefined;
}
