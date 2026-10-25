import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";

// The rj site's state GK page, the counterpart of /himachal on hp and /punjab on pb. Well-known, stable facts only;
// check them against official sources before rj launches (src/sites/rj.ts `launched`).

export const metadata: Metadata = {
  title: "Know Your Rajasthan — District-wise Rajasthan GK for Exams",
  description:
    "Free, easy-to-read guide to the 41 districts of Rajasthan: headquarters, famous places and facts asked in Rajasthan Police, RSSB Patwari, VDO, CET, REET and RPSC exams.",
  alternates: { canonical: "/rajasthan" },
};

type District = { name: string; hq: string; known: string[] };

const DISTRICTS: District[] = [
  { name: "Ajmer", hq: "Ajmer", known: ["Dargah of Khwaja Moinuddin Chishti", "Pushkar Fair", "Taragarh fort"] },
  { name: "Alwar", hq: "Alwar", known: ["Sariska Tiger Reserve"] },
  { name: "Balotra", hq: "Balotra", known: ["Tilwara cattle fair", "Pachpadra"] },
  { name: "Banswara", hq: "Banswara", known: ["Mahi Bajaj Sagar dam", "'City of a hundred islands'"] },
  { name: "Baran", hq: "Baran", known: ["Shahabad", "Sitabari fair"] },
  { name: "Barmer", hq: "Barmer", known: ["Desert National Park (part)", "Kiradu temples"] },
  { name: "Beawar", hq: "Beawar", known: [] },
  { name: "Bharatpur", hq: "Bharatpur", known: ["Keoladeo National Park", "Lohagarh fort"] },
  { name: "Bhilwara", hq: "Bhilwara", known: ["Textile city", "Phad painting"] },
  { name: "Bikaner", hq: "Bikaner", known: ["Junagarh fort", "Karni Mata temple, Deshnok", "Camel research centre"] },
  { name: "Bundi", hq: "Bundi", known: ["Taragarh fort", "Stepwells (baoris)"] },
  { name: "Chittorgarh", hq: "Chittorgarh", known: ["Chittorgarh fort", "Vijay Stambh"] },
  { name: "Churu", hq: "Churu", known: ["Tal Chhapar blackbuck sanctuary"] },
  { name: "Dausa", hq: "Dausa", known: ["Abhaneri stepwell (Chand Baori)", "Mehandipur Balaji"] },
  { name: "Deeg", hq: "Deeg", known: ["Deeg water palaces"] },
  { name: "Dholpur", hq: "Dholpur", known: ["Red sandstone", "National Chambal Sanctuary (part)"] },
  { name: "Didwana-Kuchaman", hq: "Didwana", known: ["Kuchaman fort"] },
  { name: "Dungarpur", hq: "Dungarpur", known: ["Baneshwar fair"] },
  { name: "Hanumangarh", hq: "Hanumangarh", known: ["Kalibangan (Harappan site)", "Bhatner fort"] },
  { name: "Jaipur", hq: "Jaipur", known: ["Capital, the Pink City", "Amer fort", "Jantar Mantar", "Hawa Mahal"] },
  { name: "Jaisalmer", hq: "Jaisalmer", known: ["Sonar Qila", "Desert National Park", "Pokhran"] },
  { name: "Jalore", hq: "Jalore", known: ["Jalore fort", "Granite industry"] },
  { name: "Jhalawar", hq: "Jhalawar", known: ["Gagron fort", "Chandrabhaga fair"] },
  { name: "Jhunjhunu", hq: "Jhunjhunu", known: ["Shekhawati havelis", "Khetri copper mines"] },
  { name: "Jodhpur", hq: "Jodhpur", known: ["Mehrangarh fort", "Rajasthan High Court", "The Sun City"] },
  { name: "Karauli", hq: "Karauli", known: ["Kaila Devi temple"] },
  { name: "Khairthal-Tijara", hq: "Khairthal", known: ["Tijara fort"] },
  { name: "Kota", hq: "Kota", known: ["Kota Barrage on the Chambal", "Coaching hub", "Kota Doria sarees"] },
  { name: "Kotputli-Behror", hq: "Kotputli", known: [] },
  { name: "Nagaur", hq: "Nagaur", known: ["Nagaur cattle fair", "Makrana marble"] },
  { name: "Pali", hq: "Pali", known: ["Ranakpur Jain temple"] },
  { name: "Phalodi", hq: "Phalodi", known: ["Khichan demoiselle cranes"] },
  { name: "Pratapgarh", hq: "Pratapgarh", known: ["Thewa art", "Sita Mata sanctuary"] },
  { name: "Rajsamand", hq: "Rajsamand", known: ["Kumbhalgarh fort", "Haldighati", "Nathdwara"] },
  { name: "Salumbar", hq: "Salumbar", known: [] },
  { name: "Sawai Madhopur", hq: "Sawai Madhopur", known: ["Ranthambore National Park", "Ranthambore fort"] },
  { name: "Sikar", hq: "Sikar", known: ["Khatu Shyam ji temple", "Harshnath temple"] },
  { name: "Sirohi", hq: "Sirohi", known: ["Mount Abu", "Guru Shikhar", "Dilwara Jain temples"] },
  { name: "Sri Ganganagar", hq: "Sri Ganganagar", known: ["Gang Canal", "'Food basket of Rajasthan'"] },
  { name: "Tonk", hq: "Tonk", known: ["Bisalpur dam", "Arabic and Persian Research Institute"] },
  { name: "Udaipur", hq: "Udaipur", known: ["City of Lakes", "Lake Pichola", "City Palace"] },
];

const FACTS: [string, string][] = [
  ["Present state", "Took its present shape on 1 November 1956; Rajasthan Diwas is 30 March (Greater Rajasthan, 1949)."],
  ["Capital", "Jaipur. The principal seat of the High Court is at Jodhpur."],
  ["Area", "Largest state of India, about 3.42 lakh sq km."],
  ["Districts", "41 districts in 7 divisions after the December 2024 reorganisation."],
  ["Major rivers", "Chambal, Banas, Luni and Mahi; Aravallis' highest peak is Guru Shikhar."],
  ["State symbols", "Animal: Camel and Chinkara · Bird: Godawan · Tree: Khejri · Flower: Rohida."],
];

export default async function KnowYourRajasthanPage() {
  const site = await currentSite();
  if (site.code !== "rj") notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-10 sm:py-14">
        <header className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Free to read</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Know Your Rajasthan</h1>
          <p lang="hi" className="text-lg text-muted">
            राजस्थान के सभी {DISTRICTS.length} जिलों की आसान जानकारी — परीक्षा में पूछे जाने वाले तथ्यों के साथ।
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
            Test yourself — free Rajasthan GK mock
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
