import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestCard } from "@/components/test-card";
import { getPublishedTests } from "@/modules/catalog/queries";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Free Himachal Mock Tests Online (Hindi & English)",
  description:
    "Take free online mock tests for Himachal Pradesh government exams in a real CBT interface. Himachal GK, reasoning, maths and computer questions with detailed solutions.",
  alternates: { canonical: "/tests" },
};

export default async function TestsPage() {
  const tests = await getPublishedTests();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-12">
        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Himachal mock tests</h1>
          <p className="text-muted">Real CBT exam interface · Hindi &amp; English · Instant result with solutions.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((t) => (
            <TestCard key={t.slug} test={t} />
          ))}
        </div>
        {tests.length === 0 && <p className="text-muted">New tests are being added. Check back soon.</p>}
      </main>
      <SiteFooter />
    </>
  );
}
