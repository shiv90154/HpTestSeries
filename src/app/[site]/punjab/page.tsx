import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { T } from "@/components/ui-lang";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";

// The pb site's state GK page, the counterpart of /himachal on hp. Well-known, stable facts only; check them against
// official sources before pb launches (src/sites/pb.ts `launched`).

export const metadata: Metadata = {
  title: "Know Your Punjab — District-wise Punjab GK for Exams",
  description:
    "Free, easy-to-read guide to the 23 districts of Punjab: headquarters, famous places and facts asked in Punjab Police, PSSSB, PPSC and Patwari exams.",
  alternates: { canonical: "/punjab" },
};

type District = { name: string; hq: string; known: string[] };

const DISTRICTS: District[] = [
  { name: "Amritsar", hq: "Amritsar", known: ["Harmandir Sahib (Golden Temple)", "Jallianwala Bagh", "Attari–Wagah border"] },
  { name: "Barnala", hq: "Barnala", known: [] },
  { name: "Bathinda", hq: "Bathinda", known: ["Qila Mubarak", "Takht Sri Damdama Sahib, Talwandi Sabo"] },
  { name: "Faridkot", hq: "Faridkot", known: ["Named after Baba Sheikh Farid"] },
  { name: "Fatehgarh Sahib", hq: "Fatehgarh Sahib", known: ["Gurdwara Fatehgarh Sahib", "Shaheedi Jor Mela"] },
  { name: "Fazilka", hq: "Fazilka", known: ["Sadqi border post"] },
  { name: "Ferozepur", hq: "Ferozepur", known: ["Hussainiwala National Martyrs Memorial"] },
  { name: "Gurdaspur", hq: "Gurdaspur", known: ["Dera Baba Nanak", "Kartarpur corridor"] },
  { name: "Hoshiarpur", hq: "Hoshiarpur", known: [] },
  { name: "Jalandhar", hq: "Jalandhar", known: ["Sports goods industry", "Devi Talab Mandir"] },
  { name: "Kapurthala", hq: "Kapurthala", known: ["Sultanpur Lodhi (Guru Nanak Dev)", "Rail Coach Factory"] },
  { name: "Ludhiana", hq: "Ludhiana", known: ["Punjab Agricultural University", "Hosiery and cycle industry"] },
  { name: "Malerkotla", hq: "Malerkotla", known: ["Punjab's 23rd district (2021)"] },
  { name: "Mansa", hq: "Mansa", known: [] },
  { name: "Moga", hq: "Moga", known: [] },
  { name: "Pathankot", hq: "Pathankot", known: ["Meeting point of Punjab, Himachal and J&K"] },
  { name: "Patiala", hq: "Patiala", known: ["Qila Mubarak", "NIS Patiala", "Punjabi University"] },
  { name: "Rupnagar", hq: "Rupnagar", known: ["Anandpur Sahib (Takht Sri Kesgarh Sahib)", "Hola Mohalla"] },
  { name: "Sahibzada Ajit Singh Nagar", hq: "Mohali", known: [] },
  { name: "Sangrur", hq: "Sangrur", known: [] },
  { name: "Shaheed Bhagat Singh Nagar", hq: "Nawanshahr", known: ["Khatkar Kalan, Bhagat Singh's ancestral village"] },
  { name: "Sri Muktsar Sahib", hq: "Sri Muktsar Sahib", known: ["Maghi Mela"] },
  { name: "Tarn Taran", hq: "Tarn Taran", known: ["Goindwal Sahib"] },
];

const FACTS: [string, string][] = [
  ["Present state", "Formed on 1 November 1966 under the Punjab Reorganisation Act, 1966."],
  ["Capital", "Chandigarh, a Union Territory shared with Haryana."],
  ["Districts", "23 districts; the regions are Majha, Doaba and Malwa."],
  ["Major rivers", "Satluj, Beas and Ravi."],
  ["Official language", "Punjabi, written in Gurmukhi."],
  ["State animal & bird", "Blackbuck and Baaz (Northern Goshawk)."],
];

export default async function KnowYourPunjabPage() {
  const site = await currentSite();
  if (site.code !== "pb") notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-10 sm:py-14">
        <header className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Free to read</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <T en="Know Your Punjab" pa="ਆਪਣਾ ਪੰਜਾਬ ਜਾਣੋ" />
          </h1>
          <p lang="hi" className="text-lg text-muted">
            <T
              en="पंजाब के सभी 23 जिलों की आसान जानकारी — परीक्षा में पूछे जाने वाले तथ्यों के साथ।"
              pa="ਪੰਜਾਬ ਦੇ ਸਾਰੇ 23 ਜ਼ਿਲ੍ਹਿਆਂ ਦੀ ਸੌਖੀ ਜਾਣਕਾਰੀ — ਪ੍ਰੀਖਿਆ ਵਿੱਚ ਪੁੱਛੇ ਜਾਂਦੇ ਤੱਥਾਂ ਸਮੇਤ।"
            />
          </p>
        </header>

        <section aria-labelledby="quick-facts" className="space-y-4">
          <h2 id="quick-facts" className="text-xl font-bold sm:text-2xl">
            <T en="Quick facts" pa="ਮੁੱਖ ਤੱਥ" />
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
            <T en={`All ${DISTRICTS.length} districts`} pa={`ਸਾਰੇ ${DISTRICTS.length} ਜ਼ਿਲ੍ਹੇ`} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISTRICTS.map((d) => (
              <div key={d.name} className={`${card} flex flex-col gap-3 p-5`}>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold">{d.name}</h3>
                  <p className="flex items-center gap-1 text-sm text-muted">
                    <MapPin className="size-3.5" aria-hidden /> <T en="HQ" pa="ਮੁੱਖ ਦਫ਼ਤਰ" />: {d.hq}
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
          <p className="text-xs text-muted">
            <T
              en="Summary for exam revision. Always confirm figures against the latest official sources."
              pa="ਪ੍ਰੀਖਿਆ ਦੀ ਦੁਹਰਾਈ ਲਈ ਸਾਰ। ਅੰਕੜਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਹਮੇਸ਼ਾ ਤਾਜ਼ਾ ਅਧਿਕਾਰਤ ਸਰੋਤਾਂ ਤੋਂ ਕਰੋ।"
            />
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href={freeMockHref(site)} className={btn("primary")}>
            <T en="Test yourself — free Punjab GK mock" pa="ਆਪਣੇ ਆਪ ਨੂੰ ਪਰਖੋ — ਮੁਫ਼ਤ ਪੰਜਾਬ GK ਮੌਕ" />
          </Link>
          <Link href="/blog" className={btn("outline")}>
            <T en="Exam updates" pa="ਪ੍ਰੀਖਿਆ ਅਪਡੇਟ" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
