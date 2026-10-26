import type { NextConfig } from "next";
import { privatePaths, securityHeaders } from "./src/lib/security-headers";

// Local `prisma dev` serves one DB connection at a time; set BUILD_WORKERS=1 there so parallel
// static-generation workers don't fight over it. Leave unset with real Postgres.
const buildWorkers = Number(process.env.BUILD_WORKERS) || undefined;
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Self-contained server.js + traced node_modules for the Docker image (deploy/).
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Bilingual question CSVs: ~1 KB/question (Devanagari is 3 bytes/char), up to 2000 rows per import.
      bodySizeLimit: "4mb",
    },
    ...(buildWorkers && { cpus: buildWorkers, staticGenerationMaxConcurrency: 1 }),
  },
  // Old URLs Google still has (Search Console reports them as 404): send them to the exam page that replaced them.
  async redirects() {
    return [
      { source: "/exams/hp-police", destination: "/hp-police", permanent: true },
      { source: "/tests/pgimer-nursing-officer", destination: "/pgimer/nursing-officer", permanent: true },
      { source: "/tests/hppsc-ado", destination: "/hppsc/ado", permanent: true },
      { source: "/tests/hppsc-assistant-professor", destination: "/hppsc/assistant-professor", permanent: true },
      // HP TET TGT mocks were rebuilt on the official HPBOSE split under new slugs (October 2026).
      ...["arts", "non-medical", "medical"].flatMap((stream) => [
        { source: `/tests/hp-tet-tgt-${stream}-full-mock-:n(\\d+)`, destination: `/tests/hp-tet-tgt-${stream}-2026-full-mock-:n`, permanent: true },
        { source: `/tests/hp-tet-tgt-${stream}-full-mock-:n(\\d+)/:rest*`, destination: `/tests/hp-tet-tgt-${stream}-2026-full-mock-:n`, permanent: true },
      ]),
      // HPRCA Clerk mocks were rebuilt on the 2026 pattern (120 questions, 90 minutes) under new slugs (October 2026).
      { source: "/tests/hprca-clerk-full-mock-:n(\\d+)", destination: "/tests/hprca-clerk-2026-full-mock-:n", permanent: true },
      { source: "/tests/hprca-clerk-full-mock-:n(\\d+)/:rest*", destination: "/tests/hprca-clerk-2026-full-mock-:n", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders(isDev) },
      // Share-preview images: social crawlers still fetch them, but Google should not list them as pages.
      { source: "/:path(.*opengraph-image.*)", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      ...privatePaths.map((source) => ({ source, headers: [{ key: "Cache-Control", value: "private, no-store" }] })),
    ];
  },
};

export default nextConfig;
