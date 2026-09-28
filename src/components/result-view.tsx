"use client";

import confetti from "canvas-confetti";
import { Award, CheckCircle2, Clock, Lock, LogIn, RotateCcw, Target, Trophy, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { RichContent } from "@/components/rich-content";
import type { Bilingual, ResultData } from "@/modules/assessment/types";
import { writeLangPref } from "@/lib/lang-pref";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { ReportQuestion } from "./report-question";
import { ShareButtons } from "./share-buttons";
import { btn, card } from "./ui";

type Lang = "en" | "hi";
type Filter = "all" | "correct" | "wrong" | "skipped";

const pick = (t: Bilingual, lang: Lang) => t[lang] ?? t.en ?? t.hi ?? "";
const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0);

function duration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
}

/**
 * isGuest: result not saved to an account. loggedIn: can report questions (a guest may log in afterwards).
 * defaultLang: the student's profile language, or a guest's last pick on this device.
 */
export function ResultView({
  data,
  isGuest,
  loggedIn = !isGuest,
  defaultLang = "en",
}: {
  data: ResultData;
  isGuest: boolean;
  loggedIn?: boolean;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (isGuest) writeLangPref(l);
  };
  const [filter, setFilter] = useState<Filter>("all");
  const hasHindi = data.questions.some((q) => q.stem.hi);

  const attempted = data.correct + data.wrong;
  const accuracy = pct(data.correct, attempted);
  const total = data.questions.length;

  const outcome = (q: ResultData["questions"][number]): Exclude<Filter, "all"> =>
    !q.chosenOptionId ? "skipped" : q.chosenOptionId === q.correctOptionId ? "correct" : "wrong";

  // A little celebration for a strong result — top-3 rank or a clearly good score.
  useEffect(() => {
    const scorePct = pct(data.score, data.maxScore);
    if (!(data.rank && data.rank.rank <= 3) && scorePct < 80) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 }, colors: ["#1e4fd8", "#f59e0b", "#16a34a"] });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once when the result mounts
  }, []);

  const shown = useMemo(
    () => (filter === "all" ? data.questions : data.questions.filter((q) => outcome(q) === filter)),
    [data.questions, filter],
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:py-10">
      {/* Score header */}
      <section className="overflow-hidden rounded-3xl bg-linear-to-br from-[#133a9e] via-[#1e4fd8] to-[#3b6ef5] text-white shadow-lg">
        <div className="grid gap-6 p-6 sm:grid-cols-[1.2fr_1fr] sm:p-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/75">Test result</p>
            <h1 className="text-xl font-semibold sm:text-2xl">{data.test.title}</h1>
            <p className="flex items-end gap-2">
              <span className="text-5xl font-bold tabular-nums">{data.score}</span>
              <span className="pb-1.5 text-lg text-white/75">/ {data.maxScore}</span>
            </p>
            <div className="h-2.5 w-full max-w-sm overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, pct(data.score, data.maxScore))}%` }} />
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            {data.rank ? (
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm text-white/80">
                  <Trophy className="size-4 text-accent" /> Your HP rank
                </p>
                <p className="text-4xl font-bold tabular-nums">
                  #{data.rank.rank}
                  <span className="ml-2 text-base font-medium text-white/70">of {data.rank.total}</span>
                </p>
                <p className="text-sm text-white/85">
                  Better than <b>{data.rank.percentile}%</b> of candidates · Topper {data.rank.topScore} · Average {data.rank.avgScore}
                </p>
              </div>
            ) : data.demo ? (
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm text-white/80">
                  <Lock className="size-4 text-accent" /> Free demo · {total} of {data.demo.totalQuestions} questions
                </p>
                <p className="text-sm text-white/90">
                  Unlock the full test to attempt the other {data.demo.lockedTotal} questions and get your HP rank, solutions and topic analysis.
                </p>
                <UnlockButton demo={data.demo} size="sm" />
              </div>
            ) : isGuest ? (
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm text-white/80">
                  <Trophy className="size-4 text-accent" /> Want your HP rank?
                </p>
                <p className="text-sm text-white/90">
                  Log in (free) to save results, see your rank among Himachal aspirants and track weak topics.
                </p>
                <Link href={`/login?next=/tests/${data.test.slug}/attempt`} className={btn("accent", "sm")}>
                  <LogIn className="size-4" /> Log in &amp; attempt for rank
                </Link>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-center gap-2 text-white/80">
                  <RotateCcw className="size-4 text-accent" /> Re-attempt
                </p>
                <p>Rank is calculated only on your first attempt, so every candidate is compared fairly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share: result pages are private, so the link goes to the public test page. */}
      <section className={`${card} p-5`}>
        <ShareButtons
          label={data.rank ? "Share your rank — challenge your friends" : "Challenge your friends to beat your score"}
          url={`${site.url}/tests/${data.test.slug}`}
          text={
            data.rank
              ? `Maine "${data.test.title}" me HP rank #${data.rank.rank} paaya (${data.score}/${data.maxScore}) 🏔️ Tum bhi try karo — free mock test:`
              : `Maine "${data.test.title}" me ${data.score}/${data.maxScore} score kiya 🏔️ Tum bhi try karo — free mock test:`
          }
        />
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<CheckCircle2 className="size-5 text-success" />} label="Correct" value={`${data.correct}`} sub={`of ${total}`} />
        <Stat icon={<XCircle className="size-5 text-danger" />} label="Wrong" value={`${data.wrong}`} sub={`${data.skipped} skipped`} />
        <Stat icon={<Target className="size-5 text-primary" />} label="Accuracy" value={`${accuracy}%`} sub={`${attempted} attempted`} />
        <Stat icon={<Clock className="size-5 text-accent-strong" />} label="Time taken" value={duration(data.timeSpentSec)} sub={`of ${Math.round(data.test.durationSec / 60)} min`} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Sections */}
        <section className={`${card} p-5`}>
          <h2 className="mb-4 font-semibold">Section-wise analysis</h2>
          <div className="space-y-4">
            {data.sections.map((s) => {
              const qn = s.correct + s.wrong + s.skipped;
              return (
                <div key={s.name} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="tabular-nums text-muted">
                      <b className="text-foreground">{s.score}</b> / {s.maxScore} · {duration(s.timeSpentSec)}
                    </span>
                  </div>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-muted" aria-hidden>
                    <div className="bg-success" style={{ width: `${pct(s.correct, qn)}%` }} />
                    <div className="bg-danger" style={{ width: `${pct(s.wrong, qn)}%` }} />
                  </div>
                  <p className="text-xs text-muted">
                    {s.correct} correct · {s.wrong} wrong · {s.skipped} skipped
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Topics */}
        <section className={`${card} p-5`}>
          <h2 className="mb-1 font-semibold">Topic accuracy</h2>
          <p className="mb-4 text-xs text-muted">Correct ÷ attempted, weakest first — revise these next.</p>
          <ul className="space-y-3">
            {data.topics.map((t) => {
              const attempted = t.correct + t.wrong;
              const a = pct(t.correct, attempted);
              if (!attempted) {
                return (
                  <li key={t.name} className="flex justify-between text-sm text-muted">
                    <span>{t.name}</span>
                    <span>Not attempted</span>
                  </li>
                );
              }
              return (
                <li key={t.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{t.name}</span>
                    <span className={`font-semibold tabular-nums ${a >= 70 ? "text-success" : a >= 40 ? "text-accent-strong" : "text-danger"}`}>
                      {a}% <span className="font-normal text-muted">({t.correct}/{attempted})</span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                    <div className={`h-full ${a >= 70 ? "bg-success" : a >= 40 ? "bg-accent" : "bg-danger"}`} style={{ width: `${a}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Solutions */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="mr-auto text-lg font-semibold">Solutions</h2>
          {hasHindi && (
            <div className="flex rounded-xl border border-border bg-surface p-1 text-sm">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-lg px-3 py-1.5 font-medium ${lang === l ? "bg-primary text-white" : "text-muted"}`}
                >
                  {l === "en" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 text-sm">
          {(
            [
              ["all", `All (${total})`],
              ["correct", `Correct (${data.correct})`],
              ["wrong", `Wrong (${data.wrong})`],
              ["skipped", `Skipped (${data.skipped})`],
            ] as const
          ).map(([f, label]) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-medium ${filter === f ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <ol className="space-y-4">
          {shown.map((q) => {
            const o = outcome(q);
            return (
              <li key={q.id} className={`${card} p-5`}>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-surface-muted px-2 py-1 font-semibold">Q{q.number}</span>
                  <span className="text-muted">{q.section}</span>
                  {q.topic && <span className="text-muted">· {q.topic}</span>}
                  <span
                    className={`ml-auto rounded-full px-2.5 py-1 font-semibold ${o === "correct" ? "bg-success-soft text-success" : o === "wrong" ? "bg-danger-soft text-danger" : "bg-surface-muted text-muted"}`}
                  >
                    {o === "correct" ? "Correct" : o === "wrong" ? "Wrong" : "Not attempted"}
                  </span>
                  <span className="text-muted">{duration(q.timeSec)}</span>
                </div>
                <RichContent text={pick(q.stem, lang)} className="font-reading leading-relaxed" />
                <ul className="mt-4 space-y-2 font-reading text-[15px]">
                  {q.options.map((opt, i) => {
                    const isCorrect = opt.id === q.correctOptionId;
                    const isChosen = opt.id === q.chosenOptionId;
                    return (
                      <li
                        key={opt.id}
                        className={`flex items-start gap-3 rounded-lg border px-3.5 py-2.5 ${isCorrect ? "border-success bg-success-soft" : isChosen ? "border-danger bg-danger-soft" : "border-border"}`}
                      >
                        <span className="font-sans text-sm font-semibold text-muted">{String.fromCharCode(65 + i)}.</span>
                        <RichContent text={pick(opt.text, lang)} className="flex-1" />
                        {isCorrect && <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Correct answer" />}
                        {isChosen && !isCorrect && <XCircle className="size-5 shrink-0 text-danger" aria-label="Your answer" />}
                      </li>
                    );
                  })}
                </ul>
                {pick(q.explanation, lang) && (
                  <div className="mt-4 rounded-xl bg-primary-soft/60 p-4 text-sm leading-relaxed">
                    <p className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
                      <Award className="size-4" /> Explanation
                    </p>
                    <RichContent text={pick(q.explanation, lang)} className="font-reading" />
                  </div>
                )}
                <div className="mt-4 border-t border-border pt-3">
                  <ReportQuestion questionId={q.id} lang={lang} loginHref={!loggedIn ? `/login?next=${encodeURIComponent(`/tests/${data.test.slug}/result`)}` : null} />
                </div>
              </li>
            );
          })}
        </ol>
        {data.demo && (
          <div className="space-y-3 rounded-2xl border border-accent bg-accent-soft p-6 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-full bg-accent/25">
              <Lock className="size-5 text-accent-strong" aria-hidden />
            </span>
            <p className="text-lg font-semibold">{data.demo.lockedTotal} more questions are locked</p>
            <p className="mx-auto max-w-md text-sm text-foreground/85">
              You solved the free half of this test. Unlock the rest to complete the full paper with detailed solutions and your rank among Himachal aspirants.
            </p>
            <UnlockButton demo={data.demo} size="lg" />
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/tests/${data.test.slug}/${data.demo ? "demo" : "attempt"}`} className={btn("outline")}>
          <RotateCcw className="size-4" /> Re-attempt
        </Link>
        <Link href="/tests" className={btn("primary")}>
          More mock tests
        </Link>
        {!isGuest && (
          <Link href="/dashboard" className={btn("ghost")}>
            Go to dashboard
          </Link>
        )}
      </div>
    </div>
  );
}

function UnlockButton({ demo, size }: { demo: NonNullable<ResultData["demo"]>; size: "sm" | "lg" }) {
  return demo.buy ? (
    <Link href={demo.buy.href} className={btn("accent", size)}>
      Pay now — {rupees(demo.buy.priceInPaise)}
    </Link>
  ) : (
    <Link href="/tests" className={btn("accent", size)}>
      See all tests
    </Link>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center gap-2 text-sm text-muted">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}
