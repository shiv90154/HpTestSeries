import "server-only";
import { cookies } from "next/headers";
import { GUEST_COOKIE_MAX_AGE, GUEST_ORDER_COOKIE, parseClaimTokens, withClaimToken } from "./guest-tokens";
import { claimGuestOrders } from "./orders";

/** Remembers a guest order in this browser so the buyer can claim it after signing in. Server actions / route handlers only. */
export async function rememberGuestOrder(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(GUEST_ORDER_COOKIE, withClaimToken(jar.get(GUEST_ORDER_COOKIE)?.value, token), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GUEST_COOKIE_MAX_AGE,
  });
}

/**
 * Attaches whatever this browser (cookie) or this verified email paid for as a guest to the signed-in account.
 * Read-only on cookies, so it can run while rendering a page; claimed tokens simply stop matching.
 */
export async function claimGuestOrdersForUser(user: { id: string; email: string }): Promise<{ claimed: number; unlocked: number }> {
  const tokens = parseClaimTokens((await cookies()).get(GUEST_ORDER_COOKIE)?.value);
  return claimGuestOrders(user, tokens);
}
