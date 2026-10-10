import "server-only";

// Login-code emails via Resend's REST API (free tier: 3,000/month, 100/day). Needs a verified
// sending domain: add the DNS records Resend shows for hptestseries.in, then set EMAIL_FROM.
const RESEND_URL = "https://api.resend.com/emails";

export function otpEmail(code: string): { subject: string; text: string; html: string } {
  const subject = `${code} is your HP Test Series login code`;
  const text = [
    `Your HP Test Series login code is ${code}`,
    "",
    "It is valid for 10 minutes. Do not share it with anyone — our team will never ask for it.",
    "",
    `आपका HP Test Series लॉगिन कोड ${code} है। यह 10 मिनट तक मान्य है। इसे किसी के साथ साझा न करें।`,
    "",
    "If you did not try to log in, you can ignore this email.",
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f1b33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border:1px solid #dfe5ef;border-radius:16px;padding:28px">
<tr><td style="font-size:18px;font-weight:bold;color:#1e4fd8">HP Test Series</td></tr>
<tr><td style="padding-top:16px;font-size:15px">Your login code is</td></tr>
<tr><td style="padding:12px 0;font-size:34px;font-weight:bold;letter-spacing:8px">${code}</td></tr>
<tr><td style="font-size:14px;color:#5b6b85">Valid for 10 minutes. Do not share it with anyone — our team will never ask for it.</td></tr>
<tr><td style="padding-top:12px;font-size:14px;color:#5b6b85">आपका लॉगिन कोड <b>${code}</b> है। यह 10 मिनट तक मान्य है। इसे किसी के साथ साझा न करें।</td></tr>
<tr><td style="padding-top:20px;font-size:12px;color:#8a97ad">If you did not try to log in, you can ignore this email.</td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html };
}

export async function sendOtpEmail(email: string, code: string): Promise<void> {
  if (!(await sendEmail(email, otpEmail(code), `[dev] Email OTP for ${email}: ${code}`))) {
    // Never log the code itself.
    throw new Error("Resend send failed");
  }
}

function resultReadyEmail(testTitle: string, attemptId: string): { subject: string; text: string; html: string } {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/results/${attemptId}`;
  const subject = `Your result for "${testTitle}" is ready`;
  const text = [`Your result for "${testTitle}" is ready.`, "", `View it here: ${url}`].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f1b33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border:1px solid #dfe5ef;border-radius:16px;padding:28px">
<tr><td style="font-size:18px;font-weight:bold;color:#1e4fd8">HP Test Series</td></tr>
<tr><td style="padding-top:16px;font-size:15px">Your result for <b>${testTitle}</b> is ready.</td></tr>
<tr><td style="padding-top:16px"><a href="${url}" style="display:inline-block;background:#1e4fd8;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">View result</a></td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html };
}

/** Best-effort — a missing/broken email setup must never block grading or submission. */
export async function sendResultReadyEmail(email: string, testTitle: string, attemptId: string): Promise<void> {
  await sendEmail(email, resultReadyEmail(testTitle, attemptId), `[dev] Result-ready email for ${email}: ${testTitle}`);
}

function reportFixedEmail(questionPreview: string): { subject: string; text: string; html: string } {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/dashboard`;
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
  const escaped = questionPreview.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f1b33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border:1px solid #dfe5ef;border-radius:16px;padding:28px">
<tr><td style="font-size:18px;font-weight:bold;color:#1e4fd8">HP Test Series</td></tr>
<tr><td style="padding-top:16px;font-size:15px">Thank you for reporting a problem with this question:</td></tr>
<tr><td style="padding:12px 0;font-size:14px;color:#5b6b85;font-style:italic">&ldquo;${escaped}&rdquo;</td></tr>
<tr><td style="font-size:15px">Our team has checked and corrected it. Results that include it now use the corrected version.</td></tr>
<tr><td style="padding-top:12px;font-size:14px;color:#5b6b85">आपकी रिपोर्ट के लिए धन्यवाद — यह प्रश्न ठीक कर दिया गया है।</td></tr>
<tr><td style="padding-top:16px"><a href="${url}" style="display:inline-block;background:#1e4fd8;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Open dashboard</a></td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html };
}

/** Best-effort thank-you when a reported question is fixed. */
export async function sendReportFixedEmail(email: string, questionPreview: string): Promise<void> {
  await sendEmail(email, reportFixedEmail(questionPreview), `[dev] Report-fixed email for ${email}`);
}

/** Sends one email through Resend; extra headers (e.g. List-Unsubscribe) are passed through. Locally it only logs. */
export async function sendEmail(
  email: string,
  content: { subject: string; text: string; html: string },
  devLogLine: string,
  headers?: Record<string, string>,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") return false;
    // Local development: no email is sent.
    console.info(devLogLine);
    return true;
  }

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [email], ...content, ...(headers ? { headers } : {}) }),
  });
  // Resend explains rejections (unverified domain, bad "from", revoked key) in the body; keep it in the server log.
  if (!res.ok) console.error(`Resend rejected an email (${res.status}): ${(await res.text().catch(() => "")).slice(0, 300)}`);
  return res.ok;
}
