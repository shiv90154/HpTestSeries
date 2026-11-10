import "server-only";
import { db } from "@/lib/db";
import { rupees } from "@/lib/money";
import { logError } from "@/lib/logger";
import { getSite } from "@/sites";
import { sendEmail } from "@/modules/identity/email";
import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { isRealEmail, renderEmail, withUtm } from "./rules";

const istDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

/**
 * "Payment received" mail, sent once when an order turns PAID (the caller only calls this for the request that made
 * the change). It is a receipt, not marketing, so it ignores the offers opt-out. A guest buyer gets a link to /claim,
 * where logging in with this email attaches the plan. Never throws: a mail problem must not undo a payment.
 */
export async function sendPurchaseConfirmation(orderId: string): Promise<void> {
  try {
    const o = await db.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        site: true,
        userId: true,
        payerEmail: true,
        amountPaise: true,
        walletPaise: true,
        user: { select: { name: true, email: true } },
        product: { select: { title: true, validityDays: true, validUntil: true } },
        entitlement: { select: { expiresAt: true } },
      },
    });
    if (!o) return;
    const email = o.user?.email ?? o.payerEmail;
    if (!email || !isRealEmail(email)) return;

    const site = getSite(o.site);
    const guest = !o.userId;
    const name = o.user?.name && o.user.name !== PLACEHOLDER_NAME ? o.user.name.split(/\s+/)[0] : "";
    const total = o.amountPaise + o.walletPaise;
    const until = o.entitlement?.expiresAt ?? o.product.validUntil;
    const stats = [
      { label: "Plan", value: o.product.title },
      { label: "Paid", value: total === 0 ? "Free" : rupees(total) },
      ...(until ? [{ label: "Valid till", value: istDate(until) }] : o.product.validityDays ? [{ label: "Validity", value: `${o.product.validityDays} days` }] : []),
    ];
    const content = renderEmail({
      subject: `Payment received: ${o.product.title}`,
      eyebrow: "Payment successful",
      heading: guest ? "Payment received. One step left" : "Your plan is unlocked",
      greeting: name,
      preview: guest ? "Log in with this email to unlock your plan." : `${o.product.title} is ready. Start your first test.`,
      paragraphs: [
        guest
          ? `Thank you! We received your payment for ${o.product.title}. Log in or sign up with this email address (${email}) and your plan is added to your account automatically.`
          : `Thank you! We received your payment and ${o.product.title} is now active on your account.`,
      ],
      stats,
      pointsTitle: "How to start",
      points: guest
        ? ["Tap the button below", "Log in or sign up with this same email", "Your tests open on the dashboard"]
        : ["Open your dashboard and pick a test", "Solutions and your all-India rank come after every test", "Your receipt is always under My plan"],
      cta: guest ? { label: "Unlock my plan", url: withUtm("/claim", site.url, "purchase-confirmation") } : { label: "Start practising", url: withUtm("/dashboard", site.url, "purchase-confirmation") },
      after: "Money deducted but something looks wrong? Reply to this email with your order number and we will sort it out.",
      why: `You are receiving this email because a payment of order ${o.id.slice(-8).toUpperCase()} was made on ${site.name}.`,
      site,
    });
    await sendEmail(email, content, `[dev] purchase confirmation for ${email}: ${content.subject}`, site);
  } catch (err) {
    await logError(err, { path: "purchase-confirmation" });
  }
}
