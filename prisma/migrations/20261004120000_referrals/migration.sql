-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "referrerId" TEXT,
ADD COLUMN     "rewardOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_rewardOrderId_key" ON "Coupon"("rewardOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_referrerId_key" ON "Coupon"("referrerId");

-- CreateIndex
CREATE INDEX "Coupon_ownerId_idx" ON "Coupon"("ownerId");

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
