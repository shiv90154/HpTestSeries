import { vapidPublicKey } from "@/modules/push/service";

// The public VAPID key the browser needs to subscribe. Read at request time, so setting the key needs no rebuild.
export const dynamic = "force-dynamic";

export function GET() {
  const key = vapidPublicKey();
  if (!key) return Response.json({ error: "Notifications are not set up yet." }, { status: 503 });
  return Response.json({ key }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
