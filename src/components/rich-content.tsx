"use client";

import { Fragment, lazy, Suspense } from "react";
import { escapeLoneMarker, hasMath, isPlainText, plainParagraphs } from "@/lib/rich-text";

// The Markdown parser and KaTeX are loaded only for text that needs them; most questions are plain sentences.
const MarkdownText = lazy(() => import("./rich-content-markdown"));
const MathText = lazy(() => import("./rich-content-math"));

/** Paragraphs and line breaks, rendered exactly as react-markdown with remark-breaks would (see rich-text.test.ts). */
export function PlainText({ text }: { text: string }) {
  const paragraphs = plainParagraphs(text);
  return paragraphs.map((lines, i) => (
    <Fragment key={i}>
      {i > 0 && "\n"}
      <p>
        {lines.map((line, j) => (
          <Fragment key={j}>
            {j > 0 && (
              <>
                <br />
                {"\n"}
              </>
            )}
            {line}
          </Fragment>
        ))}
      </p>
    </Fragment>
  ));
}

/**
 * Renders a question stem/option/explanation: markdown (bold, lists, links) plus
 * $inline$ and $$block$$ math via KaTeX. No raw HTML — content comes from the
 * question bank, some of it CSV-imported, so we never let it inject markup.
 *
 * `lang` is the language of `text` ("en" | "hi"): screen readers use it to pick the right voice, and the
 * page itself is English, so Hindi questions must be marked as Hindi (WCAG 3.1.2).
 */
export function RichContent({ text, className, lang }: { text: string; className?: string; lang?: "en" | "hi" }) {
  const source = escapeLoneMarker(text);
  return (
    <div lang={lang} className={`rich-content ${className ?? ""}`}>
      {isPlainText(source) ? (
        <PlainText text={source} />
      ) : (
        // While the parser loads, show the raw text rather than an empty box.
        <Suspense fallback={<p className="whitespace-pre-line">{source}</p>}>
          {hasMath(source) ? <MathText text={source} /> : <MarkdownText text={source} />}
        </Suspense>
      )}
    </div>
  );
}
