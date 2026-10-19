"use client";

import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";

/** Markdown with $inline$ and $$block$$ math, loaded by RichContent only for text that contains a `$`. */
export default function MathText({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkBreaks, remarkMath]} rehypePlugins={[rehypeKatex]}>
      {text}
    </ReactMarkdown>
  );
}
