import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { ResultView } from "@/components/result-view";
import { getAttemptResult } from "@/modules/assessment/service";
import { getPreferredLang, requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

export default async function ResultPage({ params }: PageProps<"/results/[attemptId]">) {
  const { attemptId } = await params;
  const user = await requireUser(`/results/${attemptId}`);
  const [data, lang] = await Promise.all([getAttemptResult(user.id, attemptId), getPreferredLang(user.id)]);
  if (!data) notFound();
  return (
    <>
      <AppHeader user={user} />
      <ResultView data={data} isGuest={false} defaultLang={lang} />
    </>
  );
}
