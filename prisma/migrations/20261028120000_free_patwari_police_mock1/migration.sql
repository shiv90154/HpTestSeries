-- HP Patwari and HP Police Constable Full Mock 1 were paid with a 50% demo. Students search "hp patwari mock test free"
-- and "hp police constable mock test free", and the High Court exams, whose first full mock is free in full, rank on
-- page one for theirs. Make both first mocks free in full; the seed (prisma/patwari, prisma/police) does the same for a
-- new database. Mocks 2 onwards stay paid.
UPDATE "Test" SET "isFree" = true, "demoPercent" = 0
WHERE slug IN ('hp-patwari-full-mock-1', 'hp-police-constable-full-mock-1');
