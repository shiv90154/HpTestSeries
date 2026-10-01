"use client";

import { useEffect, useState } from "react";
import { btn } from "./ui";

const WORDS = ["Explore", "Discover", "Learn", "Read", "Guide", "Himachal"];
// First word repeated at the end, so the last slide continues forward into it instead of rewinding.
const TRACK = [...WORDS, WORDS[0]];
const ROW = "1.25rem";
const SLIDE_MS = 600;

/** Header link to the partner guide. The label slides through related words; still on "Explore" for reduced-motion users. */
export function ExploreButton({ href }: { href: string }) {
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setAnimate(true);
      setI((n) => n + 1);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  // Once the slide onto the repeated first word ends, jump back to the real first word with no animation.
  useEffect(() => {
    if (i < WORDS.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setI(0);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <a href={href} target="_blank" rel="noopener" aria-label="Explore Himachal" className={btn("primary", "sm", "rounded-full px-5")}>
      <span aria-hidden className="block overflow-hidden" style={{ height: ROW }}>
        <span
          className="flex flex-col will-change-transform"
          style={{
            transform: `translateY(calc(${i} * -${ROW}))`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
          }}
        >
          {TRACK.map((w, k) => (
            <span key={k} className="block text-center" style={{ height: ROW, lineHeight: ROW }}>
              {w}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}
