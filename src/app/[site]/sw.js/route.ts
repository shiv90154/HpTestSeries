import { siteStaticParams } from "@/sites";

// The service worker, served at /sw.js on every site (src/proxy.ts maps the host to the [site] segment).
//
// It does three things and deliberately nothing else:
//  1. Shows push notifications and opens the right page when one is tapped.
//  2. Keeps the hashed build files (/_next/static/*, never changing for a given URL) so repeat visits load faster.
//  3. Shows a friendly "You are offline" page when a page cannot be fetched.
// It never caches HTML, API calls or anything signed-in, so a student can never be pinned to an old version of a page,
// and a new deploy is seen at once. Taking over silently is safe because it changes nothing a student can see; the page
// itself only updates when the student taps "Update now" (src/components/pwa), never in the middle of a test.
//
// The version below changes with every deploy, which is what makes the browser notice a new worker.
export const dynamic = "force-static";
export const generateStaticParams = siteStaticParams;

// String.raw keeps the backslashes of the regular expressions below exactly as written.
const WORKER = String.raw`
const VERSION = ${JSON.stringify(process.env.NEXT_PUBLIC_APP_VERSION ?? "dev")};
const STATIC_CACHE = "static-files";
const PAGE_CACHE = "offline-page";
const OFFLINE_URL = "/offline";
const MAX_STATIC_ENTRIES = 200;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      try {
        // Keep the offline page and the few files it needs, so it looks right with no connection.
        const res = await fetch(OFFLINE_URL, { cache: "reload" });
        if (!res.ok) return;
        const html = await res.clone().text();
        const pages = await caches.open(PAGE_CACHE);
        await pages.put(OFFLINE_URL, res);
        const files = await caches.open(STATIC_CACHE);
        const urls = [...new Set(html.match(/\/_next\/static\/[^"'\s\\)]+/g) || [])];
        await Promise.all(urls.map((u) => files.add(u).catch(() => undefined)));
      } catch (_) {
        // Installing without the offline page is fine; navigation then falls back to the browser's own offline screen.
      }
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_STATIC_ENTRIES; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Page loads always go to the network. Only when the network fails do we show the offline page.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(async () => (await caches.match(OFFLINE_URL)) || Response.error()),
    );
    return;
  }

  // Build files have a content hash in their URL, so a cached copy is never out of date.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) {
          await cache.put(req, res.clone());
          event.waitUntil(trim(cache));
        }
        return res;
      })(),
    );
  }
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = { body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "New update";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icons/192",
      tag: data.tag || undefined,
      renotify: false,
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Only ever open a page of this site, whatever the payload says.
  let target = new URL("/", self.location.origin);
  try {
    const wanted = new URL((event.notification.data && event.notification.data.url) || "/", self.location.origin);
    if (wanted.origin === self.location.origin) target = wanted;
  } catch (_) {}
  event.waitUntil(
    (async () => {
      const open = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of open) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          await client.focus();
          if ("navigate" in client) await client.navigate(target.href).catch(() => undefined);
          return;
        }
      }
      await self.clients.openWindow(target.href);
    })(),
  );
});

// The browser rotated the subscription (it does this now and then): subscribe again and tell the server.
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    (async () => {
      const key = (await (await fetch("/api/push/key")).json()).key;
      if (!key) return;
      const pad = "=".repeat((4 - (key.length % 4)) % 4);
      const raw = atob((key + pad).replace(/-/g, "+").replace(/_/g, "/"));
      const applicationServerKey = Uint8Array.from(raw, (c) => c.charCodeAt(0));
      const sub = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });
    })().catch(() => undefined),
  );
});
`;

export function GET() {
  return new Response(WORKER, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
