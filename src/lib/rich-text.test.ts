import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import { describe, expect, it } from "vitest";
import { PlainText } from "@/components/rich-content";
import { escapeLoneMarker, hasMath, isPlainText } from "./rich-text";

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

describe("plain text fast path", () => {
  // What RichContent renders for Markdown without math; the fast path must produce the very same HTML.
  const markdown = (text: string) => renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkBreaks] }, text));
  const plain = (text: string) => renderToStaticMarkup(createElement(PlainText, { text }));

  const samples = [
    "Who is the Chief Minister of Himachal Pradesh?",
    "हिमाचल प्रदेश की राजधानी कौन सी है?",
    "Line one\nLine two",
    "First paragraph.\n\nSecond paragraph.",
    "Three\n\n\nblank lines",
    "Trailing spaces   \nnext line",
    "\nLeading and trailing newlines\n",
    "Windows\r\nline endings\r\n\r\nand paragraphs",
    "a - b = c? No: a minus b",
    "Rs. 500 (approx.), 50% off, 3.14, 1.5 kg",
    "Kullu: Dussehra; Mandi: Shivratri!",
    "1857 ki kranti",
    "2019",
    "",
  ];

  it("treats ordinary sentences as plain", () => {
    for (const s of samples) expect(isPlainText(s), JSON.stringify(s)).toBe(true);
  });

  it("renders plain text exactly like react-markdown", () => {
    for (const s of samples) expect(plain(s), JSON.stringify(s)).toBe(markdown(s));
  });

  it("sends anything with Markdown or math to the parser", () => {
    for (const s of [
      "**bold**",
      "_italic_",
      "`code`",
      "# Heading",
      "- item",
      "+ item",
      "1. First",
      "2) Second",
      "Text\n---",
      "Text\n===",
      "    indented code",
      "\tTabbed",
      "> quote",
      "[link](https://x.y)",
      "![img](/a.png)",
      "a | b",
      "$x^2$",
      "5 &amp; 6",
      "<b>html</b>",
      "back\\slash",
      "~~strike~~",
    ]) {
      expect(isPlainText(s), s).toBe(false);
    }
  });

  it("knows when KaTeX is needed", () => {
    expect(hasMath("$x^2$")).toBe(true);
    expect(hasMath("**bold**")).toBe(false);
  });
});
