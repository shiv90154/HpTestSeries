-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "liveEndsAt" TIMESTAMP(3),
ADD COLUMN     "liveStartsAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "LivePrize" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "productId" TEXT,
    "winnerId" TEXT,
    "awardedAt" TIMESTAMP(3),

    CONSTRAINT "LivePrize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LivePrize_testId_rank_key" ON "LivePrize"("testId", "rank");

-- CreateIndex
CREATE INDEX "Test_liveStartsAt_idx" ON "Test"("liveStartsAt");

-- AddForeignKey
ALTER TABLE "LivePrize" ADD CONSTRAINT "LivePrize_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivePrize" ADD CONSTRAINT "LivePrize_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
