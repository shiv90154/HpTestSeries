import "server-only";
import { headers } from "next/headers";
import { site as siteParam } from "next/root-params";
import { getSite, siteFromHost } from ".";
import type { SiteConfig } from "./types";

/**
 * The site being rendered, in any Server Component under app/[site] (pages, layouts, metadata). Reads the
 * [site] root segment that src/proxy.ts rewrites to, so pages stay static per site.
 */
export async function currentSite(): Promise<SiteConfig> {
  return getSite(await siteParam());
}

/** The site a Server Action or Route Handler was called on (root params are not available there). */
export async function requestSite(): Promise<SiteConfig> {
  return siteFromHost((await headers()).get("host"));
}
