// Which tests students can see. A test is live once it is published AND its publish time has come —
// a future publishedAt is a scheduled release. Retired tests (ARCHIVED) are hidden but keep their results.

import type { Prisma } from "@/generated/prisma/client";

/** Prisma filter for tests students can see and start right now. */
export function liveTestWhere(now: Date = new Date()): Prisma.TestWhereInput {
  // publishedAt null = published before scheduling existed (or by a seed): live.
  return { status: "PUBLISHED", AND: [{ OR: [{ publishedAt: null }, { publishedAt: { lte: now } }] }] };
}

/** Tests whose result pages still open: live, scheduled, or retired after students took them. */
export const resultVisibleStatuses = ["PUBLISHED", "ARCHIVED"] as const;

export function isScheduled(status: string, publishedAt: Date | null, now: Date = new Date()): boolean {
  return status === "PUBLISHED" && !!publishedAt && publishedAt > now;
}

// ───────────────────────── Sites (docs/MULTI-SITE-PLAN.md) ─────────────────────────
// A body lists the sites that show it ("*" = national, every site). Exams, tests and series follow their body; a test
// with no exam (a state GK mock) carries its own site. A PASS belongs to one site and covers what that site shows.

/** The wildcard in ExamBody.sites for national bodies (UPSC, IAF, Delhi Police). */
export const ALL_SITES = "*";

export function bodyOnSite(site: string): Prisma.ExamBodyWhereInput {
  return { sites: { hasSome: [site, ALL_SITES] } };
}

export function examOnSite(site: string): Prisma.ExamWhereInput {
  return { body: bodyOnSite(site) };
}

export function testOnSite(site: string): Prisma.TestWhereInput {
  return { OR: [{ exam: examOnSite(site) }, { examId: null, site }] };
}

export function productOnSite(site: string): Prisma.ProductWhereInput {
  return { OR: [{ kind: "PASS", site }, { kind: { not: "PASS" }, items: { every: { series: { exam: examOnSite(site) } } } }] };
}

/** Whether a body with these sites is shown on `site`. */
export function bodyVisibleOn(bodySites: readonly string[], site: string): boolean {
  return bodySites.includes(ALL_SITES) || bodySites.includes(site);
}

/**
 * The site whose domain holds the canonical copy of a body's pages. National bodies and bodies the primary site shows
 * keep their canonical on the primary site (their traffic is there); any other body's canonical is its first site.
 */
export function canonicalSiteCode(bodySites: readonly string[], primary: string): string {
  if (bodySites.includes(ALL_SITES) || bodySites.includes(primary) || bodySites.length === 0) return primary;
  return bodySites[0];
}
