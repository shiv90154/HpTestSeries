import { consumeRateLimit } from "@/lib/rate-limit";
import { removeSubscription } from "@/modules/push/service";

// The device turned notifications off. The endpoint is a long random URL only that browser knows, so it doubles as the proof.
export async function POST(request: Request) {
  const ip = request.headers.get("x-real-ip") ?? "unknown";
  if (!(await consumeRateLimit(`push-unsub:${ip}`, 10 * 60, 30))) return Response.json({ error: "Too many requests." }, { status: 429 });
  const body = await request.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : "";
  if (!endpoint || endpoint.length > 1000) return Response.json({ error: "Invalid request." }, { status: 400 });
  await removeSubscription(endpoint);
  return Response.json({ ok: true });
}
