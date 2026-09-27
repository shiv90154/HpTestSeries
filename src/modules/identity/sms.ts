import "server-only";

// OTP delivery via MSG91's Flow API (DLT-approved template required in India; BLUEPRINT §16).
// The template must contain a variable named `otp`, e.g. "##otp## is your HP Test Series login code".
// Verify the endpoint/payload against your MSG91 dashboard when you register the template.
const MSG91_FLOW_URL = "https://control.msg91.com/api/v5/flow";

export async function sendOtpSms(phoneNumber: string, code: string): Promise<void> {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_OTP_TEMPLATE_ID;

  if (!authKey || !templateId) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MSG91_AUTH_KEY / MSG91_OTP_TEMPLATE_ID are not configured");
    }
    // Local development: no SMS is sent; read the code from the server terminal.
    console.info(`[dev] OTP for ${phoneNumber}: ${code}`);
    return;
  }

  const res = await fetch(MSG91_FLOW_URL, {
    method: "POST",
    headers: { authkey: authKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      template_id: templateId,
      short_url: "0",
      recipients: [{ mobiles: phoneNumber.replace(/^\+/, ""), otp: code }],
    }),
  });

  if (!res.ok) {
    // Never log the code itself in production.
    throw new Error(`MSG91 send failed with status ${res.status}`);
  }
}
