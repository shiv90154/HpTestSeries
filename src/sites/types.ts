// One state site served from this app. Everything that differs between hptestseries.in, pbtestseries.in, ...
// lives in a SiteConfig; shared code reads the request's site instead of hard-coding a state.
// See docs/MULTI-SITE-PLAN.md.

export const SITE_CODES = ["hp", "pb"] as const;
export type SiteCode = (typeof SITE_CODES)[number];

/** Colour tokens from globals.css that a site may override. */
export type ThemeToken =
  | "primary"
  | "primary-strong"
  | "primary-soft"
  | "accent"
  | "accent-strong"
  | "accent-ink"
  | "accent-soft"
  | "cbt-header"
  | "hero-dark"
  | "hero-glow"
  | "footer";

export type SiteConfig = {
  /** URL segment inside the app and the value stored in the DB. */
  code: SiteCode;
  /** false = live but noindex, out of the sitemap, not linked from other sites (soft launch). */
  launched: boolean;
  /** Hosts this site answers on; the first is canonical. */
  domains: string[];
  /** Canonical origin, no trailing slash. */
  url: string;
  name: string;
  /** Home-screen label (PWA short_name). */
  shortName: string;
  stateName: string;
  stateNameHi: string;
  /** Short state name used as an adjective: "Himachal" in "Himachal aspirants", "Himachal exams". */
  stateAdj: string;
  /** The same in Hindi: "हिमाचल". */
  stateAdjHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  keywords: string[];
  /** Default <title> of the home page. */
  title: string;
  /** Brand colour outside our CSS: browser chrome, Razorpay Checkout. Same as theme.primary. */
  themeColor: string;
  /** Tokens that differ from globals.css (which holds the HP defaults). */
  theme: Partial<Record<ThemeToken, string>>;
  /**
   * Logo: the wordmark prefix ("HP" Test Series), the mark's fill and sun colours, and the landscape drawn
   * inside the answer bubble (Himalayan peaks for HP, fields for Punjab). See src/lib/brand-mark.ts.
   */
  logo: { initials: string; fill: string; accent: string; landscape: "peaks" | "fields" };
  /** Share-image (OG) background, dark to light, and the exam line under the headline. */
  og: { gradient: [string, string, string]; exams: string };
  /** The free no-login mock linked from the header, footer, home and login pages. */
  freeMockSlug: string;
  /** The state GK page: /himachal on hp, /punjab on pb. */
  statePage: { slug: string; title: string };
  districts: readonly string[];
  /** Open WhatsApp group for exam news; omitted until the site has one. */
  whatsappGroupUrl?: string;
  /** The site's own profiles (Organization.sameAs, footer). Never another site's. */
  social: { youtube?: string; instagram?: string; telegram?: string };
  /** Partner reading guide linked as "Explore" in the header; omitted where there is none. */
  exploreUrl?: string;
  /** The state's main exams for running copy: "HPRCA, HPPSC, HP Police, HP TET and Patwari". */
  examList: string;
  /** Exams named in the pricing page description, before "and more": "Patwari, Police, JOA IT". */
  pricingExams: string;
  /** Exams named in the previous-year-papers description, in brackets. */
  pyqExams: string;
  /** A longer list of exam names for page descriptions. */
  examListLong: string;
  /** Bodies whose CBT screen ours copies: "HPRCA and HPPSC". */
  cbtBodies: string;
  /** Home page FAQ answer to "Which exams are covered?". */
  examsCoveredFaq: string;
  /** Recruiting bodies named in the footer's "not affiliated with" line. */
  disclaimerBodies: string;
  /** From-address for this site's emails. */
  emailFrom: string;
};
