import { CalendarClock, Lock, Phone, Trophy } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LiveCountdown } from "@/components/live-countdown";
import { btn, card } from "@/components/ui";
import type { LiveGate } from "@/modules/assessment/service";

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

/** What a student sees instead of the paper when a live test isn't open to them. No questions are sent. */
export function LiveGateScreen({ gate, title, slug }: { gate: Exclude<LiveGate, { kind: "ok" }>; title: string; slug: string }) {
  let icon = <CalendarClock className="size-5" aria-hidden />;
  let body: React.ReactNode;
  switch (gate.kind) {
    case "upcoming":
      body = (
        <>
          <p className="text-muted">The live test starts on {when(gate.startsAt)} (IST). Keep this page open — it starts by itself.</p>
          <LiveCountdown to={gate.startsAt} />
        </>
      );
      break;
    case "ended":
      icon = <Trophy className="size-5" aria-hidden />;
      body = <p className="text-muted">This live test has ended. Watch for the next one, and practise with our mock tests meanwhile.</p>;
      break;
    case "done":
      icon = <Trophy className="size-5" aria-hidden />;
      body = (
        <>
          <p className="text-muted">You have taken this live test. Results, solutions and the leaderboard open on {when(gate.endsAt)} (IST).</p>
          <LiveCountdown to={gate.endsAt} />
        </>
      );
      break;
    case "phone":
      icon = <Phone className="size-5" aria-hidden />;
      body = (
        <>
          <p className="text-muted">
            Live tests need an account with a verified mobile number, so the leaderboard stays one account per student. Log in with your mobile number (OTP) to join.
          </p>
          <Link href={`/login?next=/tests/${slug}/attempt`} className={btn("primary", "lg")}>
            Log in with mobile number
          </Link>
        </>
      );
      break;
    case "login":
      icon = <Lock className="size-5" aria-hidden />;
      body = (
        <>
          <p className="text-muted">Log in to join this live test. Your rank and any prize are tied to your account.</p>
          <Link href={`/login?next=/tests/${slug}/attempt`} className={btn("primary", "lg")}>
            Log in to join
          </Link>
        </>
      );
      break;
  }
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-md flex-1 place-items-center px-4 py-12 text-center">
        <div className={`${card} w-full space-y-4 p-6`}>
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft text-accent-ink">{icon}</span>
          <h1 className="text-xl font-semibold">{title}</h1>
          {body}
        </div>
      </main>
    </>
  );
}
