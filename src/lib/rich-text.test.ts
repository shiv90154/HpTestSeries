import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import { describe, expect, it } from "vitest";
import { escapeLoneMarker } from "./rich-text";

// Renders the way RichContent does (minus KaTeX, which is irrelevant here).
const html = (text: string) => renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkBreaks, remarkMath] }, text));

describe("escapeLoneMarker", () => {
  it("shows the raw text of an answer that is a Markdown symbol", () => {
    for (const symbol of ["#", "##", "-", "*", "+", ">", "---", "***", "___", "==", "1.", "2)"]) {
      const out = html(escapeLoneMarker(symbol));
      expect(out, symbol).toContain(symbol.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!));
      expect(out, symbol).not.toMatch(/<(h[1-6]|ul|ol|li|blockquote|hr)\b/);
    }
  });

  it("documents the bug it fixes: unescaped, a lone marker renders as an empty element", () => {
    expect(html("#")).toContain("<h1></h1>");
    expect(html("-")).toContain("<li></li>");
  });

  it("leaves ordinary text and real Markdown alone", () => {
    for (const text of ["=", "&", "%", "@", "Tandi", "# Heading", "- item one\n- item two", "1. First", "**bold**", "a - b", "> quoted text", "$x^2$"]) {
      expect(escapeLoneMarker(text)).toBe(text);
    }
  });

  it("ignores surrounding whitespace", () => {
    expect(escapeLoneMarker("  #  ")).toBe("\\#");
  });
});
