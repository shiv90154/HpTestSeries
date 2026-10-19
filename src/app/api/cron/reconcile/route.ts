import { isCronRequest } from "@/lib/cron-auth";
import { reconcilePendingOrders } from "@/modules/commerce/orders";
import { remindUnpaidCheckouts } from "@/modules/email/service";

// Called by the server's crontab (see deploy/README in deploy.sh): every 15 minutes
//   curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://hptestseries.in/api/cron/reconcile
export async function POST(request: Request) {
  if (!isCronRequest(request)) return new Response(null, { status: 401 });
  const reconciled = await reconcilePendingOrders();
  // After reconciling, so an order that was in fact paid is never sent a "finish your payment" email.
  return Response.json({ ...reconciled, reminders: await remindUnpaidCheckouts() });
}
