import { BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { examLabel } from "@/modules/catalog/queries";
import { getProductForSale } from "@/modules/commerce/product-service";
import { getOwnership } from "@/modules/commerce/purchases";
import { REFERRAL_COOKIE } from "@/modules/commerce/referral-rules";
import { getCurrentUser } from "@/modules/identity/session";
import { BuyButton } from "./buy-button";

const FEATURES = ["Real CBT exam interface", "Hindi & English questions", "Detailed solutions for every question", "HP rank and topic-wise analysis"];

export async function generateMetadata({ params }: PageProps<"/buy/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForSale(slug);
  if (!product) return {};
  return {
    title: `Buy ${product.title}`,
    description: `${product.title} for ₹${(product.priceInPaise / 100).toLocaleString("en-IN")} — Himachal exam mock tests in a real CBT interface with Hindi & English questions, solutions and HP rank.`,
    robots: { index: false }, // checkout page; pricing is indexed on /pricing
  };
}

export default async function BuyPage({ params }: PageProps<"/buy/[slug]">) {
  const { slug } = await params;
  const [product, user] = await Promise.all([getProductForSale(slug), getCurrentUser()]);
  if (!product) notFound();
  // A friend's shared link (/r/<code>) leaves its code in a cookie; pre-fill it in the coupon box.
  const referralCode = (await cookies()).get(REFERRAL_COOKIE)?.value ?? "";

  const own = user ? await getOwnership(user.id, product.id) : ({ kind: "none" } as const);
  const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  const rupees = (product.priceInPaise / 100).toLocaleString("en-IN");
  // Same precedence as fulfillOrder: a fixed end date wins over relative validity.
  const validity = product.validUntil
    ? `valid till ${product.validUntil.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}`
    : product.validityDays
      ? `valid ${product.validityDays} days`
      : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12">
        <div className={`${card} space-y-6 p-6`}>
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            {product.titleHi && (
              <p lang="hi" className="text-muted">
                {product.titleHi}
              </p>
            )}
          </div>
          <div>
            <p className="text-4xl font-bold tabular-nums">
              ₹{rupees}
              {validity && <span className="ml-2 text-sm font-normal text-muted">{validity}</span>}
            </p>
            <p className="mt-1 text-xs text-muted">One-time payment · final price, nothing extra · no auto-renewal</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold">What you get</h2>
            <ul className="space-y-2 text-sm">
              {product.kind === "PASS" ? (
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>
                    <b>Every paid test on the platform</b>
                    {product.paidTestCount > 0 && ` — ${product.paidTestCount} tests today`}, plus every new test added while your pass is valid
                  </span>
                </li>
              ) : (
                product.series.map((s) => (
                  <li key={s.title} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>
                      <b>{s.title}</b>
                      <span className="text-muted">
                        {" "}
                        · {examLabel(s.bodySlug, s.examName)}
                        {s.testCount > 0 && ` · ${s.testCount} test${s.testCount === 1 ? "" : "s"}`}
                      </span>
                    </span>
                  </li>
                ))
              )}
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {own.kind === "owned" ? (
            <div className="space-y-3 rounded-xl border border-success bg-success-soft p-4 text-sm">
              <p className="flex items-start gap-2 font-semibold text-success">
                <BadgeCheck className="mt-0.5 size-4 shrink-0" /> You already have access until {date(own.until)}
              </p>
              {own.via !== "same" && <p className="text-foreground/85">It&apos;s included in your {own.viaTitle}.</p>}
              <Link href="/tests" className={btn("primary", "md", "w-full")}>
                Start practising
              </Link>
            </div>
          ) : (
            <>
              {own.kind === "renewable" && (
                <p className="rounded-xl bg-accent-soft p-3 text-sm">
                  Your current access ends on <b>{date(own.until)}</b>. Renew now and the new period starts right after it — you
                  don&apos;t lose any days.
                </p>
              )}
              <BuyButton productSlug={product.slug} pricePaise={product.priceInPaise} user={user} label={own.kind === "renewable" ? "Renew now" : undefined} initialCode={referralCode} />
            </>
          )}
          <div className="space-y-2 text-xs text-muted">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" /> Secure payment via Razorpay (UPI, cards, netbanking).
            </p>
            <p>
              By paying you agree to our{" "}
              <Link href="/terms" className="font-medium text-primary hover:underline">
                Terms of use
              </Link>{" "}
              and{" "}
              <Link href="/refund-policy" className="font-medium text-primary hover:underline">
                Refund &amp; cancellation policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
