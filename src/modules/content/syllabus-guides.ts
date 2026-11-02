import type { Faq } from "./exam-content";

/**
 * Extra study copy for exam pages that get many impressions but few clicks (GSC, Nov 2026): the topics that come up most,
 * a short preparation plan and more FAQs. It lives in code, not in the exam row, because the seed only fills empty fields,
 * so this is the way new copy reaches pages that were seeded long ago. Keyed by "bodySlug/examSlug"; shown on the hub
 * (important topics) and on /syllabus (everything). Keep it to facts that outlive one notification.
 */
export type SyllabusGuide = {
  /** Markdown list of the topics worth learning first. */
  important: string;
  /** Markdown preparation plan. */
  plan: string;
  /** Internal links for "Read next", with the visible text. */
  links: { href: string; label: string }[];
  faqs: Faq[];
};

const SYLLABUS_GUIDES: Record<string, SyllabusGuide> = {
  "hprca/forest-guard": {
    important: `- **Protected areas of Himachal:** Great Himalayan National Park (Kullu, UNESCO World Heritage Site), Pin Valley National Park (Lahaul-Spiti), Inderkilla, Khirganga and Simbalbara national parks, and the main wildlife sanctuaries district-wise
- **State symbols:** state animal snow leopard, state bird western tragopan (jujurana), state tree deodar, state flower pink rhododendron
- **Forest types:** tropical, sub-tropical pine (chir), temperate (deodar, kail, oak), sub-alpine and alpine forests, and the altitude at which each is found
- **Forest and wildlife laws:** Indian Forest Act 1927, Wildlife (Protection) Act 1972, Forest (Conservation) Act 1980, Environment (Protection) Act 1986, Biological Diversity Act 2002
- **Environment basics:** ecosystem, food chain, biodiversity hotspots, climate change, forest fires, soil erosion, Chipko and other conservation movements
- **Himachal GK:** districts, rivers (Satluj, Beas, Ravi, Chenab, Yamuna), passes, fairs and festivals, history and the formation of the state
- **Aptitude:** percentage, ratio, average, simple interest, series, coding-decoding, directions, and basic English grammar`,
    plan: `1. **Weeks 1–2:** forests and wildlife of Himachal: make a one-page table of national parks and sanctuaries with their districts, then learn forest types with the trees found in each.
2. **Weeks 3–4:** forest and environment laws (year and purpose of each Act) and environment basics, with a sectional test at the end of each week.
3. **Weeks 5–6:** Himachal GK district by district, plus 30 minutes of maths and reasoning every day.
4. **From week 7:** one full timed mock every 3 days; revise every wrong answer the same day. Keep up the running practice for the physical test throughout.`,
    links: [
      { href: "/blog/himachal-cabinet-12000-posts-approved-upcoming-recruitment-2026", label: "Upcoming Himachal recruitment, including Forest Guard posts" },
      { href: "/hprca/forest-guard", label: "HP Forest Guard mock tests" },
      { href: "/tests/hprca-forest-guard-free-mock-1", label: "Free Forest Guard mock test" },
      { href: "/himachal-gk-mock-test", label: "Himachal GK mock tests" },
    ],
    faqs: [
      {
        q: "Which national parks of Himachal are important for the Forest Guard exam?",
        a: "Great Himalayan National Park, Pin Valley, Inderkilla, Khirganga and Simbalbara national parks, with their districts. Learn the main wildlife sanctuaries district-wise too.",
      },
      {
        q: "Forest Guard exam me kaun se Acts padhne chahiye?",
        a: "Indian Forest Act 1927, Wildlife (Protection) Act 1972, Forest (Conservation) Act 1980, Environment (Protection) Act 1986 aur Biological Diversity Act 2002. Har Act ka saal aur maksad yaad rakho.",
      },
      {
        q: "How long does it take to prepare for the HP Forest Guard written exam?",
        a: "About two months of steady study covers the syllabus once: forests and wildlife first, then laws and environment, then Himachal GK and aptitude, with timed mocks in the last weeks.",
      },
    ],
  },

  "hpbose/hp-tet": {
    important: `- **Child Development & Pedagogy (every paper):** Piaget's stages, Vygotsky's ZPD and scaffolding, Kohlberg's moral stages, Gardner's multiple intelligences, Bloom's taxonomy, CCE and formative vs summative assessment, inclusive education and children with special needs, RTE Act 2009, NCF 2005 and NEP 2020
- **General Awareness & Himachal Pradesh:** districts, rivers, passes, fairs, history and formation of the state, and current affairs of the last year
- **JBT:** primary-level maths (fractions, percentage, geometry, data handling), EVS (family, plants, animals, water, travel) and the pedagogy of teaching each
- **TGT Arts:** history, geography, civics and economics of classes VI–X, and English
- **TGT Non-Medical / Medical:** maths, physics, chemistry or biology of classes VI–X with their pedagogy
- **Shastri / Language Teacher:** Sanskrit or Hindi grammar, literature and teaching methods`,
    plan: `1. **First 2 weeks:** Child Development & Pedagogy, the one section common to every paper. Learn each theory with a classroom example, because questions are often case-based.
2. **Weeks 3–5:** your category's subjects from the class VI–X NCERT/HPBOSE books, one subject per week, with a sectional test at the end of each.
3. **Week 6:** Himachal GK and current affairs, 45 minutes a day.
4. **Last 2–3 weeks:** a full 150-question mock every other day in 150 minutes. There is no negative marking, so practise answering every question.`,
    links: [
      { href: "/blog/hp-tet-jbt-syllabus-important-topics", label: "HP TET JBT syllabus and important topics" },
      { href: "/blog/hp-tet-tgt-syllabus-exam-pattern-arts-medical-non-medical", label: "HP TET TGT syllabus: Arts, Medical, Non-Medical" },
      { href: "/blog/hp-tet-shastri-language-teacher-syllabus-2026-hindi-sanskrit", label: "Shastri and Language Teacher syllabus" },
      { href: "/blog/hp-tet-books-preparation-strategy-jbt-tgt", label: "Best books and preparation strategy" },
      { href: "/blog/hp-tet-cut-off-result-2026-qualifying-marks-certificate", label: "HP TET qualifying marks and result" },
      { href: "/tests/hp-tet-free-mock-1", label: "Free HP TET mock test" },
    ],
    faqs: [
      {
        q: "Which topics of Child Development & Pedagogy are asked most in HP TET?",
        a: "Piaget, Vygotsky and Kohlberg, multiple intelligences, Bloom's taxonomy, assessment (CCE, formative and summative), inclusive education, and the RTE Act 2009, NCF 2005 and NEP 2020.",
      },
      {
        q: "HP TET ki taiyari kitne din me ho sakti hai?",
        a: "Lagbhag 6 se 8 hafte: pehle 2 hafte pedagogy, phir apni category ke subjects class VI–X ki kitabon se, phir Himachal GK, aur aakhri 2–3 hafte full mock tests.",
      },
      {
        q: "Which books should I read for HP TET?",
        a: "The NCERT and HPBOSE textbooks of classes VI–X for your subjects (classes I–V for JBT), and one standard Child Development & Pedagogy book. Our post on HP TET books lists them category-wise.",
      },
    ],
  },

  "hp-revenue/patwari": {
    important: `- **Himachal GK:** the 12 districts and their headquarters, rivers and their origins, passes, lakes, hydro projects, fairs (Kullu Dussehra, Minjar, Shivratri Mandi), princely states and the formation of Himachal (1948, 1966, 1971)
- **Land records and revenue terms:** jamabandi, khasra, khatauni, khewat, girdawari, mutation (intkal), tatima, and the HP Land Revenue Act 1954
- **Mathematics:** percentage, ratio, average, profit and loss, simple and compound interest, and area/measurement, including land units (bigha, biswa, kanal, marla)
- **Reasoning:** series, coding-decoding, blood relations, directions and analogies
- **Hindi and English:** grammar, synonyms, antonyms, one-word substitution and sentence correction
- **General studies and current affairs:** Indian polity, history, geography, general science and Himachal current affairs of the last 12 months`,
    plan: `1. **Weeks 1–3:** Himachal GK district by district: one district a day with its rivers, temples, fairs and projects, then a Himachal GK sectional test every Sunday.
2. **Weeks 4–5:** revenue terms and land units, then maths every day for speed: percentage, interest and area first.
3. **Week 6:** Hindi and English grammar with reasoning, 30 minutes each.
4. **From week 7:** a full 120-question mock twice a week in 90 minutes. Note the topics you got wrong and revise them before the next mock.`,
    links: [
      { href: "/blog/hp-patwari-syllabus-exam-pattern", label: "HP Patwari syllabus and exam pattern in detail" },
      { href: "/blog/hprca-recruitment-2026-all-posts-dates-vacancies", label: "HPRCA recruitment 2026: all posts and dates" },
      { href: "/hp-revenue/patwari", label: "HP Patwari mock tests" },
      { href: "/himachal-gk-mock-test", label: "Himachal GK mock tests" },
    ],
    faqs: [
      {
        q: "Patwari exam me land records ke kaun se terms aate hain?",
        a: "Jamabandi, khasra, khatauni, khewat, girdawari, intkal (mutation) aur tatima, saath me bigha, biswa, kanal aur marla jaise land units. In par revenue section me questions aate hain.",
      },
      {
        q: "How many questions are in the HP Patwari exam?",
        a: "As per HPRCA Advertisement No. 08/2025, 120 one-mark objective questions in 90 minutes: 85 on subjects up to the 10+2 level and 35 on GK, Himachal GK, current affairs, science, reasoning, English and Hindi.",
      },
      {
        q: "What is the qualifying mark in the HP Patwari exam?",
        a: "As per Advertisement No. 08/2025, 45% for General and 40% for SC/ST/OBC/WFF. Confirm in the current notification.",
      },
    ],
  },
};

export function syllabusGuide(key: string): SyllabusGuide | null {
  return SYLLABUS_GUIDES[key] ?? null;
}
