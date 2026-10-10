import { describe, expect, it } from "vitest";
import { examCategory, matchesSearch, sortForDirectory } from "./directory";

describe("examCategory", () => {
  it("groups exams by job", () => {
    expect(examCategory("hp-high-court", "process-server")).toBe("court");
    expect(examCategory("hppsc", "judicial-services")).toBe("court");
    expect(examCategory("hp-police", "sub-inspector")).toBe("police");
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
});
