import { getMyTestResults } from "@/modules/analytics/history";
import { getCurrentUser } from "@/modules/identity/session";

/** The signed-in student's results on one test (?test=slug) for the cached test page; null when logged out or none. Never cached. */
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("test");
  const user = slug ? await getCurrentUser() : null;
  const results = user && slug ? await getMyTestResults(user.id, slug) : null;
  return Response.json({ results }, { headers: { "Cache-Control": "private, no-store" } });
}
