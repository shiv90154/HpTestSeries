import { isCronRequest } from "@/lib/cron-auth";
import { reconcilePendingOrders } from "@/modules/commerce/orders";

// Called by the server's crontab (see deploy/README in deploy.sh): every 15 minutes
//   curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://hptestseries.in/api/cron/reconcile
export async function POST(request: Request) {
  if (!isCronRequest(request)) return new Response(null, { status: 401 });
  return Response.json(await reconcilePendingOrders());
}
