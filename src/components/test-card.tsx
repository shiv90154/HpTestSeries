"use client";

import { Clock, FileText, Lock, LockOpen } from "lucide-react";
import Link from "next/link";
import type { PublicTest } from "@/modules/catalog/queries";
import { useOwnedTests } from "./my-access";
import { btn, card } from "./ui";

const typeLabel: Record<string, string> = { MOCK: "Full mock", PYQ: "Previous year", SECTIONAL: "Sectional", TOPIC: "Topic test", DAILY: "Daily quiz" };

/** Compact one-line-per-test row for use inside an exam card; stacks on phones, sits in one row from `sm`. */
export function TestRow({ test }: { test: PublicTest }) {
  const owned = useOwnedTests();
  const open = test.isFree || !!owned?.has(test.slug);
  const [href, label, variant] = open
    ? [`/tests/${test.slug}/attempt`, "Start", "primary"]
    : test.hasDemo
      ? [`/tests/${test.slug}/demo`, "Free demo", "outline"]
      : [`/tests/${test.slug}`, "Unlock", "outline"];
  return (
    <li className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span
          className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${open ? "bg-success-soft text-success" : "bg-accent-soft text-accent-ink"}`}
          title={test.isFree ? "Free" : open ? "Unlocked" : "Locked"}
        >
          {open ? <LockOpen className="size-4" aria-hidden /> : <Lock className="size-4" aria-hidden />}
          <span className="sr-only">{test.isFree ? "Free" : open ? "Unlocked" : "Locked"}</span>
        </span>
        <div className="min-w-0">
          <Link href={`/tests/${test.slug}`} className="block font-semibold leading-snug hover:text-primary">
            {test.title}
          </Link>
          {test.titleHi && (
            <p lang="hi" className="text-sm text-muted">
              {test.titleHi}
            </p>
          )}
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="rounded bg-primary-soft px-1.5 py-0.5 font-semibold text-primary">{typeLabel[test.type] ?? test.type}</span>
            <span className="flex items-center gap-1">
              <FileText className="size-3.5" aria-hidden /> {test.questionCount} Qs · {test.totalMarks} marks
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden /> {test.durationMin} min
            </span>
            {test.isFree && <span className="font-semibold text-success">FREE</span>}
          </p>
        </div>
      </div>
      <Link href={href} className={btn(variant as "primary" | "outline", "md", "w-full sm:w-32")}>
        {label}
      </Link>
    </li>
  );
}

/** `headingLevel`: 2 on pages where the cards sit straight under the page <h1> (the /tests list), 3 under a section <h2>. */
export function TestCard({ test, headingLevel = 3 }: { test: PublicTest; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  // The list is cached for everyone; a student who bought this test gets "Start" instead of "Unlock".
  const owned = useOwnedTests();
  const unlocked = !test.isFree && !!owned?.has(test.slug);
  return (
    <div className={`${card} flex flex-col gap-4 p-5`}>
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="rounded-md bg-primary-soft px-2 py-1 text-primary">{typeLabel[test.type] ?? test.type}</span>
        {test.isFree ? (
          <span className="rounded-md bg-success-soft px-2 py-1 text-success">FREE</span>
        ) : unlocked ? (
          <span className="flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-success">
            <LockOpen className="size-3" /> UNLOCKED
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-accent-ink">
            <Lock className="size-3" /> PAID
          </span>
        )}
      </div>
      <div>
        <Heading className="font-semibold leading-snug">
          <Link href={`/tests/${test.slug}`} className="hover:text-primary">
            {test.title}
          </Link>
        </Heading>
        {test.titleHi && (
          <p lang="hi" className="text-sm text-muted">
            {test.titleHi}
          </p>
        )}
      </div>
      <div className="flex gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <FileText className="size-4" /> {test.questionCount} Qs · {test.totalMarks} marks
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" /> {test.durationMin} min
        </span>
      </div>
      {test.isFree || unlocked ? (
        <Link href={`/tests/${test.slug}/attempt`} className={btn("primary", "md", "mt-auto")}>
          {unlocked ? "Start test" : "Start free test"}
        </Link>
      ) : test.hasDemo ? (
        <div className="mt-auto space-y-1">
          <Link href={`/tests/${test.slug}/demo`} className={btn("primary", "md", "w-full")}>
            Try free demo
          </Link>
          <Link href={`/tests/${test.slug}`} className="flex min-h-10 items-center justify-center text-sm font-medium text-primary hover:underline">
            Unlock full test
          </Link>
        </div>
      ) : (
        <Link href={`/tests/${test.slug}`} className={btn("outline", "md", "mt-auto")}>
          Unlock test
        </Link>
      )}
    </div>
  );
}
