-- Multi-site (docs/MULTI-SITE-PLAN.md, Phase 3): one app serves hptestseries.in, pbtestseries.in, ...
-- Every existing row belongs to the HP site.

-- Which sites show an exam body: ["hp"], ["pb"], or ["*"] for national bodies shown everywhere.
ALTER TABLE "ExamBody" ADD COLUMN "sites" TEXT[] NOT NULL DEFAULT ARRAY['hp']::TEXT[];
UPDATE "ExamBody" SET "sites" = ARRAY['*']::TEXT[] WHERE slug IN ('upsc', 'iaf', 'delhi-police');
UPDATE "ExamBody" SET "sites" = ARRAY['hp', 'pb']::TEXT[] WHERE slug = 'pgimer';
ALTER TABLE "ExamBody" DROP COLUMN "state";

-- Site of a test that has no exam (state GK mocks); tests with an exam follow the exam's body.
ALTER TABLE "Test" ADD COLUMN "site" TEXT NOT NULL DEFAULT 'hp';

-- A PASS covers the series shown on its own site; other products follow their series' exams.
ALTER TABLE "Product" ADD COLUMN "site" TEXT NOT NULL DEFAULT 'hp';

ALTER TABLE "Post" ADD COLUMN "site" TEXT NOT NULL DEFAULT 'hp';
ALTER TABLE "Order" ADD COLUMN "site" TEXT NOT NULL DEFAULT 'hp';
ALTER TABLE "user" ADD COLUMN "signupSite" TEXT NOT NULL DEFAULT 'hp';

CREATE INDEX "Post_site_status_publishedAt_idx" ON "Post"("site", "status", "publishedAt");
