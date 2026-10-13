-- The High Court series (5 full mocks + 8 sectionals each) and HP TET JBT (5 mocks + 6 sectionals) hold far more tests than
-- the 2-mock series, so they move from Rs 99 to Rs 149 and the High Court pack from Rs 199 to Rs 299. Only rows still at the old
-- seeded price change, so a price edited in the admin panel is kept.
UPDATE "Product" SET "priceInPaise" = 14900, "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" IN (
  'hp-high-court-process-server-mock-series',
  'hp-high-court-stenographer-mock-series',
  'hp-high-court-clerk-mock-series',
  'hp-tet-jbt-mock-series'
) AND "priceInPaise" = 9900;

UPDATE "Product" SET "priceInPaise" = 29900, "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'hp-high-court-pack' AND "priceInPaise" = 19900;
