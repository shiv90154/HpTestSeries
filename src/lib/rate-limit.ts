import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "./db";

/**
 * Fixed-window counter stored in the shared "rateLimit" table (same table Better Auth uses;
 * callers must prefix keys so they never collide with Better Auth's own keys).
 * Atomic via a single upsert, so it is safe across serverless instances.
 * Returns true if the call is allowed.
 */
export async function consumeRateLimit(key: string, windowSec: number, max: number): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - windowSec * 1000;

  const rows = await db.$queryRaw<{ count: number }[]>`
    INSERT INTO "rateLimit" ("id", "key", "count", "lastRequest")
    VALUES (${randomUUID()}, ${key}, 1, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "rateLimit"."lastRequest" < ${windowStart} THEN 1 ELSE "rateLimit"."count" + 1 END,
      "lastRequest" = CASE WHEN "rateLimit"."lastRequest" < ${windowStart} THEN ${now} ELSE "rateLimit"."lastRequest" END
    RETURNING "count"`;

  return Number(rows[0]?.count ?? 0) <= max;
}
