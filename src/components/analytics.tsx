"use client";

import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";

// Google Analytics 4. Each site has its own GA property; the layout passes that site's measurement ID
// (see gaIdFor in src/sites/analytics.ts) and nothing loads without one.
// Page views: gtag's enhanced measurement tracks client-side navigations via the History API
// (GA4 → Admin → Data streams → Enhanced measurement → "Page changes based on browser history events").

type Gtag = (...args: unknown[]) => void;

/** Sends a GA4 event; a no-op when GA isn't loaded (dev, ad blockers, env unset). */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", event, params);
}

export function Analytics({ gaId }: { gaId?: string }) {
  // Core Web Vitals from real users → GA4 events, to watch LCP/CLS/INP (a ranking factor).
  useReportWebVitals((metric) => {
    track(metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
