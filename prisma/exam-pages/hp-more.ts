import type { ExamPages } from "./types";

// Exams added after the first catalogue: Naib Tehsildar, HP SET, Lab Assistant, Anganwadi Supervisor, KCCB / JCCB Clerk,
// HP Current Affairs and the other HP Police posts (Head Constable, Driver Constable). None of them has a confirmed 2026
// notification in our records, so the copy states what the post is and what the paper usually covers, and sends readers to
// the official advertisement for dates, vacancies, age and fees. No pattern is given: the figures are not known.

const free = (slug: string) => `/tests/${slug}`;

export const HP_MORE_PAGES: ExamPages = {
  "hppsc/naib-tehsildar": {
    seo: {
      title: "Naib Tehsildar Mock Test {year} — HP Revenue Exam Free Test",
      description: "Free Naib Tehsildar mock test for Himachal Pradesh: land revenue records, Himachal GK, general studies, reasoning, maths and English, with Hindi & English solutions.",
    },
    description: `**Naib Tehsildar** is a revenue officer of the Himachal Pradesh Revenue Department who works under the Tehsildar. The post looks after land records, mutation (intkal), crop inspection (girdawari), certificates and the collection of land revenue in a tehsil or sub-tehsil, and it is a stepping stone to Tehsildar and the higher revenue service.

**Current status:** we could not confirm a Naib Tehsildar advertisement for 2026 at the time of writing. The qualification, age limit, selection stages and the recruiting agency are fixed by the advertisement and the department's recruitment and promotion rules, so read the official notice on hppsc.hp.gov.in, hprca.hp.gov.in and the Revenue Department site before you apply.

Naib Tehsildar paper me **Himachal GK aur revenue knowledge** ka weight sabse zyada hota hai: land records ke naam (jamabandi, khasra, girdawari, intkal, fard), revenue hierarchy, aur Himachal ke land laws. Iske saath general studies, reasoning, maths aur English/Hindi aate hain.

**How to prepare:** learn the revenue terms and the officer hierarchy first, because they repeat in every paper; revise Himachal history, geography and administration; then practise reasoning and maths daily. Start with the free [Naib Tehsildar mock test](${free("hppsc-naib-tehsildar-free-mock-1")}), and use the [Himachal GK page](/himachal) for the state topics.`,
    syllabus: `The detailed syllabus is in the official advertisement. Usual areas:

### Revenue and land records
- Revenue hierarchy: Patwari, Kanungo, Naib Tehsildar, Tehsildar, SDM, Deputy Commissioner
- Land records: jamabandi, khasra, girdawari, intkal (mutation), fard, shajra
- Himachal land laws in outline: land revenue, tenancy and land reforms

### Himachal Pradesh GK
- History, geography, rivers, districts, culture and fairs
- Economy, polity and administration

### General studies
- Indian polity, history, geography and economy
- General science and current affairs

### Reasoning, maths and language
- Series, coding-decoding, directions, blood relations
- Percentage, ratio, average, mensuration, simple interest
- English and Hindi grammar and vocabulary`,
    faqs: [
      { q: "Naib Tehsildar ke liye kaun si degree chahiye?", a: "Qualification, age aur selection stages advertisement me likhe hote hain. Pichhli bharti ka notice dekhkar taiyari shuru karein, lekin apply karne se pehle latest notification zaroor check karein." },
      { q: "What is the difference between a Naib Tehsildar and a Tehsildar?", a: "Both work in the tehsil's revenue office. The Tehsildar heads the tehsil and the Naib Tehsildar assists, handling a sub-tehsil or a part of the revenue work; Tehsildar is the higher post." },
      { q: "Which revenue terms should I learn first?", a: "Jamabandi (record of rights), khasra (plot number), girdawari (crop inspection), intkal (mutation), fard (copy of record) and shajra (map or family tree). These come up in almost every revenue paper." },
    ],
  },

  "hpu/hp-set": {
    seo: {
      title: "HP SET Mock Test {year} — Free Paper I Practice Test Series",
      description: "Free HP SET Paper I mock test: teaching aptitude, research aptitude, reasoning and general awareness in CBT format, with Hindi & English solutions and ranks.",
    },
    description: `**HP SET** is the State Eligibility Test for the post of Assistant Professor in colleges and universities of Himachal Pradesh. It is conducted by **Himachal Pradesh University, Shimla**, and, like the national UGC-NET, it checks eligibility for assistant professor posts rather than giving a job directly.

**Current status:** the date, application window and subject list of the next HP SET are announced by the University, so we do not state them here. Read the information brochure on hpuniv.ac.in for the eligibility marks, fee, subjects and the exact pattern before applying.

The test has two papers. **Paper I is common for every candidate** and covers **teaching aptitude, research aptitude, reasoning, comprehension and general awareness**; Paper II is the subject paper chosen by the candidate. This free mock is built for Paper I, which is the same logic as UGC-NET Paper I, so it is also useful if you are preparing for NET.

**How to prepare:** learn the teaching-aptitude topics (learner characteristics, methods of teaching, evaluation, Bloom's taxonomy), the research basics (hypothesis, sampling, types of research) and then practise reasoning and general awareness daily. Start with the free [HP SET Paper I mock test](${free("hpu-hp-set-free-mock-1")}).`,
    syllabus: `The official syllabus is in the University brochure. Paper I areas:

### Teaching aptitude
- Teaching: nature, objectives, characteristics and basic requirements
- Learner characteristics and methods of teaching, teaching aids and ICT
- Evaluation: formative and summative, measurement of learning

### Research aptitude
- Meaning and types of research, steps of research
- Hypothesis, sampling, data collection, thesis writing and research ethics

### Reasoning and comprehension
- Verbal and numerical reasoning, series, syllogism
- Reading comprehension

### General awareness
- Higher education in India, national education policy
- Environment, people and development, general knowledge`,
    faqs: [
      { q: "HP SET kaun conduct karta hai?", a: "HP SET ka aayojan Himachal Pradesh University, Shimla karti hai. Date aur brochure university ki website par aate hain." },
      { q: "Is Paper I of HP SET the same as UGC-NET Paper I?", a: "The two are very similar: teaching aptitude, research aptitude, reasoning, comprehension and general awareness. Always follow the syllabus given in the HP SET brochure." },
      { q: "Does clearing HP SET give a government job?", a: "No. It gives eligibility for the post of assistant professor; the appointment is made separately through the recruiting body's selection process." },
    ],
  },

  "hprca/lab-assistant": {
    seo: {
      title: "HPRCA Lab Assistant Mock Test {year} — Science Series, Free",
      description: "Free Lab Assistant mock test for Himachal Pradesh: physics, chemistry, biology, maths and Himachal GK in real CBT format, with Hindi & English solutions.",
    },
    description: `**Lab Assistant** is a technical support post in school and college laboratories of Himachal Pradesh. The Lab Assistant prepares apparatus and chemicals for practicals, keeps the laboratory stock and records, follows safety rules and helps students and teachers during experiments.

**Current status:** we could not confirm a Lab Assistant advertisement for 2026 at the time of writing. The recruiting body, qualification, age limit and selection stages are given in the advertisement of the relevant department, so check hprca.hp.gov.in and the department notice before applying.

Lab Assistant paper science-based hota hai: **physics, chemistry aur biology ke 10+2 level ke basics**, laboratory safety aur apparatus ki pehchan, saath me **maths aur Himachal GK**. Concept clear rakhne wale students ko yahan fayda milta hai, kyunki questions seedhe NCERT level ke hote hain.

**How to prepare:** revise NCERT science of classes 9 to 12, make short notes of units, formulas and chemical formulae, learn common lab apparatus and safety rules, and practise maths daily. Start with the free [Lab Assistant mock test](${free("hprca-lab-assistant-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the official advertisement. Usual areas:

### Physics
- Mechanics, heat, light, sound, electricity and magnetism
- Units and measurements, simple apparatus

### Chemistry
- Atomic structure, periodic table, acids, bases and salts
- Chemical reactions, common compounds and formulae

### Biology
- Cell, human body, plants and ecology
- Health, nutrition and common diseases

### Laboratory knowledge
- Apparatus, chemicals and their safe storage
- Laboratory safety and first aid

### Maths and Himachal GK
- Average, ratio, percentage and basic algebra
- Himachal geography, history and polity`,
    faqs: [
      { q: "Lab Assistant ke liye qualification kya hoti hai?", a: "Aam taur par science ke saath 10+2 maangi jaati hai, lekin exact qualification advertisement me likhi hoti hai. Apply karne se pehle latest notification dekhein." },
      { q: "Which science level are the questions?", a: "Mostly school science up to class 10+2, based on NCERT books, plus laboratory apparatus and safety." },
      { q: "Is there negative marking in the Lab Assistant exam?", a: "That depends on the advertisement. Our free mock uses 0.25 negative marking for practice; always check the official pattern." },
    ],
  },

  "hp-wcd/anganwadi-supervisor": {
    seo: {
      title: "Anganwadi Supervisor Mock Test {year} — Himachal Free Series",
      description: "Free HP Anganwadi Supervisor mock test: ICDS, child nutrition, Himachal GK, general studies, reasoning, Hindi and English in CBT format with solutions.",
    },
    description: `**Anganwadi Supervisor** (Mukhya Sevika) oversees a group of Anganwadi centres under the **Integrated Child Development Services (ICDS)** scheme of the Women and Child Development Department, Himachal Pradesh. The supervisor visits the centres, checks supplementary nutrition, pre-school education, immunisation and health services, trains Anganwadi workers and keeps the records of the sector.

**Current status:** we could not confirm an Anganwadi Supervisor advertisement for 2026 at the time of writing. The department's notification gives the qualification, age limit, selection method and any quota for experienced Anganwadi workers, so read it on the department site and hprca.hp.gov.in before applying.

Is paper me **ICDS, bal vikas, nutrition aur mahila-bal kalyan yojanaon** ke questions aate hain, saath me Himachal GK, general studies, reasoning aur Hindi/English. ICDS ki six services, Poshan Abhiyaan, vitamins aur deficiency diseases yaad rakhna scoring hai.

**How to prepare:** learn the six ICDS services, the major child and women welfare schemes and basic nutrition, revise Himachal GK and general studies, and take timed mocks. Start with the free [Anganwadi Supervisor mock test](${free("hp-wcd-anganwadi-supervisor-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the official advertisement. Usual areas:

### ICDS and child development
- ICDS: launch, objectives and the six services
- Growth and development of children, early childhood care and education
- Poshan Abhiyaan and other child and women welfare schemes

### Nutrition and health
- Nutrients, vitamins and deficiency diseases
- Breastfeeding, immunisation, mother and child health

### Himachal Pradesh GK
- History, geography, districts, culture and administration

### General studies
- Indian polity, geography and general science
- Current affairs

### Reasoning and language
- Series, analogy, ranking and direction sense
- Hindi and English grammar and vocabulary`,
    faqs: [
      { q: "Anganwadi Supervisor ka kaam kya hota hai?", a: "Supervisor kai Anganwadi centres ki nigrani karta hai: poshan aahar, pre-school shiksha, tikakaran aur health services ki jaanch, aur Anganwadi workers ki training." },
      { q: "What are the six services of ICDS?", a: "Supplementary nutrition, pre-school non-formal education, nutrition and health education, immunisation, health check-up and referral services." },
      { q: "Can Anganwadi workers apply for the Supervisor post?", a: "Some drives keep a quota or relaxation for experienced Anganwadi workers. It depends on the advertisement, so read the eligibility section of the latest notification." },
    ],
  },

  "kccb-jccb/clerk": {
    seo: {
      title: "KCCB JCCB Clerk Mock Test {year} — Cooperative Bank Free Series",
      description: "Free KCCB and JCCB Clerk mock test: banking and cooperative awareness, quantitative aptitude, reasoning, English and Himachal GK in CBT format with solutions.",
    },
    description: `The **Kangra Central Co-operative Bank (KCCB)** and the **Jogindra Central Co-operative Bank (JCCB)** are district central cooperative banks in Himachal Pradesh. They recruit **Clerks** (and other staff) for their branches, where the clerk handles counter work, cash, deposits, loan records and customer service.

**Current status:** we could not confirm a KCCB or JCCB Clerk advertisement for 2026 at the time of writing. Each bank publishes its own notification with the vacancies, qualification, age limit and the written test, and the exam may be conducted through an outside agency, so check the bank's official website. Do not confuse these banks with the Himachal Pradesh State Cooperative Bank, whose clerk exam has its own page: [HPSCB Clerk](/hpscb/clerk).

The written test is usually a banking-style objective paper with **reasoning, numerical ability, English, general awareness (banking and cooperative awareness) and Himachal GK**. Cooperative banking basics, such as the three-tier credit structure and the role of NABARD, are asked often.

**How to prepare:** practise banking-style reasoning and quant daily, revise English grammar, study cooperative banking and RBI basics, and take timed mocks. Start with the free [KCCB / JCCB Clerk mock test](${free("kccb-jccb-clerk-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in each bank's notification. Usual areas:

### Reasoning
- Series, analogy, coding-decoding, blood relations
- Inequality, syllogism, puzzles and seating arrangement

### Numerical ability
- Simplification, percentage, ratio, average
- Interest, profit and loss, time and work, data interpretation

### English language
- Grammar, vocabulary, comprehension and error spotting

### Banking and cooperative awareness
- RBI, monetary policy terms, banking basics
- Cooperative banking: three-tier structure, PACS, NABARD, cooperative laws

### Himachal Pradesh GK
- Geography, history, districts and current affairs of the state`,
    faqs: [
      { q: "KCCB aur JCCB kya hain?", a: "Ye Himachal ke district central cooperative banks hain: Kangra Central Co-operative Bank (KCCB) aur Jogindra Central Co-operative Bank (JCCB). Dono apni bharti alag nikalte hain." },
      { q: "Is this the same exam as the HPSCB Clerk?", a: "No. HPSCB is the State Cooperative Bank and has its own recruitment. The paper style is similar, so the preparation is largely common." },
      { q: "Which topics are special to cooperative bank exams?", a: "The three-tier cooperative credit structure, PACS, NABARD and cooperative laws, apart from the usual banking awareness, reasoning, quant and English." },
    ],
  },

  "hp-gk-ca/current-affairs": {
    seo: {
      title: "HP Current Affairs Mock Test {year} — Free Himachal Quiz",
      description: "Free Himachal Pradesh current affairs mock test: state landmarks, recognitions and national and international events in CBT format, with Hindi & English solutions.",
    },
    description: `**Current affairs** is a scoring section in every Himachal Pradesh recruitment exam: HPAS, Clerk, Patwari, Police, JBT, TGT and the rest all ask questions on recent events of the state, the country and the world. This page is for practising those questions in exam format.

Each mock mixes **Himachal Pradesh current affairs and landmarks** with **national and international events**: projects, awards, laws, sports, summits and recognitions. We keep to events that have already taken place, so the answers stay correct, and each solution explains the fact in Hindi and English.

Current affairs ka asli tareeka hai: **last 6 to 12 months ki ghatnayein** padhna aur unhe topic-wise (state, national, international, sports, awards, schemes) yaad karna. Roz ka thoda time dene se paper ke 8 se 12 marks surakshit ho jaate hain. Important: exam ke 2 se 3 hafte pehle tak ki news bhi dekhein, kyunki is page ke tests fixed hain aur latest news ko cover nahi karte.

**How to prepare:** read a monthly current affairs summary, note down the places, persons, dates and numbers, and revise them weekly. Start with the free [HP Current Affairs mock test](${free("hp-current-affairs-free-mock-1")}), then take the free [Himachal GK mock tests](/himachal) for the static part.`,
    syllabus: `Current affairs has no fixed syllabus. Usual areas:

### Himachal Pradesh
- State government schemes, projects and policies
- Awards, recognitions, festivals, fairs and tourism
- Appointments, institutions and infrastructure (roads, tunnels, hydro projects)

### National
- Laws and amendments, schemes and missions
- Appointments, awards, reports and indices
- Science, space and technology

### International
- Summits, organisations and agreements
- Sports events and records

### Static link
- Dates, places and background facts that the news refers to`,
    faqs: [
      { q: "Himachal ke exams me current affairs ke kitne questions aate hain?", a: "Har exam me alag hota hai, par aam taur par 5 se 15 questions state aur national current affairs ke hote hain. Pattern ke liye apne exam ki notification dekhein." },
      { q: "How recent are the questions in these mocks?", a: "The free mock covers events that have already taken place and will not change. For the latest months, read a current affairs summary alongside the mocks." },
      { q: "Are these tests useful for HPAS and Clerk both?", a: "Yes. State and national current affairs are common to all HP exams; the difficulty is higher in HPAS." },
    ],
  },

  "hp-police/head-constable": {
    seo: {
      title: "HP Police Head Constable Mock Test {year} — Free Series",
      description: "Free HP Police Head Constable mock test: Himachal GK, general studies, reasoning, maths, English and computer basics in CBT format, with Hindi & English solutions.",
    },
    description: `**Head Constable** is a non-gazetted rank above Constable in Himachal Pradesh Police. Head Constables supervise constables, handle station-level records and writing work and assist the Sub-Inspector in investigation and law and order duties. The ministerial or clerical stream of the rank also does office and computer work.

**Current status:** we could not confirm a Head Constable advertisement for 2026 at the time of writing. The post may be filled by direct recruitment or by promotion, and the qualification, physical standards and selection stages are given in the advertisement, so check hppolice.gov.in and hprca.hp.gov.in before you apply.

Head Constable ke written paper me aam taur par **Himachal GK, general knowledge, reasoning, maths aur English/Hindi** aate hain, aur clerical posts me **computer basics** bhi. Level constable se thoda upar hota hai, isliye reasoning aur maths ki speed par dhyan dein. Physical tests ki taiyari saath me chalate rahein.

**How to prepare:** revise Himachal GK topic by topic, give daily time to reasoning and maths, practise English and Hindi grammar, and take timed mocks. Related exams: [Police Constable](/hp-police/constable) and [Sub-Inspector](/hp-police/sub-inspector). Start with the free [Head Constable mock test](${free("hp-police-head-constable-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the official advertisement. Usual areas:

### Himachal Pradesh GK
- History, geography, rivers, districts, culture and administration

### General studies
- Indian polity, history, geography and general science
- Basics of criminal law and current affairs

### Reasoning
- Series, analogy, coding-decoding, direction sense
- Clock and calendar, odd one out

### Mathematics
- Percentage, ratio, speed and distance, average, simple interest

### English, Hindi and computer
- Grammar, vocabulary and comprehension
- Computer fundamentals and MS Office basics`,
    faqs: [
      { q: "Head Constable aur Constable me kya antar hai?", a: "Head Constable constable se upar ka rank hai: wo constables ki nigrani karta hai aur station ke records aur likhit kaam sambhalta hai. Bharti aur promotion dono raaste ho sakte hain." },
      { q: "Is there a physical test for Head Constable?", a: "That depends on the stream and the advertisement. Direct recruitment to uniformed posts usually includes physical standard and efficiency tests; check the latest notification." },
      { q: "Can I use Constable preparation for Head Constable?", a: "Yes, Himachal GK, reasoning and maths are common. Add computer basics and aim for a slightly higher difficulty level." },
    ],
  },

  "hp-police/driver-constable": {
    seo: {
      title: "HP Police Driver Constable Mock Test {year} — Free Series",
      description: "Free HP Police Driver Constable mock test: Himachal GK, reasoning, maths, road signs, Motor Vehicles Act and vehicle knowledge, with Hindi & English solutions.",
    },
    description: `**Driver Constable** is the Himachal Pradesh Police post for constables who drive police vehicles. Along with the usual constable duties, the driver must hold a valid driving licence, know the traffic rules and keep the vehicle in good running order.

**Current status:** we could not confirm a Driver Constable advertisement for 2026 at the time of writing. The qualification, the type of driving licence required, the physical standards, the driving test and the written paper are all given in the advertisement, so check hppolice.gov.in and hprca.hp.gov.in before you apply.

Is exam ka paper constable jaisa hota hai (Himachal GK, general knowledge, reasoning, maths), par saath me **driving aur vehicle ka gyan** bhi poochha ja sakta hai: **road signs, Motor Vehicles Act, engine ke parts aur basic maintenance**. Written test ke baad driving test aur physical test bhi hote hain, isliye dono ki taiyari saath rakhein.

**How to prepare:** learn the road signs and the basics of the Motor Vehicles Act, understand how a petrol and a diesel engine work, and prepare the constable subjects (Himachal GK, reasoning, maths). Related exams: [Police Constable](/hp-police/constable) and [Head Constable](/hp-police/head-constable). Start with the free [Driver Constable mock test](${free("hp-police-driver-constable-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the official advertisement. Usual areas:

### Himachal Pradesh GK
- History, geography, rivers, districts, roads and passes

### General studies
- Indian polity and geography, general science

### Reasoning and mathematics
- Series, direction sense, analogy
- Speed, distance and time, ratio, average, percentage

### Road safety
- Road signs and signals, traffic rules
- Motor Vehicles Act, driving licence and documents

### Vehicle knowledge
- Engine types and working, cooling, fuel and braking systems
- Basic maintenance and first aid`,
    faqs: [
      { q: "Driver Constable ke liye driving licence zaroori hai?", a: "Haan, aam taur par valid driving licence (heavy ya light vehicle, post ke hisaab se) maanga jaata hai. Exact requirement advertisement me hoti hai." },
      { q: "Is there a driving test in the selection?", a: "Driver posts normally include a driving or trade test in addition to the written paper and physical tests. Check the stage list in the notification." },
      { q: "What do road-safety questions cover?", a: "Road signs and signals, traffic rules, the Motor Vehicles Act and basic vehicle knowledge such as engine working, cooling and braking." },
    ],
  },
};
