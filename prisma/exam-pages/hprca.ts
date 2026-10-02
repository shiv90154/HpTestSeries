import { FREE_MOCK_HREF } from "../../src/lib/site";
import type { ExamPages } from "./types";

// Exams recruited by the Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur. JOA IT and Clerk already have hand-written
// copy in prisma/seed-content.ts; only their SEO fields live here.

const free = (slug: string) => `/tests/${slug}`;

export const HPRCA_PAGES: ExamPages = {
  "hprca/joa-it": {
    seo: {
      title: "HPRCA JOA IT Mock Test {year} — Free Online Test Series",
      description: "Free HPRCA JOA IT mock tests: computer, maths, Himachal GK and aptitude in a real CBT format. Hindi & English, instant solutions and your HP rank.",
    },
  },

  "hprca/clerk": {
    seo: {
      title: "HPRCA Clerk Mock Test {year} — Free Online Test Series",
      description: "Practise HPRCA Clerk with free mock tests: Himachal GK, reasoning, maths, English and Hindi in real CBT format, with solutions and your HP rank.",
    },
    pattern: {
      sections: [{ name: "Computer-based test (written screening)", questions: null, marks: 120 }],
      durationMin: null,
      negativeMarking: "",
      note: "In the 2026 notification the CBT carried 120 marks and was followed by a qualifying typing skill test (30 wpm English or 25 wpm Hindi). The commission may also hold a preliminary screening test if applications are very high. Confirm the current pattern in the HPRCA notification.",
    },
  },

  "hprca/jbt": {
    seo: {
      title: "HP JBT Mock Test {year} — Free HPRCA JBT Test Series",
      description: "Free HPRCA JBT teacher mock tests: pedagogy, Hindi, English, maths, EVS and Himachal GK in real CBT format. Hindi & English solutions and your HP rank.",
    },
    description: `**JBT (Junior Basic Training) Teacher** posts are for teaching classes 1 to 5 in Himachal Pradesh government primary schools. Recruitment is done by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, and a candidate must also hold a valid **HP TET (JBT)** pass certificate issued by the HP Board of School Education (HPBOSE).

The usual route is: apply online on the HPRCA portal, take a **computer-based test (CBT)**, then document verification, as laid down in the post-wise notification. The typical educational requirement is Senior Secondary with a two-year D.El.Ed (or another teacher-training qualification recognised for primary classes). The notification gives the exact list, percentage and age limit, so read it before applying. In the 2026 drive HPRCA advertised 600 JBT posts (Post Code 26015).

JBT paper me **primary-level subjects** ka weight sabse zyada hota hai: Hindi, English, Maths, EVS aur Child Development & Pedagogy, saath me Himachal GK, current affairs aur reasoning. Kyunki sab candidates TET pass hote hain, competition marks ke chhote difference par decide hota hai, isliye accuracy aur speed dono par kaam karo.

**How to prepare:** revise primary-level Maths and EVS from the NCERT books, practise Hindi and English grammar daily, make short notes for Himachal GK and attempt timed mocks. Start with the free [HPRCA JBT mock test](${free("hprca-jbt-free-mock-1")}) to see the CBT screen.`,
    syllabus: `The post-wise syllabus is published in the HPRCA notification. These are the areas asked most often:

### Child Development & Pedagogy
- Growth and development, learning theories, motivation, intelligence
- Inclusive education, learning difficulties, assessment and evaluation
- Teaching methods, classroom management, NEP 2020 basics

### Languages
- Hindi: grammar, vocabulary, comprehension, teaching of Hindi
- English: grammar, usage, comprehension, teaching of English

### Mathematics (primary level)
- Number system, the four operations, fractions, decimals, percentage
- Geometry basics, measurement, data handling, mental maths

### Environmental Studies
- Family and friends, food, shelter, water, travel, plants and animals
- Basic science and social awareness at primary level

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge and reasoning`,
    faqs: [
      {
        q: "JBT ke liye kaun apply kar sakta hai?",
        a: "Senior secondary ke saath D.El.Ed (ya equivalent primary teacher-training) aur HP TET (JBT) pass hona chahiye. Percentage aur age limit har notification me alag ho sakti hai, isliye HPRCA ka notification dekhein.",
      },
      {
        q: "Is HP TET compulsory for JBT recruitment?",
        a: "Yes. A valid HP TET (JBT) pass certificate is required in addition to the training qualification. TET is held by HPBOSE; recruitment is done separately by HPRCA.",
      },
      {
        q: "What is the selection process for HPRCA JBT?",
        a: "HPRCA selects candidates through a computer-based test followed by document verification. Check the post-wise notification for any additional stage and the exact weightage.",
      },
      {
        q: "How many JBT posts did HPRCA advertise in 2026?",
        a: "In the 2026 drive HPRCA advertised 600 JBT posts (Post Code 26015). Vacancy numbers change with every notification, so confirm on hprca.hp.gov.in.",
      },
    ],
  },

  "hprca/tgt": {
    seo: {
      title: "HP TGT Mock Test {year} — Free HPRCA TGT Test Series",
      description: "Free HPRCA TGT teacher mock tests for Arts, Medical and Non-Medical: pedagogy, subject, Himachal GK and aptitude in real CBT format, in Hindi & English.",
    },
    description: `**TGT (Trained Graduate Teacher)** posts are for teaching classes 6 to 10 in Himachal Pradesh government schools. Recruitment is done by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, separately for **TGT (Arts)**, **TGT (Non-Medical)** and **TGT (Medical)**, each with its own post code and subject paper. Candidates need a bachelor's degree in the relevant subjects, a **B.Ed** and a pass in the matching **HP TET (TGT)** category conducted by HPBOSE.

Recent drives select candidates through a **computer-based screening test (CBT)** followed by document verification. The notification states the exact stages, subject weightage and age limit. HPRCA advertised the TGT (Arts), TGT (Non-Medical) and TGT (Medical) posts one after another in the 2025-26 cycle, so keep your TET certificate and degree documents ready before the next notification.

TGT paper me tumhare **apne subject ka sabse bada hissa** hota hai (Arts me social science aur languages, Non-Medical me Maths, Physics, Chemistry, Medical me Biology, Chemistry). Baaki me pedagogy, Himachal GK, current affairs aur reasoning aate hain. Subject strong ho to hi cutoff safe hota hai.

**How to prepare:** finish the graduation-level syllabus of your subject first, revise NCERT of classes 6 to 12 for the basics, make Himachal GK notes and take timed full mocks. Begin with the free [HPRCA TGT mock test](${free("hprca-tgt-free-mock-1")}).`,
    syllabus: `Each TGT category has its own subject syllabus in the HPRCA notification. Common structure:

### Subject paper (largest share)
- **TGT Arts:** social science subjects (history, geography, civics, economics) and languages as notified
- **TGT Non-Medical:** Mathematics, Physics, Chemistry
- **TGT Medical:** Biology (botany and zoology), Chemistry
- Level: graduation, with school-level questions of classes 6 to 10

### Child Development & Pedagogy
- Learning theories, development stages, inclusive education
- Assessment, classroom management, teaching methods

### General awareness and aptitude
- Himachal Pradesh GK and current affairs
- General knowledge, reasoning, Hindi and English`,
    faqs: [
      {
        q: "TGT Arts, Medical aur Non-Medical me kya fark hai?",
        a: "Teeno ke subject alag hain: Arts me social science aur languages, Medical me Biology aur Chemistry, Non-Medical me Maths, Physics aur Chemistry. Har category ka post code, vacancy aur paper alag hota hai.",
      },
      {
        q: "Is B.Ed and HP TET required for TGT?",
        a: "Yes. A bachelor's degree in the relevant subjects, a B.Ed and a pass in the matching HP TET (TGT) category are required. Exact marks and subject combinations are given in the HPRCA notification.",
      },
      {
        q: "How is the HPRCA TGT selection done?",
        a: "In recent drives, through a computer-based screening test followed by document verification. Check the notification for any further stage, such as a medical examination for particular posts.",
      },
      {
        q: "HPRCA TGT ki taiyari kaise shuru karein?",
        a: `Pehle apne subject ka graduation-level syllabus khatam karo, phir pedagogy aur Himachal GK. Har hafte ek timed mock do. [HPRCA TGT free mock](${free("hprca-tgt-free-mock-1")}) se shuruaat karo.`,
      },
    ],
  },

  "hprca/language-teacher": {
    seo: {
      title: "HP Language Teacher Mock Test {year} — HPRCA LT Series",
      description: "Free HPRCA Language Teacher (Hindi, Punjabi, Urdu) mock tests: language, pedagogy and Himachal GK in real CBT format, with Hindi & English solutions.",
    },
    description: `**Language Teacher (LT)** posts in Himachal Pradesh government schools cover **Hindi, Punjabi and Urdu**, while Sanskrit teachers (Shastri) are recruited under the TGT (Sanskrit) category. The recruiting body is the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. A candidate needs a bachelor's degree with the language, a **B.Ed** and a pass in the matching **HP TET** language category held by HPBOSE.

Selection follows the post-wise notification: a **computer-based test** and document verification in recent drives. The notification gives the exact eligibility, age limit and the number of vacancies, which differ language by language and from year to year.

Language Teacher ke paper me **tumhari language ka grammar, sahitya aur teaching method** sabse zyada weight rakhte hain. Iske saath Child Development & Pedagogy, Himachal GK aur current affairs aate hain. Hindi LT ke liye vyakaran, ras, alankar, chhand aur sahitya ka itihas pakka karo.

**How to prepare:** read the language syllabus topic by topic (grammar, literature, comprehension), revise pedagogy theories with classroom examples and take timed mocks every week. Start with the free [HPRCA Language Teacher mock test](${free("hprca-language-teacher-free-mock-1")}).`,
    syllabus: `The syllabus differs by language and is given in the HPRCA notification. Usual areas:

### Language and literature
- **Hindi:** vyakaran, shabd-bhandar, ras, alankar, chhand, Hindi sahitya ka itihas, gadya and padya
- **Punjabi / Urdu:** grammar, vocabulary, literature and comprehension of the language
- Unseen passages and language-teaching methods

### Child Development & Pedagogy
- Language acquisition, learning theories and development stages
- Inclusive education, assessment and classroom management

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge, reasoning and English`,
    faqs: [
      {
        q: "Which languages are covered under Language Teacher?",
        a: "Hindi, Punjabi and Urdu language teachers are advertised as Language Teacher (LT). Sanskrit (Shastri) teachers come under the TGT (Sanskrit) category. Each has its own HP TET paper.",
      },
      {
        q: "Language Teacher ke liye TET zaroori hai?",
        a: "Haan, matching language category ka HP TET pass hona chahiye, saath me B.Ed aur language ke saath bachelor's degree.",
      },
      {
        q: "What is the selection process for HPRCA Language Teacher?",
        a: "Recent HPRCA teacher drives use a computer-based test followed by document verification. The post-wise notification states the final process.",
      },
    ],
  },

  "hprca/junior-engineer": {
    seo: {
      title: "HP Junior Engineer Mock Test {year} — HPRCA JE Civil Series",
      description: "Free HPRCA Junior Engineer (Civil) mock tests: civil engineering subjects, Himachal GK and aptitude in real CBT format, with Hindi & English solutions.",
    },
    description: `**Junior Engineer (JE)** posts in Himachal Pradesh government departments such as the PWD and Jal Shakti Vibhag are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. The Civil JE post asks for a diploma in civil engineering from a recognised board; the notification states the exact branch, percentage and age limit. In the 2026 drive HPRCA advertised 149 Junior Engineer (Civil) posts, with the age limit set at 18 to 45 years.

Selection is through a **computer-based test (CBT)** followed by document verification as per the notification. The test checks your **technical subject knowledge** along with general awareness, so the engineering section decides the merit.

JE paper me **civil engineering ka technical hissa sabse bada** hota hai: building materials, surveying, strength of materials, hydraulics, RCC, soil mechanics, transportation aur estimation. Technical part ke saath Himachal GK, reasoning aur English ke kuch questions bhi aate hain, jo easy marks hain.

**How to prepare:** revise diploma-level notes subject by subject, solve numericals for strength of materials, hydraulics and estimation daily, and keep a short Himachal GK notebook. Take the free [HPRCA Junior Engineer mock test](${free("hprca-junior-engineer-free-mock-1")}) to see the pattern of questions.`,
    syllabus: `The exact syllabus is in the HPRCA notification. The Civil JE technical paper normally covers:

### Technical subjects (diploma level)
- Building materials and construction technology
- Surveying and levelling
- Strength of materials and structural analysis
- Fluid mechanics, hydraulics and irrigation engineering
- RCC and steel design basics
- Soil mechanics and foundation engineering
- Transportation (highway) engineering
- Environmental and water-supply engineering
- Estimating, costing and valuation

### General section
- Himachal Pradesh GK and current affairs
- General knowledge, reasoning and English`,
    faqs: [
      {
        q: "HPRCA JE ke liye qualification kya hai?",
        a: "Civil JE ke liye recognised board se civil engineering ka diploma chahiye. Branch, percentage aur age limit notification me di jaati hai.",
      },
      {
        q: "How many JE (Civil) posts did HPRCA advertise in 2026?",
        a: "HPRCA advertised 149 Junior Engineer (Civil) posts in 2026, with applications from 10 April to 2 May. Numbers change every notification; confirm on hprca.hp.gov.in.",
      },
      {
        q: "Is there negative marking in the HPRCA JE exam?",
        a: "It is stated in the post-wise notification and can differ between drives. Our mocks use 0.25 negative marking so you learn to avoid blind guesses.",
      },
    ],
  },

  "hprca/staff-nurse": {
    seo: {
      title: "HP Staff Nurse Mock Test {year} — HPRCA Nursing Series",
      description: "Free HPRCA Assistant Staff Nurse mock tests: nursing subjects and Himachal GK in real CBT format, with Hindi & English solutions and your HP rank.",
    },
    description: `**Assistant Staff Nurse** posts in Himachal Pradesh government hospitals and health institutions are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. Candidates need a **B.Sc. Nursing or GNM** qualification and valid registration with the **Himachal Pradesh Nurses Registration Council (HPNRC)** at the time of applying.

The 2026 drive used a **120-mark computer-based test** followed by document verification, with minimum qualifying marks of 45% for General/EWS and 40% for SC/ST/OBC candidates. The notification states the vacancies, age limit and any change in the pattern, so read it carefully.

Paper do hisson me aata hai: **Part A me nursing subjects** (fundamentals, medical-surgical, community health, child health, midwifery) aur **Part B me general awareness**: Himachal GK, current affairs, everyday science, reasoning, social science, English aur Hindi. Nursing part ke marks merit decide karte hain, lekin Part B ke aasaan marks chhodna mehnga padta hai.

**How to prepare:** revise standard nursing textbooks chapter by chapter, practise drug-dose and nutrition questions, and keep a Himachal GK notebook. Attempt the free [HPRCA Staff Nurse mock test](${free("hprca-staff-nurse-free-mock-1")}) first, then build the habit of one timed mock every week.`,
    syllabus: `The detailed syllabus is in the HPRCA notification. The paper usually covers:

### Part A: nursing subjects
- Fundamentals of nursing and first aid
- Medical-surgical nursing
- Community health nursing and nutrition
- Child health (paediatric) nursing
- Obstetrics, gynaecology and midwifery
- Mental health nursing, pharmacology and microbiology basics

### Part B: general awareness
- Himachal Pradesh GK and current affairs
- Everyday science and social science
- Logical reasoning
- General English and general Hindi (matric standard)`,
    pattern: {
      sections: [{ name: "Computer-based test (nursing subjects + general awareness)", questions: 120, marks: 120 }],
      durationMin: null,
      negativeMarking: "",
      note: "Reported for the 2026 drive: 120 MCQs of 1 mark, minimum qualifying marks 45% (General/EWS) and 40% (SC/ST/OBC). Duration and negative marking are in the notification.",
    },
    faqs: [
      {
        q: "Staff Nurse ke liye kaun si qualification chahiye?",
        a: "B.Sc. Nursing ya GNM, aur HP Nurses Registration Council (HPNRC) me valid registration. Percentage aur age limit notification me hoti hai.",
      },
      {
        q: "What is the pass mark in the HPRCA Staff Nurse exam?",
        a: "For the 2026 drive the minimum qualifying marks were 45% for General/EWS and 40% for SC/ST/OBC in the 120-mark CBT. Final selection depends on merit and vacancies.",
      },
      {
        q: "Does the Staff Nurse paper have Himachal GK?",
        a: "Yes. Part B of the paper has Himachal GK and current affairs, everyday science, reasoning, English and Hindi along with the nursing subjects.",
      },
    ],
  },

  "hprca/pharmacist": {
    seo: {
      title: "HP Pharmacist Mock Test {year} — HPRCA Pharmacy Officer",
      description: "Free HPRCA Pharmacist (Pharmacy Officer) mock tests: pharmaceutics, pharmacology, drug laws and Himachal GK in real CBT format, with solutions.",
    },
    description: `**Pharmacist / Pharmacy Officer (Allopathy)** posts in Himachal Pradesh health institutions are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. The post needs a degree or diploma in Pharmacy and registration with the State Pharmacy Council; the notification states the exact qualification, experience, age limit and vacancies. In the 2026 drive HPRCA advertised 41 Pharmacy Officer (Allopathy) posts with an age limit of 18 to 45 years.

Selection is through a **computer-based test** followed by document verification as per the notification. The paper tests **pharmacy subjects** along with general awareness, so the technical section decides merit.

Pharmacist paper me **pharmaceutics, pharmaceutical chemistry, pharmacology, pharmacognosy aur hospital pharmacy** ke questions sabse zyada aate hain. **Drugs and Cosmetics Act** aur Pharmacy Act ke rules par bhi seedhe questions puchhe jaate hain, jo thodi si mehnat se pakke ho jaate hain.

**How to prepare:** revise the D.Pharm / B.Pharm books subject by subject, make a one-page sheet of drug classes with examples and side effects, and read the Drugs and Cosmetics Act schedules. Attempt the free [HPRCA Pharmacist mock test](${free("hprca-pharmacist-free-mock-1")}) to see the CBT screen.`,
    syllabus: `The exact syllabus is given in the HPRCA notification. Usual areas:

### Pharmacy subjects
- Pharmaceutics: dosage forms, unit operations, packaging, biopharmaceutics
- Pharmaceutical chemistry: organic, inorganic and medicinal chemistry, analysis
- Pharmacology: drug classes, mechanism, uses, side effects, toxicology
- Pharmacognosy: crude drugs, phytochemistry
- Hospital and clinical pharmacy, dispensing, pharmacy practice
- Pharmacy Act, Drugs and Cosmetics Act and Rules, NDPS Act

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge, reasoning and English`,
    faqs: [
      {
        q: "HPRCA Pharmacist ke liye qualification kya hai?",
        a: "Pharmacy me degree ya diploma aur State Pharmacy Council me registration. Exact qualification aur experience notification me dekhein.",
      },
      {
        q: "How many Pharmacy Officer posts were advertised in 2026?",
        a: "HPRCA advertised 41 Pharmacy Officer (Allopathy) posts in 2026, with applications from 28 April to 20 May. Always confirm on hprca.hp.gov.in.",
      },
      {
        q: "Are drug laws asked in the pharmacist exam?",
        a: "Yes. Questions on the Pharmacy Act, the Drugs and Cosmetics Act and Rules and the NDPS Act are common and are among the easiest marks to secure.",
      },
    ],
  },

  "hprca/forest-guard": {
    seo: {
      title: "HP Forest Guard Mock Test {year} — Free Vanrakshak Series",
      description: "Free Himachal Forest Guard (Vanrakshak) mock tests: forests of Himachal, environment, GK, reasoning and English in real CBT format, with solutions.",
    },
    description: `**Forest Guard (Vanrakshak)** is the entry-level field post of the Himachal Pradesh Forest Department, responsible for protecting forests and wildlife in a beat. It is a Class III (Group C) post that attracts a very large number of applicants in every drive. The advertisement names the recruiting agency (HPRCA or the Forest Department) and gives the vacancies, qualification (10+2 or equivalent) and age limit.

In earlier drives the selection had a **physical fitness test (qualifying only)**, a **written test** and a short **rating/interview** component, with the written marks carrying most of the weight. Because the physical test is only pass-or-fail, the written test usually decides the merit list. Read the current notification for the exact marks and the race standards for men and women.

Written paper me **Forests of Himachal, environment aur wildlife** ke saath General Knowledge, Reasoning, General Science, aptitude aur English ke questions aate hain. HP ke national parks, sanctuaries, forest types aur van adhiniyam jaise topics yahan fayda dete hain.

**How to prepare:** keep up your running practice for the physical test, then give 1 to 2 hours daily to the written syllabus. Make notes on Himachal's protected areas, forest types and wildlife laws, and take timed mocks. Start with the free [Forest Guard mock test](${free("hprca-forest-guard-free-mock-1")}).`,
    syllabus: `The syllabus and marks are in the recruitment notification. Earlier written papers covered:

### Forests and environment of Himachal
- Forest types, forest area and major tree species of Himachal
- National parks, wildlife sanctuaries, conservation reserves
- Flora, fauna and endangered species of the state
- Forest laws, wildlife protection and environmental issues

### General knowledge
- Himachal Pradesh GK: history, geography, districts, rivers, culture
- Current affairs: national and state

### Aptitude
- Logical reasoning and mental ability
- Basic mathematics and general science
- English language

### Physical test
- Qualifying race and fitness events for men and women, as notified`,
    faqs: [
      {
        q: "Forest Guard ke liye qualification kya hai?",
        a: "Aam taur par 10+2 ya equivalent. Age limit, height/chest standard aur other conditions notification me dee jaati hain.",
      },
      {
        q: "Is the physical test marked in the Forest Guard selection?",
        a: "In earlier drives the physical fitness test was qualifying only, with merit built from the written test and a small rating component. Check the current notification for the exact scheme.",
      },
      {
        q: "Which subjects are important for the Forest Guard written exam?",
        a: "Forests, wildlife and environment of Himachal, Himachal GK, general science, reasoning and English. The forest-specific section is where well-prepared candidates gain an edge.",
      },
    ],
  },

  "hprca/joa-library": {
    seo: {
      title: "HP JOA Library Mock Test {year} — Free HPRCA Series",
      description: "Free HPRCA Junior Office Assistant (Library) mock tests: library science, Himachal GK, reasoning and English in real CBT format, with Hindi & English solutions.",
    },
    description: `**Junior Office Assistant (Library)**, called **JOA Library**, is the library-side clerical post in Himachal Pradesh government offices, colleges and institutions. Posts are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, as **Job Trainee** appointments. In the December 2025 advertisement HPRCA invited applications for 78 JOA (Library) posts.

The qualification asked was **10+2 with at least 50% marks and a one-year diploma in Library Science / Library and Information Science**, or a bachelor's degree in Library Science. Age limit, relaxation and the selection stages are in the post-wise notification; the selection is through a written test followed by document verification as notified.

JOA Library ke paper me **library science ka technical hissa** (classification, cataloguing, library management, reference service) aur **general awareness** (Himachal GK, current affairs, reasoning, English, Hindi) dono aate hain. Library science ke candidates ke liye technical marks lena aasaan hota hai, isliye general part me speed hi fark banati hai.

**How to prepare:** revise Ranganathan's five laws, DDC and Colon classification basics, cataloguing rules and library automation, then add Himachal GK and reasoning. Start with the free [HP GK mock test](${FREE_MOCK_HREF}) and take sectional tests as they are added.`,
    syllabus: `The syllabus is given in the HPRCA notification. Usual areas for JOA (Library):

### Library and information science
- Five laws of library science, types of libraries
- Classification: DDC and Colon classification basics
- Cataloguing: catalogue codes, subject headings
- Library management, acquisition, circulation, stock verification
- Reference and information services, bibliography
- Library automation, Koha and digital libraries
- Library legislation and professional bodies in India

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge and reasoning

### Language
- General English and Hindi`,
    faqs: [
      {
        q: "JOA Library ke liye qualification kya hai?",
        a: "10+2 (kam se kam 50% marks) ke saath Library Science / Library and Information Science ka one-year diploma, ya Library Science me bachelor's degree. Exact conditions notification me hoti hain.",
      },
      {
        q: "How many JOA (Library) posts were advertised?",
        a: "The December 2025 HPRCA advertisement (No. 06/2025) invited applications for 78 JOA (Library) posts as Job Trainee. Check hprca.hp.gov.in for later notifications.",
      },
      {
        q: "Is the JOA Library paper only library science?",
        a: "No. Besides library science it tests general awareness: Himachal GK, current affairs, reasoning, English and Hindi. The exact split is in the notification.",
      },
    ],
  },

  "hprca/steno-typist": {
    seo: {
      title: "HP Steno Typist Mock Test {year} — Free HPRCA Series",
      description: "Free HPRCA Steno Typist mock tests: Himachal GK, reasoning, English, Hindi and computer awareness in real CBT format, with Hindi & English solutions.",
    },
    description: `**Steno Typist** is a clerical post in Himachal Pradesh government offices, responsible for taking dictation, typing letters and preparing office documents. Posts are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, as **Job Trainee** appointments. The December 2025 HPRCA advertisement included a Steno Typist post and asked for a **10+2 examination from a recognised Board of School Education**.

Vacancies are few in a drive. The selection stages, the shorthand and typing speed required and the age limit are in the post-wise notification; stenography posts usually carry a skill test as well, so practise typing alongside the theory.

Written test me **General Knowledge, Himachal GK, English, Hindi aur reasoning** ke questions aate hain. Typing aur shorthand ka skill test alag se hota hai, isliye roz 20 minute typing practice ko routine banao aur notification me speed ki exact requirement zaroor dekho.

**How to prepare:** revise English and Hindi grammar, make Himachal GK notes and practise typing every day. Start with the free [HP GK mock test](${FREE_MOCK_HREF}) to get used to the CBT screen.`,
    syllabus: `The syllabus and skill-test standard are given in the HPRCA notification. Usual areas:

### Written test
- English: grammar, vocabulary, comprehension, error spotting
- Hindi: vyakaran, shabd-gyan, comprehension
- Himachal Pradesh GK and current affairs
- General knowledge and reasoning
- Basic computer awareness

### Skill test
- English and/or Hindi typing speed as notified
- Shorthand dictation and transcription if required by the post`,
    faqs: [
      {
        q: "Steno Typist ke liye qualification kya hai?",
        a: "December 2025 ke HPRCA advertisement me recognised Board se 10+2 maangi gayi thi. Shorthand/typing speed aur age limit notification me dekhein.",
      },
      {
        q: "Is there a typing test for Steno Typist?",
        a: "Stenography posts normally include a skill test after the written test. The exact speed and format are stated in the notification.",
      },
      {
        q: "Steno Typist me kitni vacancies aati hain?",
        a: "Vacancies kam hoti hain aur har notification me badalti hain; December 2025 ke advertisement me ek post thi. Latest number hprca.hp.gov.in par check karein.",
      },
    ],
  },

  "hprca/special-educator": {
    seo: {
      title: "HP Special Educator Mock Test {year} — HPRCA & TET Series",
      description: "Free Special Educator mock tests for HPRCA recruitment and HP TET: special education, pedagogy, Himachal GK and aptitude in real CBT format, Hindi & English.",
    },
    description: `**Special Educator** posts in Himachal Pradesh government schools are for teachers who work with children with special needs, in two groups: **Pre-Primary to Class V** and **Class VI to XII**. Recruitment is done by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**, and both groups also have their own category in **HP TET** conducted by HPBOSE. In the December 2025 advertisement HPRCA invited applications for 108 Special Educator (Pre-Primary to Class V) posts.

Candidates need a recognised special-education qualification as laid down in the recruitment rules and the notification (a Rehabilitation Council of India recognised course is the usual requirement) and a pass in the matching HP TET category. HPRCA selects through a **computer-based test** followed by document verification.

Special Educator paper me **special education ka bada hissa** hota hai: disability ke types, RPwD Act 2016, inclusive education, assessment aur IEP. Iske saath Child Development & Pedagogy, languages, Himachal GK aur current affairs bhi aate hain. Disability law ke seedhe questions hote hain, isliye Act ke sections aur categories zaroor yaad karo.

**How to prepare:** read the RPwD Act 2016 and the types of disability with their definitions, revise pedagogy and inclusive education, and take timed mocks. Start with the free [HP GK mock test](${FREE_MOCK_HREF}); HP TET aspirants can also use the [HP TET free mock](${free("hp-tet-free-mock-1")}).`,
    syllabus: `The syllabus is in the HPRCA notification and the HP TET information bulletin. Usual areas:

### Special education
- Types and categories of disability, identification and early intervention
- RPwD Act 2016, RCI Act and national policies on disability
- Inclusive education, individualised education plans (IEP)
- Assistive devices, teaching strategies and assessment for children with special needs
- Curriculum adaptation and classroom management

### Child Development & Pedagogy
- Development, learning theories, motivation
- Assessment and evaluation

### Languages and general awareness
- Hindi and English
- Himachal Pradesh GK and current affairs
- Subject knowledge for the level (primary or Class VI to XII) as notified`,
    faqs: [
      {
        q: "Special Educator ke liye kaun se levels hain?",
        a: "Do levels hain: Pre-Primary to Class V aur Class VI to XII. Dono ki recruitment aur HP TET category alag hoti hai.",
      },
      {
        q: "Is HP TET required for Special Educator?",
        a: "Yes. HP TET has separate Special Educator categories for both levels, and a pass in the matching category is required along with the special-education qualification.",
      },
      {
        q: "How many Special Educator posts were advertised?",
        a: "The December 2025 HPRCA advertisement (No. 06/2025) invited applications for 108 Special Educator (Pre-Primary to Class V) posts. Check hprca.hp.gov.in for later drives.",
      },
    ],
  },

  "hprca/radiographer": {
    seo: {
      title: "HP Radiographer Mock Test {year} — Free HPRCA Series",
      description: "Free HPRCA Radiographer mock tests: radiography techniques, anatomy, radiation physics and Himachal GK in real CBT format, with Hindi & English solutions.",
    },
    description: `**Radiographer** posts in Himachal Pradesh government hospitals and medical colleges are filled by the **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur**. The notification released in March 2026 for Radiographer, Pharmacist and other health posts invited online applications from 10 March to 4 April 2026. The qualification is a diploma or degree in radiography/medical radiology as notified, and the notification states the age limit, vacancies and registration conditions.

Selection is through a **computer-based test** followed by document verification, as laid down in the post-wise advertisement. The technical section carries most of the weight, so a candidate with strong radiography fundamentals gains a clear edge.

Radiographer paper me **radiographic techniques, anatomy, radiation physics aur radiation safety** ke questions sabse zyada aate hain, saath me X-ray machine, CT, MRI, ultrasound aur contrast media. General awareness me Himachal GK aur current affairs ke aasaan marks bhi hote hain.

**How to prepare:** revise positioning and techniques for each body part, radiation units and protection rules (ALARA, shielding) and the working of imaging equipment. Take the free [HP GK mock test](${FREE_MOCK_HREF}) to get used to the CBT screen, then build the habit of one timed mock a week.`,
    syllabus: `The detailed syllabus is in the HPRCA notification. Usual areas for Radiographer:

### Technical subjects
- Radiographic techniques and positioning for skull, spine, chest, abdomen and extremities
- Anatomy and physiology relevant to imaging
- Radiation physics: X-ray production, interaction with matter, units and dose
- Radiation protection and safety: ALARA, shielding, dosimeters
- Imaging equipment: X-ray, fluoroscopy, CT, MRI, ultrasound and mammography
- Film processing, digital radiography and PACS
- Contrast media, patient care and emergencies in the radiology department

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge, reasoning and English`,
    faqs: [
      {
        q: "Radiographer ke liye qualification kya hai?",
        a: "Notification ke hisaab se radiography/medical radiology me diploma ya degree. Age limit aur registration ki conditions advertisement me di jaati hain.",
      },
      {
        q: "When did HPRCA invite applications for Radiographer?",
        a: "The notification of March 2026 invited applications from 10 March to 4 April 2026 for Radiographer, Pharmacist and other health posts. New drives are announced on hprca.hp.gov.in.",
      },
      {
        q: "Which topics matter most in the Radiographer exam?",
        a: "Radiographic techniques and positioning, radiation physics and safety, and imaging equipment. These technical topics carry most of the marks.",
      },
    ],
  },
};
