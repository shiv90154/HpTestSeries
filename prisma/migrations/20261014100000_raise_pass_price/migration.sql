-- The Premium Pass moves from Rs 399 to Rs 499: buying Police + Patwari separately costs Rs 398, so at Rs 399 the Pass added no
-- visible value. Only a row still at the old seeded price changes, so a price edited in the admin panel is kept.
UPDATE "Product" SET "priceInPaise" = 49900, "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'premium-pass' AND "priceInPaise" = 39900;
