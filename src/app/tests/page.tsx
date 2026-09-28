import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedTests } from "@/modules/catalog/queries";
import { TestGrid, TestsBrowser } from "./tests-browser";

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
        {/* The filters read the URL, so they render in the browser; the prerendered HTML keeps the full list for SEO. */}
        <Suspense fallback={<TestGrid tests={tests} />}>
          <TestsBrowser tests={tests} />
        </Suspense>
        {tests.length === 0 && <p className="text-muted">New tests are being added. Check back soon.</p>}
      </main>
      <SiteFooter />
    </>
  );
}
