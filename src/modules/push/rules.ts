import { z } from "zod";

// Pure rules for web push (no database, no network), so they can be unit-tested. The sending lives in ./service.ts.

/** Limits keep a notification readable on a phone lock screen (Android cuts titles near 65 characters). */
export const TITLE_MAX = 65;
export const BODY_MAX = 180;

// Our server POSTs to the endpoint a browser gives us, and anyone can call the subscribe route, so only the real push
// services are accepted: Chrome/Edge/Opera/Samsung (FCM), Firefox, Safari and old Edge (Windows).
const PUSH_SERVICE_HOSTS = [/^fcm\.googleapis\.com$/, /^android\.googleapis\.com$/, /(^|\.)push\.services\.mozilla\.com$/, /(^|\.)push\.apple\.com$/, /(^|\.)notify\.windows\.com$/];

export function isPushServiceUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password && !u.port && PUSH_SERVICE_HOSTS.some((re) => re.test(u.hostname));
  } catch {
    return false;
  }
}

/** A subscription as the browser's PushSubscription.toJSON() gives it. */
export const subscriptionSchema = z.object({
  endpoint: z.string().max(1000).refine(isPushServiceUrl, "Unknown push service"),
  keys: z.object({ p256dh: z.string().min(20).max(200), auth: z.string().min(8).max(100) }),
});
export type PushSubscriptionInput = z.infer<typeof subscriptionSchema>;

/**
 * A link a notification opens: a path on the site ("/tests/x"). Absolute URLs and protocol-relative "//host" paths are
 * refused so a campaign can never send students to another site.
 */
export function isSitePath(url: string): boolean {
  return url.length <= 300 && /^\/(?!\/)[^\s\\]*$/.test(url);
}

export const campaignSchema = z.object({
  title: z.string().trim().min(1, "Write a title.").max(TITLE_MAX, `Title is at most ${TITLE_MAX} characters.`),
  body: z.string().trim().min(1, "Write a message.").max(BODY_MAX, `Message is at most ${BODY_MAX} characters.`),
  url: z.string().trim().refine(isSitePath, "The link must be a path on the site, like /tests/hp-police-full-mock-1."),
  site: z.enum(["hp", "pb", "rj", "hr", "all"]),
  examId: z.string().trim().max(60).optional().transform((v) => v || null),
});
export type CampaignInput = z.infer<typeof campaignSchema>;

/** What the service worker receives (public/sw route reads these keys). */
export type PushPayload = { title: string; body: string; url: string; tag?: string };

export function payloadJson(p: PushPayload): string {
  return JSON.stringify({ title: p.title, body: p.body, url: isSitePath(p.url) ? p.url : "/", tag: p.tag });
}

/** Devices with this many failed sends in a row are dropped. A 404/410 from the push service drops them at once. */
export const MAX_FAILURES = 5;

/** The push service says the subscription no longer exists (user cleared site data or revoked permission). */
export const isGoneStatus = (status: number | undefined) => status === 404 || status === 410;

/** Splits a list into groups of `size`, to send in small parallel batches. */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
