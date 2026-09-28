import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { btn } from "@/components/ui";
import { rupees } from "@/lib/money";
import { canUserAccessTest, getPaper, getTestMeta } from "@/modules/assessment/service";
import { getBuyOptionForSeries } from "@/modules/commerce/product-service";
import { getCurrentUser } from "@/modules/identity/session";
import { Cbt } from "./cbt";

export const metadata: Metadata = { title: "Test in progress", robots: { index: false, follow: false } };

export default async function AttemptPage({ params }: PageProps<"/tests/[slug]/attempt">) {
  const { slug } = await params;
  const [meta, user] = await Promise.all([getTestMeta(slug), getCurrentUser()]);
  if (!meta) notFound();

  if (!(await canUserAccessTest(user?.id ?? null, meta))) {
    const buy = await getBuyOptionForSeries(meta.series.map((s) => s.seriesId));
    return (
      <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{meta.title}</h1>
          <p className="text-muted">This test is part of a paid test series. Try the first half free, or unlock the full test.</p>
          <div className="flex flex-col gap-2">
            <Link href={`/tests/${slug}/demo`} className={btn("primary", "lg")}>
              Try free demo
            </Link>
            {buy && (
              <Link href={buy.href} className={btn("accent", "lg")}>
                Unlock full test — {rupees(buy.priceInPaise)}
              </Link>
            )}
            {!user && (
              <Link href={`/login?next=/tests/${slug}/attempt`} className={btn("ghost")}>
                Already purchased? Log in
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  const paper = await getPaper(slug);
  if (!paper) notFound();
  return <Cbt paper={paper} candidate={user ? { name: user.name } : null} />;
}
