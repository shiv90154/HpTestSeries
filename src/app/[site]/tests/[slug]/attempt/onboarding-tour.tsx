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

    // English first, then the same in Hindi on a muted line. Static strings only: driver.js renders them as HTML.
    const text = (en: string, hi: string) => `${en}<span style="display:block;margin-top:6px;opacity:.75">${hi}</span>`;

    const steps = [
      {
        element: "#cbt-timer",
        popover: {
          title: "Time remaining",
          description: text(
            "This shows how much time you have left. When it reaches zero, your test is submitted automatically.",
            "यहाँ बचा हुआ समय दिखता है। समय खत्म होते ही टेस्ट अपने आप सबमिट हो जाएगा।",
          ),
        },
      },
      ...(isMobile
        ? [
            {
              element: "#cbt-palette-toggle",
              popover: {
                title: "Question palette",
                description: text(
                  "Tap here to see all questions and their status: answered, not answered or marked for review.",
                  "सभी प्रश्नों की सूची और उनका स्टेटस देखने के लिए यहाँ टैप करें।",
                ),
              },
            },
          ]
        : []),
      {
        element: "#cbt-section-tabs",
        popover: {
          title: "Sections",
          description: text("Use these tabs to move between the sections of the test.", "टेस्ट के अलग-अलग सेक्शन में जाने के लिए इन टैब का उपयोग करें।"),
        },
      },
      {
        element: "#cbt-mark-btn",
        popover: {
          title: "Mark for Review",
          description: text(
            "Not sure about an answer? Mark the question and come back to it later before you submit.",
            "किसी उत्तर पर संदेह हो तो प्रश्न को मार्क करें और बाद में दोबारा देखें।",
          ),
        },
      },
      {
        element: "#cbt-save-btn",
        popover: {
          title: "Save & Next (important)",
          description: text(
            "After selecting an option, always press Save & Next. An answer is counted only after it is saved.",
            "उत्तर चुनने के बाद Save & Next ज़रूर दबाएँ। सेव किए बिना उत्तर नहीं गिना जाता।",
          ),
        },
      },
    ];

    let cancelled = false;
    const t = setTimeout(async () => {
      const [{ driver }] = await Promise.all([import("driver.js"), import("driver.js/dist/driver.css")]);
      if (cancelled) return;
      const d = driver({
        showProgress: true,
        progressText: "Step {{current}} of {{total}}",
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Start test",
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
