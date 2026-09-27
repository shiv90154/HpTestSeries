export const site = {
  name: "HP Test Series",
  tagline: "Every Himachal government exam, practised in the real exam format.",
  taglineHi: "हिमाचल की हर सरकारी परीक्षा की तैयारी — असली CBT परीक्षा जैसे माहौल में।",
  description:
    "Affordable mock tests for HPRCA, HPPSC, HP Police, HP TET and Patwari exams. Real CBT exam interface, Hindi & English questions, detailed solutions and your rank among Himachal aspirants.",
  keywords: [
    "HP mock test",
    "Himachal GK mock test",
    "HPRCA mock test",
    "HP JOA IT mock test",
    "HPAS mock test",
    "HP TET mock test",
    "HP Police constable mock test",
    "HP Patwari mock test",
    "Himachal test series",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hptestseries.in",
} as const;

/** Only allow same-site relative redirects (blocks open redirects like `//evil.com` or `https://…`). */
export function safeNextPath(next: string | string[] | undefined, fallback = "/dashboard"): string {
  const value = Array.isArray(next) ? next[0] : next;
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
