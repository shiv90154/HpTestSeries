-- The first HP TET TGT mocks (Arts, Non-Medical, Medical) were built on our own section split, with a Hindi section.
-- The seed now adds mocks on the official HPBOSE split (November 2026 prospectus) under new slugs
-- (hp-tet-tgt-<stream>-2026-full-mock-N); take the old ones out of their series and archive them. Attempts on them
-- stay in the database. next.config.ts redirects their old URLs to the new mocks.
DELETE FROM "SeriesTest"
WHERE "testId" IN (SELECT id FROM "Test" WHERE slug ~ '^hp-tet-tgt-(arts|non-medical|medical)-full-mock-[0-9]+$');

UPDATE "Test" SET status = 'ARCHIVED'
WHERE slug ~ '^hp-tet-tgt-(arts|non-medical|medical)-full-mock-[0-9]+$';
