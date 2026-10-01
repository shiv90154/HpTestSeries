// The all-access Premium Pass: one ₹399 purchase opens every paid mock, sectional test and previous-year paper
// for a year. PASS products need no ProductItem rows, so it also covers tests added later. Price and title are
// only set on creation, so later edits in the admin panel are kept.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

export const PREMIUM_PASS_SLUG = "premium-pass";

export async function seedPremiumPass(db: PrismaClient) {
  await db.product.upsert({
    where: { slug: PREMIUM_PASS_SLUG },
    update: {},
    create: {
      slug: PREMIUM_PASS_SLUG,
      title: "Premium Pass — All Mocks + All Previous Year Papers",
      titleHi: "प्रीमियम पास — सभी मॉक टेस्ट + सभी पिछले वर्ष के प्रश्न पत्र",
      kind: "PASS",
      priceInPaise: 399_00,
      validityDays: 365,
      isActive: true,
    },
  });
  // Placeholder pass created by hand in the admin panel before this one existed
  await db.product.updateMany({ where: { slug: "shiv", kind: "PASS" }, data: { isActive: false } });
}

if (process.argv[1]?.endsWith("seed-pass.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedPremiumPass(db)
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    })
    .finally(() => db.$disconnect());
}
