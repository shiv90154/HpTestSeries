-- CreateEnum
CREATE TYPE "FinanceKind" AS ENUM ('EXPENSE', 'PAYOUT');

-- CreateEnum
CREATE TYPE "Partner" AS ENUM ('SHIV', 'NIKHIL');

-- CreateTable
CREATE TABLE "FinanceEntry" (
    "id" TEXT NOT NULL,
    "kind" "FinanceKind" NOT NULL,
    "partner" "Partner",
    "category" TEXT,
    "title" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinanceEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinanceEntry_kind_entryDate_idx" ON "FinanceEntry"("kind", "entryDate");

-- AddForeignKey
ALTER TABLE "FinanceEntry" ADD CONSTRAINT "FinanceEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
