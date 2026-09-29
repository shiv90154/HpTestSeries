import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Integration tests: real local Postgres + Razorpay TEST-mode API (keys from .env). Run: npm run test:integration
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // "server-only" throws outside a Next server build; the tests are server code, so make it a no-op.
      "server-only": fileURLToPath(new URL("./src/test/server-only-stub.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.itest.ts"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
});
