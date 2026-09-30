import { getAccessibleTestSlugs } from "@/modules/commerce/purchases";
import { getCurrentUser } from "@/modules/identity/session";

/** Which paid tests the signed-in student has unlocked; an empty list when logged out. Never cached. */
export async function GET() {
  const user = await getCurrentUser();
  const tests = user ? await getAccessibleTestSlugs(user.id) : [];
  return Response.json({ tests }, { headers: { "Cache-Control": "private, no-store" } });
}
