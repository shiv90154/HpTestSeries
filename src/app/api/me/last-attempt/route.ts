import { getLastAttempt } from "@/modules/assessment/service";
import { getCurrentUser } from "@/modules/identity/session";
import { requestSite } from "@/sites/current";

/** The signed-in student's most recent attempt on this site for the "continue" card on /tests; null when logged out. Never cached. */
export async function GET() {
  const user = await getCurrentUser();
  const last = user ? await getLastAttempt(user.id, (await requestSite()).code) : null;
  return Response.json({ last }, { headers: { "Cache-Control": "private, no-store" } });
}
