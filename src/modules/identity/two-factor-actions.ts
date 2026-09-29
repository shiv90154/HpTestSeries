"use server";

import { headers } from "next/headers";
import QRCode from "qrcode";
import { z } from "zod";
import { consumeRateLimit } from "@/lib/rate-limit";
import { auth } from "./auth";
import { can } from "./permissions";
import { getCurrentUser } from "./session";
import { clearTwoFactorPassed, isTwoFactorEnabled, markTwoFactorPassed } from "./two-factor";

// Server actions behind /admin/security and /verify-2fa. They use getCurrentUser (not requirePermission)
// because they must work before the 2FA check has been passed.

const code = z.string().trim().min(6).max(32);
type Res<T = object> = ({ ok: true } & T) | { ok: false; error: string };

async function staffUser() {
  const user = await getCurrentUser();
  return user && can(user.role, "admin:access") ? user : null;
}

/** Checks a 6-digit app code, or a backup code, against the signed-in user's 2FA secret. */
async function checkCode(userId: string, raw: string): Promise<Res> {
  if (!(await consumeRateLimit(`2fa:${userId}`, 10 * 60, 8))) return { ok: false, error: "Too many attempts. Try again in 10 minutes." };
  const h = await headers();
  const c = code.safeParse(raw);
  if (!c.success) return { ok: false, error: "Enter the 6-digit code from your authenticator app." };
  try {
    if (/^\d{6}$/.test(c.data)) await auth.api.verifyTOTP({ headers: h, body: { code: c.data } });
    else await auth.api.verifyBackupCode({ headers: h, body: { code: c.data } });
    return { ok: true };
  } catch {
    return { ok: false, error: "That code is incorrect or has expired." };
  }
}

/** Step 1 of setup: creates a secret and returns the QR code plus one-time backup codes. */
export async function startTwoFactorSetupAction(): Promise<Res<{ qr: string; secretUri: string; backupCodes: string[] }>> {
  const user = await staffUser();
  if (!user) return { ok: false, error: "Not allowed." };
  if (await isTwoFactorEnabled(user.id)) return { ok: false, error: "Two-factor login is already on." };
  try {
    const res = await auth.api.enableTwoFactor({ headers: await headers(), body: {} });
    if (!("totpURI" in res) || !res.totpURI) return { ok: false, error: "Could not start setup." };
    return { ok: true, qr: await QRCode.toDataURL(res.totpURI, { margin: 1, width: 220 }), secretUri: res.totpURI, backupCodes: res.backupCodes ?? [] };
  } catch {
    return { ok: false, error: "Could not start setup. Please try again." };
  }
}

/** Step 2 of setup: the first valid code turns 2FA on. */
export async function confirmTwoFactorSetupAction(raw: string): Promise<Res> {
  const user = await staffUser();
  if (!user) return { ok: false, error: "Not allowed." };
  const res = await checkCode(user.id, raw);
  if (res.ok) await markTwoFactorPassed(user.id);
  return res;
}

/** Login-time check on /verify-2fa. */
export async function verifyTwoFactorAction(raw: string): Promise<Res> {
  const user = await staffUser();
  if (!user) return { ok: false, error: "Please log in again." };
  if (!(await isTwoFactorEnabled(user.id))) return { ok: true };
  const res = await checkCode(user.id, raw);
  if (res.ok) await markTwoFactorPassed(user.id);
  return res;
}

/** Turning 2FA off needs a valid code, so a stolen session alone can't do it. */
export async function disableTwoFactorAction(raw: string): Promise<Res> {
  const user = await staffUser();
  if (!user) return { ok: false, error: "Not allowed." };
  const res = await checkCode(user.id, raw);
  if (!res.ok) return res;
  try {
    await auth.api.disableTwoFactor({ headers: await headers(), body: {} });
  } catch {
    return { ok: false, error: "Could not turn off two-factor login." };
  }
  await clearTwoFactorPassed();
  return { ok: true };
}
