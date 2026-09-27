import {
  BarChart3,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronRight,
  Clock,
  Languages,
  MonitorCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { site } from "@/lib/site";
import { getCatalog } from "@/modules/catalog/queries";

export const revalidate = 3600;

const DEMO = "/tests/hp-gk-free-mock-1";

const features = [
  {
    icon: MonitorCheck,
    title: "Real CBT exam interface",
    text: "Same screen as HPRCA and HPPSC computer-based tests: question palette, Mark for Review, Save & Next and a live timer. No surprises on exam day.",
  },
  {
    icon: Languages,
    title: "Hindi & English",
    text: "Every question in both languages. Switch any time during the test, exactly like the real exam.",
  },
  {
    icon: Trophy,
    title: "Your rank in Himachal",
    text: "See where you stand among other Himachal aspirants on every test, with percentile and topper comparison.",
  },
  {
    icon: BarChart3,
    title: "Solutions & weak topics",
    text: "Detailed explanation for every question, section-wise analysis and the topics you need to revise next.",
  },
];

const faqs = [
  {
    q: "Can I take a mock test without logging in?",
    a: "Yes. The free Himachal GK mock test can be taken without any login. Log in (free) when you want to save results and see your rank.",
  },
  {
    q: "Is the test interface like the real HPRCA / HPPSC CBT exam?",
    a: "Yes. The screen follows the standard government CBT layout: question palette with colour codes, Mark for Review & Next, Save & Next, Clear Response, section tabs, language switch and an auto-submitting timer.",
  },
  {
    q: "Are questions available in Hindi?",
    a: "Yes. Questions, options and explanations are available in both Hindi and English, and you can switch language at any time.",
  },
  {
    q: "Which exams are covered?",
    a: "HPRCA (JOA IT, Clerk and other posts), HPPSC HPAS, HP Police Constable, HP TET and Patwari, with Himachal GK tests that help in every exam. More exams are being added.",
  },
  {
    q: "How much does it cost?",
    a: "Many tests are free. Paid test series are planned at very low prices, starting from ₹49, with an all-access pass for all Himachal exams.",
  },
];

export default async function Home() {
  const catalog = await getCatalog();
  const examCount = catalog.reduce((n, b) => n + b.exams.length, 0);

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}/icon.svg` },
          { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: ["en-IN", "hi-IN"] },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-[#3b6ef5]/40 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-24 pt-7 sm:pb-36 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
            <div className="space-y-4 sm:space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium ring-1 ring-white/20 sm:px-3.5 sm:py-1.5 sm:text-xs">
                <Sparkles className="size-3.5 text-accent" /> Made for Himachal Pradesh aspirants
              </p>
              <h1 className="text-[28px] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.15]">
                Crack Himachal govt exams with <span className="text-accent">real CBT</span> mock tests
              </h1>
              <p className="text-[15px] text-white/85 sm:text-lg">{site.taglineHi}</p>
              {/* Phones: full-width, thumb-sized buttons stacked like an app; larger screens: inline */}
              <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <Link href={DEMO} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  Start free mock test <ChevronRight className="size-5" />
                </Link>
                <Link href="/exams" className={btn("white", "lg", "w-full sm:w-auto")}>
                  Explore exams
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs text-white/90 sm:gap-x-6 sm:gap-y-2 sm:text-sm">
                {["No login needed", "Hindi & English", "Instant solutions"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 sm:bg-transparent sm:p-0">
                    <CheckCircle2 className="size-3.5 text-accent sm:size-4" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <CbtPreview />
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-28 w-full sm:h-36" />
        </section>

        {/* Trust strip */}
        <section className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4">
          <dl className={`${card} grid grid-cols-4 divide-x divide-border p-1 shadow-lg sm:p-2`}>
            {[
              [`${examCount}+`, "Exams"],
              ["2", "Languages"],
              ["₹0", "To start"],
              ["100%", "Real CBT"],
            ].map(([v, l]) => (
              <div key={l} className="px-1 py-3 text-center sm:p-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-lg font-bold text-primary sm:text-2xl">{v}</dd>
                <dd className="text-[11px] text-muted sm:text-xs">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Exams */}
        <section id="exams" className="mx-auto w-full max-w-6xl space-y-4 px-4 py-10 sm:space-y-8 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1 sm:space-y-2">
              <p className="hidden text-sm font-semibold uppercase tracking-wider text-primary sm:block">Exams we cover</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                <span className="sm:hidden">Choose your exam</span>
                <span className="hidden sm:inline">All major Himachal Pradesh exams, in one place</span>
              </h2>
              <p className="hidden text-muted sm:block">Pick your exam to see free tests, previous-year style questions and the full test series.</p>
            </div>
            <Link href="/exams" className="shrink-0 text-sm font-semibold text-primary sm:hidden">
              See all
            </Link>
          </div>
          {/* Phones: swipeable row of cards; larger screens: grid */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {catalog.flatMap((b) =>
              b.exams.map((e) => (
                <Link key={e.href} href={e.href} className={`${card} group flex w-[72%] shrink-0 snap-start flex-col gap-3 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:w-auto sm:p-5`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">{b.slug.toUpperCase()}</span>
                    <ChevronRight className="size-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{e.name}</h3>
                    {e.nameHi && <p className="text-sm text-muted">{e.nameHi}</p>}
                  </div>
                  <p className="mt-auto text-xs text-muted">{b.name}</p>
                </Link>
              )),
            )}
          </div>
        </section>

        {/* Features */}
        <section className="bg-surface py-10 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="space-y-2 sm:space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Why {site.name}</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Practise exactly the way you will be tested</h2>
              <p className="hidden text-muted sm:block">
                Most aspirants lose marks to exam-day nerves and an unfamiliar screen, not lack of knowledge. Every test here runs
                on the same CBT pattern used in Himachal recruitment exams, so the real exam feels like just another mock.
              </p>
              <Link href={DEMO} className={btn("primary", "md", "w-full sm:w-auto")}>
                Try the CBT interface <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-background p-3.5 sm:p-5">
                  <div className="mb-2 grid size-9 place-items-center rounded-xl bg-primary text-white sm:mb-3 sm:size-11">
                    <f.icon className="size-4 sm:size-5" />
                  </div>
                  <h3 className="text-sm font-semibold leading-snug sm:text-base">{f.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted sm:line-clamp-none sm:text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-20">
          <h2 className="mb-6 text-xl font-bold tracking-tight sm:mb-10 sm:text-center sm:text-3xl">Start in 30 seconds</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              ["Pick a test", "Choose a free mock or your exam's test series. No signup needed for free tests."],
              ["Attempt in real CBT mode", "Timer, palette, Mark for Review — the full exam experience, in Hindi or English."],
              ["Analyse & improve", "Get your score, rank, detailed solutions and weak topics instantly."],
            ].map(([t, d], i) => (
              <li key={t} className={`${card} relative p-6`}>
                <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-accent font-bold text-[#1f1300] shadow">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-surface py-10 sm:py-20">
          <div className="mx-auto w-full max-w-6xl space-y-5 px-4 sm:space-y-10">
            <div className="mx-auto max-w-2xl space-y-1 sm:space-y-2 sm:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Pricing</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Cheaper than a single guide book</h2>
              <p className="text-sm text-muted sm:text-base">No expensive coaching. Pay only for what you need — or nothing at all.</p>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
              <Plan name="Free" price="₹0" note="forever" items={["Free mock tests", "Real CBT interface", "Solutions in Hindi & English", "HP rank on free tests"]} cta={{ href: DEMO, label: "Start free test" }} />
              <Plan name="Exam Test Series" price="₹49–99" note="per exam" soon items={["20–40 full mock tests", "Previous-year papers", "Sectional & topic tests", "Detailed analysis"]} />
              <Plan highlight name="All-Access Pass" price="₹299" note="per year" soon items={["Every Himachal exam", "All mock tests & PYQs", "HP GK & current affairs tests", "Best value for serious aspirants"]} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl space-y-5 px-4 py-10 sm:space-y-8 sm:py-20">
          <h2 className="text-xl font-bold tracking-tight sm:text-center sm:text-3xl">Frequently asked questions</h2>
          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className={`${card} group p-4 sm:p-5`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold sm:text-base">
                  {f.q}
                  <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-10 sm:pb-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-5 overflow-hidden rounded-3xl bg-linear-to-r from-[#133a9e] to-[#1e4fd8] p-6 text-white sm:flex-row sm:items-center sm:p-12">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-bold sm:text-3xl">Take your first Himachal mock test now</h2>
              <p className="text-white/80">25 questions · 20 minutes · Hindi & English · No login</p>
            </div>
            <Link href={DEMO} className={btn("accent", "lg")}>
              Start free mock <Clock className="size-5" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Plan(props: { name: string; price: string; note: string; items: string[]; highlight?: boolean; soon?: boolean; cta?: { href: string; label: string } }) {
  return (
    <div className={`relative flex w-[82%] shrink-0 snap-center flex-col rounded-2xl border p-5 md:w-auto md:p-6 ${props.highlight ? "border-primary bg-primary text-white shadow-xl" : "border-border bg-background"}`}>
      {props.soon && (
        <span className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-xs font-semibold ${props.highlight ? "bg-accent text-[#1f1300]" : "bg-accent-soft text-accent-strong"}`}>
          Launching soon
        </span>
      )}
      <h3 className="flex items-center gap-2 font-semibold">
        <BadgeIndianRupee className={`size-5 ${props.highlight ? "text-accent" : "text-primary"}`} /> {props.name}
      </h3>
      <p className="mt-4">
        <span className="text-4xl font-bold">{props.price}</span>
        <span className={`ml-1 text-sm ${props.highlight ? "text-white/75" : "text-muted"}`}>{props.note}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {props.items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${props.highlight ? "text-accent" : "text-success"}`} /> {i}
          </li>
        ))}
      </ul>
      {props.cta && (
        <Link href={props.cta.href} className={`${btn("primary")} mt-6`}>
          {props.cta.label}
        </Link>
      )}
    </div>
  );
}

/** Static illustration of the CBT screen for the hero. */
function CbtPreview() {
  const palette = ["a", "a", "n", "m", "a", "am", "v", "n", "a", "v", "v", "v", "v", "v", "v"];
  const style: Record<string, string> = {
    a: "bg-cbt-answered text-white rounded-b-[10px] rounded-t-sm",
    n: "bg-cbt-not-answered text-white rounded-t-[10px] rounded-b-sm",
    m: "bg-cbt-marked text-white rounded-full",
    am: "bg-cbt-marked text-white rounded-full ring-2 ring-cbt-answered",
    v: "bg-cbt-not-visited text-foreground rounded-sm border border-[#c3cad6]",
  };
  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="absolute -inset-4 rotate-2 rounded-3xl bg-white/10" />
      <div className="relative overflow-hidden rounded-2xl bg-white text-foreground shadow-2xl">
        <div className="flex items-center justify-between bg-cbt-header px-4 py-2.5 text-sm text-white">
          <span className="font-semibold">HPRCA JOA IT — Mock Test 3</span>
          <span className="flex items-center gap-1.5 rounded bg-white/15 px-2 py-0.5 font-mono">
            <Clock className="size-3.5" /> 01:24:37
          </span>
        </div>
        <div className="flex border-b border-border bg-surface-muted text-xs">
          <span className="border-b-2 border-primary bg-white px-3 py-2 font-semibold text-primary">Himachal GK</span>
          <span className="px-3 py-2 text-muted">Reasoning</span>
          <span className="px-3 py-2 text-muted">Computer</span>
        </div>
        <div className="grid grid-cols-[1fr_150px]">
          <div className="space-y-3 p-4 text-sm">
            <p className="font-semibold">Question No. 6</p>
            <p className="font-reading">The Chandra and Bhaga rivers meet at which place to form the Chandrabhaga?</p>
            {["Tandi", "Keylong", "Udaipur", "Kaza"].map((o, i) => (
              <div key={o} className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-reading ${i === 0 ? "border-primary bg-primary-soft" : "border-border"}`}>
                <span className={`size-3.5 rounded-full border-2 ${i === 0 ? "border-primary bg-primary" : "border-[#b7c3d8]"}`} /> {o}
              </div>
            ))}
            <div className="flex gap-2 pt-1 text-[11px] font-semibold">
              <span className="rounded border border-cbt-marked px-2 py-1.5 text-cbt-marked">Mark for Review &amp; Next</span>
              <span className="ml-auto rounded bg-cbt-answered px-2 py-1.5 text-white">Save &amp; Next</span>
            </div>
          </div>
          <div className="border-l border-border p-3">
            <p className="mb-2 text-[11px] font-medium text-muted">Question palette</p>
            <div className="grid grid-cols-4 gap-1.5 text-[10px] font-semibold">
              {palette.map((s, i) => (
                <span key={i} className={`grid h-6 place-items-center ${style[s]}`}>
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
