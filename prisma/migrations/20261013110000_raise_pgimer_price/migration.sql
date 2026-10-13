-- PGIMER Nursing Officer now has 5 full mocks, so it moves from Rs 99 to Rs 149 like the other deep series. Only a row still at the old
-- seeded price changes, so a price edited in the admin panel is kept.
UPDATE "Product" SET "priceInPaise" = 14900, "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pgimer-nursing-officer-mock-series' AND "priceInPaise" = 9900;
