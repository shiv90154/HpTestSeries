import { FREE_MOCK_HREF as FREE_MOCK } from "../../src/lib/site";
import type { PostSeed } from "./types";

// Draft notification posts for the drives that were open or recent in October 2026. They are seeded as DRAFT (see
// prisma/seed-content.ts), so nothing here is public until it is published from /admin/blog. Figures come from news and
// coaching-site reports, not from the official PDFs, so every post carries the reminder: check each number
// against the notification before publishing, and update the dates if you publish after they have passed.

export const NOTIFICATION_POSTS: PostSeed[] = [
  {
    slug: "hp-tet-november-2026-notification-dates-fee-exam-pattern",
    seoTitle: "HP TET November 2026: Dates, Fee, Exam Pattern, Papers",
    seoDescription: "HP TET November 2026: apply by 3 October, exams on 22 and 29 November and 6 December. Fee, all 10 papers, the 150-question pattern and qualifying marks.",
    title: "HP TET November 2026: Application Dates, Exam Dates, Fee, Pattern & Qualifying Marks",
    titleHi: "एचपी टेट नवंबर 2026: आवेदन, परीक्षा तिथि, फीस और पैटर्न",
    excerpt: "HP TET November 2026 — online application dates, late-fee window, exam dates, all 10 papers, fee, 150-question pattern and qualifying marks in one place.",
    category: "NOTIFICATION",
    exams: ["hpbose/hp-tet"],
    content: `**HP TET (Teacher Eligibility Test)** ka November 2026 session HPBOSE, Dharamshala ne announce kar diya hai. Is post me application dates, exam dates, fee, papers aur pattern ek jagah hain.

## HP TET November 2026: key dates

| Event | Date |
|---|---|
| Online application starts | 11 September 2026 |
| Last date (without late fee) | 3 October 2026, 11:59 PM |
| Last date with late fee (₹600 extra) | 4 to 8 October 2026 |
| Correction window | 9 to 12 October 2026 |
| Exam dates | 22 November, 29 November and 6 December 2026, two shifts a day |

## Papers (categories)

HP TET me ek hi session me kai papers hote hain: **JBT, TGT Arts, TGT Non-Medical, TGT Medical, TGT Sanskrit, Hindi Language Teacher, Punjabi Language Teacher, Urdu Language Teacher** aur **Special Educator** (Pre-Primary to Class V aur Class VI to XII).

## Exam pattern

- **150 MCQs**, 1 mark each, **150 minutes**
- **No negative marking**
- Child Development & Pedagogy sab papers me common hai, baaki sections category ke hisaab se

Detailed pattern: [HP TET exam pattern](/hpbose/hp-tet/exam-pattern) aur [HP TET syllabus](/hpbose/hp-tet/syllabus).

## Fee and qualifying marks

- **Fee:** ₹1,200 for General and sub-categories; ₹700 for OBC/SC/ST/PH
- **Qualifying marks:** 60% (90 of 150) for General; 55% for SC/ST/OBC/PH

## Taiyari kaise karein

Child development aur pedagogy sabse pehle pakki karo, phir apne category ka subject aur language. Exam me kam din bache hain, isliye roz ek timed practice karo. [Free HP TET mock test](/tests/hp-tet-free-mock-1) se shuruaat karo, aur CBT ka feel lene ke liye [Free Himachal GK mock](${FREE_MOCK}) bhi try karo.

Sab TET aspirants ke liye: [HP TET mock tests](/hpbose/hp-tet).`,
    faqs: [
      { q: "HP TET November 2026 ki last date kya hai?", a: "Regular application ki last date 3 October 2026 thi; late fee ke saath 8 October tak mauka bataya gaya hai. HPBOSE ka bulletin check karein." },
      { q: "HP TET 2026 me kitne papers hain?", a: "Din categories ke papers: JBT, TGT Arts/Non-Medical/Medical, TGT Sanskrit, Hindi/Punjabi/Urdu Language Teacher aur do Special Educator papers." },
      { q: "Does HP TET have negative marking?", a: "As per the reported pattern, no. The paper has 150 MCQs of 1 mark in 150 minutes. Confirm in the HPBOSE bulletin." },
    ],
  },

  {
    slug: "hprca-recruitment-2026-all-posts-dates-vacancies",
    seoTitle: "HPRCA Recruitment 2026: All Posts, Vacancies & Dates",
    seoDescription: "HPRCA Hamirpur recruitment 2026 in one table: Patwari, JBT, TGT, JOA IT, Clerk, JE, Pharmacist, Staff Nurse and more, with dates and vacancies.",
    title: "HPRCA Recruitment 2026: All Posts, Vacancies and Application Dates (Patwari, JBT, JOA IT, Clerk & More)",
    titleHi: "एचपीआरसीए भर्ती 2026: सभी पद, रिक्तियां और तिथियां",
    excerpt: "HPRCA Hamirpur recruitment 2026 in one table — Patwari, JBT, TGT, JOA IT, Clerk, Junior Engineer, Pharmacist, Staff Nurse and more, with dates and links to preparation pages.",
    category: "NOTIFICATION",
    exams: ["hprca/joa-it", "hprca/clerk", "hprca/jbt", "hprca/tgt", "hprca/junior-engineer", "hprca/pharmacist", "hprca/staff-nurse", "hp-revenue/patwari"],
    content: `**Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur** ab Himachal ki zyadatar Class III bhartiyan karta hai. 2026 me kaafi posts nikle hain, jinki dates aur vacancies is table me ek jagah hain.

## HPRCA 2026: posts, vacancies and dates

| Post | Vacancies | Application window | Preparation |
|---|---|---|---|
| Patwari | 530 | 12 December 2025 to 16 January 2026 | [HP Patwari mock tests](/hp-revenue/patwari) |
| JBT Teacher | 600 | 16 March to 6 April 2026 | [HPRCA JBT](/hprca/jbt) |
| TGT (Arts, Non-Medical, Medical) | Arts 425, Non-Medical 49, Medical 169 | different windows | [HPRCA TGT](/hprca/tgt) |
| JOA (IT) | 234 | 27 January to 27 February 2026 | [HPRCA JOA IT](/hprca/joa-it) |
| Clerk | 40 | 14 August to 11 September 2026 | [HPRCA Clerk](/hprca/clerk) |
| Junior Engineer (Civil) | 149 | 10 April to 2 May 2026 | [HPRCA JE](/hprca/junior-engineer) |
| Pharmacy Officer (Allopathy) | 41 | 28 April to 20 May 2026 | [HPRCA Pharmacist](/hprca/pharmacist) |
| Radiographer and other health posts | see notification | 10 March to 4 April 2026 | [HPRCA Radiographer](/hprca/radiographer) |
| Assistant Staff Nurse | see notification | 30 July to 29 August 2026 | [HPRCA Staff Nurse](/hprca/staff-nurse) |
| Special Educator (Pre-Primary to V) | 108 | 4 December 2025 to 8 January 2026 | [Special Educator](/hprca/special-educator) |
| JOA (Library) | 78 | 4 December 2025 to 8 January 2026 | [JOA Library](/hprca/joa-library) |
| Steno Typist | 1 | 4 December 2025 to 8 January 2026 | [Steno Typist](/hprca/steno-typist) |

## Selection process

Zyadatar posts me **computer-based test (CBT)** hota hai, uske baad document verification. Clerk aur JOA IT jaise posts me typing skill test bhi hota hai (30 wpm English ya 25 wpm Hindi, 2026 notification ke hisaab se). Age limit aam taur par 18 se 45 saal (1 January 2026 ko), relaxation ke saath.

## Application fee

Kai posts me ₹800 total: ₹100 exam fee aur ₹700 processing fee.

## Ab kya karein

Notification ka wait kiye bina taiyari shuru karo: Himachal GK, reasoning aur maths sabme common hain. [Free Himachal GK mock test](${FREE_MOCK}) bina login ke try karo, aur apni post ka hub [exams page](/exams) se kholo.`,
    faqs: [
      { q: "HPRCA recruitment 2026 me kaun se posts aaye?", a: "Patwari, JBT, TGT, JOA IT, Clerk, Junior Engineer, Pharmacy Officer, Radiographer, Staff Nurse, Special Educator, JOA Library aur Steno Typist ke notifications 2026 me aaye hain. Table me dates dekhein." },
      { q: "HPRCA ka exam kaise hota hai?", a: "Zyadatar posts me computer-based test hota hai, uske baad document verification; Clerk/JOA jaise posts me typing skill test bhi. Post-wise notification me details hoti hain." },
    ],
  },

  {
    slug: "hppsc-recruitment-2026-open-vacancies-ado-hpas-assistant-professor",
    seoTitle: "HPPSC Recruitment 2026: ADO, HPAS, Asst Professor & More",
    seoDescription: "HPPSC Shimla recruitment 2026: Agriculture Development Officer, HPAS, Assistant Professor and Police Constable, with vacancies and last dates.",
    title: "HPPSC Recruitment 2026: ADO, HPAS, Assistant Professor, Police Constable — Vacancies and Dates",
    titleHi: "एचपीपीएससी भर्ती 2026: सभी पद और तिथियां",
    excerpt: "HPPSC Shimla recruitment 2026 — Agriculture Development Officer, HPAS, Assistant Professor, Police Constable and more, with vacancies, last dates and exam preparation links.",
    category: "NOTIFICATION",
    exams: ["hppsc/ado", "hppsc/hpas", "hppsc/assistant-professor", "hp-police/constable"],
    content: `**Himachal Pradesh Public Service Commission (HPPSC), Shimla** 2026 me kai badi bhartiyan chala raha hai. Open aur recent vacancies ek jagah:

## HPPSC 2026: posts and last dates

| Post | Vacancies | Last date | Preparation |
|---|---|---|---|
| Agriculture Development Officer (ADO) | 23 | 22 October 2026 | [HPPSC ADO](/hppsc/ado) |
| H.P. Administrative Service Combined Exam (HPAS) | 22 | 22 September 2026 (closed) | [HPAS mock tests](/hppsc/hpas) |
| Police Constable (Male and Female) | 734 | 6 August 2026 (closed) | [Police Constable](/hp-police/constable) |
| Section Officer, HPF&AS | 26 | 5 August 2026 (closed) | serving government employees only |
| Assistant Professor (22 subjects) | 369 | closed | [Assistant Professor](/hppsc/assistant-professor) |

## ADO kaise bane

ADO ke liye generally B.Sc. (Agriculture) chahiye. Selection stages aur syllabus advertisement me hote hain. Taiyari ke liye agronomy, soil science, horticulture, plant protection aur extension revise karo, saath me Himachal ki fasal aur schemes. Practice: [HPPSC ADO free mock](/tests/hppsc-ado-free-mock-1).

## Assistant Professor ka scheme (2026)

Paper I screening (100 marks, qualifying) me Himachal GK, national/international affairs, Hindi aur English; Paper II subject test (120 marks); personality test (30 marks). Merit Paper II aur personality test se bani.

## Aage ki taiyari

HPPSC ke har exam me **Himachal GK** common hai. [Free Himachal GK mock](${FREE_MOCK}) se shuru karo aur apni post ka hub [exams page](/exams) par dekho.`,
    faqs: [
      { q: "HPPSC ADO ki last date kya hai?", a: "Reports ke mutabiq 23 ADO posts ke liye last date 22 October 2026 hai. Official advertisement se confirm karein." },
      { q: "HPPSC kaun si exams conduct karta hai?", a: "HPAS combined exam, Assistant Professor, Agriculture Development Officer, Assistant Engineer, Medical Officer, Veterinary Officer, Food Safety Officer, Civil Judge aur anya Class I/II posts, aur 2026 ki Police Constable bharti bhi HPPSC ke zariye nikli." },
    ],
  },

  {
    slug: "hpas-2026-notification-22-posts-bdo-tehsildar-dto-eligibility-pattern",
    seoTitle: "HPAS 2026 Notification: 22 Posts, Eligibility, Fee, Selection",
    seoDescription: "HPPSC HPAS Combined Exam 2026: 22 posts including HPAS, BDO, Tehsildar and District Treasury Officer, with age limit, fee and selection stages.",
    title: "HPAS 2026 Notification: 22 Posts (HPAS, BDO, Tehsildar, DTO), Eligibility, Fee & Selection",
    titleHi: "एचपीएएस 2026 अधिसूचना: 22 पद, पात्रता और चयन प्रक्रिया",
    excerpt: "HPPSC H.P. Administrative Services Combined Competitive Examination 2026 — 22 posts including HPAS, BDO, Tehsildar and District Treasury Officer, with age, fee and selection stages.",
    category: "NOTIFICATION",
    exams: ["hppsc/hpas"],
    content: `**HPPSC** ne **H.P. Administrative Services Combined Competitive Examination 2026** ka notification jaari kiya hai. Is combined exam se HPAS ke saath BDO, Tehsildar aur anya allied posts bhi bhare jaate hain.

## HPAS 2026: overview

| Detail | Information |
|---|---|
| Advertisement | No. 59/8-2026 |
| Conducting body | HPPSC, Shimla |
| Total vacancies | 22 |
| Application window | 26 August to 22 September 2026 (closed) |
| Application fee | ₹600 |
| Age limit | 21 to 35 years (as on 1 January 2026), relaxation as per rules |
| Qualification | Bachelor's degree in any subject |
| Exam dates | not announced |

## Posts (vacancies)

- H.P. Administrative Services: 4
- Block Development Officer (BDO): 10
- District Controller, Food, Civil Supplies and Consumer Affairs: 1
- District Treasury Officer: 6
- Tehsildar: 1

 Posts aur numbers ko advertisement se match karein.

## Selection process

1. **Preliminary examination** (objective, screening)
2. **Main examination** (descriptive)
3. **Personality test (interview)**
4. Document verification

## Prelims ki taiyari

Prelims me General Studies aur Himachal GK ka bada weight hota hai. NCERT se basics banao, Himachal ke liye alag notes rakho aur har hafte ek timed mock do. [Free HPAS mock test](/tests/hpas-free-mock-1) se shuru karo, aur poora hub [HPAS mock tests](/hppsc/hpas) par dekho.`,
    faqs: [
      { q: "HPAS 2026 me kitni vacancies hain?", a: "Reports ke mutabiq 22 posts: HPAS 4, BDO 10, District Controller Food & Civil Supplies 1, District Treasury Officer 6 aur Tehsildar 1." },
      { q: "HPAS ke liye age limit kya hai?", a: "21 se 35 saal (1 January 2026 ko), reserved categories ko relaxation ke saath. Notification me confirm karein." },
      { q: "Do BDO and Tehsildar have a separate exam?", a: "In this notification, BDO, Tehsildar and the other allied posts are filled through the same HPAS Combined Competitive Examination, so they share the Prelims, Mains and interview." },
    ],
  },

  {
    slug: "hp-high-court-recruitment-2026-clerk-steno-process-server-388-posts",
    seoTitle: "HP High Court Recruitment 2026: 388 Posts, Clerk, Steno",
    seoDescription: "High Court of Himachal Pradesh recruitment 2026: 388 posts including Clerk, Stenographer, Process Server and Driver, with eligibility and the application window.",
    title: "HP High Court Recruitment 2026: 388 Posts — Clerk, Stenographer, Process Server, Driver & More",
    titleHi: "हिमाचल हाई कोर्ट भर्ती 2026: 388 पद",
    excerpt: "High Court of Himachal Pradesh recruitment 2026 — post-wise vacancies for Clerk, Stenographer Grade-III, Process Server, Driver, Court Manager and Peon, with eligibility and application window.",
    category: "NOTIFICATION",
    exams: ["hp-high-court/clerk", "hp-high-court/stenographer", "hp-high-court/process-server"],
    content: `**High Court of Himachal Pradesh, Shimla** ne 2026 me ek badi bharti nikali jisme Clerk, Stenographer aur Process Server jaise posts hain. Applications High Court ke apne portal par li gayi.

## HP High Court 2026: post-wise vacancies

| Post | Vacancies |
|---|---|
| Court Manager | 5 |
| Clerk | 141 |
| Stenographer Grade-III | 79 |
| Driver | 9 |
| Process Server | 65 |
| Peon / Orderly / Chowkidar / Safai Karamchari | 89 |
| **Total** | **388** |

## Application window and portal

- Online applications: **10 August to 10 September 2026**
- Portal: hphcrecruitment.in (High Court's own recruitment portal)
- A separate notification for a few Group C/D posts (Librarian, Peon, Mali, Cook-cum-Attendant) with applications from 27 September to 27 October 2026 was also reported

## Clerk: eligibility

- Bachelor's degree with basic computer knowledge
- Typing speed: 30 wpm in English and 25 wpm in Hindi, as stated in the notification

## Taiyari

Selection stages aur syllabus notification me hote hain. English, Hindi, Himachal GK, reasoning, maths aur computer ki taiyari sab clerical posts ke liye kaam aati hai. Typing practice roz karo. Practice hubs: [High Court Clerk](/hp-high-court/clerk), [Stenographer](/hp-high-court/stenographer), [Process Server](/hp-high-court/process-server). [Free Himachal GK mock](${FREE_MOCK}) se CBT ka feel lo.`,
    faqs: [
      { q: "HP High Court 2026 me kitni posts hain?", a: "Reports ke mutabiq 388 posts: Clerk 141, Stenographer Grade-III 79, Process Server 65, Peon etc. 89, Driver 9 aur Court Manager 5." },
      { q: "HP High Court recruitment HPRCA se hoti hai?", a: "Nahi, High Court apni recruitment apne portal (hphcrecruitment.in) par karta hai." },
    ],
  },

  {
    slug: "hprca-assistant-staff-nurse-recruitment-2026-eligibility-exam-pattern",
    seoTitle: "HPRCA Staff Nurse Recruitment 2026: Eligibility & Pattern",
    seoDescription: "HPRCA Assistant Staff Nurse 2026: qualification, HPNRC registration, the 120-mark CBT pattern, qualifying marks and how to prepare.",
    title: "HPRCA Assistant Staff Nurse Recruitment 2026: Eligibility, Exam Pattern, Qualifying Marks",
    titleHi: "एचपीआरसीए असिस्टेंट स्टाफ नर्स भर्ती 2026",
    excerpt: "HPRCA Assistant Staff Nurse 2026 — qualification, HPNRC registration, 120-mark CBT pattern, qualifying marks, fee and how to prepare.",
    category: "NOTIFICATION",
    exams: ["hprca/staff-nurse"],
    content: `**HPRCA, Hamirpur** ne 2026 me **Assistant Staff Nurse** ki bharti nikali hai. Vacancies ke figures alag-alag sources me alag aa rahe hain, isliye number notification se confirm karna zaroori hai.

## Overview

| Detail | Information |
|---|---|
| Conducting body | HPRCA, Hamirpur |
| Post | Assistant Staff Nurse |
| Vacancies | see notification |
| Application window | 30 July to 29 August 2026 |
| Application fee | ₹800 |

## Eligibility

- **B.Sc. Nursing or GNM** with the minimum percentage in the notification
- Valid registration with the **Himachal Pradesh Nurses Registration Council (HPNRC)** at the time of applying
- Age limit and relaxation as per the notification

## Exam pattern

- Computer-based test of **120 MCQs, 120 marks**
- Minimum qualifying marks: **45%** for General/EWS and **40%** for SC/ST/OBC
- Part A: nursing subjects. Part B: Himachal GK, current affairs, everyday science, reasoning, English and Hindi

Pattern aur syllabus ka detail: [HPRCA Staff Nurse exam pattern](/hprca/staff-nurse/exam-pattern) aur [syllabus](/hprca/staff-nurse/syllabus).

## Taiyari

Nursing textbooks chapter-wise revise karo aur Part B ke aasaan marks (Himachal GK, English, Hindi) mat chhodo. [Free Staff Nurse mock test](/tests/hprca-staff-nurse-free-mock-1) se shuruaat karo, aur poora hub [HPRCA Staff Nurse](/hprca/staff-nurse) par dekho.`,
    faqs: [
      { q: "HPRCA Staff Nurse ke liye qualification kya hai?", a: "B.Sc. Nursing ya GNM aur HPNRC me valid registration. Percentage notification me dekhein." },
      { q: "What is the pass mark for HPRCA Staff Nurse?", a: "Reported minimum qualifying marks are 45% for General/EWS and 40% for SC/ST/OBC in the 120-mark CBT." },
    ],
  },

  {
    slug: "hp-high-court-syllabus-2026-clerk-stenographer-process-server",
    seoTitle: "HP High Court Syllabus 2026: Clerk, Steno, Process Server",
    seoDescription: "HP High Court syllabus 2026 for Clerk, Stenographer and Process Server: subject-wise topics, exam pattern, post-wise differences and a 30-day preparation plan.",
    title: "HP High Court Syllabus 2026: Clerk, Stenographer & Process Server — Subject-wise Topics, Exam Pattern & Study Plan",
    titleHi: "हिमाचल हाई कोर्ट सिलेबस 2026: क्लर्क, स्टेनोग्राफर, प्रोसेस सर्वर",
    excerpt: "HP High Court syllabus 2026 for Clerk, Stenographer Grade-III and Process Server — subject-wise topics, what differs between the three posts, exam pattern and a 30-day plan.",
    category: "SYLLABUS",
    exams: ["hp-high-court/clerk", "hp-high-court/stenographer", "hp-high-court/process-server"],
    content: `**High Court of Himachal Pradesh, Shimla** ne 2026 me Clerk, Stenographer Grade-III aur Process Server jaise posts ke liye bharti nikali hai. Teeno posts ka syllabus kaafi had tak milta-julta hai, isliye ek hi guide me post-wise farak aur subject-wise topics de rahe hain.

## Teeno posts ek nazar me

| | Clerk | Stenographer Grade-III | Process Server |
|---|---|---|---|
| Vacancies (reported) | 141 | 79 | 65 |
| Written test | Haan | Haan | Notification me dekhein |
| Skill test | Typing: English 30 wpm, Hindi 25 wpm | Shorthand + typing | Notification me dekhein |
| Sabse zaroori subject | English, Hindi | English, computer | Himachal GK, reasoning |

## Exam pattern

Marks, questions ki sankhya, time aur negative marking High Court ke notification me di jaati hai. Exact numbers ke liye official notification dekhein.

| Detail | Information |
|---|---|
| Mode | Notification me dekhein |
| Total questions / marks | Notification me dekhein |
| Duration | Notification me dekhein |
| Negative marking | Notification me dekhein |
| Qualifying marks | Notification me dekhein |

## Subject-wise syllabus (usual areas)

### English
- Grammar: tenses, articles, prepositions, subject-verb agreement, voice, narration
- Vocabulary: synonyms, antonyms, one-word substitution, idioms and phrases
- Error spotting, sentence improvement, fill in the blanks
- Reading comprehension and para jumbles
- Drafting basics: letters, applications, notices (important for court work)

### Hindi
- Vyakaran: sandhi, samas, upsarg-pratyay, vilom, paryayvachi shabd
- Muhavare aur lokoktiyan, vakya shuddhi
- Apathit gadyansh (comprehension)

### General knowledge and Himachal GK
- Himachal Pradesh: history and formation of the state, districts, rivers, lakes, passes, national parks
- Fairs, festivals, temples, folk dances, Kangra and Pahari painting
- HP economy: horticulture, hydropower, tourism
- Indian polity and basic legal awareness: Constitution, courts, fundamental rights
- Current affairs of the last 6 to 12 months, national and Himachal

### Reasoning
- Series, analogy, odd one out, coding-decoding
- Blood relations, direction sense, ranking and order
- Syllogism, Venn diagrams, clock and calendar

### Maths (aptitude)
- Simplification, percentage, ratio and proportion, average
- Profit and loss, simple and compound interest, time and work
- Data interpretation basics

### Computer (Clerk and Stenographer)
- Computer fundamentals, hardware and software, input/output devices
- MS Word, Excel and PowerPoint basics, keyboard shortcuts
- Internet, email, cyber safety, file management

## Post-wise farak: kahan zyada dhyan do

- **Clerk:** English aur Hindi par sabse zyada pakad banao. Daily typing practice karo taaki skill test me speed kam na pade.
- **Stenographer Grade-III:** written paper ke saath shorthand dictation aur transcription ki speed notified level tak le jao. English accuracy aur legal vocabulary important hai.
- **Process Server:** written test hone par Himachal GK, reasoning aur basic maths ke aasaan questions aate hain. Roz GK revision aur weekly mock kaafi hai.

## 30 din ka study plan

| Din | Kya karna hai |
|---|---|
| 1 se 10 | English grammar aur Hindi vyakaran ki basics, Himachal GK ke short notes (district, river, history) |
| 11 se 20 | Reasoning aur maths ki speed practice, computer basics, har 2 din me ek sectional test |
| 21 se 27 | Har din ek full mock test, galat sawaalon ko ek error notebook me likho |
| 28 se 30 | Sirf revision, current affairs aur weak topics. Naya chapter shuru mat karo |

## Practice kaise karein

Hamare High Court practice hubs me Clerk, Stenographer aur Process Server ke liye full mock tests aur sectional tests (GK, English, Hindi, reasoning) hain. Teeno posts ka core syllabus common hai, isliye sectional tests teeno ke kaam aate hain.

- [HP High Court Clerk mock tests](/hp-high-court/clerk)
- [HP High Court Stenographer mock tests](/hp-high-court/stenographer)
- [HP High Court Process Server mock tests](/hp-high-court/process-server)
- [Free Himachal GK mock](${FREE_MOCK}) se CBT ka feel lo, bina login.

Recruitment ki puri detail: [HP High Court Recruitment 2026](/blog/hp-high-court-recruitment-2026-clerk-steno-process-server-388-posts).`,
    faqs: [
      { q: "HP High Court Clerk ka syllabus kya hai?", a: "Usual areas: English, Hindi, General Knowledge with Himachal GK, reasoning, basic maths aur computer. Exact syllabus aur marks High Court ke notification me dekhein." },
      { q: "Is the High Court syllabus the same for Clerk, Stenographer and Process Server?", a: "The core subjects overlap a lot: English, Hindi, GK and Himachal GK, reasoning and maths. Clerk and Stenographer also test computer, and Stenographer has a shorthand skill test. Check the notification for each post." },
      { q: "High Court ke exam me negative marking hai?", a: "Negative marking aur marks ka scheme notification me diya hota hai. Official notification me confirm karein." },
      { q: "Process Server ke liye kya padhna chahiye?", a: "Himachal GK, general knowledge, basic reasoning aur maths, Hindi aur English. Written test hota hai ya nahi, yeh notification me dekhein." },
    ],
  },

  {
    slug: "hpas-mock-test-free-2026-prelims-preparation-strategy",
    seoTitle: "HPAS Mock Test Free 2026: Prelims Strategy & Test Plan",
    seoDescription: "How to use free HPAS mock tests for the 2026 prelims: a weekly test plan, how to analyse mistakes, Himachal GK focus areas and a 12-week roadmap.",
    title: "HPAS Mock Test Free 2026: How to Use Mock Tests for Prelims — Weekly Plan, Analysis & Himachal GK Focus",
    titleHi: "एचपीएएस फ्री मॉक टेस्ट 2026: प्रीलिम्स के लिए रणनीति",
    excerpt: "How to use free HPAS prelims mock tests properly: a weekly test plan, how to analyse every mistake, Himachal GK focus areas and a 12-week roadmap.",
    category: "STRATEGY",
    exams: ["hppsc/hpas"],
    content: `HPAS prelims me sirf padhna kaafi nahi hota. Jo aspirants regular mock tests dete hain aur har galti ka analysis karte hain, wo usi syllabus me zyada marks laate hain. Is guide me bata rahe hain ki free mock tests ko kaise use karein.

## Mock test kyun zaroori hai

- **Time management:** 100 sawaal, limited time. Sirf mock se pata chalta hai kaunsa section kitna time leta hai.
- **Negative marking ki practice:** blind guess kab karna hai aur kab chhodna hai, yeh sirf practice se aata hai.
- **Weak areas:** section-wise score se dikhta hai ki Himachal GK, polity ya economy me kya kamzor hai.
- **CBT ka comfort:** question palette, mark for review aur Hindi-English switch ki aadat.

## Hamare HPAS prelims mock tests me kya hai

- **Free mocks (30 sawaal):** Himachal GK aur General Studies, 30 minute ka quick test, apna level check karne ke liye.
- **Full mock (100 sawaal):** General Studies prelims style me, 6 sections: Himachal GK (25), Indian History and Culture (15), Polity and Governance (20), Geography and Environment (15), Economy (15), Science and Technology (10). Section split hamara hai, official nahi.
- Har sawaal ka solution Hindi aur English dono me, aur test ke baad Himachal ke aspirants me aapka rank.

## Hafte ka test plan

| Din | Kya karna hai |
|---|---|
| Somvar se Gurubar | Roz ke topic padho (NCERT, Himachal GK notes) aur raat ko 15-20 sawaal ki practice |
| Shukrvar | Section-wise revision aur ek chhota test |
| Shanivar | Ek **full-length mock**, exam jaise time me, bina ruke |
| Ravivar | Mock ka analysis (kam se kam 2 ghante), error notebook update, agle hafte ka plan |

## Har mock ke baad analysis kaise karein

1. **Galat sawaalon ko 3 hisson me baanto:** concept pata nahi tha, bhool gaye, ya jaldbaazi me galti.
2. **Sahi lage hue guess alag likho.** Wo bhi kamzor topic hain.
3. **Error notebook banao:** sawaal, sahi jawab aur kyun, ek line me.
4. **Time check:** kaunsa section sabse zyada time le raha hai.
5. **Do hafte baad wahi galat sawaal dobara solve karo.**

## Himachal GK par focus kyun

Himachal GK HPAS prelims me alag se score dilata hai, aur yahan UPSC material kaam nahi aata. In topics ko pakka karo:

- Riyasaton ka itihas aur Himachal ka gathan (1948, 1966 ka vilay, 1971 me full statehood)
- Rivers, lakes, passes, national parks aur wildlife sanctuaries
- Fairs, festivals, temples, folk dances aur Kangra painting
- Economy: horticulture, hydropower, tourism
- Polity: Panchayati Raj, Vidhan Sabha, High Court
- Pichle 12 mahine ke HP current affairs

## 12 hafte ka roadmap

| Hafte | Focus |
|---|---|
| 1 se 4 | NCERT basics (history, polity, geography, economy, science) aur Himachal GK ke notes. Har hafte 1 sectional ya free mock |
| 5 se 8 | Revision plus current affairs. Har hafte 1 full mock, analysis ke saath |
| 9 se 11 | Har hafte 2 full mocks, weak topics ki targeted practice |
| 12 | Sirf revision, error notebook aur halka mock. Naya topic nahi |

## Aaj hi shuru karo

- [HPAS free mock test](/tests/hpas-free-mock-1): 30 minute me apna level check karo
- [HPAS mock tests aur exam detail](/hppsc/hpas)
- [Free Himachal GK mock](${FREE_MOCK}) bina login

Syllabus ke liye: [HPAS prelims syllabus](/blog/hppsc-hpas-prelims-syllabus-in-hindi).`,
    faqs: [
      { q: "HPAS prelims ke liye kitne mock test dene chahiye?", a: "Last 2 mahine me hafte me kam se kam ek full-length mock aur uska poora analysis. Quantity se zyada analysis ka asar hota hai." },
      { q: "Are the free HPAS mock tests enough?", a: "Free mocks level check ke liye achhe hain. Regular full-length practice ke liye zyada mocks aur sectional tests chahiye, taaki har section ka time aur accuracy dikhe." },
      { q: "HPAS prelims me negative marking hai?", a: "Negative marking ka scheme HPPSC ke notification me hota hai. Official notification me confirm karein." },
      { q: "Is Himachal GK asked in HPAS prelims?", a: "Yes, General Studies me Himachal ki history, geography, economy, culture aur polity se questions aate hain." },
    ],
  },

  // The five posts below were written on 2026-10-14 for the queries GSC shows converting ("syllabus", "free mock",
  // "cut off") and checked by the owner, so they carry no draft note or markers; they are still seeded as DRAFT.
  // The High Court cut-offs and the Process Server selection scheme come from the High Court's own 2022–23 merit-list
  // PDFs (hphighcourt.nic.in); pay levels, PGIMER and TET JBT figures come from news and coaching sites.
  {
    slug: "hp-high-court-process-server-syllabus-previous-papers-cut-off",
    seoTitle: "HP High Court Process Server Syllabus, Papers & Cut-off",
    seoDescription: "HP High Court Process Server syllabus, selection stages (screening MCQ, Hindi essay, English letter), previous cut-off marks, salary and a free mock test.",
    title: "HP High Court Process Server: Syllabus, Exam Pattern, Previous Papers & Cut-off Marks",
    titleHi: "हिमाचल हाई कोर्ट प्रोसेस सर्वर: सिलेबस, पैटर्न, पिछले पेपर और कट-ऑफ",
    excerpt: "Everything for HP High Court Process Server in one place — eligibility, the screening test, the Hindi essay and English letter paper, previous cut-off marks, salary and a free mock test.",
    category: "SYLLABUS",
    exams: ["hp-high-court/process-server"],
    content: `**Process Server** High Court of Himachal Pradesh aur district courts ke summons, notices aur orders logon tak pahunchata hai. 2026 ki bharti me **65 Process Server posts** nikli hain. Is post me eligibility, selection ke stages, syllabus, pichle cut-off aur taiyari ka plan ek jagah hai.

## Process Server 2026: ek nazar me

| Detail | Information |
|---|---|
| Recruiting body | High Court of Himachal Pradesh, Shimla |
| Posts (2026) | 65 |
| Qualification | 10+2 pass |
| Pay | Pay Level 1, ₹18,000 to ₹56,900 (regular posts) |
| Application window | 10 August to 10 September 2026 |
| Portal | hphcrecruitment.in |

Contract aur daily-wage par lage candidates ko pay matrix nahi, sarkar ki fixed remuneration milti hai. Notification me post ki category zaroor dekhein.

## Selection process: pichli bharti me kya hua tha

2022–23 ki District Judiciary Process Server bharti me selection **teen hisson** me hua tha (High Court ki merit lists ke mutabiq). 2026 me bhi scheme aisi hi rehne ki ummeed hai, par notification zaroor padhein:

| Stage | Kya hota hai | Marks |
|---|---|---|
| 1. Screening test | Objective MCQ paper, 1 ghanta. Isse 1:5 ke ratio me candidates aage jaate hain | 50 |
| 2. Written (main) exam | **Hindi essay (25 marks)** aur **English application/letter (15 marks)** | 40 |
| 3. Evaluation | Educational qualification aur experience | 10 |

**Final merit 50 marks me banti hai:** written exam ke 40 aur evaluation ke 10. Screening sirf shortlisting ke liye hai. Iska matlab: MCQ ki speed se aap andar aate ho, par selection Hindi essay aur English letter se hota hai.

## Process Server syllabus (screening MCQ)

Official topic-list notification me hoti hai. Is level par usual areas:

### Himachal GK
- Himachal ka itihas, riyasatein aur state ka gathan (1948, 1966, 25 January 1971)
- 12 districts, rivers, lakes, passes, dams aur national parks
- Mele, tyohar, mandir, lok nritya aur Pahari painting
- HP economy: horticulture, hydropower, tourism; current affairs

### General knowledge
- Indian polity basics: Constitution, courts, fundamental rights
- History, geography aur general science (class 10 level)
- National current affairs, pichle 6 se 12 mahine

### Reasoning aur maths
- Series, analogy, coding-decoding, direction, blood relation
- Percentage, average, ratio, profit-loss, simple interest

### Hindi aur English
- Hindi vyakaran: vilom, paryayvachi, muhavare, vakya shuddhi
- English grammar: tenses, articles, prepositions, synonyms, antonyms

## Written exam: Hindi essay aur English letter

Yahi stage final merit decide karta hai, isliye isko ignore mat karo:

- **Hindi nibandh (25 marks):** saaf handwriting, 3 hisse (bhumika, vistar, upsanhar), aur Himachal ke udaharan. Practice topics: nasha mukti, Himachal me paryatan, aapda prabandhan, digital India, mahila sashaktikaran, paryavaran sanrakshan.
- **English application / letter (15 marks):** sahi format sabse zaroori hai: sender ka address, date, receiver, subject, salutation, body, closing. Practice topics: chhutti ke liye application, court me document ke liye request, bijli ya paani ki complaint, transfer request.

Hafte me kam se kam 2 essay aur 3 letter likh kar time ke saath practice karo. Format, 30 topics aur model answers: [Process Server Hindi essay aur English letter guide](/blog/hp-high-court-process-server-hindi-essay-english-letter).

## Pichle cut-off marks (2022–23)

High Court ki category-wise merit lists se:

| Category | Screening cut-off (out of 50), 18 Dec 2022 | Written cut-off (out of 40), 7 Apr 2023 |
|---|---|---|
| General (UR) | 42 | 24.5 |
| SC | 42 | 25 |
| ST | 43 | 25 |
| OBC | 41 | 25 |
| EWS | 43 | 25.5 |
| Ortho PH | 33 | 23.5 |

**Screening ka cut-off 50 me se 41 se 43 tha**, yaani 84% ke aas-paas. Matlab objective paper me aasaan sawaal bhi galat nahi hone chahiye. Sab posts ke cut-off ek saath: [HP High Court cut-off marks](/blog/hp-high-court-cut-off-marks).

## Previous papers kahan milenge

High Court screening ke question papers aam taur par publish nahi karta. Pichle results aur merit lists highcourt.hp.gov.in ke results section me hain. Isliye exam-level practice ke liye mock tests sabse achha tareeqa hai.

## 30 din ka plan

| Din | Kya karna hai |
|---|---|
| 1 se 10 | Himachal GK notes, roz 50 MCQ; har din 1 letter |
| 11 se 20 | Reasoning aur maths ki speed, GK revision; hafte me 2 Hindi essay |
| 21 se 27 | Roz ek full mock, galtiyon ki notebook; essay aur letter time ke saath |
| 28 se 30 | Sirf revision aur current affairs |

## Free mock se shuruaat karo

- [HP High Court Process Server free full mock](/tests/hp-high-court-process-server-full-mock-1): Himachal GK, general studies, reasoning, maths, Hindi aur English, real CBT format me
- [Process Server screening mock](/tests/hp-high-court-process-server-screening-mock-1): 50 sawaal, 60 minute, bilkul 2022 ke screening test ke shape me
- [Process Server mock tests aur exam detail](/hp-high-court/process-server)
- [Free Himachal GK mock](${FREE_MOCK}) bina login

Teeno High Court posts ka syllabus: [HP High Court syllabus 2026](/blog/hp-high-court-syllabus-2026-clerk-stenographer-process-server).`,
    faqs: [
      { q: "HP High Court Process Server ke liye qualification kya hai?", a: "2026 ki reports ke mutabiq 10+2 pass. Age limit aur baaki conditions High Court ke notification me dekhein." },
      { q: "Process Server ka selection kaise hota hai?", a: "2022–23 ki bharti me pehle 50 marks ka MCQ screening test, phir 40 marks ka written exam (Hindi essay 25 + English letter 15) aur 10 marks ka evaluation. Final merit 50 marks me bani thi. 2026 ka scheme notification me confirm karein." },
      { q: "What was the Process Server screening cut-off?", a: "In the screening test of 18 December 2022 the General cut-off was 42 out of 50, and other categories were between 41 and 43 (Ortho PH 33), as per the High Court's category-wise merit list." },
      { q: "Process Server ki salary kitni hai?", a: "Regular post ke liye Pay Level 1, ₹18,000 se ₹56,900. Contract posts par sarkar ki fixed remuneration milti hai." },
      { q: "Is there a free Process Server mock test?", a: "Haan, Process Server series ka pehla full mock free hai, real CBT format me, Hindi aur English solutions ke saath." },
    ],
  },

  {
    slug: "pgimer-nursing-officer-syllabus-mock-test",
    seoTitle: "PGIMER Nursing Officer Syllabus 2026 & Free Mock Test",
    seoDescription: "PGIMER Nursing Officer syllabus 2026, exam pattern (100 MCQs, negative marking), topic-wise weightage, important topics and free mock tests with solutions.",
    title: "PGIMER Nursing Officer Syllabus 2026, Exam Pattern & Free Mock Test — Topic-wise Preparation Guide",
    titleHi: "पीजीआईएमईआर नर्सिंग ऑफिसर सिलेबस 2026 और फ्री मॉक टेस्ट",
    excerpt: "PGIMER Nursing Officer 2026 — exam pattern, subject-wise syllabus, the topics questions keep coming from, how to use the free mock tests and a 6-week plan.",
    category: "SYLLABUS",
    exams: ["pgimer/nursing-officer"],
    content: `**PGIMER, Chandigarh** ka Nursing Officer exam Himachal, Punjab aur Haryana ke nursing graduates me sabse popular central-institute exams me se ek hai. Is guide me exam pattern, subject-wise syllabus, important topics aur free mock test se taiyari ka tareeqa hai.

## Exam pattern

| Detail | Information |
|---|---|
| Conducting body | PGIMER, Chandigarh |
| Mode | Computer-based test (CBT) |
| Questions | 100 MCQs |
| Marks | 100 (1 mark per question) |
| Duration | 100 minutes |
| Negative marking | 0.25 per wrong answer |
| Medium | English |
| Interview | Nahi; CBT merit ke baad document verification |

Negative marking hone ki wajah se blind guess nuksaan karta hai. Do options tak pahunch jao, tabhi attempt karo.

## Eligibility (usual)

- **B.Sc. Nursing**, ya GNM diploma ke saath notification me di gayi experience
- State Nursing Council me registration
- Age limit aur category relaxation notification ke hisaab se

## Subject-wise syllabus

### Fundamentals of Nursing
- Vital signs, nursing process, infection control, biomedical waste management
- Bed making, positions, catheterisation, Ryle's tube, injections
- First aid, CPR (BLS sequence), wound care

### Anatomy, Physiology aur Microbiology
- Body systems: cardiovascular, respiratory, renal, nervous, endocrine
- Normal lab values (Hb, blood sugar, electrolytes)
- Sterilisation, disinfection, common micro-organisms

### Medical-Surgical Nursing aur Pharmacology
- Diabetes, hypertension, MI, COPD, renal failure, burns, fractures
- Pre-operative and post-operative care, ICU basics, oxygen therapy
- Drug calculation, routes, antidotes, high-alert drugs (insulin, heparin, potassium chloride)

### Child Health Nursing
- Growth and development milestones, immunisation schedule
- Neonatal care, APGAR score, dehydration and ORS, IMNCI

### Obstetrics aur Midwifery
- Antenatal care, stages of labour, partograph, postpartum haemorrhage
- Family planning methods, high-risk pregnancy

### Community Health aur Mental Health Nursing
- National health programmes, levels of prevention, epidemiology basics
- Nutrition and deficiency disorders
- Psychiatric disorders, defence mechanisms, therapeutic communication

### Nursing Management aur General Knowledge
- Nursing administration, education aur research basics
- General awareness aur current affairs (kuch questions)

## Kahan se zyada sawaal aate hain

Har saal ka split notification me nahi diya jaata, par nursing exams me ye areas sabse zyada repeat hote hain: **medical-surgical nursing, fundamentals, pharmacology (drug dose aur antidotes), child health ka immunisation aur obstetrics ka labour management**. In paanch ko sabse pehle pakka karo. Clinical scenario wale questions (patient ki condition dekh kar pehla nursing action kya hoga) ki practice alag se karo.

## Previous year questions ka kya karein

PGIMER apne Nursing Officer papers officially publish nahi karta, isliye "previous year paper" ke naam par milne wale PDFs aksar memory-based hote hain. Unse **topic trend** samjho, par exact sawaal yaad karne me time mat lagao. Exam-level practice ke liye timed mock tests behtar hain.

## Free mock test kaise use karein

1. **Pehle [free PGIMER Nursing Officer mock](/tests/pgimer-nursing-officer-free-mock-1) do**, bina taiyari ke, apna starting level dekhne ke liye.
2. **Phir [free full-length mock](/tests/pgimer-nursing-officer-full-mock-1)** do: 100 sawaal, 100 minute, negative marking ke saath, exam jaisa.
3. Har galat sawaal ka solution padho aur topic ka naam ek notebook me likho.
4. Do hafte baad wahi topics dobara revise karke agla mock do.

Hamare full mocks 5 sections me hain: fundamentals aur anatomy-physiology, med-surg aur pharmacology, child health aur midwifery, community aur mental health aur management, aur general knowledge. Section split hamara hai, official nahi.

## 6 hafte ka plan

| Hafta | Focus |
|---|---|
| 1 | Fundamentals aur anatomy-physiology; free mock se level check |
| 2 | Medical-surgical nursing (system-wise) |
| 3 | Pharmacology aur critical care; ek full mock |
| 4 | Child health aur obstetrics; ek full mock |
| 5 | Community, mental health, management; hafte me 2 full mocks |
| 6 | Sirf revision, error notebook aur mocks |

## Shuru karo

- [PGIMER Nursing Officer free mock](/tests/pgimer-nursing-officer-free-mock-1)
- [PGIMER Nursing Officer mock tests aur exam detail](/pgimer/nursing-officer)
- [PGIMER Nursing Officer syllabus page](/pgimer/nursing-officer/syllabus)

Himachal ki nursing bharti ke liye: [HPRCA Staff Nurse recruitment 2026](/blog/hprca-assistant-staff-nurse-recruitment-2026-eligibility-exam-pattern).`,
    faqs: [
      { q: "PGIMER Nursing Officer exam me kitne questions hote hain?", a: "Reports ke mutabiq 100 MCQs, 100 marks, 100 minute ka CBT. Latest notification me confirm karein." },
      { q: "Is there negative marking in the PGIMER Nursing Officer exam?", a: "Coaching-site reports mention 0.25 marks deducted per wrong answer. Check the official PGIMER notification." },
      { q: "PGIMER Nursing Officer ka free mock test kahan milega?", a: "Is site par PGIMER Nursing Officer ka ek short free mock aur ek free full-length mock hai, Hindi aur English solutions ke saath, bina payment." },
      { q: "PGIMER Nursing Officer me interview hota hai?", a: "Reports ke mutabiq interview nahi hota; CBT merit ke baad document verification hota hai." },
      { q: "Can GNM candidates apply for PGIMER Nursing Officer?", a: "PGIMER notifications usually allow GNM with the required experience as an alternative to B.Sc. Nursing. Check the current notification." },
    ],
  },

  {
    slug: "hp-high-court-clerk-vs-stenographer",
    seoTitle: "HP High Court Clerk vs Stenographer: Salary, Skill Test",
    seoDescription: "HP High Court Clerk or Stenographer Grade-III — which to choose? Compare salary (Level 3 vs Level 6), typing and shorthand tests, syllabus, competition and growth.",
    title: "HP High Court Clerk vs Stenographer Grade-III: Which Post Should You Choose? Salary, Skill Test & Syllabus Compared",
    titleHi: "हाई कोर्ट क्लर्क या स्टेनोग्राफर: कौन सी पोस्ट चुनें?",
    excerpt: "HP High Court Clerk or Stenographer Grade-III? A side-by-side comparison of salary, eligibility, typing vs shorthand test, syllabus, competition and promotion.",
    category: "STRATEGY",
    exams: ["hp-high-court/clerk", "hp-high-court/stenographer"],
    content: `High Court of Himachal Pradesh ki 2026 bharti me **Clerk (141 posts)** aur **Stenographer Grade-III (79 posts)** dono nikle hain. Bahut se graduates confuse hain ki kaunsa form bharein ya kis par focus karein. Is post me dono posts ka seedha comparison hai.

## Side-by-side comparison

| | Clerk | Stenographer Grade-III |
|---|---|---|
| Posts (2026) | 141 | 79 |
| Qualification | Graduation + basic computer knowledge | Graduation + shorthand aur typing |
| Pay (regular) | Level 3, ₹20,200 to ₹64,000 | Level 6, ₹25,600 to ₹81,200 |
| Skill test | Typing: English 30 wpm ya Hindi 25 wpm (Kruti Dev) | Shorthand 80 wpm + typing (English 40 / Hindi 30 wpm) |
| Selection | Screening + written + typing test + documents | Written + shorthand/typing skill test |
| Kaam | Court ki files, record, diary-dispatch, data entry | Judges aur officers ki dictation, orders aur letters type karna |
| Competition | Bahut zyada (har graduate apply kar sakta hai) | Kam (shorthand jaanne wale hi qualify karte hain) |

## Salary: Steno aage hai

Regular post par Stenographer Grade-III ka pay level (Level 6) Clerk (Level 3) se kaafi upar hai. Shuruaati basic me hi har mahine ₹5,000 se zyada ka farak hai, aur DA aur allowances usi basic par lagte hain, isliye asli farak isse bhi zyada hota hai. Contract par lage candidates ko dono posts me sarkar ki fixed remuneration milti hai, isliye notification me post ki category zaroor dekhein.

## Skill test: yahi asli farak hai

- **Clerk ka typing test** 1 se 2 mahine ki roz practice se clear ho jaata hai. Hindi typing Kruti Dev font me hoti hai, isliye usi layout par practice karo.
- **Steno ka shorthand 80 wpm** ek saal ki lagatar practice maangta hai. Agar aapko abhi shorthand nahi aati, to is bharti me steno ka form sirf "try" ke liye mat bharo. Clerk par focus karo aur shorthand agle saal ke liye seekhna shuru karo.
- Agar aapko shorthand aati hai, to **Steno me competition kam aur salary zyada** hai. Yeh post aapke liye better deal hai.

## Syllabus: 80% common

Dono ke written paper me **English, Hindi, General Knowledge with Himachal GK, reasoning aur computer** aate hain. Farak:

- **Clerk:** maths (aptitude) bhi aata hai; Hindi aur English dono me barabar pakad chahiye.
- **Steno:** English grammar aur legal vocabulary par zyada zor, kyunki dictation English me hoti hai; computer section bhi bada hota hai.

Isliye ek hi written taiyari dono ke kaam aati hai. Topic-wise syllabus: [HP High Court syllabus 2026](/blog/hp-high-court-syllabus-2026-clerk-stenographer-process-server).

## Dono form bhar sakte hain?

Agar notification alag-alag posts ke liye apply karne deta hai aur aap dono ki eligibility poori karte ho, to haan. Fee aur exam dates ka clash notification me check karein.

## Hamara suggestion

| Aapki situation | Kaunsi post |
|---|---|
| Graduate, shorthand nahi aati | **Clerk**, aur typing roz 30 minute |
| Shorthand 80 wpm ke aas-paas | **Stenographer**, zyada salary, kam competition |
| Shorthand seekh rahe ho (60 wpm tak) | Is baar Clerk, agli bharti me Steno |

## Practice

- [HP High Court Clerk free full mock](/tests/hp-high-court-clerk-full-mock-1)
- [HP High Court Stenographer free full mock](/tests/hp-high-court-stenographer-full-mock-1) (written paper ke liye; shorthand test cover nahi hota)
- [Clerk mock tests](/hp-high-court/clerk) aur [Stenographer mock tests](/hp-high-court/stenographer)

Pichle cut-off: [HP High Court cut-off marks](/blog/hp-high-court-cut-off-marks).`,
    faqs: [
      { q: "HP High Court Clerk aur Steno me salary ka kya farak hai?", a: "2026 notification ki reports ke mutabiq regular Clerk Pay Level 3 (₹20,200 se ₹64,000) aur Stenographer Grade-III Pay Level 6 (₹25,600 se ₹81,200) par hain." },
      { q: "What typing speed is needed for HP High Court Clerk?", a: "Reports of the 2026 notification give 30 wpm in English or 25 wpm in Hindi (Kruti Dev). Confirm in the notification." },
      { q: "HP High Court Steno ke liye shorthand speed kitni chahiye?", a: "Reports ke mutabiq shorthand 80 wpm aur typing English 40 / Hindi 30 wpm. Notification se confirm karein." },
      { q: "Clerk aur Steno ka syllabus same hai?", a: "Zyada tar common hai: English, Hindi, GK with Himachal GK, reasoning aur computer. Clerk me maths bhi aata hai aur Steno me shorthand ka skill test alag se hota hai." },
    ],
  },

  {
    slug: "hp-high-court-cut-off-marks",
    seoTitle: "HP High Court Cut-off Marks: Clerk, Process Server, Safe Score",
    seoDescription: "HP High Court previous cut-off marks for Clerk and Process Server (category-wise), what decides the cut-off, and a safe target score for the 2026 screening test.",
    title: "HP High Court Cut-off Marks: Previous Year Category-wise Cut-off & Safe Score for 2026",
    titleHi: "हिमाचल हाई कोर्ट कट-ऑफ मार्क्स: पिछले साल और 2026 का सेफ स्कोर",
    excerpt: "Category-wise previous cut-off marks for HP High Court Clerk and Process Server screening tests, what pushes the cut-off up or down, and a safe target score for 2026.",
    category: "CUTOFF",
    exams: ["hp-high-court/clerk", "hp-high-court/stenographer", "hp-high-court/process-server"],
    content: `High Court of Himachal Pradesh ki 2026 bharti (388 posts) ki taiyari karne wale har candidate ka ek hi sawaal hai: **kitne marks safe hain?** Is post me pichli bharti ke official cut-off, cut-off kis cheez se badalta hai, aur 2026 ke liye target score hai.

## Clerk (District Judiciary): screening cut-off, 18 December 2022

| Category | Cut-off | Top score |
|---|---|---|
| General (UR) | 68 | 86 |
| SC | 63 | 79 |
| ST | 65 | 75 |
| OBC | 63 | 79 |
| EWS | 66 | 80 |
| Ortho PH | 46 | 67 |

## Process Server (District Judiciary)

| Category | Screening (out of 50), 18 Dec 2022 | Written (out of 40), 7 Apr 2023 |
|---|---|---|
| General (UR) | 42 | 24.5 |
| SC | 42 | 25 |
| ST | 43 | 25 |
| OBC | 41 | 25 |
| EWS | 43 | 25.5 |
| Ortho PH | 33 | 23.5 |

Process Server me screening ke baad 40 marks ka written exam (Hindi essay 25 + English letter 15) aur 10 marks ka evaluation tha. Detail: [Process Server syllabus aur pattern](/blog/hp-high-court-process-server-syllabus-previous-papers-cut-off).

## Stenographer

Stenographer ka cut-off written paper ke saath shorthand aur typing skill test par bhi depend karta hai, isliye iski category-wise list High Court ke results section (highcourt.hp.gov.in) me dekhein.

## Cut-off kis cheez se upar-neeche hota hai

- **Vacancies:** 2026 me Clerk ki 141 posts hain, jo pichli bharti se zyada hain. Zyada posts ka matlab aam taur par thoda kam cut-off.
- **Applicants:** graduation-level posts (Clerk) me lakhon tak forms aate hain, isliye cut-off upar rehta hai.
- **Paper ka level:** aasaan paper me cut-off bahut upar chala jaata hai, jaise 2022 me Process Server screening ka 50 me se 42.
- **Shortlisting ratio:** screening se 1:3 ya 1:5 ke ratio me candidates aage jaate hain, isliye "pass marks" se zyada **rank** matter karti hai.

## 2026 ke liye safe score (hamara andaaza)

Yeh official nahi hai, sirf pichle cut-off par based target hai:

| Post | Safe target (General) |
|---|---|
| Clerk screening | Pichle cut-off se 5 se 7 marks upar, yaani 100 me se 72 se 75 ke aas-paas |
| Process Server screening | 50 me se 44 ya usse zyada (88%) |
| Process Server written | 40 me se 27 ya usse zyada |

Reserved categories ke liye bhi apne category cut-off se 4 se 5 marks upar ka target rakho.

## Target tak kaise pahunchein

1. **Accuracy pehle:** jab cut-off 84% tak jaata hai, to ek-ek aasaan sawaal ki galti rank gira deti hai.
2. **Himachal GK sabse zaroori:** yeh sab candidates ke liye naya hota hai, aur yahin farak banta hai.
3. **Har hafte mock:** mock ka score is table ke target se compare karo.
4. **Process Server ke liye essay aur letter:** final merit inhi se banti hai.

## Free mock se apna score check karo

- [High Court Clerk free full mock](/tests/hp-high-court-clerk-full-mock-1)
- [High Court Process Server free full mock](/tests/hp-high-court-process-server-full-mock-1)
- [High Court Stenographer free full mock](/tests/hp-high-court-stenographer-full-mock-1)
- [Free Himachal GK mock](${FREE_MOCK})

Clerk ya Steno chunne me confusion hai? Padho: [Clerk vs Stenographer](/blog/hp-high-court-clerk-vs-stenographer).`,
    faqs: [
      { q: "HP High Court Clerk ka pichla cut-off kitna tha?", a: "18 December 2022 ke District Judiciary Clerk screening test me General ka cut-off 68 tha, aur SC/OBC 63, ST 65, EWS 66, Ortho PH 46 (High Court ki category-wise merit list ke mutabiq)." },
      { q: "What was the HP High Court Process Server cut-off?", a: "Screening (18 Dec 2022, out of 50): General 42, SC 42, ST 43, OBC 41, EWS 43, Ortho PH 33. Written (7 Apr 2023, out of 40): General 24.5, Ortho PH 23.5, other categories about 25." },
      { q: "HP High Court 2026 me safe score kitna hai?", a: "Official safe score nahi hota. Pichle cut-off ke hisaab se Clerk screening me General ke liye 100 me se 72 se 75 aur Process Server screening me 50 me se 44+ ka target rakho." },
      { q: "When will the HP High Court 2026 cut-off come out?", a: "The High Court publishes category-wise merit lists with cut-off marks on highcourt.hp.gov.in after each stage of the exam." },
    ],
  },

  {
    slug: "hp-tet-jbt-syllabus-important-topics",
    seoTitle: "HP TET JBT Syllabus 2026, Passing Marks & Important Topics",
    seoDescription: "HP TET JBT syllabus 2026: 150-question pattern, section-wise topics, passing marks, the most important topics in pedagogy, Hindi, English, maths and EVS, and a free mock.",
    title: "HP TET JBT Syllabus 2026: Exam Pattern, Passing Marks, Important Topics & Free Mock Test",
    titleHi: "एचपी टेट जेबीटी सिलेबस 2026: पैटर्न, पासिंग मार्क्स और महत्वपूर्ण टॉपिक",
    excerpt: "HP TET JBT November 2026 — the 150-question pattern, section-wise syllabus, passing marks, the topics that matter most and a last-weeks plan with a free mock test.",
    category: "SYLLABUS",
    exams: ["hpbose/hp-tet"],
    content: `HP TET November 2026 ke exam **22 November se 6 December** ke beech hain, aur JBT paper sabse zyada candidates dete hain. Is post me JBT ka pattern, section-wise syllabus, passing marks, sabse important topics aur bache hue hafton ka plan hai.

## HP TET JBT exam pattern

| Section | Questions | Marks |
|---|---|---|
| Child Development & Pedagogy | 30 | 30 |
| English (language aur grammar) | 30 | 30 |
| Hindi (bhasha aur vyakaran) | 30 | 30 |
| Mathematics | 30 | 30 |
| EVS, Social Science aur General Awareness (Himachal sahit) | 30 | 30 |
| **Total** | **150** | **150** |

- **Time:** 150 minute
- **Negative marking:** nahi
- **Medium:** Hindi aur English

Negative marking nahi hai, isliye **koi bhi sawaal khaali mat chhodo**.

## Passing marks

| Category | Qualifying marks |
|---|---|
| General | 60% (150 me se 90) |
| SC / ST / OBC / PH | 55% (150 me se 83) |

TET sirf eligibility test hai: pass hone par aap JBT teacher bharti ke liye eligible hote ho. Puri detail: [HP TET qualifying marks](/blog/hp-tet-qualifying-marks-exam-pattern).

## Section-wise syllabus aur important topics

### 1. Child Development & Pedagogy (sabse scoring)
- Growth aur development ke principles, heredity aur environment
- **Piaget** (cognitive development ki 4 stages), **Vygotsky** (ZPD, scaffolding), **Kohlberg** (moral development)
- Learning theories: Thorndike, Pavlov, Skinner; motivation
- Intelligence (Gardner ki multiple intelligences), individual differences
- Inclusive education, learning disabilities (dyslexia, dysgraphia, dyscalculia)
- Assessment: CCE, formative aur summative, NCF 2005, RTE Act 2009, NEP 2020

### 2. English
- Unseen passage aur poem
- Grammar: parts of speech, tenses, articles, voice, narration
- Synonyms, antonyms, one-word substitution
- Language pedagogy: LSRW skills, remedial teaching, language acquisition

### 3. Hindi
- Apathit gadyansh aur padyansh
- Sandhi, samas, upsarg-pratyay, ling, vachan, kaal
- Paryayvachi, vilom, muhavare, lokoktiyan
- Bhasha shikshan: bhasha kaushal, mulyankan, upcharatmak shikshan

### 4. Mathematics
- Number system, LCM-HCF, fractions, decimals
- Percentage, ratio, profit-loss, simple interest, time and work
- Geometry, area aur perimeter, data handling
- **Maths pedagogy:** maths ka swaroop, teaching aids, errors aur remedial teaching

### 5. EVS, Social Science aur General Awareness
- Family, food, water, shelter, travel (class 1 se 5 EVS)
- Plants, animals, human body, environment aur pollution
- **Himachal GK:** districts, rivers, mele-tyohar, lok nritya, state symbols
- Current affairs aur EVS pedagogy (activity-based learning)

## Sabse zyada marks kahan se

1. **Pedagogy (30):** har TET paper me same pattern; 25+ laana mushkil nahi.
2. **Hindi aur English ka pedagogy part:** har language section me 8 se 10 sawaal teaching methods se aate hain.
3. **Maths:** class 5 level; formula yaad hon to time bachta hai.
4. **Himachal GK:** EVS section me aasaan marks.

Target: pedagogy 25, Hindi 24, English 20, maths 20, EVS 20 = **109**, jo qualifying 90 se kaafi upar hai.

## Bache hue hafton ka plan

| Hafta | Kya karna hai |
|---|---|
| Aaj se 1 hafta | Pedagogy ke saare theorists aur NCF/RTE; roz ek sectional test |
| Hafta 2 | Hindi aur English grammar + pedagogy; maths ke formulas |
| Hafta 3 | Roz ek full mock (150 minute), galat sawaalon ka revision |
| Exam se 3 din pehle | Sirf revision; naya topic nahi; admit card aur centre check |

## Free mock test se practice

- [HP TET free mock](/tests/hp-tet-free-mock-1): jaldi level check
- [HP TET JBT free full mock](/tests/hp-tet-jbt-full-mock-1): 150 sawaal, 150 minute, exam jaisa
- [HP TET mock tests (JBT, TGT, Language Teacher)](/hpbose/hp-tet)
- [HP TET exam pattern](/hpbose/hp-tet/exam-pattern) aur [syllabus](/hpbose/hp-tet/syllabus)

Notification aur dates: [HP TET November 2026](/blog/hp-tet-november-2026-notification-dates-fee-exam-pattern).`,
    faqs: [
      { q: "HP TET JBT me kitne sections hote hain?", a: "Paanch sections, har ek me 30 sawaal: Child Development & Pedagogy, English, Hindi, Mathematics aur EVS/Social Science/General Awareness. Total 150 sawaal, 150 marks." },
      { q: "HP TET JBT passing marks kitne hain?", a: "General ke liye 60% (150 me se 90) aur SC/ST/OBC/PH ke liye 55%, November 2026 session ki reports ke mutabiq." },
      { q: "Is there negative marking in HP TET JBT?", a: "As per the reported pattern, no. So attempt every question. Confirm in the HPBOSE bulletin." },
      { q: "HP TET JBT ka sabse important section kaunsa hai?", a: "Child Development & Pedagogy, kyunki yeh sabse scoring hai aur Hindi, English aur maths ke andar bhi pedagogy ke sawaal aate hain." },
      { q: "Is there a free HP TET JBT mock test?", a: "Haan, HP TET ka ek free mock aur JBT series ka pehla full-length mock free hai, Hindi aur English solutions ke saath." },
    ],
  },

  // The descriptive half of the Process Server exam, which the CBT mocks cannot mark. The 25 + 15 marks come from the
  // High Court's 2023 Process Server mains merit list; the rest is format and practice material.
  {
    slug: "hp-high-court-process-server-hindi-essay-english-letter",
    seoTitle: "HP High Court Process Server Hindi Essay & English Letter",
    seoDescription: "HP High Court Process Server written exam: Hindi essay (25 marks) and English letter (15 marks) — format, 30 likely topics, a model essay, model letters and marking tips.",
    title: "HP High Court Process Server Written Exam: Hindi Essay & English Letter — Format, Topics & Model Answers",
    titleHi: "हाई कोर्ट प्रोसेस सर्वर लिखित परीक्षा: हिंदी निबंध और अंग्रेज़ी पत्र",
    excerpt: "How to write the Hindi essay (25 marks) and English application or letter (15 marks) in the HP High Court Process Server written exam — format, 30 topics, a model essay and two model letters.",
    category: "STRATEGY",
    exams: ["hp-high-court/process-server"],
    content: `HP High Court ki 2022–23 Process Server bharti me screening test ke baad ek **40 marks ka likhit paper** tha: **Hindi nibandh (25 marks)** aur **English application ya letter (15 marks)**. Final merit (50 marks) me 40 marks isi paper ke the, isliye selection asal me yahin hota hai. Is guide me format, topics, ek model nibandh aur do model letters hain.

2026 bharti ka scheme High Court ke notification me zaroor dekhein; neeche ki taiyari kisi bhi descriptive paper me kaam aayegi.

## Hindi nibandh (25 marks): format

Achha nibandh teen hisson me hota hai:

| Hissa | Kya likhna hai | Lambai |
|---|---|---|
| Bhumika | Vishay ka parichay, ek prabhavshali pankti ya tathya | 3 se 4 pankti |
| Vistar | 3 se 4 anuchchhed: kaaran, prabhav, Himachal ka udaharan, samadhan | 15 se 20 pankti |
| Upsanhar | Saar aur sujhav, sakaratmak ant | 3 se 4 pankti |

**Marks kahan milte hain:** vishay par tikna, saaf aur shuddh Hindi, anuchchhed me baant kar likhna, aur Himachal ya court se jude udaharan. Vartani ki galtiyan (jaise "न्यायधीश" ki jagah "न्यायाधीश") marks kaat'ti hain.

## 20 sambhavit nibandh vishay

1. Nasha mukt Himachal
2. Himachal me paryatan: avsar aur chunautiyan
3. Aapda prabandhan aur Himachal (bhooskhalan, baadal phatna)
4. Digital India aur gaon
5. Mahila sashaktikaran
6. Paryavaran sanrakshan aur jalvayu parivartan
7. Berozgari: kaaran aur samadhan
8. Swachh Bharat Abhiyan
9. Sadak suraksha
10. Shiksha ka mahatva
11. Bhrashtachar: ek samajik samasya
12. Kanoon ka shasan aur nyaypalika ka mahatva
13. Mobile phone: vardaan ya abhishaap
14. Himachal ki bagwani aur seb udyog
15. Jal sankat aur jal sanrakshan
16. Yuvaon me khel ka mahatva
17. Vriksharopan
18. Matdan ka adhikar aur kartavya
19. Cyber apradh se suraksha
20. Lok adalat: sasta aur sulabh nyay

## Model nibandh: "Lok adalat: sasta aur sulabh nyay"

> **Bhumika:** "Nyay me deri, nyay se inkaar hai." Adalaton me lambit mukadmon ka bojh kam karne aur aam aadmi ko jaldi nyay dilane ke liye Bharat me lok adalat ki vyavastha ki gayi hai.
>
> **Lok adalat kya hai:** Lok adalat Vidhik Seva Pradhikaran Adhiniyam, 1987 ke antargat lagti hai. Isme dono paksh aapsi samjhaute se vivad sulajhate hain. Iska faisla adalat ki decree ki tarah maanya hota hai aur iske viruddh apeel nahi hoti.
>
> **Labh:** isme koi court fee nahi lagti, aur agar pehle se jama ho to wapas mil jaati hai. Bijli-paani ke bill, bank karz, motor durghatna claim aur parivarik vivad jaise maamle ek hi din me nipat jaate hain. Garib aur gaon ke logon ke liye yeh sabse aasaan raasta hai.
>
> **Himachal me:** Himachal Pradesh Rajya Vidhik Seva Pradhikaran samay-samay par rashtriya lok adalat lagata hai, jisme hazaron maamle ek din me nipataye jaate hain. Door-daraz ke pahadi ilakon ke logon ka samay aur paisa dono bachta hai.
>
> **Chunautiyan:** kai log iske baare me jaante nahi, aur gambhir aapradhik maamle isme nahi sune ja sakte.
>
> **Upsanhar:** lok adalat "sabke liye nyay" ke sankalp ko saakar karti hai. Iske prati jagrukta badhane ki zaroorat hai, taaki har nagrik jaldi aur saste nyay ka laabh utha sake.

Practice ke waqt aise hi 250 se 300 shabdon me, 25 se 30 minute me nibandh likho.

## English application / letter (15 marks): format

**Formal letter ka dhaancha:**

1. Sender ka address (ya "Examination Hall" agar naam-pata likhne ki manaahi ho)
2. Date
3. Receiver: designation aur address (jaise The District and Sessions Judge, Shimla)
4. Subject: ek line me
5. Salutation: Sir / Madam
6. Body: 3 chhote paragraph (kaaran, detail, request)
7. Closing: Yours faithfully, naam ki jagah "ABC" (agar paper me kaha ho)

**Galtiyan jo marks kaat'ti hain:** subject line na likhna, "Yours faithfully" ki jagah "Yours lovingly", ek hi lamba paragraph, aur apna asli naam likhna jab manaahi ho.

## 10 sambhavit letter / application topics

1. Application to the District Judge for three days' casual leave
2. Request for a certified copy of a court order
3. Complaint to the Executive Engineer about irregular water supply
4. Letter to the SHO about a lost mobile phone
5. Application for transfer on medical grounds
6. Request to the bank manager to update your mobile number
7. Complaint to the Municipal Commissioner about garbage in your ward
8. Letter to the editor about the poor condition of a hill road
9. Application for a no-objection certificate (NOC) for a higher exam
10. Report to the court that a summons could not be served because the house was locked

## Model application 1: leave

> Examination Hall\\
> 15 November 2026
>
> The District and Sessions Judge,\\
> Shimla
>
> **Subject: Application for three days' casual leave**
>
> Sir,
>
> I am working as a Process Server in the Civil Court, Theog. I have to attend my sister's wedding at my native village from 20 to 22 November 2026.
>
> I request you to kindly grant me casual leave for three days, from 20 to 22 November 2026. All pending summons have been served and the record has been handed over to the Nazir.
>
> Thanking you.
>
> Yours faithfully,\\
> ABC\\
> Process Server

## Model application 2: summons not served

> Examination Hall\\
> 15 November 2026
>
> The Civil Judge (Junior Division),\\
> Rampur Bushahr
>
> **Subject: Report on non-service of summons in Civil Suit No. 112 of 2026**
>
> Sir,
>
> With reference to the above suit, I visited the house of the defendant, Shri XYZ, village Dansa, on 12 and 14 November 2026 to serve the summons.
>
> On both days the house was found locked. The neighbours stated that the defendant has gone to Chandigarh for treatment and is likely to return after two weeks. I affixed a copy of the summons on the outer door in the presence of two witnesses, whose names are given on the back of the summons.
>
> The summons is returned unserved for further orders.
>
> Yours faithfully,\\
> ABC\\
> Process Server

## Practice plan

- **Roz:** ek letter (10 minute) aur hafte me 2 nibandh (25 minute each)
- **Hafte me ek baar:** pura 40 marks ka paper time ke saath, phir khud check karo: format, vartani, paragraph
- **Screening ke liye saath-saath:** objective paper ki practice bhi chalu rakho

## Screening ke liye mock tests

- [Process Server screening mock](/tests/hp-high-court-process-server-screening-mock-1): 50 sawaal, 60 minute, 2022 ke screening test ke shape me
- [Process Server free full mock](/tests/hp-high-court-process-server-full-mock-1)
- [Process Server mock tests aur exam detail](/hp-high-court/process-server)

Syllabus, cut-off aur selection ki puri detail: [HP High Court Process Server guide](/blog/hp-high-court-process-server-syllabus-previous-papers-cut-off).`,
    faqs: [
      { q: "HP High Court Process Server written exam me kya aata hai?", a: "2022–23 ki bharti me 40 marks ka likhit paper tha: Hindi nibandh 25 marks aur English application ya letter 15 marks. 2026 ka scheme High Court ke notification me dekhein." },
      { q: "Process Server ke Hindi nibandh me kitne shabd likhne chahiye?", a: "Lagbhag 250 se 300 shabd, bhumika, vistar aur upsanhar me baant kar. Lambai se zyada saaf, shuddh aur vishay par tiki bhasha ke marks milte hain." },
      { q: "Which letter format should I use for the Process Server English paper?", a: "Use the formal format: sender's address (or Examination Hall), date, receiver's designation and address, subject, salutation, a short body in three paragraphs and 'Yours faithfully'." },
      { q: "Kya mock test me essay aur letter check hota hai?", a: "Nahi, online mock tests sirf objective screening paper ke liye hain. Essay aur letter ki practice is guide ke format aur topics se khud likh kar karein." },
    ],
  },

  {
    slug: "hp-patwari-syllabus-exam-pattern",
    seoTitle: "HP Patwari Syllabus 2026, Exam Pattern & Free Mock Test",
    seoDescription: "HP Patwari syllabus 2026 from HPRCA Advt. 08/2025: 120 questions in 90 minutes, 85 + 35 split, 45% qualifying marks, a 30-day study plan and a free mock test.",
    title: "HP Patwari Syllabus 2026 and Exam Pattern (HPRCA) + 30 Din ka Study Plan",
    titleHi: "एचपी पटवारी सिलेबस 2026, परीक्षा पैटर्न और 30 दिन का स्टडी प्लान",
    excerpt: "HP Patwari 2026 ka official exam pattern (120 sawaal, 90 minute), 85 + 35 sawaalon ka syllabus, qualifying marks, eligibility aur exam tak ka 30 din ka study plan, ek jagah.",
    category: "SYLLABUS",
    exams: ["hp-revenue/patwari"],
    content: `**Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur** ne Advertisement No. 08/2025 ke zariye **530 Patwari (Job Trainee) posts** nikali hain. Is post me official notification ke hisaab se exam pattern, poora syllabus, qualifying marks aur exam tak ka **30 din ka study plan** hai.

## HP Patwari 2026: ek nazar me

| Detail | Information |
|---|---|
| Recruiting body | HP Rajya Chayan Aayog (HPRCA), Hamirpur |
| Advertisement | No. 08/2025, dated 6 December 2025 |
| Post | Patwari (Job Trainee), post code 25027 |
| Department | Director, Land Records, HP Shimla |
| Vacancies | 530 (State cadre) |
| Online application | 12 December 2025 se 16 January 2026 |
| Qualification | 10+2 pass |
| Age limit | 18 se 45 saal (1 January 2025 ko) |
| Fee | ₹800 (₹100 exam fee + ₹700 processing fee), sab categories ke liye |
| Pay | ₹12,500 per month, consolidated (Job Trainee) |
| Exam | CBT ya OMR, 120 marks, 1½ ghanta |
| Official website | [hprca.hp.gov.in](https://hprca.hp.gov.in) |

**Vacancies ka category-wise break-up:** Gen (UR) 210, EWS 64, Gen (WFF) 6, SC (UR) 100, SC (BPL) 19, SC (WFF) 3, ST (UR) 19, ST (BPL) 6, OBC (UR) 81, OBC (BPL) 19, OBC (WFF) 3.

**Age relaxation:** Himachal ke SC, ST, OBC aur divyang candidates, HP sarkar ke employees aur HP ke ex-servicemen ko upper age limit me 5 saal tak ki chhoot hai.

**Ek zaroori shart:** Matric aur 10+2 Himachal ke kisi school ya institution se pass hona chahiye. Bonafide Himachali par yeh shart laagu nahi hoti.

## HP Patwari exam pattern 2026

Notification ke mutabiq screening test **120 multiple-choice questions** ka hai, har sawaal **1 mark** ka, aur samay **1½ ghanta (90 minute)**:

| Part | Kya aayega | Questions | Marks |
|---|---|---|---|
| Part 1 | Subjects, essential qualification (10+2) ke level tak | 85 | 85 |
| Part 2 | General Knowledge (Himachal GK samet), current affairs; everyday science, logical reasoning, social science, General English aur General Hindi (Matric standard) | 35 | 35 |
| **Total** | | **120** | **120** |

Pattern ki khaas baatein:

- **Har sawaal ke liye 45 second.** 120 sawaal 90 minute me, isliye speed utni hi zaroori hai jitna knowledge.
- **Negative marking:** advertisement me negative marking ka koi zikr nahi hai.
- **Exam ka mode:** Computer Based Test (CBT) ya OMR, jaisa Aayog tay kare.
- **Kai shifts me exam hua to** marks **Z-score method** se normalise honge, taaki mushkil aur aasaan shift ka farq barabar ho.
- **Answer key:** provisional key website par aati hai; objection ke liye 7 din milte hain, har challenge ki fee ₹200.

## Qualifying marks

| Category | Minimum marks | 120 me se |
|---|---|---|
| General | 45% | 54 |
| SC, ST, OBC, Wards of Freedom Fighters | 40% | 48 |

Agar itne marks laane wale candidates posts se kam hon, to Aayog qualifying marks **5% tak** ghata sakta hai (General 40%, reserved 35%). Yaad rahe, yeh sirf minimum hai. 530 posts ke liye selection merit se hoga, isliye target 54 nahi, **90+ rakho**.

**Selection:** written screening test ki merit ke baad document verification. Iske baad category-wise waiting list bhi banti hai, jo ek saal tak chalti hai.

## Part 1 (85 sawaal): 10+2 level ka syllabus

Paper ka sabse bada hissa yahi hai. Notification sirf itna kehta hai ki sawaal essential qualification, yaani **10+2 ke level tak** ke subjects se honge. Alag-alag subjects ki list nahi di gayi. Isliye taiyari 10+2 ke un subjects ki karo jo har stream ke student ke liye common hain, aur jo Patwari ke kaam se jude hain:

### Mathematics aur arithmetic
- Number system, LCM-HCF, simplification
- Percentage, ratio-proportion, average
- Profit-loss, discount, simple aur compound interest
- Time and work, time-speed-distance
- **Area aur measurement** (khet aur plot ka naap Patwari ke roz ke kaam ka hissa hai)
- Data interpretation: table aur bar graph

### General science
- Physics: motion, force, light, sound, electricity
- Chemistry: acids-bases, metals, roz ki zindagi ke chemicals
- Biology: human body, bimariyan, poshan, paryavaran

### History, geography, polity aur economy
- Bharat ka itihas: prachin, madhyakaleen aur aadhunik, swatantrata andolan
- Bharat aur vishwa ka bhugol: mitti, nadiyan, jalvayu, fasalein
- Samvidhan: maulik adhikar, kartavya, sansad, panchayati raj
- Economy: budget, bank, RBI, sarkari yojanayein

### Hindi aur English
- Hindi: sandhi, samas, vilom, paryayvachi, muhavare, lokoktiyan, vakya shuddhi
- English: tenses, articles, prepositions, voice, narration, synonyms, antonyms, one-word substitution

### Computer basics
Notification ki **desirable qualification** me "Knowledge of Computer" likha hai, aur aaj zameen ka record bhi computer par hai. Isliye MS Word, Excel, internet, email, shortcut keys aur computer ke basic parts zaroor padho.

### Himachal ke riti-riwaaz aur boliyan
Desirable qualification me "**customs, manners and dialects of Himachal Pradesh**" ki jaankari bhi maangi gayi hai. Himachal ke mele, lok nritya, boliyan (Kangri, Mandyali, Kullvi, Chambyali, Kinnauri) aur parampara is paper ke liye bhi kaam aayengi.

## Part 2 (35 sawaal): GK aur Matric level ke subjects

### Himachal GK
- Itihas: riyasatein, Praja Mandal andolan, Himachal ka gathan (15 April 1948), Punjab ke pahadi ilaakon ka vilay (1 November 1966) aur poorn rajya (25 January 1971)
- Bhugol: 12 zile, nadiyan (Satluj, Beas, Ravi, Chenab, Yamuna), jheelein, darre, bandh aur national parks
- Sanskriti: Kullu Dussehra, Mandi Shivratri, Chamba ka Minjar, Rampur ka Lavi, Nati, Pahari chitrakala aur Chamba rumal
- Economy: baagwani (seb), hydropower, tourism, state budget aur yojanayein

### General knowledge aur current affairs
- Bharat ka polity, itihas aur bhugol (basic level)
- Pichle 6 se 12 mahine ke national aur Himachal current affairs: awards, khel, appointments, yojanayein

### Matric standard ke subjects
- **Everyday science:** roz ki zindagi se jude science ke sawaal
- **Logical reasoning:** series, analogy, coding-decoding, direction, blood relation, ranking
- **Social science:** class 10 tak ka itihas, bhugol, nagrik shastra aur arthshastra
- **General English aur General Hindi:** basic grammar aur shabd-gyan

### Bonus: revenue ki shabdawali
Notification me alag se nahi likha, par Patwari ka kaam inhi par chalta hai: **jamabandi, khasra, khatauni, girdawari, intkal (mutation), shajra (naksha)**, aur zameen ki ikaiyan **bigha, biswa, kanal, marla**. Ek din in par do, sawaal aaye to seedha marks.

## 30 din ka study plan

Roz 5 se 6 ghante maan kar banaya gaya plan. Teen cheezein **roz** karni hain, chahe din ka topic kuch bhi ho:

- 30 minute current affairs (Himachal + national)
- 20 maths ke sawaal, time laga kar
- Hindi aur English ki ek-ek exercise

| Din | Kya padhna hai |
|---|---|
| 1 se 3 | Himachal ka itihas aur gathan; percentage, ratio, average; Hindi: sandhi, samas, vilom |
| 4 se 6 | Himachal ka bhugol: zile, nadiyan, darre, bandh; profit-loss, SI-CI; English: tenses, articles |
| 7 | **Pehla full mock** aur uski poori analysis: kaunsa section kamzor hai, likh lo |
| 8 se 10 | Himachal ki sanskriti, mele, chitrakala, boliyan; time-work, time-distance, area; reasoning: series, coding-decoding, direction |
| 11 se 13 | Himachal economy, budget, yojanayein; Bharat ka polity aur itihas; physics aur chemistry |
| 14 | **Doosra full mock**, galtiyon ki notebook shuru karo |
| 15 se 17 | Bharat ka bhugol aur economy; biology; reasoning: blood relation, analogy, ranking; English vocabulary |
| 18 se 20 | Computer basics; revenue terms aur zameen ki ikaiyan; Hindi muhavare aur lokoktiyan |
| 21 | **Teesra full mock** |
| 22 se 25 | Mocks me jo topics kamzor nikle unpar dobara kaam; subject-wise tests; current affairs ka revision |
| 26 se 28 | **Roz ek full mock**, phir galtiyon ki notebook se revision |
| 29 | Halka revision: Himachal GK notes, maths ke formulas, galtiyon ki notebook |
| 30 | Kuch naya nahi. Admit card, centre ka rasta aur documents check karo, aur jaldi so jao |

**Exam ke din ki strategy:** pehle round me GK, Hindi aur English ke aasaan sawaal karo (inme kam time lagta hai), phir maths aur reasoning. Jis sawaal par 1 minute se zyada lage, use **Mark for Review** karke aage badho.

## Previous year papers

Pichle Patwari papers se pata chalta hai ki Himachal GK aur Hindi ke sawaal kis level ke aate hain. HP Patwari ke **2012, 2013, 2015, 2016 aur 2019** ke papers yahan CBT format me solve karo: [HP Patwari previous year papers](/hp-revenue/patwari/previous-year-papers).

## हिंदी में: एचपी पटवारी सिलेबस 2026 एक नज़र में

- **कुल प्रश्न:** 120, हर प्रश्न 1 अंक, समय डेढ़ घंटा (90 मिनट)
- **85 प्रश्न:** 10+2 स्तर तक के विषय
- **35 प्रश्न:** सामान्य ज्ञान (हिमाचल जीके सहित), करंट अफेयर्स, सामान्य विज्ञान, तर्कशक्ति, सामाजिक विज्ञान, सामान्य अंग्रेज़ी और सामान्य हिंदी (मैट्रिक स्तर)
- **न्यूनतम अंक:** सामान्य वर्ग 45%, SC/ST/OBC 40%
- **पद:** 530, योग्यता 10+2, आयु 18 से 45 वर्ष

## Free mock se shuruaat karo

- [Free Himachal GK mock test](${FREE_MOCK}): bina login, real CBT format me, apna level abhi check karo
- [HP Patwari Full Mock Test 1](/tests/hp-patwari-full-mock-1): series ke pehle mock ka free hissa, Hindi aur English dono me
- [HP Patwari syllabus](/hp-revenue/patwari/syllabus) aur [exam pattern](/hp-revenue/patwari/exam-pattern)
- Himachal GK ki district-wise taiyari: [HP Patwari preparation strategy](/blog/hp-patwari-exam-preparation-strategy-himachal-gk)

## HP Patwari Mock Test Series

Upar wale 30 din ke plan me har hafte full mock aur aakhri hafte roz ek mock chahiye. Iske liye hamari **HP Patwari Mock Test Series** me **21 tests** hain: full-length mocks aur har subject ke alag tests (Himachal GK, GK, reasoning, maths, Hindi, English, revenue aur computer). Har sawaal ka solution Hindi aur English me, aur har test ke baad Himachal ke dusre aspirants ke beech aapki rank.

👉 [HP Patwari Mock Test Series dekho](/hp-revenue/patwari)`,
    faqs: [
      { q: "HP Patwari 2026 exam pattern kya hai?", a: "HPRCA Advertisement No. 08/2025 ke mutabiq 120 multiple-choice sawaal, har sawaal 1 mark, samay 1½ ghanta. 85 sawaal 10+2 level ke subjects se aur 35 sawaal GK (Himachal GK samet), current affairs, everyday science, reasoning, social science, English aur Hindi (Matric standard) se." },
      { q: "HP Patwari me kitne marks par qualify hote hain?", a: "Minimum 45% (120 me se 54) General ke liye aur 40% (48) SC, ST, OBC aur Wards of Freedom Fighters ke liye. Candidates kam hon to Aayog 5% tak chhoot de sakta hai. Selection merit se hota hai, isliye isse kaafi upar score chahiye." },
      { q: "Is there negative marking in the HP Patwari exam?", a: "HPRCA Advertisement No. 08/2025 does not mention negative marking. It only says the test has 120 multiple-choice questions of 1 mark each." },
      { q: "HP Patwari ke liye qualification aur age limit kya hai?", a: "10+2 pass aur 18 se 45 saal (1 January 2025 ko). Himachal ke SC, ST, OBC, divyang, HP sarkar ke employees aur ex-servicemen ko 5 saal tak ki chhoot. Matric aur 10+2 Himachal ke school se hona chahiye, Bonafide Himachali par yeh shart laagu nahi." },
      { q: "HP Patwari ki salary kitni hai?", a: "Patwari (Job Trainee) ko ₹12,500 per month consolidated milte hain, Advertisement No. 08/2025 ke mutabiq." },
      { q: "HP Patwari ki taiyari 30 din me kaise karein?", a: "Pehle 20 din Himachal GK, maths, science, social science, Hindi aur English cover karo aur har hafte ek full mock do. Aakhri 10 din roz ek mock aur galtiyon ki notebook se revision karo. Roz 30 minute current affairs zaroor padho." },
    ],
  },
];
