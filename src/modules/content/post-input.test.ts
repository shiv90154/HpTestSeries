import { describe, expect, it } from "vitest";
import { faqPageJsonLd, parseFaqs, parsePattern, stripMarkdown, validateExam, emptyPattern } from "./exam-content";
import { CATEGORY_META, POST_CATEGORIES, categoryFromSlug, readingMinutes, validatePost } from "./post-input";

const post = {
  slug: "hp-police-constable-bharti-2026",
  title: "HP Police Constable Bharti 2026 — Notification",
  titleHi: "",
  excerpt: "Eligibility, selection process, exam pattern and how to apply for HP Police Constable.",
  content: "word ".repeat(40),
  coverImage: "",
  category: "NOTIFICATION",
  seoTitle: "",
  seoDescription: "",
  faqs: [],
  examIds: [],
};

describe("validatePost", () => {
  it("accepts a valid post", () => {
    expect(validatePost(post).ok).toBe(true);
  });

  it("rejects bad slugs, categories and cover URLs", () => {
    for (const slug of ["HP-Police", "hp--police", "-hp", "hp police", ""]) {
      expect(validatePost({ ...post, slug }).ok, slug).toBe(false);
    }
    expect(validatePost({ ...post, category: "NEWS" }).ok).toBe(false);
    expect(validatePost({ ...post, coverImage: "http://insecure.example/a.png" }).ok).toBe(false);
    expect(validatePost({ ...post, coverImage: "javascript:alert(1)" }).ok).toBe(false);
    expect(validatePost({ ...post, coverImage: "/blog/cover.png" }).ok).toBe(true);
  });

  it("limits SEO field lengths", () => {
    expect(validatePost({ ...post, seoTitle: "x".repeat(71) }).ok).toBe(false);
    expect(validatePost({ ...post, seoDescription: "x".repeat(171) }).ok).toBe(false);
  });
});

describe("categories", () => {
  it("round-trips every category slug", () => {
    for (const c of POST_CATEGORIES) expect(categoryFromSlug(CATEGORY_META[c].slug)).toBe(c);
    expect(categoryFromSlug("nope")).toBeNull();
  });
});

describe("readingMinutes", () => {
  it("is at least one minute", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes("a ".repeat(1000))).toBe(5);
  });
});

describe("exam content", () => {
  it("parses FAQs leniently", () => {
    expect(parseFaqs(null)).toEqual([]);
    expect(parseFaqs("nope")).toEqual([]);
    expect(parseFaqs([{ q: "Is it free?", a: "Yes, it is." }])).toHaveLength(1);
  });

  it("treats an empty pattern as none", () => {
    expect(parsePattern(emptyPattern)).toBeNull();
    expect(parsePattern({ ...emptyPattern, durationMin: 120 })?.durationMin).toBe(120);
    expect(parsePattern({ sections: "x" })).toBeNull();
  });

  it("builds FAQPage JSON-LD with plain-text answers", () => {
    const ld = faqPageJsonLd([{ q: "Kya test free hai?", a: "**Haan**, [yahan](/tests) se shuru karo." }]);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe("Haan, yahan se shuru karo.");
  });

  it("strips markdown", () => {
    expect(stripMarkdown("# Title\n\n- *one*  `two`")).toBe("Title - one two");
  });

  it("validates exam input", () => {
    const exam = { nameHi: "", description: "", syllabus: "", pattern: emptyPattern, faqs: [], seo: { title: "", description: "" }, isActive: true };
    expect(validateExam(exam).ok).toBe(true);
    expect(validateExam({ ...exam, faqs: [{ q: "?", a: "" }] }).ok).toBe(false);
  });
});
