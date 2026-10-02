import { describe, expect, it } from "vitest";
import { catalogue } from "../../../prisma/catalogue";
import { EXAM_PAGES } from "../../../prisma/exam-pages";
import { bodyShortName, examLabel, examShortName } from "./labels";

describe("examLabel", () => {
  it("prefixes the recruiting body so the name is what candidates search for", () => {
    expect(examLabel("hprca", "JOA IT")).toBe("HPRCA JOA IT");
    expect(examLabel("hppsc", "Assistant Professor")).toBe("HPPSC Assistant Professor");
    expect(examLabel("pgimer", "Nursing Officer")).toBe("PGIMER Nursing Officer");
    expect(examLabel("hpscb", "Clerk")).toBe("HPSCB Clerk");
    expect(examLabel("hpsebl", "Lineman")).toBe("HPSEBL Lineman");
  });

  it("uses HP for the other bodies and never doubles it", () => {
    expect(examLabel("hp-police", "Police Constable")).toBe("HP Police Constable");
    expect(examLabel("hp-revenue", "Patwari")).toBe("HP Patwari");
    expect(examLabel("hpbose", "HP TET")).toBe("HP TET");
    expect(examLabel("hp-high-court", "High Court Clerk")).toBe("HP High Court Clerk");
  });
});

describe("bodyShortName", () => {
  it("names bodies the way candidates do", () => {
    expect(bodyShortName("hprca")).toBe("HPRCA");
    expect(bodyShortName("hp-high-court")).toBe("HP High Court");
    expect(bodyShortName("hp-revenue")).toBe("HP Revenue Department");
    expect(bodyShortName("somebody-new")).toBe("SOMEBODY-NEW");
  });
});

describe("examShortName", () => {
  it("reads the searched name from an SEO title", () => {
    expect(examShortName("HPPSC HPAS Combined Competitive Exam", "HPAS Mock Test {year} — Free HPPSC Prelims Test Series")).toBe("HPAS");
    expect(examShortName("HP Patwari", "HP Patwari Mock Test 2026 — Free")).toBe("HP Patwari");
  });

  it("falls back to the full label when the title has another shape", () => {
    expect(examShortName("HP Patwari", "Best Patwari preparation")).toBe("HP Patwari");
    expect(examShortName("HP Patwari", "")).toBe("HP Patwari");
  });

  it("gives every exam with SEO copy a short name without the words Mock Test", () => {
    for (const [key, page] of Object.entries(EXAM_PAGES)) {
      const short = examShortName("fallback", page.seo.title);
      expect(short, key).not.toBe("fallback");
      expect(short, key).not.toMatch(/mock test/i);
      expect(short.length, key).toBeLessThanOrEqual(40);
    }
  });
});

describe("exam names", () => {
  it("are unique, apart from the two known pairs", () => {
    // The /tests filter groups tests by exam name, so a repeated name merges two exams' tests into one card.
    const names = catalogue.flatMap((b) => b.exams.map((e) => e.name));
    const repeated = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))].sort();
    expect(repeated).toEqual(["Assistant Engineer", "Clerk"]);
  });
});
