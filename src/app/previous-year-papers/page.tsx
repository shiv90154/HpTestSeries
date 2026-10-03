import { BadgeCheck, CheckCircle2, FileText, Languages, ShieldCheck, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ExamTile } from "@/components/exam-tile";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { examLabel, getCatalog, getPublishedTests } from "@/modules/catalog/queries";
import { getProductForSale } from "@/modules/commerce/product-service";

export const revalidate = 600;

const PRODUCT_SLUG = "previous-year-papers";

/** Launch exams that are listed as "launching soon" until their first paper is published. */
const PYQ_EXAMS = ["Police Constable", "JOA IT", "Patwari"];

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
  const exams = catalog.flatMap((b) =>
    b.exams.map((e) => {
      const own = papers.filter((t) => t.examName === e.name);
      return { ...e, label: examLabel(b.slug, e.name), papers: own.length, free: own.filter((t) => t.isFree).length };
    }),
  );
  // Exams with papers lead, biggest first. The launch exams without one yet stay listed underneath, small.
  const ready = exams.filter((e) => e.papers > 0).sort((a, b) => b.papers - a.papers);
  const soon = exams.filter((e) => e.papers === 0 && PYQ_EXAMS.includes(e.name));
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
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Which exam&apos;s papers do you need?</h2>
              <p lang="hi" className="text-sm text-muted">
                अपनी परीक्षा चुनें और उसके सारे पिछले वर्षों के पेपर एक ही पेज पर देखें।
              </p>
            </div>
            {ready.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ready.map((e) => (
                  <li key={e.href}>
                    <ExamTile href={`${e.href}/previous-year-papers`} name={e.name} label={e.label} nameHi={e.nameHi} count={e.papers} noun="paper" free={e.free} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${card} p-5 text-sm text-muted`}>We are adding papers exam by exam. Buy now and every paper we add during your 365 days is unlocked automatically.</p>
            )}
            {soon.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">
                  More exams <span className="font-normal text-muted">· papers launching soon</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {soon.map((e) => (
                    <li key={e.href}>
                      <Link href={e.href} className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-sm transition-colors hover:border-primary hover:text-primary">
                        {e.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
