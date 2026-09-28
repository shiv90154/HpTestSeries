import type { MetadataRoute } from "next";
import { FREE_MOCK_HREF, site } from "@/lib/site";

// Makes the site installable ("Add to Home screen" / install prompt on Android Chrome). Per the Next.js PWA
// guide a manifest over HTTPS is enough to install; there is deliberately no offline service worker (a cached
// shell can pin students to an old build). The CBT keeps answers in localStorage and retries when offline.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: "HP Tests",
    description: site.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
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
      { name: "Free mock test", short_name: "Free mock", url: FREE_MOCK_HREF },
      { name: "My dashboard", short_name: "Dashboard", url: "/dashboard" },
      { name: "All mock tests", short_name: "Tests", url: "/tests" },
    ],
  };
}
