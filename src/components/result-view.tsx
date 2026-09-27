"use client";

import { Award, CheckCircle2, Clock, LogIn, RotateCcw, Target, Trophy, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Bilingual, ResultData } from "@/modules/assessment/types";
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

export function ResultView({ data, isGuest }: { data: ResultData; isGuest: boolean }) {
  const [lang, setLang] = useState<Lang>("en");
  const [filter, setFilter] = useState<Filter>("all");
  const hasHindi = data.questions.some((q) => q.stem.hi);

  const attempted = data.correct + data.wrong;
  const accuracy = pct(data.correct, attempted);
  const total = data.questions.length;

  const outcome = (q: ResultData["questions"][number]): Exclude<Filter, "all"> =>
    !q.chosenOptionId ? "skipped" : q.chosenOptionId === q.correctOptionId ? "correct" : "wrong";

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
                <p className="whitespace-pre-line font-reading leading-relaxed">{pick(q.stem, lang)}</p>
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
                        <span className="flex-1">{pick(opt.text, lang)}</span>
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
                    <p className="font-reading">{pick(q.explanation, lang)}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/tests/${data.test.slug}/attempt`} className={btn("outline")}>
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
