-- SSC has its own Pass: a body flagged passExcluded is not opened by a state PASS.
ALTER TABLE "ExamBody" ADD COLUMN "passExcluded" BOOLEAN NOT NULL DEFAULT false;
