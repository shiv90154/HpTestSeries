import { describe, expect, it } from "vitest";
import { catalogue } from "../../../prisma/catalogue";
import { faqListSchema } from "../content/exam-content";
import { BODY_INFO, hasBodyPage } from "./body-info";

describe("body pages", () => {
  it("only describe bodies that are in the catalogue", () => {
    const slugs = new Set(catalogue.map((b) => b.slug));
    for (const k of Object.keys(BODY_INFO)) expect(slugs.has(k), k).toBe(true);
  });

  it("exist for exactly the bodies with text and two or more exams", () => {
    expect(catalogue.filter(hasBodyPage).map((b) => b.slug).sort()).toEqual(["hp-high-court", "hp-police", "hppsc", "hprca", "hpsebl"]);
  });

  it("link only to exam pages that exist", () => {
    const keys = new Set(catalogue.flatMap((b) => b.exams.map((e) => `${b.slug}/${e.slug}`)));
    for (const [k, info] of Object.entries(BODY_INFO)) {
      for (const m of (info.about + JSON.stringify(info.faqs)).matchAll(/\]\(\/([^)\s]+)\)/g)) expect(keys.has(m[1]), `${k}: ${m[1]}`).toBe(true);
    }
  });

  it("have two paragraphs of text and valid FAQs", () => {
    for (const [k, info] of Object.entries(BODY_INFO)) {
      expect(info.about.split(/\n\n/).length, k).toBeGreaterThanOrEqual(2);
      expect(info.about.length, k).toBeGreaterThan(300);
      expect(faqListSchema.safeParse(info.faqs).success, k).toBe(true);
      expect(info.about + JSON.stringify(info.faqs), k).not.toMatch(/\[VERIFY\]|TODO|undefined/i);
    }
  });
});
