"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { countAudienceAction, previewCampaignAction, queueCampaignAction, sendCampaignTestAction } from "./actions";

type Draft = { subject: string; heading: string; body: string; ctaLabel: string; ctaUrl: string; examId: string };

const empty: Draft = { subject: "", heading: "", body: "", ctaLabel: "", ctaUrl: "/", examId: "" };

export function CampaignForm({ exams }: { exams: { id: string; name: string }[] }) {
  const router = useRouter();
  const [m, setM] = useState<Draft>(empty);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [audience, setAudience] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [phone, setPhone] = useState(true);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setM((p) => ({ ...p, [k]: v }));
    setConfirming(false);
  };

  useEffect(() => {
    let live = true;
    countAudienceAction(m.examId || null).then((n) => {
      if (live) setAudience(n);
    });
    return () => {
      live = false;
    };
  }, [m.examId]);

  // Re-render the preview shortly after the admin stops typing.
  useEffect(() => {
    let live = true;
    const t = setTimeout(() => {
      previewCampaignAction(m).then((p) => {
        if (live) setPreview(p);
      });
    }, 350);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [m]);

  function run(fn: () => Promise<void>) {
    setErrors([]);
    setNotice("");
    startTransition(fn);
  }

  const sendTest = () =>
    run(async () => {
      const res = await sendCampaignTestAction(m);
      if (res.ok) setNotice("Test email sent to your inbox. Check it on your phone before sending to students.");
      else setErrors(res.errors);
    });

  const queue = () =>
    run(async () => {
      const res = await queueCampaignAction(m);
      setConfirming(false);
      if (!res.ok) {
        setErrors(res.errors);
        return;
      }
      setM(empty);
      setNotice(
        res.sent === res.queued
          ? `Sent to ${res.sent} students.`
          : `Queued for ${res.queued} students; ${res.sent} sent now. The rest go out with the daily 7 pm run (daily limit, and at most one offer email per student every 3 days).`,
      );
      router.refresh();
    });

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
    <form onSubmit={(e) => e.preventDefault()} className={`${panel} space-y-4`}>
      <div>
        <h2 className="font-semibold">New email to students</h2>
        <p className="mt-1 text-xs text-muted">Goes only to students who ticked &ldquo;email me offers&rdquo;. Keep it short: one message, one button.</p>
      </div>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="subject">
            Subject (shows in the inbox)
          </label>
          <input id="subject" className={inputCls} value={m.subject} maxLength={120} placeholder="HP High Court: new full mocks added" onChange={(e) => set("subject", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="heading">
            Heading (big text at the top)
          </label>
          <input id="heading" className={inputCls} value={m.heading} maxLength={120} onChange={(e) => set("heading", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="body">
            Message (leave a blank line between paragraphs)
          </label>
          <textarea id="body" rows={6} className={inputCls} value={m.body} maxLength={3000} onChange={(e) => set("body", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ctaLabel">
            Button text
          </label>
          <input id="ctaLabel" className={inputCls} value={m.ctaLabel} maxLength={40} placeholder="Start the new mock" onChange={(e) => set("ctaLabel", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ctaUrl">
            Button link (/page on this site, or https://…)
          </label>
          <input id="ctaUrl" className={inputCls} value={m.ctaUrl} placeholder="/hp-high-court/process-server" onChange={(e) => set("ctaUrl", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="examId">
            Send to
          </label>
          <select id="examId" className={inputCls} value={m.examId} onChange={(e) => set("examId", e.target.value)}>
            <option value="">Everyone who opted in</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                Students of {e.name} (took a test or bought it)
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted" aria-live="polite">
            {audience === null ? "Counting…" : `${audience} ${audience === 1 ? "student" : "students"} will get it.`}
          </p>
        </div>
      </fieldset>
      <ErrorList errors={errors} />
      {notice && (
        <p role="status" className="rounded-lg bg-success-soft p-3 text-sm text-success">
          {notice}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={sendTest} disabled={pending} className="rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-60">
          Send a test to me
        </button>
        {confirming ? (
          <>
            <button type="button" onClick={queue} disabled={pending} className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
              {pending ? "Sending…" : `Yes, send to ${audience ?? 0} students`}
            </button>
            <button type="button" onClick={() => setConfirming(false)} disabled={pending} className="rounded-lg px-3 py-2 text-sm text-muted">
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={pending || !audience}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            Send to students…
          </button>
        )}
      </div>
    </form>

    <aside className={`${panel} space-y-3 lg:sticky lg:top-4`} aria-label="Email preview">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">Preview</h2>
        <div role="group" aria-label="Preview size" className="flex rounded-lg border border-border p-0.5 text-xs font-medium">
          {([["Phone", true], ["Desktop", false]] as const).map(([name, isPhone]) => (
            <button
              key={name}
              type="button"
              aria-pressed={phone === isPhone}
              onClick={() => setPhone(isPhone)}
              className={`rounded-md px-3 py-1 ${phone === isPhone ? "bg-primary text-primary-foreground" : "text-muted"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-surface-muted px-3 py-2 text-xs">
        <span className="text-muted">Subject: </span>
        <b>{preview?.subject ?? "…"}</b>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-[#eef2f9]">
        <iframe
          title="Email preview"
          sandbox=""
          srcDoc={preview?.html ?? ""}
          className="mx-auto block h-[560px] border-0 transition-[width]"
          style={{ width: phone ? 375 : "100%", minWidth: phone ? 375 : 0 }}
        />
      </div>
      <p className="text-xs text-muted">This is how it looks in the inbox. &ldquo;Send a test to me&rdquo; sends the real thing to your email.</p>
    </aside>
    </div>
  );
}
