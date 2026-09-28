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
