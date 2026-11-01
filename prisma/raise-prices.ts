// One-off price rise (Nov 2026). The seeds only set a price when a product is created, so changing the constant in code
// never reaches a live product. This moves a product to the new price only if it still has the old one, so any price
// you set by hand in /admin/products is left alone.
//   npx tsx prisma/raise-prices.ts          shows what would change
//   npx tsx prisma/raise-prices.ts --apply  does it
// Reasons: priced by paid tests, only where the price per test was low; the 2-mock ₹99 series stay as they are.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

/** slug → [old rupees, new rupees] */
const RISES: Record<string, [number, number]> = {
  "hp-police-constable-mock-series": [199, 249], // HP Police Constable: 9 full mocks + 12 subject tests
  "hp-patwari-mock-series": [199, 249], // HP Patwari: 7 full mocks + 14 subject tests
  "punjab-police-constable-mock-series": [199, 249], // PB Police: 7 mocks + 8 subject tests, 365 days
  "hprca-clerk-mock-series": [99, 129], // 5 mocks, a live drive
  "hp-tet-jbt-mock-series": [149, 179], // 5 mocks + 6 sectionals
  "hp-high-court-clerk-mock-series": [149, 179], // 5 mocks + 8 sectionals
  "hp-high-court-process-server-mock-series": [149, 179], // 7 mocks + 8 sectionals
  "hp-high-court-stenographer-mock-series": [149, 179], // 5 mocks + 8 sectionals
  "hp-tet-shastri-mock-series": [99, 149], // 2 mocks + sectionals
  "hp-high-court-pack": [299, 349], // the three High Court series, still well under buying them one by one
  "hp-tet-pack": [249, 299], // six TET series
};

const apply = process.argv.includes("--apply");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  for (const [slug, [from, to]] of Object.entries(RISES)) {
    const p = await db.product.findUnique({ where: { slug }, select: { priceInPaise: true } });
    if (!p) console.log(`${slug}: not in the database, skipped`);
    else if (p.priceInPaise !== from * 100) console.log(`${slug}: is ₹${p.priceInPaise / 100}, not ₹${from}, left alone`);
    else if (!apply) console.log(`${slug}: ₹${from} → ₹${to} (dry run)`);
    else {
      await db.product.update({ where: { slug }, data: { priceInPaise: to * 100 } });
      console.log(`${slug}: ₹${from} → ₹${to}`);
    }
  }
}

main().finally(() => db.$disconnect());
