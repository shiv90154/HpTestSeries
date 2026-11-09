import type { PostSeed } from "./types";

// Blog posts for the exams added after the first catalogue (Naib Tehsildar, HP SET, Lab Assistant, Anganwadi Supervisor,
// KCCB / JCCB Clerk, Head Constable, Driver Constable), plus the HP Police 2026 drive, HPRCA Clerk 2026, HP current
// affairs and result guidance. Facts come from news and coaching-site reports gathered on 9 November 2026, not from the
// official PDFs, so each post says "reports ke mutabik" where it quotes a figure and sends the reader to the official
// site. Where sources disagreed (vacancy counts, deadlines) the post gives no number.

const free = (slug: string) => `/tests/${slug}`;

export const HP_MORE_POSTS: PostSeed[] = [
  {
    slug: "hp-naib-tehsildar-recruitment-2026-status-eligibility-syllabus",
    seoTitle: "HP Naib Tehsildar Recruitment 2026: Status, Syllabus, Prep",
    seoDescription: "HP Naib Tehsildar 2026: no statewide notification yet, district re-engagement drives only. Revenue terms, syllabus areas and how to prepare with a free mock.",
    title: "HP Naib Tehsildar Recruitment 2026: Current Status, Syllabus and How to Prepare",
    titleHi: "हिमाचल नायब तहसीलदार भर्ती 2026: स्थिति, सिलेबस और तैयारी",
    excerpt: "Naib Tehsildar ki bharti ka abhi ka status, revenue terms jo har paper me aate hain, syllabus ke areas aur taiyari ka plan.",
    category: "NOTIFICATION",
    exams: ["hppsc/naib-tehsildar"],
    content: `**Naib Tehsildar** Himachal ke Revenue Department ka officer hota hai jo Tehsildar ke neeche land records, intkal (mutation), girdawari aur certificates ka kaam dekhta hai.

## Abhi ka status (9 November 2026)

Reports ke mutabik 2026 me **koi statewide Naib Tehsildar notification nahi mili**. Jo mila wo ye hai:

- Kuch districts (jaise **Solan** aur **Hamirpur**) ne vacant Naib Tehsildar posts ke liye **re-engagement (remuneration basis)** par offline applications maangi thi. Ye temporary engagement hai, regular bharti nahi.
- **HPAS 2026** ke 22 posts me Tehsildar shamil hai, lekin Naib Tehsildar nahi.

Regular bharti aane par qualification, age aur selection stages usi notification me honge, isliye hppsc.hp.gov.in aur hprca.hp.gov.in par nazar rakhein.

## Revenue terms jo har paper me aate hain

| Term | Matlab |
|---|---|
| Jamabandi | Record of rights, zameen ke maalik ka record |
| Khasra | Plot number |
| Girdawari | Fasal ka inspection record |
| Intkal | Mutation, maalikana badalna |
| Fard | Record ki copy |
| Shajra | Map ya family tree |

Hierarchy: Patwari, Kanungo, Naib Tehsildar, Tehsildar, SDM, Deputy Commissioner.

## Taiyari kaise karein

1. Revenue terms aur hierarchy pakki karo, ye sabse aasan marks hain.
2. Himachal GK topic-wise revise karo: [Himachal GK page](/himachal).
3. Reasoning aur maths ko roz 45 minute do.
4. Syllabus areas ke liye [Naib Tehsildar syllabus](/hppsc/naib-tehsildar/syllabus) dekhein.

Shuruaat [free Naib Tehsildar mock](${free("hppsc-naib-tehsildar-free-mock-1")}) se karein. Related: [HP Patwari](/hp-revenue/patwari).`,
    faqs: [
      { q: "Kya 2026 me Naib Tehsildar ki statewide bharti aayi hai?", a: "Reports ke mutabik nahi. Kuch districts ne temporary re-engagement ke liye applications li thi. Regular bharti ke liye official notification ka intezaar karein." },
      { q: "Naib Tehsildar aur Tehsildar me kya antar hai?", a: "Tehsildar tehsil ka head hota hai, Naib Tehsildar uske neeche revenue kaam sambhalta hai. Tehsildar ucchh post hai." },
    ],
  },

  {
    slug: "hp-set-2026-exam-date-syllabus-paper-1-preparation",
    seoTitle: "HP SET 2026: Exam Date, Paper I Syllabus and Preparation",
    seoDescription: "HP SET 2026 was reported for 7 June as an offline test. Paper I syllabus (teaching and research aptitude), eligibility basics and a free Paper I mock test.",
    title: "HP SET 2026: Exam Date, Paper I Syllabus, Pattern and How to Prepare",
    titleHi: "एचपी सेट 2026: परीक्षा तिथि, पेपर 1 सिलेबस और तैयारी",
    excerpt: "HP SET ka 2026 schedule jo reports me aaya, Paper I ka syllabus aur aane wale session ki taiyari kaise shuru karein.",
    category: "EXAM_DATE",
    exams: ["hpu/hp-set"],
    content: `**HP SET** (State Eligibility Test) Himachal ke colleges aur universities me **Assistant Professor** banne ki eligibility test hai. Ye khud job nahi deta.

## 2026 session: reports kya kehti hain

Zyadatar reports ke mutabik 2026 ka HP SET **7 June 2026 (Sunday)** ko **offline** mode me hona tha, aur ye sirf **10 districts** me (Kinnaur aur Lahaul-Spiti ko chhodkar). Kai reports ke mutabik is baar test **HPPSC** ne conduct kiya, jabki pehle ke editions Himachal Pradesh University karti thi. Application dates aur result dates par sources aapas me match nahi karte, isliye hum yahan wo dates nahi de rahe. Sahi jaankari ke liye **hppsc.hp.gov.in** aur **hpuniv.ac.in** dekhein.

## Paper I (sab ke liye common)

| Area | Topics |
|---|---|
| Teaching aptitude | Teaching ke objectives, learner characteristics, methods, evaluation, ICT |
| Research aptitude | Research ke types, hypothesis, sampling, thesis writing, ethics |
| Reasoning | Verbal aur numerical reasoning, syllogism, series |
| Comprehension | Passage based questions |
| General awareness | Higher education, NEP, environment, general knowledge |

Paper II aapke subject ka hota hai. Detailed syllabus ke liye [HP SET syllabus](/hpu/hp-set/syllabus) dekhein.

## Taiyari

1. Paper I pe pehle 3 hafte do, kyunki ye sab candidates ke liye common hai aur UGC-NET Paper I jaisa hai.
2. Teaching aptitude me Bloom's taxonomy aur evaluation types pakke karo.
3. Research me hypothesis aur sampling ke types ratte nahi, example se samjho.
4. Roz 20 reasoning questions timer ke saath.

[Free HP SET Paper I mock](${free("hpu-hp-set-free-mock-1")}) se apna level check karein.`,
    faqs: [
      { q: "HP SET kaun conduct karta hai?", a: "Reports ke mutabik 2026 ka test HPPSC ne conduct kiya; pehle ke editions Himachal Pradesh University karti thi. Latest notification official site par dekhein." },
      { q: "Kya HP SET clear karne par job milti hai?", a: "Nahi, ye sirf Assistant Professor ki eligibility deta hai. Appointment alag selection process se hoti hai." },
    ],
  },

  {
    slug: "hp-police-constable-2026-exam-pattern-selection-stages",
    seoTitle: "HP Police Constable 2026: Exam Pattern and Selection Stages",
    seoDescription: "HP Police Constable 2026 as reported: PST and PET first, then a written test of about 90 questions. Subjects, qualifying marks and what to confirm on hppsc.hp.gov.in.",
    title: "HP Police Constable 2026: Exam Pattern, Selection Stages and Subjects",
    titleHi: "एचपी पुलिस कांस्टेबल 2026: परीक्षा पैटर्न और चयन प्रक्रिया",
    excerpt: "HP Police Constable 2026 ke selection stages, written test ka reported pattern aur subjects, aur kaun si cheezein notification se confirm karni hain.",
    category: "EXAM_PATTERN",
    exams: ["hp-police/constable"],
    content: `Is post me HP Police Constable 2026 ka **reported** pattern hai. Sources aapas me kuch jagah alag hain, isliye final figures ke liye **hppsc.hp.gov.in** par notification dekhein.

## Selection stages

Reports ke mutabik order ye hai:

1. **Physical Standard Test (PST)**: height aur chest
2. **Physical Efficiency Test (PET)**: running aur doosre events
3. **Written exam**: sirf PST/PET clear karne walon ke liye
4. **Document verification aur medical**

## Written exam (reported)

| Detail | Reported |
|---|---|
| Questions | 90 MCQ |
| Marks | 90 (1 mark each) |
| Subjects | General Awareness, English, Hindi, Mathematics, Logical Reasoning |
| Split | 20 questions each in GA, English, Hindi, Maths; 10 in Reasoning |
| Qualifying marks | Ek source ke mutabik 50% General/OBC, 40% SC/ST |

Mode (OMR ya CBT), negative marking aur bonus marks ke baare me sources match nahi karte, isliye unhe notification se confirm karein.

## Taiyari

Himachal GK General Awareness ka bada hissa hai, isliye [Himachal GK](/himachal) ko pehle revise karo. Hindi aur English me grammar, maths me percentage, ratio aur average. Physical ki practice paper ki taiyari ke saath chalate raho.

[Constable mock tests](/hp-police/constable) aur [free Himachal GK mock](/tests/hp-police-constable-free-mock-1) se practice karein.`,
    faqs: [
      { q: "Kya HP Police Constable me interview hota hai?", a: "Ek report ke mutabik is bharti me interview nahi hai aur final merit written exam par based hai. Notification me confirm karein." },
      { q: "Physical test pehle hota hai ya written?", a: "Reports ke mutabik PST aur PET pehle hote hain, aur written exam unke baad un candidates ke liye." },
    ],
  },

  {
    slug: "hp-police-constable-2026-physical-test-dates-written-exam",
    seoTitle: "HP Police Constable 2026: Physical Test Dates, Written Exam",
    seoDescription: "HP Police Constable 2026 physical tests were reported from 22 October to 5 December. The written exam date was not announced. How to check your admit card.",
    title: "HP Police Constable 2026: Physical Test Dates and Written Exam Update",
    titleHi: "एचपी पुलिस कांस्टेबल 2026: फिजिकल टेस्ट तिथि और लिखित परीक्षा",
    excerpt: "Physical test ki reported dates, written exam ki sthiti aur admit card check karne ka tareeka, 9 November 2026 tak ki jaankari ke saath.",
    category: "EXAM_DATE",
    exams: ["hp-police/constable", "hp-police/driver-constable"],
    content: `Ye update **9 November 2026** tak ki reports par based hai. Official dates sirf **hppsc.hp.gov.in** par maani jayein.

## Ab tak kya report hua

- Short notification **9 July 2026** ko aaya aur online applications **10 July** se shuru hui, ORA portal par.
- Posts ki sankhya par sources alag hain (kisi me 734, kisi me lagbhag 1,334 jisme driver posts bhi), isliye hum yahan ek number nahi de rahe.
- Ek report ke mutabik **physical test (PST/PET)** ka admit card 14 October ko aaya aur tests **22 October se 5 December 2026** tak chalenge. Doosre sources isse alag batate hain, isliye apna schedule admit card se hi dekhein.
- **Written exam ki date abhi announce nahi hui.** Reports ke mutabik wo physical tests ke baad hoga.

## Admit card kaise dekhein

1. ORA portal par apne registration se login karein.
2. Har stage ka admit card alag hota hai, isliye physical aur written ke liye alag download karein.
3. Reporting time, centre aur documents ki list dhyan se padhein.

## Is beech kya karein

Physical clear ho gaya ya nahi, written ki taiyari abhi se chalu rakhein. [Constable mock tests](/hp-police/constable) aur [Himachal GK](/himachal) roz ka routine banayein. Driver posts ke liye [Driver Constable](/hp-police/driver-constable) page dekhein.`,
    faqs: [
      { q: "HP Police Constable written exam kab hoga?", a: "9 November 2026 tak koi date announce nahi hui thi. HPPSC ki website par dekhte rahein." },
      { q: "Physical test ka admit card kahan milega?", a: "ORA portal par apne login se. Har stage ka admit card alag hota hai." },
    ],
  },

  {
    slug: "hp-police-driver-constable-2026-eligibility-syllabus",
    seoTitle: "HP Police Driver Constable 2026: Eligibility, Syllabus, Tests",
    seoDescription: "HP Police Driver Constable 2026 as reported: licence needed, written test, driving test and physical tests, plus road signs and Motor Vehicles Act topics to study.",
    title: "HP Police Driver Constable 2026: Eligibility, Selection Stages and Syllabus",
    titleHi: "एचपी पुलिस ड्राइवर कांस्टेबल 2026: योग्यता, चयन और सिलेबस",
    excerpt: "Driver Constable posts ki reported details, licence ki requirement, selection stages aur road safety plus vehicle knowledge ka syllabus.",
    category: "SYLLABUS",
    exams: ["hp-police/driver-constable"],
    content: `Reports ke mutabik HP Police ki 2026 constable bharti me **Driver** posts bhi shamil thi (kisi source me 91). Count aur eligibility ki final jaankari **hppsc.hp.gov.in** ke notification se confirm karein.

## Eligibility (reported)

- 10+2 from a recognised board, aur
- Valid driving licence. Kuch sources **HTV (heavy)** batate hain, kuch heavy ya light. Ye post ke hisaab se notification me hota hai.

## Selection stages

Driver posts me aam taur par written test ke saath **driving/trade test** aur **physical tests** hote hain. Exact order notification me dekhein.

## Syllabus

| Area | Topics |
|---|---|
| Himachal GK | History, geography, rivers, roads aur passes |
| General studies | Polity, geography, general science |
| Reasoning aur maths | Series, direction sense, speed-distance, ratio |
| Road safety | Road signs, traffic rules, Motor Vehicles Act, licence documents |
| Vehicle knowledge | Engine types, cooling, fuel aur braking system, basic maintenance |

Pura syllabus: [Driver Constable syllabus](/hp-police/driver-constable/syllabus). Practice: [free Driver Constable mock](${free("hp-police-driver-constable-free-mock-1")}).`,
    faqs: [
      { q: "Driver Constable ke liye kaun sa licence chahiye?", a: "Sources alag batate hain (heavy ya light). Notification me post ke hisaab se likha hota hai, wahi maanein." },
      { q: "Kya driving test hota hai?", a: "Driver posts me aam taur par haan. Stage list notification me dekhein." },
    ],
  },

  {
    slug: "hp-police-head-constable-recruitment-promotion-syllabus",
    seoTitle: "HP Police Head Constable: Recruitment, Promotion, Syllabus",
    seoDescription: "HP Police Head Constable: how the post is filled, what the written paper covers and how to prepare. No 2026 direct recruitment advertisement was confirmed.",
    title: "HP Police Head Constable: How the Post Is Filled, Syllabus and Preparation",
    titleHi: "एचपी पुलिस हेड कांस्टेबल: भर्ती, प्रमोशन और सिलेबस",
    excerpt: "Head Constable ka rank kaise bhara jata hai, written paper me kya aata hai aur constable ki taiyari ko iske liye kaise use karein.",
    category: "SYLLABUS",
    exams: ["hp-police/head-constable"],
    content: `**Head Constable** Constable se upar ka non-gazetted rank hai. Wo constables ki nigrani karta hai aur thana-level ka record aur likhit kaam sambhalta hai.

## Bharti ka status

Humein **2026 ka koi confirmed Head Constable advertisement nahi mila**. Ye post direct recruitment aur promotion, dono se bhari ja sakti hai, aur ministerial stream me clerical aur computer kaam hota hai. Advertisement aane par qualification aur stages usi me honge. Check karein: hppsc.hp.gov.in, hprca.hp.gov.in aur hppolice.gov.in.

## Paper me kya aata hai (usual)

- **Himachal GK**: history, geography, culture, administration
- **General studies**: polity, science, criminal law basics, current affairs
- **Reasoning aur maths**: series, direction, percentage, ratio, speed-distance
- **English/Hindi**: grammar aur comprehension
- **Computer basics**: ministerial stream ke liye

Detail me: [Head Constable syllabus](/hp-police/head-constable/syllabus).

## Taiyari

Constable ka syllabus common hai, isliye wahan se shuru karo aur difficulty thodi upar rakho. [Constable page](/hp-police/constable) aur [Sub-Inspector page](/hp-police/sub-inspector) bhi dekhein. Practice ke liye [free Head Constable mock](${free("hp-police-head-constable-free-mock-1")}).`,
    faqs: [
      { q: "Head Constable ki bharti kaise hoti hai?", a: "Direct recruitment aur promotion dono se ho sakti hai. Har baar ka tareeka advertisement me likha hota hai." },
      { q: "Kya constable ki taiyari kaafi hai?", a: "Zyadatar syllabus common hai. Computer basics aur thoda ucchh level add karein." },
    ],
  },

  {
    slug: "hprca-lab-assistant-syllabus-exam-pattern-preparation",
    seoTitle: "HPRCA Lab Assistant: Syllabus, Pattern and Preparation",
    seoDescription: "HPRCA Lab Assistant syllabus: physics, chemistry, biology, lab safety, maths and Himachal GK. The exam was reported for 26 August 2026. Free mock inside.",
    title: "HPRCA Lab Assistant: Syllabus, Exam Pattern and Preparation Plan",
    titleHi: "एचपीआरसीए लैब असिस्टेंट: सिलेबस, पैटर्न और तैयारी",
    excerpt: "Lab Assistant paper ka science-based syllabus, laboratory knowledge ke topics aur taiyari ka plan, NCERT level ke hisaab se.",
    category: "SYLLABUS",
    exams: ["hprca/lab-assistant"],
    content: `**Lab Assistant** school aur college labs ka technical support post hai: apparatus aur chemicals ready karna, stock register aur safety dekhna.

## Status

Ek report ke mutabik HPRCA Lab Assistant ka exam **26 August 2026** ke liye admit card ke saath schedule hua tha, yani wo ho chuka hoga. Vacancy aur eligibility ki final jaankari hum confirm nahi kar paaye, isliye next drive ke liye [hprca.hp.gov.in](https://hprca.hp.gov.in) dekhte rahein.

## Syllabus (usual)

| Subject | Topics |
|---|---|
| Physics | Mechanics, heat, light, sound, electricity |
| Chemistry | Atomic structure, periodic table, acids-bases-salts, formulae |
| Biology | Cell, human body, plants, health |
| Lab knowledge | Apparatus, chemicals ka storage, safety, first aid |
| Maths aur Himachal GK | Average, ratio, percentage, state GK |

## Taiyari

Questions NCERT 9 se 12 level ke hote hain. Units aur formulae ke chhote notes banao, lab apparatus ki list yaad karo aur roz maths practice karo. [Lab Assistant syllabus](/hprca/lab-assistant/syllabus) dekhein aur [free mock](${free("hprca-lab-assistant-free-mock-1")}) se shuru karein.`,
    faqs: [
      { q: "Lab Assistant me negative marking hai?", a: "Ye notification par depend karta hai. Humare free mock me practice ke liye 0.25 negative marking rakhi gayi hai." },
      { q: "Kaun si class ka science aata hai?", a: "Zyadatar 10+2 tak ka, NCERT par based, saath me lab apparatus aur safety." },
    ],
  },

  {
    slug: "hp-anganwadi-supervisor-syllabus-icds-nutrition-preparation",
    seoTitle: "HP Anganwadi Supervisor: Syllabus, ICDS Topics, Preparation",
    seoDescription: "HP Anganwadi Supervisor syllabus: six ICDS services, nutrition, schemes, Himachal GK, reasoning and language. No 2026 advertisement was confirmed.",
    title: "HP Anganwadi Supervisor: Syllabus, ICDS and Nutrition Topics, Preparation Plan",
    titleHi: "हिमाचल आंगनवाड़ी सुपरवाइजर: सिलेबस और तैयारी",
    excerpt: "Anganwadi Supervisor (Mukhya Sevika) ke paper ke ICDS, nutrition aur schemes ke topics, aur taiyari ka plan.",
    category: "SYLLABUS",
    exams: ["hp-wcd/anganwadi-supervisor"],
    content: `**Anganwadi Supervisor** (Mukhya Sevika) kai Anganwadi centres ki nigrani karti hai, jo ICDS scheme ke under Women and Child Development Department ke paas aate hain.

## Status

Humein **2026 ka koi confirmed Anganwadi Supervisor notification nahi mila**. Quota, age aur qualification advertisement me hote hain, isliye department ki site aur hprca.hp.gov.in dekhte rahein.

## ICDS ki 6 services (yaad rakhein)

1. Supplementary nutrition
2. Pre-school non-formal education
3. Nutrition aur health education
4. Immunisation
5. Health check-up
6. Referral services

## Syllabus (usual)

- **ICDS aur child development**: objectives, early childhood care, Poshan Abhiyaan aur doosri schemes
- **Nutrition**: nutrients, vitamins aur deficiency diseases, breastfeeding, immunisation
- **Himachal GK**, **general studies**, **reasoning**, **Hindi/English**

Pura outline: [Anganwadi Supervisor syllabus](/hp-wcd/anganwadi-supervisor/syllabus). Practice: [free mock](${free("hp-wcd-anganwadi-supervisor-free-mock-1")}).`,
    faqs: [
      { q: "ICDS ki kitni services hain?", a: "Chhe: supplementary nutrition, pre-school education, nutrition aur health education, immunisation, health check-up aur referral." },
      { q: "Kya Anganwadi workers Supervisor ke liye apply kar sakti hain?", a: "Kuch drives me quota ya relaxation hota hai. Latest notification ki eligibility padhein." },
    ],
  },

  {
    slug: "kccb-jccb-clerk-syllabus-cooperative-banking-preparation",
    seoTitle: "KCCB JCCB Clerk: Syllabus, Cooperative Banking, Preparation",
    seoDescription: "KCCB and JCCB Clerk syllabus: reasoning, quant, English, banking and cooperative awareness, Himachal GK. No 2026 advertisement was confirmed.",
    title: "KCCB and JCCB Clerk: Syllabus, Cooperative Banking Topics and Preparation",
    titleHi: "केसीसीबी जेसीसीबी क्लर्क: सिलेबस और तैयारी",
    excerpt: "Kangra aur Jogindra Central Cooperative Bank ke clerk paper ka syllabus, cooperative banking ke topics aur taiyari ka plan.",
    category: "SYLLABUS",
    exams: ["kccb-jccb/clerk"],
    content: `**KCCB** (Kangra Central Co-operative Bank) aur **JCCB** (Jogindra Central Co-operative Bank) Himachal ke district cooperative banks hain. Dono apni bharti alag nikalte hain.

## Status

Humein **2026 ka koi confirmed KCCB ya JCCB clerk notification nahi mila**. Vacancy, qualification aur exam agency har bank ke notification me hoti hai, isliye bank ki official website dekhte rahein. Ye HP State Cooperative Bank (HPSCB) se alag hai.

## Syllabus (usual)

| Section | Topics |
|---|---|
| Reasoning | Series, coding-decoding, blood relations, puzzles |
| Numerical ability | Simplification, percentage, interest, profit-loss, DI |
| English | Grammar, vocabulary, comprehension |
| Banking awareness | RBI, banking basics, cooperative structure |
| Himachal GK | Geography, history, current affairs |

## Cooperative topics jo alag se yaad rakhein

- Three-tier credit structure: PACS, central bank, state bank
- NABARD ka role
- Cooperative laws ki basics

Pura outline: [KCCB / JCCB Clerk syllabus](/kccb-jccb/clerk/syllabus). Practice: [free mock](${free("kccb-jccb-clerk-free-mock-1")}).`,
    faqs: [
      { q: "KCCB aur JCCB me kya antar hai?", a: "KCCB Kangra ka aur JCCB Jogindra (Mandi/Kangra area) ka central cooperative bank hai, dono ki bharti alag hoti hai." },
      { q: "Kya HPSCB clerk ki taiyari yahan kaam aayegi?", a: "Haan, paper style milta-julta hai, lekin bharti alag hoti hai." },
    ],
  },

  {
    slug: "hprca-clerk-job-trainee-2026-40-posts-cbt-typing-test",
    seoTitle: "HPRCA Clerk 2026: 40 Job Trainee Posts, CBT and Typing Test",
    seoDescription: "HPRCA Clerk (Job Trainee) 2026 as reported: 40 posts under Advt 13/2026, fixed Rs 12,500 a month, CBT plus a qualifying typing test. Applications closed 11 September.",
    title: "HPRCA Clerk (Job Trainee) 2026: 40 Posts, CBT and Typing Test",
    titleHi: "एचपीआरसीए क्लर्क (जॉब ट्रेनी) 2026: 40 पद, सीबीटी और टाइपिंग टेस्ट",
    excerpt: "HPRCA Clerk Job Trainee 2026 ki reported details: posts, stipend, selection aur ab kya karna chahiye.",
    category: "NOTIFICATION",
    exams: ["hprca/clerk"],
    content: `Reports ke mutabik HPRCA ne **Clerk (Job Trainee)** ke **40 posts** ke liye **Advt No. 13/2026** nikala tha. Applications **14 August se 11 September 2026** tak chali, yani window ab band hai.

| Detail | Reported |
|---|---|
| Post | Clerk (Job Trainee) |
| Posts | 40 |
| Pay | Fixed Rs 12,500 per month |
| Selection | Computer-based test (CBT), phir qualifying typing test |
| Final merit | CBT ke marks par, typing test qualify karne par |

Ye figures coaching aur job sites se hain. Final jaankari **hprca.hp.gov.in** par dekhein.

## Ab kya karein

- Agar apply kiya hai, CBT ki date aur admit card ke liye HPRCA ki site check karte rahein.
- Typing test ki practice roz 15 minute karein.
- CBT ke liye [HPRCA Clerk mock tests](/hprca/clerk) aur [Himachal GK](/himachal) revise karein.`,
    faqs: [
      { q: "HPRCA Clerk 2026 me kitne posts the?", a: "Reports ke mutabik 40 (Job Trainee). Official notification se confirm karein." },
      { q: "Kya typing test marks me judega?", a: "Reports ke mutabik ye qualifying hai, merit CBT par banti hai." },
    ],
  },

  {
    slug: "himachal-current-affairs-october-2026",
    seoTitle: "Himachal Current Affairs October 2026: Key Events for Exams",
    seoDescription: "Himachal current affairs October 2026: apple MIS price, Himcare cover, 89 projects in Rohru and Rampur, President's visit and the central disaster team.",
    title: "Himachal Pradesh Current Affairs October 2026: Important Events for HP Exams",
    titleHi: "हिमाचल समसामयिकी अक्टूबर 2026",
    excerpt: "October 2026 ki Himachal ki zaroori ghatnayein ek jagah, HPAS, Clerk, Patwari aur Police exams ke liye.",
    category: "CURRENT_AFFAIRS",
    exams: ["hp-gk-ca/current-affairs"],
    content: `October 2026 ki Himachal ki mukhya ghatnayein, news reports ke mutabik. Exam se pehle inhe apne kisi monthly summary se bhi match kar lein.

## Schemes aur decisions

- **Apple MIS price**: Market Intervention Scheme me apple ki khareed keemat **Rs 12 se badhakar Rs 13 per kg** ki gayi.
- **Himcare**: parivar ka saalana health cover **double karke Rs 10 lakh** karne ka faisla, jo basic aur top-up cover me bata hai.
- **Development projects**: CM Sukhu ne Rohru aur Rampur me **89 projects (lagbhag Rs 415.80 crore)** dedicate kiye aur anti-Chitta rallies me hissa liya.

## Visits aur disaster

- **Rashtrapati Murmu** ka Himachal daura **6 se 8 October** ko hua, Naina Devi temple se shuru hokar Atal Tunnel tak.
- Ek **7-member Inter-Ministerial Central Team** ne is season ke disasters ka nuksaan assess karne ke liye 4 din daura kiya.
- Monsoon ki wapasi (1 October) ke baad rainfall lagbhag 15% zyada record hui; **Sach Pass** par taaza barfbari se high-altitude roads band hui.

## Yaad rakhne ke tareeke

Har ghatna ke saath **kya, kahan, kitna** likho: jaise MIS Rs 13/kg, Himcare Rs 10 lakh. Weekly revise karo aur [free HP Current Affairs mock](${free("hp-current-affairs-free-mock-1")}) lagao. Static topics ke liye [Himachal GK](/himachal).`,
    faqs: [
      { q: "Himachal ke exams me current affairs kitni purani poochhi jaati hai?", a: "Aam taur par pichhle 6 se 12 mahine. Exam se 2 se 3 hafte pehle tak ki news dekh lein." },
    ],
  },

  {
    slug: "hp-govt-jobs-november-2026-open-vacancies-last-dates",
    seoTitle: "HP Govt Jobs November 2026: Open Vacancies and Last Dates",
    seoDescription: "HP govt jobs in November 2026: HPPSC Digital Forensic posts close 10 November, Jal Shakti 20 posts on 13 November, plus what has already closed.",
    title: "HP Govt Jobs November 2026: Open Vacancies, Last Dates and Upcoming Exams",
    titleHi: "हिमाचल सरकारी नौकरी नवंबर 2026: खुली भर्तियां और अंतिम तिथि",
    excerpt: "November 2026 me khuli Himachal bhartiyan, unki last date aur jo band ho chuki hain, 9 November tak ke update ke saath.",
    category: "NOTIFICATION",
    exams: ["hppsc/hpas", "hp-police/constable", "hprca/clerk"],
    content: `Last update: **9 November 2026**. Dates job-listing sites se hain, isliye apply karne se pehle official site par notification padhein.

## Abhi khuli

| Bharti | Posts | Last date | Site |
|---|---|---|---|
| HPPSC Assistant Director aur Scientific Officer (Digital Forensic) | 2 | **10 November 2026**, 11:59 PM (fee Rs 600) | hppsc.hp.gov.in |
| Jal Shakti Vibhag: Multi Purpose Worker aur Para posts | 20 | **13 November 2026**, 5 PM, offline (Executive Engineer ke office me pahunchna chahiye) | jsv.hp.gov.in |

## Band ho chuki

- HPPSC Assistant Director (Job Trainee): 3 November
- HPRCA Clerk (Job Trainee): 11 September
- HPPSC HPAS 2026 (22 posts): 22 September
- HP Police Constable: applications band, ab physical tests chal rahe hain

## Chalu process me

- **HP Police Constable**: physical tests ke baad written exam.
- **HPRCA Clerk**: CBT aur typing test.

Taiyari: [HPAS](/hppsc/hpas), [HPRCA Clerk](/hprca/clerk), [Police Constable](/hp-police/constable) aur [free Himachal GK mock](/himachal-gk-mock-test).`,
    faqs: [
      { q: "Is mahine kaun si Himachal bharti khuli hai?", a: "9 November tak: HPPSC Digital Forensic posts (10 November) aur Jal Shakti ke 20 posts (13 November). Naye notifications aate rehte hain." },
    ],
  },

  {
    slug: "how-to-check-hp-exam-result-merit-list-hprca-hppsc",
    seoTitle: "How to Check HP Exam Result and Merit List: HPRCA, HPPSC",
    seoDescription: "How to check Himachal exam results and merit lists on hprca.hp.gov.in and hppsc.hp.gov.in: steps, what the result PDF shows, and what to do after.",
    title: "How to Check HP Exam Results and Merit Lists (HPRCA, HPPSC, HP Police)",
    titleHi: "हिमाचल परीक्षा रिजल्ट और मेरिट लिस्ट कैसे देखें",
    excerpt: "HPRCA, HPPSC aur HP Police ke result aur merit list dekhne ke steps, aur result ke baad kya karna hai.",
    category: "RESULT",
    exams: ["hprca/clerk", "hppsc/hpas", "hp-police/constable"],
    content: `Himachal ke results alag-alag boards par aate hain. Sahi site par dekhna sabse zaroori hai.

## Kahan dekhein

| Exam | Official site |
|---|---|
| HPRCA posts (Clerk, JOA IT, Patwari, Staff Nurse) | hprca.hp.gov.in |
| HPPSC posts (HPAS, ADO, Assistant Professor, SET) | hppsc.hp.gov.in |
| HP Police Constable (2026 drive) | hppsc.hp.gov.in, ORA portal |
| HP TET | hpbose.org |

## Steps

1. Official site ke **Results** ya **Recent Notices** section me jaayein.
2. Apne exam ka **result PDF** kholein. Zyadatar results PDF me roll number ya registration number se aate hain.
3. Ctrl+F se apna roll number search karein.
4. PDF save karein, aur cut-off ya category notes bhi padhein.

## Result ke baad

- **Answer key** par objection ka mauka aam taur par kuch din hota hai.
- Agle stage (typing test, physical, document verification) ki date notification me aati hai.
- Cut-off ke liye hamare [cut-off posts](/blog/category/cutoff) dekhein.

Jab tak result na aaye, taiyari rukne na dein: [Clerk](/hprca/clerk), [HPAS](/hppsc/hpas), [Constable](/hp-police/constable).`,
    faqs: [
      { q: "HPRCA ka result kahan aata hai?", a: "hprca.hp.gov.in par Results section me PDF ke roop me." },
      { q: "Result me naam nahi hai to kya karein?", a: "Notification me di gayi grievance process dekhein aur commission se sampark karein." },
    ],
  },
];
