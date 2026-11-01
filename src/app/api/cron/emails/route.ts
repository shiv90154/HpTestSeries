import { isCronRequest } from "@/lib/cron-auth";
import { runDailyEmails } from "@/modules/email/service";
import { runPushReminders } from "@/modules/push/service";

// Called once a day by the server's crontab at 7 pm IST (13:30 UTC):
//   30 13 * * * curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" https://hptestseries.in/api/cron/emails
export async function POST(request: Request) {
  if (!isCronRequest(request)) return new Response(null, { status: 401 });
  const emails = await runDailyEmails();
  // Same daily run: "access ending" notifications. A push problem must not hide the email result.
  const push = await runPushReminders().catch((err) => ({ error: err instanceof Error ? err.message : String(err) }));
  return Response.json({ ...emails, push });
}
