// Site registry: the one place a state is defined. Safe to import anywhere (client, server, proxy).

import { hp } from "./hp";
import { pb } from "./pb";
import { rj } from "./rj";
import { SITE_CODES, type SiteCode, type SiteConfig } from "./types";

export type { SiteCode, SiteConfig } from "./types";
export { SITE_CODES } from "./types";

export const SITES: Record<SiteCode, SiteConfig> = { hp, pb, rj };

/** Owns /admin, the canonical copy of national-exam pages, and any host we don't recognise. */
export const PRIMARY_SITE = hp;

export function isSiteCode(code: string | undefined | null): code is SiteCode {
  return !!code && (SITE_CODES as readonly string[]).includes(code);
}

export function getSite(code: string | undefined | null): SiteConfig {
  return isSiteCode(code) ? SITES[code] : PRIMARY_SITE;
}

/**
 * "www.pbtestseries.in" → pb. Local dev: "pb.localhost:3000" → pb (Chrome resolves *.localhost to 127.0.0.1).
 * Unknown hosts get the primary site.
 */
export function siteFromHost(host: string | null | undefined): SiteConfig {
  const name = (host ?? "").trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  for (const s of Object.values(SITES)) {
    if (s.domains.includes(name) || name === `${s.code}.localhost`) return s;
  }
  return PRIMARY_SITE;
}

/** The site a user's emails come from: where they last logged in, else where they signed up. */
export const userSite = (u: { lastSite?: string | null; signupSite: string }) => getSite(u.lastSite ?? u.signupSite);

/** Free no-login mock link for a site. */
export const freeMockHref = (s: SiteConfig) => `/tests/${s.freeMockSlug}`;

/**
 * Canonical URL for a page about a body shown on several sites: a relative path on the site that owns the canonical
 * copy (so the page's own metadataBase applies), an absolute URL on the other sites. See catalog/visibility.ts.
 */
export function canonicalFor(current: SiteConfig, canonicalSite: string, path: string): string {
  return canonicalSite === current.code ? path : `${getSite(canonicalSite).url}${path}`;
}

/** generateStaticParams for the [site] segment: every site, launched or not (soft launch is noindex, not absent). */
export const siteStaticParams = () => SITE_CODES.map((site) => ({ site }));
