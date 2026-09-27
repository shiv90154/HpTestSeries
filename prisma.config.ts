import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
    // Only needed with `prisma dev` locally (it serves a single database per port).
    shadowDatabaseUrl: process.env["SHADOW_DATABASE_URL"],
  },
});
