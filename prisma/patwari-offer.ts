// Patwari exam-rush sale (HP Patwari exam starts 23 Nov 2026): 50% off the ₹398 series, so ₹199, until the night of 22 Nov.
// The popup that advertises it is configured in src/sites/offers.ts. Run order:
//   npx tsx prisma/raise-prices.ts --apply   moves the series from ₹249 to ₹398
//   npx tsx prisma/patwari-offer.ts          shows what would be created
//   npx tsx prisma/patwari-offer.ts --apply  creates the coupon (safe to repeat; it only updates the same code)
// Coupons are not tied to a product, so PATWARI50 also works on other series until it expires; maxUses caps that.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { endOfDayIst } from "../src/modules/commerce/coupon-input";

const CODE = "PATWARI50";
const MAX_USES = 500;
const apply = process.argv.includes("--apply");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const data = { pctOff: 50, flatOffPaise: null, maxUses: MAX_USES, validTill: endOfDayIst("2026-11-22"), affiliateTag: "patwari-sale", isActive: true };
  const p = await db.product.findUnique({ where: { slug: "hp-patwari-mock-series" }, select: { priceInPaise: true } });
  console.log(`Series price now ₹${p ? p.priceInPaise / 100 : "?"} (must be ₹398 for the popup to be truthful)`);
  if (!apply) return console.log(`${CODE}: 50% off, ${MAX_USES} uses, valid till 22 Nov 2026 (dry run)`);
  await db.coupon.upsert({ where: { code: CODE }, create: { code: CODE, ...data }, update: data });
  console.log(`${CODE} created/updated`);
}

main().finally(() => db.$disconnect());
