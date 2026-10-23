"use client";

import { Languages } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { useSite } from "@/sites/provider";

// Interface language on pbtestseries.in: English (default) or Punjabi. Only the site's own words switch (menus,
// buttons, headings); exam content, questions and posts stay as written, because the exams are in English and Hindi.
// Pages are prerendered in English and switch in the browser, so they stay static. The choice is kept per device.

export type UiLang = "en" | "pa";

const KEY = "pbts:ui-lang";
const EVENT = "pbts:ui-lang";

function read(): UiLang {
  try {
    return localStorage.getItem(KEY) === "pa" ? "pa" : "en";
  } catch {
    return "en";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setUiLang(lang: UiLang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* private mode: the choice lasts until the page is left */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** The interface language in effect: always English on sites without a Punjabi interface. */
export function useUiLang(): UiLang {
  const site = useSite();
  const lang = useSyncExternalStore(subscribe, read, () => "en" as const);
  return site.code === "pb" ? lang : "en";
}

/** A piece of interface text in English and Punjabi. */
export function T({ en, pa }: { en: string; pa: string }) {
  return useUiLang() === "pa" ? <span lang="pa">{pa}</span> : en;
}

// Short interface labels used on many pages, so each one is translated once. Anything not listed stays English.
const LABELS: Record<string, string> = {
  Home: "ਹੋਮ",
  Exams: "ਪ੍ਰੀਖਿਆਵਾਂ",
  "Mock Tests": "ਮੌਕ ਟੈਸਟ",
  "Mock test": "ਮੌਕ ਟੈਸਟ",
  "Mock tests": "ਮੌਕ ਟੈਸਟ",
  "Free test": "ਮੁਫ਼ਤ ਟੈਸਟ",
  "Free tests": "ਮੁਫ਼ਤ ਟੈਸਟ",
  Questions: "ਪ੍ਰਸ਼ਨ",
  "Full series": "ਪੂਰੀ ਸੀਰੀਜ਼",
  "To start": "ਸ਼ੁਰੂ ਕਰਨ ਲਈ",
  Languages: "ਭਾਸ਼ਾਵਾਂ",
  "Total questions": "ਕੁੱਲ ਪ੍ਰਸ਼ਨ",
  "Total marks": "ਕੁੱਲ ਅੰਕ",
  Duration: "ਸਮਾਂ",
  "Negative marking": "ਨੈਗੇਟਿਵ ਮਾਰਕਿੰਗ",
  Blog: "ਬਲੌਗ",
  "Exam Updates": "ਪ੍ਰੀਖਿਆ ਅਪਡੇਟ",
  Pricing: "ਕੀਮਤਾਂ",
  "Previous Papers": "ਪਿਛਲੇ ਪੇਪਰ",
  "Previous Year Papers": "ਪਿਛਲੇ ਸਾਲਾਂ ਦੇ ਪੇਪਰ",
  Syllabus: "ਸਿਲੇਬਸ",
  "Exam Pattern": "ਪ੍ਰੀਖਿਆ ਪੈਟਰਨ",
  Overview: "ਜਾਣਕਾਰੀ",
  Tests: "ਟੈਸਟ",
  "Start free test": "ਮੁਫ਼ਤ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ",
  "Take free test": "ਮੁਫ਼ਤ ਟੈਸਟ ਦਿਓ",
  "Start test": "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ",
  "Start free mock": "ਮੁਫ਼ਤ ਮੌਕ ਸ਼ੁਰੂ ਕਰੋ",
  Free: "ਮੁਫ਼ਤ",
  minutes: "ਮਿੰਟ",
  "Exam pattern": "ਪ੍ਰੀਖਿਆ ਪੈਟਰਨ",
  "Previous papers": "ਪਿਛਲੇ ਪੇਪਰ",
  Section: "ਸੈਕਸ਼ਨ",
  Sections: "ਸੈਕਸ਼ਨ",
  Marks: "ਅੰਕ",
  Correct: "ਸਹੀ",
  Wrong: "ਗਲਤ",
};

/** A short interface label from the shared list above; shown as written when it has no Punjabi entry. */
export function Tx({ children }: { children: string }) {
  const pa = LABELS[children];
  return pa ? <T en={children} pa={pa} /> : children;
}

/** Keeps <html lang> in step with the chosen interface language (screen readers, browser translation offers). */
export function UiLangSync() {
  const lang = useUiLang();
  useEffect(() => {
    document.documentElement.lang = lang === "pa" ? "pa" : "en";
  }, [lang]);
  return null;
}

/** Header switch between English and Punjabi; renders nothing on sites without a Punjabi interface. */
export function UiLangToggle({ className = "" }: { className?: string }) {
  const site = useSite();
  const lang = useUiLang();
  if (site.code !== "pb") return null;
  const next = lang === "pa" ? "en" : "pa";
  return (
    <button
      type="button"
      onClick={() => setUiLang(next)}
      lang={next}
      aria-label={next === "pa" ? "ਪੰਜਾਬੀ ਵਿੱਚ ਵੇਖੋ (View in Punjabi)" : "View in English"}
      className={`inline-flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-sm font-semibold text-primary hover:bg-primary-soft ${className}`}
    >
      <Languages className="hidden size-4 sm:block" aria-hidden />
      {next === "pa" ? "ਪੰਜਾਬੀ" : "English"}
    </button>
  );
}
