// Honest value lines for price cards. A struck-out price is shown only for a pack, where it is the real total of
// buying the same series one by one today; nothing else gets a "was" price (a made-up reference price is misleading
// advertising under the CCPA guidelines).

/** Cheapest active single-series price for each series, keyed by series id. */
export type SeriesPrices = Map<string, number>;

/**
 * What the pack's series cost bought separately, or null when that is no saving (or a series has no price of its own,
 * so the total would not be real).
 */
export function separateTotalPaise(packPaise: number, seriesIds: string[], prices: SeriesPrices): number | null {
  if (seriesIds.length < 2) return null;
  let total = 0;
  for (const id of seriesIds) {
    const p = prices.get(id);
    if (p === undefined) return null;
    total += p;
  }
  return total > packPaise ? total : null;
}

/** Builds SeriesPrices from active SERIES products: the lowest price wins when two products sell the same series. */
export function cheapestBySeries(products: { priceInPaise: number; seriesIds: string[] }[]): SeriesPrices {
  const out: SeriesPrices = new Map();
  for (const p of products) {
    for (const id of p.seriesIds) {
      const seen = out.get(id);
      if (seen === undefined || p.priceInPaise < seen) out.set(id, p.priceInPaise);
    }
  }
  return out;
}

/** Whole-rupee saving and its percentage (rounded down, so the claim is never larger than the truth). */
export function saving(pricePaise: number, wasPaise: number): { paise: number; pct: number } {
  const paise = wasPaise - pricePaise;
  return { paise, pct: Math.floor((paise / wasPaise) * 100) };
}

/** "₹8 per test", rounded up to the rupee so it never understates; null for fewer than two tests. */
export function perTestLabel(pricePaise: number, testCount: number): string | null {
  if (testCount < 2) return null;
  const r = Math.ceil(pricePaise / 100 / testCount);
  return `₹${r.toLocaleString("en-IN")} per test`;
}
