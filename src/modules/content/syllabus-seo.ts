import type { ExamSeo } from "@/modules/content/exam-content";

/**
 * Search-result copy for /syllabus pages whose generic title drew impressions but few clicks (GSC, Oct 2026). Keyed by
 * "bodySlug/examSlug"; `{year}` is replaced at render time. The "PDF" in these titles is the page's Save-as-PDF button.
 */
export const SYLLABUS_SEO: Record<string, ExamSeo> = {
  "hp-high-court/clerk": {
    title: "HP High Court Clerk Syllabus {year} PDF, Exam Pattern & Free Mock",
    description:
      "HP High Court Clerk syllabus {year} topic-wise: GK & Himachal GK, English, Hindi, reasoning, maths and computer. 100-mark screening pattern, PDF and a free mock test.",
  },
  "hp-high-court/stenographer": {
    title: "HP High Court Stenographer Syllabus {year} PDF & Free Mock Test",
    description:
      "HP High Court Steno Grade-III syllabus {year}: English, Hindi, GK & Himachal GK, reasoning, computer and the shorthand/typing skill test. Save as PDF, take a free mock.",
  },
  "hprca/forest-guard": {
    title: "HP Forest Guard Syllabus {year} PDF — Topic-wise + Free Mock Test",
    description:
      "Himachal Forest Guard (Vanrakshak) syllabus {year}: HP forests & wildlife, environment, GK, reasoning, maths and English. Save as PDF and take a free CBT mock test.",
  },
};

export function syllabusSeo(key: string, year: number): ExamSeo | null {
  const seo = SYLLABUS_SEO[key];
  return seo ? { title: seo.title.replaceAll("{year}", String(year)), description: seo.description.replaceAll("{year}", String(year)) } : null;
}
