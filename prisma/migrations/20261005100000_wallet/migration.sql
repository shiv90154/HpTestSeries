-- Referral rewards move from single-use coupons to the HP wallet.
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_ownerId_fkey";
DROP INDEX "Coupon_ownerId_idx";
DROP INDEX "Coupon_rewardOrderId_key";
ALTER TABLE "Coupon" DROP COLUMN "ownerId", DROP COLUMN "rewardOrderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "walletPaise" INTEGER NOT NULL DEFAULT 0;

-- CreateEnum
CREATE TYPE "WalletTxType" AS ENUM ('REFERRAL_REWARD', 'REFERRAL_REVERSAL', 'PURCHASE', 'REFUND', 'ADMIN');

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "type" "WalletTxType" NOT NULL,
    "orderId" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WalletTransaction_userId_createdAt_idx" ON "WalletTransaction"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WalletTransaction_type_orderId_key" ON "WalletTransaction"("type", "orderId");

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
