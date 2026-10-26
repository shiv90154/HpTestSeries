import type { ExamPages } from "./types";

// National defence entries (UPSC NDA and CDS, IAF AFCAT) shown on every site. Patterns match prisma/defence/index.ts;
// vacancies and dates change every cycle, so the copy points to the official notification for them.

export const DEFENCE_PAGES: ExamPages = {
  "upsc/nda": {
    seo: {
      title: "NDA Mock Test {year} — Maths and GAT Online Practice",
      description: "NDA & NA mock tests for Paper I Mathematics and Paper II General Ability Test: full-length UPSC pattern, negative marking and detailed solutions.",
    },
    description: `The **National Defence Academy and Naval Academy (NDA & NA) examination** is held by the **Union Public Service Commission (UPSC)** twice a year to select candidates for the Army, Navy and Air Force wings of the NDA and for the Indian Naval Academy course. Unmarried candidates who have passed or are appearing in Class 12 can apply; the Air Force and Navy wings need Physics and Mathematics in Class 12. Exact age limits, vacancies and dates are in each UPSC notification on upsc.gov.in.

The written exam has two papers. **Paper I Mathematics** has 120 questions for 300 marks in 2½ hours. **Paper II General Ability Test (GAT)** has 150 questions for 600 marks in 2½ hours: Part A English (200 marks) and Part B General Knowledge (400 marks) covering physics, chemistry, general science, history, geography and current events. Every wrong answer costs one-third of that question's marks. Candidates who clear the written cut-off go to the **SSB interview** of 900 marks, followed by the medical exam.

Written exam UPSC ka OMR paper hai, par speed aur accuracy dono chahiye: maths me 120 sawal 150 minute me, aur GAT me lamba GK portion. Negative marking ki wajah se guess karne se pehle soch lo.

**How to prepare:** finish Class 11 and 12 maths topics one by one, revise physics and chemistry basics for GAT, read the newspaper daily for current events, and take one full maths and one full GAT mock every week under the real time limit.`,
    syllabus: `UPSC publishes the full syllabus with every notification. In brief:

### Paper I: Mathematics (300 marks)
- Algebra, matrices and determinants
- Trigonometry and its applications
- Analytical geometry of two and three dimensions
- Differential calculus and integral calculus, differential equations
- Vector algebra
- Statistics and probability

### Paper II: General Ability Test (600 marks)
- Part A English: grammar and usage, vocabulary, comprehension and cohesion in extended text
- Part B General Knowledge: physics, chemistry, general science, history and the freedom movement, geography, current events`,
    faqs: [
      {
        q: "How many papers are there in the NDA written exam?",
        a: "Two: Paper I Mathematics (120 questions, 300 marks) and Paper II General Ability Test (150 questions, 600 marks), each 2½ hours.",
      },
      {
        q: "Is there negative marking in NDA?",
        a: "Yes. One-third of a question's marks is deducted for each wrong answer: 0.83 in Mathematics and 1.33 in GAT.",
      },
      {
        q: "NDA ke liye kaun apply kar sakta hai?",
        a: "Unmarried candidates jo Class 12 pass hain ya de rahe hain. Air Force aur Navy wing ke liye Class 12 me Physics aur Maths zaroori hai. Age limit har notification me di hoti hai.",
      },
      {
        q: "What comes after the NDA written exam?",
        a: "Candidates above the written cut-off are called for the SSB interview (900 marks), then a medical exam. The final merit list adds the written and SSB marks.",
      },
    ],
  },
  "upsc/cds": {
    seo: {
      title: "CDS Mock Test {year} — English, GK and Maths Practice",
      description: "CDS mock tests for English, General Knowledge and Elementary Mathematics on the UPSC pattern, for IMA, INA, AFA and OTA aspirants, with solutions.",
    },
    description: `The **Combined Defence Services (CDS) examination** is held by the **Union Public Service Commission (UPSC)** twice a year for entry to the **Indian Military Academy (IMA)**, **Indian Naval Academy (INA)**, **Air Force Academy (AFA)** and **Officers' Training Academy (OTA)**. It is a graduate-level exam: IMA and OTA take any graduate, INA needs an engineering degree, and AFA needs a degree with Physics and Mathematics at Class 12 or an engineering degree. Age limits, vacancies and dates are in each notification on upsc.gov.in.

For IMA, INA and AFA there are three papers: **English**, **General Knowledge** and **Elementary Mathematics**, each of 100 marks and 2 hours. OTA candidates sit only English and General Knowledge. Each wrong answer costs one-third of the question's marks. Those who clear the written cut-off go to the **SSB interview**, then the medical exam.

CDS ka maths Class 10 level ka hai, isliye speed aur accuracy par focus karo. English me vocabulary aur comprehension, aur GK me current affairs aur static GK dono roz padho.

**How to prepare:** build vocabulary daily, practise Class 10 arithmetic, algebra, geometry and mensuration for speed, revise history, geography, polity and science for GK, and take full timed mocks of each paper every week.`,
    syllabus: `UPSC publishes the full syllabus with every notification. In brief:

### English (100 marks)
- Grammar, vocabulary and usage
- Comprehension and sentence arrangement

### General Knowledge (100 marks)
- Current events, history, geography, polity and economy
- General science, including everyday observation and experience

### Elementary Mathematics (100 marks; not for OTA)
- Arithmetic: number system, percentage, ratio, time and work, interest
- Algebra, trigonometry, geometry and mensuration
- Statistics`,
    faqs: [
      {
        q: "How many papers are there in CDS?",
        a: "Three for IMA, INA and AFA: English, General Knowledge and Elementary Mathematics, each 100 marks and 2 hours. OTA candidates take only English and General Knowledge.",
      },
      {
        q: "Is there negative marking in CDS?",
        a: "Yes. One-third of the marks of a question is deducted for each wrong answer.",
      },
      {
        q: "CDS ka maths kis level ka hota hai?",
        a: "Matriculation (Class 10) level: arithmetic, algebra, trigonometry, geometry, mensuration aur statistics.",
      },
      {
        q: "Who can apply for CDS?",
        a: "Graduates. INA needs an engineering degree; AFA needs a degree with Physics and Mathematics at Class 12, or an engineering degree. Age limits are in each UPSC notification.",
      },
    ],
  },
  "iaf/afcat": {
    seo: {
      title: "AFCAT Mock Test {year} — Full-Length Online Practice",
      description: "AFCAT mock tests on the real pattern: 100 questions, 300 marks, 2 hours, +3/−1 marking, covering GA, verbal ability, numerical ability and reasoning.",
    },
    description: `The **Air Force Common Admission Test (AFCAT)** is held by the **Indian Air Force** twice a year to select officers for the **Flying Branch** and the **Ground Duty (Technical and Non-Technical)** branches. It is an online test for graduates; the Flying Branch also needs Physics and Mathematics at Class 12. Age limits, branches, vacancies and dates are in each notification on afcat.cdac.in.

The online exam has **100 questions for 300 marks in 2 hours**. Each correct answer gives 3 marks and each wrong answer deducts 1. Questions cover **General Awareness, Verbal Ability in English, Numerical Ability, and Reasoning and Military Aptitude**. Ground Duty Technical candidates also sit the Engineering Knowledge Test (EKT). Candidates who clear the cut-off go to the **AFSB** interview, and Flying Branch candidates also take the CPSS.

AFCAT me sawal aasaan se medium hote hain, par 100 sawal 120 minute me karne hain aur galat jawab pe 1 number katta hai. Isliye accuracy sabse zaroori hai.

**How to prepare:** read current affairs and defence news daily, practise vocabulary and comprehension, revise arithmetic for speed, solve reasoning and spatial questions every day, and take a full timed mock every week.`,
    syllabus: `The Indian Air Force publishes the syllabus with every notification. In brief:

### General Awareness
- History, geography, polity, economy, sports, art and culture
- Current affairs and defence news, basic science

### Verbal Ability in English
- Comprehension, error detection, sentence completion
- Synonyms, antonyms, idioms and phrases

### Numerical Ability
- Decimals, fractions, percentage, ratio and proportion, average
- Profit and loss, simple and compound interest, time and work, speed and distance

### Reasoning and Military Aptitude
- Verbal and non-verbal reasoning, spatial ability`,
    faqs: [
      {
        q: "What is the AFCAT exam pattern?",
        a: "100 questions for 300 marks in 2 hours, online. Each correct answer gives 3 marks and each wrong answer deducts 1.",
      },
      {
        q: "AFCAT kitni baar hota hai?",
        a: "Saal me do baar. Har cycle ki dates aur vacancies afcat.cdac.in par notification me aati hain.",
      },
      {
        q: "What is EKT in AFCAT?",
        a: "The Engineering Knowledge Test, an extra paper only for candidates who apply for the Ground Duty (Technical) branch.",
      },
      {
        q: "What happens after AFCAT?",
        a: "Candidates above the cut-off are called to the Air Force Selection Board (AFSB). Flying Branch candidates also take the CPSS, followed by a medical exam.",
      },
    ],
  },
};
