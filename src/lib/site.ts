export const site = {
  name: "HP Test Series",
  tagline: "Every Himachal government exam, practised in the real exam format.",
  taglineHi: "हिमाचल की हर सरकारी परीक्षा की तैयारी — असली CBT परीक्षा जैसे माहौल में।",
  description:
    "Affordable mock tests for HPRCA, HPPSC, HP Police, HP TET, Patwari and High Court exams. Real CBT exam interface, Hindi & English questions, detailed solutions and your rank among Himachal aspirants.",
  keywords: [
    "HP mock test",
    "Himachal GK mock test",
    "HPRCA mock test",
    "HP JOA IT mock test",
    "HPAS mock test",
    "HP TET mock test",
    "HP Police constable mock test",
    "HP Patwari mock test",
    "HP JBT TGT mock test",
    "HP Staff Nurse mock test",
    "HP High Court clerk mock test",
    "Himachal test series",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hptestseries.in",
  /** Brand blue (--primary) for places outside our CSS: browser chrome, Razorpay Checkout. */
  themeColor: "#1e4fd8",
} as const;

/** The free no-login mock linked from the header, footer, home and login pages (seeded by prisma/seed-demo.ts). */
export const FREE_MOCK_SLUG = "hp-gk-free-mock-1";
export const FREE_MOCK_HREF = `/tests/${FREE_MOCK_SLUG}`;

/** Only allow same-site relative redirects (blocks open redirects like `//evil.com` or `https://…`). */
export function safeNextPath(next: string | string[] | undefined, fallback = "/dashboard"): string {
  const value = Array.isArray(next) ? next[0] : next;
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
