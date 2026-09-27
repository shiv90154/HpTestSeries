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
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY / EMAIL_FROM are not configured");
    }
    // Local development: no email is sent; read the code from the server terminal.
    console.info(`[dev] Email OTP for ${email}: ${code}`);
    return;
  }

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [email], ...otpEmail(code) }),
  });
  if (!res.ok) {
    // Never log the code itself.
    throw new Error(`Resend send failed with status ${res.status}`);
  }
}
