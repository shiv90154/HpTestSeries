// Pure rules for reminder and offer emails: who may get one, how often, the unsubscribe token and the HTML.
// The sending side lives in ./service.ts.

import { createHmac, timingSafeEqual } from "node:crypto";
import type { SiteConfig } from "@/sites/types";
import { buttonRow, emailBrand, emailColors, emailShell, esc, paragraphRow, pointsRow, statsRow } from "./layout";

export type EmailCategory = "offers" | "reminders";
export type EmailKind = "expiry" | "free-followup" | "nudge" | "campaign" | "announcement" | "referral-invite";

/** Which consent a kind of email needs; the unsubscribe link in it switches off that one. */
export const CATEGORY: Record<EmailKind, EmailCategory> = {
  expiry: "reminders",
  "free-followup": "offers",
  nudge: "offers",
  campaign: "offers",
  announcement: "offers",
  "referral-invite": "offers",
};

/** Sent first when the daily quota is short: a lapsing purchase matters more than a promotion. */
export const PRIORITY: Record<EmailKind, number> = { expiry: 0, "free-followup": 1, nudge: 2, campaign: 3, "referral-invite": 4, announcement: 5 };

/** Broadcasts (see BROADCAST_KINDS) go out in daily batches of this many, so a send to every student spreads over days. */
export const BROADCAST_DAILY_LIMIT = 40;

/** Admin-sent mails to every student; capped per day by BROADCAST_DAILY_LIMIT. */
export const BROADCAST_KINDS: ReadonlySet<EmailKind> = new Set<EmailKind>(["announcement", "referral-invite"]);

/**
 * Whether offer emails may go to this student: everyone except those who switched offers off (an unsubscribe link
 * or the profile). emailOffersAt is set whenever the student decides, so emailOffers false with a date means "no".
 */
export function offersAllowed(u: { emailOffers: boolean; emailOffersAt: Date | null }): boolean {
  return u.emailOffers || u.emailOffersAt === null;
}

/** The same rule as a Prisma User filter. */
export const OFFERS_ALLOWED_WHERE = { OR: [{ emailOffers: true }, { emailOffersAt: null }] };

/** Accounts made by SMS login carry a placeholder address (see identity/auth.ts) that must never be mailed. */
export function isRealEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.toLowerCase().endsWith("@phone.invalid");
}

const DAY = 24 * 60 * 60 * 1000;

/** Offers are capped at one every 3 days and 4 in 30 days per student, counting every email we sent them. */
export function offerAllowed(sentAt: Date[], now: Date): boolean {
  const recent = sentAt.filter((d) => now.getTime() - d.getTime() < 30 * DAY);
  return recent.length < 4 && !recent.some((d) => now.getTime() - d.getTime() < 3 * DAY);
}

/** Midnight in India for the day containing `now`, as a UTC instant (the daily send quota resets then). */
export function istDayStart(now: Date): Date {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - 5.5 * 60 * 60 * 1000);
}

// ── Unsubscribe token: HMAC of user + category, so a link can switch off only that student's mails ──

function mac(secret: string, userId: string, category: EmailCategory): string {
  return createHmac("sha256", `email-unsubscribe:${secret}`).update(`${userId}:${category}`).digest("base64url").slice(0, 32);
}

export function unsubscribeToken(secret: string, userId: string, category: EmailCategory): string {
  return mac(secret, userId, category);
}

export function verifyUnsubscribeToken(secret: string, userId: string, category: string, token: string): category is EmailCategory {
  if (category !== "offers" && category !== "reminders") return false;
  const a = Buffer.from(mac(secret, userId, category));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Tags a link to our own site so GA4 shows which email brought the visit. Other sites' links are left alone. */
export function withUtm(url: string, siteUrl: string, campaign: string): string {
  const u = new URL(url, siteUrl);
  if (u.origin !== new URL(siteUrl).origin) return u.toString();
  u.searchParams.set("utm_source", "email");
  u.searchParams.set("utm_medium", "email");
  u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}

// ── Template ──

export type EmailContent = { subject: string; text: string; html: string };

/**
 * One layout for every reminder and offer: heading, short paragraphs, an optional stats box and tick list, one button,
 * a closing line, and a footer saying why the student got it with the unsubscribe link. Every value is escaped;
 * paragraphs are plain text.
 */
export function renderEmail(m: {
  subject: string;
  heading: string;
  /** Inbox preview line next to the subject; the first paragraph when left out. */
  preview?: string;
  paragraphs: string[];
  /** Big numbers in a tinted box, e.g. a test score. */
  stats?: { label: string; value: string }[];
  /** Short benefit lines shown with a tick. */
  points?: string[];
  cta: { label: string; url: string };
  /** Muted line under the button (a tip or sign-off). */
  after?: string;
  why: string;
  /** Left out only for a mail to someone without an account (a guest checkout reminder, sent once). */
  unsubscribeUrl?: string;
  /** The site the mail is about (its name, colours and links); HP when left out. */
  site?: SiteConfig;
}): EmailContent {
  const text = [
    m.heading,
    "",
    ...m.paragraphs.flatMap((p) => [p, ""]),
    ...(m.stats?.length ? [m.stats.map((s) => `${s.label}: ${s.value}`).join("  |  "), ""] : []),
    ...(m.points?.length ? [...m.points.map((p) => `✓ ${p}`), ""] : []),
    `${m.cta.label}: ${m.cta.url}`,
    ...(m.after ? ["", m.after] : []),
    "",
    "—",
    m.why,
    ...(m.unsubscribeUrl ? [`Unsubscribe: ${m.unsubscribeUrl}`] : []),
  ].join("\n");
  const rows = [
    `<tr><td style="font-size:24px;line-height:1.3;font-weight:800;color:${emailColors.ink}">${esc(m.heading)}</td></tr>`,
    ...m.paragraphs.map((p, i) => paragraphRow(p, { top: i === 0 ? 12 : 14 })),
    ...(m.stats?.length ? [statsRow(m.stats)] : []),
    ...(m.points?.length ? [pointsRow(m.points)] : []),
    buttonRow(m.cta.label, m.cta.url),
    ...(m.after ? [paragraphRow(m.after, { muted: true, top: 20 })] : []),
  ].join("\n");
  const html = emailShell({
    preview: m.preview ?? m.paragraphs[0] ?? m.heading,
    siteUrl: m.site?.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://hptestseries.in",
    brand: m.site && emailBrand(m.site),
    rows,
    footer: m.unsubscribeUrl
      ? `${esc(m.why)} <a href="${esc(m.unsubscribeUrl)}" style="color:${emailColors.faint};text-decoration:underline">Unsubscribe</a>`
      : esc(m.why),
  });
  return { subject: m.subject, text, html };
}

/** Admin-written campaign body: blank lines separate paragraphs; extra spaces and empty lines are dropped. */
export function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}
