import { verifyUnsubscribeToken } from "@/modules/email/rules";
import { unsubscribe } from "@/modules/email/service";

// One-click unsubscribe (RFC 8058): Gmail and others POST here from the List-Unsubscribe header without opening a page.
export async function POST(request: Request) {
  const q = new URL(request.url).searchParams;
  const userId = q.get("u") ?? "";
  const category = q.get("c") ?? "";
  if (!verifyUnsubscribeToken(process.env.BETTER_AUTH_SECRET ?? "", userId, category, q.get("t") ?? "")) return new Response(null, { status: 400 });
  await unsubscribe(userId, category);
  return new Response(null, { status: 204 });
}

// A plain visit (some mail apps open the header link) goes to the confirmation page instead of changing anything.
export function GET(request: Request) {
  const url = new URL(request.url);
  return Response.redirect(new URL(`/unsubscribe${url.search}`, url), 303);
}
