import { BadgeCheck, CheckCircle2, FileText, Languages, ShieldCheck, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestRow } from "@/components/test-card";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { getCatalog, getPublishedTests } from "@/modules/catalog/queries";
import { getProductForSale } from "@/modules/commerce/product-service";

export const revalidate = 600;

const PRODUCT_SLUG = "previous-year-papers";

/** Exams whose card is always shown, and the years listed on a card until its real papers are added. */
const PYQ_EXAMS = ["Police Constable", "JOA IT", "Patwari"];
const PAPER_YEARS = [2020, 2019, 2018, 2017];

/** "Patwari" -> "HP Patwari"; names that already carry the department (HP TET, JOA IT) are left alone. */
const examTitle = (name: string) => (/^(HP|JOA|HPAS)/.test(name) ? name : `HP ${name}`);

export const metadata: Metadata = {
  title: "Himachal Previous Year Question Papers — All Papers for ₹29",
  description:
    "Solve every previous year paper of Himachal government exams (Patwari, Police Constable, JOA IT, TET and more) in a real CBT interface with Hindi & English questions and detailed solutions. All papers for just ₹29.",
  alternates: { canonical: "/previous-year-papers" },
};

const STEPS = [
  { icon: FileText, title: "Real past papers", text: "Actual exam questions, arranged year-wise as full-length tests." },
  { icon: Timer, title: "Exam-day CBT", text: "Same timer, palette and marking as the real computer-based exam." },
  { icon: Languages, title: "Hindi & English", text: "Switch language any time. Every question has a written solution." },
];

const FAQS = [
  { q: "What do I get for ₹29?", a: "Access to every previous year paper on the platform for 365 days — including papers we add later. One payment, no auto-renewal." },
  { q: "Can I try before paying?", a: "Yes. Take a free mock test first to see the CBT interface, then unlock the papers when you are ready." },
  { q: "Is there a refund?", a: "Refunds follow our refund policy. If a paper is faulty, report it and we fix it." },
];

export default async function PreviousYearPapersPage() {
  const [product, tests, catalog] = await Promise.all([getProductForSale(PRODUCT_SLUG), getPublishedTests(), getCatalog()]);
  const papers = tests.filter((t) => t.type === "PYQ");
  const byExam = new Map<string, typeof papers>();
  for (const t of papers) if (t.examName) byExam.set(t.examName, [...(byExam.get(t.examName) ?? []), t]);
  // The launch exams always get a card; any other exam appears once it has a real PYQ paper.
  const catalogNames = new Set(catalog.flatMap((b) => b.exams.map((e) => e.name)));
  const examNames = [...new Set([...PYQ_EXAMS.filter((e) => catalogNames.has(e)), ...byExam.keys()])];
  const price = rupees(product?.priceInPaise ?? 29_00);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="mx-auto w-full max-w-4xl space-y-5 px-4 py-12 text-center sm:py-20">
            <p className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium ring-1 ring-white/20">Previous year papers · Himachal exams</p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              All previous year papers <span className="text-accent">for just {price}</span>
            </h1>
            <p lang="hi" className="text-white/85">
              पिछले वर्षों के सभी प्रश्न पत्र, सिर्फ़ {price} में
            </p>
            <p className="mx-auto max-w-xl text-white/80">
              Practise the way the exam is asked. Solve past papers in a real CBT interface, see your HP rank and learn from a solution for every question.
            </p>
            <div className="flex flex-col items-center gap-2">
              {product ? (
                <Link href={`/buy/${product.slug}`} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  Get all papers for {price}
                </Link>
              ) : (
                <span className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold">Launching soon</span>
              )}
              <p className="text-xs text-white/70">One-time payment · valid {product?.validityDays ?? 365} days · no auto-renewal</p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-10 sm:py-16">
          <div className="mx-auto w-full max-w-4xl space-y-6 px-4">
            <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Papers included</h2>
            {papers.length === 0 && (
              <p className={`${card} p-5 text-sm text-muted`}>We are adding papers exam by exam. Buy now and every paper we add during your 365 days is unlocked automatically.</p>
            )}
            {/* One card per exam, same look as the /tests page; exams with no paper yet show "coming soon". */}
            {examNames.map((exam) => {
              const list = byExam.get(exam) ?? [];
              return (
                <section key={exam} className="space-y-2 rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-3">
                    <h3 className="text-xl font-bold">{examTitle(exam)} previous year papers</h3>
                    <p className="text-sm text-muted">{list.length > 0 ? `${list.length} paper${list.length === 1 ? "" : "s"}` : "Year-wise papers"}</p>
                  </div>
                  <ul className="divide-y divide-border">
                    {list.length > 0
                      ? list.map((p) => <TestRow key={p.slug} test={p} />)
                      : PAPER_YEARS.map((y) => (
                          <li key={y} className="flex items-center justify-between gap-3 py-3">
                            <span className="font-semibold">
                              {examTitle(exam)} Previous Year Paper {y}
                            </span>
                            <span className="rounded-md bg-accent-soft px-2 py-1 text-xs font-semibold text-accent-ink">Coming soon</span>
                          </li>
                        ))}
                  </ul>
                </section>
              );
            })}
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {["Detailed solution for every question", "HP rank on every paper", "Topic-wise analysis after each attempt", "New papers added free during validity"].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.title} className={`${card} space-y-2 p-5`}>
                <s.icon className="size-6 text-primary" />
                <h2 className="font-semibold">{s.title}</h2>
                <p className="text-sm text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10 sm:py-16">
          <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Questions</h2>
          {FAQS.map((f) => (
            <details key={f.q} className={`${card} group`}>
              <summary className="cursor-pointer list-none p-4 text-[15px] font-semibold">{f.q}</summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
          {product && (
            <div className={`${card} flex flex-col items-center gap-3 p-6 text-center`}>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <ShieldCheck className="size-4 text-success" /> Secure payment via Razorpay (UPI, cards, netbanking)
              </p>
              <Link href={`/buy/${product.slug}`} className={btn("primary", "lg", "w-full sm:w-auto")}>
                <BadgeCheck className="size-5" /> Get all papers for {price}
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
