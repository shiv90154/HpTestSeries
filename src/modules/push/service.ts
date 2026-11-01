import "server-only";
import webpush from "web-push";
import { db } from "@/lib/db";
import { business } from "@/lib/business";
import { logError } from "@/lib/logger";
import { OFFERS_ALLOWED_WHERE } from "@/modules/email/rules";
import {
  campaignSchema,
  chunk,
  isGoneStatus,
  MAX_FAILURES,
  payloadJson,
  type PushPayload,
  type PushSubscriptionInput,
} from "./rules";

// Web push to students' phones and browsers. Subscriptions are saved by /api/push/subscribe; admins write campaigns in
// /admin/push; the daily cron (src/app/api/cron/emails) sends "access ending" reminders. Needs VAPID_PUBLIC_KEY and
// VAPID_PRIVATE_KEY in the server env (generate with `npx web-push generate-vapid-keys`); without them nothing is sent.

const DAY = 24 * 60 * 60 * 1000;
/** Parallel sends per batch: enough to be quick, small enough not to exhaust sockets or the push services' rate limits. */
const BATCH = 40;

type Fail = { ok: false; errors: string[] };

let configured: boolean | undefined;

/** True when VAPID keys are set. Registers them with web-push the first time. */
export function pushConfigured(): boolean {
  if (configured !== undefined) return configured;
  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return (configured = false);
  try {
    webpush.setVapidDetails(process.env.VAPID_SUBJECT || `mailto:${business.email}`, pub, priv);
    return (configured = true);
  } catch (err) {
    void logError(err, { path: "push: invalid VAPID keys" });
    return (configured = false);
  }
}

export const vapidPublicKey = () => (pushConfigured() ? (process.env.VAPID_PUBLIC_KEY ?? null) : null);

type Target = { id: string; endpoint: string; p256dh: string; auth: string };
type Outcome = "sent" | "gone" | "failed";

async function sendOne(sub: Target, payload: PushPayload): Promise<Outcome> {
  try {
    await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payloadJson(payload), {
      TTL: 2 * DAY / 1000, // a phone that is off for two days still gets it; later it would be stale news
      urgency: "normal",
    });
    return "sent";
  } catch (err) {
    const status = (err as { statusCode?: number }).statusCode;
    return isGoneStatus(status) ? "gone" : "failed";
  }
}

/** Sends one payload to many devices, then forgets devices that are gone and counts failures on the rest. */
export async function sendToDevices(subs: Target[], payload: PushPayload): Promise<{ sent: number; failed: number; removed: number; sentIds: string[] }> {
  if (!pushConfigured() || !subs.length) return { sent: 0, failed: subs.length, removed: 0, sentIds: [] };
  const sentIds: string[] = [];
  const goneIds: string[] = [];
  const failedIds: string[] = [];
  for (const group of chunk(subs, BATCH)) {
    const results = await Promise.all(group.map(async (s) => [s.id, await sendOne(s, payload)] as const));
    for (const [id, outcome] of results) (outcome === "sent" ? sentIds : outcome === "gone" ? goneIds : failedIds).push(id);
  }
  if (sentIds.length) await db.pushSubscription.updateMany({ where: { id: { in: sentIds } }, data: { failures: 0 } });
  if (goneIds.length) await db.pushSubscription.deleteMany({ where: { id: { in: goneIds } } });
  if (failedIds.length) {
    await db.pushSubscription.updateMany({ where: { id: { in: failedIds } }, data: { failures: { increment: 1 } } });
    await db.pushSubscription.deleteMany({ where: { id: { in: failedIds }, failures: { gte: MAX_FAILURES } } });
  }
  return { sent: sentIds.length, failed: failedIds.length, removed: goneIds.length, sentIds };
}

// ───────────── Subscriptions ─────────────

/** Saves or refreshes a device. A signed-in student's device is tied to them; a device is never untied by a signed-out visit. */
export async function saveSubscription(input: { subscription: PushSubscriptionInput; userId: string | null; site: string; userAgent: string | null }) {
  const { subscription: s, userId, site } = input;
  const data = { p256dh: s.keys.p256dh, auth: s.keys.auth, site, userAgent: input.userAgent?.slice(0, 200) ?? null, failures: 0, lastSeenAt: new Date(), ...(userId && { userId }) };
  const existing = await db.pushSubscription.findUnique({ where: { endpoint: s.endpoint }, select: { id: true } });
  if (existing) {
    await db.pushSubscription.update({ where: { id: existing.id }, data });
    return { created: false };
  }
  const row = await db.pushSubscription.create({ data: { endpoint: s.endpoint, ...data }, select: { id: true, endpoint: true, p256dh: true, auth: true } });
  // Confirms that it works, and tells the student what to expect. Best effort.
  await sendToDevices([row], { title: "Notifications are on", body: "We will tell you about new mock tests and when your access is ending.", url: "/tests", tag: "welcome" }).catch(() => undefined);
  return { created: true };
}

export async function removeSubscription(endpoint: string): Promise<void> {
  await db.pushSubscription.deleteMany({ where: { endpoint } });
}

// ───────────── Campaigns (admin) ─────────────

function deviceWhere(site: string | null, examId: string | null) {
  return {
    ...(site && { site }),
    ...(examId && {
      user: {
        // Same people the email campaigns reach for this exam, minus the offers opt-out: it is the student's "do not promote to me" switch.
        AND: [
          OFFERS_ALLOWED_WHERE,
          {
            OR: [
              { attempts: { some: { test: { examId } } } },
              { entitlements: { some: { revokedAt: null, product: { items: { some: { series: { examId } } } } } } },
            ],
          },
        ],
      },
    }),
  };
}

export async function countDevices(site: string | null, examId: string | null): Promise<number> {
  return db.pushSubscription.count({ where: deviceWhere(site === "all" ? null : site, examId) });
}

/** Saves the campaign and starts sending it in the background (the admin screen shows progress as it counts up). */
export async function startCampaign(raw: unknown, actorId: string): Promise<{ ok: true; id: string; targeted: number } | Fail> {
  if (!pushConfigured()) return { ok: false, errors: ["Push is not set up on this server (VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY)."] };
  const v = campaignSchema.safeParse(raw);
  if (!v.success) return { ok: false, errors: v.error.issues.map((i) => i.message) };
  const site = v.data.site === "all" ? null : v.data.site;
  const targeted = await countDevices(site, v.data.examId);
  if (!targeted) return { ok: false, errors: ["Nobody in this audience has turned on notifications yet."] };
  const campaign = await db.pushCampaign.create({
    data: { title: v.data.title, body: v.data.body, url: v.data.url, site, examId: v.data.examId, createdById: actorId, targeted },
    select: { id: true },
  });
  await db.auditLog.create({ data: { actorId, entity: "push-campaign", entityId: campaign.id, action: `send to ${targeted}` } });
  // Not awaited: the server keeps running after the response, and a long list should not hold the admin's request open.
  void runCampaign(campaign.id).catch((err) => logError(err, { path: `push campaign ${campaign.id}` }));
  return { ok: true, id: campaign.id, targeted };
}

async function runCampaign(id: string): Promise<void> {
  const c = await db.pushCampaign.findUnique({ where: { id } });
  if (!c) return;
  const payload: PushPayload = { title: c.title, body: c.body, url: c.url, tag: `campaign-${c.id}` };
  const where = deviceWhere(c.site, c.examId);
  let cursor: string | undefined;
  for (;;) {
    const page = await db.pushSubscription.findMany({
      where,
      orderBy: { id: "asc" },
      take: 500,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });
    if (!page.length) break;
    cursor = page[page.length - 1].id;
    const r = await sendToDevices(page, payload);
    await db.pushCampaign.update({ where: { id }, data: { sent: { increment: r.sent }, failed: { increment: r.failed + r.removed } } });
  }
  await db.pushCampaign.update({ where: { id }, data: { finishedAt: new Date() } });
}

/** A test to the admin's own devices only, before sending to students. */
export async function sendTestToAdmin(raw: unknown, adminId: string): Promise<{ ok: true; devices: number; sent: number } | Fail> {
  if (!pushConfigured()) return { ok: false, errors: ["Push is not set up on this server (VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY)."] };
  const v = campaignSchema.safeParse(raw);
  if (!v.success) return { ok: false, errors: v.error.issues.map((i) => i.message) };
  const mine = await db.pushSubscription.findMany({ where: { userId: adminId }, select: { id: true, endpoint: true, p256dh: true, auth: true } });
  if (!mine.length) return { ok: false, errors: ["Turn on notifications on your own account first (Profile page), then try again."] };
  const r = await sendToDevices(mine, { title: v.data.title, body: v.data.body, url: v.data.url, tag: "test" });
  return { ok: true, devices: mine.length, sent: r.sent };
}

export async function getPushPanel() {
  const [bySite, signedIn, total, campaigns, exams] = await Promise.all([
    db.pushSubscription.groupBy({ by: ["site"], _count: { _all: true } }),
    db.pushSubscription.count({ where: { userId: { not: null } } }),
    db.pushSubscription.count(),
    db.pushCampaign.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { createdBy: { select: { name: true } } } }),
    db.exam.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  return { configured: pushConfigured(), total, signedIn, bySite: Object.fromEntries(bySite.map((r) => [r.site, r._count._all])), campaigns, exams };
}

// ───────────── Automatic reminders ─────────────

/**
 * "Your access ends soon" pushes: devices of students whose access ends within 3 days and who have not renewed. One push
 * per device per entitlement (PushLog), and nothing for students who switched purchase reminders off.
 */
export async function runPushReminders(now = new Date()): Promise<{ expiry: number }> {
  if (!pushConfigured()) return { expiry: 0 };
  const ending = await db.entitlement.findMany({
    where: { revokedAt: null, expiresAt: { gt: now, lte: new Date(now.getTime() + 3 * DAY) }, user: { emailReminders: true, pushSubscriptions: { some: {} } } },
    select: {
      id: true,
      userId: true,
      productId: true,
      expiresAt: true,
      product: { select: { title: true, slug: true, isActive: true } },
      user: { select: { pushSubscriptions: { select: { id: true, endpoint: true, p256dh: true, auth: true } } } },
    },
  });
  if (!ending.length) return { expiry: 0 };

  const renewedRows = await db.entitlement.findMany({
    where: { revokedAt: null, userId: { in: ending.map((e) => e.userId) }, expiresAt: { gt: new Date(now.getTime() + 3 * DAY) } },
    select: { userId: true, productId: true },
  });
  const renewed = new Set(renewedRows.map((e) => `${e.userId}:${e.productId}`));
  const due = ending.filter((e) => !renewed.has(`${e.userId}:${e.productId}`));
  if (!due.length) return { expiry: 0 };

  const already = await db.pushLog.findMany({
    where: { kind: "expiry", refKey: { in: due.map((e) => e.id) } },
    select: { subscriptionId: true, refKey: true },
  });
  const done = new Set(already.map((l) => `${l.subscriptionId}:${l.refKey}`));

  let sent = 0;
  for (const e of due) {
    const devices = e.user.pushSubscriptions.filter((s) => !done.has(`${s.id}:${e.id}`));
    if (!devices.length) continue;
    const [title] = e.product.title.split(/\s+[—–]\s+/);
    const days = Math.max(1, Math.ceil((e.expiresAt.getTime() - now.getTime()) / DAY));
    const r = await sendToDevices(devices, {
      title: `${title} access ends in ${days} ${days === 1 ? "day" : "days"}`,
      body: "Renew now and the new period starts after this one ends, so you lose no days.",
      url: e.product.isActive ? `/buy/${e.product.slug}` : "/pricing",
      tag: `expiry-${e.id}`,
    });
    if (r.sentIds.length) await db.pushLog.createMany({ data: r.sentIds.map((subscriptionId) => ({ subscriptionId, kind: "expiry", refKey: e.id })), skipDuplicates: true });
    sent += r.sent;
  }
  return { expiry: sent };
}
