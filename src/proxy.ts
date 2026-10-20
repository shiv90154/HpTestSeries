import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { PRIMARY_SITE, SITE_CODES, siteFromHost } from "@/sites";

const PROTECTED = /^\/(dashboard|admin)(\/|$)/;
const SITE_IMAGE = new RegExp(`^/(${SITE_CODES.join("|")})(/.*)?/(opengraph-image|twitter-image)(-[\\w]+)?$`);

// One app, one domain per state (docs/MULTI-SITE-PLAN.md). Every page lives under app/[site]/; this maps the
// request's host to its site and rewrites internally, so visitors never see the /hp or /pb segment and each
// site's pages stay static (ISR) instead of reading the Host header while rendering.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const site = siteFromHost(request.headers.get("host"));

  // Staff sign in on one domain only.
  if (site.code !== PRIMARY_SITE.code && /^\/admin(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(pathname + search, PRIMARY_SITE.url));
  }

  // Optimistic check only (cookie presence) to skip rendering protected pages for logged-out users.
  // Real authorisation happens in requireUser/requirePermission on the server.
  if (PROTECTED.test(pathname) && !getSessionCookie(request)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // Next builds the og:image / twitter:image URLs of pages from their internal path (/hp/hprca/joa-it/opengraph-image),
  // so those already carry a site segment and are served as they are.
  if (SITE_IMAGE.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${site.code}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except route handlers that are not per site, Next internals and uploaded images.
  matcher: ["/((?!api/|_next/|uploads/|favicon.ico$).*)"],
};
