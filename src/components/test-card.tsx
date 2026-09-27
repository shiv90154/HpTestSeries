import { Clock, FileText, Lock } from "lucide-react";
import Link from "next/link";
import type { PublicTest } from "@/modules/catalog/queries";
import { btn, card } from "./ui";

const typeLabel: Record<string, string> = { MOCK: "Full mock", PYQ: "Previous year", SECTIONAL: "Sectional", TOPIC: "Topic test", DAILY: "Daily quiz" };

export function TestCard({ test }: { test: PublicTest }) {
  return (
    <div className={`${card} flex flex-col gap-4 p-5`}>
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="rounded-md bg-primary-soft px-2 py-1 text-primary">{typeLabel[test.type] ?? test.type}</span>
        {test.isFree ? (
          <span className="rounded-md bg-success-soft px-2 py-1 text-success">FREE</span>
        ) : (
          <span className="flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-accent-strong">
            <Lock className="size-3" /> PAID
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold leading-snug">
          <Link href={`/tests/${test.slug}`} className="hover:text-primary">
            {test.title}
          </Link>
        </h3>
        {test.titleHi && <p className="text-sm text-muted">{test.titleHi}</p>}
      </div>
      <div className="flex gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <FileText className="size-4" /> {test.questionCount} Qs · {test.totalMarks} marks
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" /> {test.durationMin} min
        </span>
      </div>
      <Link href={`/tests/${test.slug}/attempt`} className={btn(test.isFree ? "primary" : "outline", "md", "mt-auto")}>
        {test.isFree ? "Start free test" : "Unlock test"}
      </Link>
    </div>
  );
}
