-- The HPAS series now has CSAT (Paper II) mocks as well as General Studies ones (prisma/seed-hpas-bank.ts). Its seeded
-- description named only General Studies; replace it while it is still the seeded text, so an admin edit is kept.
UPDATE "TestSeries"
SET description = 'Full-length HPAS prelims mock tests for both papers: Paper I General Studies (Himachal GK, Indian history and culture, polity and governance, geography and environment, economy, and science and technology) and Paper II CSAT (reasoning, basic numeracy and comprehension). Every question has a detailed solution in Hindi and English.'
WHERE slug = 'hpas-mock-test-series'
  AND description = 'Full-length HPAS prelims mock tests in the 100-question General Studies format: Himachal GK, Indian history and culture, polity and governance, geography and environment, economy, and science and technology. Every question has a detailed solution in Hindi and English.';
