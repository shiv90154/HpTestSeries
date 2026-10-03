import { Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { LiveCountdown } from "@/components/live-countdown";
import { ResultView } from "@/components/result-view";
import { btn, card } from "@/components/ui";
import { getAttemptResult, getResultLock } from "@/modules/assessment/service";
import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { getPreferredLang, requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

export default async function ResultPage({ params }: PageProps<"/results/[attemptId]">) {
  const { attemptId } = await params;
  const user = await requireUser(`/results/${attemptId}`);

  // A live test keeps score, solutions and the leaderboard hidden until its window closes.
  const lock = await getResultLock(user.id, attemptId);
  if (lock) {
    const opens = new Date(lock.opensAt).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
    return (
      <>
        <AppHeader user={user} />
        <main className="mx-auto grid w-full max-w-md flex-1 place-items-center px-4 py-12 text-center">
          <div className={`${card} w-full space-y-4 p-6`}>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-soft text-success">
              <Trophy className="size-5" aria-hidden />
            </span>
            <h1 className="text-xl font-semibold">Answers submitted</h1>
            <p className="text-muted">
              {lock.title} is still open for other students. Your score, rank and solutions appear on {opens} (IST) — this page opens by itself.
            </p>
            <LiveCountdown to={lock.opensAt} />
            <Link href="/dashboard" className={btn("ghost")}>
              Back to dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

  const [data, lang] = await Promise.all([getAttemptResult(user.id, attemptId), getPreferredLang(user.id)]);
  if (!data) notFound();
  return (
    <>
      <AppHeader user={user} />
      <ResultView data={data} isGuest={false} defaultLang={lang} askName={user.name === PLACEHOLDER_NAME} />
    </>
  );
}
