import "server-only";
import { timingSafeEqual } from "node:crypto";

/** True when the request carries `Authorization: Bearer $CRON_SECRET` (compared in constant time). */
export function isCronRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const a = Buffer.from(secret ?? "");
  const b = Buffer.from(given);
  return !!secret && a.length === b.length && timingSafeEqual(a, b);
}
