import { describe, expect, it } from "vitest";
import { mock1 } from "../../../prisma/patwari/mock1";
import { SECTIONS, balanceAnswers, type PatwariQuestion } from "../../../prisma/patwari/types";
import { questionTextHash } from "./text-hash";

const mocks: Record<string, PatwariQuestion[]> = { mock1 };

async function loadOptional(name: string, file: string) {
  try {
    const mod = await import(/* @vite-ignore */ file);
    mocks[name] = mod[name];
  } catch {
    /* mock not written yet */
  }
}
await loadOptional("mock2", "../../../prisma/patwari/mock2");
await loadOptional("mock3", "../../../prisma/patwari/mock3");

const firstNumber = (s: string) => {
  const m = s.match(/-?\d[\d,]*\.?\d*/);
  return m ? Number(m[0].replaceAll(",", "")) : NaN;
};

describe.each(Object.entries(mocks))("HP Patwari %s", (_name, raw) => {
  const qs = balanceAnswers(raw);

  it("has 100 questions split by section", () => {
    expect(qs).toHaveLength(100);
    SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
  });

  it("keeps questions grouped by section in order", () => {
    const order = qs.map((x) => x.s);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("has 4 distinct options per language and a valid answer", () => {
    qs.forEach((x, i) => {
      const where = `#${i + 1} ${x.en[0].slice(0, 50)}`;
      for (const lang of [x.en, x.hi]) {
        expect(lang[0].trim().length, where).toBeGreaterThan(5);
        expect(lang[2].trim().length, where).toBeGreaterThan(5);
        expect(lang[1], where).toHaveLength(4);
        expect(new Set(lang[1].map((o) => o.trim())).size, `${where} duplicate options`).toBe(4);
        lang[1].forEach((o) => expect(o.trim().length, where).toBeGreaterThan(0));
      }
      expect([0, 1, 2, 3]).toContain(x.a);
    });
  });

  it("balancing keeps the correct option's text unchanged in both languages", () => {
    qs.forEach((x, i) => {
      expect(x.en[1][x.a], `#${i + 1}`).toBe(raw[i].en[1][raw[i].a]);
      expect(x.hi[1][x.a], `#${i + 1}`).toBe(raw[i].hi[1][raw[i].a]);
    });
  });

  it("does not put the correct answer in one position too often", () => {
    const counts = [0, 1, 2, 3].map((p) => qs.filter((x) => x.a === p).length);
    counts.forEach((c) => {
      expect(c).toBeGreaterThanOrEqual(15);
      expect(c).toBeLessThanOrEqual(35);
    });
  });

  it("is hard-leaning: at least 35% hard and at most 15% easy", () => {
    const hard = qs.filter((x) => x.d === "H").length;
    const easy = qs.filter((x) => x.d === "E").length;
    expect(hard).toBeGreaterThanOrEqual(35);
    expect(easy).toBeLessThanOrEqual(15);
  });

  it("matches computed answers for maths questions", () => {
    for (const x of qs.filter((y) => y.chk)) {
      const value = Function(`"use strict"; return (${x.chk});`)() as number;
      const shown = firstNumber(x.en[1][x.a]);
      expect(Math.abs(value - shown), `${x.en[0].slice(0, 60)} → computed ${value}, option ${x.en[1][x.a]}`).toBeLessThan(1e-6);
    }
  });
});

describe("HP Patwari series", () => {
  it("has no duplicate questions across mocks", () => {
    const hashes = Object.values(mocks).flatMap((qs) => qs.map((x) => questionTextHash(x.en[0])));
    expect(new Set(hashes).size).toBe(hashes.length);
  });
});
