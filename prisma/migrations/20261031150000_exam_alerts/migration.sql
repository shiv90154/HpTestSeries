-- Emails left on exam pages (syllabus PDF and exam-date alert box), and the campaign mails sent to them.
CREATE TABLE "ExamAlert" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "site" TEXT NOT NULL DEFAULT 'hp',
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamAlert_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ExamAlertLog" (
    "id" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'QUEUED',
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "ExamAlertLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ExamAlert_email_examId_key" ON "ExamAlert"("email", "examId");
CREATE INDEX "ExamAlert_examId_idx" ON "ExamAlert"("examId");
CREATE UNIQUE INDEX "ExamAlertLog_alertId_campaignId_key" ON "ExamAlertLog"("alertId", "campaignId");
CREATE INDEX "ExamAlertLog_status_createdAt_idx" ON "ExamAlertLog"("status", "createdAt");

ALTER TABLE "ExamAlert" ADD CONSTRAINT "ExamAlert_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExamAlertLog" ADD CONSTRAINT "ExamAlertLog_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "ExamAlert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExamAlertLog" ADD CONSTRAINT "ExamAlertLog_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "EmailCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
