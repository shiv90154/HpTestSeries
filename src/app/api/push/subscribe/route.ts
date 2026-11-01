import { consumeRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/modules/identity/session";
import { subscriptionSchema } from "@/modules/push/rules";
import { pushConfigured, saveSubscription } from "@/modules/push/service";
import { siteFromHost } from "@/sites";

// Called by the browser after the student allows notifications, and once per visit afterwards to refresh the device
// (and tie it to the account after a login). The site is taken from the Host header, never from the body.
export async function POST(request: Request) {
  if (!pushConfigured()) return Response.json({ error: "Notifications are not set up yet." }, { status: 503 });
  const ip = request.headers.get("x-real-ip") ?? "unknown";
  if (!(await consumeRateLimit(`push-sub:${ip}`, 10 * 60, 30))) return Response.json({ error: "Too many requests." }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = subscriptionSchema.safeParse(body?.subscription);
  if (!parsed.success) return Response.json({ error: "Invalid subscription." }, { status: 400 });

  const user = await getCurrentUser().catch(() => null);
  const result = await saveSubscription({
    subscription: parsed.data,
    userId: user?.id ?? null,
    site: siteFromHost(request.headers.get("host")).code,
    userAgent: request.headers.get("user-agent"),
  });
  return Response.json({ ok: true, created: result.created });
}
