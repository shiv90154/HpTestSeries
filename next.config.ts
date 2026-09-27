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
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders(isDev) },
      ...privatePaths.map((source) => ({ source, headers: [{ key: "Cache-Control", value: "private, no-store" }] })),
    ];
  },
};

export default nextConfig;
