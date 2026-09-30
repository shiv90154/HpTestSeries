"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const subjects = [
  {
    tab: "Himachal GK",
    no: 6,
    q: "The Chandra and Bhaga rivers meet at which place to form the Chandrabhaga?",
    options: ["Tandi", "Keylong", "Udaipur", "Kaza"],
    answer: 0,
  },
  {
    tab: "Reasoning",
    no: 7,
    q: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    answer: 2,
  },
  {
    tab: "Computer",
    no: 10,
    q: "Which keyboard shortcut is used to copy the selected text in MS Word?",
    options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"],
    answer: 1,
  },
];

const basePalette = ["a", "a", "n", "m", "a", "am", "v", "n", "a", "v", "v", "v", "v", "v", "v"];

const style: Record<string, string> = {
  a: "bg-cbt-answered text-white rounded-b-[10px] rounded-t-sm",
  n: "bg-cbt-not-answered text-white rounded-t-[10px] rounded-b-sm",
  m: "bg-cbt-marked text-white rounded-full",
  am: "bg-cbt-marked text-white rounded-full ring-2 ring-cbt-answered",
  v: "bg-cbt-not-visited text-foreground rounded-sm border border-[#c3cad6]",
};

const PICK_AFTER_MS = 1400;
const NEXT_AFTER_MS = 4200;

/** Hero illustration of the CBT screen; slides through GK, Reasoning and Computer, picking the answer in each. */
export function CbtPreview() {
  const [tab, setTab] = useState(0);
  const [picked, setPicked] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const pick = setTimeout(() => setPicked(true), PICK_AFTER_MS);
    const next = setTimeout(() => {
      setPicked(false);
      setTab((t) => (t + 1) % subjects.length);
    }, NEXT_AFTER_MS);
    return () => {
      clearTimeout(pick);
      clearTimeout(next);
    };
  }, [tab, animate]);

  const shown = animate ? tab : 0;
  const isPicked = animate ? picked : true;
  const s = subjects[shown];
  const cur = s.no - 1;

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="absolute -inset-4 rotate-2 rounded-3xl bg-white/10" />
      <div className="relative overflow-hidden rounded-2xl bg-white text-foreground shadow-2xl">
        <div className="flex items-center justify-between bg-cbt-header px-4 py-2.5 text-sm text-white">
          <span className="font-semibold">HPRCA JOA IT — Mock Test 3</span>
          <span className="flex items-center gap-1.5 rounded bg-white/15 px-2 py-0.5 font-mono">
            <Clock className="size-3.5" /> 01:24:37
          </span>
        </div>
        <div className="flex border-b border-border bg-surface-muted text-xs">
          {subjects.map((x, i) => (
            <span
              key={x.tab}
              className={`border-b-2 px-3 py-2 transition-colors ${
                i === shown ? "border-primary bg-white font-semibold text-primary" : "border-transparent text-muted"
              }`}
            >
              {x.tab}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_150px]">
          <div key={shown} className="animate-[cbt-slide_0.4s_ease-out] space-y-3 p-4 text-sm">
            <p className="font-semibold">Question No. {s.no}</p>
            <p className="font-reading min-h-[2.75rem]">{s.q}</p>
            {s.options.map((o, i) => {
              const on = isPicked && i === s.answer;
              return (
                <div
                  key={o}
                  className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-reading transition-colors ${on ? "border-primary bg-primary-soft" : "border-border"}`}
                >
                  <span className={`size-3.5 rounded-full border-2 ${on ? "border-primary bg-primary" : "border-[#b7c3d8]"}`} /> {o}
                </div>
              );
            })}
            <div className="flex gap-2 pt-1 text-[11px] font-semibold">
              <span className="rounded border border-cbt-marked px-2 py-1.5 text-cbt-marked">Mark for Review &amp; Next</span>
              <span className="ml-auto rounded bg-cbt-answered px-2 py-1.5 text-white">Save &amp; Next</span>
            </div>
          </div>
          <div className="border-l border-border p-3">
            <p className="mb-2 text-[11px] font-medium text-muted">Question palette</p>
            <div className="grid grid-cols-4 gap-1.5 text-[10px] font-semibold">
              {basePalette.map((base, i) => {
                const active = i === cur;
                const state = active && base === "v" ? (isPicked ? "a" : "v") : base;
                return (
                  <span
                    key={i}
                    className={`grid h-6 place-items-center transition-colors ${style[state]} ${active && state === "v" ? "ring-2 ring-primary" : ""}`}
                  >
                    {i + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
