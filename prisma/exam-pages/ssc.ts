import type { ExamPages } from "./types";

// Staff Selection Commission exams (docs/SSC-TEST-SERIES-PLAN.md). The SSC changes patterns, dates and vacancies between
// drives, so this copy sticks to facts that outlive one notification and points to ssc.gov.in. No `pattern` is given
// anywhere: seed one only after reading the current notice (the plan marks every figure as unverified until then).
// These exams are seeded hidden (prisma/catalogue.ts) and published in their phase, once mocks exist.

const NOT_AFFILIATED = "We are a private practice platform and are not affiliated with the Staff Selection Commission.";

export const SSC_PAGES: ExamPages = {
  "ssc/gd-constable": {
    seo: {
      title: "SSC GD Constable Mock Test {year} — Free, Hindi & English",
      description:
        "SSC GD Constable mock tests in the real CBT format: reasoning, GK, maths and Hindi or English. Free first mock, Hindi & English solutions and sectional tests.",
    },
    description: `**SSC GD Constable** is the Staff Selection Commission's recruitment for General Duty constables in the Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB), the Assam Rifles (Rifleman GD), the Special Security Force (SSF) and Sepoy in the NCB. It is open to candidates who have passed Class 10, and it is one of the biggest recruitments in the country by number of applicants.

Selection is a **computer-based examination (CBE)**, followed by a **physical efficiency test (PET)** and **physical standard test (PST)**, a medical examination and document verification. In recent drives the paper had four parts, **reasoning, general knowledge and awareness, elementary mathematics, and English or Hindi**, with negative marking for wrong answers. The vacancies, age limit, height, chest and race standards (which differ by state and category) and the exact pattern are in the notice on ssc.gov.in, so confirm them there.

Reasoning and maths are scoring if you build speed, and general knowledge rewards steady revision of static GK, polity, geography, science and current affairs. Because the physical test comes after the written one, start your running practice early and use mock tests to fix your accuracy in the CBE.

**How to prepare:** take a full mock every few days under exam conditions, review every wrong answer with its solution, and use the sectional tests for your weakest part. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas for the GD Constable CBE are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Non-verbal reasoning, mirror and water images, counting of figures
- Syllogism, Venn diagrams and mathematical operations

### General knowledge & general awareness
- History, polity, geography and economy of India
- General science up to Class 10
- Static GK: books and authors, awards, sports, important days
- Current affairs of national and international importance

### Elementary mathematics
- Number system, simplification, decimals and fractions
- Percentage, ratio and proportion, average, profit and loss
- Interest, time and work, time and distance
- Basic mensuration, geometry and data interpretation

### English / Hindi
- Comprehension, error spotting and sentence improvement
- Fill in the blanks, synonyms and antonyms, idioms and phrases
- Candidates attempt one language part, English or Hindi`,
    faqs: [
      {
        q: "SSC GD Constable ke liye minimum qualification kya hai?",
        a: "Class 10 (matric) pass. Age limit, relaxation and physical standards har notification me diye jate hain, isliye ssc.gov.in par latest notice zaroor padhein.",
      },
      {
        q: "What happens after the SSC GD written test?",
        a: "Shortlisted candidates take the physical efficiency test and physical standard test, then a medical examination and document verification. The qualifying standards differ by category, gender and state, and are given in the notice.",
      },
      {
        q: "Can I choose Hindi instead of English in SSC GD?",
        a: "In recent drives the language part could be attempted in either English or Hindi. Check the current notice for the rule, and practise the language you will choose.",
      },
      {
        q: "Is there negative marking in SSC GD?",
        a: "Yes. A fixed fraction of a mark is deducted for each wrong answer. The exact deduction is stated in the notice, so check it before you decide how many questions to guess.",
      },
    ],
  },

  "ssc/chsl": {
    seo: {
      title: "SSC CHSL Mock Test {year} — Tier 1 & Tier 2, Free First Mock",
      description:
        "SSC CHSL (10+2) mock tests in the real CBT format: reasoning, GA, quantitative aptitude and English. Free first mock, Hindi & English solutions and sectionals.",
    },
    description: `**SSC CHSL (Combined Higher Secondary Level)** recruits Lower Division Clerks and Junior Secretariat Assistants, Data Entry Operators and Postal and Sorting Assistants for central government offices. It is open to candidates who have passed Class 12, and each year lakhs of candidates compete for a few thousand vacancies.

The selection has **Tier 1**, a computer-based objective test that decides who moves ahead, and **Tier 2**, which has its own sections and a skill or typing test for the posts that need one. In recent drives Tier 1 had four parts, **reasoning, general awareness, quantitative aptitude and English**, with negative marking. The vacancies, dates, age limits and the current Tier 2 scheme are in the notice on ssc.gov.in, and SSC has changed the Tier 2 scheme before, so read the latest notice.

Tier 1 is a race against time: the paper is long, so the winning plan is to pick the sections you are strongest in first and keep accuracy high. Regular full mocks teach you that rhythm better than any amount of untimed practice.

**How to prepare:** take a full-length mock every few days and analyse every wrong answer with its solution. Start with the free [SSC CHSL Tier 1 Full Mock Test 1](/tests/ssc-chsl-tier-1-full-mock-1) to see the real format with a timer, question palette and Hindi-English switch. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas for CHSL Tier 1 are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism, Venn diagrams, clock and calendar
- Non-verbal reasoning and figure series

### General awareness
- History, polity, geography and economy of India
- General science up to Class 12
- Static GK: books and authors, awards, sports, important days
- Current affairs of national and international importance

### Quantitative aptitude
- Number system, simplification, percentage, ratio and average
- Profit and loss, interest, time and work, time and distance
- Mensuration, geometry and basic trigonometry
- Data interpretation

### English language
- Reading comprehension and cloze test
- Error spotting, sentence improvement and para jumbles
- Vocabulary: synonyms, antonyms, idioms and one-word substitution`,
    faqs: [
      {
        q: "SSC CHSL ke liye qualification kya chahiye?",
        a: "Class 12 pass. Kuch posts ke liye subject ya marks ki shart ho sakti hai, aur age limit har notification me di jati hai. Latest notice ssc.gov.in par dekhein.",
      },
      {
        q: "What are the tiers in SSC CHSL?",
        a: "Tier 1 is a computer-based objective test. Tier 2 has further sections, and posts such as Data Entry Operator and LDC/JSA add a typing or skill test. The scheme has been revised in the past, so confirm it in the current notice.",
      },
      {
        q: "Which posts can I get through SSC CHSL?",
        a: "Lower Division Clerk and Junior Secretariat Assistant, Data Entry Operator, and Postal Assistant and Sorting Assistant, in central government offices and departments.",
      },
    ],
  },

  "ssc/cpo": {
    seo: {
      title: "SSC CPO SI Mock Test {year} — Paper 1 & Paper 2, Free Mock",
      description:
        "SSC CPO Sub-Inspector mock tests for Delhi Police and CAPF in the real CBT format: reasoning, GK, maths and English. Free first mock, Hindi & English solutions.",
    },
    description: `**SSC CPO** recruits Sub-Inspectors in Delhi Police, the Central Armed Police Forces (such as BSF, CRPF, CISF, ITBP and SSB) and, in some drives, Sub-Inspector (Fire) in CISF. It is open to graduates, and the post is among the most respected uniformed jobs available through a central examination.

The selection has a **Paper 1** computer-based test, a **physical standard test and physical endurance test (PST/PET)**, a **Paper 2** on English language and comprehension, and finally a medical examination. In recent drives Paper 1 covered **reasoning, general knowledge and awareness, quantitative aptitude and English**, with negative marking. Candidates who clear Paper 1 are called for the physical test, and only those who qualify there sit Paper 2. The vacancies, age limits, physical standards and the current pattern are in the notice on ssc.gov.in.

Because the physical test comes between the two papers, you need to prepare for both the written test and the running, long jump and shot put. Mock tests help you keep Paper 1 accuracy up while your physical preparation takes most of your day.

**How to prepare:** take a full mock every few days in exam conditions, review every wrong answer with its solution, and use sectional tests for your weakest part. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas for CPO Paper 1 are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism, Venn diagrams, clock and calendar

### General knowledge & general awareness
- History, polity, geography and economy of India
- General science and static GK
- Current affairs of national and international importance

### Quantitative aptitude
- Number system, simplification, percentage, ratio and average
- Profit and loss, interest, time and work, time and distance
- Algebra, geometry, mensuration and trigonometry
- Data interpretation

### English comprehension
- Reading comprehension and cloze test
- Error spotting, sentence improvement and para jumbles
- Vocabulary, idioms and one-word substitution`,
    faqs: [
      {
        q: "SSC CPO me kaun si posts milti hain?",
        a: "Delhi Police me Sub-Inspector, CAPF (BSF, CRPF, CISF, ITBP, SSB) me Sub-Inspector, aur kuch drives me CISF me Sub-Inspector (Fire). Vacancies notification me di jati hain.",
      },
      {
        q: "What is the selection process for SSC CPO?",
        a: "Paper 1, then the physical standard and endurance tests, then Paper 2 on English, then a medical examination. Only candidates who qualify at each step move to the next.",
      },
      {
        q: "Is SSC CPO open to graduates only?",
        a: "Yes, a bachelor's degree from a recognised university is the usual qualification. The notice states the age limit, relaxations and any extra condition for a post.",
      },
    ],
  },

  "ssc/cgl": {
    seo: {
      title: "SSC CGL Mock Test {year} — Tier 1 & Tier 2, Free First Mock",
      description:
        "SSC CGL mock tests in the real CBT format for Tier 1 and Tier 2: reasoning, GA, maths and English. Free first mock, Hindi & English solutions and sectionals.",
    },
    description: `**SSC CGL (Combined Graduate Level)** is the Staff Selection Commission's flagship examination for Group B and Group C posts in central government: Assistant Section Officer, Inspector (Income Tax, Central Excise, Preventive Officer, Examiner), Auditor, Accountant, Junior Statistical Officer, Tax Assistant and more. It is open to graduates, and a few thousand vacancies draw lakhs of candidates, so it is one of the most competitive exams in the country.

The selection has **Tier 1**, a qualifying computer-based test, and **Tier 2**, which decides your merit and has separate papers and sections, including a computer-knowledge module and a typing test for the posts that require it. Tier 1 covers **reasoning, general awareness, quantitative aptitude and English** with negative marking. SSC rewrote the Tier 2 scheme in 2023, so check the current notice on ssc.gov.in for the papers, marks and which posts need which paper.

Speed and accuracy in quantitative aptitude and English decide most results, because those carry the most marks in Tier 2. Regular full mocks teach you to manage time across sections, which is the skill the exam tests as much as knowledge.

**How to prepare:** take a full-length mock every few days, review every wrong answer with its solution, and use sectional tests to lift your weakest subject. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism, Venn diagrams, matrices and non-verbal reasoning

### General awareness
- History, polity, geography and economy of India
- General science and static GK
- Current affairs of national and international importance

### Quantitative aptitude
- Arithmetic: percentage, ratio, profit and loss, interest, time and work
- Algebra, geometry, mensuration and trigonometry
- Data interpretation and data sufficiency

### English comprehension
- Reading comprehension and cloze test
- Error spotting, sentence improvement and para jumbles
- Vocabulary, idioms and one-word substitution`,
    faqs: [
      {
        q: "SSC CGL ke liye qualification kya hai?",
        a: "Zyadatar posts ke liye graduation. Kuch posts (jaise Junior Statistical Officer, Assistant Audit Officer) ke liye extra shart hoti hai. Details notification me hoti hain.",
      },
      {
        q: "Is Tier 1 of SSC CGL counted in the final merit?",
        a: "In the current scheme Tier 1 is qualifying and decides who is called for Tier 2, which decides the merit. Confirm this in the latest notice, because SSC has changed the scheme before.",
      },
      {
        q: "Which posts can I get through SSC CGL?",
        a: "Assistant Section Officer, Inspector (Income Tax, Central Excise, Preventive Officer, Examiner), Auditor, Accountant, Junior Statistical Officer, Tax Assistant and other Group B and C posts.",
      },
    ],
  },

  "ssc/mts": {
    seo: {
      title: "SSC MTS & Havaldar Mock Test {year} — Free First Mock",
      description:
        "SSC MTS and Havaldar mock tests in the real CBT format: numerical ability, reasoning, general awareness and English. Free first mock, Hindi & English solutions.",
    },
    description: `**SSC MTS (Multi Tasking Staff) and Havaldar** is the Staff Selection Commission's recruitment for Group C non-technical posts in central government offices, and Havaldar in CBIC (Customs and Central Excise) and CBN (Narcotics). It is open to candidates who have passed Class 10, so it draws a very large pool of applicants every year.

The selection is a **computer-based test with two sessions**, covering **numerical and mathematical ability, reasoning, general awareness and English**. In recent drives the two sessions were held on the same day and were marked differently, with negative marking applying in one of them, and Havaldar candidates also take a **physical efficiency test and physical standard test**. The vacancies, state-wise numbers, age limits and the current pattern are in the notice on ssc.gov.in, and SSC has changed the details between drives.

The papers are of Class 10 level, so accuracy and speed matter more than depth. Mock tests that follow the session structure help you plan how much time to give each section.

**How to prepare:** take a full mock every few days in exam conditions, review every wrong answer with its solution, and use the sectional tests for your weakest part. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas are:

### Numerical & mathematical ability
- Number system, simplification, decimals and fractions
- Percentage, ratio, average, profit and loss, simple and compound interest
- Time and work, time and distance, basic mensuration

### Reasoning ability
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Non-verbal reasoning, mirror and water images

### General awareness
- History, polity, geography and economy of India
- General science up to Class 10
- Static GK and current affairs

### English language
- Reading comprehension and cloze test
- Error spotting, fill in the blanks and sentence improvement
- Synonyms, antonyms, idioms and one-word substitution`,
    faqs: [
      {
        q: "SSC MTS aur Havaldar me kya fark hai?",
        a: "Dono ka written test same hota hai. Havaldar ke candidates ko uske baad physical efficiency test aur physical standard test dena padta hai. Details notification me hoti hain.",
      },
      {
        q: "What is the qualification for SSC MTS?",
        a: "Class 10 (matric) pass. The age limit and relaxations are in the notice on ssc.gov.in.",
      },
      {
        q: "Are there state-wise vacancies in SSC MTS?",
        a: "Yes. SSC publishes vacancies by state and union territory with the notice, and the cut-off can also differ by state. Read the notice for the numbers for your state.",
      },
    ],
  },

  "ssc/selection-post": {
    seo: {
      title: "SSC Selection Post Mock Test {year} — Matric, 10+2 & Graduate",
      description:
        "SSC Selection Post mock tests for Matriculation, Higher Secondary and Graduate level in the CBT format. Free first mock, Hindi & English solutions.",
    },
    description: `**SSC Selection Post** is the Staff Selection Commission's recruitment for a large number of posts in central government ministries, departments and offices that do not have their own examination. Posts are advertised for three educational levels: **Matriculation (Class 10), Higher Secondary (Class 12) and Graduate and above**. The Selection Post examination is held in phases, and each phase has its own notice.

Each level has a **computer-based test** covering **reasoning, general awareness, quantitative aptitude and English**, with negative marking, and the difficulty rises with the level. Some posts add a skill test, a typing test or a document check. A phase lists hundreds of posts, each with its own qualification, age limit and location, so the first job of a candidate is to pick the posts they are eligible for. The posts, dates and pattern are in the notice on ssc.gov.in.

Because the same four subjects appear at every level, one disciplined plan works for all of them: build speed in maths and reasoning, revise static GK, and read English every day. Mock tests at your level show where your time goes.

**How to prepare:** take a full mock every few days, review every wrong answer with its solution, and use sectional tests for your weakest part. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas at every level are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism, Venn diagrams and non-verbal reasoning

### General awareness
- History, polity, geography and economy of India
- General science and static GK
- Current affairs of national and international importance

### Quantitative aptitude
- Arithmetic: percentage, ratio, profit and loss, interest, time and work
- Algebra, geometry and mensuration
- Data interpretation (graduate level)

### English language
- Reading comprehension and cloze test
- Error spotting and sentence improvement
- Vocabulary, idioms and one-word substitution`,
    faqs: [
      {
        q: "SSC Selection Post me kitne levels hote hain?",
        a: "Teen: Matriculation (10th), Higher Secondary (12th) aur Graduate and above. Har post ke liye apna level notification me diya jata hai.",
      },
      {
        q: "How often is the SSC Selection Post exam held?",
        a: "It is held in numbered phases, usually one a year. Each phase has its own notice with the posts, vacancies and dates, so check ssc.gov.in for the current one.",
      },
      {
        q: "How do I find the posts I can apply for?",
        a: "The notice has a post-wise list with the qualification, age limit and location of each post. Check each against your own details before you apply.",
      },
    ],
  },

  "ssc/stenographer": {
    seo: {
      title: "SSC Stenographer Mock Test {year} — Grade C & D, Free Mock",
      description:
        "SSC Stenographer Grade C and D mock tests in the CBT format: reasoning, general awareness and English. Free first mock, Hindi & English solutions.",
    },
    description: `**SSC Stenographer Grade C and Grade D** recruits stenographers for central government ministries, departments and offices. It is open to candidates who have passed Class 12, and Grade C is the senior of the two grades, with a higher age limit and pay.

The selection has a **computer-based test** followed by a **qualifying skill test in shorthand**. In recent drives the paper covered **reasoning, general awareness and English language**, with negative marking, and English carried half of the paper. Candidates who clear the written test take the skill test, where they take dictation at a speed fixed for the grade (higher for Grade C) and transcribe it in the time allowed. The vacancies, age limits, dictation speeds and the current pattern are in the notice on ssc.gov.in.

Our tests prepare you for the written paper. Shorthand is a skill you build with daily dictation practice, and a mock test cannot replace that, so plan separate time for it. As English is the biggest part of the paper, steady reading and grammar practice pays off most.

**How to prepare:** take a full mock every few days, review every wrong answer with its solution, and use the English sectional tests for your weakest area. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. The usual areas for the written test are:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism and non-verbal reasoning

### General awareness
- History, polity, geography and economy of India
- General science and static GK
- Current affairs of national and international importance

### English language & comprehension
- Reading comprehension and cloze test
- Error spotting, sentence improvement and para jumbles
- Vocabulary, synonyms, antonyms, idioms and one-word substitution
- Spelling and grammar`,
    faqs: [
      {
        q: "SSC Stenographer me Grade C aur Grade D me kya fark hai?",
        a: "Written test same hota hai, lekin skill test me dictation speed Grade C ke liye zyada hoti hai, aur age limit aur pay bhi alag hote hain. Details notification me hoti hain.",
      },
      {
        q: "Does this test series cover the shorthand skill test?",
        a: "No. Our mock tests prepare you for the written computer-based test. The shorthand skill test needs daily dictation practice, which you build separately.",
      },
      {
        q: "What is the qualification for SSC Stenographer?",
        a: "Class 12 pass. The age limit for each grade and the relaxations are in the notice on ssc.gov.in.",
      },
    ],
  },

  "ssc/je": {
    seo: {
      title: "SSC JE Mock Test {year} — Civil, Electrical & Mechanical",
      description:
        "SSC Junior Engineer mock tests for Civil, Electrical and Mechanical in the CBT format: reasoning, GA and engineering. Hindi & English solutions.",
    },
    description: `**SSC JE (Junior Engineer)** recruits Junior Engineers in **Civil, Electrical and Mechanical** (and, for some departments, Quantity Surveying and Contracts) for central government organisations such as CPWD, MES, the Central Water Commission, BRO and others. It is open to candidates with a diploma or degree in the relevant engineering branch, as the notice specifies for each post.

The selection has two computer-based papers. **Paper 1** covers **general intelligence and reasoning, general awareness and general engineering** in the chosen branch, with negative marking, and **Paper 2** is a further paper on the engineering subject. The vacancies, age limits, qualification for each department and the current pattern are in the notice on ssc.gov.in, and whether Paper 1 counts in the final merit depends on the scheme in force, so read the latest notice.

General engineering carries the largest share of marks in Paper 1, so a strong grip on your branch fundamentals decides the result. Reasoning and general awareness are the scoring balance, and regular mocks teach you to divide your time between the three.

**How to prepare:** revise the core subjects of your branch, take full mocks under exam conditions, and review every wrong answer with its solution. ${NOT_AFFILIATED}`,
    syllabus: `The SSC notice carries the official syllabus. Paper 1 covers:

### General intelligence & reasoning
- Analogy, classification, series and coding-decoding
- Blood relations, directions, ranking and order
- Syllogism, Venn diagrams and non-verbal reasoning

### General awareness
- History, polity, geography and economy of India
- General science and static GK
- Current affairs of national and international importance

### General engineering: Civil & structural
- Building materials, estimating, costing and surveying
- Soil mechanics, hydraulics and irrigation engineering
- Structural analysis and design of RCC and steel structures

### General engineering: Electrical
- Basic electrical engineering, circuit laws and network theorems
- Machines, transformers and measuring instruments
- Power systems, switchgear and basic electronics

### General engineering: Mechanical
- Thermodynamics, heat transfer and fluid mechanics
- Theory of machines, machine design and strength of materials
- Production engineering, IC engines and refrigeration`,
    faqs: [
      {
        q: "SSC JE ke liye qualification kya hai?",
        a: "Related branch me diploma ya degree, department aur post ke hisaab se. Har department ki qualification notification me alag di jati hai.",
      },
      {
        q: "Which branches does SSC JE recruit for?",
        a: "Civil, Electrical and Mechanical, and for some departments Quantity Surveying and Contracts. Each department advertises its own posts.",
      },
      {
        q: "Does Paper 1 count in the final merit of SSC JE?",
        a: "That depends on the scheme in the current notice, which has changed between drives. Read the latest notice on ssc.gov.in before you plan your preparation.",
      },
    ],
  },
};
