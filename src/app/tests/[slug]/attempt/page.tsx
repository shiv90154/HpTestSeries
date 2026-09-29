import { Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { canUserAccessTest, getPaper, getTestMeta } from "@/modules/assessment/service";
import { getBuyOptionForSeries } from "@/modules/commerce/product-service";
import { getCurrentUser, getPreferredLang } from "@/modules/identity/session";
import { Cbt } from "./cbt";

export const metadata: Metadata = { title: "Test in progress", robots: { index: false, follow: false } };

export default async function AttemptPage({ params }: PageProps<"/tests/[slug]/attempt">) {
  const { slug } = await params;
  const [meta, user] = await Promise.all([getTestMeta(slug), getCurrentUser()]);
  if (!meta) notFound();

  if (!(await canUserAccessTest(user?.id ?? null, meta))) {
    const buy = await getBuyOptionForSeries(meta.series.map((s) => s.seriesId));
    return (
      <>
        <SiteHeader />
        <main className="mx-auto grid w-full max-w-md flex-1 place-items-center px-4 py-12 text-center">
          <div className={`${card} w-full space-y-4 p-6`}>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft text-accent-ink">
              <Lock className="size-5" aria-hidden />
            </span>
            <h1 className="text-xl font-semibold">{meta.title}</h1>
            <p className="text-muted">
              {meta.demo ? "This test is part of a paid test series. Try a free demo, or unlock the full test." : "This test is part of a paid test series. Unlock it to start."}
            </p>
            <div className="flex flex-col gap-2">
              {meta.demo && (
                <Link href={`/tests/${slug}/demo`} className={btn("primary", "lg")}>
                  Try free demo
                </Link>
              )}
              {buy && (
                <Link href={buy.href} className={btn(meta.demo ? "accent" : "primary", "lg")}>
                  Unlock full test — {rupees(buy.priceInPaise)}
                </Link>
              )}
              {!user && (
                <Link href={`/login?next=/tests/${slug}/attempt`} className={btn("ghost")}>
                  Already purchased? Log in
                </Link>
              )}
              <Link href="/tests" className="text-sm font-medium text-primary hover:underline">
                Browse free tests
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const [paper, defaultLang] = await Promise.all([getPaper(slug), user ? getPreferredLang(user.id) : undefined]);
  if (!paper) notFound();
  return <Cbt paper={paper} candidate={user ? { name: user.name } : null} defaultLang={defaultLang} />;
}
