import type { Faq } from "./exam-content";

/**
 * FAQs for the exam sub-pages (syllabus, pattern, previous papers). Every answer is built from the page's own data,
 * so the FAQPage JSON-LD never says more than the page itself shows.
 */

const list = (items: string[]) => {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
};

export function syllabusFaqs(name: string, areas: string[]): Faq[] {
  return [
    ...(areas.length > 1
      ? [
          { q: `What is the ${name} syllabus?`, a: `The ${name} syllabus has ${areas.length} main areas: ${list(areas)}. The topic-wise list is on this page.` },
          { q: `How many subjects are there in the ${name} syllabus?`, a: `This page groups the ${name} syllabus into ${areas.length} areas: ${list(areas)}.` },
        ]
      : [{ q: `What is the ${name} syllabus?`, a: `The topic-wise ${name} syllabus is listed on this page, with free mock tests to practise each part.` }]),
    { q: `Is this the official ${name} syllabus?`, a: `No. It is a summary prepared for practice and can change with each notification. The official notification is final, so confirm it there.` },
    { q: `Can I practise the ${name} syllabus topic by topic?`, a: `Yes. Subject and topic tests are linked on this page, and every test runs in the real computer-based format with Hindi and English questions.` },
  ];
}

export function patternFaqs(
  name: string,
  p: { totalQuestions: number; totalMarks: number; durationMin: number | null; negativeMarking: string; sections: string[] },
): Faq[] {
  const faqs: Faq[] = [];
  if (p.totalQuestions > 0) {
    const marks = p.totalMarks > 0 ? ` carrying ${p.totalMarks} marks` : "";
    const time = p.durationMin ? ` in ${p.durationMin} minutes` : "";
    faqs.push({ q: `How many questions are there in the ${name} exam?`, a: `As per the latest information we have, the ${name} written test has ${p.totalQuestions} questions${marks}${time}.` });
  }
  if (p.durationMin) faqs.push({ q: `What is the duration of the ${name} exam?`, a: `The ${name} written test is ${p.durationMin} minutes long, as per the latest information we have.` });
  if (p.negativeMarking) faqs.push({ q: `Is there negative marking in the ${name} exam?`, a: `Negative marking: ${p.negativeMarking}` });
  if (p.sections.length > 1) faqs.push({ q: `Which sections are there in the ${name} exam?`, a: `The ${name} exam has these sections: ${list(p.sections)}.` });
  faqs.push({ q: `Can the ${name} exam pattern change?`, a: `Yes. The pattern can change with each notification, so confirm it in the official notification. Our mock tests copy the computer-based layout, but section sizes in a mock can differ from the real paper.` });
  return faqs;
}

export function pyqFaqs(name: string, paperCount: number, years: string[]): Faq[] {
  const noun = paperCount === 1 ? "paper" : "papers";
  return [
    { q: `Where can I solve ${name} previous year papers?`, a: `This page lists ${paperCount} ${name} previous year ${noun}. Each one opens in a real computer-based test interface.` },
    ...(years.length > 0 ? [{ q: `Which years of ${name} papers are available?`, a: `Papers from: ${list(years)}.` }] : []),
    { q: `Do the ${name} previous year papers have solutions?`, a: `Yes. After you submit, every question has a solution, in Hindi and English.` },
  ];
}
