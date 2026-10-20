"use client";

import { useEffect } from "react";

const SEEN_KEY = "cbt:tour-seen";

/**
 * One-time guided tour of the real-CBT interface, shown the first time anyone reaches the exam screen. driver.js and
 * its CSS load only then, so students who have seen the tour never download them.
 */
export function OnboardingTour() {
  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return;
    const isMobile = window.innerWidth < 1024;

    const steps = [
      {
        element: "#cbt-timer",
        popover: {
          title: "Time left",
          description: "Yaha bacha hua time dikhega. Time khatam hote hi test apne aap submit ho jayega.",
        },
      },
      ...(isMobile
        ? [
            {
              element: "#cbt-palette-toggle",
              popover: {
                title: "Question palette",
                description: "Sabhi questions ki list aur unka status (answered/marked) dekhne ke liye yaha tap karein.",
              },
            },
          ]
        : []),
      {
        element: "#cbt-section-tabs",
        popover: {
          title: "Sections",
          description: "Alag-alag sections ke beech switch karne ke liye ye tabs use karein.",
        },
      },
      {
        element: "#cbt-mark-btn",
        popover: {
          title: "Mark for Review",
          description: "Confuse ho? Question ko baad me dekhne ke liye mark karke aage badh sakte hain.",
        },
      },
      {
        element: "#cbt-save-btn",
        popover: {
          title: "Save & Next — important!",
          description: "Answer select karne ke baad yaha zaroor dabayein. Bina Save & Next dabaye answer count nahi hota.",
        },
      },
    ];

    let cancelled = false;
    const t = setTimeout(async () => {
      const [{ driver }] = await Promise.all([import("driver.js"), import("driver.js/dist/driver.css")]);
      if (cancelled) return;
      const d = driver({
        showProgress: true,
        steps,
        onDestroyed: () => localStorage.setItem(SEEN_KEY, "1"),
      });
      d.drive();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return null;
}
