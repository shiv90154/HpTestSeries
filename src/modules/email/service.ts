import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import { rupees } from "@/lib/money";
import { getSite, PRIMARY_SITE, type SiteConfig } from "@/sites";
import { getBuyOptionForSeries } from "@/modules/commerce/product-service";
import { sendEmail } from "@/modules/identity/email";
import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { getOrCreateReferralCode } from "@/modules/commerce/referral";
import { FRIEND_DISCOUNT_PAISE, MIN_REFERRAL_PRICE_PAISE, REWARD_PAISE, referralLink } from "@/modules/commerce/referral-rules";
import {
  BROADCAST_DAILY_LIMIT,
  BROADCAST_KINDS,
  bodyParagraphs,
  broadcastAllowed,
  CATEGORY,
  type EmailCategory,
  type EmailContent,
  type EmailKind,
  istDayStart,
  isRealEmail,
  offerAllowed,
  PRIORITY,
  renderEmail,
  unsubscribeToken,
  withUtm,
} from "./rules";

// Reminder and offer emails. A daily cron (POST /api/cron/emails, 7 pm IST) queues the due reminders and sends what is
// queued; campaigns from /admin/emails are queued the same way. Resend's free plan allows 100 emails a day and login
// codes share it, so these stop at EMAIL_DAILY_LIMIT (default 60) and the rest wait for the next run.

const DAY = 24 * 60 * 60 * 1000;
const PHONE_PLACEHOLDER = "@phone.invalid";

export function dailyLimit(): number {
  const n = Number(process.env.EMAIL_DAILY_LIMIT);
  return Number.isInteger(n) && n > 0 ? n : 60;
}

const secret = () => process.env.BETTER_AUTH_SECRET ?? "";

function unsubscribeLinks(site: SiteConfig, userId: string, category: EmailCategory) {
  const q = `u=${encodeURIComponent(userId)}&c=${category}&t=${unsubscribeToken(secret(), userId, category)}`;
  return { page: `${site.url}/unsubscribe?${q}`, oneClick: `${site.url}/api/email/unsubscribe?${q}` };
}

const firstName = (name: string) => (name && name !== PLACEHOLDER_NAME ? name.split(/\s+/)[0] : "");
const istDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

// ───────────── Queueing ─────────────

/** Queues the reminders that are due now. The unique (user, kind, refKey) key makes this safe to run any number of times. */
export async function planReminders(now = new Date()): Promise<{ expiry: number; followUp: number }> {
  // Access ending within 7 days, unless the student already renewed (a later entitlement to the same product).
  const ending = await db.entitlement.findMany({
    where: { revokedAt: null, expiresAt: { gt: now, lte: new Date(now.getTime() + 7 * DAY) }, user: { emailReminders: true } },
    select: { id: true, userId: true, productId: true, expiresAt: true },
  });
  const later = ending.length
    ? await db.entitlement.findMany({
        where: { revokedAt: null, userId: { in: ending.map((e) => e.userId) }, expiresAt: { gt: new Date(now.getTime() + 7 * DAY) } },
        select: { userId: true, productId: true },
      })
    : [];
  const renewed = new Set(later.map((e) => `${e.userId}:${e.productId}`));
  const expiry = await db.emailLog.createMany({
    data: ending.filter((e) => !renewed.has(`${e.userId}:${e.productId}`)).map((e) => ({ userId: e.userId, kind: "expiry", refKey: e.id })),
    skipDuplicates: true,
  });

  // A free test submitted 20 hours to 3 days ago by a student who opted in and owns nothing yet: one follow-up per exam.
  const attempts = await db.attempt.findMany({
    where: {
      status: "SUBMITTED",
      submittedAt: { gte: new Date(now.getTime() - 3 * DAY), lte: new Date(now.getTime() - 20 * 60 * 60 * 1000) },
      test: { isFree: true },
      user: { emailOffers: true, entitlements: { none: { revokedAt: null, expiresAt: { gt: now } } } },
    },
    select: { userId: true, testId: true, test: { select: { examId: true } } },
  });
  const followUp = await db.emailLog.createMany({
    data: attempts.map((a) => ({ userId: a.userId, kind: "free-followup", refKey: a.test.examId ?? a.testId })),
    skipDuplicates: true,
  });
  return { expiry: expiry.count, followUp: followUp.count };
}

// ───────────── Content ─────────────

/** `signupSite`: the site the account was made on; its mails carry that site's name, colours and links. */
type Recipient = { id: string; name: string; signupSite: string };

async function expiryEmail(user: Recipient, entitlementId: string, now: Date): Promise<EmailContent | null> {
  const site = getSite(user.signupSite);
  const e = await db.entitlement.findUnique({
    where: { id: entitlementId },
    select: { revokedAt: true, expiresAt: true, productId: true, product: { select: { title: true, slug: true, isActive: true } } },
  });
  if (!e || e.revokedAt || e.expiresAt <= now) return null;
  const renewed = await db.entitlement.count({ where: { userId: user.id, productId: e.productId, revokedAt: null, expiresAt: { gt: e.expiresAt } } });
  if (renewed) return null;
  const [title] = e.product.title.split(/\s+[—–]\s+/);
  const date = istDate(e.expiresAt);
  const name = firstName(user.name);
  return renderEmail({
    subject: `Your ${title} access ends on ${date}`,
    heading: "Your access ends soon",
    paragraphs: [
      `${name ? `Hi ${name}, your` : "Your"} access to ${title} ends on ${date}.`,
      "Renew before it ends and the new period starts right after the current one, so you do not lose any days.",
      `आपका एक्सेस ${date} को समाप्त हो रहा है। अभी रिन्यू करें, कोई दिन बेकार नहीं जाएगा।`,
    ],
    cta: { label: "Renew now", url: withUtm(e.product.isActive ? `/buy/${e.product.slug}` : "/pricing", site.url, "expiry") },
    why: `You get this because you bought this series on ${site.name}. You can turn off reminders in your profile.`,
    unsubscribeUrl: unsubscribeLinks(site, user.id, "reminders").page,
    site,
  });
}

async function followUpEmail(user: Recipient, refKey: string, now: Date): Promise<EmailContent | null> {
  const site = getSite(user.signupSite);
  const owns = await db.entitlement.count({ where: { userId: user.id, revokedAt: null, expiresAt: { gt: now } } });
  if (owns) return null;
  const attempt = await db.attempt.findFirst({
    where: { userId: user.id, status: "SUBMITTED", test: { isFree: true, OR: [{ examId: refKey }, { id: refKey }] } },
    orderBy: { submittedAt: "desc" },
    select: { id: true, correct: true, wrong: true, skipped: true, test: { select: { title: true, series: { select: { seriesId: true } } } } },
  });
  if (!attempt) return null;
  const offer = await getBuyOptionForSeries(site.code, attempt.test.series.map((s) => s.seriesId));
  const total = (attempt.correct ?? 0) + (attempt.wrong ?? 0) + (attempt.skipped ?? 0);
  const name = firstName(user.name);
  const resultUrl = withUtm(`/results/${attempt.id}`, site.url, "free-followup");
  const [offerTitle] = offer ? offer.title.split(/\s+[—–]\s+/) : [""];
  return renderEmail({
    subject: `${name ? `${name}, your` : "Your"} ${attempt.test.title} result and what to do next`,
    heading: "Your free test result",
    paragraphs: [
      total ? `You answered ${attempt.correct ?? 0} of ${total} questions correctly in ${attempt.test.title}.` : `You finished ${attempt.test.title}.`,
      `Your full result, every solution and your weak topics: ${resultUrl}`,
      offer
        ? `To keep practising at exam level, the full ${offerTitle} has more full-length tests with solutions in Hindi and English, for ${rupees(offer.priceInPaise)}.`
        : "Keep practising with another free test.",
      "रोज़ एक टेस्ट दें और अपनी कमज़ोर टॉपिक पर काम करें।",
    ],
    cta: offer ? { label: `Get the full series for ${rupees(offer.priceInPaise)}`, url: withUtm(offer.href, site.url, "free-followup") } : { label: "Take another free test", url: withUtm("/tests", site.url, "free-followup") },
    why: `You get this because you ticked 'email me updates and offers' on ${site.name}.`,
    unsubscribeUrl: unsubscribeLinks(site, user.id, "offers").page,
    site,
  });
}

type CampaignBody = { subject: string; heading: string; body: string; ctaLabel: string; ctaUrl: string };

function campaignEmail(site: SiteConfig, userId: string, c: CampaignBody, tag: string): EmailContent {
  return renderEmail({
    subject: c.subject,
    heading: c.heading,
    paragraphs: bodyParagraphs(c.body),
    cta: { label: c.ctaLabel, url: withUtm(c.ctaUrl, site.url, tag) },
    why: `You get this because you ticked 'email me updates and offers' on ${site.name}.`,
    unsubscribeUrl: unsubscribeLinks(site, userId, "offers").page,
    site,
  });
}

const broadcastWhy = (site: SiteConfig, optedIn: boolean) =>
  optedIn
    ? `You get this because you ticked 'email me updates and offers' on ${site.name}.`
    : `You get this update because you have an account on ${site.name}. Unsubscribe and we will not send you offers.`;

/** A campaign sent to every student; those who never opted in also get a line inviting them to. */
function announcementEmail(site: SiteConfig, u: { id: string; emailOffers: boolean }, c: CampaignBody, tag: string): EmailContent {
  const invite = u.emailOffers ? [] : [`Aage bhi aise job alerts aur naye free mock tests chahiye? Profile me "Email me offers" tick karein: ${site.url}/profile`];
  return renderEmail({
    subject: c.subject,
    heading: c.heading,
    paragraphs: [...bodyParagraphs(c.body), ...invite],
    cta: { label: c.ctaLabel, url: withUtm(c.ctaUrl, site.url, tag) },
    why: broadcastWhy(site, u.emailOffers),
    unsubscribeUrl: unsubscribeLinks(site, u.id, "offers").page,
    site,
  });
}

/** For students who bought: their personal referral link, what a friend saves and what they earn. */
async function referralInviteEmail(site: SiteConfig, u: { id: string; name: string; emailOffers: boolean }, tag: string): Promise<EmailContent> {
  const link = referralLink(site.url, await getOrCreateReferralCode(u.id));
  const name = firstName(u.name);
  return renderEmail({
    subject: `Dosto ko ${site.name} bhejo, har dost par ${rupees(REWARD_PAISE)} kamao`,
    heading: `${name ? `${name}, ` : ""}taiyari saath karo, paise bhi kamao`,
    paragraphs: [
      `Aapke dost bhi ${site.stateAdj} ke exams ki taiyari kar rahe hain? Unhe apna link bhejo. ${rupees(MIN_REFERRAL_PRICE_PAISE)} se upar ke plan par unhe ${rupees(FRIEND_DISCOUNT_PAISE)} ki seedhi chhoot milegi.`,
      `Har dost jo aapke link se kharidega, uske liye aapke ${site.logo.initials} wallet me ${rupees(REWARD_PAISE)} aayenge. Wallet ke paise agli series ya Pass kharidne me use ho jaate hain.`,
      `Aapka link: ${link}`,
      "Ise apne WhatsApp ya Telegram group me share karo, jahan aapke dost exam ki baat karte hain.",
    ],
    cta: { label: "Mera referral page kholo", url: withUtm("/refer", site.url, tag) },
    why: broadcastWhy(site, u.emailOffers),
    unsubscribeUrl: unsubscribeLinks(site, u.id, "offers").page,
    site,
  });
}

// ───────────── Sending ─────────────

export type SendSummary = { sent: number; failed: number; skipped: number; left: number; quota: number };

/** Sends queued emails, most important first, until today's quota is used. Consent is re-checked at send time. */
export async function sendQueued(now = new Date()): Promise<SendSummary> {
  // Queued for over a week (e.g. held back by the frequency cap) is too stale to send.
  await db.emailLog.updateMany({ where: { status: "QUEUED", createdAt: { lt: new Date(now.getTime() - 7 * DAY) } }, data: { status: "SKIPPED", error: "stale" } });

  const sentToday = await db.emailLog.count({ where: { status: "SENT", sentAt: { gte: istDayStart(now) } } });
  let quota = Math.max(0, dailyLimit() - sentToday);
  let broadcastQuota = Math.max(
    0,
    BROADCAST_DAILY_LIMIT -
      (await db.emailLog.count({ where: { kind: { in: [...BROADCAST_KINDS] }, status: "SENT", sentAt: { gte: istDayStart(now) } } })),
  );
  const summary: SendSummary = { sent: 0, failed: 0, skipped: 0, left: 0, quota };

  const queued = (
    await db.emailLog.findMany({
      where: { status: "QUEUED" },
      orderBy: { createdAt: "asc" },
      take: 1000,
      select: {
        id: true,
        kind: true,
        refKey: true,
        campaign: { select: { id: true, subject: true, heading: true, body: true, ctaLabel: true, ctaUrl: true } },
        user: { select: { id: true, name: true, email: true, emailOffers: true, emailOffersAt: true, emailReminders: true, signupSite: true } },
      },
    })
  ).sort((a, b) => (PRIORITY[a.kind as EmailKind] ?? 9) - (PRIORITY[b.kind as EmailKind] ?? 9));

  const recent = new Map<string, Date[]>();
  const sentDates = async (userId: string) => {
    if (!recent.has(userId)) {
      const rows = await db.emailLog.findMany({ where: { userId, status: "SENT", sentAt: { gte: new Date(now.getTime() - 30 * DAY) } }, select: { sentAt: true } });
      recent.set(userId, rows.map((r) => r.sentAt!));
    }
    return recent.get(userId)!;
  };
  const skip = async (id: string, error: string) => {
    await db.emailLog.update({ where: { id }, data: { status: "SKIPPED", error } });
    summary.skipped++;
  };

  for (const log of queued) {
    if (quota <= 0) {
      summary.left++;
      continue;
    }
    const kind = log.kind as EmailKind;
    const category = CATEGORY[kind];
    const u = log.user;
    const site = getSite(u.signupSite);
    if (!category) {
      await skip(log.id, "unknown kind");
      continue;
    }
    if (!isRealEmail(u.email)) {
      await skip(log.id, "no email address");
      continue;
    }
    const broadcast = BROADCAST_KINDS.has(kind);
    if (broadcast ? !broadcastAllowed(u) : category === "offers" ? !u.emailOffers : !u.emailReminders) {
      await skip(log.id, "unsubscribed");
      continue;
    }
    if (category === "offers" && !offerAllowed(await sentDates(u.id), now)) {
      // A follow-up is only worth sending soon after the test; a campaign can wait for a later day.
      if (kind === "campaign" || broadcast) summary.left++;
      else await skip(log.id, "frequency cap");
      continue;
    }

    if (broadcast && broadcastQuota <= 0) {
      summary.left++;
      continue;
    }

    const content =
      kind === "expiry"
        ? await expiryEmail(u, log.refKey, now)
        : kind === "free-followup"
          ? await followUpEmail(u, log.refKey, now)
          : kind === "referral-invite"
            ? await referralInviteEmail(site, u, `referral-invite-${log.refKey}`)
            : log.campaign
              ? kind === "announcement"
                ? announcementEmail(site, u, log.campaign, `announcement-${log.campaign.id}`)
                : campaignEmail(site, u.id, log.campaign, `campaign-${log.campaign.id}`)
              : null;
    if (!content) {
      await skip(log.id, "no longer relevant");
      continue;
    }

    const links = unsubscribeLinks(site, u.id, category);
    const ok = await sendEmail(u.email, content, `[dev] ${kind} email for ${u.email}: ${content.subject}`, site, {
      "List-Unsubscribe": `<${links.oneClick}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    }).catch(() => false);
    await db.emailLog.update({ where: { id: log.id }, data: ok ? { status: "SENT", sentAt: now, error: null } : { status: "FAILED", error: "send failed" } });
    if (ok) {
      summary.sent++;
      quota--;
      if (broadcast) broadcastQuota--;
      (await sentDates(u.id)).push(now);
    } else summary.failed++;
  }
  return summary;
}

/** The daily cron job: queue what is due, then send. */
export async function runDailyEmails(now = new Date()) {
  const planned = await planReminders(now);
  const sent = await sendQueued(now);
  return { planned, ...sent };
}

// ───────────── Unpaid checkouts ─────────────

const HOUR = 60 * 60 * 1000;

/**
 * One "finish your payment" email per unpaid checkout, 1 to 24 hours after it was started. Called by the 15-minute
 * reconcile cron. Guests are reached through the email they typed before paying; a buyer who bought the same plan
 * since, or already got a reminder for it in the last day, or said no to offers, is left alone.
 */
export async function remindUnpaidCheckouts(now = new Date()): Promise<{ sent: number; skipped: number }> {
  const orders = await db.order.findMany({
    where: {
      status: "CREATED",
      razorpayOrderId: { not: null },
      reminderSentAt: null,
      createdAt: { gt: new Date(now.getTime() - 24 * HOUR), lt: new Date(now.getTime() - HOUR) },
    },
    orderBy: { createdAt: "asc" },
    take: 50,
    select: {
      id: true,
      userId: true,
      payerEmail: true,
      productId: true,
      site: true,
      product: { select: { slug: true, title: true, isActive: true } },
      user: { select: { id: true, name: true, email: true, emailOffers: true, emailOffersAt: true } },
    },
  });
  const result = { sent: 0, skipped: 0 };
  for (const o of orders) {
    // Claim the order first, so two overlapping cron runs can never mail it twice.
    const { count } = await db.order.updateMany({ where: { id: o.id, reminderSentAt: null }, data: { reminderSentAt: now } });
    if (!count) continue;
    const email = o.user?.email ?? o.payerEmail;
    const buyer = o.userId ? { userId: o.userId } : { payerEmail: email };
    const [boughtSince, remindedToday] = email
      ? await Promise.all([
          db.order.count({ where: { ...buyer, productId: o.productId, status: "PAID" } }),
          db.order.count({ where: { ...buyer, productId: o.productId, id: { not: o.id }, reminderSentAt: { gt: new Date(now.getTime() - 24 * HOUR) } } }),
        ])
      : [0, 0];
    if (!email || !isRealEmail(email) || !o.product.isActive || (o.user && !broadcastAllowed(o.user)) || boughtSince || remindedToday) {
      result.skipped++;
      continue;
    }
    const name = o.user ? firstName(o.user.name) : "";
    const site = getSite(o.site);
    const content = renderEmail({
      subject: `Aapka ${o.product.title} order adhoora reh gaya`,
      heading: `${name ? `${name}, ` : ""}aapka payment poora nahi hua`,
      paragraphs: [
        `Aapne ${o.product.title} ka checkout shuru kiya tha, par payment poora nahi hua. UPI fail hona ya network chala jaana aam baat hai; aap ek click me dobara try kar sakte hain.`,
        "Paise kat gaye par access nahi mila? Dobara pay mat kijiye. Aksar payment kuch minute me apne aap jud jaata hai; na jude to is email ka reply kijiye.",
      ],
      cta: { label: "Payment poora karein", url: withUtm(`/buy/${o.product.slug}`, site.url, "checkout-reminder") },
      why: `You get this because you started a payment on ${site.name}. We send only this one reminder.`,
      unsubscribeUrl: o.user ? unsubscribeLinks(site, o.user.id, "offers").page : undefined,
      site,
    });
    const ok = await sendEmail(email, content, `[dev] checkout reminder for ${email}: ${content.subject}`, site).catch(() => false);
    if (ok) result.sent++;
    else result.skipped++;
  }
  return result;
}

// ───────────── Campaigns ─────────────

const campaignSchema = z.object({
  subject: z.string().trim().min(3, "Write a subject").max(120),
  heading: z.string().trim().min(3, "Write a heading").max(120),
  body: z.string().trim().min(10, "Write the message").max(3000),
  ctaLabel: z.string().trim().min(2, "Write the button text").max(40),
  ctaUrl: z
    .string()
    .trim()
    .refine((u) => u.startsWith("/") || /^https:\/\/[^\s]+$/.test(u), "Button link must start with / (a page on this site) or https://"),
  examId: z.string().trim().optional().transform((v) => v || null),
});

type Fail = { ok: false; errors: string[] };

function audienceWhere(examId: string | null) {
  return {
    emailOffers: true,
    NOT: { email: { endsWith: PHONE_PLACEHOLDER } },
    ...(examId
      ? {
          OR: [
            { attempts: { some: { test: { examId } } } },
            { entitlements: { some: { revokedAt: null, product: { items: { some: { series: { examId } } } } } } },
          ],
        }
      : {}),
  };
}

/** How many students a campaign to this audience would reach. */
export function countAudience(examId: string | null) {
  return db.user.count({ where: audienceWhere(examId) });
}

/** Saves a campaign and queues it for everyone in its audience; the next send run delivers it within the quota. */
export async function queueCampaign(raw: unknown, actorId: string): Promise<{ ok: true; id: string; queued: number } | Fail> {
  const v = campaignSchema.safeParse(raw);
  if (!v.success) return { ok: false, errors: v.error.issues.map((i) => i.message) };
  const users = await db.user.findMany({ where: audienceWhere(v.data.examId), select: { id: true } });
  if (!users.length) return { ok: false, errors: ["Nobody in this audience has opted in to emails yet."] };
  const campaign = await db.emailCampaign.create({ data: { ...v.data, createdById: actorId }, select: { id: true } });
  const { count } = await db.emailLog.createMany({
    data: users.map((u) => ({ userId: u.id, kind: "campaign", refKey: campaign.id, campaignId: campaign.id })),
    skipDuplicates: true,
  });
  await db.auditLog.create({ data: { actorId, entity: "email-campaign", entityId: campaign.id, action: `queue ${count}` } });
  return { ok: true, id: campaign.id, queued: count };
}

/** What the draft looks like in an inbox. Blank fields show placeholders so the preview works while typing. */
export function previewCampaign(raw: Partial<CampaignBody>, adminId: string): { subject: string; html: string } {
  const c = {
    subject: raw.subject?.trim() || "Your subject line",
    heading: raw.heading?.trim() || "Your heading",
    body: raw.body?.trim() || "Your message appears here.\n\nLeave a blank line to start a new paragraph.",
    ctaLabel: raw.ctaLabel?.trim() || "Button text",
    ctaUrl: raw.ctaUrl?.trim() && (raw.ctaUrl.startsWith("/") || raw.ctaUrl.startsWith("https://")) ? raw.ctaUrl.trim() : "/",
  };
  const e = campaignEmail(PRIMARY_SITE, adminId, c, "campaign-preview");
  return { subject: e.subject, html: e.html };
}

/** Sends the draft to the admin's own inbox only; nothing is logged or queued. */
export async function sendCampaignTest(raw: unknown, admin: { id: string; email: string }): Promise<{ ok: true } | Fail> {
  const v = campaignSchema.safeParse(raw);
  if (!v.success) return { ok: false, errors: v.error.issues.map((i) => i.message) };
  if (!isRealEmail(admin.email)) return { ok: false, errors: ["Your account has no email address to send the test to."] };
  const content = campaignEmail(PRIMARY_SITE, admin.id, v.data, "campaign-test");
  const ok = await sendEmail(admin.email, { ...content, subject: `[Test] ${content.subject}` }, `[dev] campaign test to ${admin.email}: ${content.subject}`);
  return ok ? { ok: true } : { ok: false, errors: ["Sending failed. Check RESEND_API_KEY and EMAIL_FROM on the server."] };
}

// ───────────── Preferences ─────────────

export async function setEmailPreferences(userId: string, prefs: { offers: boolean; reminders: boolean }) {
  const current = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { emailOffers: true } });
  await db.user.update({
    where: { id: userId },
    data: { emailOffers: prefs.offers, emailReminders: prefs.reminders, ...(prefs.offers !== current.emailOffers ? { emailOffersAt: new Date() } : {}) },
  });
}

/** The "email me offers" box on the welcome screen; never switches anything off. */
export async function optInToOffers(userId: string) {
  await db.user.update({ where: { id: userId }, data: { emailOffers: true, emailOffersAt: new Date() } });
}

/** From an unsubscribe link: switches off one category for that student. */
export async function unsubscribe(userId: string, category: EmailCategory) {
  await db.user.updateMany({ where: { id: userId }, data: category === "offers" ? { emailOffers: false, emailOffersAt: new Date() } : { emailReminders: false } });
}

export async function getEmailPreferences(userId: string) {
  return db.user.findUniqueOrThrow({ where: { id: userId }, select: { email: true, emailOffers: true, emailReminders: true } });
}

// ───────────── Admin panel ─────────────

export async function getEmailPanel(now = new Date()) {
  const real = { NOT: { email: { endsWith: PHONE_PLACEHOLDER } } };
  const since = new Date(now.getTime() - 30 * DAY);
  const [optedIn, reminders, users, sentToday, queued, byKind, campaigns, campaignCounts, recent, exams] = await Promise.all([
    db.user.count({ where: { ...real, emailOffers: true } }),
    db.user.count({ where: { ...real, emailReminders: true } }),
    db.user.count({ where: real }),
    db.emailLog.count({ where: { status: "SENT", sentAt: { gte: istDayStart(now) } } }),
    db.emailLog.count({ where: { status: "QUEUED" } }),
    db.emailLog.groupBy({ by: ["kind", "status"], where: { createdAt: { gte: since } }, _count: { _all: true } }),
    db.emailCampaign.findMany({ orderBy: { createdAt: "desc" }, take: 20, select: { id: true, subject: true, examId: true, createdAt: true } }),
    db.emailLog.groupBy({ by: ["campaignId", "status"], where: { campaignId: { not: null } }, _count: { _all: true } }),
    db.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 40,
      select: { id: true, kind: true, status: true, error: true, createdAt: true, sentAt: true, user: { select: { name: true, email: true } } },
    }),
    db.exam.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  const count = (rows: { status: string; _count: { _all: number } }[], status: string) => rows.filter((r) => r.status === status).reduce((n, r) => n + r._count._all, 0);
  const examName = new Map(exams.map((e) => [e.id, e.name]));
  return {
    configured: !!process.env.RESEND_API_KEY && !!process.env.EMAIL_FROM,
    limit: dailyLimit(),
    optedIn,
    reminders,
    users,
    sentToday,
    queued,
    kinds: (["expiry", "free-followup", "campaign", "announcement", "referral-invite"] as const).map((kind) => {
      const rows = byKind.filter((r) => r.kind === kind);
      return { kind, sent: count(rows, "SENT"), failed: count(rows, "FAILED"), skipped: count(rows, "SKIPPED"), queued: count(rows, "QUEUED") };
    }),
    campaigns: campaigns.map((c) => {
      const rows = campaignCounts.filter((r) => r.campaignId === c.id);
      return { ...c, audience: c.examId ? (examName.get(c.examId) ?? "One exam") : "Everyone opted in", sent: count(rows, "SENT"), queued: count(rows, "QUEUED"), failed: count(rows, "FAILED"), skipped: count(rows, "SKIPPED") };
    }),
    recent,
    exams,
  };
}
