// Wipes all orders and the revenue they made (e.g. test purchases before launch), together with what hangs off them:
// payments, the purchase/coupon entitlements they granted, their wallet ledger rows, and coupon use counts.
// Users, tests, products, coupons and admin-granted access are kept.
// Usage: npm run clear-orders            (dry run: only prints what would be deleted)
//        npm run clear-orders -- --yes   (deletes, in one transaction)
// Take a database backup first (pg_dump); this cannot be undone.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const confirmed = process.argv.includes("--yes");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const [orders, paid, payments, entitlements, walletRows, coupons] = await Promise.all([
    db.order.count(),
    db.order.aggregate({ where: { status: "PAID" }, _count: true, _sum: { amountPaise: true } }),
    db.payment.count(),
    db.entitlement.count({ where: { orderId: { not: null } } }),
    db.walletTransaction.count({ where: { orderId: { not: null } } }),
    db.coupon.count({ where: { usedCount: { gt: 0 } } }),
  ]);
  console.log(
    `Orders: ${orders} (${paid._count} paid, ₹${(paid._sum.amountPaise ?? 0) / 100} revenue)\n` +
      `Payments: ${payments}\nEntitlements from orders: ${entitlements}\nWallet rows tied to orders: ${walletRows}\n` +
      `Coupons with a use count to reset: ${coupons}`,
  );
  if (!confirmed) {
    console.log("\nDry run. Run again with --yes to delete all of the above.");
    return;
  }

  await db.$transaction([
    db.entitlement.deleteMany({ where: { orderId: { not: null } } }),
    db.walletTransaction.deleteMany({ where: { orderId: { not: null } } }),
    db.payment.deleteMany(),
    db.order.deleteMany(),
    db.coupon.updateMany({ where: { usedCount: { gt: 0 } }, data: { usedCount: 0 } }),
    db.auditLog.create({
      data: { entity: "order", entityId: "*", action: "clear-orders", diff: { orders, payments, entitlements, walletRows, coupons } },
    }),
  ]);
  console.log("\nDeleted. Orders and revenue are now empty.");
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
