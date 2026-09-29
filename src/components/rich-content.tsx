"use client";

import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import { escapeLoneMarker } from "@/lib/rich-text";

/**
 * Renders a question stem/option/explanation: markdown (bold, lists, links) plus
 * $inline$ and $$block$$ math via KaTeX. No raw HTML — content comes from the
 * question bank, some of it CSV-imported, so we never let it inject markup.
 *
 * `lang` is the language of `text` ("en" | "hi"): screen readers use it to pick the right voice, and the
 * page itself is English, so Hindi questions must be marked as Hindi (WCAG 3.1.2).
 */
export function RichContent({ text, className, lang }: { text: string; className?: string; lang?: "en" | "hi" }) {
  return (
    <div lang={lang} className={`rich-content ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkBreaks, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {escapeLoneMarker(text)}
      </ReactMarkdown>
    </div>
  );
}
