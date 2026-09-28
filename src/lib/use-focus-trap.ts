"use client";
import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus within `containerRef` while `active`, restores focus to the
 * previously-focused element on close, and calls `onClose` on Escape.
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const container = containerRef.current;
    const focusables = () => Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      previouslyFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
