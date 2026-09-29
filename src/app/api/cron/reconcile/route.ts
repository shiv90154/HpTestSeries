import { timingSafeEqual } from "node:crypto";
import { reconcilePendingOrders } from "@/modules/commerce/orders";

// Called by the server's crontab (see deploy/README in deploy.sh): every 15 minutes
//   curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://hptestseries.in/api/cron/reconcile
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const a = Buffer.from(secret ?? "");
  const b = Buffer.from(given);
  if (!secret || a.length !== b.length || !timingSafeEqual(a, b)) return new Response(null, { status: 401 });
  return Response.json(await reconcilePendingOrders());
}
