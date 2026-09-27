import type { NextConfig } from "next";

// Local `prisma dev` serves one DB connection at a time; set BUILD_WORKERS=1 there so parallel
// static-generation workers don't fight over it. Leave unset with real Postgres.
const buildWorkers = Number(process.env.BUILD_WORKERS) || undefined;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Bilingual question CSVs: ~1 KB/question (Devanagari is 3 bytes/char), up to 2000 rows per import.
      bodySizeLimit: "4mb",
    },
    ...(buildWorkers && { cpus: buildWorkers, staticGenerationMaxConcurrency: 1 }),
  },
};

export default nextConfig;
