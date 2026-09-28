// Browser-side memory of the question language a visitor last chose (guests have no profile to store it in).

export type Lang = "en" | "hi";

const KEY = "hpts:lang";

export function readLangPref(): Lang | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "en" || v === "hi" ? v : null;
  } catch {
    return null;
  }
}

export function writeLangPref(lang: Lang): void {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}
