import { describe, expect, it } from "vitest";
import { examCategory, matchesSearch, sortForDirectory } from "./directory";

describe("examCategory", () => {
  it("groups exams by job", () => {
    expect(examCategory("hp-high-court", "process-server")).toBe("court");
    expect(examCategory("hppsc", "judicial-services")).toBe("court");
    expect(examCategory("hp-police", "sub-inspector")).toBe("police");
    expect(examCategory("delhi-police", "constable")).toBe("police");
    expect(examCategory("pgimer", "nursing-officer")).toBe("medical");
    expect(examCategory("hprca", "staff-nurse")).toBe("medical");
    expect(examCategory("hpbose", "hp-tet")).toBe("teaching");
    expect(examCategory("hprca", "tgt")).toBe("teaching");
    expect(examCategory("hpsebl", "lineman")).toBe("engineering");
    expect(examCategory("hprca", "junior-engineer")).toBe("engineering");
    expect(examCategory("hprca", "forest-guard")).toBe("forest");
    expect(examCategory("hppsc", "ado")).toBe("forest");
    expect(examCategory("hppsc", "hpas")).toBe("officer");
    expect(examCategory("hprca", "joa-it")).toBe("clerk");
    expect(examCategory("hp-revenue", "patwari")).toBe("clerk");
    expect(examCategory("upsc", "nda")).toBe("defence");
    expect(examCategory("iaf", "afcat")).toBe("defence");
  });
});

describe("sortForDirectory", () => {
  it("puts popular exams first in their own order, then the biggest", () => {
    const e = (href: string, tests: number) => ({ href, tests, papers: 0 });
    const sorted = sortForDirectory([e("/hprca/clerk", 30), e("/pgimer/nursing-officer", 5), e("/hp-police/constable", 40), e("/hp-high-court/process-server", 10)]);
    expect(sorted.map((x) => x.href)).toEqual(["/hp-high-court/process-server", "/pgimer/nursing-officer", "/hp-police/constable", "/hprca/clerk"]);
  });
});

describe("matchesSearch", () => {
  it("needs every word, ignores case, and matches Hindi", () => {
    expect(matchesSearch("hc clerk", ["HP High Court Clerk", "hc"])).toBe(true);
    expect(matchesSearch("hc nurse", ["HP High Court Clerk", "hc"])).toBe(false);
    expect(matchesSearch("  ", ["anything"])).toBe(true);
    expect(matchesSearch("पटवारी", ["HP Patwari", "एचपी पटवारी"])).toBe(true);
  });

  it("forgives a typo or two", () => {
    expect(matchesSearch("patwri", ["HP Patwari"])).toBe(true); // missing letter
    expect(matchesSearch("proces servr", ["HP High Court Process Server"])).toBe(true);
    expect(matchesSearch("constabel", ["HP Police Constable"])).toBe(true); // swapped letters
    expect(matchesSearch("stenografer", ["HP High Court Stenographer"])).toBe(true);
    expect(matchesSearch("nursng", ["PGIMER Nursing Officer"])).toBe(true);
    expect(matchesSearch("patw", ["HP Patwari"])).toBe(true); // still typing
    expect(matchesSearch("pharmasist", ["HPRCA Pharmacist"])).toBe(true);
  });

  it("keeps short words exact and does not match unrelated exams", () => {
    expect(matchesSearch("tgt", ["HPRCA PGT"])).toBe(false);
    expect(matchesSearch("clerk", ["HP Police Constable"])).toBe(false);
    expect(matchesSearch("patwari", ["HP Police Constable"])).toBe(false);
    expect(matchesSearch("nurse", ["HP High Court Clerk", "hc"])).toBe(false);
  });
});
