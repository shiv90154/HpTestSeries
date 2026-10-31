"use client";

import { BellRing, CheckCircle2, FileDown } from "lucide-react";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { track } from "./analytics";
import { subscribeExamAlertAction } from "./exam-alert-actions";
import { btn, card } from "./ui";

const inputClass =
  "h-11 min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 text-base text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft";

/** This browser already gave its email for the exam: the PDF opens straight away and the alert box says so. */
const storeKey = (examKey: string) => `exam-alert:${examKey}`;
function readDone(examKey: string): boolean {
  try {
    return localStorage.getItem(storeKey(examKey)) === "1";
  } catch {
    return false;
  }
}
function saveDone(examKey: string) {
  try {
    localStorage.setItem(storeKey(examKey), "1");
  } catch {
    /* private mode: they are asked again next time */
  }
}

function useSignup(examKey: string, source: "syllabus-pdf" | "alert", onDone?: () => void) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await subscribeExamAlertAction({ email, examKey, source });
      if ("error" in res) setError(res.error);
      else {
        saveDone(examKey);
        setDone(true);
        track("generate_lead", { source, exam: examKey });
        onDone?.();
      }
    } catch {
      setError("Could not save. Check your internet connection and try again.");
    } finally {
      setPending(false);
    }
  }
  return { email, setEmail, error, pending, done, submit };
}

function EmailFields({ s, cta, pendingLabel }: { s: ReturnType<typeof useSignup>; cta: string; pendingLabel: string }) {
  return (
    <form onSubmit={s.submit} className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@gmail.com"
          aria-label="Email address"
          className={inputClass}
          value={s.email}
          onChange={(e) => s.setEmail(e.target.value)}
        />
        <button className={btn("primary", "md", "shrink-0")} disabled={s.pending}>
          {s.pending ? pendingLabel : cta}
        </button>
      </div>
      {s.error && (
        <p role="alert" className="text-sm text-danger">
          {s.error}
        </p>
      )}
      <p className="text-xs text-muted">No spam. Unsubscribe with one click from any email.</p>
    </form>
  );
}

/**
 * Syllabus "Download PDF": asks for an email once (it also signs them up for the exam's alerts), then opens the
 * browser's print dialog, where "Save as PDF" makes the file. The syllabus itself stays open to everyone on the page.
 */
export function SyllabusPdfButton({ examKey, examName }: { examKey: string; examName: string }) {
  const known = useSyncExternalStore(
    () => () => {},
    () => readDone(examKey),
    () => false,
  );
  const [open, setOpen] = useState(false);
  const s = useSignup(examKey, "syllabus-pdf", () => setTimeout(() => window.print(), 300));

  if (known && !s.done) {
    return (
      <button type="button" onClick={() => window.print()} className={btn("primary", "sm")}>
        <FileDown className="size-4" /> Download PDF
      </button>
    );
  }
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          track("syllabus_pdf_click", { exam: examKey });
        }}
        className={btn("primary", "sm")}
      >
        <FileDown className="size-4" /> Download PDF
      </button>
    );
  }
  return (
    <div className={`${card} w-full space-y-3 border-primary/40 p-4 print:hidden`}>
      {s.done ? (
        <div role="status" className="space-y-2">
          <p className="flex items-center gap-2 font-semibold text-success">
            <CheckCircle2 className="size-5" /> Done! Choose &quot;Save as PDF&quot; in the print window.
          </p>
          <p className="text-sm text-muted">We also emailed you the syllabus link, and will email you when the {examName} exam date is announced.</p>
          <button type="button" onClick={() => window.print()} className={btn("outline", "sm")}>
            <FileDown className="size-4" /> Open PDF again
          </button>
        </div>
      ) : (
        <>
          <div>
            <p className="font-semibold">Get the {examName} syllabus PDF</p>
            <p className="text-sm text-muted">Enter your email to download it. We will also tell you when the exam date and admit card come out.</p>
          </div>
          <EmailFields s={s} cta="Get PDF" pendingLabel="Saving…" />
        </>
      )}
    </div>
  );
}

/** Small exam-date / admit-card alert box for exam pages. Not a popup: it sits in the page and never covers content. */
export function ExamAlertBox({ examKey, examName }: { examKey: string; examName: string }) {
  const known = useSyncExternalStore(
    () => () => {},
    () => readDone(examKey),
    () => false,
  );
  const s = useSignup(examKey, "alert");
  const done = known || s.done;
  return (
    <section className={`${card} space-y-3 p-5 print:hidden`}>
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
          <BellRing className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-semibold">{examName} exam date alert</h2>
          <p className="text-sm text-muted">Get an email as soon as the exam date, admit card or result is announced.</p>
        </div>
      </div>
      {done ? (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-success">
          <CheckCircle2 className="size-4" /> You will get {examName} alerts on email.
        </p>
      ) : (
        <EmailFields s={s} cta="Notify me" pendingLabel="Saving…" />
      )}
    </section>
  );
}
