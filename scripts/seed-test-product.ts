// One-off: create a cheap test product to exercise the Razorpay checkout flow end-to-end.
// Usage: npx tsx scripts/seed-test-product.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const product = await db.product.upsert({
    where: { slug: "test-pass" },
    create: {
      slug: "test-pass",
      title: "Test Pass (₹1 — payment test)",
      kind: "PASS",
      priceInPaise: 100,
      validityDays: 30,
      isActive: true,
    },
    update: {},
  });
  console.log(`Product ready: /buy/${product.slug}`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
