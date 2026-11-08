"use client";

import { MessageCircle, Send, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "./analytics";
import { WhatsAppIcon } from "./whatsapp-group";

type Faq = {
  q: string;
  a: string;
  /** Lower-case words (English and Hinglish) that make a typed question match this answer. */
  keys: string[];
  link?: { href: string; label: string };
};

// Only facts the site already states (pricing, refund policy, contact pages). Anything else goes to WhatsApp.
const FAQS: Faq[] = [
  {
    q: "Price / plans",
    a: "Every exam has its own test series and there is also an all-access pass. Every plan is a one-time payment, no subscription. The price shown is the final amount.\n\nहर exam की अपनी test series है और एक all-access pass भी है। एक बार का payment, कोई subscription नहीं।",
    keys: ["price", "plan", "pass", "cost", "fee", "fees", "rate", "kitna", "kitne", "paisa", "paise", "rupee", "रुपय", "कीमत", "प्राइस", "कितन"],
    link: { href: "/pricing", label: "See pricing" },
  },
  {
    q: "Free test",
    a: "Yes. Every exam has free tests in the same screen as the paid ones, and free tests need no login.\n\nहर exam में free tests हैं, इनके लिए login नहीं चाहिए।",
    keys: ["free", "trial", "demo", "try", "muft", "mufat", "फ्री", "मुफ्त", "मुफ़्त"],
    link: { href: "/tests", label: "Open tests" },
  },
  {
    q: "How to register / login",
    a: "Tap Login on the site and create your account. Free tests work without an account, but you need one to buy a plan and to save your results.\n\nSite पर Login दबाकर account बनाएँ। Plan खरीदने और results सेव करने के लिए account चाहिए।",
    keys: ["register", "registration", "login", "log in", "sign up", "signup", "account", "otp", "रजिस्टर", "लॉगिन", "लॉग इन", "खाता"],
    link: { href: "/login", label: "Go to login" },
  },
  {
    q: "How to pay",
    a: "Pay with UPI, debit or credit card or netbanking through Razorpay. Your plan unlocks on your account right after payment.\n\nUPI, card या netbanking से Razorpay पर payment करें। Payment के तुरंत बाद plan खुल जाता है।",
    keys: ["pay", "payment", "upi", "card", "netbanking", "razorpay", "buy", "purchase", "kharid", "भुगतान", "पेमेंट", "खरीद"],
  },
  {
    q: "How long is my access?",
    a: "The validity is printed on each plan (for example 365 days). Within that time you can attempt every test as many times as you like.\n\nValidity हर plan पर लिखी होती है। उस दौरान हर test जितनी बार चाहें दे सकते हैं।",
    keys: ["validity", "valid", "access", "expire", "expiry", "days", "kab tak", "kitne din", "वैलिडिटी", "कब तक"],
  },
  {
    q: "New tests / test dates",
    a: "New tests and exam updates are posted on the site, and the WhatsApp group has them first. Each exam page shows its tests.\n\nनए tests और exam updates site के Exam Updates में आते हैं।",
    keys: ["new test", "when", "kab", "date", "schedule", "update", "aate", "aayega", "notification", "कब", "नए", "नया"],
    link: { href: "/blog", label: "Exam updates" },
  },
  {
    q: "Refund",
    a: "Change of mind within 7 days, as long as you have not started a test in that series, gets a refund. Duplicate payments are refunded in full. Approved refunds reach you in 5–7 working days.\n\n7 दिन के अंदर, test शुरू करने से पहले refund मिल जाता है।",
    keys: ["refund", "money back", "return", "cancel", "wapas", "vapas", "रिफंड", "वापस"],
    link: { href: "/refund-request", label: "Request refund" },
  },
];

const PROBLEM_TEXT = "I paid but my plan is not unlocked / I have a problem with my account.";

function waHref(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

function bestFaq(input: string): Faq | null {
  const text = input.toLowerCase();
  let best: Faq | null = null;
  let bestScore = 0;
  for (const f of FAQS) {
    const score = f.keys.filter((k) => text.includes(k)).length;
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  return best;
}

type Msg = { from: "bot" | "me"; text: string; link?: Faq["link"]; ask?: string };

/**
 * Small FAQ helper on every public page. It answers the common questions from the list above; anything else
 * (or a payment problem) becomes a WhatsApp message to our support numbers, with the student's question filled in.
 */
export function HelpChat({ siteName, phones }: { siteName: string; phones: string[] }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: `Hi! Welcome to ${siteName}. Pick a question below or type yours.\n\nनमस्ते! नीचे से सवाल चुनें या अपना सवाल लिखें।` }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (phones.length === 0) return null;

  function ask(question: string, faq: Faq | null) {
    const reply: Msg = faq
      ? { from: "bot", text: faq.a, link: faq.link }
      : { from: "bot", text: "I don't have an answer for that. Message us on WhatsApp and we will reply.\n\nइसका जवाब मेरे पास नहीं है। WhatsApp पर लिखें, हम जवाब देंगे।", ask: question };
    setMsgs((m) => [...m, { from: "me", text: question }, reply]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q, bestFaq(q));
  }

  function waButtons(text: string, place: string) {
    return (
      <div className="mt-2 flex flex-col gap-1.5">
        {phones.map((p) => (
          <a
            key={p}
            href={waHref(p, `${siteName}: ${text}`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("help_chat_whatsapp_click", { place })}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#118376] px-4 text-sm font-semibold text-white hover:bg-[#0d6b60]"
          >
            <WhatsAppIcon /> WhatsApp {p}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 md:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-label={`${siteName} help`}
          className="mb-3 flex h-[min(32rem,calc(100dvh-10rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-2xl"
        >
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <h2 className="text-sm font-semibold">{siteName} Help</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close help" className="grid size-8 place-items-center rounded-lg hover:bg-white/15">
              <X className="size-5" />
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : ""}>
                <div className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3 py-2 ${m.from === "me" ? "bg-primary text-white" : "bg-primary-soft"}`}>
                  {m.text}
                  {m.link && (
                    <Link href={m.link.href} className="mt-2 block font-semibold text-primary underline underline-offset-2" onClick={() => setOpen(false)}>
                      {m.link.label} →
                    </Link>
                  )}
                  {m.ask && waButtons(m.ask, "no_answer")}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="space-y-2 border-t border-border p-3">
            <div className="flex flex-wrap gap-1.5">
              {FAQS.map((f) => (
                <button key={f.q} type="button" onClick={() => ask(f.q, f)} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">
                  {f.q}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setMsgs((m) => [...m, { from: "me", text: "Payment / account problem" }, { from: "bot", text: "Sorry about that. Message us on WhatsApp.\n\nमाफ़ कीजिए, WhatsApp पर हमें लिखें।", ask: PROBLEM_TEXT }])}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
              >
                Payment problem
              </button>
            </div>
            <form onSubmit={submit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={200}
                placeholder="Type your question"
                aria-label="Type your question"
                className="h-10 min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 text-sm"
              />
              <button type="submit" aria-label="Send" className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white hover:bg-primary-strong">
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </section>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setOpen((o) => !o);
            track("help_chat_open");
          }}
          aria-expanded={open}
          aria-label="Help"
          className="grid size-13 place-items-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        </button>
      </div>
    </div>
  );
}
