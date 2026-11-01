// The previous-year-paper pack: one product per site, covering every PYQ paper that site shows (prisma/seed-pyq.ts).

/** Price when the pack is created, and what pages show if it is not on sale. Admin edits to the live price win. */
export const PYQ_PRICE_PAISE = 59_00;

/** hp keeps the original slug; every other site gets its own pack, e.g. previous-year-papers-pb. */
export const pyqProductSlug = (site: string) => (site === "hp" ? "previous-year-papers" : `previous-year-papers-${site}`);
