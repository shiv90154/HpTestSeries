import { urlBase64ToUint8Array } from "./rules";

// Browser side of web push: ask permission, subscribe through the service worker, and tell the server.

export type PushSupport = "ok" | "unsupported" | "needs-install";

/** iPhones only allow notifications for a site added to the Home Screen; other browsers need nothing special. */
export function pushSupport(opts: { ios: boolean; standalone: boolean }): PushSupport {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    return opts.ios && !opts.standalone ? "needs-install" : "unsupported";
  }
  return "ok";
}

async function post(path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function currentSubscription(): Promise<PushSubscription | null> {
  const reg = await navigator.serviceWorker.getRegistration();
  return reg ? reg.pushManager.getSubscription() : null;
}

export type EnableResult = "enabled" | "denied" | "dismissed" | "unavailable" | "failed";

/** Must run from a tap or click: browsers refuse to show the permission question otherwise. */
export async function enablePush(): Promise<EnableResult> {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "denied") return "denied";
    if (permission !== "granted") return "dismissed";
    const keyRes = await fetch("/api/push/key");
    if (!keyRes.ok) return "unavailable";
    const { key } = (await keyRes.json()) as { key: string };
    const reg = await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(key) }));
    return (await post("/api/push/subscribe", { subscription: sub.toJSON() })) ? "enabled" : "failed";
  } catch {
    return "failed";
  }
}

export async function disablePush(): Promise<void> {
  const sub = await currentSubscription();
  if (!sub) return;
  await post("/api/push/unsubscribe", { endpoint: sub.endpoint });
  await sub.unsubscribe().catch(() => false);
}

/** Once per visit: keeps the device fresh on the server and ties it to the account after a login. */
export async function syncPush(): Promise<void> {
  if (Notification.permission !== "granted") return;
  const sub = await currentSubscription();
  if (sub) await post("/api/push/subscribe", { subscription: sub.toJSON() });
}
