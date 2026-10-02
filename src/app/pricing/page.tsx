import { CreditCard, RefreshCcw, ShieldCheck, Unlock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { Plan, productPlan } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { FREE_MOCK_HREF, site } from "@/lib/site";
import { faqPageJsonLd } from "@/modules/content/exam-content";
import { listActiveProducts } from "@/modules/commerce/product-service";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing — HP Mock Test Series, One-Time Payment",
  description: "Prices of the Himachal mock test series: Patwari, Police, JOA IT and more. One-time payment, no auto-renewal, 7-day refund. Many tests are free.",
  alternates: { canonical: "/pricing" },
};

const STEPS = [
  { icon: CreditCard, title: "Pay once", text: "UPI, cards or netbanking through Razorpay. No subscription, no auto-renewal." },
  { icon: Unlock, title: "Unlocked at once", text: "Every test in the series opens on your account straight after payment." },
  { icon: RefreshCcw, title: "7-day refund", text: "Change of mind within 7 days, before you start a test? You get your money back." },
];

const FAQS = [
  { q: "Is it a subscription?", a: "No. Every plan is a one-time payment. Nothing renews automatically, so you never have to cancel anything." },
  { q: "How long does my access last?", a: "The validity is printed on each plan, for example 'valid 365 days'. Within that time you can attempt every test as many times as you like." },
  { q: "Which payment methods work?", a: "UPI, debit and credit cards and netbanking, through Razorpay. The price shown includes GST." },
  { q: "Can I try before I pay?", a: "Yes. Every exam has free tests in the same CBT screen as the paid ones, and many paid tests have a free demo. Free tests need no login." },
  { q: "What if I buy and then change my mind?", a: "Ask for a refund within 7 days, as long as you have not started a test in that series. The full rules are on the refund policy page." },
  { q: "Which plan should I pick?", a: "If you are preparing for one exam, buy that exam's series. If you are preparing for several, the all-access pass is cheaper than buying each series." },
];

export default async function PricingPage() {
  const products = await listActiveProducts();
  const pass = products.find((p) => p.kind === "PASS");
  const series = products.filter((p) => p.kind !== "PASS");
  const planCount = products.length === 0 ? 3 : 1 + series.length + (pass ? 1 : 0);
  const cheapest = products[0];

  return (
    <>
      <JsonLd
        data={[
          faqPageJsonLd(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Pricing", item: `${site.url}/pricing` },
            ],
          },
        ]}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="relative mx-auto w-full max-w-6xl space-y-3 px-4 pb-20 pt-6 sm:pb-24">
            <Breadcrumbs light links={[{ href: "/", label: "Home" }]} current="Pricing" />
            <h1 className="max-w-3xl text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">Cheaper than a single guide book</h1>
            <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
              सस्ती कीमत, एक बार का भुगतान, कोई auto-renewal नहीं।
            </p>
            <p className="max-w-2xl text-white/85">
              Many tests are free. Paid series start {cheapest ? `at ${rupees(cheapest.priceInPaise)}` : "at a very low price"}, and you pay only for the exam you are preparing for.
            </p>
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24" />
        </section>

        <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-10 sm:py-14">
          <section aria-label="Plans" className={`grid gap-5 ${planCount >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : planCount === 3 ? "md:grid-cols-3" : "mx-auto max-w-4xl md:grid-cols-2"}`}>
            <Plan name="Free" price="₹0" note="forever" items={["Free mock tests", "Real CBT interface", "Solutions in Hindi & English", "HP rank on free tests"]} cta={{ href: FREE_MOCK_HREF, label: "Start free test" }} />
            {series.map((p) => (
              <Plan key={p.slug} {...productPlan(p)} badge={series.length === 1 && !pass ? "Recommended" : undefined} />
            ))}
            {pass && <Plan {...productPlan(pass)} badge="Best value" />}
            {products.length === 0 && (
              <>
                <Plan name="Exam Test Series" price="₹49–99" note="per exam" soon items={["20–40 full mock tests", "Previous-year papers", "Sectional & topic tests", "Detailed analysis"]} />
                <Plan badge="Best value" name="All-Access Pass" price="₹299" note="per year" soon items={["Every Himachal exam", "All mock tests & PYQs", "HP GK & current affairs tests", "Best value for serious aspirants"]} />
              </>
            )}
          </section>

          <section aria-labelledby="how-h" className="space-y-5">
            <h2 id="how-h" className="text-2xl font-bold tracking-tight">
              How buying works
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.title} className={`${card} flex gap-4 p-5`}>
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <s.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <ShieldCheck className="size-4 text-success" aria-hidden /> Secure payment via Razorpay. Prices include GST.
            </p>
          </section>

          <section aria-labelledby="faq-h" className="mx-auto w-full max-w-3xl space-y-4">
            <h2 id="faq-h" className="text-2xl font-bold tracking-tight">
              Pricing questions
            </h2>
            <div className="space-y-2.5">
              {FAQS.map((f) => (
                <details key={f.q} className={`${card} group`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold sm:p-5">{f.q}</summary>
                  <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted sm:px-5 sm:pb-5">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="text-sm text-muted">
              Full rules: <Link href="/refund-policy" className="font-medium text-primary hover:underline">refund policy</Link> and{" "}
              <Link href="/terms" className="font-medium text-primary hover:underline">terms of use</Link>.
            </p>
          </section>

          <section className="flex flex-col gap-4 rounded-3xl bg-linear-to-r from-[#133a9e] to-[#1e4fd8] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="space-y-1">
              <h2 className="text-xl font-bold sm:text-2xl">Not sure yet? Take a free test first.</h2>
              <p className="text-white/80">Same CBT screen as the paid tests. No login, no payment.</p>
            </div>
            <Link href="/tests" className={btn("accent", "lg", "shrink-0")}>
              Choose your exam
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
