import { pb } from "../../src/sites/pb";
import type { ExamPages } from "./types";
import { COURT_CLERK_FREE_MOCK_SLUG } from "../pb-court-clerk";

const FREE_MOCK = `/tests/${pb.freeMockSlug}`;
const COURT_CLERK_FREE_MOCK = `/tests/${COURT_CLERK_FREE_MOCK_SLUG}`;

// Punjab exams, shown on pbtestseries.in only. Facts that outlive one drive; anything dated says which drive it is from.
// The PSSSB and Punjab Police patterns match the 2026 drives as reported by several sources and as far as the official
// notices show (the full advertisements were not readable as text); each pattern note says to confirm in the advertisement.

export const PUNJAB_PAGES: ExamPages = {
  "psssb/clerk": {
    seo: {
      title: "PSSSB Clerk Mock Test {year} — Punjabi Paper, GK & Reasoning",
      description:
        "PSSSB Clerk mock tests in the real exam format: qualifying Punjabi paper, Punjab GK, reasoning, English and ICT. Start with a free Punjab GK test, no login.",
    },
    pattern: {
      sections: [
        { name: "Part A — Punjabi language (qualifying, 50% to pass)", questions: 50, marks: 50 },
        { name: "Part B — GK, Punjab history & culture, reasoning, Punjabi, English, ICT", questions: 100, marks: 100 },
      ],
      durationMin: 150,
      negativeMarking: "0.25 mark per wrong answer in Part B",
      note: "Pattern of the 2026 Clerk exam (Advt. No. 02 of 2026). Part B is checked only if you pass Part A. Confirm in the official advertisement.",
    },
    description: `**PSSSB Clerk** is the biggest clerical recruitment in Punjab. The **Subordinate Services Selection Board, Punjab** fills Clerk posts in the common cadre of many state departments, and the 2026 drive (Advertisement No. 02 of 2026) had its written exam on **11 October 2026**, followed by provisional answer keys for Sets A to D. The Clerk is a Group C post starting at **Level 2 (₹19,900)** of the Punjab pay matrix.

You need a graduation degree, Punjabi passed at matriculation level and the computer qualification the advertisement asks for. The selection has a written test and then a **typing test in Punjabi and English**, after which documents are verified.

The written test has two parts. **Part A is a qualifying Punjabi paper**: if you do not reach the minimum marks, Part B is not checked at all, so do not leave Punjabi for the last week. **Part B decides merit** and covers general knowledge and current affairs, **Punjab history and culture**, logical reasoning and mental ability, Punjabi, English and information and communication technology (ICT), with a quarter mark deducted for each wrong answer.

**How to prepare:** revise Punjab GK district by district (our [Know Your Punjab](/punjab) page is a quick start), practise Punjabi grammar every day, and take a full mock every few days with negative marking on. Begin with the free [Punjab GK mock test](${FREE_MOCK}) to see the exam interface and your starting score.`,
    syllabus: `The detailed syllabus is in the PSSSB advertisement. The usual areas are:

### Part A — Punjabi (qualifying)
- ਵਿਆਕਰਨ: ਸ਼ਬਦ ਜੋੜ, ਸ਼ਬਦ ਭੇਦ, ਲਿੰਗ, ਵਚਨ, ਵਿਰੋਧੀ ਸ਼ਬਦ, ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ
- ਮੁਹਾਵਰੇ ਅਤੇ ਅਖਾਣ, ਅਸ਼ੁੱਧ-ਸ਼ੁੱਧ ਵਾਕ
- Reading comprehension (ਪੈਰਾ ਪੜ੍ਹ ਕੇ ਪ੍ਰਸ਼ਨ)

### General knowledge & current affairs
- Indian history, polity, geography and economy
- General science and environment
- National and international current affairs, awards, sports, books

### Punjab history & culture
- Sikh Gurus, Maharaja Ranjit Singh, freedom movement in Punjab
- Geography of Punjab: rivers, regions (Majha, Doaba, Malwa), districts
- Fairs, festivals, folk dances, literature and the economy of Punjab

### Reasoning & mental ability
- Series, analogy, classification, coding-decoding
- Blood relations, directions, ranking, syllogism, puzzles

### English
- Grammar, vocabulary, synonyms and antonyms, sentence correction, comprehension

### ICT
- Computer fundamentals, MS Office, internet, e-mail and cyber safety`,
    faqs: [
      {
        q: "Is there negative marking in the PSSSB Clerk exam?",
        a: "Yes. In the 2026 Clerk exam a quarter mark (0.25) is deducted for each wrong answer in Part B. Part A, the qualifying Punjabi paper, decides only whether Part B is checked. Confirm the rule in the advertisement for your drive.",
      },
      {
        q: "What happens if I fail the Punjabi paper?",
        a: "Part A is qualifying. If you do not reach the minimum marks in it (50% in the 2026 drive), your Part B answers are not evaluated and you are out of the merit list, however well you did in GK and reasoning.",
      },
      {
        q: "Is there a typing test for PSSSB Clerk?",
        a: "Yes. Candidates shortlisted from the written test take a typing test in Punjabi and English at the speed the advertisement states. It is qualifying, so practise both scripts before the result.",
      },
      {
        q: "What is the salary of a PSSSB Clerk?",
        a: "The Clerk post starts at Level 2 of the pay matrix, ₹19,900 a month basic pay, plus allowances as per Punjab government rules.",
      },
    ],
  },


  "punjab-courts/clerk": {
    seo: {
      title: "Punjab Court Clerk Mock Test {year} — 1270 Posts, GK & English",
      description:
        "Punjab District Court Clerk mock tests in the SSSC pattern: 50 GK and 20 English questions with negative marking, solutions in English and Hindi. Free mock, no login.",
    },
    pattern: {
      sections: [
        { name: "General Knowledge (objective)", questions: 50, marks: 50 },
        { name: "English Composition (objective)", questions: 20, marks: 20 },
        { name: "English Composition (subjective, typed on screen)", questions: 4, marks: 30 },
      ],
      durationMin: 120,
      negativeMarking: "0.25 mark per wrong answer in the objective questions",
      note: "2026 notice (Advt. 37C/SSSC/PB/2026). The subjective part is an essay, a letter, a précis and a Punjabi to English translation. You need 33% in each subject and 40% overall; the subjective English is marked only if you score 33% in GK. Confirm in the official notice.",
    },
    description: `**Punjab District Court Clerk** posts are filled by the **Society for Centralized Recruitment of Staff in Subordinate Courts (SSSC)** for the district and sessions courts of Punjab, under the Punjab and Haryana High Court. The 2026 drive (Advertisement No. 37C/SSSC/PB/2026) is for **1,270 Clerk posts**, with online applications on sssc.gov.in from 7 October to **4 November 2026**. The post is at **Level 5 (₹29,200)** of the pay matrix.

You need a **BA or BSc degree**, **Punjabi passed at matriculation level** and computer proficiency; the general age limit is 18 to 37 years as on 1 January 2026, with relaxation for reserved categories of Punjab.

Selection has three steps. The **written exam** is an online CBT of 100 marks in 2 hours: **50 General Knowledge** and **20 English** objective questions with a quarter-mark negative, plus **30 marks of typed English**: an essay of about 150 words, a letter, a précis and a Punjabi to English translation. Candidates shortlisted on the written marks take a qualifying **Computer Proficiency Test**: a 10-minute spreadsheet task and English typing at 30 words per minute. The final merit list follows the written exam marks only.

**How to prepare:** GK is half the paper, so revise Indian polity, history and geography alongside **Punjab GK** (our [Know Your Punjab](/punjab) page is a quick start). Practise English grammar and vocabulary daily, and write one essay or letter a week and type it, because the subjective part is typed on screen. Take a full mock every few days with negative marking on. Start with the [free Punjab Court Clerk mock test](${COURT_CLERK_FREE_MOCK}).`,
    syllabus: `The notice gives the scheme; the topics below are what the paper usually covers.

### General Knowledge (50 marks)
- Indian history and the national movement, with Punjab's role (Ghadar, Jallianwala Bagh, Bhagat Singh)
- Indian polity: Constitution, Fundamental Rights, Parliament, judiciary and High Courts
- Indian and world geography, rivers and the geography of Punjab
- Indian economy, banking and government schemes
- General science and environment
- Punjab GK: Sikh Gurus, Maharaja Ranjit Singh, districts, rivers, culture, fairs and festivals
- Current affairs, sports, awards and books

### English Composition — objective (20 marks)
- Grammar: tenses, subject-verb agreement, articles, prepositions
- Error spotting and sentence improvement
- Active and passive voice, direct and indirect speech
- Synonyms, antonyms, one-word substitution, idioms and spellings

### English Composition — subjective (30 marks, typed)
- Essay of about 150 words (10 marks)
- Letter: official or personal (5 marks)
- Précis (5 marks)
- Translation of a Punjabi passage into English (10 marks)

### Computer Proficiency Test (qualifying)
- Spreadsheet: 10 marks in 10 minutes, at least 4 to pass
- English typing at 30 words per minute`,
    faqs: [
      {
        q: "How many posts are there in the Punjab District Court Clerk 2026 recruitment?",
        a: "The 2026 notice (Advt. No. 37C/SSSC/PB/2026) is for 1,270 Clerk posts in the district courts of Punjab. Applications are online on sssc.gov.in until 4 November 2026.",
      },
      {
        q: "Is there negative marking in the Punjab Court Clerk exam?",
        a: "Yes. A quarter mark (0.25) is deducted for each wrong answer in the objective General Knowledge and English questions. Unattempted questions carry no penalty.",
      },
      {
        q: "Is the subjective English part typed or handwritten?",
        a: "It is typed on the computer during the online exam: an essay, a letter, a précis and a Punjabi to English translation, 30 marks in all. Practise typing your answers, not just writing them.",
      },
      {
        q: "Is the typing test counted in the merit?",
        a: "No. The Computer Proficiency Test (spreadsheet and 30 wpm English typing) is qualifying. The final merit list follows the written exam marks.",
      },
      {
        q: "What is the application fee for the Punjab District Court Clerk exam?",
        a: "As per the 2026 notice, the total fee is ₹710 for SC, BC, OBC, ex-servicemen and EWS candidates of Punjab, ₹875 for persons with benchmark disabilities of Punjab, and ₹1,200 for all other categories. It is paid online and is not refundable. Confirm in the official notice on sssc.gov.in.",
      },
      {
        q: "When is the Punjab Court Clerk exam and is there a demo test?",
        a: "The notice says the exam can be held anywhere in Northern India and the dates will be published only on sssc.gov.in. A demo (mock) test link of the online exam is put on the same website 15 days before the exam. Check the site and your email, including the spam folder, regularly.",
      },
      {
        q: "Do the mock tests include the subjective English part?",
        a: "Our mocks cover the 70 objective marks with negative marking, in the exam's online format. The essay, letter, précis and translation have to be practised separately, since an online test cannot mark them.",
      },
    ],
  },
  "psssb/group-d": {
    seo: {
      title: "PSSSB Group D Mock Test {year} — Sewadar, Chowkidar & More",
      description:
        "PSSSB Group D mock tests for Sewadar, Chowkidar, Water Carrier and other posts: qualifying Punjabi paper plus GK, Punjab GK and reasoning. Free Punjab GK test.",
    },
    pattern: {
      sections: [
        { name: "Part A — Punjabi language (qualifying)", questions: 50, marks: 50 },
        { name: "Part B — GK, Punjab GK, reasoning, maths, English", questions: 100, marks: 100 },
      ],
      durationMin: 150,
      negativeMarking: "0.25 mark per wrong answer in Part B",
      note: "OMR-based written test as reported for the 2026 drive (Advt. No. 04 of 2026). Confirm the exact sections in the official advertisement.",
    },
    description: `**PSSSB Group D** recruitment fills posts such as **Sewadar, Chowkidar, Safai Sewak, Mali, Water Carrier, Cattle Attendant** and other attendant posts in Punjab government departments and Deputy Commissioner offices. The 2026 drive (**Advertisement No. 04 of 2026**) grew to **2,098 posts**, 739 of them for women, after a corrigendum in September 2026, and its written exam was held on **25 October 2026**.

The biggest blocks of posts in that drive were Sewadar in the Excise and Taxation Department (452), and Water Carrier-cum-Sweeper (409) and Sweeper-cum-Attendant (350) in the Animal Husbandry Department; the rest are spread across districts such as Rupnagar, Sangrur, Moga, Gurdaspur, Fatehgarh Sahib and SAS Nagar. Posts are reserved category-wise for General, SC, BC, EWS, ex-servicemen, sportspersons and persons with disabilities.

The written test is an **OMR paper**. A **qualifying Punjabi section** comes first; only candidates who pass it are ranked on the main section of general knowledge, Punjab GK, reasoning, basic maths and English. Wrong answers in the main section cost marks, so attempt only what you are reasonably sure of.

**How to prepare:** the questions are at a basic level, so speed and accuracy decide the merit. Revise Punjab GK (start with [Know Your Punjab](/punjab)), practise Punjabi grammar daily, and take timed tests. The free [Punjab GK mock test](${FREE_MOCK}) is a good first check.`,
    syllabus: `PSSSB publishes the syllabus with the advertisement. The usual areas for Group D are:

### Punjabi (qualifying)
- ਗੁਰਮੁਖੀ ਲਿਪੀ, ਸ਼ਬਦ ਜੋੜ, ਵਿਆਕਰਨ ਦੇ ਮੁੱਢਲੇ ਨਿਯਮ
- ਵਿਰੋਧੀ ਅਤੇ ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ, ਮੁਹਾਵਰੇ

### General knowledge
- Basic Indian history, geography and polity
- Everyday science, health and hygiene
- Current affairs of Punjab and India

### Punjab GK
- Districts and their headquarters, rivers, important places
- Sikh Gurus, Punjab's history, fairs, festivals and folk culture

### Reasoning & basic maths
- Number series, analogy, coding-decoding, directions
- Simplification, percentage, ratio, profit and loss, time and work

### English
- Basic grammar, vocabulary and sentence usage`,
    faqs: [
      {
        q: "How many posts are in PSSSB Group D 2026?",
        a: "After the corrigendum of 17 September 2026, Advertisement No. 04 of 2026 has 2,098 Group D posts, of which 739 are for women. The application deadline was extended to 21 September 2026.",
      },
      {
        q: "Was the PSSSB Group D exam of 25 October 2026 postponed?",
        a: "No. On 22 October 2026 PSSSB issued a public notice saying a fake notice about postponement was being spread on WhatsApp, and that the exam would be held on 25 October 2026 as scheduled. Trust only sssb.punjab.gov.in.",
      },
      {
        q: "Is Punjabi compulsory for PSSSB Group D?",
        a: "Yes. The paper has a qualifying Punjabi section, and you must pass it for the rest of your paper to count.",
      },
      {
        q: "What kind of questions come in the Group D exam?",
        a: "Basic-level objective questions on general knowledge, Punjab GK, reasoning, basic maths and English, after the Punjabi section.",
      },
    ],
  },

  "psssb/junior-engineer": {
    seo: {
      title: "PSSSB JE Mock Test {year} — Civil, Electrical & Mechanical",
      description:
        "PSSSB Junior Engineer (Civil, Electrical, Mechanical) preparation: Punjabi paper, technical syllabus and the 2026 drive's reopened applications. Free Punjab GK test.",
    },
    description: `**PSSSB Junior Engineer (JE)** recruitment fills Group B engineering posts in Punjab government departments in the **Civil, Electrical and Mechanical** streams. The 2026 drive (**Advertisement No. 07 of 2026**) took a turn in October: following an interim order of the Punjab and Haryana High Court in CWP No. 32342 of 2026 (Manveer Singh vs State of Punjab), PSSSB **reopened online applications from 12 to 27 October 2026**, and the written exam fixed for **18 October 2026 was postponed** until further notice. Candidates who had already applied did not need to apply again.

A diploma or degree in the relevant branch of engineering is the core qualification, along with Punjabi at matriculation level, as the advertisement states. The selection is a written objective test followed by document verification.

The written paper has a **qualifying Punjabi section** and a merit section dominated by **technical questions from your own branch**, with a smaller share of general knowledge, Punjab GK, reasoning and English. Technical marks decide the merit, so your diploma subjects matter most.

**How to prepare:** revise your branch subject by subject from standard JE books, solve previous PSSSB and other state JE papers, and keep Punjabi and Punjab GK going on the side. Our free [Punjab GK mock test](${FREE_MOCK}) covers the general part.`,
    syllabus: `PSSSB publishes the detailed syllabus with each advertisement. The usual areas are:

### Punjabi (qualifying)
- ਵਿਆਕਰਨ, ਸ਼ਬਦ ਜੋੜ, ਮੁਹਾਵਰੇ ਅਤੇ ਪੈਰਾ ਪੜ੍ਹ ਕੇ ਪ੍ਰਸ਼ਨ

### Civil engineering
- Building materials, surveying, soil mechanics, fluid mechanics
- Strength of materials, RCC and steel structures, estimation and costing
- Highway, irrigation and environmental engineering

### Electrical engineering
- Circuits, measurements, electrical machines and transformers
- Power systems, switchgear and protection, utilisation of electrical energy
- Basic electronics and estimation

### Mechanical engineering
- Thermodynamics, fluid mechanics and hydraulic machines
- Strength of materials, theory of machines, manufacturing processes
- Refrigeration and air conditioning, IC engines

### General section
- General knowledge and Punjab GK, reasoning, English`,
    faqs: [
      {
        q: "Why were PSSSB JE applications reopened in October 2026?",
        a: "To comply with an interim order of the Punjab and Haryana High Court dated 8 October 2026 in CWP No. 32342 of 2026, PSSSB reopened applications for Advt. No. 07 of 2026 from 12 to 27 October 2026. Earlier applicants did not need to apply again.",
      },
      {
        q: "When is the PSSSB JE 2026 exam?",
        a: "The exam fixed for 18 October 2026 was postponed by PSSSB's notice of 9 October 2026. The new date will be announced on sssb.punjab.gov.in.",
      },
      {
        q: "Which streams are covered in PSSSB JE 2026?",
        a: "Junior Engineer (Civil) and Junior Engineer (Electrical) in various departments, and Junior Engineer (Mechanical) in the Water Resources Department.",
      },
    ],
  },

  "punjab-police/constable": {
    seo: {
      title: "Punjab Police Constable Mock Test {year} — Paper 1 & Punjabi",
      description:
        "Punjab Police Constable mock tests in the CBT format: general awareness, reasoning, maths, English, Punjabi, digital literacy and the qualifying Punjabi paper.",
    },
    pattern: {
      sections: [
        { name: "General awareness", questions: 35, marks: 35 },
        { name: "Quantitative aptitude & numerical skills", questions: 20, marks: 20 },
        { name: "Mental ability & logical reasoning", questions: 20, marks: 20 },
        { name: "English", questions: 10, marks: 10 },
        { name: "Punjabi", questions: 10, marks: 10 },
        { name: "Digital literacy & awareness", questions: 5, marks: 5 },
        { name: "Paper II — Punjabi (qualifying, 60 minutes)", questions: 50, marks: 50 },
      ],
      durationMin: 120,
      negativeMarking: "No negative marking reported",
      note: "Paper I (100 questions, 120 minutes) decides the merit; Paper II is qualifying (50% to pass). Pattern as reported for the 2026 CBT; confirm in the official notification.",
    },
    description: `**Punjab Police Constable** recruitment is one of the largest in Punjab. The 2026 drive (**Advertisement No. 01 of 2026**, published on 6 March 2026) offered **3,298 posts: 2,522 in the District Cadre and 776 in the Armed Cadre**. The computer-based test (CBT) began on **1 July 2026**, and candidates shortlisted on the CBT score were called for the physical tests.

Candidates need Class 12, Punjabi at matriculation level and the age and physical standards given in the notification. Selection has three stages: a **CBT**, a **Physical Screening Test (PST)** with running and other events, and a **Physical Measurement Test (PMT)** for height and chest. The physical tests are qualifying, so the CBT score decides your rank.

The CBT has two papers. **Paper I** (100 questions, 120 minutes) covers general awareness, quantitative aptitude, reasoning, English, Punjabi and digital literacy, and its marks make the merit list. **Paper II** is a **qualifying Punjabi paper** of 50 questions: you must clear it, but its marks are not added.

**How to prepare:** general awareness carries the most marks, so revise Punjab GK and current affairs every day ([Know Your Punjab](/punjab) is a good start), practise maths and reasoning for speed, and do not ignore Punjabi. Take the free [Punjab GK mock test](${FREE_MOCK}) to see the CBT screen and where you stand.`,
    syllabus: `The Punjab Police notification lists the syllabus. The usual areas are:

### General awareness
- Indian and Punjab history, culture, geography and economy
- Indian polity and the constitution, general science
- Current affairs, sports, awards and important days

### Quantitative aptitude
- Number system, simplification, percentage, ratio and proportion
- Average, profit and loss, simple and compound interest
- Time and work, time and distance, mensuration, data interpretation

### Mental ability & reasoning
- Series, analogy, classification, coding-decoding
- Blood relations, directions, ranking, Venn diagrams, puzzles

### English
- Grammar, vocabulary, sentence improvement, comprehension

### Punjabi (Paper I section and qualifying Paper II)
- ਵਿਆਕਰਨ, ਸ਼ਬਦ ਜੋੜ, ਮੁਹਾਵਰੇ, ਅਖਾਣ ਅਤੇ ਪੈਰਾ ਪੜ੍ਹ ਕੇ ਪ੍ਰਸ਼ਨ

### Digital literacy
- Computer basics, MS Office, internet and web search, e-mail, mobile phone basics`,
    faqs: [
      {
        q: "How many posts were in the Punjab Police Constable 2026 recruitment?",
        a: "3,298: 2,522 in the District Cadre and 776 in the Armed Cadre, under Advertisement No. 01 of 2026 published on 6 March 2026.",
      },
      {
        q: "Is there negative marking in the Punjab Police Constable CBT?",
        a: "Recent Punjab Police constable CBTs have had no negative marking. Check the notification for your drive, because the rule can change.",
      },
      {
        q: "What is Paper II in the Punjab Police Constable exam?",
        a: "Paper II is a qualifying Punjabi language paper of 50 questions. You must reach the qualifying marks (50% as reported for 2026), but its marks are not added to your merit.",
      },
      {
        q: "Are the PST and PMT scored?",
        a: "No. The Physical Screening Test and Physical Measurement Test are qualifying. Your rank comes from the CBT.",
      },
    ],
  },

  "ppsc/pcs": {
    seo: {
      title: "Punjab PCS Mock Test {year} — PPSC Prelims GS & Punjab GK",
      description:
        "Punjab PCS (PPSC Combined Competitive Exam) preparation: prelims General Studies and CSAT, Punjab history, culture and economy, with a free Punjab GK test.",
    },
    description: `The **Punjab State Civil Services Combined Competitive Examination** (Punjab PCS) is conducted by the **Punjab Public Service Commission (PPSC), Patiala** to recruit officers for the PCS (Executive Branch), DSP, Tehsildar, Excise and Taxation Officer, Food and Supplies Officer, Block Development and Panchayat Officer and other Group A and B services.

Selection has three stages. The **preliminary exam** has two objective papers, **General Studies** and the **Civil Services Aptitude Test (CSAT)**; CSAT is qualifying, so General Studies decides who moves on. The **main exam** is descriptive, with a qualifying Punjabi language paper, an essay and General Studies papers. Shortlisted candidates then face a **personality test**.

Punjab is everywhere in this exam: its history from the Gurus to the freedom movement, its geography and rivers, its economy and agriculture, and its art and culture appear in both prelims and mains. Strong Punjab GK, current affairs and steady answer-writing practice set toppers apart.

**How to prepare:** build the NCERT base for General Studies, read Punjab history and culture properly, follow Punjab current affairs daily and keep CSAT practice going so it never becomes a hurdle. Start with the [Know Your Punjab](/punjab) page and the free [Punjab GK mock test](${FREE_MOCK}).`,
    syllabus: `PPSC publishes the full syllabus with the notification. The usual areas are:

### Prelims — General Studies
- History of India and Punjab, Indian national movement
- Indian and world geography, geography of Punjab
- Indian polity and governance, economy and planning
- Environment, ecology and general science
- Current events of national and state importance

### Prelims — CSAT (qualifying)
- Comprehension, logical reasoning and analytical ability
- Decision making and problem solving
- Basic numeracy and data interpretation

### Mains
- Punjabi language (qualifying) and an essay
- General Studies papers covering history, geography, polity, economy, science and technology, ethics
- Punjab's history, culture, economy and society throughout`,
    faqs: [
      {
        q: "Who conducts the Punjab PCS exam?",
        a: "The Punjab Public Service Commission (PPSC), Patiala, through the Punjab State Civil Services Combined Competitive Examination.",
      },
      {
        q: "Is the CSAT paper counted in Punjab PCS prelims merit?",
        a: "No. CSAT is qualifying; the merit for the main exam is drawn from the General Studies paper. Check the notification for the qualifying percentage.",
      },
      {
        q: "Is Punjabi compulsory in Punjab PCS?",
        a: "The main exam includes a qualifying Punjabi paper, and Punjab rules require knowledge of Punjabi up to matriculation level for state government posts.",
      },
    ],
  },
};
