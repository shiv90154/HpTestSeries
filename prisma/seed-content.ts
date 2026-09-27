// Starter SEO content: exam hub copy (description, syllabus outline, FAQs) and draft blog posts.
//
// Exam copy is PUBLIC as soon as it is seeded, so it sticks to facts that don't change between
// notifications. Numbers that do change (posts, marks, dates, cutoffs) belong in the exam
// pattern (fill it from /admin/exams) or in blog posts, which are seeded as DRAFTS with
// [VERIFY] markers — check each against the official notification before publishing.
//
// Seeding never overwrites: exam fields are filled only when empty, posts are created only if
// the slug doesn't exist. Edits made in the admin panel are safe on re-seed.

import type { PrismaClient } from "../src/generated/prisma/client";

type Faq = { q: string; a: string };
type ExamContent = { description: string; syllabus: string; faqs: Faq[] };

const FREE_MOCK = "/tests/hp-gk-free-mock-1";

const examContent: Record<string, ExamContent> = {
  "hppsc/hpas": {
    description: `The **HPAS Combined Competitive Examination** is conducted by the Himachal Pradesh Public Service Commission (HPPSC), Shimla, to recruit officers for the Himachal Pradesh Administrative Service (HPAS) and allied services such as HP Police Service, Tehsildar and other Class-I and Class-II posts. It is the most prestigious state-level exam in Himachal, and many aspirants prepare for it alongside UPSC.

Selection happens in three stages: a **Preliminary exam** (objective, screening only), a **Main exam** (descriptive) and a **Personality Test / Interview**. Marks of the prelims are not counted in the final merit — it only decides who writes the mains, so the goal is to clear the cutoff comfortably.

HPAS prelims ki taiyari me sabse bada fark **Himachal GK** banata hai. National-level General Studies (History, Polity, Geography, Economy, Science, Current Affairs) ke saath Himachal ki history, geography, economy, culture aur current affairs par bhi questions aate hain. Isliye sirf UPSC material kaafi nahi hai — HP-specific notes aur regular practice zaroori hai.

**How to prepare:** start with the NCERT basics for General Studies, build a separate notebook for Himachal GK, read HP current affairs every day, and take full-length mock tests in exam conditions every week. Our HPAS mock tests run in the same CBT-style format with a timer, question palette and Hindi-English switch, and show your rank among Himachal aspirants after every test.`,
    syllabus: `The exact syllabus is published with each HPPSC notification. The core areas are:

### Prelims — General Studies
- History of India and the Indian National Movement
- Indian and World Geography
- Indian Polity and Governance, Constitution, Panchayati Raj
- Economic and Social Development, Poverty, Demographics
- Environment, Ecology, Biodiversity and Climate Change
- General Science and Technology
- **History, Geography, Economy, Polity and Culture of Himachal Pradesh**
- Current events of state, national and international importance

### Prelims — Aptitude (CSAT)
- Comprehension and interpersonal skills
- Logical reasoning and analytical ability
- Decision making and problem solving
- General mental ability and basic numeracy (Class X level)

### Mains
Descriptive papers on English, Hindi, Essay and General Studies, as specified in the notification.`,
    faqs: [
      {
        q: "HPAS exam kaun conduct karta hai?",
        a: "HPAS Combined Competitive Examination Himachal Pradesh Public Service Commission (HPPSC), Shimla conduct karta hai.",
      },
      {
        q: "What are the stages of the HPAS exam?",
        a: "Three stages: Preliminary exam (objective, screening), Main exam (descriptive) and Personality Test. Prelims marks are not added to the final merit.",
      },
      {
        q: "Is Himachal GK important for HPAS prelims?",
        a: "Yes. Along with national General Studies, a good share of questions is on the history, geography, economy and culture of Himachal Pradesh and HP current affairs.",
      },
      {
        q: "HPAS ki taiyari kaise shuru karein?",
        a: `NCERT se GS basics banao, Himachal GK ke alag notes rakho, roz HP current affairs padho aur har hafte ek full-length mock test do. [Free Himachal GK mock](${FREE_MOCK}) se shuruaat kar sakte ho.`,
      },
    ],
  },

  "hprca/joa-it": {
    description: `**Junior Office Assistant (IT)** — popularly called **JOA IT** — is one of the most applied-for posts in Himachal Pradesh. JOA IT posts in HP government departments are now filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, which replaced the earlier HP Staff Selection Commission (HPSSC).

Selection is based on a **written objective test** followed by a **skill test** (computer / typing) as specified in the post-wise notification. The written test is where most candidates are filtered, so scoring well in it is the main goal.

JOA IT paper ki khaasiyat hai ki isme **Computer knowledge** ka weight kaafi hota hai — MS Office, internet, operating system, networking basics aur DBMS jaise topics se questions aate hain. Iske saath General Knowledge, **Himachal GK**, Reasoning, Mathematics, English aur Hindi bhi puchhe jaate hain. Jo candidates sirf GK par focus karte hain woh computer section me marks gawa dete hain.

**How to prepare:** split your time between computer fundamentals, Himachal GK and aptitude (reasoning + maths). Revise MS Word/Excel shortcuts and functions, practise typing regularly for the skill test, and take sectional tests for your weak areas. Our JOA IT mock tests follow the CBT format with a timer, question palette and Hindi-English switch, and give you a rank among HP aspirants.`,
    syllabus: `The post-wise syllabus is given in the HPRCA notification. The written test usually covers:

### Computer knowledge
- Computer fundamentals, hardware and software, input/output devices
- Operating systems (Windows basics)
- MS Office — Word, Excel, PowerPoint (functions, formulas, shortcuts)
- Internet, e-mail, networking basics and cyber security
- DBMS and basic programming concepts

### General studies
- General knowledge and current affairs (India & world)
- **Himachal Pradesh GK** — history, geography, districts, culture, economy
- HP current affairs

### Aptitude & language
- Reasoning — series, coding-decoding, blood relations, puzzles
- Mathematics — percentage, ratio, profit & loss, time & work, interest
- General English and General Hindi (grammar, vocabulary, comprehension)`,
    faqs: [
      {
        q: "JOA IT recruitment ab kaun karta hai?",
        a: "JOA IT posts ab Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur ke through bhari jaati hain. Pehle yeh HPSSC karta tha.",
      },
      {
        q: "What is asked in the HPRCA JOA IT exam?",
        a: "Computer knowledge (MS Office, internet, OS, networking, DBMS), General Knowledge, Himachal GK, reasoning, mathematics, English and Hindi. Check the notification for the exact pattern.",
      },
      {
        q: "Is there a typing or skill test for JOA IT?",
        a: "Yes, a skill test is part of the selection as specified in the notification. Practise typing and basic computer operations along with the written test.",
      },
      {
        q: "JOA IT ke liye computer section kaise taiyar karein?",
        a: "MS Word/Excel ke functions aur shortcuts, OS basics, internet aur networking terms revise karo aur har topic ke sectional tests do — isi section me sabse zyada marks ka fark padta hai.",
      },
    ],
  },

  "hprca/clerk": {
    description: `**Clerk** posts in Himachal Pradesh government departments are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. It is a popular entry-level government job in the state for candidates who have passed 12th class, which is why competition is high.

Selection is made through a **written objective test** followed by a **typing / skill test**, as laid down in the notification for each post code. The written test decides the merit, while the typing test is usually qualifying.

Clerk paper me **General Knowledge, Himachal GK, Reasoning, Mathematics, English aur Hindi** — sab ka balance chahiye. Himachal GK har HP exam me common hai, isliye isko strong karna sabse zyada faydemand hai. Maths aur reasoning me speed badhane ke liye daily practice karo, aur English-Hindi grammar ke basic rules revise karte raho.

**How to prepare:** revise Himachal GK topic-wise (districts, rivers, history, fairs and festivals, economy), practise 20–30 aptitude questions daily, and start typing practice early so the skill test doesn't become a hurdle. Take full-length mock tests in the CBT format to build speed and accuracy. Our HPRCA Clerk mock tests show detailed solutions and your rank among Himachal aspirants.

Clerk ki job me office noting, record keeping aur computer par data entry ka kaam hota hai — isliye typing speed aur basic computer knowledge exam ke baad bhi kaam aati hai.`,
    syllabus: `The exact syllabus is given in the HPRCA notification for each post code. The written test generally includes:

### General studies
- General knowledge and current affairs
- **Himachal Pradesh GK** — history, geography, districts, rivers, culture, economy, polity
- HP current affairs

### Aptitude
- Reasoning — series, analogy, coding-decoding, blood relations, direction sense
- Mathematics — number system, percentage, average, ratio, profit & loss, SI/CI, time & work

### Language
- General English — grammar, vocabulary, comprehension
- General Hindi — व्याकरण, शब्दावली

### Computer basics
- Fundamentals of computers, MS Office and internet`,
    faqs: [
      {
        q: "HP Clerk exam kaun conduct karta hai?",
        a: "Himachal Pradesh me Clerk posts ki bharti Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur karta hai.",
      },
      {
        q: "Is there a typing test for HPRCA Clerk?",
        a: "Yes. After the written test, candidates take a typing / skill test as specified in the notification.",
      },
      {
        q: "Which subjects matter most in the Clerk exam?",
        a: "Himachal GK, general knowledge, reasoning and maths carry most of the paper, along with English and Hindi. Himachal GK is common to every HP exam, so it gives the best return on study time.",
      },
      {
        q: "Clerk exam ke liye free mock test kahan milega?",
        a: `Yahin! [Free Himachal GK mock test](${FREE_MOCK}) bina login ke do, aur Clerk ke full mock tests CBT format me attempt karo.`,
      },
    ],
  },

  "hp-police/constable": {
    description: `**HP Police Constable** recruitment is conducted by Himachal Pradesh Police for male and female constable posts (general duty and other cadres as notified). Every recruitment drive attracts a very large number of applicants from across the state, so preparation for both the physical and the written stages is needed.

The selection process includes **physical standards measurement (PMT)**, a **physical efficiency test (PET)** and a **written objective examination**, followed by document verification — the exact order, qualifying standards and marks are given in the notification.

Written exam me **General Knowledge, Himachal GK, Reasoning aur Numerical Ability** se questions aate hain. Kai candidates physical ki taiyari me itne busy ho jaate hain ki written test ko halke me lete hain — lekin final merit me written marks ka bada role hota hai. Isliye running ke saath roz 1–2 ghante GK aur reasoning practice zaroor karo.

**How to prepare:** build stamina for the running event months in advance, revise Himachal GK topic-wise, practise reasoning and basic maths daily, and take timed mock tests to improve speed. Our HP Police Constable mock tests are available in Hindi and English with detailed solutions and your rank among HP aspirants.

Remember that physical standards and PET events can differ for male and female candidates and for some categories and areas — always read the notification carefully before applying.`,
    syllabus: `The syllabus and marks for the written test are given in the HP Police recruitment notification. It usually covers:

### General knowledge
- Current affairs — national and international
- Indian history, geography, polity and economy (basic level)
- General science
- **Himachal Pradesh GK** — history, geography, districts, culture, economy, current affairs

### Reasoning
- Series, analogy, classification, coding-decoding
- Blood relations, direction sense, sitting arrangement

### Numerical ability
- Number system, simplification, percentage, average
- Ratio & proportion, profit & loss, time & work, time & distance

### Also check
- Physical standards (height, chest) and PET events as per the notification`,
    faqs: [
      {
        q: "HP Police constable exam pattern kya hai?",
        a: "Selection me physical measurement, physical efficiency test aur written objective exam hota hai. Written exam me GK, Himachal GK, reasoning aur numerical ability ke questions aate hain. Exact marks aur qualifying standards notification me diye hote hain.",
      },
      {
        q: "Is the HP Police written exam in Hindi?",
        a: "Candidates can generally attempt the paper in Hindi or English as per the notification. All our HP Police mock tests are available in both languages.",
      },
      {
        q: "How important is Himachal GK for HP Police constable?",
        a: "Very. Questions on Himachal history, geography, districts and current affairs appear in every paper and are among the easiest marks to secure with revision.",
      },
      {
        q: "HP Police ki taiyari physical ke saath kaise karein?",
        a: "Subah running/physical practice aur shaam ko 1–2 ghante GK + reasoning. Har hafte ek full mock test do taaki written ki speed bani rahe.",
      },
    ],
  },

  "hpbose/hp-tet": {
    description: `The **Himachal Pradesh Teacher Eligibility Test (HP TET)** is conducted by the **HP Board of School Education (HPBOSE), Dharamshala**. Passing HP TET is required to be eligible for teacher posts in Himachal Pradesh government schools. It is held for categories such as **JBT, TGT (Arts), TGT (Medical), TGT (Non-Medical), Shastri and Language Teacher**, and usually more than once a year.

HP TET is an **eligibility test**, not a recruitment exam — clearing it with the qualifying marks makes you eligible to apply for teacher posts, and the certificate validity is as notified by HPBOSE.

Har category ka paper alag hota hai, lekin **Child Development & Pedagogy** sab me common hai. Iske alawa language (Hindi, English), General Awareness aur category ke subjects — jaise TGT Arts me Social Studies, Medical me Biology/Chemistry, Non-Medical me Maths/Physics — se questions aate hain. Pedagogy me theory ke saath classroom situations par based questions bhi hote hain, isliye concepts ko examples ke saath samjho.

**How to prepare:** master child development and learning theories first, then revise your subject section from the school textbooks of the relevant classes, and practise previous-year style questions. Our HP TET mock tests run in a CBT-style interface in Hindi and English with detailed explanations.

JBT aur TGT dono ke aspirants ke liye pedagogy ke case-based questions sabse tricky hote hain — inki practice ke liye topic tests zaroor do.`,
    syllabus: `Each category has its own syllabus in the HPBOSE notification. Common areas:

### Common to all categories
- **Child Development & Pedagogy** — growth and development, learning theories (Piaget, Vygotsky, Kohlberg), inclusive education, assessment
- Language — Hindi and English
- General awareness, including Himachal GK and current affairs

### Category subjects
- **JBT:** Mathematics, Environmental Studies, languages (primary level)
- **TGT Arts:** Social Studies (history, geography, civics, economics), languages
- **TGT Medical:** Biology, Chemistry
- **TGT Non-Medical:** Mathematics, Physics, Chemistry
- **Shastri / Language Teacher:** Sanskrit / Hindi as notified`,
    faqs: [
      {
        q: "HP TET kaun conduct karta hai?",
        a: "HP TET Himachal Pradesh Board of School Education (HPBOSE), Dharamshala conduct karta hai.",
      },
      {
        q: "Which categories are there in HP TET?",
        a: "JBT, TGT (Arts), TGT (Medical), TGT (Non-Medical), Shastri and Language Teacher, as notified by HPBOSE for each session.",
      },
      {
        q: "Is Child Development & Pedagogy common to all HP TET papers?",
        a: "Yes. Child development and pedagogy is part of every category's paper, so it's the best place to start preparation.",
      },
      {
        q: "HP TET pass karne ke baad naukri milti hai?",
        a: "Nahi, HP TET ek eligibility test hai. Isse pass karke aap HP me teacher posts ke liye apply karne ke eligible ho jaate ho; recruitment alag se hoti hai.",
      },
    ],
  },

  "hp-revenue/patwari": {
    description: `**Patwari** is a key post in the Himachal Pradesh Revenue Department — the Patwari maintains land records (jamabandi, khasra girdawari), issues revenue documents and is often the first point of contact between villagers and the administration. Because it is a respected government job in one's own area, Patwari recruitment in HP sees heavy competition.

Recruitment is made through a **written objective examination** as per the notification, followed by document verification. Selected candidates also undergo Patwari training as per departmental rules.

Patwari exam me **Himachal GK sabse important** hai — HP ki history, geography, districts, rivers, culture aur economy ke saath HP current affairs. Iske alawa General Knowledge, Reasoning, Mathematics aur Hindi-English language ke questions bhi aate hain. Kyunki kaam revenue records ka hai, basic maths aur accuracy par bhi dhyan do.

**How to prepare:** make short notes for Himachal GK district by district, revise HP current affairs of the last 12 months, practise maths and reasoning daily for speed, and take full-length mock tests every week. Our HP Patwari mock tests come with detailed solutions in Hindi and English and show your rank among Himachal aspirants.

Land-record terms such as jamabandi, khasra, khatauni and girdawari are also worth learning early — they are part of a Patwari's daily work, and knowing them makes revenue-related questions easier.`,
    syllabus: `The exact syllabus is given in the Patwari recruitment notification. It generally covers:

### Himachal Pradesh GK (most important)
- History of Himachal — princely states, freedom movement, formation of the state
- Geography — districts, rivers, lakes, passes, climate, forests
- Culture — fairs, festivals, dances, temples, famous personalities
- Economy — agriculture, horticulture, hydropower, tourism
- Polity and administration, HP current affairs

### General studies
- Indian history, polity, geography and general science (basic level)
- National and international current affairs

### Aptitude
- Reasoning and mental ability
- Mathematics — percentage, ratio, average, profit & loss, area and measurement

### Language
- General Hindi and General English`,
    faqs: [
      {
        q: "HP Patwari exam me sabse important subject kaunsa hai?",
        a: "Himachal GK. HP ki history, geography, districts, culture, economy aur current affairs se sabse zyada questions aate hain.",
      },
      {
        q: "What does a Patwari do in Himachal Pradesh?",
        a: "A Patwari maintains village land records such as jamabandi and girdawari, prepares revenue documents and assists the Tehsil administration.",
      },
      {
        q: "Is the Patwari exam objective?",
        a: "Yes, the written exam is an objective (MCQ) test as per the recruitment notification.",
      },
      {
        q: "Patwari ke liye free mock test kahan se dein?",
        a: `[Free Himachal GK mock test](${FREE_MOCK}) se shuru karo — bina login, real CBT format me, Hindi aur English dono me.`,
      },
    ],
  },
};

type PostSeed = {
  slug: string;
  title: string;
  titleHi?: string;
  excerpt: string;
  category: "NOTIFICATION" | "SYLLABUS" | "EXAM_PATTERN" | "CUTOFF" | "STRATEGY" | "CURRENT_AFFAIRS";
  exams: string[]; // "body/exam"
  content: string;
  faqs?: Faq[];
};

const posts: PostSeed[] = [
  {
    slug: "hp-police-constable-bharti-2026-notification-eligibility-selection-process",
    title: "HP Police Constable Bharti 2026: Notification, Eligibility, Selection Process & Exam Pattern",
    titleHi: "एचपी पुलिस कांस्टेबल भर्ती 2026",
    excerpt:
      "HP Police Constable Bharti 2026 — eligibility, age limit, physical standards, selection process, written exam syllabus and how to prepare, in simple Hinglish.",
    category: "NOTIFICATION",
    exams: ["hp-police/constable"],
    content: `Himachal Pradesh Police har kuch saal me **Constable** ki badi bharti nikalti hai, aur har baar lakhon applications aati hain. Is post me hum HP Police Constable Bharti 2026 ki important details — eligibility, physical standards, selection process aur written exam ki taiyari — ek jagah cover kar rahe hain.

> ⚠ Yeh draft hai. **[VERIFY]** wale har point ko official notification (citizenportal.hppolice.gov.in / hppolice.gov.in) se match karke hi publish karein.

## HP Police Constable Bharti 2026 — overview

| Detail | Information |
|---|---|
| Organisation | Himachal Pradesh Police |
| Post | Constable (Male / Female) |
| Total vacancies | [VERIFY] |
| Application mode | Online |
| Apply dates | [VERIFY] |
| Official website | hppolice.gov.in [VERIFY] |

## Eligibility

- **Education:** 12th pass (10+2) from a recognised board [VERIFY]
- **Age limit:** 18 to 25 years, with relaxation for reserved categories as per rules [VERIFY]
- **Domicile / Himachali status:** as per the notification [VERIFY]
- **Language:** knowledge of Hindi in Devanagari script [VERIFY]

## Physical standards (PMT)

| Standard | Male | Female |
|---|---|---|
| Height | [VERIFY] | [VERIFY] |
| Chest (male) | [VERIFY] | — |

Height relaxation is usually given to certain categories and areas — check the notification.

## Selection process

1. **Physical measurement test (PMT)** — height and chest
2. **Physical efficiency test (PET)** — running and other events [VERIFY events and timings]
3. **Written objective exam** — GK, Himachal GK, reasoning, numerical ability
4. **Document verification** and medical

Final merit is prepared as per the notification — written exam marks play a big role, so don't ignore it while preparing for the physical.

## Written exam syllabus

- **General knowledge:** current affairs, Indian history, geography, polity, general science
- **Himachal GK:** history, districts, rivers, culture, fairs and festivals, economy, HP current affairs
- **Reasoning:** series, analogy, coding-decoding, blood relations, direction sense
- **Numerical ability:** percentage, average, ratio, profit & loss, time & work

Detailed topic list aur exam hub: [HP Police Constable mock tests](/hp-police/constable).

## How to prepare in 90 days

- **Days 1–30:** Himachal GK notes district-wise, basic maths formulas, running practice 5 days a week
- **Days 31–60:** reasoning practice daily, general science and polity revision, one sectional test every 2 days
- **Days 61–90:** one full-length mock test every 2–3 days, analyse mistakes, revise weak topics

Physical ki taiyari aur written dono saath chalao — subah ground, shaam ko padhai.

## Start practising now

[Free Himachal GK mock test](${FREE_MOCK}) bina login ke do — real CBT format, Hindi aur English dono me, aur test ke baad detailed solutions.`,
    faqs: [
      { q: "HP Police constable ke liye qualification kya hai?", a: "Generally 12th pass required hai. Exact qualification aur age limit official notification me check karein." },
      { q: "Is there a written exam in HP Police constable recruitment?", a: "Yes. After the physical tests, candidates take a written objective exam on GK, Himachal GK, reasoning and numerical ability." },
      { q: "HP Police written exam Hindi me hota hai?", a: "Candidates Hindi ya English me paper attempt kar sakte hain (notification me confirm karein). Hamare saare mock tests dono languages me hain." },
    ],
  },
  {
    slug: "hprca-joa-it-syllabus-exam-pattern",
    title: "HPRCA JOA IT Syllabus & Exam Pattern 2026 (Topic-wise, Hindi & English)",
    titleHi: "एचपीआरसीए जेओए आईटी सिलेबस और परीक्षा पैटर्न",
    excerpt:
      "Complete HPRCA JOA IT syllabus — computer, Himachal GK, reasoning, maths, English and Hindi — with the exam pattern, skill test and a study plan.",
    category: "SYLLABUS",
    exams: ["hprca/joa-it"],
    content: `**Junior Office Assistant (IT)** Himachal ki sabse popular government posts me se ek hai. Ab yeh bharti **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur** karta hai. Is post me JOA IT ka topic-wise syllabus, exam pattern aur taiyari ka plan hai.

> ⚠ Draft — **[VERIFY]** points ko latest HPRCA notification se confirm karein.

## JOA IT exam pattern

| Stage | Details |
|---|---|
| Written test | Objective (MCQ), [VERIFY] questions / marks |
| Duration | [VERIFY] |
| Negative marking | [VERIFY] |
| Skill test | Computer / typing test as per notification [VERIFY] |

## Topic-wise syllabus

### 1. Computer knowledge (most important)
- Computer fundamentals — generations, hardware, software, memory, input/output devices
- Operating system — Windows basics, file management
- **MS Word** — formatting, mail merge, tables, shortcuts
- **MS Excel** — formulas (SUM, IF, VLOOKUP, COUNTIF), charts, cell references
- **MS PowerPoint** — slides, transitions, views
- Internet, e-mail, browsers, networking (LAN/WAN, IP, protocols)
- Cyber security basics — virus, malware, firewall
- DBMS basics — tables, keys, SQL basics

### 2. Himachal GK
- History — princely states, Praja Mandal movement, formation of HP (1948, 1966, 1971)
- Geography — 12 districts, rivers, lakes, passes, climate
- Culture — fairs, festivals, dances, temples
- Economy — horticulture, hydropower, tourism, government schemes
- HP current affairs

### 3. General knowledge
- Indian history, polity, geography, economy, general science, current affairs

### 4. Reasoning
- Series, analogy, coding-decoding, blood relations, direction, syllogism, puzzles

### 5. Mathematics
- Number system, simplification, percentage, ratio, average, profit & loss, SI/CI, time & work

### 6. English & Hindi
- Grammar, vocabulary, synonyms/antonyms, comprehension; हिंदी व्याकरण

## 60-day study plan

- **Week 1–3:** Computer fundamentals + MS Office daily (1.5 hrs), Himachal GK (1 hr)
- **Week 4–6:** Reasoning + maths practice daily, networking and DBMS, GK revision
- **Week 7–8:** Full-length mock tests every alternate day + typing practice 30 min daily

Computer section me hi sabse zyada marks ka fark padta hai — isko halke me mat lo.

## Practice

JOA IT ke mock tests aur exam details: [HPRCA JOA IT mock tests](/hprca/joa-it). Shuru karne ke liye [free Himachal GK mock](${FREE_MOCK}) do.`,
    faqs: [
      { q: "JOA IT me computer ka kitna weight hota hai?", a: "Computer knowledge JOA IT paper ka ek bada hissa hota hai. Exact marks distribution notification me dekhein." },
      { q: "Is there negative marking in HPRCA JOA IT?", a: "Check the latest HPRCA notification — the marking scheme can differ between post codes." },
    ],
  },
  {
    slug: "hp-patwari-exam-preparation-strategy-himachal-gk",
    title: "HP Patwari Exam Preparation Strategy: How to Score High in Himachal GK",
    titleHi: "एचपी पटवारी परीक्षा की तैयारी कैसे करें",
    excerpt:
      "A practical study plan for the HP Patwari exam — how to cover Himachal GK district by district, maths and reasoning practice, and mock test strategy.",
    category: "STRATEGY",
    exams: ["hp-revenue/patwari"],
    content: `HP Patwari exam me selection ka sabse bada factor **Himachal GK** hai. Is post me ek practical strategy hai jo aapko kam time me zyada marks dilane me madad karegi.

## 1. Pehle exam ko samjho

Patwari ka written test objective hota hai. Isme **Himachal GK, General Knowledge, Reasoning, Maths aur Hindi-English** se questions aate hain. Latest pattern aur marks notification se confirm karein. [VERIFY]

## 2. Himachal GK — district-wise approach

Himachal GK ko topic-wise padhne ke bajaye **district-wise** padhna zyada yaad rehta hai. Har district ke liye ek page banao:

| Point | Example (Kangra) |
|---|---|
| Headquarters | Dharamshala |
| Famous temples | Jwalamukhi, Chamunda, Brajeshwari |
| Rivers / lakes | Beas, Pong Dam (Maharana Pratap Sagar) |
| Fairs | [add from your notes] |
| Famous for | Kangra painting, tea gardens |

Aise 12 pages ban gaye toh aadha Himachal GK cover ho jaata hai. Baaki topics — **history (princely states, formation of HP), economy, polity, famous personalities** — alag se padho.

## 3. HP current affairs

Pichle 12 mahine ke HP current affairs sabse zyada puchhe jaate hain: state budget, new schemes, awards, sports, appointments. Roz 20 minute do.

## 4. Maths aur reasoning — daily 30 questions

Patwari me maths ka level basic hota hai lekin speed chahiye. Percentage, ratio, average, profit-loss, area/measurement ke 15 questions aur reasoning ke 15 questions roz karo.

## 5. Mock test strategy

- Har hafte **kam se kam 2 full-length mock tests**
- Har test ke baad galat questions ki list banao aur agle din revise karo
- Time management: pehle easy questions, phir tough — CBT palette me "Mark for Review" use karo

## 6. Last 15 days

Naya kuch mat padho. Sirf notes revise karo aur har doosre din ek mock test do.

## Start today

[Free Himachal GK mock test](${FREE_MOCK}) — bina login, real CBT format me. Patwari ke saare tests: [HP Patwari mock tests](/hp-revenue/patwari).`,
    faqs: [
      { q: "Patwari ke liye Himachal GK kahan se padhein?", a: "Standard Himachal GK book ke saath district-wise notes banao aur pichle 12 mahine ke HP current affairs padho. Mock tests se revision karo." },
      { q: "How many mock tests should I take before the Patwari exam?", a: "At least two full-length mock tests a week in the last two months, with a review of every wrong answer." },
    ],
  },
  {
    slug: "hppsc-hpas-prelims-syllabus-in-hindi",
    title: "HPPSC HPAS Prelims Syllabus in Hindi & English — Complete Topic List",
    titleHi: "एचपीएएस प्रारंभिक परीक्षा पाठ्यक्रम हिंदी में",
    excerpt:
      "HPAS prelims syllabus for General Studies and CSAT in Hindi and English, with the Himachal GK topics you must cover and a preparation roadmap.",
    category: "SYLLABUS",
    exams: ["hppsc/hpas"],
    content: `HPPSC ki **HPAS Combined Competitive Examination** Himachal ki sabse prestigious exam hai. Is post me prelims ka poora syllabus Hindi aur English dono me hai.

> ⚠ Draft — paper-wise marks, number of questions aur negative marking **[VERIFY]** latest HPPSC notification se.

## HPAS prelims — overview

| Paper | Nature | Marks / Time |
|---|---|---|
| Paper I — General Studies | Counted for merit to mains | [VERIFY] |
| Paper II — Aptitude (CSAT) | Qualifying | [VERIFY] |

## Paper I — General Studies (सामान्य अध्ययन)

- **History of India and Indian National Movement** — भारत का इतिहास और राष्ट्रीय आंदोलन
- **Indian and World Geography** — भारत एवं विश्व का भूगोल
- **Indian Polity and Governance** — संविधान, पंचायती राज, लोक नीति
- **Economic and Social Development** — गरीबी, जनसांख्यिकी, सामाजिक क्षेत्र की पहल
- **Environment and Ecology** — पर्यावरण, जैव विविधता, जलवायु परिवर्तन
- **General Science** — सामान्य विज्ञान
- **Current Events** — राज्य, राष्ट्रीय और अंतरराष्ट्रीय महत्व की घटनाएं
- **Himachal Pradesh** — इतिहास, भूगोल, अर्थव्यवस्था, संस्कृति, राजव्यवस्था

## Paper II — Aptitude (CSAT)

- Comprehension — बोधगम्यता
- Interpersonal and communication skills
- Logical reasoning and analytical ability — तार्किक क्षमता
- Decision making and problem solving
- General mental ability
- Basic numeracy and data interpretation (Class X level)

## Himachal GK — must-cover topics

- Ancient tribes, princely states (riyasats) and their rulers
- Praja Mandal movement, formation of HP — 1948, 1956 (Part C state → UT), 1966 merger, statehood in 1971
- Rivers, glaciers, lakes, passes, national parks and wildlife sanctuaries
- Fairs and festivals, folk dances, temples, art (Kangra and Pahari painting)
- Economy — horticulture, hydropower, tourism, state budget and schemes
- HP current affairs of the last year

## Preparation roadmap

1. NCERT (Class 6–12) se GS foundation
2. Himachal GK ke liye ek standard book + apne short notes
3. Daily newspaper + HP current affairs
4. CSAT practice weekly — qualifying hai, lekin ignore karne se pura attempt waste ho sakta hai
5. Last 3 months: weekly full-length mock tests

HPAS mock tests aur exam details: [HPPSC HPAS mock tests](/hppsc/hpas). [Free Himachal GK mock](${FREE_MOCK}) se apna level check karo.`,
    faqs: [
      { q: "HPAS prelims me CSAT qualifying hai?", a: "Haan, Paper II (CSAT) qualifying nature ka hota hai — qualifying marks notification me diye hote hain. [VERIFY]" },
      { q: "Is Himachal GK asked in HPAS prelims?", a: "Yes, a significant part of General Studies covers the history, geography, economy and culture of Himachal Pradesh." },
    ],
  },
  {
    slug: "himachal-gk-important-questions-for-all-hp-exams",
    title: "Himachal GK Important Questions for HPRCA, HP Police, Patwari & HPAS",
    titleHi: "हिमाचल सामान्य ज्ञान के महत्वपूर्ण प्रश्न",
    excerpt:
      "Important Himachal GK questions with answers on history, geography, districts and culture — useful for every Himachal Pradesh government exam.",
    category: "STRATEGY",
    exams: ["hprca/joa-it", "hprca/clerk", "hp-police/constable", "hp-revenue/patwari", "hppsc/hpas"],
    content: `Himachal GK har HP exam ka common hissa hai — JOA IT, Clerk, Police, Patwari, HPAS, sab me. Yahan kuch **important facts** hain jo baar-baar puchhe jaate hain. Inhe revise karo, phir mock test se khud ko check karo.

> ⚠ Draft — publish se pehle har fact ek standard Himachal GK source se cross-check karein.

## Formation & history

1. **Himachal Pradesh kab bana?** — 15 April 1948 (Chief Commissioner's province). 15 April ko **Himachal Day** manaya jaata hai.
2. **Full statehood kab mila?** — 25 January 1971 (18th state of India).
3. **Punjab ke pahadi ilaake HP me kab mile?** — 1 November 1966.
4. **HP ke pehle Chief Minister?** — Dr. Yashwant Singh Parmar.
5. **Bilaspur HP me kab mila?** — 1 July 1954.

## Geography

6. **HP me kitne districts hain?** — 12.
7. **Area ke hisaab se sabse bada district?** — Lahaul-Spiti.
8. **Population ke hisaab se sabse bada district?** — Kangra.
9. **Chandra aur Bhaga milkar kaunsi nadi banti hai?** — Chenab (Chandrabhaga).
10. **Pong Dam kis nadi par hai?** — Beas.
11. **Bhakra Dam kis nadi par hai?** — Sutlej.
12. **Rohtang Pass kin do ghatiyon ko jodta hai?** — Kullu and Lahaul.

## Culture

13. **Kullu Dussehra kab shuru hota hai?** — Vijayadashami ke din se, saat din tak.
14. **Minjar mela kahan lagta hai?** — Chamba.
15. **Shivratri mela (International) kahan?** — Mandi.
16. **Kangra painting kis style ka hissa hai?** — Pahari painting.

## Quick revision table

| Topic | Fact |
|---|---|
| Capital | Shimla (Dharamshala was declared the second / winter capital in 2017) |
| State animal | Snow Leopard |
| State bird | Jujurana (Western Tragopan) |
| State flower | Pink Rhododendron |
| State tree | Deodar |

## Test yourself

In facts ko padhne ke baad [free Himachal GK mock test](${FREE_MOCK}) do — real CBT format me, detailed solutions ke saath. Exam-wise tests: [all Himachal exams](/exams).`,
  },
  {
    slug: "hp-tet-qualifying-marks-exam-pattern",
    title: "HP TET Qualifying Marks, Exam Pattern & Previous Year Cutoff",
    titleHi: "एचपी टेट क्वालिफाइंग मार्क्स और परीक्षा पैटर्न",
    excerpt:
      "HP TET qualifying marks by category, exam pattern for JBT and TGT papers, certificate validity and tips to clear the test in one attempt.",
    category: "CUTOFF",
    exams: ["hpbose/hp-tet"],
    content: `HP TET clear karne ke liye **qualifying marks** laane zaroori hain. Is post me category-wise qualifying marks, exam pattern aur taiyari ke tips hain.

> ⚠ Draft — saare numbers **[VERIFY]** latest HPBOSE notification / information bulletin se.

## HP TET exam pattern

| Detail | Information |
|---|---|
| Conducting body | HP Board of School Education (HPBOSE), Dharamshala |
| Questions | [VERIFY] MCQs |
| Total marks | [VERIFY] |
| Duration | [VERIFY] |
| Negative marking | [VERIFY] |
| Categories | JBT, TGT Arts, TGT Medical, TGT Non-Medical, Shastri, Language Teacher |

## Qualifying marks

| Category | Qualifying % |
|---|---|
| General | [VERIFY] |
| SC / ST / OBC / PwD | [VERIFY] |

HP TET ek **eligibility test** hai — qualifying marks aane par aap teacher posts ke liye apply karne ke eligible ho jaate ho.

## Section-wise focus

- **Child Development & Pedagogy:** Piaget, Vygotsky, Kohlberg ke theories; inclusive education; assessment (CCE)
- **Language:** Hindi aur English grammar, unseen passage
- **General awareness:** Himachal GK aur current affairs
- **Subject section:** category ke hisaab se school textbooks (NCERT / HPBOSE)

## Tips to clear in one attempt

1. Pedagogy ko sabse pehle strong karo — yeh har paper me common hai
2. Subject section ke liye relevant classes ki textbooks revise karo
3. Previous-year style questions practise karo
4. Last month me har hafte 2 full mock tests

HP TET mock tests: [HP TET mock tests](/hpbose/hp-tet). Shuruaat [free mock test](${FREE_MOCK}) se karo.`,
    faqs: [
      { q: "HP TET me negative marking hai?", a: "Latest HPBOSE information bulletin me check karein. [VERIFY]" },
      { q: "Can I take HP TET more than once?", a: "Yes. HP TET is held regularly and you can appear again to improve your score, as per HPBOSE rules." },
    ],
  },
];

export async function seedContent(db: PrismaClient) {
  let filled = 0;
  for (const [key, content] of Object.entries(examContent)) {
    const [bodySlug, examSlug] = key.split("/");
    const exam = await db.exam.findFirst({
      where: { slug: examSlug, body: { slug: bodySlug } },
      select: { id: true, description: true, syllabus: true, faqs: true },
    });
    if (!exam) continue;
    await db.exam.update({
      where: { id: exam.id },
      data: {
        // The old one-paragraph seed descriptions are replaced; anything edited in admin is longer and kept.
        ...((!exam.description || exam.description.length < 600) && { description: content.description }),
        ...(!exam.syllabus && { syllabus: content.syllabus }),
        ...(exam.faqs == null && { faqs: content.faqs }),
      },
    });
    filled++;
  }

  let created = 0;
  for (const p of posts) {
    const exists = await db.post.findUnique({ where: { slug: p.slug }, select: { id: true } });
    if (exists) continue;
    const examIds = [];
    for (const key of p.exams) {
      const [bodySlug, examSlug] = key.split("/");
      const e = await db.exam.findFirst({ where: { slug: examSlug, body: { slug: bodySlug } }, select: { id: true } });
      if (e) examIds.push({ id: e.id });
    }
    await db.post.create({
      data: {
        slug: p.slug,
        title: p.title,
        titleHi: p.titleHi ?? null,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        faqs: p.faqs ?? [],
        status: "DRAFT",
        exams: { connect: examIds },
      },
    });
    created++;
  }
  return { filled, created };
}
