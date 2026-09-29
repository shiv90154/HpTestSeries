"use client";

import { CheckCircle2, Flag } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { reportQuestionAction } from "@/app/results/actions";
import { MAX_REPORT_NOTE, REPORT_ERROR_TEXT, REPORT_REASONS, REPORT_REASON_LABEL, type ReportError, type ReportReason } from "@/modules/content/report";

type Lang = "en" | "hi";

const T = {
  report: { en: "Report", hi: "रिपोर्ट करें" },
  title: { en: "What is wrong with this question?", hi: "इस प्रश्न में क्या गलत है?" },
  note: { en: "Details (optional) — e.g. the correct answer and a source", hi: "विवरण (वैकल्पिक) — जैसे सही उत्तर और स्रोत" },
  send: { en: "Send report", hi: "रिपोर्ट भेजें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  thanks: { en: "Thanks! Our team will check this question.", hi: "धन्यवाद! हमारी टीम इस प्रश्न की जाँच करेगी।" },
  login: { en: "Log in to report", hi: "रिपोर्ट के लिए लॉग इन करें" },
};

export function ReportQuestion({ questionId, lang, loginHref }: { questionId: string; lang: Lang; loginHref: string | null }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<ReportError | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  if (sent) {
    return (
      <p role="status" lang={lang === "hi" ? "hi" : undefined} className="flex items-center gap-1.5 text-sm text-success">
        <CheckCircle2 className="size-4" /> {T.thanks[lang]}
      </p>
    );
  }

  if (!open) {
    const cls = "inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-danger";
    return loginHref ? (
      <Link href={loginHref} lang={lang === "hi" ? "hi" : undefined} className={cls}>
        <Flag className="size-4" /> {T.login[lang]}
      </Link>
    ) : (
      <button type="button" onClick={() => setOpen(true)} lang={lang === "hi" ? "hi" : undefined} className={cls}>
        <Flag className="size-4" /> {T.report[lang]}
      </button>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) return setError("invalid");
    setError(null);
    startTransition(async () => {
      const res = await reportQuestionAction({ questionId, reason, note });
      if (res.ok) setSent(true);
      else setError(res.error);
    });
  }

  return (
    <form onSubmit={submit} lang={lang === "hi" ? "hi" : undefined} className="space-y-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
      <fieldset disabled={pending} className="space-y-3">
        <legend className="mb-2 font-semibold">{T.title[lang]}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {REPORT_REASONS.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border bg-surface px-3 py-2 ${reason === r ? "border-primary text-primary" : "border-border"}`}
            >
              <input type="radio" name={`reason-${questionId}`} checked={reason === r} onChange={() => setReason(r)} />
              {REPORT_REASON_LABEL[r][lang]}
            </label>
          ))}
        </div>
        <textarea
          rows={2}
          maxLength={MAX_REPORT_NOTE}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={T.note[lang]}
          aria-label={T.note[lang]}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 focus:border-primary focus:outline-none"
        />
        {error && (
          <p role="alert" className="text-danger">
            {REPORT_ERROR_TEXT[error][lang]}
          </p>
        )}
        <div className="flex gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50">{pending ? "…" : T.send[lang]}</button>
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 font-medium text-muted">
            {T.cancel[lang]}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
