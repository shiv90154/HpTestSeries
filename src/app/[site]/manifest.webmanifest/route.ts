import type { MetadataRoute } from "next";
import { metadataResponse } from "@/lib/metadata-route";
import { freeMockHref, getSite, type SiteConfig } from "@/sites";
import { siteStaticParams } from "@/sites";

// Makes the site installable ("Add to Home screen" / install prompt on Android Chrome). The service worker (sw.js)
// adds push notifications and an offline page, but never caches pages (a cached shell can pin students to an old
// build). The CBT keeps answers in localStorage and retries when offline.
export const dynamic = "force-static";

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

function manifest(site: SiteConfig): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    prefer_related_applications: false,
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: site.themeColor,
    lang: "en-IN",
    categories: ["education"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Free mock test", short_name: "Free mock", url: freeMockHref(site) },
      { name: "My dashboard", short_name: "Dashboard", url: "/dashboard" },
      { name: "All mock tests", short_name: "Tests", url: "/tests" },
    ],
  };
}

export async function GET(_req: Request, ctx: RouteContext<"/[site]/manifest.webmanifest">) {
  return metadataResponse("manifest", manifest(getSite((await ctx.params).site)));
}
