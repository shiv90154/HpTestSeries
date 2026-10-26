-- The first two HPRCA Clerk mocks were built from the shared bank on our own split: 120 minutes with a maths section.
-- The 2026 advertisement (13/2026, Post Code 26045) sets 120 questions in 90 minutes with no maths, so the seed now adds
-- five fresh mocks under new slugs (hprca-clerk-2026-full-mock-N); take the old ones out of their series and archive
-- them. Attempts on them stay in the database. next.config.ts redirects their old URLs to the new mocks.
DELETE FROM "SeriesTest"
WHERE "testId" IN (SELECT id FROM "Test" WHERE slug ~ '^hprca-clerk-full-mock-[0-9]+$');

UPDATE "Test" SET status = 'ARCHIVED'
WHERE slug ~ '^hprca-clerk-full-mock-[0-9]+$';
