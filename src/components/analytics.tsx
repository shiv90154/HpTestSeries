"use client";

import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";

// Google Analytics 4 and the Meta Pixel. Each site has its own GA property and pixel; the layout passes that site's IDs
// (see gaIdFor / metaPixelIdFor in src/sites/analytics.ts) and nothing loads without one.
// Page views: gtag's enhanced measurement tracks client-side navigations via the History API
// (GA4 → Admin → Data streams → Enhanced measurement → "Page changes based on browser history events").
// The pixel sends a PageView on its own for every pushState navigation, so neither needs a route listener.

type Gtag = (...args: unknown[]) => void;
type Params = Record<string, string | number | boolean>;

/** GA4 event → Meta standard event (or custom, for test starts/submits) that Meta ads can optimise for. */
function toMeta(event: string, params: Params): [method: "track" | "trackCustom", name: string, data: Params, eventID?: string] | null {
  const value = typeof params.value === "number" ? params.value : undefined;
  const content = params.item_name ?? params.test_slug;
  const base: Params = { ...(content !== undefined && { content_name: content }), ...(value !== undefined && { value, currency: "INR" }) };
  switch (event) {
    case "sign_up":
      return ["track", "CompleteRegistration", base];
    case "begin_checkout":
      return ["track", "InitiateCheckout", base];
    case "purchase":
      // Coupon unlocks are ₹0: reporting them as purchases would teach Meta to find people who don't pay.
      return value ? ["track", "Purchase", base, String(params.transaction_id ?? "") || undefined] : null;
    case "test_start":
    case "demo_start":
      return ["trackCustom", "StartTest", base];
    case "test_submit":
    case "demo_submit":
      return ["trackCustom", "SubmitTest", base];
    default:
      return null;
  }
}

/** Sends a GA4 event, and its Meta counterpart if it has one; a no-op when neither is loaded (dev, ad blockers, env unset). */
export function track(event: string, params: Params = {}) {
  const w = window as unknown as { gtag?: Gtag; fbq?: Gtag };
  if (w.gtag) w.gtag("event", event, params);
  const meta = w.fbq && toMeta(event, params);
  if (meta) {
    const [method, name, data, eventID] = meta;
    w.fbq!(method, name, data, ...(eventID ? [{ eventID }] : []));
  }
}

export function Analytics({ gaId, pixelId }: { gaId?: string; pixelId?: string }) {
  // Core Web Vitals from real users → GA4 events, to watch LCP/CLS/INP (a ranking factor).
  useReportWebVitals((metric) => {
    track(metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
