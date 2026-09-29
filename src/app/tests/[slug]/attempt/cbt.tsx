"use client";

import { Clock, Eye, Grid3x3, Languages, Lock, LogIn, Maximize, WifiOff, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { track } from "@/components/analytics";
import { ReportQuestion } from "@/components/report-question";
import { RichContent } from "@/components/rich-content";
import { readLangPref, writeLangPref } from "@/lib/lang-pref";
import { rupees } from "@/lib/money";
import { useFocusTrap } from "@/lib/use-focus-trap";
import type { Bilingual, Paper, SubmittedAnswers } from "@/modules/assessment/types";
import { gradeDemoAction, gradeGuestAction, saveProgressAction, startAttemptAction, submitAttemptAction } from "./actions";
import { DemoPaywall } from "./demo-paywall";
import { OnboardingTour } from "./onboarding-tour";

/** Short vibration on supported phones — a small confirmation on Save & Next / Submit taps. */
function haptic() {
  try {
    navigator.vibrate?.(15);
  } catch {
    /* not supported */
  }
}

// Real CBT semantics (TCS iON style): an option counts only after "Save & Next" or
// "Mark for Review & Next". Picking an option and jumping away discards the unsaved choice.

type Lang = "en" | "hi";
type QState = { v: boolean; s?: string; m: boolean; t: number }; // visited, saved option, marked, seconds
type Status = "notVisited" | "notAnswered" | "answered" | "marked" | "answeredMarked";
type Stored = { q: Record<string, QState>; cur: number; lang: Lang; deadline?: number; attemptId?: string };

const AUTOSAVE_MS = 30_000;
/** After time is up, how often a submit that didn't reach the server is retried (also retried on reconnect). */
const SUBMIT_RETRY_MS = 20_000;

function subscribeOnline(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/** A server action that never reached the server (no network) throws a TypeError from fetch. */
function submitErrorText(err: unknown): string {
  if (!navigator.onLine || err instanceof TypeError) return "No internet connection.";
  return err instanceof Error ? err.message : "Submit failed.";
}

function statusOf(st: QState | undefined): Status {
  if (!st?.v) return "notVisited";
  if (st.m) return st.s ? "answeredMarked" : "marked";
  return st.s ? "answered" : "notAnswered";
}

function pick(text: Bilingual, lang: Lang): string {
  return text[lang] ?? text.en ?? text.hi ?? "";
}

/** The language `pick` really returned (it falls back when a translation is missing): used for the `lang` attribute. */
function pickLang(text: Bilingual, lang: Lang): Lang {
  return text[lang] ? lang : text.en ? "en" : "hi";
}

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function readStored(key: string): Stored | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function writeStored(key: string, value: Stored | null) {
  try {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  } catch {
    /* private mode / storage full: the exam still works, it just can't resume after a reload */
  }
}

export function Cbt({
  paper,
  candidate,
  defaultLang,
  preview,
}: {
  paper: Paper;
  candidate: { name: string } | null;
  /** The student's profile language; guests fall back to the language they last picked on this device. */
  defaultLang?: Lang;
  /** Admin "view as student": nothing is started, saved or submitted, and no anti-cheat tracking. */
  preview?: { exitHref: string };
}) {
  const router = useRouter();
  // A demo is stateless like a guest attempt, even when the visitor is logged in: nothing is stored on the
  // server, so it can't use up the "first attempt" that decides their HP rank.
  const demo = paper.demo;
  const storeKey = `cbt:${paper.slug}:${preview ? "preview" : demo ? "demo" : candidate ? "user" : "guest"}`;
  // Only a real logged-in attempt talks to the server while the test runs.
  const serverAttempt = !!candidate && !demo && !preview;
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);

  const flat = useMemo(
    () =>
      paper.sections.flatMap((s, si) =>
        s.questions.map((q, qi) => ({ ...q, sectionIndex: si, numberInSection: qi + 1 })),
      ),
    [paper],
  );
  const firstIndexOfSection = useMemo(
    () => paper.sections.map((_, si) => flat.findIndex((q) => q.sectionIndex === si)),
    [paper, flat],
  );

  const [phase, setPhase] = useState<"instructions" | "exam" | "submitting">("instructions");
  const [agreed, setAgreed] = useState(false);
  const [lang, setLangState] = useState<Lang>(() =>
    defaultLang && paper.languages.includes(defaultLang) ? defaultLang : (paper.languages[0] ?? "en"),
  );
  const [qs, setQs] = useState<Record<string, QState>>({});
  const [cur, setCur] = useState(0);
  const [selection, setSelection] = useState<string | undefined>();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [violations, setViolations] = useState(0);
  const [fullscreenLost, setFullscreenLost] = useState(false);
  const [paywall, setPaywall] = useState<null | "locked" | "finished">(null);
  /** Last autosave didn't reach the server; cleared by the next successful save. */
  const [syncFailed, setSyncFailed] = useState(false);
  /** Time is up but the submit didn't reach the server: stay on the submitting screen and keep retrying. */
  const [submitIssue, setSubmitIssue] = useState<string | null>(null);

  const shownAt = useRef(0); // set when the exam starts
  const dirty = useRef(false);
  const saving = useRef(false);
  const qsRef = useRef(qs);
  const submittedRef = useRef(false);
  const violationsRef = useRef(0);
  const leavingRef = useRef(false); // set when leaving for checkout: exiting fullscreen then is not a violation
  const lastViolationToastAt = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const confirmDialogRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);

  useFocusTrap(drawerRef, paletteOpen, () => setPaletteOpen(false));
  useFocusTrap(confirmDialogRef, confirmOpen, () => setConfirmOpen(false));

  const q = flat[cur];

  // Language: the one used in this attempt before a reload wins; guests otherwise get their last pick on this device.
  useEffect(() => {
    const saved = readStored(storeKey)?.lang ?? (candidate ? null : readLangPref());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from localStorage
    if (saved && paper.languages.includes(saved)) setLangState(saved);
  }, [storeKey, candidate, paper.languages]);

  function setLang(l: Lang) {
    setLangState(l);
    if (!candidate) writeLangPref(l);
  }

  useEffect(() => {
    qsRef.current = qs;
  });

  /** Adds time spent on the current question and returns the updated map. */
  const commitTime = useCallback(
    (map: Record<string, QState>): Record<string, QState> => {
      const elapsed = Math.round((Date.now() - shownAt.current) / 1000);
      shownAt.current = Date.now();
      if (!q || elapsed <= 0) return map;
      const st = map[q.id] ?? { v: true, m: false, t: 0 };
      return { ...map, [q.id]: { ...st, t: st.t + elapsed } };
    },
    [q],
  );

  const toAnswers = useCallback((map: Record<string, QState>): SubmittedAnswers => {
    const out: SubmittedAnswers = {};
    for (const [id, st] of Object.entries(map)) {
      if (!st.v) continue;
      out[id] = { t: st.t, ...(st.s && { o: st.s }), ...(st.m && { m: true }) };
    }
    return out;
  }, []);

  // Anti-cheating: honour-system deterrents only — logs are shown to the student, sent to the
  // server, and surfaced to admins (flagged if excessive), but nothing here can stop a determined
  // cheater (e.g. a second device). See AGENTS.md-adjacent docs — this is a best-effort signal, not enforcement.
  const recordViolation = useCallback((message: string) => {
    if (leavingRef.current) return;
    violationsRef.current += 1;
    setViolations(violationsRef.current);
    dirty.current = true;
    const now = Date.now();
    if (now - lastViolationToastAt.current > 4000) {
      lastViolationToastAt.current = now;
      toast.warning(message);
    }
  }, []);

  // Tab switch / minimise detection.
  useEffect(() => {
    if (phase !== "exam" || preview) return;
    const onVisibility = () => {
      if (document.hidden) recordViolation("Tab switch detected — this has been recorded.");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [phase, preview, recordViolation]);

  // Right-click and copy/cut/paste are disabled during the exam (except in the report-a-question form).
  useEffect(() => {
    if (phase !== "exam" || preview) return;
    const block = (e: Event) => e.preventDefault();
    const onCopyLike = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-allow-paste]")) return;
      e.preventDefault();
      recordViolation("Copying is not allowed during the test.");
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", onCopyLike);
    document.addEventListener("cut", onCopyLike);
    document.addEventListener("paste", onCopyLike);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", onCopyLike);
      document.removeEventListener("cut", onCopyLike);
      document.removeEventListener("paste", onCopyLike);
    };
  }, [phase, preview, recordViolation]);

  // Fullscreen enforcement: request it on entering the exam, flag when the student exits it.
  useEffect(() => {
    if (phase !== "exam" || preview) return;
    document.documentElement.requestFullscreen?.().catch(() => {});
    const onFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      setFullscreenLost(!inFullscreen);
      if (!inFullscreen) recordViolation("You exited fullscreen — this has been recorded.");
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [phase, preview, recordViolation]);

  // Persist locally on every change so a reload or dead battery doesn't lose answers.
  useEffect(() => {
    if (phase !== "exam") return;
    writeStored(storeKey, { q: qs, cur, lang, deadline: deadline ?? undefined, attemptId: attemptId ?? undefined });
  }, [phase, qs, cur, lang, deadline, attemptId, storeKey]);

  function go(index: number, map = qs) {
    if (index < 0 || index >= flat.length) return;
    let next = commitTime(map);
    const target = flat[index];
    const st = next[target.id] ?? { v: false, m: false, t: 0 };
    next = { ...next, [target.id]: { ...st, v: true } };
    setQs(next);
    setCur(index);
    setSelection(next[target.id].s);
    setPaletteOpen(false);
    dirty.current = true;
    // Moving to another section is a natural checkpoint: sync now instead of waiting for the timer.
    if (target.sectionIndex !== q.sectionIndex) void flush(next);
  }

  function saveAndNext(mark: boolean) {
    haptic();
    const st = qs[q.id] ?? { v: true, m: false, t: 0 };
    const map = { ...qs, [q.id]: { ...st, v: true, s: selection, m: mark } };
    if (cur < flat.length - 1) go(cur + 1, map);
    else {
      setQs(commitTime(map));
      dirty.current = true;
      if (demo) {
        setPaywall("finished");
        track("demo_paywall_view", { test_slug: paper.slug, reason: "finished" });
      }
    }
  }

  function openLocked() {
    setPaywall("locked");
    track("demo_paywall_view", { test_slug: paper.slug, reason: "locked" });
  }

  /** Leaving for checkout: drop fullscreen quietly so the buy page isn't stuck in it. */
  function payNow() {
    leavingRef.current = true;
    track("demo_pay_click", { test_slug: paper.slug });
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
  }

  function clearResponse() {
    setSelection(undefined);
    const st = qs[q.id] ?? { v: true, m: false, t: 0 };
    setQs({ ...qs, [q.id]: { ...st, s: undefined } });
    dirty.current = true;
  }

  async function begin() {
    setError(null);
    setStarting(true);
    try {
      let map: Record<string, QState> = {};
      let startAt = 0;
      if (serverAttempt) {
        const res = await startAttemptAction(paper.slug);
        if ("error" in res) throw new Error(res.error);
        setAttemptId(res.attemptId);
        setDeadline(new Date(res.deadlineAt).getTime());
        const local = readStored(storeKey);
        if (local?.attemptId === res.attemptId) {
          map = local.q;
          startAt = local.cur;
        } else {
          for (const [id, a] of Object.entries(res.answers)) map[id] = { v: true, s: a.o, m: !!a.m, t: a.t ?? 0 };
        }
      } else {
        const local = readStored(storeKey);
        if (local?.deadline && local.deadline > Date.now()) {
          map = local.q;
          startAt = local.cur;
          setDeadline(local.deadline);
        } else setDeadline(Date.now() + paper.durationSec * 1000);
      }
      const first = flat[startAt] ?? flat[0];
      map = { ...map, [first.id]: { ...(map[first.id] ?? { m: false, t: 0 }), v: true } };
      setQs(map);
      setCur(startAt);
      setSelection(map[first.id].s);
      shownAt.current = Date.now();
      setNow(Date.now());
      setPhase("exam");
      if (!preview) track(demo ? "demo_start" : "test_start", { test_slug: paper.slug, guest: !candidate });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the test.");
    } finally {
      setStarting(false);
    }
  }

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    if (preview) {
      submittedRef.current = true; // the clock would otherwise call this again every second at time-up
      setConfirmOpen(false);
      writeStored(storeKey, null);
      toast.info("Preview only — nothing was submitted.");
      router.push(preview.exitHref);
      return;
    }
    submittedRef.current = true;
    haptic();
    setConfirmOpen(false);
    setPhase("submitting");
    // On a retry the clock has already stopped: don't keep adding waiting time to the current question.
    const map = submitIssue ? qs : commitTime(qs);
    setQs(map);
    const answers = toAnswers(map);
    try {
      if (serverAttempt && attemptId) {
        const res = await submitAttemptAction(attemptId, answers, violationsRef.current);
        if ("error" in res) throw new Error(res.error);
        track("test_submit", { test_slug: paper.slug, guest: false });
        writeStored(storeKey, null);
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
        router.replace(`/results/${attemptId}`);
      } else {
        const res = demo ? await gradeDemoAction(paper.slug, answers) : await gradeGuestAction(paper.slug, answers, violationsRef.current);
        if ("error" in res) throw new Error(res.error);
        sessionStorage.setItem(`result:${paper.slug}`, JSON.stringify(res));
        track(demo ? "demo_submit" : "test_submit", { test_slug: paper.slug, guest: !candidate });
        writeStored(storeKey, null);
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
        router.replace(`/tests/${paper.slug}/result`);
      }
    } catch (err) {
      submittedRef.current = false;
      const message = submitErrorText(err);
      if (deadline !== null && Date.now() >= deadline) {
        // Time is up: going back to the exam would re-trigger the auto-submit every second. Stay here and
        // retry on reconnect / on a timer; the answers are also kept in localStorage.
        setSubmitIssue(message);
        return;
      }
      setPhase("exam");
      toast.error(`${message} Your answers are safe — please try submitting again.`);
    }
  }, [attemptId, candidate, commitTime, deadline, demo, paper.slug, preview, qs, router, serverAttempt, storeKey, submitIssue, toAnswers]);

  // Clock + auto-submit at time up. The interval always calls the latest submit via a ref.
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  });
  useEffect(() => {
    if (phase !== "exam") return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (deadline && t >= deadline) void submitRef.current();
    }, 1000);
    return () => clearInterval(id);
  }, [phase, deadline]);

  // Server autosave for logged-in attempts: every AUTOSAVE_MS, and right away when the tab is hidden, the
  // section changes or the connection comes back. A failed save stays dirty so the next one retries it.
  const flush = useCallback(async (map?: Record<string, QState>) => {
    if (!attemptId || !dirty.current || saving.current || submittedRef.current) return;
    dirty.current = false;
    saving.current = true;
    try {
      await saveProgressAction(attemptId, toAnswers(map ?? qsRef.current), violationsRef.current);
      setSyncFailed(false);
    } catch {
      dirty.current = true;
      setSyncFailed(true);
    } finally {
      saving.current = false;
    }
  }, [attemptId, toAnswers]);

  useEffect(() => {
    if (phase !== "exam" || !attemptId) return;
    const id = setInterval(() => void flush(), AUTOSAVE_MS);
    const onHidden = () => {
      if (document.hidden) void flush();
    };
    const onOnline = () => void flush();
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("online", onOnline);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("online", onOnline);
    };
  }, [phase, attemptId, flush]);

  // Time is up but the submit failed: retry when the connection returns, and every SUBMIT_RETRY_MS.
  useEffect(() => {
    if (!submitIssue) return;
    const retry = () => void submitRef.current();
    const id = setInterval(retry, SUBMIT_RETRY_MS);
    window.addEventListener("online", retry);
    return () => {
      clearInterval(id);
      window.removeEventListener("online", retry);
    };
  }, [submitIssue]);

  // Warn before closing the tab mid-exam.
  useEffect(() => {
    if (phase === "instructions" || preview) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase, preview]);

  const counts = useMemo(() => {
    const perSection = paper.sections.map(() => ({ notVisited: 0, notAnswered: 0, answered: 0, marked: 0, answeredMarked: 0 }));
    for (const item of flat) perSection[item.sectionIndex][statusOf(qs[item.id])]++;
    const total = perSection.reduce(
      (acc, s) => {
        (Object.keys(acc) as Status[]).forEach((k) => (acc[k] += s[k]));
        return acc;
      },
      { notVisited: 0, notAnswered: 0, answered: 0, marked: 0, answeredMarked: 0 },
    );
    return { perSection, total };
  }, [flat, qs, paper.sections]);

  if (phase === "instructions") {
    return (
      <Instructions
        paper={paper}
        candidate={candidate}
        lang={lang}
        setLang={setLang}
        agreed={agreed}
        setAgreed={setAgreed}
        onBegin={begin}
        starting={starting}
        error={error}
        preview={!!preview}
      />
    );
  }

  const remaining = deadline ? deadline - now : 0;
  const section = paper.sections[q.sectionIndex];
  const sectionCounts = counts.perSection[q.sectionIndex];

  const palette = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border p-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-lg font-semibold text-primary">
          {(candidate?.name ?? "G").slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 text-sm">
          <p className="truncate font-semibold">{candidate?.name ?? "Guest candidate"}</p>
          <p className="text-xs text-muted">
            {preview ? "Admin preview · nothing is saved" : demo ? "Free demo · result not saved" : candidate ? "Result will be saved" : "Result not saved"}
          </p>
        </div>
      </div>
      <Legend counts={sectionCounts} />
      <div className="bg-cbt-header px-3 py-2 text-sm font-semibold text-white" lang={lang === "hi" && section.nameHi ? "hi" : undefined}>
        {lang === "hi" && section.nameHi ? section.nameHi : section.name}
      </div>
      <p className="px-3 pt-3 text-xs font-medium text-muted">Choose a question</p>
      <div className="grid flex-1 auto-rows-min grid-cols-5 gap-2 overflow-y-auto p-3">
        {flat.map((item, i) =>
          item.sectionIndex === q.sectionIndex ? (
            <PaletteButton key={item.id} n={item.numberInSection} status={statusOf(qs[item.id])} current={i === cur} onClick={() => go(i)} />
          ) : null,
        )}
        {Array.from({ length: demo?.lockedPerSection[q.sectionIndex] ?? 0 }, (_, k) => (
          <LockedButton key={`locked-${k}`} n={section.questions.length + k + 1} onClick={openLocked} />
        ))}
      </div>
      {demo && (
        <button
          type="button"
          onClick={openLocked}
          className="mx-3 mb-3 flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-bold text-[#1f1300] hover:bg-accent-strong"
        >
          <Lock className="size-4" aria-hidden /> Unlock {demo.lockedTotal} more questions
        </button>
      )}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="h-11 w-full rounded-lg bg-cbt-submit font-semibold text-white hover:bg-cbt-submit-strong"
        >
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh flex-col overscroll-y-contain bg-white font-reading text-[15px] text-foreground">
      <OnboardingTour />
      {/* Header */}
      <header className="flex items-center gap-3 bg-cbt-header px-3 py-2 text-white sm:px-4">
        <h1 className="min-w-0 flex-1 truncate font-sans text-sm font-semibold sm:text-base" lang={lang === "hi" && paper.titleHi ? "hi" : undefined}>
          {lang === "hi" && paper.titleHi ? paper.titleHi : paper.title}
        </h1>
        {demo && (
          <>
            <span className="shrink-0 rounded-md bg-accent px-2 py-1 font-sans text-xs font-bold text-[#1f1300]">FREE DEMO</span>
            <button
              type="button"
              onClick={openLocked}
              className="hidden shrink-0 items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 font-sans text-xs font-semibold hover:bg-white/25 sm:inline-flex"
            >
              <Lock className="size-3.5" aria-hidden /> Unlock full test
            </button>
          </>
        )}
        {preview && (
          <Link
            href={preview.exitHref}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-accent px-2 py-1 font-sans text-xs font-bold text-[#1f1300]"
          >
            <Eye className="size-3.5" aria-hidden /> PREVIEW · Exit
          </Link>
        )}
        {serverAttempt && (!online || syncFailed) && (
          <span
            role="status"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-danger px-2 py-1 font-sans text-xs font-semibold text-white"
            title="Your answers are kept on this device and will be saved to the server when the connection is back."
          >
            <WifiOff className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">{online ? "Not saved to server" : "Offline — saved on this device"}</span>
            <span className="sm:hidden">Offline</span>
          </span>
        )}
        {violations > 0 && !demo && (
          <span
            className="hidden shrink-0 rounded-md bg-danger px-2 py-1 font-sans text-xs font-semibold text-white sm:inline"
            title="Tab switches, fullscreen exits and copy/paste attempts recorded this test"
          >
            {violations} flagged
          </span>
        )}
        <div
          id="cbt-timer"
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-sm font-semibold tabular-nums ${remaining < 5 * 60_000 ? "bg-danger animate-pulse" : "bg-white/15"}`}
          role="timer"
          aria-label="Time left"
        >
          <Clock className="size-4" aria-hidden />
          {fmt(remaining)}
        </div>
        <button
          id="cbt-palette-toggle"
          type="button"
          className="rounded-md bg-white/15 p-2 lg:hidden"
          onClick={() => setPaletteOpen(true)}
          aria-label="Open question palette"
        >
          <Grid3x3 className="size-5" />
        </button>
      </header>

      {/* Section tabs + language */}
      <section id="cbt-section-tabs" aria-label="Sections and language" className="flex items-center gap-2 border-b border-border bg-surface-muted px-2">
        <div className="flex min-w-0 flex-1 overflow-x-auto">
          {paper.sections.map((s, si) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(firstIndexOfSection[si])}
              lang={lang === "hi" && s.nameHi ? "hi" : undefined}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 font-sans text-sm font-medium ${si === q.sectionIndex ? "border-primary bg-white text-primary" : "border-transparent text-muted hover:text-foreground"}`}
            >
              {lang === "hi" && s.nameHi ? s.nameHi : s.name}
            </button>
          ))}
        </div>
        {paper.languages.length > 1 && (
          <label className="flex shrink-0 items-center gap-1.5 font-sans text-xs text-muted">
            <Languages className="size-4" aria-hidden />
            {/* sr-only (not hidden) on phones, so the select keeps its name when the text is not shown */}
            <span className="sr-only sm:not-sr-only">View in</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="rounded-md border border-border bg-white px-2 py-1 text-sm text-foreground"
            >
              <option value="en">English</option>
              <option value="hi" lang="hi">
                हिंदी
              </option>
            </select>
          </label>
        )}
      </section>

      {fullscreenLost && (
        <div className="flex items-center gap-3 bg-danger-soft px-4 py-2 font-sans text-sm text-danger">
          <p className="flex-1">You left fullscreen mode. Please return to it to continue the test.</p>
          <button
            type="button"
            onClick={() => void document.documentElement.requestFullscreen?.().catch(() => {})}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-danger px-3 py-1.5 font-semibold text-white"
          >
            <Maximize className="size-4" /> Re-enter fullscreen
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Question */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-sans text-sm">
            <span className="font-semibold">Question No. {q.numberInSection}</span>
            <span className="text-xs text-muted">
              Marks: <span className="font-semibold text-success">+{section.marksCorrect}</span>
              {section.marksWrong > 0 && (
                <>
                  {" "}
                  | Negative: <span className="font-semibold text-danger">−{section.marksWrong}</span>
                </>
              )}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            <RichContent text={pick(q.stem, lang)} lang={pickLang(q.stem, lang)} className="text-base leading-relaxed sm:text-[17px]" />
            <fieldset className="mt-6 space-y-2.5">
              <legend className="sr-only">Options</legend>
              {q.options.map((o, i) => {
                const checked = selection === o.id;
                return (
                  <label
                    key={o.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${checked ? "border-primary bg-primary-soft" : "border-border hover:border-[#b7c3d8] hover:bg-surface-muted"}`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      className="mt-1 size-4 accent-[var(--primary)]"
                      checked={checked}
                      onChange={() => setSelection(o.id)}
                    />
                    <span className="font-sans text-sm font-semibold text-muted">{String.fromCharCode(65 + i)}.</span>
                    <RichContent text={pick(o.text, lang)} lang={pickLang(o.text, lang)} className="flex-1 leading-relaxed" />
                  </label>
                );
              })}
            </fieldset>
            {/* Logged-in students can flag a wrong question without leaving the test (guests: from the result page). */}
            {candidate && !preview && (
              <div className="mt-6 font-sans" data-allow-paste>
                <ReportQuestion key={q.id} questionId={q.id} lang={lang} loginHref={null} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-border bg-surface-muted p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] font-sans sm:p-3">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <button
                id="cbt-mark-btn"
                type="button"
                onClick={() => saveAndNext(true)}
                className="cbt-btn border border-cbt-marked bg-white text-cbt-marked hover:bg-[#f3eefc]"
              >
                Mark for Review &amp; Next
              </button>
              <button type="button" onClick={clearResponse} className="cbt-btn border border-border bg-white hover:bg-surface-muted">
                Clear Response
              </button>
              <button
                type="button"
                onClick={() => go(cur - 1)}
                disabled={cur === 0}
                className="cbt-btn border border-border bg-white disabled:opacity-40 sm:ml-auto"
              >
                Back
              </button>
              <button
                id="cbt-save-btn"
                type="button"
                onClick={() => saveAndNext(false)}
                className="cbt-btn bg-cbt-answered text-white hover:brightness-95"
              >
                Save &amp; Next
              </button>
            </div>
          </div>
        </main>

        {/* Palette (desktop) */}
        <aside className="hidden w-[300px] shrink-0 border-l border-border bg-white font-sans lg:block">{palette}</aside>
      </div>

      {/* Palette (mobile drawer) */}
      {paletteOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Question palette">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setPaletteOpen(false)} aria-label="Close palette" />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-[320px] flex-col bg-white font-sans shadow-xl transition-transform"
            onTouchStart={(e) => {
              swipeStartX.current = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              if (swipeStartX.current === null || !drawerRef.current) return;
              const dx = Math.max(0, e.touches[0].clientX - swipeStartX.current);
              drawerRef.current.style.transform = `translateX(${dx}px)`;
            }}
            onTouchEnd={(e) => {
              if (swipeStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - swipeStartX.current;
              swipeStartX.current = null;
              if (drawerRef.current) drawerRef.current.style.transform = "";
              if (dx > 80) setPaletteOpen(false);
            }}
          >
            <button type="button" onClick={() => setPaletteOpen(false)} className="absolute right-2 top-2 rounded-md p-1.5 text-muted hover:bg-surface-muted" aria-label="Close">
              <X className="size-5" />
            </button>
            {palette}
          </div>
        </div>
      )}

      {/* Submit confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 font-sans" role="dialog" aria-modal="true" aria-labelledby="submit-title">
          <div ref={confirmDialogRef} className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <h2 id="submit-title" className="bg-cbt-header px-5 py-3 font-semibold text-white">
              Exam Summary
            </h2>
            {/* focusable so keyboard users can scroll the wide table sideways */}
            <div className="overflow-x-auto p-4" tabIndex={0} role="region" aria-label="Exam summary by section">
              <table className="w-full min-w-[560px] text-center text-sm">
                <thead className="bg-surface-muted text-xs text-muted">
                  <tr>
                    <th className="p-2 text-left">Section</th>
                    <th className="p-2">Questions</th>
                    <th className="p-2">Answered</th>
                    <th className="p-2">Not Answered</th>
                    <th className="p-2">Marked for Review</th>
                    <th className="p-2">Answered &amp; Marked</th>
                    <th className="p-2">Not Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {paper.sections.map((s, si) => {
                    const c = counts.perSection[si];
                    return (
                      <tr key={s.id} className="border-b border-border">
                        <td className="p-2 text-left font-medium">{s.name}</td>
                        <td className="p-2">{s.questions.length}</td>
                        <td className="p-2 font-semibold text-cbt-answered">{c.answered}</td>
                        <td className="p-2 font-semibold text-cbt-not-answered">{c.notAnswered}</td>
                        <td className="p-2 font-semibold text-cbt-marked">{c.marked}</td>
                        <td className="p-2 font-semibold text-cbt-marked">{c.answeredMarked}</td>
                        <td className="p-2">{c.notVisited}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-muted">
                &ldquo;Answered &amp; Marked for Review&rdquo; questions will be evaluated. Unsaved selections are not counted.
              </p>
              {demo && (
                <p className="mt-2 rounded-lg bg-accent-soft px-3 py-2 text-xs text-foreground">
                  This is a free demo: {demo.lockedTotal} more questions of the full {demo.totalQuestions}-question test are locked and won&apos;t be counted.
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-border p-4">
              <p className="mr-auto text-sm font-medium">Are you sure you want to submit the test?</p>
              <button type="button" onClick={() => setConfirmOpen(false)} className="cbt-btn border border-border bg-white">
                No
              </button>
              <button type="button" onClick={() => void submit()} className="cbt-btn bg-primary text-white">
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {paywall && demo && phase === "exam" && (
        <DemoPaywall
          demo={demo}
          hi={lang === "hi"}
          finished={paywall === "finished"}
          onClose={() => setPaywall(null)}
          onSubmit={() => {
            setPaywall(null);
            setConfirmOpen(true);
          }}
          onPay={payNow}
        />
      )}

      {phase === "submitting" && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/90 p-4 font-sans">
          <div className="max-w-sm text-center">
            <div className="mx-auto size-10 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
            <p className="mt-4 font-semibold">{submitIssue ? "Time is up — waiting to submit…" : "Submitting your test…"}</p>
            <p className="text-sm text-muted">Please don&apos;t close this page.</p>
            {submitIssue && (
              <div role="alert" className="mt-4 space-y-3 rounded-xl border border-danger bg-danger-soft p-4 text-left text-sm">
                <p className="flex items-start gap-2 font-medium text-danger">
                  <WifiOff className="mt-0.5 size-4 shrink-0" aria-hidden /> {submitIssue}
                </p>
                <p className="text-foreground/85">
                  Your answers are kept on this device. We&apos;ll submit automatically as soon as you&apos;re back online.
                </p>
                <button type="button" onClick={() => void submit()} className="h-10 w-full rounded-lg bg-primary font-semibold text-white">
                  Retry now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────── Pieces ───────────────

const statusStyle: Record<Status, string> = {
  notVisited: "bg-cbt-not-visited text-foreground border border-[#c3cad6] rounded-md",
  notAnswered: "bg-cbt-not-answered text-white rounded-t-[14px] rounded-b-md",
  answered: "bg-cbt-answered text-white rounded-b-[14px] rounded-t-md",
  marked: "bg-cbt-marked text-white rounded-full",
  answeredMarked: "bg-cbt-marked text-white rounded-full",
};

function PaletteButton({ n, status, current, onClick }: { n: number; status: Status; current: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Question ${n}, ${status}`}
      aria-current={current ? "true" : undefined}
      className={`relative grid h-10 place-items-center text-sm font-semibold ${statusStyle[status]} ${current ? "ring-2 ring-primary ring-offset-2" : ""}`}
    >
      {n}
      {status === "answeredMarked" && (
        <span className="absolute -bottom-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full border-2 border-white bg-cbt-answered" />
      )}
    </button>
  );
}

function LockedButton({ n, onClick }: { n: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Question ${n}, locked. Unlock the full test to attempt it`}
      className="relative grid h-10 place-items-center rounded-md border border-dashed border-[#c3cad6] bg-surface-muted text-sm font-semibold text-muted hover:border-accent hover:bg-accent-soft"
    >
      <Lock className="size-3.5" aria-hidden />
      <span className="sr-only">{n}</span>
    </button>
  );
}

function Legend({ counts }: { counts: Record<Status, number> }) {
  const items: { s: Status; label: string }[] = [
    { s: "answered", label: "Answered" },
    { s: "notAnswered", label: "Not Answered" },
    { s: "notVisited", label: "Not Visited" },
    { s: "marked", label: "Marked for Review" },
    { s: "answeredMarked", label: "Answered & Marked for Review (will be evaluated)" },
  ];
  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-2.5 border-b border-border p-3 text-[11px] leading-tight text-muted">
      {items.map((it) => (
        <li key={it.s} className={`flex items-center gap-2 ${it.s === "answeredMarked" ? "col-span-2" : ""}`}>
          <span className={`relative grid h-7 w-8 shrink-0 place-items-center text-xs font-semibold ${statusStyle[it.s]}`}>
            {counts[it.s]}
            {it.s === "answeredMarked" && (
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-cbt-answered" />
            )}
          </span>
          {it.label}
        </li>
      ))}
    </ul>
  );
}

function Instructions(props: {
  paper: Paper;
  candidate: { name: string } | null;
  lang: Lang;
  setLang: (l: Lang) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  onBegin: () => void;
  starting: boolean;
  error: string | null;
  preview: boolean;
}) {
  const { paper, candidate, lang, setLang, agreed, setAgreed, onBegin, starting, error, preview } = props;
  const total = paper.sections.reduce((n, s) => n + s.questions.length, 0);
  const hi = lang === "hi";
  const marksCorrect = paper.sections[0]?.marksCorrect ?? 1;
  const marksWrong = paper.sections[0]?.marksWrong ?? 0;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="flex items-center gap-3 bg-cbt-header px-4 py-3 text-white">
        <p className="flex-1 truncate font-semibold" lang={hi && paper.titleHi ? "hi" : undefined}>
          {hi && paper.titleHi ? paper.titleHi : paper.title}
        </p>
        {paper.languages.length > 1 && (
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-md bg-white px-2 py-1 text-sm text-foreground"
            aria-label="Instructions language"
          >
            <option value="en">English</option>
            <option value="hi" lang="hi">
              हिंदी
            </option>
          </select>
        )}
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6" lang={hi ? "hi" : undefined}>
        <h1 className="text-xl font-semibold">{hi ? "कृपया निर्देशों को ध्यान से पढ़ें" : "Please read the instructions carefully"}</h1>

        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="text-xl font-semibold">{total}</p>
            <p className="text-muted">{hi ? "प्रश्न" : "Questions"}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="text-xl font-semibold">{Math.round(paper.durationSec / 60)}</p>
            <p className="text-muted">{hi ? "मिनट" : "Minutes"}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="text-xl font-semibold">
              +{marksCorrect}
              {marksWrong > 0 && <span className="text-danger"> / −{marksWrong}</span>}
            </p>
            <p className="text-muted">{hi ? "अंक" : "Marking"}</p>
          </div>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="font-semibold">{hi ? "सामान्य निर्देश" : "General Instructions"}</h2>
          <ol className="list-decimal space-y-2 pl-5 text-foreground/90">
            {hi ? (
              <>
                <li>ऊपर दाईं ओर घड़ी शेष समय दिखाती है। समय समाप्त होने पर परीक्षा अपने आप सबमिट हो जाएगी।</li>
                <li>प्रश्न पैलेट प्रत्येक प्रश्न की स्थिति रंगों से दिखाता है (नीचे देखें)।</li>
                <li>उत्तर सेव करने के लिए विकल्प चुनकर <b>Save &amp; Next</b> पर क्लिक करें। केवल विकल्प चुनकर आगे बढ़ने से उत्तर सेव नहीं होगा।</li>
                <li><b>Mark for Review &amp; Next</b> प्रश्न को बाद में देखने के लिए चिह्नित करता है। चिह्नित प्रश्न का चुना हुआ उत्तर भी मूल्यांकित होगा।</li>
                <li>चुना हुआ उत्तर हटाने के लिए <b>Clear Response</b> पर क्लिक करें।</li>
                <li>ऊपर दिए सेक्शन टैब से किसी भी सेक्शन में जा सकते हैं, और &ldquo;View in&rdquo; से भाषा बदल सकते हैं।</li>
                <li>टेस्ट फुलस्क्रीन में शुरू होगा। टैब बदलना, फुलस्क्रीन से बाहर जाना या कॉपी करने की कोशिश दर्ज की जाएगी।</li>
              </>
            ) : (
              <>
                <li>The clock at the top right shows the time left. The test is submitted automatically when time runs out.</li>
                <li>The question palette shows the status of each question using the colours below.</li>
                <li>To save an answer, select an option and click <b>Save &amp; Next</b>. Selecting an option and moving away without saving does not save it.</li>
                <li><b>Mark for Review &amp; Next</b> flags a question to revisit. A selected answer on a marked question is still evaluated.</li>
                <li>Click <b>Clear Response</b> to remove your selected answer.</li>
                <li>Use the section tabs at the top to switch sections, and &ldquo;View in&rdquo; to switch between English and Hindi at any time.</li>
                <li>The test opens in fullscreen. Switching tabs, leaving fullscreen or trying to copy content is recorded.</li>
              </>
            )}
          </ol>
          <div lang="en">
            <Legend counts={{ answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 }} />
          </div>
        </section>

        {paper.instructions && (
          <section className="space-y-2 text-sm">
            <h2 className="font-semibold">{hi ? "इस टेस्ट के बारे में" : "About this test"}</h2>
            <p className="text-foreground/90" lang={hi ? "en" : undefined}>
              {paper.instructions}
            </p>
            <ul className="list-disc space-y-1 pl-5 text-foreground/90">
              {paper.sections.map((s) => (
                <li key={s.id}>
                  {hi && s.nameHi ? s.nameHi : s.name}: {s.questions.length} {hi ? "प्रश्न" : "questions"}
                </li>
              ))}
            </ul>
          </section>
        )}

        {paper.demo && (
          <div className="space-y-1 rounded-xl border border-accent bg-accent-soft p-4 text-sm">
            <p className="font-semibold">
              {hi ? "🎁 फ्री डेमो — हर सेक्शन का शुरुआती हिस्सा" : "🎁 Free demo — the first part of every section"}
            </p>
            <p className="text-foreground/90">
              {hi
                ? `पूरे ${paper.demo.totalQuestions} प्रश्नों में से ${total} प्रश्न फ्री हैं। बाकी ${paper.demo.lockedTotal} प्रश्न पेमेंट करने पर खुलेंगे${paper.demo.buy ? ` (${rupees(paper.demo.buy.priceInPaise)})` : ""}। डेमो का रिज़ल्ट सेव नहीं होता और इससे आपकी रैंक पर कोई असर नहीं पड़ता।`
                : `${total} of the ${paper.demo.totalQuestions} questions are free. The other ${paper.demo.lockedTotal} unlock when you pay${paper.demo.buy ? ` (${rupees(paper.demo.buy.priceInPaise)})` : ""}. A demo result isn't saved and doesn't affect your HP rank.`}
            </p>
          </div>
        )}

        {preview && (
          <p className="rounded-xl border border-accent bg-accent-soft p-4 text-sm">
            <b>Admin preview.</b> This is exactly what students see, including draft questions. Nothing is started, saved or
            submitted, and fullscreen / tab-switch tracking is off.
          </p>
        )}

        {!candidate && !paper.demo && !preview && (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-accent bg-accent-soft p-4 text-sm">
            <p className="flex-1">
              {hi
                ? "आप बिना लॉगिन के टेस्ट दे रहे हैं। टेस्ट के बाद भी लॉगिन करके अपना परिणाम सेव कर सकते हैं और रैंक पा सकते हैं।"
                : "You are taking this test as a guest. You can log in even after finishing to save your result and get your HP rank."}
            </p>
            <Link
              href={`/login?next=${encodeURIComponent(`/tests/${paper.slug}/attempt`)}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-semibold text-white"
            >
              <LogIn className="size-4" /> {hi ? "लॉगिन करें" : "Log in"}
            </Link>
          </div>
        )}

        <label className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-4 accent-[var(--primary)]" />
          <span>
            {hi
              ? "मैंने सभी निर्देश पढ़ और समझ लिए हैं। मैं परीक्षा शुरू करने के लिए तैयार हूँ।"
              : "I have read and understood all the instructions. I am ready to begin the test."}
          </span>
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onBegin}
          disabled={!agreed || starting}
          className="h-12 w-full rounded-xl bg-primary font-semibold text-white disabled:opacity-50 sm:w-auto sm:px-10"
        >
          {starting ? (hi ? "शुरू हो रहा है…" : "Starting…") : hi ? "मैं शुरू करने के लिए तैयार हूँ" : "I am ready to begin"}
        </button>
      </main>
    </div>
  );
}
