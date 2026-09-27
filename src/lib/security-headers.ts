// Response headers for every route, applied from next.config.ts (nginx adds none of its own).
// The CSP follows Next's "without nonces" pattern: nonces would force every page to render
// dynamically, so inline scripts stay allowed and the policy instead pins origins, framing,
// plugins, <base> and form targets. Razorpay Checkout loads its script from checkout.razorpay.com
// and opens its iframe/API calls on other *.razorpay.com hosts.

type Header = { key: string; value: string };

export function contentSecurityPolicy(isDev: boolean): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://checkout.razorpay.com${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.razorpay.com",
    "font-src 'self' data:",
    `connect-src 'self' https://*.razorpay.com${isDev ? " ws: wss:" : ""}`,
    "frame-src https://*.razorpay.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];
  return directives.join("; ");
}

export function securityHeaders(isDev: boolean): Header[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(isDev) },
    // HSTS only in production: on localhost it would pin http://localhost to https.
    ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com" "https://api.razorpay.com")',
    },
    // Keeps Google sign-in and Razorpay popups able to talk back to the opener.
    { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  ];
}

/** Signed-in areas whose HTML must never land in a shared cache. */
export const privatePaths = ["/admin/:path*", "/dashboard/:path*", "/results/:path*", "/buy/:path*"];
