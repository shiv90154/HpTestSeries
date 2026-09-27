import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/result-view";
import { SiteHeader } from "@/components/site-header";
import { getAttemptResult } from "@/modules/assessment/service";
import { requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

export default async function ResultPage({ params }: PageProps<"/results/[attemptId]">) {
  const { attemptId } = await params;
  const user = await requireUser(`/results/${attemptId}`);
  const data = await getAttemptResult(user.id, attemptId);
  if (!data) notFound();
  return (
    <>
      <SiteHeader />
      <ResultView data={data} isGuest={false} />
    </>
  );
}
