import "server-only";
import { buttonRow, emailBrand, emailColors, emailShell, esc, otpRows, paragraphRow } from "@/modules/email/layout";
import { istDayStart } from "@/modules/email/rules";
import { PRIMARY_SITE } from "@/sites";
import type { SiteConfig } from "@/sites/types";

// Login-code emails via Resend's REST API (free tier: 3,000/month, 100/day). Needs a verified
// sending domain: add the DNS records Resend shows for hptestseries.in, then set EMAIL_FROM. Another site's mail goes
// from EMAIL_FROM_<CODE> (e.g. EMAIL_FROM_PB) once its domain is verified, and from EMAIL_FROM until then.
const RESEND_URL = "https://api.resend.com/emails";

type Content = { subject: string; text: string; html: string };

const securityFooter = (site: SiteConfig) => `You get this because of an action on your ${site.name} account. If it was not you, ignore this email.`;

export function otpEmail(code: string, site: SiteConfig = PRIMARY_SITE): Content {
  const subject = `${code} is your ${site.name} login code`;
  const text = [
    `Your ${site.name} login code is ${code}`,
    "",
    "It is valid for 10 minutes. Do not share it with anyone — our team will never ask for it.",
    "",
    `आपका ${site.name} लॉगिन कोड ${code} है। यह 10 मिनट तक मान्य है। इसे किसी के साथ साझा न करें।`,
    "",
    "If you did not try to log in, you can ignore this email.",
  ].join("\n");
  const html = emailShell({
    preview: `${code} is your login code. Valid for 10 minutes.`,
    siteUrl: site.url,
    rows: otpRows(code, 10, site.name),
    footer: esc(securityFooter(site)),
    brand: emailBrand(site),
  });
  return { subject, text, html };
}

export async function sendOtpEmail(email: string, code: string, site: SiteConfig = PRIMARY_SITE): Promise<void> {
  if (!(await sendEmail(email, otpEmail(code, site), `[dev] Email OTP for ${email}: ${code}`, site))) {
    // Never log the code itself.
    throw new Error("Resend send failed");
  }
}

function resultReadyEmail(testTitle: string, attemptId: string, site: SiteConfig): Content {
  const url = `${site.url}/results/${attemptId}`;
  const subject = `Your result for "${testTitle}" is ready`;
  const text = [`Your result for "${testTitle}" is ready.`, "", `View it here: ${url}`].join("\n");
  const rows = [
    `<tr><td style="font-size:24px;line-height:1.3;font-weight:800;color:${emailColors.ink}">Your result is ready</td></tr>`,
    paragraphRow(`${testTitle} has been checked. See your score, rank, every solution and your weak topics.`, { top: 12 }),
    buttonRow("View result", url),
  ].join("\n");
  const html = emailShell({ preview: `${testTitle}: your score and rank are ready.`, siteUrl: site.url, rows, footer: esc(securityFooter(site)), brand: emailBrand(site) });
  return { subject, text, html };
}

/** Best-effort — a missing/broken email setup must never block grading or submission. */
export async function sendResultReadyEmail(email: string, testTitle: string, attemptId: string, site: SiteConfig = PRIMARY_SITE): Promise<void> {
  await sendEmail(email, resultReadyEmail(testTitle, attemptId, site), `[dev] Result-ready email for ${email}: ${testTitle}`, site);
}

function reportFixedEmail(questionPreview: string, site: SiteConfig): Content {
  const url = `${site.url}/dashboard`;
  const subject = "The question you reported has been corrected — thank you!";
  const text = [
    "Thank you for reporting a problem with this question:",
    "",
    `"${questionPreview}"`,
    "",
    "Our team has checked and corrected it. Results that include it now use the corrected version.",
    "",
    `आपकी रिपोर्ट के लिए धन्यवाद — यह प्रश्न ठीक कर दिया गया है।`,
    "",
    url,
  ].join("\n");
  const rows = [
    `<tr><td style="font-size:24px;line-height:1.3;font-weight:800;color:${emailColors.ink}">Thank you, it is fixed</td></tr>`,
    paragraphRow("You reported a problem with this question:", { top: 12 }),
    `<tr><td style="padding-top:12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="${emailColors.soft}" style="background:${emailColors.soft};border-left:4px solid ${emailColors.primary};border-radius:8px;padding:12px 14px;font-size:14px;line-height:1.55;color:${emailColors.muted};font-style:italic">&ldquo;${esc(questionPreview)}&rdquo;</td></tr></table></td></tr>`,
    paragraphRow("Our team has checked and corrected it. Results that include it now use the corrected version.", { top: 14 }),
    paragraphRow("आपकी रिपोर्ट के लिए धन्यवाद — यह प्रश्न ठीक कर दिया गया है।", { muted: true }),
    buttonRow("Open dashboard", url),
  ].join("\n");
  const html = emailShell({ preview: "Your report helped us correct a question.", siteUrl: site.url, rows, footer: esc(securityFooter(site)), brand: emailBrand(site) });
  return { subject, text, html };
}

/** Best-effort thank-you when a reported question is fixed. */
export async function sendReportFixedEmail(email: string, questionPreview: string, site: SiteConfig = PRIMARY_SITE): Promise<void> {
  await sendEmail(email, reportFixedEmail(questionPreview, site), `[dev] Report-fixed email for ${email}`, site);
}

// Brevo is the second sender (free tier: 300/day). Once Resend answers 429 (daily or monthly quota used up), the rest of
// the day's mail goes through Brevo; a mail Resend rejects for any other reason is retried there too. Brevo needs the
// same from-address verified as a sender (or its domain authenticated) in its dashboard.
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

/** Per Resend key: skipped until this instant after it reports its quota used up (next midnight in India). */
const resendPausedUntil = new Map<string, number>();

const nextIstMidnight = (now: number) => istDayStart(new Date(now)).getTime() + 24 * 60 * 60 * 1000;

/** "HP Test Series <login@hptestseries.in>" → { name, email }. */
function parseFrom(from: string): { name?: string; email: string } {
  const m = from.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  return m ? { ...(m[1] ? { name: m[1] } : {}), email: m[2].trim() } : { email: from.trim() };
}

type Mail = { to: string; from: string; content: Content; headers?: Record<string, string> };

async function viaResend(apiKey: string, m: Mail): Promise<boolean> {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from: m.from, to: [m.to], ...m.content, ...(m.headers ? { headers: m.headers } : {}) }),
  });
  if (res.status === 429) resendPausedUntil.set(apiKey, nextIstMidnight(Date.now()));
  // Resend explains rejections (unverified domain, bad "from", revoked key) in the body; keep it in the server log.
  if (!res.ok) console.error(`Resend rejected an email (${res.status}): ${(await res.text().catch(() => "")).slice(0, 300)}`);
  return res.ok;
}

async function viaBrevo(apiKey: string, m: Mail): Promise<boolean> {
  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: parseFrom(m.from),
      to: [{ email: m.to }],
      subject: m.content.subject,
      htmlContent: m.content.html,
      textContent: m.content.text,
      ...(m.headers ? { headers: m.headers } : {}),
    }),
  });
  if (!res.ok) console.error(`Brevo rejected an email (${res.status}): ${(await res.text().catch(() => "")).slice(0, 300)}`);
  return res.ok;
}

/**
 * Sends one email from the site's own address and provider accounts (EMAIL_FROM_<CODE>, RESEND_API_KEY_<CODE>,
 * BREVO_API_KEY_<CODE>; each falls back to the shared variable): Resend first, Brevo when Resend is out of quota or fails. Extra headers (e.g. List-Unsubscribe) are passed through. Locally it only logs.
 */
export async function sendEmail(
  email: string,
  content: { subject: string; text: string; html: string },
  devLogLine: string,
  site: SiteConfig = PRIMARY_SITE,
  headers?: Record<string, string>,
): Promise<boolean> {
  const env = (name: string) => process.env[`${name}_${site.code.toUpperCase()}`] || process.env[name];
  const resendKey = env("RESEND_API_KEY");
  const brevoKey = env("BREVO_API_KEY");
  const from = env("EMAIL_FROM");

  if ((!resendKey && !brevoKey) || !from) {
    if (process.env.NODE_ENV === "production") return false;
    // Local development: no email is sent.
    console.info(devLogLine);
    return true;
  }

  const mail = { to: email, from, content, headers };
  if (resendKey && Date.now() >= (resendPausedUntil.get(resendKey) ?? 0) && (await viaResend(resendKey, mail).catch(() => false))) return true;
  return brevoKey ? viaBrevo(brevoKey, mail).catch(() => false) : false;
}
