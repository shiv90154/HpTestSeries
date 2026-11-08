import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";

// The hr site's state GK page, the counterpart of /himachal on hp, /punjab on pb and /rajasthan on rj. Well-known,
// stable facts only; check them against official sources before hr launches (src/sites/hr.ts `launched`).

export const metadata: Metadata = {
  title: "Know Your Haryana — District-wise Haryana GK for Exams",
  description:
    "Free, easy-to-read guide to the districts of Haryana: headquarters, famous places and facts asked in Haryana Police, HSSC CET, Patwari, HPSC and HTET exams.",
  alternates: { canonical: "/haryana" },
};

type District = { name: string; hq: string; known: string[] };

const DISTRICTS: District[] = [
  { name: "Ambala", hq: "Ambala", known: ["Army cantonment", "Scientific instruments industry"] },
  { name: "Bhiwani", hq: "Bhiwani", known: ["'Little Cuba' for boxing", "Tosham hills"] },
  { name: "Charkhi Dadri", hq: "Charkhi Dadri", known: ["Made a district in 2016"] },
  { name: "Faridabad", hq: "Faridabad", known: ["Surajkund Crafts Mela", "Major industrial city"] },
  { name: "Fatehabad", hq: "Fatehabad", known: ["Named after Fateh Khan, son of Firoz Shah Tughlaq"] },
  { name: "Gurugram", hq: "Gurugram", known: ["Millennium City", "Sultanpur National Park", "Manesar industrial belt"] },
  { name: "Hisar", hq: "Hisar", known: ["Rakhigarhi (Harappan site)", "Haryana Agricultural University", "Hisar-e-Firuza"] },
  { name: "Jhajjar", hq: "Jhajjar", known: ["AIIMS Jhajjar (Badsa)", "Bahadurgarh"] },
  { name: "Jind", hq: "Jind", known: ["Pandu-Pindara temple", "Jayanti Devi temple"] },
  { name: "Kaithal", hq: "Kaithal", known: ["Ancient Kapisthala", "Rice belt"] },
  { name: "Karnal", hq: "Karnal", known: ["Birthplace of Kalpana Chawla", "National Dairy Research Institute", "Battle of Karnal (1739)"] },
  { name: "Kurukshetra", hq: "Kurukshetra", known: ["Brahma Sarovar", "Jyotisar (Gita Upadesh)", "Mahabharata war"] },
  { name: "Mahendragarh", hq: "Narnaul", known: ["Dhosi Hill"] },
  { name: "Nuh", hq: "Nuh", known: ["Formerly Mewat"] },
  { name: "Palwal", hq: "Palwal", known: ["Gateway to Haryana from Delhi"] },
  { name: "Panchkula", hq: "Panchkula", known: ["Pinjore Gardens", "Morni Hills", "Kalka"] },
  { name: "Panipat", hq: "Panipat", known: ["Three Battles of Panipat", "City of Weavers (handloom)", "Neeraj Chopra's district"] },
  { name: "Rewari", hq: "Rewari", known: ["Brass utensils", "Linked with Hemu"] },
  { name: "Rohtak", hq: "Rohtak", known: ["Maharshi Dayanand University", "PGIMS Rohtak", "Murrah buffalo region"] },
  { name: "Sirsa", hq: "Sirsa", known: ["Ghaggar river", "Cotton belt"] },
  { name: "Sonipat", hq: "Sonipat", known: ["Murthal parathas", "One of the five 'prasthas' of the Mahabharata"] },
  { name: "Yamunanagar", hq: "Yamunanagar", known: ["Plywood industry", "Kalesar National Park"] },
];

const FACTS: [string, string][] = [
  ["Present state", "Became a separate state on 1 November 1966, carved out of Punjab; the 17th state of India."],
  ["Capital", "Chandigarh, shared with Punjab. The common High Court is also at Chandigarh."],
  ["Districts", "22 districts as listed here; check the latest official list, as new districts have been proposed."],
  ["Major rivers", "Yamuna on the east; Ghaggar, Markanda and other seasonal rivers; the Western Yamuna Canal system irrigates much of the state."],
  ["Legislature", "Vidhan Sabha of 90 seats; 10 Lok Sabha and 5 Rajya Sabha members."],
  ["State symbols", "Animal: Blackbuck · Bird: Black francolin · Tree: Peepal · Flower: Lotus."],
];

export default async function KnowYourHaryanaPage() {
  const site = await currentSite();
  if (site.code !== "hr") notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-10 sm:py-14">
        <header className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Free to read</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Know Your Haryana</h1>
          <p lang="hi" className="text-lg text-muted">
            हरियाणा के सभी {DISTRICTS.length} जिलों की आसान जानकारी — परीक्षा में पूछे जाने वाले तथ्यों के साथ।
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
            All {DISTRICTS.length} districts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISTRICTS.map((d) => (
              <div key={d.name} className={`${card} flex flex-col gap-3 p-5`}>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold">{d.name}</h3>
                  <p className="flex items-center gap-1 text-sm text-muted">
                    <MapPin className="size-3.5" aria-hidden /> HQ: {d.hq}
                  </p>
                </div>
                {d.known.length > 0 && (
                  <ul className="mt-auto flex flex-wrap gap-1.5">
                    {d.known.map((k) => (
                      <li key={k} className="rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
                        {k}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">Summary for exam revision. Always confirm figures against the latest official sources.</p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href={freeMockHref(site)} className={btn("primary")}>
            Test yourself — free Haryana GK mock
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
