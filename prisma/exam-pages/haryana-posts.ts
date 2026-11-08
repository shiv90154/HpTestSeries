import { hr } from "../../src/sites/hr";
import type { PostSeed } from "./types";

const FREE_MOCK = `/tests/${hr.freeMockSlug}`;

// hrtestseries.in evergreen posts. HSSC's own site (hssc.gov.in) was read on 9 November 2026: it lists Advt. No. 05/2026
// (CET Group D) and Advt. No. 06/2026 (Group C, 22 June 2026), and a PST notice for Advt. Nos. 13/2024, 01/2026 and
// 06/2026. Figures the notices were not read for (vacancies, marks, cutoffs) are left as "official notification me
// dekhein" rather than copied from aggregator sites. No Haryana exam pages exist yet, so these posts are tied to no exam.

const OFFICIAL = "[hssc.gov.in](https://hssc.gov.in)";
const MOCK_CTA = `## Practice shuru karo

[Free Haryana GK mock test](${FREE_MOCK}) bina login ke do — real CBT format, Hindi aur English dono me, detailed solutions ke saath. Aur tests ke liye [saare mock tests](/tests) dekho.`;

export const HARYANA_POSTS: PostSeed[] = [
  {
    slug: "hssc-cet-syllabus-2026-group-c-d-topic-wise",
    site: "hr",
    publish: true,
    category: "SYLLABUS",
    exams: [],
    seoTitle: "HSSC CET Syllabus 2026: Topic-wise Group C & D Syllabus",
    seoDescription: "HSSC CET 2026 syllabus topic-wise: Haryana GK, reasoning, maths, English, Hindi, computer and current affairs, with what to study first.",
    title: "HSSC CET Syllabus 2026: Topic-wise Syllabus for Group C and Group D",
    titleHi: "HSSC CET सिलेबस 2026: ग्रुप C और D का टॉपिक-वाइज़ पाठ्यक्रम",
    excerpt: "HSSC CET 2026 ka topic-wise syllabus — Haryana GK, reasoning, maths, English, Hindi aur computer — aur kaunsa topic pehle padhna hai.",
    content: `**HSSC CET** (Common Eligibility Test) Haryana ki zyadatar Group C aur Group D bharti ka pehla padav hai. Haryana Staff Selection Commission ne 2026 mein Advt. No. 05/2026 (Group D) aur Advt. No. 06/2026 (Group C) ke through CET-based bharti nikali hai. Exact syllabus hamesha ${OFFICIAL} ke *Exam Syllabus* section se match karo.

## CET syllabus ek nazar mein

| Section | Kya aata hai |
|---|---|
| Haryana GK | itihaas, geography, districts, nadiyan, sanskriti, economy, polity |
| General awareness | Indian history, geography, polity, general science, current affairs |
| Reasoning | series, analogy, coding-decoding, blood relations, direction, venn diagram |
| Maths | percentage, average, ratio, profit-loss, time-work, simplification |
| English | grammar, vocabulary, comprehension, error spotting |
| Hindi | vyakaran, shabd-gyan, muhavare, apathit gadyansh |
| Computer | basics, MS Office, internet, hardware-software |

Section-wise questions aur marks ka distribution har advertisement mein alag ho sakta hai — **official notification me dekhein**.

## Haryana GK — sabse scoring section

- **Itihaas:** Indus-Saraswati sabhyata (Rakhigarhi, Banawali), Mahabharat kaal ka Kurukshetra, Panipat ki teen ladaiyan, 1857 mein Haryana, 1966 mein Haryana ka gathan.
- **Geography:** 22 districts, Ghaggar, Yamuna, Markanda, Saraswati, Aravalli, Shivalik, jalvayu.
- **Sanskriti:** lok-nritya, saang, mele aur tyohar, khel aur khiladi.
- **Economy aur polity:** kheti, udyog, Gurugram-Faridabad-Panipat, vidhan sabha aur prashasan.

Haryana GK ke important topics ka poora plan: [Haryana GK kaise padhein](/blog/haryana-gk-important-topics-district-wise-history-rivers).

## Pehle kya padhein

1. Haryana GK (sabse zyada overlap Police, Patwari, Clerk sab me).
2. Maths aur reasoning ke basics — roz 1 ghanta.
3. English aur Hindi grammar ke rules.
4. Computer aur current affairs last 6 mahine.

${MOCK_CTA}`,
    faqs: [
      { q: "HSSC CET ka syllabus kahan se download karein?", a: "Official syllabus hssc.gov.in ke Exam Syllabus section me milta hai. Advertisement number ke hisaab se syllabus check karein." },
      { q: "CET me Haryana GK kitna important hai?", a: "Haryana GK Group C aur D dono ke liye important hai aur Police, Patwari aur Clerk jaisi posts me bhi kaam aata hai. Isse pehle padhna chahiye." },
      { q: "Kya CET ka paper Hindi me hota hai?", a: "Paper Hindi aur English dono me aata hai (notification me confirm karein). Hamare saare mock tests bhi dono languages me hain." },
    ],
  },
  {
    slug: "hssc-cet-exam-pattern-2026-marks-negative-marking-time",
    site: "hr",
    publish: true,
    category: "EXAM_PATTERN",
    exams: [],
    seoTitle: "HSSC CET Exam Pattern 2026: Marks, Time, Negative Marking",
    seoDescription: "HSSC CET 2026 exam pattern: sections, number of questions, time, marking scheme and normalisation — and how to confirm each figure on the official notice.",
    title: "HSSC CET Exam Pattern 2026: Sections, Marks, Time and Marking Scheme",
    titleHi: "HSSC CET परीक्षा पैटर्न 2026: सेक्शन, अंक, समय और मार्किंग स्कीम",
    excerpt: "HSSC CET 2026 ka exam pattern — objective paper, sections, time aur marking scheme — aur kaunsi figures official notice se confirm karni hain.",
    content: `HSSC CET ek **objective (MCQ)** computer-based/OMR-style paper hai jiska score Haryana ki zyadatar Group C aur D posts ke liye eligibility aur merit ka base banta hai. Pattern har advertisement ke saath thoda badal sakta hai, isliye yeh post tumhe batati hai ki **kya dekhna hai**, aur numbers ke liye ${OFFICIAL} ka advertisement PDF final hai.

## Pattern me yeh cheezein confirm karo

| Point | Kahan milega |
|---|---|
| Kul questions aur kul marks | Advertisement ka *Scheme of Examination* |
| Section-wise distribution | Same PDF / syllabus PDF |
| Samay (duration) | Admit card aur notification |
| Negative marking | Notification — **galat jawab ya unattempted par kya kat'ta hai, yeh advertisement se padho** |
| Language | Hindi aur English |
| Qualifying marks | Notification me category-wise |

**Dhyan do:** kuch websites negative marking ke baare me alag-alag batati hain. Jo bhi figure ho, sirf official advertisement ko maano.

## CET score ka use

CET ka score sirf eligibility nahi, **merit** mein bhi count hota hai (notification ke hisaab se). Iske baad Police jaisi posts me physical stage aur document verification hota hai. Isliye CET me achha score sabse bada fayda deta hai.

## Mock test kaise dein

- Pehle 2-3 mock **bina timer** ke karo, pattern samajhne ke liye.
- Phir full-length mock actual time me — hamare [CBT format tests](/tests) me.
- Har mock ke baad galat sawal likho aur revise karo.

${MOCK_CTA}`,
    faqs: [
      { q: "HSSC CET me negative marking hai?", a: "Marking scheme har advertisement me likhi hoti hai. Final jawab ke liye hssc.gov.in par 2026 ka advertisement PDF dekhein." },
      { q: "CET ka score kitne saal valid rehta hai?", a: "Validity advertisement/notification ke hisaab se hoti hai. Official notice me confirm karein." },
      { q: "CET ka paper kitne section ka hota hai?", a: "Section-wise distribution syllabus aur advertisement PDF me diya hota hai. Humne unka summary syllabus post me diya hai." },
    ],
  },
  {
    slug: "haryana-police-constable-syllabus-2026",
    site: "hr",
    publish: true,
    category: "SYLLABUS",
    exams: [],
    seoTitle: "Haryana Police Constable Syllabus 2026: Written Exam Topics",
    seoDescription: "Haryana Police Constable 2026 written exam syllabus: Haryana GK, general awareness, reasoning, maths, English and Hindi, plus what to study first.",
    title: "Haryana Police Constable Syllabus 2026: Written Exam Topics and Preparation",
    titleHi: "हरियाणा पुलिस कांस्टेबल सिलेबस 2026: लिखित परीक्षा के टॉपिक",
    excerpt: "Haryana Police Constable bharti ka written exam syllabus — Haryana GK, reasoning, maths, English aur Hindi — aur taiyari ka sahi order.",
    content: `Haryana Police Constable bharti HSSC ke through hoti hai (Advt. No. 01/2026 me PST notice HSSC ki site par aaya hai). Selection **written test** aur **physical stages** par based hota hai. Is post me written exam ke topics hain; exact syllabus ke liye ${OFFICIAL} dekho.

## Written exam ke topics

- **Haryana GK:** itihaas, geography, districts, sanskriti, khel, current affairs.
- **General awareness:** Indian polity, history, geography, general science.
- **Reasoning:** series, analogy, coding-decoding, blood relation, direction sense.
- **Maths:** percentage, ratio, average, profit-loss, time-work-distance.
- **English / Hindi:** grammar aur vocabulary basics.

## Taiyari ka order

1. **Haryana GK** — sabse zyada overlap aur sabse jaldi score.
2. **Reasoning aur maths** — roz practice, formula copy me likho.
3. **Running** — physical stage ke liye written ke saath saath chalao.
4. **Mock tests** — har hafte 2 full mocks.

Haryana Police ke physical aur pattern ki details: [Police exam pattern aur PST/PET](/blog/haryana-police-constable-exam-pattern-pst-pet).

${MOCK_CTA}`,
    faqs: [
      { q: "Haryana Police constable me kya written exam hota hai?", a: "Haan. Physical stage ke saath written objective exam hota hai. Exact stages aur marks notification me dekhein." },
      { q: "Kya Police me CET ka score lagta hai?", a: "Kai posts me CET score ya HSSC ki written test lagti hai. Advertisement me exact process likha hota hai." },
      { q: "Haryana GK kaha se padhein?", a: "Hamara Haryana GK page aur free mock test shuruaat ke liye accha hai." },
    ],
  },
  {
    slug: "haryana-police-constable-exam-pattern-pst-pet",
    site: "hr",
    publish: true,
    category: "EXAM_PATTERN",
    exams: [],
    seoTitle: "Haryana Police Constable Exam Pattern: PST, PET and Written",
    seoDescription: "Haryana Police Constable selection stages: PST, PET and written test — what each stage checks and what to confirm on the HSSC notice.",
    title: "Haryana Police Constable Exam Pattern: PST, PET and Written Test Explained",
    titleHi: "हरियाणा पुलिस कांस्टेबल परीक्षा पैटर्न: PST, PET और लिखित परीक्षा",
    excerpt: "Haryana Police Constable selection ke stages — PST, PET aur written — kya check hota hai aur kaunse numbers notification se confirm karne hain.",
    content: `Haryana Police Constable ki selection kai stage me hoti hai. HSSC ne PST ke liye absentee candidates ka public notice bhi nikala hai (Advt. Nos. 13/2024, 01/2026 aur 06/2026), jisse pata chalta hai ki **PST** written ke baad ya saath chalta hai. Dates aur cutoffs ke liye ${OFFICIAL} hi final hai.

## Stages

| Stage | Kya hota hai |
|---|---|
| Written test | objective MCQ — Haryana GK, reasoning, maths, awareness |
| PST (Physical Screening Test) | height, chest (male) ka maap; qualifying |
| PET (Physical Efficiency Test) | running aur dusre events; qualifying/scored — notification dekho |
| Document verification | certificates, domicile, category |
| Medical | fitness |

**Confirm karo (notification me):** height/chest standards, running ka time, events ki list, qualifying marks aur final merit ka formula.

## Physical ki taiyari

- Haftay me 5 din running, dheere-dheere speed badhao.
- Long jump aur shot put ki practice, agar notification me ho.
- Diet aur neend — chot se bacho.

Written ka syllabus: [Haryana Police syllabus](/blog/haryana-police-constable-syllabus-2026).

${MOCK_CTA}`,
    faqs: [
      { q: "PST aur PET me kya fark hai?", a: "PST me height aur chest jaise physical maap check hote hain. PET me running jaise physical efficiency events hote hain." },
      { q: "Kya Police me physical qualifying hota hai?", a: "Yeh notification par depend karta hai. Advertisement me physical ke marks aur qualifying rule dekhein." },
    ],
  },
  {
    slug: "hssc-cet-previous-year-cutoff-category-wise",
    site: "hr",
    publish: true,
    category: "CUTOFF",
    exams: [],
    seoTitle: "HSSC CET Cutoff: How to Check Previous Year Category-wise",
    seoDescription: "How to find HSSC CET previous year cutoff marks category-wise, how cutoff is decided, and how to set your target score for 2026.",
    title: "HSSC CET Previous Year Cutoff: Category-wise Marks and How to Read Them",
    titleHi: "HSSC CET पिछले साल का कट ऑफ: कैटेगरी-वाइज़",
    excerpt: "HSSC CET ka pichhla cutoff kahan milega, cutoff kaise decide hota hai, aur 2026 ke liye apna target score kaise set karein.",
    content: `HSSC CET ka cutoff **post, category aur vacancies** par depend karta hai. Isliye ek single "cutoff" nahi hota — har post group ka alag hota hai. Official results aur cutoff ${OFFICIAL} ke *Results* section me aate hain. Is post me hum cutoff **kaise padhna** hai, yeh batate hain.

## Cutoff kya decide karta hai

- Kul vacancies aur category-wise reservation.
- Kitne candidates ne paper diya aur paper kitna tough tha.
- Normalisation (agar lagu ho — notification dekho).

## Cutoff kaise dekhein

1. hssc.gov.in par pichhle result/final merit notice kholo.
2. Apni post ka category-wise last selected candidate ka score dekho.
3. Do-teen saal ka trend compare karo.

## Target kaise set karein

Pichhle cutoff se **10-15% upar** ka target rakho. Roz mock do aur apna average dekho. [Free mock](${FREE_MOCK}) se shuru karo.

## Kya na karein

Telegram ya YouTube par bina source ke cutoff mat maano. Sirf official notice ya final result PDF.

${MOCK_CTA}`,
    faqs: [
      { q: "CET ka cutoff kahan milta hai?", a: "Official result aur final merit notice hssc.gov.in par aate hain. Wahan se category-wise score dekh sakte hain." },
      { q: "Kya cutoff har saal same rehta hai?", a: "Nahi. Yeh vacancies, difficulty aur candidates ki sankhya par badalta hai." },
    ],
  },
  {
    slug: "haryana-police-constable-cutoff-previous-year",
    site: "hr",
    publish: true,
    category: "CUTOFF",
    exams: [],
    seoTitle: "Haryana Police Constable Cutoff: Previous Year and How to Plan",
    seoDescription: "Haryana Police Constable cutoff: where to find the official previous year cutoff, how it differs by category, and how to set a safe target score.",
    title: "Haryana Police Constable Cutoff: Previous Year Marks and How to Plan Your Score",
    titleHi: "हरियाणा पुलिस कांस्टेबल कट ऑफ: पिछले साल के अंक",
    excerpt: "Haryana Police Constable ka pichhla cutoff kahan dekhein, category ka fark kya hai, aur safe target score kaise banayein.",
    content: `Haryana Police Constable ka cutoff **GD (male), female GD aur GRP** jaisi categories aur reservation ke hisaab se alag hota hai. Sahi aur final marks sirf ${OFFICIAL} ke result notice me milte hain.

## Cutoff ko kya affect karta hai

- Total posts aur har category ki seats.
- Written test ki difficulty.
- Physical stage me kitne candidates qualify hue.

## Planning

1. Pichhle result me **last selected** candidate ke marks dekho.
2. Us se 10-15% upar target banao.
3. Haryana GK me 80%+ lao — yahi sabse jaldi badhne wala section hai.

## Written + physical dono

Written me achha score hone par bhi physical qualify karna zaroori hai. Dono ko saath prepare karo.

Selection stages: [Police exam pattern](/blog/haryana-police-constable-exam-pattern-pst-pet).

${MOCK_CTA}`,
    faqs: [
      { q: "Haryana Police constable ka cutoff kitna jata hai?", a: "Yeh category aur saal par depend karta hai. Official result notice me exact marks milte hain." },
      { q: "Kya physical ke bina selection ho sakta hai?", a: "Nahi. Written ke saath physical stages qualify karne padte hain, notification ke hisaab se." },
    ],
  },
  {
    slug: "hssc-cet-preparation-strategy-60-day-plan",
    site: "hr",
    publish: true,
    category: "STRATEGY",
    exams: [],
    seoTitle: "HSSC CET Preparation: 60-Day Study Plan and Strategy",
    seoDescription: "A 60-day HSSC CET study plan: Haryana GK first, daily maths and reasoning, weekly mock tests and revision, in simple Hinglish.",
    title: "HSSC CET Kaise Padhein: 60-Day Study Plan and Preparation Strategy",
    titleHi: "HSSC CET की तैयारी कैसे करें: 60 दिन का प्लान",
    excerpt: "HSSC CET ke liye 60 din ka plan — Haryana GK pehle, roz maths aur reasoning, aur hafte ke mock tests.",
    content: `Agar tumhare paas **60 din** hain, to yeh plan follow karo. Syllabus pehle ${OFFICIAL} se check kar lo: [CET syllabus](/blog/hssc-cet-syllabus-2026-group-c-d-topic-wise).

## Din 1-20: base banao

- Haryana GK: itihaas, geography, districts, nadiyan.
- Maths aur reasoning ke basics — roz 1.5 ghanta.
- English aur Hindi grammar ke rules.

## Din 21-40: practice

- Topic-wise sectional tests.
- Current affairs ke pichhle 6 mahine.
- Computer basics aur MS Office.

## Din 41-60: mocks aur revision

- Har 2 din me ek full mock, actual time me.
- Galat sawal ki copy banao aur revise karo.
- Weak topic par extra time.

## Rozana routine

| Samay | Kaam |
|---|---|
| Subah | Haryana GK / current affairs |
| Dopahar | Maths aur reasoning |
| Shaam | English/Hindi + mock analysis |

## Common galtiyan

Sirf padhna aur mock na dena; bina analysis ke mock; Haryana GK ko last me chhodna.

${MOCK_CTA}`,
    faqs: [
      { q: "CET ke liye kitna time chahiye?", a: "Basics clear hon to 60-90 din kaafi hote hain. Roz 4-5 ghante regular padhai karein." },
      { q: "Pehle kaun sa subject padhein?", a: "Haryana GK, kyunki isme overlap sabse zyada hai aur jaldi score badhta hai." },
    ],
  },
  {
    slug: "haryana-gk-important-topics-district-wise-history-rivers",
    site: "hr",
    publish: true,
    category: "STRATEGY",
    exams: [],
    seoTitle: "Haryana GK Important Topics: Districts, History, Rivers",
    seoDescription: "Haryana GK important topics for CET, Police and Patwari: 22 districts, history, rivers, culture, economy and polity, with what to revise first.",
    title: "Haryana GK Important Topics for CET, Police and Patwari: Districts, History, Rivers",
    titleHi: "हरियाणा GK के महत्वपूर्ण टॉपिक: जिले, इतिहास, नदियाँ",
    excerpt: "Haryana GK ke important topics — 22 districts, itihaas, nadiyan, sanskriti aur economy — jo CET, Police aur Patwari me baar-baar aate hain.",
    content: `Haryana GK **CET, Police, Patwari aur Clerk** sab me kaam aata hai. Neeche wo topics hain jinse sabse zyada sawal bante hain. Poori practice ke liye [Haryana GK page](/haryana) dekho.

## 1. Gathan aur prashasan

Haryana 1 November 1966 ko Punjab se alag hokar 17va rajya bana. Chandigarh dono ki rajdhani hai aur Punjab-Haryana High Court bhi wahin hai.

## 2. 22 districts

${hr.districts.join(", ")}.

Har district ke liye yaad rakho: mukhyalaya, famous jagah, udyog/fasal aur ek tarikhi cheez.

## 3. Itihaas

Rakhigarhi aur Banawali (Indus-Saraswati sabhyata), Kurukshetra, Panipat ki teen ladaiyan, 1857 me Haryana ka yogdan.

## 4. Geography aur nadiyan

Yamuna, Ghaggar, Markanda, Saraswati (lupt), Aravalli aur Shivalik, jalvayu aur mitti.

## 5. Sanskriti aur khel

Saang, ragini, mele aur tyohar, kushti aur Olympic khiladi.

## 6. Economy

Kheti (gehun, dhaan, sarson), Gurugram ka IT/service sector, Faridabad-Panipat ke udyog.

Facts hamesha latest official source se verify karo.

${MOCK_CTA}`,
    faqs: [
      { q: "Haryana me kitne districts hain?", a: "Is site par 22 districts ki list di gayi hai. Naye districts ya badlav ke liye official Haryana government site dekhein." },
      { q: "Haryana GK kaise yaad rakhein?", a: "District-wise notes banao, roz revise karo aur mock tests se practice karo." },
    ],
  },
];
