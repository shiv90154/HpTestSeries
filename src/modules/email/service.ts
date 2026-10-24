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
  CATEGORY,
  type EmailCategory,
  type EmailContent,
  type EmailKind,
  istDayStart,
  isRealEmail,
  offerAllowed,
  OFFERS_ALLOWED_WHERE,
  offersAllowed,
  PRIORITY,
  renderEmail,
  unsubscribeToken,
  withUtm,
} from "./rules";

// Reminder and offer emails. A daily cron (POST /api/cron/emails, 7 pm IST) queues the due reminders and sends what is
// queued; campaigns from /admin/emails are queued the same way. Offers go to every student who has not switched them
// off. Resend's free plan allows 100 emails a day and login codes share it; with BREVO_API_KEY set, sendEmail moves on
// to Brevo (300 a day) when Resend runs out. These stop at EMAIL_DAILY_LIMIT (default 60, or 330 with Brevo) and the
// rest wait for the next run.

const DAY = 24 * 60 * 60 * 1000;
const PHONE_PLACEHOLDER = "@phone.invalid";

export function dailyLimit(): number {
  const n = Number(process.env.EMAIL_DAILY_LIMIT);
  if (Number.isInteger(n) && n > 0) return n;
  return process.env.BREVO_API_KEY ? 330 : 60;
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
export async function planReminders(now = new Date()): Promise<{ expiry: number; followUp: number; nudge: number }> {
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

  // A free test submitted 20 hours to 3 days ago by a student who owns nothing yet: one follow-up per exam.
  const attempts = await db.attempt.findMany({
    where: {
      status: "SUBMITTED",
      submittedAt: { gte: new Date(now.getTime() - 3 * DAY), lte: new Date(now.getTime() - 20 * 60 * 60 * 1000) },
      test: { isFree: true },
      user: { ...OFFERS_ALLOWED_WHERE, entitlements: { none: { revokedAt: null, expiresAt: { gt: now } } } },
    },
    select: { userId: true, testId: true, test: { select: { examId: true } } },
  });
  const followUp = await db.emailLog.createMany({
    data: attempts.map((a) => ({ userId: a.userId, kind: "free-followup", refKey: a.test.examId ?? a.testId })),
    skipDuplicates: true,
  });

  // Students with an account for 3+ days who never bought anything: one personal "next step" mail each. The 3 days
  // leave room for the free-test follow-up first; the frequency cap spaces the two apart.
  const nonBuyers = await db.user.findMany({
    where: {
      ...OFFERS_ALLOWED_WHERE,
      role: "STUDENT",
      createdAt: { lte: new Date(now.getTime() - 3 * DAY) },
      NOT: { email: { endsWith: PHONE_PLACEHOLDER } },
      entitlements: { none: {} },
    },
    select: { id: true },
  });
  const nudge = await db.emailLog.createMany({ data: nonBuyers.map((u) => ({ userId: u.id, kind: "nudge", refKey: NUDGE_REF })), skipDuplicates: true });
  return { expiry: expiry.count, followUp: followUp.count, nudge: nudge.count };
}

/** Bump to send the non-buyer mail once more to everyone who still has not bought. */
const NUDGE_REF = "v1";

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
    subject: `${title} ka access ${date} ko khatam ho raha hai`,
    heading: `${name ? `${name}, aapka` : "Aapka"} access jaldi khatam hoga`,
    preview: `Renew karo, ek bhi din bekaar nahi jaayega.`,
    paragraphs: [
      `${title} ka aapka access ${date} ko khatam ho jaayega.`,
      "Abhi renew karoge toh naya period purane ke khatam hone ke baad hi shuru hoga, yaani ek bhi din bekaar nahi jaayega.",
    ],
    points: ["Saare mock tests aur unke solutions khule rahenge", "Exam se pehle practice ka flow nahi tootega"],
    cta: { label: "Abhi renew karo", url: withUtm(e.product.isActive ? `/buy/${e.product.slug}` : "/pricing", site.url, "expiry") },
    after: `आपका एक्सेस ${date} को समाप्त हो रहा है। अभी रिन्यू करें, कोई दिन बेकार नहीं जाएगा।`,
    why: `Ye reminder isliye aaya kyunki aapne ${site.name} pe ye series kharidi hai. Reminders band karne hain?`,
    unsubscribeUrl: unsubscribeLinks(site, user.id, "reminders").page,
    site,
  });
}

/** What a paid series gives, in the student's words; shown in offer mails next to the price. */
const SERIES_POINTS = [
  "Asli exam jaise full-length mock tests, wahi pattern aur timer",
  "Har sawaal ka solution Hindi aur English dono mein",
  "All-India rank aur aapke weak topics ki report",
  "Mobile pe kabhi bhi, kahin bhi practice",
];

const offersWhy = (site: SiteConfig) => `Ye mail aapko isliye mila kyunki aapka ${site.name} pe account hai. Aage nahi chahiye?`;

/** Correct / wrong / skipped and accuracy of an attempt, for the stats box. */
function scoreStats(a: { correct: number | null; wrong: number | null; skipped: number | null }) {
  const [correct, wrong, skipped] = [a.correct ?? 0, a.wrong ?? 0, a.skipped ?? 0];
  if (!correct && !wrong && !skipped) return undefined;
  const accuracy = correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : 0;
  return [
    { label: "Sahi", value: String(correct) },
    { label: "Galat", value: String(wrong) },
    { label: "Chhode", value: String(skipped) },
    { label: "Accuracy", value: `${accuracy}%` },
  ];
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
  const name = firstName(user.name);
  const resultUrl = withUtm(`/results/${attempt.id}`, site.url, "free-followup");
  const [offerTitle] = offer ? offer.title.split(/\s+[—–]\s+/) : [""];
  return renderEmail({
    subject: `${name ? `${name}, aapka` : "Aapka"} ${attempt.test.title} result aa gaya. Ab aage kya?`,
    heading: "Aapka free test result",
    preview: "Score, accuracy aur aage ki taiyari ka plan.",
    paragraphs: [
      `${attempt.test.title} dene ke liye shabaash! Ye raha aapka score:`,
      offer
        ? `Ek mock se shuruaat hoti hai, selection baar-baar practice se hota hai. ${offerTitle} mein aisi hi poori taiyari milti hai, sirf ${rupees(offer.priceInPaise)} mein:`
        : "Ek mock se shuruaat hoti hai, selection baar-baar practice se hota hai. Agla free test do aur dekho score kitna badhta hai.",
    ],
    stats: scoreStats(attempt),
    points: offer ? SERIES_POINTS : undefined,
    cta: offer
      ? { label: `${offerTitle} lo, ${rupees(offer.priceInPaise)}`, url: withUtm(offer.href, site.url, "free-followup") }
      : { label: "Agla free test do", url: withUtm("/tests", site.url, "free-followup") },
    after: `Har sawaal ka solution aur aapke weak topics yahan dekho: ${resultUrl}`,
    why: offersWhy(site),
    unsubscribeUrl: unsubscribeLinks(site, user.id, "offers").page,
    site,
  });
}

/** For a student who never bought: their last test and the series for it, or an invitation to a first free mock. */
async function nudgeEmail(user: Recipient): Promise<EmailContent | null> {
  const site = getSite(user.signupSite);
  if (await db.entitlement.count({ where: { userId: user.id } })) return null;
  const name = firstName(user.name);
  const attempt = await db.attempt.findFirst({
    where: { userId: user.id, status: "SUBMITTED" },
    orderBy: { submittedAt: "desc" },
    select: { correct: true, wrong: true, skipped: true, test: { select: { title: true, exam: { select: { name: true } }, series: { select: { seriesId: true } } } } },
  });

  if (!attempt) {
    return renderEmail({
      subject: `${name ? `${name}, aapka` : "Aapka"} free mock test intezaar kar raha hai`,
      heading: "Ek free mock se shuruaat karo",
      preview: "15 minute nikaalo, pata chalega aap exam mein kahan khade ho.",
      paragraphs: [
        `${name ? `Namaste ${name}! Aapne` : "Namaste! Aapne"} ${site.name} pe account toh bana liya, par abhi tak koi test nahi diya.`,
        "Sirf ek free mock dene se pata chal jaata hai ki aap exam mein kahan khade ho: kaunse topic strong hain aur kahan mehnat chahiye.",
      ],
      points: ["Bilkul free, koi payment nahi", "Asli exam jaisa CBT screen aur timer", "Turant result, rank aur har sawaal ka solution", "Hindi aur English dono mein"],
      cta: { label: "Free mock test shuru karo", url: withUtm("/tests", site.url, "nudge") },
      after: "Shuruaat hi sabse mushkil step hota hai. Aaj ek test do, kal se raasta saaf dikhega. 💪",
      why: offersWhy(site),
      unsubscribeUrl: unsubscribeLinks(site, user.id, "offers").page,
      site,
    });
  }

  const offer = await getBuyOptionForSeries(site.code, attempt.test.series.map((s) => s.seriesId));
  const exam = attempt.test.exam?.name;
  const [offerTitle] = offer ? offer.title.split(/\s+[—–]\s+/) : [""];
  return renderEmail({
    subject: `${name ? `${name}, ` : ""}${exam ? `${exam} ki` : "aapki"} taiyari kahan tak pahunchi?`,
    heading: "Aapki taiyari ka agla step",
    preview: offer ? `${offerTitle}: poori taiyari ${rupees(offer.priceInPaise)} mein.` : "Agla free mock aapka intezaar kar raha hai.",
    paragraphs: [
      `${name ? `Namaste ${name}! Aapne` : "Namaste! Aapne"} ${attempt.test.title} diya tha. Achchi shuruaat thi:`,
      offer
        ? `Exam mein wahi aage nikalta hai jo exam jaise mahaul mein baar-baar practice karta hai aur har galti se seekhta hai. ${offerTitle} isi ke liye bana hai, sirf ${rupees(offer.priceInPaise)} mein:`
        : "Exam mein wahi aage nikalta hai jo exam jaise mahaul mein baar-baar practice karta hai. Agla free mock do aur apna score badhte dekho.",
    ],
    stats: scoreStats(attempt),
    points: offer ? SERIES_POINTS : undefined,
    cta: offer
      ? { label: `${offerTitle} dekho, ${rupees(offer.priceInPaise)}`, url: withUtm(offer.href, site.url, "nudge") }
      : { label: "Agla free test do", url: withUtm("/tests", site.url, "nudge") },
    after: "Tip: roz ek test aur uska analysis. Bas yahi formula hai.",
    why: offersWhy(site),
    unsubscribeUrl: unsubscribeLinks(site, user.id, "offers").page,
    site,
  });
}

type CampaignBody = { subject: string; heading: string; body: string; ctaLabel: string; ctaUrl: string };

/** An admin-written campaign or announcement. */
function campaignEmail(site: SiteConfig, userId: string, c: CampaignBody, tag: string): EmailContent {
  return renderEmail({
    subject: c.subject,
    heading: c.heading,
    paragraphs: bodyParagraphs(c.body),
    cta: { label: c.ctaLabel, url: withUtm(c.ctaUrl, site.url, tag) },
    why: offersWhy(site),
    unsubscribeUrl: unsubscribeLinks(site, userId, "offers").page,
    site,
  });
}

/** For students who bought: their personal referral link, what a friend saves and what they earn. */
async function referralInviteEmail(site: SiteConfig, u: { id: string; name: string }, tag: string): Promise<EmailContent> {
  const link = referralLink(site.url, await getOrCreateReferralCode(u.id));
  const name = firstName(u.name);
  return renderEmail({
    subject: `Dosto ko ${site.name} bhejo, har dost par ${rupees(REWARD_PAISE)} kamao`,
    heading: `${name ? `${name}, ` : ""}taiyari saath karo, paise bhi kamao`,
    preview: `Dost ko ${rupees(FRIEND_DISCOUNT_PAISE)} ki chhoot, aapko ${rupees(REWARD_PAISE)} wallet mein.`,
    paragraphs: [
      `Aapke dost bhi ${site.stateAdj} ke exams ki taiyari kar rahe hain? Unhe apna link bhejo.`,
      `Aapka link: ${link}`,
    ],
    points: [
      `Dost ko ${rupees(MIN_REFERRAL_PRICE_PAISE)} se upar ke plan par ${rupees(FRIEND_DISCOUNT_PAISE)} ki seedhi chhoot`,
      `Har dost ki kharid par aapke ${site.logo.initials} wallet mein ${rupees(REWARD_PAISE)}`,
      "Wallet ke paise agli series ya Pass kharidne mein lag jaate hain",
    ],
    cta: { label: "Mera referral page kholo", url: withUtm("/refer", site.url, tag) },
    after: "Link apne WhatsApp ya Telegram group mein share karo, jahan aapke dost exam ki baat karte hain.",
    why: offersWhy(site),
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
    if (category === "offers" ? !offersAllowed(u) : !u.emailReminders) {
      await skip(log.id, "unsubscribed");
      continue;
    }
    if (category === "offers" && !offerAllowed(await sentDates(u.id), now)) {
      // A follow-up is only worth sending soon after the test; the others can wait for a later day.
      if (kind === "free-followup") await skip(log.id, "frequency cap");
      else summary.left++;
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
          : kind === "nudge"
            ? await nudgeEmail(u)
            : kind === "referral-invite"
              ? await referralInviteEmail(site, u, `referral-invite-${log.refKey}`)
              : log.campaign
                ? campaignEmail(site, u.id, log.campaign, `${kind}-${log.campaign.id}`)
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
    if (!email || !isRealEmail(email) || !o.product.isActive || (o.user && !offersAllowed(o.user)) || boughtSince || remindedToday) {
      result.skipped++;
      continue;
    }
    const name = o.user ? firstName(o.user.name) : "";
    const site = getSite(o.site);
    const content = renderEmail({
      subject: `Aapka ${o.product.title} order adhoora reh gaya`,
      heading: `${name ? `${name}, ` : ""}aapka payment poora nahi hua`,
      preview: "Ek click mein dobara try karo, aapka plan wahi hai.",
      paragraphs: [
        `Aapne ${o.product.title} ka checkout shuru kiya tha, par payment poora nahi hua. UPI fail hona ya network chala jaana aam baat hai, aap ek click mein dobara try kar sakte ho.`,
      ],
      points: ["UPI, card, net banking, sab chalta hai", "Payment hote hi turant access", ...SERIES_POINTS.slice(0, 2)],
      cta: { label: "Payment poora karo", url: withUtm(`/buy/${o.product.slug}`, site.url, "checkout-reminder") },
      after: "Paise kat gaye par access nahi mila? Dobara pay mat karo. Aksar payment kuch minute mein apne aap jud jaata hai; na jude toh is email ka reply karo.",
      why: `Ye mail isliye aaya kyunki aapne ${site.name} pe payment shuru kiya tha. Ye sirf ek baar aata hai.`,
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
    NOT: { email: { endsWith: PHONE_PLACEHOLDER } },
    AND: [
      OFFERS_ALLOWED_WHERE,
      ...(examId
        ? [
            {
              OR: [
                { attempts: { some: { test: { examId } } } },
                { entitlements: { some: { revokedAt: null, product: { items: { some: { series: { examId } } } } } } },
              ],
            },
          ]
        : []),
    ],
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
  if (!users.length) return { ok: false, errors: ["Nobody in this audience can be emailed."] };
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

/** Saving the profile form is the student's own decision, so it is recorded even when the offers box did not change. */
export async function setEmailPreferences(userId: string, prefs: { offers: boolean; reminders: boolean }) {
  await db.user.update({ where: { id: userId }, data: { emailOffers: prefs.offers, emailOffersAt: new Date(), emailReminders: prefs.reminders } });
}

/** From an unsubscribe link: switches off one category for that student. */
export async function unsubscribe(userId: string, category: EmailCategory) {
  await db.user.updateMany({ where: { id: userId }, data: category === "offers" ? { emailOffers: false, emailOffersAt: new Date() } : { emailReminders: false } });
}

export async function getEmailPreferences(userId: string) {
  const u = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { email: true, emailOffers: true, emailOffersAt: true, emailReminders: true } });
  return { email: u.email, emailOffers: offersAllowed(u), emailReminders: u.emailReminders };
}

// ───────────── Admin panel ─────────────

export async function getEmailPanel(now = new Date()) {
  const real = { NOT: { email: { endsWith: PHONE_PLACEHOLDER } } };
  const since = new Date(now.getTime() - 30 * DAY);
  const [optedIn, reminders, users, sentToday, queued, byKind, campaigns, campaignCounts, recent, exams] = await Promise.all([
    db.user.count({ where: { ...real, ...OFFERS_ALLOWED_WHERE } }),
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
    configured: (!!process.env.RESEND_API_KEY || !!process.env.BREVO_API_KEY) && !!process.env.EMAIL_FROM,
    limit: dailyLimit(),
    optedIn,
    reminders,
    users,
    sentToday,
    queued,
    kinds: (["expiry", "free-followup", "nudge", "campaign", "announcement", "referral-invite"] as const).map((kind) => {
      const rows = byKind.filter((r) => r.kind === kind);
      return { kind, sent: count(rows, "SENT"), failed: count(rows, "FAILED"), skipped: count(rows, "SKIPPED"), queued: count(rows, "QUEUED") };
    }),
    campaigns: campaigns.map((c) => {
      const rows = campaignCounts.filter((r) => r.campaignId === c.id);
      return { ...c, audience: c.examId ? (examName.get(c.examId) ?? "One exam") : "Everyone", sent: count(rows, "SENT"), queued: count(rows, "QUEUED"), failed: count(rows, "FAILED"), skipped: count(rows, "SKIPPED") };
    }),
    recent,
    exams,
  };
}
