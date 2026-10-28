import { describe, expect, it } from "vitest";
import { catalogue } from "../../../prisma/catalogue";
import { EXAM_PAGES, NOTIFICATION_POSTS, PUNJAB_POSTS, RAJASTHAN_POSTS } from "../../../prisma/exam-pages";
import { EXAM_SERIES } from "../../../prisma/exam-series";
import { PATWARI_TESTS } from "../../../prisma/patwari";
import { COURT_CLERK_TESTS } from "../../../prisma/pb-court-clerk";
import { examContent, posts } from "../../../prisma/seed-content";
import { HP_GK_FREE_MOCK_SLUGS } from "../../../prisma/seed-hp-gk-mocks";
import { HPAS_BANK_TEST_SLUGS } from "../../../prisma/seed-hpas-bank";
import { UPCOMING_FREE_TESTS } from "../../../prisma/upcoming-free";
import { hp } from "@/sites/hp";
import { pb } from "@/sites/pb";
import { rj } from "@/sites/rj";
import { faqListSchema, patternSchema, seoSchema } from "./exam-content";
import { postSchema } from "./post-input";

const keys = catalogue.flatMap((b) => b.exams.map((e) => `${b.slug}/${e.slug}`));
const known = new Set(keys);
const testSlugs = new Set([
  ...UPCOMING_FREE_TESTS.map((t) => t.slug),
  ...EXAM_SERIES.flatMap((s) => s.tests.map((t) => t.slug)),
  ...PATWARI_TESTS.map((t) => t.slug),
  ...COURT_CLERK_TESTS.map((t) => t.slug),
  hp.freeMockSlug,
  pb.freeMockSlug,
  rj.freeMockSlug,
  "hpas-free-mock-1",
  "hpas-free-mock-2",
  ...HP_GK_FREE_MOCK_SLUGS,
  ...HPAS_BANK_TEST_SLUGS,
]);

/** The state GK pages (/himachal on hp, /punjab on pb, /rajasthan on rj), which exam pages may link to. */
const STATE_PAGES = new Set(["/himachal", "/punjab", "/rajasthan"]);

/** Everything a page shows, merged the way prisma/seed-content.ts merges it. */
function pageFor(key: string) {
  const written = examContent[key];
  const page = EXAM_PAGES[key];
  return {
    description: written?.description ?? page?.description ?? "",
    syllabus: written?.syllabus ?? page?.syllabus ?? "",
    faqs: written?.faqs ?? page?.faqs ?? [],
    seo: page?.seo,
    pattern: page?.pattern,
  };
}

describe("catalogue", () => {
  it("has no duplicate exam", () => {
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("gives every exam a stage-free, lower-case slug", () => {
    for (const k of keys) expect(k, k).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/);
  });
});

describe("exam page copy", () => {
  it("only describes exams that are in the catalogue", () => {
    for (const k of Object.keys(EXAM_PAGES)) expect(known.has(k), k).toBe(true);
  });

  it("covers every exam: no exam is left on the generic placeholder text", () => {
    for (const k of keys) {
      const p = pageFor(k);
      expect(p.description.length, `${k} description`).toBeGreaterThanOrEqual(600);
      expect(p.syllabus, `${k} syllabus`).toMatch(/^###? /m);
      expect(p.faqs.length, `${k} faqs`).toBeGreaterThanOrEqual(3);
      expect(p.seo, `${k} seo`).toBeDefined();
    }
  });

  describe.each(keys.map((k) => [k] as const))("%s", (key) => {
    const p = pageFor(key);

    it("has an SEO title and description Google will not cut off", () => {
      const parsed = seoSchema.safeParse(p.seo);
      expect(parsed.success, key).toBe(true);
      const title = (p.seo?.title ?? "").replaceAll("{year}", "2026");
      expect(title.length, title).toBeGreaterThan(25);
      expect(title.length, title).toBeLessThanOrEqual(70);
      expect(p.seo?.title, key).toContain("{year}");
      expect((p.seo?.description ?? "").length).toBeGreaterThanOrEqual(110);
    });

    it("has valid FAQs and, if given, a valid pattern", () => {
      expect(faqListSchema.safeParse(p.faqs).success, key).toBe(true);
      if (p.pattern) expect(patternSchema.safeParse(p.pattern).success, key).toBe(true);
    });

    it("has no unfinished markers and links only to pages that exist", () => {
      const text = [p.description, p.syllabus, ...p.faqs.map((f) => `${f.q} ${f.a}`)].join("\n");
      expect(text, key).not.toMatch(/\[VERIFY\]|TODO|lorem|undefined/i);
      for (const m of text.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const href = m[1];
        const tests = href.match(/^\/tests\/([^/?#]+)$/);
        if (tests) expect(testSlugs.has(tests[1]), `${key}: ${href}`).toBe(true);
        else if (!STATE_PAGES.has(href)) expect(known.has(href.slice(1)), `${key}: ${href}`).toBe(true);
      }
    });
  });

  it("uses a different title and description for every exam", () => {
    const titles = Object.values(EXAM_PAGES).map((p) => p.seo.title);
    const descriptions = Object.values(EXAM_PAGES).map((p) => p.seo.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("only gives a pattern to exams where the figures are known", () => {
    expect(Object.entries(EXAM_PAGES).filter(([, p]) => p.pattern).map(([k]) => k).sort()).toEqual([
      "hp-revenue/patwari",
      "hpbose/hp-tet",
      "hppsc/assistant-professor",
      "hppsc/hpas",
      "hprca/clerk",
      "hprca/staff-nurse",
      "hpscb/clerk",
      "psssb/clerk",
      "psssb/group-d",
      "punjab-courts/clerk",
      "punjab-police/constable",
    ]);
  });
});

/** Exams whose previous-year papers prisma/seed.ts seeds, so their /previous-year-papers page exists. */
const PYQ_EXAMS = new Set(["hp-revenue/patwari", "hp-police/constable", "hprca/joa-it"]);

/** Whether an internal link in a draft post points at a page that exists (or will, once the page's own content is seeded). */
function linkExists(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  if (["/exams", "/tests", "/previous-year-papers", "/himachal", "/punjab", "/rajasthan", hp.gkMockHub].includes(path)) return true;
  const test = path.match(/^\/tests\/([^/]+)$/);
  if (test) return testSlugs.has(test[1]);
  const blog = path.match(/^\/blog\/([^/]+)$/);
  if (blog) return posts.some((p) => p.slug === blog[1]);
  const sub = path.match(/^\/([^/]+\/[^/]+)(?:\/(syllabus|exam-pattern|previous-year-papers))?$/);
  if (!sub) return false;
  if (!known.has(sub[1])) return false;
  if (sub[2] === "exam-pattern") return !!EXAM_PAGES[sub[1]]?.pattern;
  return sub[2] !== "previous-year-papers" || PYQ_EXAMS.has(sub[1]);
}

describe("draft posts", () => {
  it("has a unique slug for every post", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  describe.each([...NOTIFICATION_POSTS, ...PUNJAB_POSTS, ...RAJASTHAN_POSTS].map((p) => [p.slug, p] as const))("%s", (_slug, p) => {
    it("passes the same validation as the admin blog editor", () => {
      const r = postSchema.safeParse({ ...p, titleHi: p.titleHi ?? "", coverImage: "", seoTitle: p.seoTitle ?? "", seoDescription: p.seoDescription ?? "", faqs: p.faqs ?? [], examIds: [] });
      expect(r.success ? [] : r.error.issues.map((i) => i.message)).toEqual([]);
      expect(p.seoTitle, "seoTitle").toBeTruthy();
      expect(p.seoDescription, "seoDescription").toBeTruthy();
    });

    it("is tied to exams that exist and links only to pages that exist", () => {
      for (const k of p.exams) expect(known.has(k), k).toBe(true);
      const text = [p.content, ...(p.faqs ?? []).map((f) => f.a)].join(" ");
      for (const m of text.matchAll(/\]\((\/[^)\s]*)\)/g)) expect(linkExists(m[1]), m[1]).toBe(true);
    });

    // A post is either still a draft for the editor (draft note plus [VERIFY] markers) or checked by the owner, in
    // which case no leftover marker may reach readers.
    it("is either marked for verification or free of verification markers", () => {
      const text = [p.content, ...(p.faqs ?? []).map((f) => f.a)].join(" ");
      if (/Yeh draft hai/.test(p.content)) expect(p.content).toMatch(/\[VERIFY\]/);
      else expect(text).not.toMatch(/VERIFY/);
    });
  });
});
