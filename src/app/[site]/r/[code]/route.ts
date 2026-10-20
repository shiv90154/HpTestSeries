import { NextResponse } from "next/server";
import { getSite } from "@/sites";
import { normalizeCode } from "@/modules/commerce/coupon-input";
import { isReferralLinkCode, REFERRAL_COOKIE, REFERRAL_COOKIE_MAX_AGE } from "@/modules/commerce/referral-rules";

/**
 * A shared referral link. Remembers the code in a cookie so the buy page can pre-fill it, then lands on the
 * pricing page. The code is only a coupon code: it is validated when the student applies it, so nothing here is trusted.
 */
export async function GET(_request: Request, ctx: RouteContext<"/[site]/r/[code]">) {
  const { site: siteCode, code } = await ctx.params;
  const site = getSite(siteCode);
  // Not request.url: behind nginx that carries the internal address (localhost:3000), not the public host.
  const res = NextResponse.redirect(new URL("/pricing", site.url));
  const normalized = normalizeCode(decodeURIComponent(code));
  if (isReferralLinkCode(normalized)) {
    res.cookies.set(REFERRAL_COOKIE, normalized, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: REFERRAL_COOKIE_MAX_AGE,
    });
  }
  return res;
}
