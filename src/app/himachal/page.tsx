import { ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { FREE_MOCK_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Know Your Himachal — District-wise HP GK for Exams",
  description:
    "Free, easy-to-read guide to all 12 districts of Himachal Pradesh: headquarters, famous places, fairs and records that are asked in HPAS, HPRCA, Patwari and Police exams.",
  alternates: { canonical: "/himachal" },
};

type District = { name: string; slug: string; hq: string; known: string[]; fact: string };

/** Well-known, stable facts only. Population and area rankings follow Census 2011. */
const DISTRICTS: District[] = [
  { name: "Bilaspur", slug: "bilaspur", hq: "Bilaspur", known: ["Bhakra Dam", "Gobind Sagar lake", "Naina Devi temple"], fact: "Bhakra dam on the Satluj is one of the highest gravity dams in the world." },
  { name: "Chamba", slug: "chamba", hq: "Chamba", known: ["Chamba Rumal", "Bharmour (Chaurasi temples)", "Pangi valley"], fact: "Minjar fair is held here every year; Chamba Rumal has a GI tag." },
  { name: "Hamirpur", slug: "hamirpur", hq: "Hamirpur", known: ["Sujanpur Tira", "Baba Balak Nath (Deotsidh)"], fact: "Highest literacy rate in the state and the smallest district by area." },
  { name: "Kangra", slug: "kangra", hq: "Dharamshala", known: ["Kangra Fort", "Jwalamukhi temple", "Masroor rock temples", "Pong Dam"], fact: "Most populous district; the Dalai Lama's seat at McLeod Ganj is here." },
  { name: "Kinnaur", slug: "kinnaur", hq: "Reckong Peo", known: ["Kinner Kailash", "Sangla valley", "Kalpa"], fact: "Famous for apples and the Kinnauri shawl; Shipki La pass is on the Tibet border." },
  { name: "Kullu", slug: "kullu", hq: "Kullu", known: ["Manikaran", "Rohtang Pass", "Great Himalayan National Park"], fact: "Kullu Dussehra, a week-long festival of village deities, starts when the rest of India ends Dussehra." },
  { name: "Lahaul & Spiti", slug: "lahaul-and-spiti", hq: "Keylong", known: ["Key Monastery", "Tabo Monastery", "Chandratal lake"], fact: "Largest district by area and the least populated; Atal Tunnel gives it year-round road access." },
  { name: "Mandi", slug: "mandi", hq: "Mandi", known: ["Rewalsar lake", "Pandoh dam", "Prashar lake"], fact: "Called Chhoti Kashi for its many temples; the Shivratri fair is world famous." },
  { name: "Shimla", slug: "shimla", hq: "Shimla", known: ["The Ridge & Mall Road", "Kufri", "Jakhu temple"], fact: "State capital, once the summer capital of British India." },
  { name: "Sirmaur", slug: "sirmaur", hq: "Nahan", known: ["Renuka lake", "Paonta Sahib gurudwara"], fact: "Renuka lake is the largest natural lake of Himachal." },
  { name: "Solan", slug: "solan", hq: "Solan", known: ["Kasauli", "Baddi-Barotiwala industrial belt", "Shoolini temple"], fact: "Known as the Mushroom City of India; the state's major industrial hub." },
  { name: "Una", slug: "una", hq: "Una", known: ["Chintpurni temple", "Dera Baba Barbhag Singh"], fact: "Lowest-lying district on the Punjab border; a gateway to the state." },
];

const FACTS: [string, string][] = [
  ["Statehood", "25 January 1971 — the 18th state of India."],
  ["Capital", "Shimla (summer) and Dharamshala (winter, second capital)."],
  ["Districts", "12 districts, grouped into 3 divisions: Shimla, Kangra and Mandi."],
  ["Major rivers", "Satluj, Beas, Ravi, Chenab and Yamuna's tributaries."],
  ["State animal & bird", "Snow Leopard and Western Tragopan (Jujurana)."],
  ["State tree & flower", "Deodar and Pink Rhododendron."],
];

export default function KnowYourHimachalPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-10 sm:py-14">
        <header className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Free to read</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Know Your Himachal</h1>
          <p lang="hi" className="text-lg text-muted">
            हिमाचल के सभी 12 जिलों की आसान जानकारी — परीक्षा में पूछे जाने वाले तथ्यों के साथ।
          </p>
        </header>

        <section aria-labelledby="quick-facts" className="space-y-4">
          <h2 id="quick-facts" className="text-xl font-bold sm:text-2xl">
            Quick facts
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map(([k, v]) => (
              <div key={k} className={`${card} p-4`}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{k}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="districts" className="space-y-4">
          <h2 id="districts" className="text-xl font-bold sm:text-2xl">
            All 12 districts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISTRICTS.map((d) => (
              <a
                key={d.name}
                href={`https://knowyourhimachal.in/districts/${d.slug}`}
                target="_blank"
                rel="noopener"
                className={`${card} group flex flex-col gap-3 p-5 transition hover:border-primary`}
              >
                <div className="space-y-0.5">
                  <h3 className="flex items-center justify-between gap-2 text-lg font-semibold group-hover:text-primary">
                    {d.name} <ExternalLink className="size-4 shrink-0 text-muted" aria-hidden />
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted">
                    <MapPin className="size-3.5" aria-hidden /> HQ: {d.hq}
                  </p>
                </div>
                <p className="text-sm leading-relaxed">{d.fact}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {d.known.map((k) => (
                    <li key={k} className="rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
                      {k}
                    </li>
                  ))}
                </ul>
                <span className="text-xs font-semibold text-primary">Read more on Know Your Himachal →</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-muted">Summary for exam revision. Always confirm figures against the latest official sources.</p>
        </section>

        <section className={`${card} flex flex-col gap-4 p-6 sm:flex-row sm:items-center`}>
          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-bold">Want to explore places, treks and festivals?</h2>
            <p className="text-sm text-muted">Know Your Himachal is a detailed travel guide to forts, temples, valleys and festivals.</p>
          </div>
          <a href="https://knowyourhimachal.in/" target="_blank" rel="noopener" className={btn("outline")}>
            Visit knowyourhimachal.in <ExternalLink className="size-4" aria-hidden />
          </a>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href={FREE_MOCK_HREF} className={btn("primary")}>
            Test yourself — free HP GK mock
          </Link>
          <Link href="/blog" className={btn("outline")}>
            Exam updates
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
