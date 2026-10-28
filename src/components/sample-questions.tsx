import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { SampleQuestion } from "@/modules/catalog/free-mocks";
import { btn, card } from "./ui";

const LETTERS = ["A", "B", "C", "D"];

/** Questions from a free test shown as text, English and Hindi, with the answer marked and its explanation. */
export function SampleQuestions({ title, samples, test }: { title: string; samples: SampleQuestion[]; test: { slug: string; title: string; count: number } }) {
  if (!samples.length) return null;
  return (
    <section aria-labelledby="sample-questions" className="space-y-4">
      <h2 id="sample-questions" className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <ol className="space-y-3">
        {samples.map((s, i) => (
          <li key={s.stem} className={`${card} space-y-2 p-5`}>
            <p className="font-medium">
              Q{i + 1}. {s.stem}
            </p>
            {s.stemHi && (
              <p lang="hi" className="text-sm text-muted">
                {s.stemHi}
              </p>
            )}
            <ul className="grid gap-1 text-sm sm:grid-cols-2">
              {s.options.map((o, k) => (
                <li key={k} className={k === s.answer ? "font-semibold text-success" : ""}>
                  {LETTERS[k]}. {o}
                  {s.optionsHi[k] && s.optionsHi[k] !== o ? <span className="text-muted"> / {s.optionsHi[k]}</span> : null}
                  {k === s.answer && <CheckCircle2 className="ml-1 inline size-4" aria-label="correct answer" />}
                </li>
              ))}
            </ul>
            {s.explanation && <p className="text-sm text-muted">{s.explanation}</p>}
          </li>
        ))}
      </ol>
      <Link href={`/tests/${test.slug}`} className={btn("outline", "sm")}>
        Try all {test.count} questions of {test.title}
      </Link>
    </section>
  );
}
