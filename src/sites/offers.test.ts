import { describe, expect, it } from "vitest";
import { OFFERS, activeOffer, timeLeft } from "./offers";

describe("offers", () => {
  it("shows the Patwari offer on hp only, until the night before the exam", () => {
    expect(activeOffer("hp", new Date("2026-11-10T10:00:00+05:30"))?.couponCode).toBe("PATWARI50");
    expect(activeOffer("pb", new Date("2026-11-10T10:00:00+05:30"))).toBeUndefined();
    expect(activeOffer("hp", new Date("2026-11-22T23:00:00+05:30"))).toBeDefined();
    expect(activeOffer("hp", new Date("2026-11-23T00:00:01+05:30"))).toBeUndefined();
  });

  it("prices the offer at exactly 50% off the strike-through price", () => {
    for (const o of OFFERS) expect(o.price).toBe(Math.floor(o.mrp / 2));
  });

  it("counts down in whole days, hours and minutes", () => {
    expect(timeLeft("2026-11-23T00:00:00+05:30", new Date("2026-11-20T21:30:00+05:30"))).toEqual({ days: 2, hours: 2, minutes: 30 });
    expect(timeLeft("2026-11-23T00:00:00+05:30", new Date("2026-11-24T00:00:00+05:30"))).toEqual({ days: 0, hours: 0, minutes: 0 });
  });
});
