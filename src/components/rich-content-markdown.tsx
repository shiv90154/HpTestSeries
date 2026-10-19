"use client";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

/** Markdown without math, loaded by RichContent only for text that needs a parser. */
export default function MarkdownText({ text }: { text: string }) {
  return <ReactMarkdown remarkPlugins={[remarkBreaks]}>{text}</ReactMarkdown>;
}
