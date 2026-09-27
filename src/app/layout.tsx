import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Devanagari, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Himachal Govt Exam Mock Tests in Real CBT Format`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: `${site.name} — Exam Updates` }] } },
  // Only needed if the Search Console property is verified by HTML tag (DNS verification needs nothing here).
  ...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
};

export const viewport: Viewport = {
  themeColor: "#1e4fd8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${notoSans.variable} ${notoDevanagari.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
