"use client";

import { useEffect, useRef } from "react";

const LENGTH = 6;

/**
 * Six boxes for a login code. Typing moves ahead, Backspace moves back, paste and SMS/email autofill spread across the
 * boxes, and `onComplete` fires once the sixth digit is in. A screen reader sees one labelled group of digit fields.
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
  invalid,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  onComplete: (v: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  label: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  // After a wrong code the value is cleared; put the cursor back on the first box.
  useEffect(() => {
    if (!value && !disabled) refs.current[0]?.focus();
  }, [value, disabled]);

  function put(from: number, raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;
    const chars = value.padEnd(LENGTH, " ").split("");
    for (let i = 0; i < digits.length && from + i < LENGTH; i++) chars[from + i] = digits[i];
    const next = chars.join("").replace(/ /g, "").slice(0, LENGTH);
    onChange(next);
    const last = Math.min(from + digits.length, LENGTH - 1);
    refs.current[last]?.focus();
    if (next.length === LENGTH && !next.includes(" ")) onComplete(next);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (value[i]) onChange(value.slice(0, i) + value.slice(i + 1));
      else if (i > 0) {
        onChange(value.slice(0, i - 1) + value.slice(i));
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === "ArrowRight" && i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  return (
    <div role="group" aria-label={label} className={`flex justify-between gap-2 ${invalid ? "motion-safe:animate-[otp-shake_.35s]" : ""}`}>
      {Array.from({ length: LENGTH }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-label={`Digit ${i + 1} of ${LENGTH}`}
          // Only the first box carries the autofill hint so the phone offers the code once.
          autoComplete={i === 0 ? "one-time-code" : "off"}
          inputMode="numeric"
          pattern="[0-9]*"
          type="text"
          value={value[i] ?? ""}
          disabled={disabled}
          onChange={(e) => put(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          onPaste={(e) => {
            e.preventDefault();
            put(0, e.clipboardData.getData("text"));
          }}
          className={`h-14 w-full min-w-0 rounded-xl border bg-surface text-center text-2xl font-bold tabular-nums outline-none transition focus:ring-4 disabled:opacity-60 ${
            invalid
              ? "border-danger bg-danger-soft focus:ring-danger-soft"
              : value[i]
                ? "border-primary bg-primary-soft focus:border-primary focus:ring-primary-soft"
                : "border-border focus:border-primary focus:ring-primary-soft"
          }`}
        />
      ))}
    </div>
  );
}
