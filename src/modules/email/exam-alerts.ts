import "server-only";
import { db } from "@/lib/db";
import { examLabel } from "@/modules/catalog/labels";
import { sendEmail } from "@/modules/identity/email";
import { getSite, type SiteConfig } from "@/sites";
import { bodyParagraphs, isRealEmail, renderEmail, unsubscribeToken, withUtm, type EmailContent } from "./rules";

// Emails left on exam pages by visitors who may have no account: the syllabus PDF form and the exam-date alert box.
// The first sign-up for an exam gets one welcome mail at once; later, a campaign an admin sends to that exam reaches
// them as well (queueAlertCampaign / sendQueuedAlerts, called from ./service.ts). "alerts" unsubscribes by email.

export type AlertSource = "syllabus-pdf" | "alert";

const secret = () => process.env.BETTER_AUTH_SECRET ?? "";

function alertUnsubscribe(site: SiteConfig, email: string) {
  const q = `u=${encodeURIComponent(email)}&c=alerts&t=${unsubscribeToken(secret(), email, "alerts")}`;
  return { page: `${site.url}/unsubscribe?${q}`, oneClick: `${site.url}/api/email/unsubscribe?${q}` };
}

const alertWhy = (site: SiteConfig, exam: string) => `You are receiving this email because you asked ${site.name} for ${exam} updates.`;

function welcomeEmail(site: SiteConfig, email: string, exam: { label: string; base: string; hasSyllabus: boolean }, source: AlertSource): EmailContent {
  const pdf = source === "syllabus-pdf" && exam.hasSyllabus;
  return renderEmail({
    subject: pdf ? `${exam.label} syllabus, and exam alerts on email` : `You will get ${exam.label} exam alerts`,
    eyebrow: "Exam alerts",
    heading: pdf ? `Your ${exam.label} syllabus` : `${exam.label} alerts are on`,
    greeting: "",
    paragraphs: [
      pdf
        ? `Here is the full ${exam.label} syllabus, topic-wise. Open it any time and use "Save as PDF" to keep a copy on your phone.`
        : `Thank you. We will email you when the ${exam.label} exam date, admit card or result is announced.`,
      pdf ? `We will also email you when the ${exam.label} exam date, admit card or result is announced.` : "Meanwhile, see where you stand with a free mock test in the real CBT format.",
    ],
    points: ["Free mock tests in Hindi and English", "Instant result with a solution for every question", "Your rank among other candidates"],
    pointsTitle: "Practise for free",
    cta: pdf
      ? { label: "Open the syllabus", url: withUtm(`${exam.base}/syllabus`, site.url, "alert-welcome") }
      : { label: "Take a free mock test", url: withUtm(exam.base, site.url, "alert-welcome") },
    why: alertWhy(site, exam.label),
    unsubscribeUrl: alertUnsubscribe(site, email).page,
    site,
  });
}

/**
 * Saves the email for this exam ("hprca/clerk") and sends the welcome mail the first time. Signing up again for the
 * same exam, or after unsubscribing, turns the alerts back on without another welcome mail.
 */
export async function subscribeToExam(input: { email: string; examKey: string; source: AlertSource; siteCode: string }): Promise<{ ok: true } | { error: string }> {
  const email = input.email.trim().toLowerCase();
  if (!isRealEmail(email) || email.length > 200) return { error: "Please enter a valid email address." };
  const [bodySlug, examSlug] = input.examKey.split("/");
  const exam = await db.exam.findFirst({
    where: { slug: examSlug ?? "", isActive: true, body: { slug: bodySlug ?? "" } },
    select: { id: true, name: true, slug: true, syllabus: true, body: { select: { slug: true } } },
  });
  if (!exam) return { error: "This exam was not found." };

  const existing = await db.examAlert.findUnique({ where: { email_examId: { email, examId: exam.id } }, select: { id: true } });
  if (existing) {
    await db.examAlert.update({ where: { id: existing.id }, data: { unsubscribedAt: null } });
    return { ok: true };
  }
  await db.examAlert.create({ data: { email, examId: exam.id, source: input.source, site: input.siteCode } });

  const site = getSite(input.siteCode);
  const label = examLabel(exam.body.slug, exam.name);
  const content = welcomeEmail(site, email, { label, base: `/${exam.body.slug}/${exam.slug}`, hasSyllabus: !!exam.syllabus?.trim() }, input.source);
  const links = alertUnsubscribe(site, email);
  // Best effort: the sign-up is saved even if the mail provider is down.
  await sendEmail(email, content, `[dev] ${input.source} welcome to ${email}: ${content.subject}`, site, {
    "List-Unsubscribe": `<${links.oneClick}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  }).catch(() => false);
  return { ok: true };
}

/** From an "alerts" unsubscribe link: stops every exam's alerts for this address. */
export async function unsubscribeAlerts(email: string) {
  await db.examAlert.updateMany({ where: { email: email.toLowerCase(), unsubscribedAt: null }, data: { unsubscribedAt: new Date() } });
}

/** Active subscribers of an exam who do not also get the campaign through their account (their email is not in `userEmails`). */
function alertAudienceWhere(examId: string, userEmails: string[]) {
  return { examId, unsubscribedAt: null, ...(userEmails.length ? { email: { notIn: userEmails } } : {}) };
}

export function countAlertAudience(examId: string, userEmails: string[]) {
  return db.examAlert.count({ where: alertAudienceWhere(examId, userEmails) });
}

/** Queues an exam campaign for that exam's subscribers. */
export async function queueAlertCampaign(campaignId: string, examId: string, userEmails: string[]): Promise<number> {
  const alerts = await db.examAlert.findMany({ where: alertAudienceWhere(examId, userEmails), select: { id: true } });
  const { count } = await db.examAlertLog.createMany({ data: alerts.map((a) => ({ alertId: a.id, campaignId })), skipDuplicates: true });
  return count;
}

const DAY = 24 * 60 * 60 * 1000;

/** Sends queued subscriber mails, at most `quota` of them. Returns how many were sent, failed, skipped and left. */
export async function sendQueuedAlerts(quota: number, now = new Date()) {
  await db.examAlertLog.updateMany({ where: { status: "QUEUED", createdAt: { lt: new Date(now.getTime() - 7 * DAY) } }, data: { status: "SKIPPED", error: "stale" } });
  const summary = { sent: 0, failed: 0, skipped: 0, left: 0 };
  const queued = await db.examAlertLog.findMany({
    where: { status: "QUEUED" },
    orderBy: { createdAt: "asc" },
    take: 1000,
    select: {
      id: true,
      alert: { select: { email: true, site: true, unsubscribedAt: true, exam: { select: { name: true, body: { select: { slug: true } } } } } },
      campaign: { select: { id: true, subject: true, heading: true, body: true, ctaLabel: true, ctaUrl: true } },
    },
  });
  for (const log of queued) {
    if (summary.sent >= quota) {
      summary.left++;
      continue;
    }
    const { alert, campaign } = log;
    if (alert.unsubscribedAt) {
      await db.examAlertLog.update({ where: { id: log.id }, data: { status: "SKIPPED", error: "unsubscribed" } });
      summary.skipped++;
      continue;
    }
    const site = getSite(alert.site);
    const links = alertUnsubscribe(site, alert.email);
    const content = renderEmail({
      subject: campaign.subject,
      heading: campaign.heading,
      paragraphs: bodyParagraphs(campaign.body),
      cta: { label: campaign.ctaLabel, url: withUtm(campaign.ctaUrl, site.url, `alert-${campaign.id}`) },
      why: alertWhy(site, examLabel(alert.exam.body.slug, alert.exam.name)),
      unsubscribeUrl: links.page,
      site,
    });
    const ok = await sendEmail(alert.email, content, `[dev] alert campaign to ${alert.email}: ${content.subject}`, site, {
      "List-Unsubscribe": `<${links.oneClick}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    }).catch(() => false);
    await db.examAlertLog.update({ where: { id: log.id }, data: ok ? { status: "SENT", sentAt: now, error: null } : { status: "FAILED", error: "send failed" } });
    if (ok) summary.sent++;
    else summary.failed++;
  }
  return summary;
}
