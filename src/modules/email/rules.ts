// Pure rules for reminder and offer emails: who may get one, how often, the unsubscribe token and the HTML.
// The sending side lives in ./service.ts.

import { createHmac, timingSafeEqual } from "node:crypto";

export type EmailCategory = "offers" | "reminders";
export type EmailKind = "expiry" | "free-followup" | "campaign";

/** Which consent a kind of email needs; the unsubscribe link in it switches off that one. */
export const CATEGORY: Record<EmailKind, EmailCategory> = { expiry: "reminders", "free-followup": "offers", campaign: "offers" };

/** Sent first when the daily quota is short: a lapsing purchase matters more than a promotion. */
export const PRIORITY: Record<EmailKind, number> = { expiry: 0, "free-followup": 1, campaign: 2 };

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

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type EmailContent = { subject: string; text: string; html: string };

/**
 * One simple layout for every reminder: heading, short paragraphs, one button, and a footer saying why the student
 * got it with the unsubscribe link. Every value is escaped; paragraphs are plain text.
 */
export function renderEmail(m: {
  subject: string;
  heading: string;
  paragraphs: string[];
  cta: { label: string; url: string };
  why: string;
  unsubscribeUrl: string;
}): EmailContent {
  const text = [m.heading, "", ...m.paragraphs.flatMap((p) => [p, ""]), `${m.cta.label}: ${m.cta.url}`, "", "—", m.why, `Unsubscribe: ${m.unsubscribeUrl}`].join("\n");
  const paras = m.paragraphs.map((p) => `<tr><td style="padding-top:12px;font-size:15px;line-height:1.5">${esc(p)}</td></tr>`).join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f1b33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border:1px solid #dfe5ef;border-radius:16px;padding:28px">
<tr><td style="font-size:18px;font-weight:bold;color:#1e4fd8">HP Test Series</td></tr>
<tr><td style="padding-top:16px;font-size:20px;font-weight:bold">${esc(m.heading)}</td></tr>
${paras}
<tr><td style="padding-top:20px"><a href="${esc(m.cta.url)}" style="display:inline-block;background:#1e4fd8;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">${esc(m.cta.label)}</a></td></tr>
<tr><td style="padding-top:24px;font-size:12px;color:#8a97ad;line-height:1.5">${esc(m.why)} <a href="${esc(m.unsubscribeUrl)}" style="color:#8a97ad">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>`;
  return { subject: m.subject, text, html };
}

/** Admin-written campaign body: blank lines separate paragraphs; extra spaces and empty lines are dropped. */
export function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}
