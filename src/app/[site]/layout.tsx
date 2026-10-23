import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Gurmukhi, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@/components/analytics";
import { notFound } from "next/navigation";
import { isSiteCode, siteStaticParams } from "@/sites";
import { currentSite } from "@/sites/current";
import { SiteProvider } from "@/sites/provider";
import { UiLangSync } from "@/components/ui-lang";
import { themeStyle } from "@/sites/theme";
import "../globals.css";

// Poppins has both Latin and Devanagari glyphs: one friendly UI font for English and Hindi.
// `subsets` only picks what is preloaded: Devanagari still loads (via unicode-range) on pages
// with Hindi text, but no longer competes with the first paint on every page (LCP).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
// Plainer reading fonts for question text inside the CBT, like real exam software. Not preloaded:
// most pages never use them, and preloading 4 extra files slowed every page's first paint.
const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"], display: "swap", preload: false });
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
// Punjabi (Gurmukhi) on pbtestseries.in. Never preloaded: the browser fetches it only for pages with Gurmukhi text.
const notoGurmukhi = Noto_Sans_Gurmukhi({
  variable: "--font-noto-gurmukhi",
  subsets: ["gurmukhi"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

// Every site is prerendered; src/proxy.ts maps each domain to its [site] segment. No `dynamicParams = false` here:
// it would also apply to every nested segment and turn on-demand pages (new tests, body redirects) into 404s.
export const generateStaticParams = siteStaticParams;

export async function generateMetadata(): Promise<Metadata> {
  const site = await currentSite();
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    keywords: [...site.keywords],
    openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
    twitter: { card: "summary_large_image" },
    // Per-site route handlers (app/[site]/icon.svg, apple-icon, manifest.webmanifest), so they are linked here.
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }], apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }] },
    manifest: "/manifest.webmanifest",
    alternates: { types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: `${site.name} — Exam Updates` }] } },
    // Only needed if the Search Console property is verified by HTML tag (DNS verification needs nothing here).
    ...(process.env.GOOGLE_SITE_VERIFICATION && site.code === "hp" && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
    // Soft launch: the site works on its domain but stays out of search until `launched` is flipped.
    ...(!site.launched && { robots: { index: false, follow: false } }),
  };
}

export async function generateViewport(): Promise<Viewport> {
  const site = await currentSite();
  return { themeColor: site.themeColor, width: "device-width", initialScale: 1 };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[site]">) {
  if (!isSiteCode((await params).site)) notFound();
  const site = await currentSite();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${notoSans.variable} ${notoDevanagari.variable} ${notoGurmukhi.variable} h-full antialiased`}
      style={themeStyle(site)}
    >
      <body className="flex min-h-full flex-col">
        <SiteProvider code={site.code}>
          <UiLangSync />
          {children}
          <Toaster position="top-center" richColors />
          <Analytics />
        </SiteProvider>
      </body>
    </html>
  );
}
