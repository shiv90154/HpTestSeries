import { Clock, ListChecks, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { SampleQuestions } from "@/components/sample-questions";
import { getGkFreeMocks, getSampleQuestions } from "@/modules/catalog/free-mocks";
import { faqPageJsonLd } from "@/modules/content/exam-content";
import { currentSite } from "@/sites/current";

export const revalidate = 600;

// "hp gk mock test" and "hp gk mock test in hindi" are the biggest free-test searches in Search Console (Oct 2026),
// and the single test page that answered them ranked about 25th. This hub gathers every free Himachal GK mock.
export const metadata: Metadata = {
  title: "Himachal GK Mock Test 2026 — Free HP GK Online Test in Hindi & English",
  description:
    "Free Himachal GK mock tests for HPRCA, HP Police, Patwari, High Court and HPAS: 25 questions each, no login, Hindi and English, with answers, explanations and your rank.",
  alternates: { canonical: "/himachal-gk-mock-test" },
};

const TOPICS: [string, string][] = [
  ["History", "Princely states, Kangra fort, Gorkha war, statehood (25 January 1971), Shimla as summer capital"],
  ["Geography", "Ranges, passes (Rohtang, Kunzum, Baralacha, Shipki La), national parks, glaciers"],
  ["Rivers & lakes", "Sutlej, Beas, Ravi, Chenab, Yamuna, dams and natural lakes like Renuka and Prashar"],
  ["Districts", "All 12 districts, headquarters, when they were formed, census records"],
  ["Culture & fairs", "Kullu Dussehra, Minjar, Shivratri, Lavi, folk dances, temples, Kangra painting"],
  ["Economy", "Apple and horticulture, hydropower, industry, tourism, railways"],
  ["Polity & administration", "Vidhan Sabha, Lok Sabha and Rajya Sabha seats, High Court, HPPSC, HPRCA"],
  ["Personalities", "Dr. Y.S. Parmar, freedom fighters, war heroes, writers and artists"],
];

const EXAMS: [string, string][] = [
  ["HP Patwari", "/hp-revenue/patwari"],
  ["HP Police Constable", "/hp-police/constable"],
  ["HP High Court Clerk", "/hp-high-court/clerk"],
  ["HP High Court Process Server", "/hp-high-court/process-server"],
  ["HPRCA Clerk", "/hprca/clerk"],
  ["HPRCA JOA IT", "/hprca/joa-it"],
  ["HP Panchayat Secretary", "/hprca/panchayat-secretary"],
  ["HP Forest Guard", "/hprca/forest-guard"],
  ["HPAS", "/hppsc/hpas"],
];

const FAQS = [
  {
    q: "Are these Himachal GK mock tests really free?",
    a: "Yes. Every Himachal GK mock on this page is free and needs no login. Log in (free) only if you want to save your result and see your rank.",
  },
  {
    q: "Kya HP GK mock test Hindi me de sakte hain?",
    a: "Haan. Har question Hindi aur English dono me hai, aur test ke beech kabhi bhi bhasha badal sakte ho.",
  },
  {
    q: "How many questions are there in each HP GK mock test?",
    a: "25 questions in 20 minutes. Each correct answer gets 1 mark and each wrong answer loses 0.25, like most Himachal recruitment exams.",
  },
  {
    q: "Which exams is Himachal GK asked in?",
    a: "Almost every Himachal government exam: HPRCA (Clerk, JOA IT, Patwari, Forest Guard, Panchayat Secretary), HP Police, High Court, HP TET and HPAS.",
  },
  {
    q: "Himachal GK ki taiyari kaise karein?",
    a: "Topic-wise padho: districts, rivers, history, fairs-festivals aur polity. Har hafte ek GK mock do aur galat questions ke short notes banao. District-wise facts ke liye [Know Your Himachal](/himachal) page dekho.",
  },
];

export default async function HimachalGkMockTestPage() {
  const site = await currentSite();
  if (site.code !== "hp") notFound();
  const mocks = await getGkFreeMocks();
  const samples = mocks[0] ? await getSampleQuestions(mocks[0].slug, 5, "hp-gk") : [];

  return (
    <>
      <SiteHeader />
      <JsonLd
        data={[
          faqPageJsonLd(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Himachal GK Free Mock Tests",
            itemListElement: mocks.map((m, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/tests/${m.slug}`, name: m.title })),
          },
        ]}
      />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-10 px-4 py-8 sm:py-12">
        <Breadcrumbs links={[{ href: "/", label: "Home" }, { href: "/tests", label: "Mock Tests" }]} current="Himachal GK Mock Test" />

        <header className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Free · No login · Hindi &amp; English</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Himachal GK Mock Test 2026</h1>
          <p lang="hi" className="text-lg text-muted">
            हिमाचल GK फ्री मॉक टेस्ट — हिंदी और अंग्रेज़ी में, उत्तर और व्याख्या के साथ।
          </p>
          <p className="leading-relaxed text-foreground/90">
            Himachal GK is the one section every Himachal government exam has, from HPRCA Clerk and Patwari to HP Police, the High Court and HPAS.
            These free mocks have 25 Himachal GK questions each, in the same CBT screen as the real exam, with answers, explanations and your rank
            among Himachal aspirants.
          </p>
        </header>

        <section aria-labelledby="mocks" className="space-y-4">
          <h2 id="mocks" className="text-xl font-bold sm:text-2xl">
            All free Himachal GK mock tests
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mocks.map((m) => (
              <li key={m.slug} className={`${card} flex flex-col gap-3 p-5`}>
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  {m.titleHi && (
                    <p lang="hi" className="text-sm text-muted">
                      {m.titleHi}
                    </p>
                  )}
                </div>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <ListChecks className="size-4" aria-hidden /> {m.questionCount} questions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden /> {m.durationMin} min
                  </span>
                  {m.attempts > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4" aria-hidden /> {m.attempts} attempts
                    </span>
                  )}
                </p>
                <Link href={`/tests/${m.slug}`} className={btn("primary", "sm", "mt-auto self-start")}>
                  Start free test
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {mocks[0] && (
          <SampleQuestions
            title="Sample Himachal GK questions with answers"
            samples={samples}
            test={{ slug: mocks[0].slug, title: mocks[0].title, count: mocks[0].questionCount }}
          />
        )}

        <section aria-labelledby="topics" className="space-y-4">
          <h2 id="topics" className="text-xl font-bold sm:text-2xl">
            What the Himachal GK mocks cover
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {TOPICS.map(([k, v]) => (
              <div key={k} className={`${card} p-4`}>
                <dt className="font-semibold">{k}</dt>
                <dd className="mt-1 text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted">
            Revise district-wise facts on <Link href="/himachal" className="font-medium text-primary underline">Know Your Himachal</Link>.
          </p>
        </section>

        <section aria-labelledby="exams" className="space-y-4">
          <h2 id="exams" className="text-xl font-bold sm:text-2xl">
            Exams where Himachal GK is asked
          </h2>
          <ul className="flex flex-wrap gap-2">
            {EXAMS.map(([name, href]) => (
              <li key={href}>
                <Link href={href} className="inline-block rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary">
                  {name} mock test
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq" className="space-y-4">
          <h2 id="faq" className="text-xl font-bold sm:text-2xl">
            Frequently asked questions
          </h2>
          <FaqList faqs={FAQS} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
