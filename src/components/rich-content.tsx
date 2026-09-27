"use client";

import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";

/**
 * Renders a question stem/option/explanation: markdown (bold, lists, links) plus
 * $inline$ and $$block$$ math via KaTeX. No raw HTML — content comes from the
 * question bank, some of it CSV-imported, so we never let it inject markup.
 */
export function RichContent({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`rich-content ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkBreaks, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
