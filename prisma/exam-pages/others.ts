import { FREE_MOCK_HREF } from "../../src/lib/site";
import type { ExamPages } from "./types";

// HP Police, HPBOSE, Revenue (Patwari), PGIMER, HPSEBL, HPSCB and the High Court of Himachal Pradesh. Constable, HP TET and
// Patwari already have hand-written copy in prisma/seed-content.ts; only their SEO fields (and the TET pattern) live here.

const free = (slug: string) => `/tests/${slug}`;

export const OTHER_PAGES: ExamPages = {
  "hp-police/constable": {
    seo: {
      title: "HP Police Constable Mock Test {year} — Free Online Test Series",
      description: "Free HP Police Constable mock tests: Himachal GK, general knowledge, reasoning and numerical ability in real CBT format. Hindi & English solutions and HP rank.",
    },
  },

  "hp-police/sub-inspector": {
    seo: {
      title: "HP Police SI Mock Test {year} — Free Sub-Inspector Series",
      description: "Free HP Police Sub-Inspector mock tests: Himachal GK, general knowledge, reasoning, maths and English in real CBT format, with Hindi & English solutions.",
    },
    description: `**Sub-Inspector (SI)** is the officer who leads a police station's investigation work and supervises constables and head constables in Himachal Pradesh Police. It is one of the most respected uniformed posts open to graduates in the state, and every drive attracts a very large number of applicants.

The qualification is a **bachelor's degree** from a recognised university; the advertisement gives the age limit, physical standards, vacancies and the recruiting agency. The selection normally combines a **written objective test, physical standard and efficiency tests (PST/PET), a medical examination** and, where notified, an interview or personality test, with document verification. The exact order and the marks for each stage are stated in the notification.

SI written paper me **General Knowledge, Himachal GK, Reasoning, Quantitative Aptitude aur English/Hindi** ke questions aate hain. Graduate level ka paper hone ki wajah se constable se zyada difficulty hoti hai, isliye maths aur reasoning ki speed par zyada dhyan do. Physical tests ki taiyari bhi paper ke saath saath chalani padti hai.

**How to prepare:** start physical training early, give 2 to 3 hours daily to reasoning, maths and GK, revise Himachal GK topic by topic and take timed mocks every week. Begin with the free [HP Police Sub-Inspector mock test](${free("hp-police-sub-inspector-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the recruitment notification. Usual areas for the SI written test:

### General knowledge
- Current affairs: national and international
- Indian history, geography, polity, economy and general science
- **Himachal Pradesh GK:** history, geography, districts, culture, economy, current affairs

### Reasoning
- Verbal and non-verbal reasoning, series, analogy, classification
- Coding-decoding, blood relations, directions, puzzles

### Quantitative aptitude
- Number system, simplification, percentage, ratio, average
- Profit and loss, time and work, time and distance, data interpretation

### Language
- English: grammar, vocabulary, comprehension
- Hindi: vyakaran and comprehension

### Also check the notification for
- Physical standards (height, chest) and PET events
- Any paper on law or police procedure`,
    faqs: [
      {
        q: "HP Police SI ke liye qualification kya hai?",
        a: "Recognised university se bachelor's degree. Age limit, physical standards aur other conditions advertisement me hoti hain.",
      },
      {
        q: "What are the stages of HP Police SI selection?",
        a: "A written objective test, physical standard and efficiency tests, a medical examination and document verification, with an interview where the advertisement mentions one. The notification gives the order and marks.",
      },
      {
        q: "Is the SI exam tougher than the Constable exam?",
        a: "The SI paper is at graduation level, so reasoning, maths and English questions are generally harder than in the Constable paper. Himachal GK carries similar importance in both.",
      },
    ],
  },

  "hpbose/hp-tet": {
    seo: {
      title: "HP TET Mock Test {year} — Free HPBOSE TET Series (JBT, TGT)",
      description: "Free HP TET mock tests for JBT, TGT Arts, Medical and Non-Medical: child pedagogy, languages and subjects in real CBT format, with Hindi & English solutions.",
    },
    pattern: {
      sections: [{ name: "Objective MCQ paper (category-wise)", questions: 150, marks: 150 }],
      durationMin: 150,
      negativeMarking: "None",
      note: "A separate paper is held for each category: JBT, TGT Arts, TGT Non-Medical, TGT Medical, TGT Sanskrit, Hindi / Punjabi / Urdu Language Teacher and two Special Educator levels. For the November 2026 session the qualifying mark was reported as 60% (90 of 150) for General and 55% for SC/ST/OBC/PH. Confirm in the HPBOSE information bulletin.",
    },
  },

  "hp-revenue/patwari": {
    seo: {
      title: "HP Patwari Mock Test {year} — Free Online Test Series, Hindi",
      description: "Free HP Patwari mock tests: Himachal GK, general knowledge, reasoning, maths and Hindi in real CBT format. Hindi & English solutions and your HP rank.",
    },
  },

  "pgimer/nursing-officer": {
    seo: {
      title: "PGIMER Nursing Officer Mock Test {year} — Free NO Series",
      description: "Free PGIMER Nursing Officer mock tests: nursing subjects and general awareness in real CBT format, with Hindi & English solutions. Popular with HP nursing aspirants.",
    },
    description: `**Nursing Officer** at the **Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh**, is a central-institute nursing job, and PGIMER's own recruitment exam is popular with nursing graduates from Himachal Pradesh because Chandigarh is so close. This is not a Himachal government recruitment: PGIMER advertises and conducts its own online examination.

The qualification is normally a **B.Sc. Nursing** (or a GNM diploma with experience, as the notification allows) with registration with a State Nursing Council; the notification gives the age limit with category relaxation, the number of vacancies and the pay level. Selection is through a **computer-based test**; the number of questions, marking scheme and any later stage are given in the latest PGIMER notification.

Paper me **nursing subjects** ka bada hissa hota hai: fundamentals, medical-surgical nursing, community health, child health, midwifery aur mental health. Saath me general awareness ke kuch questions aate hain. Clinical scenarios aur drug-related questions ki practice zaroor karo.

**How to prepare:** revise standard nursing textbooks chapter by chapter, practise scenario-based MCQs and take timed mocks. Start with the free [PGIMER Nursing Officer mock test](${free("pgimer-nursing-officer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the PGIMER notification. Usual areas:

### Nursing subjects
- Fundamentals of nursing, first aid and nursing procedures
- Medical-surgical nursing and critical care
- Community health nursing and nutrition
- Child health (paediatric) nursing
- Obstetrics, gynaecology and midwifery
- Mental health nursing, pharmacology and microbiology basics
- Nursing education, administration and research

### General awareness
- Current affairs and general knowledge
- Basic English and reasoning`,
    faqs: [
      {
        q: "Is PGIMER Nursing Officer a Himachal government job?",
        a: "No. PGIMER is a central institute in Chandigarh with its own recruitment. Many Himachal nursing graduates apply because of the nearness and the pay.",
      },
      {
        q: "PGIMER Nursing Officer ke liye qualification kya hai?",
        a: "B.Sc. Nursing (ya GNM with experience jaisa notification me ho) aur Nursing Council me registration. Age limit aur experience notification me dekhein.",
      },
      {
        q: "What is the exam mode for PGIMER Nursing Officer?",
        a: "A computer-based test. The number of questions, negative marking and stages are in the latest PGIMER notification.",
      },
    ],
  },

  "hpsebl/junior-engineer-electrical": {
    seo: {
      title: "HPSEBL JE Electrical Mock Test {year} — Free Series",
      description: "Free HPSEBL Junior Engineer (Electrical) mock tests: electrical engineering subjects, Himachal GK and aptitude in real CBT format, with Hindi & English solutions.",
    },
    description: `**Junior Engineer (Electrical)** in the **Himachal Pradesh State Electricity Board Limited (HPSEBL), Shimla**, maintains and operates the power distribution network: sub-stations, transformers and lines. HPSEBL recruits its own staff through its notifications, separate from HPPSC and HPRCA. The qualification is a **diploma in electrical engineering**, and the advertisement states the age limit, vacancies and the selection stages.

For the exam, the electrical syllabus decides the merit; the general section is usually small.

JE (Electrical) paper me **electrical machines, power systems, circuits, measurements aur electrical safety** ka technical hissa sabse bada hota hai. Himachal ke hydropower projects aur HPSEBL ke network ki basic jaankari bhi helpful hoti hai.

**How to prepare:** revise diploma-level electrical engineering subject by subject, solve numericals on transformers, motors and power factor, and keep short notes on Himachal's hydropower. Start with the free [HPSEBL JE Electrical mock test](${free("hpsebl-junior-engineer-electrical-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPSEBL notification. Usual areas:

### Electrical engineering (diploma level)
- Circuit theory, AC and DC fundamentals, network theorems
- Electrical machines: DC machines, transformers, induction and synchronous machines
- Power systems: generation, transmission, distribution, switchgear and protection
- Electrical measurements and instruments
- Basic electronics, power electronics and control systems
- Electrical safety, earthing, estimating and costing
- Utilisation of electrical energy and illumination

### General section
- Himachal Pradesh GK and current affairs, hydropower of Himachal
- General knowledge, reasoning and English`,
    faqs: [
      {
        q: "HPSEBL JE Electrical ke liye qualification kya hai?",
        a: "Electrical engineering me diploma. Percentage aur age limit HPSEBL ke notification me di jaati hai.",
      },
      {
        q: "Is there an exam for HPSEBL apprentices?",
        a: "In the June 2026 apprentices notification (98 posts) selection was reported to be on academic merit without a written exam. Junior Engineer, Assistant Engineer and Lineman posts are separate recruitments.",
      },
      {
        q: "Does HPSEBL recruit through HPPSC or HPRCA?",
        a: "HPSEBL advertises its own posts on its website. Always read the HPSEBL notification for the recruiting agency and the process.",
      },
    ],
  },

  "hpsebl/assistant-engineer": {
    seo: {
      title: "HPSEBL Assistant Engineer Mock Test {year} — AE Electrical",
      description: "Free HPSEBL Assistant Engineer mock tests: electrical engineering, power systems and Himachal GK in real CBT format, with Hindi & English solutions.",
    },
    description: `**Assistant Engineer (AE)** in the **Himachal Pradesh State Electricity Board Limited (HPSEBL), Shimla**, plans and supervises the generation, transmission and distribution work of the Board. HPSEBL recruits its own engineers through its notifications. The qualification is a **B.E. / B.Tech in Electrical Engineering** (the notification lists the accepted branches), with the age limit, vacancies and selection stages stated in the advertisement.

The written test is at engineering-degree level, and the technical subjects decide merit. Candidates who also prepare for GATE find the syllabus overlaps heavily.

AE paper me **power systems, electrical machines, control systems, measurements, power electronics aur circuits** ke questions aate hain, saath me thoda general awareness aur Himachal GK. Hydropower aur transmission projects ki basic jaankari se interview aur objective dono me madad milti hai.

**How to prepare:** revise GATE-level electrical engineering, solve previous GATE and state-AE papers, and keep a short note on HPSEBL and Himachal's hydropower. Start with the free [HPSEBL Assistant Engineer mock test](${free("hpsebl-assistant-engineer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPSEBL notification. Usual areas:

### Electrical engineering (degree level)
- Electric circuits and network analysis
- Electrical machines: transformers, DC, induction and synchronous machines
- Power systems: transmission lines, load flow, stability, fault analysis, protection
- Control systems and signals
- Electrical and electronic measurements
- Power electronics and drives
- Utilisation of electrical energy, electrical safety and regulations

### General section
- Himachal Pradesh GK and current affairs
- Reasoning and English`,
    faqs: [
      {
        q: "HPSEBL AE ke liye qualification kya hai?",
        a: "Electrical engineering me B.E./B.Tech. Accepted branches, percentage aur age limit HPSEBL ke notification me hoti hain.",
      },
      {
        q: "Is HPSEBL AE the same as HPPSC AE?",
        a: "No. HPSEBL recruits its own Assistant Engineers, while AE posts of departments like PWD and Jal Shakti are advertised by HPPSC. See the [HPPSC Assistant Engineer](/hppsc/assistant-engineer) page for those.",
      },
      {
        q: "Does GATE preparation help for HPSEBL AE?",
        a: "Yes. The technical syllabus overlaps heavily with GATE Electrical, so GATE-level preparation covers most of the paper.",
      },
    ],
  },

  "hpsebl/lineman": {
    seo: {
      title: "HPSEBL Lineman Mock Test {year} — Free ITI Electrician Series",
      description: "Free HPSEBL Lineman mock tests: electrical trade basics, safety, Himachal GK and aptitude in real CBT format, with Hindi & English solutions.",
    },
    description: `**Lineman** in the **Himachal Pradesh State Electricity Board Limited (HPSEBL)** is the field worker who erects and repairs overhead lines, services consumer connections and restores power during faults. HPSEBL recruits through its own notifications. The qualification is generally an **ITI certificate in the Electrician or Lineman trade** with the schooling named in the advertisement; physical standards, age limit and selection stages are stated there.

Because the job is physical and risky, the advertisement may include a trade or physical test in addition to the written paper. Read the notification for the exact scheme.

Lineman paper me **ITI electrician trade ke basics** (Ohm's law, AC-DC, wiring, earthing, transformers, tools), **electrical safety** aur overhead line ki jaankari ke saath Himachal GK aur reasoning ke aasaan questions aate hain. Safety rules aur tools ke direct questions easy marks hote hain.

**How to prepare:** revise your ITI theory, learn standard colour codes, safety rules and line components, and practise basic maths and reasoning. Start with the free [HPSEBL Lineman mock test](${free("hpsebl-lineman-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPSEBL notification. Usual areas:

### Electrician trade (ITI level)
- Basic electricity: Ohm's law, power, AC and DC, series and parallel circuits
- Wiring, earthing, fuses and circuit breakers, cables and joints
- Transformers, motors and simple electrical machines
- Overhead lines, poles, insulators, conductors and line tools
- Electrical safety, first aid for electric shock and standard colour codes

### General section
- Himachal Pradesh GK and current affairs
- Basic mathematics and reasoning
- Hindi and English`,
    faqs: [
      {
        q: "Lineman ke liye qualification kya hai?",
        a: "Aam taur par ITI (Electrician ya Lineman trade) aur advertisement me bataya gaya school-level qualification. Physical standard aur age limit notification me hoti hai.",
      },
      {
        q: "Is there a physical or trade test for the Lineman post?",
        a: "Field posts often include a trade or physical test along with the written paper. The HPSEBL notification states whether one applies and how it is marked.",
      },
      {
        q: "Is electrical safety important in the Lineman exam?",
        a: "Yes. Direct questions on safety rules, earthing, protective equipment and first aid are common and are easy marks.",
      },
    ],
  },

  "hpscb/clerk": {
    seo: {
      title: "HPSCB Clerk Mock Test {year} — HP Cooperative Bank Series",
      description: "Free HP State Cooperative Bank Junior Clerk mock tests: reasoning, numerical ability, English, HP GK and the HP Cooperative Societies Act in real CBT format.",
    },
    description: `**Junior Clerk** at the **Himachal Pradesh State Cooperative Bank (HPSCB)** handles counter work, cash, accounts and customer records in the bank's branches. The 2026 recruitment (91 posts, applications from 9 to 29 May 2026) was announced under the PACS / OCS quota, which means it was open only to existing employees of Primary Agricultural Cooperative Societies and other Cooperative Societies of Himachal Pradesh who met the required years of service and held a bachelor's degree. It was not an open recruitment for fresh graduates, so read the eligibility in every new notification.

Selection was through an **online written examination** conducted through IBPS, followed by document verification, with no interview.

HPSCB paper me **Reasoning, Numerical Ability, English, General Awareness (Himachal GK ke saath) aur HP Cooperative Societies Act and Rules** ke sections aate hain. Cooperative Societies Act wala section is exam ki pehchan hai, aur banking-style speed test hone ki wajah se time management important hai.

**How to prepare:** practise banking-style reasoning and quant daily, revise English grammar and comprehension, learn the HP Cooperative Societies Act and Rules from the bare text, and take timed mocks. Start with the free [HPSCB Clerk mock test](${free("hpscb-clerk-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPSCB notification. The 2026 paper had these sections:

### Reasoning
- Series, analogy, coding-decoding, blood relations, directions
- Syllogism, puzzles and seating arrangement, inequality

### Numerical ability
- Simplification, percentage, ratio, average, interest
- Profit and loss, time and work, data interpretation

### English language
- Reading comprehension, grammar, cloze test, error spotting
- Vocabulary and sentence improvement

### General awareness
- Banking and current affairs, Himachal Pradesh GK

### HP Cooperative Societies Act and Rules
- Registration, management and membership of societies
- Audit, inspection, disputes and the role of the Registrar`,
    pattern: {
      sections: [
        { name: "Reasoning", questions: 30, marks: 30 },
        { name: "Numerical ability", questions: 30, marks: 30 },
        { name: "English language", questions: 30, marks: 30 },
        { name: "General awareness (including HP GK)", questions: 30, marks: 30 },
        { name: "HP Cooperative Societies Act and Rules", questions: 30, marks: 30 },
      ],
      durationMin: null,
      negativeMarking: "",
      note: "As reported for the 2026 Junior Clerk recruitment (online test through IBPS, no interview). Duration, negative marking and stages are in the HPSCB notification.",
    },
    faqs: [
      {
        q: "Who can apply for HPSCB Junior Clerk?",
        a: "The 2026 recruitment was open to existing employees of PACS and OCS in Himachal Pradesh with a bachelor's degree and the required years of service, not to fresh graduates. Check each notification for the quota and eligibility.",
      },
      {
        q: "How many Junior Clerk posts did HPSCB advertise in 2026?",
        a: "HPSCB advertised 91 Junior Clerk posts, with online applications from 9 to 29 May 2026. Confirm new drives on the HPSCB website.",
      },
      {
        q: "Is there an interview in the HPSCB Junior Clerk selection?",
        a: "The 2026 selection was based on the online written exam and document verification, with no interview. Check the latest notification.",
      },
    ],
  },

  "hp-high-court/clerk": {
    seo: {
      title: "HP High Court Clerk Mock Test {year} — Free Online Series",
      description: "Free High Court of Himachal Pradesh Clerk mock tests: English, Hindi, Himachal GK, reasoning, maths and computer in real CBT format, with solutions.",
    },
    description: `**Clerk** in the **High Court of Himachal Pradesh, Shimla** is a ministerial post in the High Court registry and its subordinate courts, handling files, records, typing and court paperwork. The High Court recruits its own staff and accepts applications on its recruitment portal, hphcrecruitment.in. In August 2026 the High Court advertised 388 posts in total, including 141 Clerk posts, with applications open from 10 August to 10 September 2026.

The 2026 Clerk eligibility was a **bachelor's degree with basic computer knowledge and a typing speed of 30 wpm in English and 25 wpm in Hindi**. The selection stages, marks and syllabus are given in the High Court's notification; read it before applying and keep a close watch on the portal.

High Court clerk exams usually test **English, Hindi, General Knowledge including Himachal GK, reasoning, maths and computer basics**. Courts mein kaam English drafting aur accuracy ka hota hai, isliye English grammar aur comprehension par sabse zyada dhyan do.

**How to prepare:** strengthen English and Hindi, practise typing daily, revise Himachal GK and basic computer, and take timed mocks. Start with the free [HP GK mock test](${FREE_MOCK_HREF}) and the [HPRCA Clerk free mock](${free("hprca-clerk-free-mock-1")}), which cover the same style of questions.`,
    syllabus: `The syllabus and marks are given in the High Court notification. Subjects usually tested for clerical posts:

### Language
- English: grammar, vocabulary, comprehension, error spotting, drafting
- Hindi: vyakaran, shabd-gyan, comprehension

### General knowledge
- Himachal Pradesh GK and current affairs
- General knowledge, polity and basic legal awareness

### Aptitude
- Logical reasoning and mental ability
- Basic mathematics and data handling

### Computer and typing
- Computer fundamentals, MS Office, internet
- English and Hindi typing speed as notified`,
    faqs: [
      {
        q: "HP High Court Clerk ke liye qualification kya hai?",
        a: "2026 notification me bachelor's degree, basic computer knowledge aur typing speed (English 30 wpm, Hindi 25 wpm) maangi gayi thi. Latest conditions High Court ke notification me dekhein.",
      },
      {
        q: "How many Clerk posts did the High Court advertise in 2026?",
        a: "The August 2026 notification advertised 141 Clerk posts among 388 posts overall, with applications from 10 August to 10 September 2026 on hphcrecruitment.in. Confirm on the portal.",
      },
      {
        q: "Is the High Court clerk recruitment done by HPRCA?",
        a: "No. The High Court of Himachal Pradesh recruits its own staff and receives applications on its recruitment portal.",
      },
    ],
  },

  "hp-high-court/stenographer": {
    seo: {
      title: "HP High Court Stenographer Mock Test {year} — Free Series",
      description: "Free High Court of Himachal Pradesh Stenographer Grade-III mock tests: English, Himachal GK, reasoning and computer in real CBT format, with solutions.",
    },
    description: `**Stenographer Grade-III** in the **High Court of Himachal Pradesh, Shimla** takes dictation from judges and officers and prepares the typed orders and letters of the court. The High Court recruits its own staff through its portal hphcrecruitment.in. The August 2026 notification advertised 79 Stenographer Grade-III posts among 388 posts overall, with applications open from 10 August to 10 September 2026.

The qualification, the shorthand and typing speed required and the selection stages are in the High Court's notification. Stenography posts normally include a skill test in addition to the written paper, so shorthand and typing practice should run alongside the theory.

Written paper me **English (grammar aur comprehension), General Knowledge, Himachal GK, reasoning aur computer awareness** aate hain. English par pakad sabse zaroori hai kyunki court ki language aur dictation dono English me hote hain; Hindi shorthand ki zarurat notification me dekho.

**How to prepare:** build your shorthand and typing speed to the notified level, revise English grammar and legal vocabulary, and take timed mocks for the written paper. Start with the free [HP GK mock test](${FREE_MOCK_HREF}).`,
    syllabus: `The syllabus and skill-test standard are in the High Court notification. Usual areas:

### Written test
- English: grammar, vocabulary, comprehension, error spotting
- Himachal Pradesh GK and current affairs
- General knowledge and basic legal awareness
- Reasoning and basic mathematics
- Computer fundamentals and MS Office

### Skill test
- Shorthand dictation and transcription at the notified speed
- Typing speed in English (and Hindi where notified)`,
    faqs: [
      {
        q: "Stenographer Grade-III me shorthand speed kitni chahiye?",
        a: "Exact shorthand aur typing speed High Court ke notification me di jaati hai. Notification padhkar usi level tak practice karein.",
      },
      {
        q: "How many Stenographer posts did the High Court advertise in 2026?",
        a: "The August 2026 notification advertised 79 Stenographer Grade-III posts among 388 posts overall. Confirm on hphcrecruitment.in.",
      },
      {
        q: "Is there a skill test for the High Court Stenographer?",
        a: "Stenography posts normally include a shorthand and typing skill test. The High Court notification states the standard and how it is marked.",
      },
    ],
  },

  "hp-high-court/process-server": {
    seo: {
      title: "HP High Court Process Server Mock Test {year} — Free Series",
      description: "Free High Court of Himachal Pradesh Process Server mock tests: Himachal GK, general knowledge, reasoning, maths and Hindi in real CBT format, with solutions.",
    },
    description: `**Process Server** in the **High Court of Himachal Pradesh and its subordinate courts** delivers the summons, notices and orders issued by the court to the people concerned and returns the proof of service. The August 2026 High Court notification advertised 65 Process Server posts among 388 posts overall, with applications on hphcrecruitment.in from 10 August to 10 September 2026.

The qualification, the age limit and the selection method are in the High Court's notification, so read it before applying; some court posts are decided on marks and documents, others on a written test.

Jab written test hota hai, to usme **Himachal GK, General Knowledge, reasoning, basic maths aur Hindi/English** ke aasaan questions aate hain. Preparation ke liye roz thoda GK revision aur practice mocks kaafi hote hain.

**How to prepare:** revise Himachal GK in the form of short notes, practise reasoning and basic maths for speed and take a mock test every week. Start with the free [HP GK mock test](${FREE_MOCK_HREF}).`,
    syllabus: `The syllabus (if a written test is held) is in the High Court notification. Usual areas for this level:

### General knowledge
- Himachal Pradesh GK: history, geography, districts, culture, current affairs
- General knowledge and general science

### Aptitude
- Basic reasoning and mental ability
- Basic mathematics: simplification, percentage, ratio, average

### Language
- Hindi and English at matriculation level`,
    faqs: [
      {
        q: "Process Server ka kaam kya hota hai?",
        a: "Court ke summons, notices aur orders sambandhit logon tak pahunchana aur service ka proof court me wapas dena.",
      },
      {
        q: "How many Process Server posts did the High Court advertise in 2026?",
        a: "The August 2026 notification advertised 65 Process Server posts among 388 posts overall. Confirm on hphcrecruitment.in.",
      },
      {
        q: "Is there a written exam for Process Server?",
        a: "It depends on the notification. Some court posts are decided on marks and documents, others on a written test. Read the High Court notification for the selection method.",
      },
    ],
  },
};
