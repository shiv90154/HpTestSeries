import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "@/lib/db";

// Optional TOTP (authenticator app) for staff accounts. Better Auth's twoFactor plugin only guards
// password sign-in, but this site signs in with Google and email codes, so the check is done here
// instead: a staff member who turned 2FA on must present a signed "2fa-passed" cookie before any
// admin page or action works (see requirePermission in session.ts).

const COOKIE = "hp_2fa";
const MAX_AGE_SEC = 12 * 60 * 60;

function secret(): string {
  const s = process.env.BETTER_AUTH_SECRET;
  if (!s) throw new Error("BETTER_AUTH_SECRET is not set.");
  return s;
}

function sign(userId: string, exp: number): string {
  return createHmac("sha256", secret()).update(`2fa|${userId}|${exp}`).digest("base64url");
}

/** Whether this cookie value proves `userId` passed 2FA recently. Exported for tests. */
export function isValidTwoFactorCookie(value: string | undefined, userId: string, now = Date.now()): boolean {
  if (!value) return false;
  const [exp, mac] = value.split(".");
  const expNum = Number(exp);
  if (!mac || !Number.isFinite(expNum) || expNum < now) return false;
  const expected = Buffer.from(sign(userId, expNum));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export const isTwoFactorEnabled = cache(async (userId: string): Promise<boolean> => {
  const u = await db.user.findUnique({ where: { id: userId }, select: { twoFactorEnabled: true } });
  return !!u?.twoFactorEnabled;
});

export async function hasPassedTwoFactor(userId: string): Promise<boolean> {
  return isValidTwoFactorCookie((await cookies()).get(COOKIE)?.value, userId);
}

/** Only call after a code has been verified. Server actions / route handlers only. */
export async function markTwoFactorPassed(userId: string): Promise<void> {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  (await cookies()).set(COOKIE, `${exp}.${sign(userId, exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearTwoFactorPassed(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
