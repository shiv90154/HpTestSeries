import type { PostSeed } from "./types";

// Evergreen blog posts for HP exams that had a free mock and an exam page but no blog post yet (Sub-Inspector, HPSEBL,
// HPSCB Clerk, Judicial Services, Food Safety Officer, Medical and Veterinary Officer). They carry no dates, vacancy counts
// or deadlines: those change with every notification, so each post sends the reader to the official site for them.

const free = (slug: string) => `/tests/${slug}`;

export const HP_GAP_POSTS: PostSeed[] = [
  {
    slug: "hp-police-sub-inspector-syllabus-exam-pattern-preparation",
    seoTitle: "HP Police Sub-Inspector (SI) Syllabus, Pattern and Preparation",
    seoDescription: "HP Police SI kaise banein: qualification, selection stages, written paper ke sections, PST/PET aur 90 din ka preparation plan. Free SI mock test ke saath.",
    title: "HP Police Sub-Inspector (SI): Syllabus, Selection Stages and How to Prepare",
    titleHi: "एचपी पुलिस सब-इंस्पेक्टर: सिलेबस, चयन प्रक्रिया और तैयारी",
    excerpt: "SI ki bharti me kya kya hota hai, written paper ke sections, physical test aur graduate-level paper ke liye ek seedha preparation plan.",
    category: "SYLLABUS",
    exams: ["hp-police/sub-inspector", "hp-police/constable"],
    content: `**Sub-Inspector (SI)** Himachal Police me thane ki investigation ka incharge hota hai aur constables aur head constables ko supervise karta hai. Ye graduates ke liye state ki sabse popular uniformed posts me se ek hai.

## Selection stages (aam taur par)

| Stage | Kya hota hai |
|---|---|
| Written test | Objective paper, graduate level |
| PST / PET | Height, chest aur running jaise physical standard aur efficiency tests |
| Medical | Fitness examination |
| Interview | Jahan notification me ho |
| Document verification | Aakhri stage |

Stages ka order, marks aur qualifying standard har bharti ke notification me alag ho sakte hain, isliye vacancies, age limit aur physical standards ke liye official notification dekhein.

## Written paper me kya aata hai

- **General Knowledge** aur current affairs
- **Himachal GK**: history, geography, culture, economy
- **Reasoning**: series, coding-decoding, blood relations, puzzles
- **Quantitative aptitude**: percentage, ratio, average, time and work
- **English / Hindi**

Constable se difficulty zyada hoti hai, isliye maths aur reasoning ki speed pe sabse zyada kaam karo. Detailed topics ke liye [SI syllabus](/hp-police/sub-inspector/syllabus) dekhein.

## 90 din ka plan

1. **Pehle 30 din:** syllabus ek baar poora padho, roz 1 ghanta Himachal GK, 1 ghanta reasoning, 1 ghanta maths.
2. **Agle 30 din:** topic-wise practice, roz ek sectional test, galtiyon ki copy banao.
3. **Aakhri 30 din:** hafte me 2 full mocks, weak topics ka revision aur running practice badhao.

Physical test ki taiyari paper ke saath shuru karo, last month tak mat taalo.

Shuruaat [free HP Police SI mock](${free("hp-police-sub-inspector-free-mock-1")}) se karein. Constable ka paper dekhna ho to [HP Police Constable](/hp-police/constable) page hai, aur Himachal GK ke liye [Himachal GK hub](/himachal).`,
    faqs: [
      { q: "SI ke liye qualification kya chahiye?", a: "Aam taur par kisi recognised university ki bachelor's degree. Age limit, physical standard aur vacancies notification me hoti hain." },
      { q: "SI ka paper constable se kaise alag hai?", a: "SI ka paper graduate level ka hota hai, isliye reasoning aur maths ki difficulty zyada hoti hai. Physical standards bhi notification ke hisaab se alag ho sakte hain." },
      { q: "Physical test ki taiyari kab shuru karein?", a: "Written ki taiyari ke saath hi. Running aur fitness ko last month ke liye mat chhodein." },
    ],
  },

  {
    slug: "hpsebl-recruitment-je-ae-lineman-syllabus-selection-process",
    seoTitle: "HPSEBL Recruitment: JE, AE and Lineman Syllabus and Preparation",
    seoDescription: "HPSEBL (Himachal bijli board) me JE Electrical, Assistant Engineer aur Lineman: qualification, syllabus areas aur preparation tips. Free mock tests ke links ke saath.",
    title: "HPSEBL Recruitment: JE Electrical, Assistant Engineer and Lineman Syllabus and Preparation",
    titleHi: "एचपीएसईबीएल भर्ती: जेई, एई और लाइनमैन सिलेबस व तैयारी",
    excerpt: "Himachal ke bijli board ki teen main posts ke liye qualification, syllabus ke areas aur taiyari ka tareeqa ek hi jagah.",
    category: "SYLLABUS",
    exams: ["hpsebl/junior-engineer-electrical", "hpsebl/assistant-engineer", "hpsebl/lineman"],
    content: `**HPSEBL (Himachal Pradesh State Electricity Board Limited), Shimla** apne staff ki bharti khud apne notifications se karta hai, HPPSC ya HPRCA se alag. Is post me teen popular posts ek saath samjhaate hain.

## Teen posts, teen levels

| Post | Qualification (aam taur par) | Paper ka level |
|---|---|---|
| Lineman | ITI (Electrician / Lineman trade) | ITI trade + basic GK |
| JE (Electrical) | Electrical engineering diploma | Diploma level technical |
| Assistant Engineer | B.E. / B.Tech Electrical | Degree level, GATE jaisa |

Exact qualification, age limit, vacancies aur selection stages har advertisement me alag ho sakte hain, isliye HPSEBL ke official notification se confirm karein.

## Syllabus ke areas

**Lineman:** Ohm's law, AC-DC, wiring, earthing, transformers, overhead line ke components, tools aur **electrical safety**. Safety ke direct questions easy marks hote hain.

**JE (Electrical):** circuit theory, electrical machines, power systems, measurements aur electrical safety. Technical part hi merit decide karta hai.

**Assistant Engineer:** power systems, machines, control systems, power electronics, measurements aur circuits. GATE ke notes yahan kaam aate hain.

Teeno me thoda Himachal GK aur general awareness bhi hota hai. Hydropower projects ki basic jaankari fayda deti hai.

## Taiyari kaise karein

1. Apne level ke subjects ko ek ek karke revise karo, numericals roz solve karo.
2. Short notes banao: formulas, colour codes aur safety rules.
3. Himachal ke hydropower aur HPSEBL ke network par ek page ke notes rakho.
4. Hafte me ek timed mock do aur galtiyan likho.

Free mocks: [Lineman](${free("hpsebl-lineman-free-mock-1")}), [JE Electrical](${free("hpsebl-junior-engineer-electrical-free-mock-1")}), [Assistant Engineer](${free("hpsebl-assistant-engineer-free-mock-1")}). Syllabus ke liye [Lineman syllabus](/hpsebl/lineman/syllabus), [JE syllabus](/hpsebl/junior-engineer-electrical/syllabus) aur [AE syllabus](/hpsebl/assistant-engineer/syllabus) dekhein.`,
    faqs: [
      { q: "HPSEBL aur HPPSC me kya antar hai?", a: "HPSEBL bijli board hai aur apne staff ki bharti apne notification se karta hai. HPPSC state ki Public Service Commission hai jo alag posts bharti karta hai." },
      { q: "Lineman ke liye kya physical test hota hai?", a: "Field posts me trade ya physical test ho sakta hai. Notification me likha hota hai ki test hai ya nahi aur marking kaise hogi." },
      { q: "AE ki taiyari GATE se madad karti hai?", a: "Haan, syllabus kaafi overlap karta hai, isliye GATE-level electrical engineering ki taiyari kaam aati hai." },
    ],
  },

  {
    slug: "hpscb-junior-clerk-syllabus-cooperative-societies-act-preparation",
    seoTitle: "HPSCB Junior Clerk Syllabus: Cooperative Act, Quant and Reasoning",
    seoDescription: "HP State Cooperative Bank Junior Clerk ka syllabus, paper ke 5 sections aur Cooperative Societies Act ki taiyari. Free HPSCB Clerk mock test ke saath.",
    title: "HPSCB Junior Clerk: Syllabus, Paper Sections and Cooperative Societies Act Preparation",
    titleHi: "एचपीएससीबी जूनियर क्लर्क: सिलेबस और कोऑपरेटिव सोसाइटीज एक्ट की तैयारी",
    excerpt: "HP State Cooperative Bank ke clerk paper ke sections, Cooperative Societies Act kaise padhein aur banking-style speed kaise banayein.",
    category: "SYLLABUS",
    exams: ["hpscb/clerk"],
    content: `**HP State Cooperative Bank (HPSCB)** ke Junior Clerk counter work, cash, accounts aur customer records sambhalte hain. Bharti ka format aur eligibility har notification me alag ho sakti hai.

**Dhyan dein:** HPSCB ki 2026 bharti PACS / OCS quota me thi, yaani sirf Himachal ki cooperative societies ke eligible employees apply kar sakte the. Isliye har naye notification me eligibility dhyan se padho, fresh graduates ke liye open hone ka assumption mat lo.

## Paper ke sections

| Section | Kya taiyari karein |
|---|---|
| Reasoning | Series, coding-decoding, puzzles, seating, syllogism |
| Numerical ability | Simplification, percentage, ratio, interest, DI |
| English | Comprehension, grammar, error spotting, cloze test |
| General awareness | Banking, current affairs, Himachal GK |
| HP Cooperative Societies Act and Rules | Registration, management, audit, disputes, Registrar ka role |

2026 me selection online written exam (IBPS ke through) aur document verification tha, interview nahi tha. Is baar ka scheme notification me dekhein.

## Cooperative Act kaise padhein

Ye section is exam ki pehchan hai aur bahut kam candidates ise gambhirta se padhte hain, isliye yahan marks aasaani se mil sakte hain.

1. Act aur Rules ka bare text ek baar padho.
2. Definitions, registration, members ke rights, management committee, audit aur disputes ke liye chhote notes banao.
3. Registrar ke powers ko alag se yaad karo.

## Speed ke liye

Banking-style paper time ke against hota hai. Roz 30 minute reasoning aur 30 minute quant ka timed practice karo.

Shuruaat [free HPSCB Clerk mock](${free("hpscb-clerk-free-mock-1")}) se karein. Poora [HPSCB Clerk page](/hpscb/clerk) aur [syllabus](/hpscb/clerk/syllabus) bhi dekhein. KCCB / JCCB alag banks hain: [KCCB / JCCB Clerk](/kccb-jccb/clerk).`,
    faqs: [
      { q: "HPSCB Clerk ke liye fresh graduate apply kar sakta hai?", a: "2026 ki bharti PACS / OCS quota me thi, yaani sirf cooperative societies ke eligible employees ke liye. Har notification me eligibility alag ho sakti hai, isliye dekh kar apply karein." },
      { q: "Cooperative Societies Act ka kitna weightage hota hai?", a: "Ye paper ka ek alag section hota hai. Exact marks notification aur paper pattern me dekhein." },
      { q: "Kya HPSCB aur KCCB same hain?", a: "Nahi. HPSCB state cooperative bank hai, KCCB aur JCCB district level ke alag banks hain, har ka apna notification hota hai." },
    ],
  },

  {
    slug: "hp-judicial-services-civil-judge-syllabus-prelims-preparation",
    seoTitle: "HP Judicial Services (Civil Judge) Syllabus and Prelims Preparation",
    seoDescription: "HP Judicial Services Civil Judge: prelims, mains aur viva ka format, prelims syllabus, BNS/BNSS/BSA update aur preparation plan. Free prelims mock test ke saath.",
    title: "HP Judicial Services (Civil Judge): Syllabus, Stages and Prelims Preparation",
    titleHi: "एचपी ज्यूडिशियल सर्विसेज (सिविल जज): सिलेबस और प्रीलिम्स तैयारी",
    excerpt: "Civil Judge (Junior Division) ke teen stages, prelims me aane wale laws, naye criminal laws ka dhyan aur preparation ka tareeqa.",
    category: "SYLLABUS",
    exams: ["hppsc/judicial-services"],
    content: `**HP Judicial Services** Himachal ki subordinate judiciary me **Civil Judge (Junior Division)** banne ka raasta hai. Exam **HPPSC** High Court ke saath consultation me conduct karata hai.

## Teen stages

| Stage | Kya hota hai |
|---|---|
| Preliminary | Objective paper |
| Main | Descriptive law papers |
| Viva-voce | Interview |

Qualification **LL.B.** degree hoti hai aur advocate ke roop me practise karne ki eligibility chahiye. Age limit, practice ya enrolment condition aur vacancies advertisement me hoti hain.

## Prelims me kya aata hai

- Constitution of India
- Civil Procedure Code (CPC)
- Criminal laws: **BNS, BNSS aur BSA**
- Contract Act, Transfer of Property Act
- Himachal-specific laws

## Naye criminal laws ka dhyan

**1 July 2024** se IPC, CrPC aur Evidence Act ki jagah **BNS, BNSS aur BSA** lagu hain. Advertisement ya syllabus me jo version bataya ho wahi padho. Dono ke section numbers confuse mat karo, comparison table bana lo.

## Taiyari ka tareeqa

1. **Bare acts** ko illustrations ke saath padho.
2. Landmark judgments ke short notes banao.
3. Pichhle prelims papers solve karo, repeat hone wale topics pehchano.
4. Prelims ke saath mains ke answer writing ki bhi practice rakho.

Shuruaat [free HP Judicial Services mock](${free("hppsc-judicial-services-free-mock-1")}) se karein. Details ke liye [Judicial Services page](/hppsc/judicial-services) aur [syllabus](/hppsc/judicial-services/syllabus) dekhein.`,
    faqs: [
      { q: "Civil Judge banne ke liye kaun si degree chahiye?", a: "LL.B. degree aur advocate ke roop me practise karne ki eligibility. Practice ya enrolment condition advertisement me hoti hai." },
      { q: "Prelims me IPC padhein ya BNS?", a: "1 July 2024 se BNS, BNSS aur BSA lagu hain. Advertisement me jo version bataya ho wahi padho." },
      { q: "Exam kaun conduct karta hai?", a: "Himachal Pradesh Public Service Commission (HPPSC), Shimla, High Court ke saath consultation me." },
    ],
  },

  {
    slug: "food-safety-officer-fso-syllabus-fss-act-2006-preparation",
    seoTitle: "Food Safety Officer (FSO) Syllabus: FSS Act 2006 Preparation Plan",
    seoDescription: "Food Safety Officer ka syllabus: FSS Act 2006, food chemistry, microbiology, adulteration. Himachal FSO ka status aur Haryana FSO se antar, free mock ke saath.",
    title: "Food Safety Officer (FSO): Syllabus, FSS Act 2006 and Preparation Plan",
    titleHi: "फूड सेफ्टी ऑफिसर: सिलेबस, FSS एक्ट 2006 और तैयारी",
    excerpt: "FSO ka syllabus, FSS Act kaise padhein aur Himachal aur Haryana ke FSO me confusion kaise na ho.",
    category: "SYLLABUS",
    exams: ["hppsc/food-safety-officer"],
    content: `**Food Safety Officer (FSO)** district level par **Food Safety and Standards Act, 2006** lagu karta hai: food businesses ki inspection, samples lena, lab bhejna aur adulteration par action.

## Status (November 2026)

Humein Himachal ke liye HPPSC ya HPRCA ka koi FSO notification nahi mila. **Haryana** ka FSO notification (September 2026) *Haryana* Public Service Commission ka hai, wo alag exam hai. Himachal ka advertisement aane par hppsc.hp.gov.in aur hprca.hp.gov.in par dekhein.

FSS Act ka syllabus har state ke FSO exam me common hota hai, isliye taiyari kabhi bekaar nahi jaati.

## Qualification (aam taur par)

Food Technology, Dairy Technology, Biotechnology, Oil Technology, Agricultural Science, Veterinary Science, Biochemistry ya Microbiology me degree, Chemistry me master's, ya medical degree. Exact list advertisement me hoti hai.

## Syllabus ke areas

- **FSS Act 2006:** definitions, Food Authority, FSO ki powers, licensing, penalties
- **Food chemistry:** carbohydrates, proteins, fats, vitamins
- **Food microbiology** aur food preservation
- **Adulteration** aur sampling procedure
- Himachal GK aur current affairs

## Taiyari ka tareeqa

1. FSS Act ke sections aur FSO ke powers bare text se padho.
2. Penalties aur time limits ki table banao, ye direct questions hote hain.
3. Food science ke basics ko diagrams ke saath revise karo.
4. Timed mocks se speed banao.

Shuruaat [free Food Safety Officer mock](${free("hppsc-food-safety-officer-free-mock-1")}) se karein. [FSO exam page](/hppsc/food-safety-officer) aur [syllabus](/hppsc/food-safety-officer/syllabus) bhi dekhein.`,
    faqs: [
      { q: "Kya Himachal me FSO ki bharti chal rahi hai?", a: "November 2026 tak humein HPPSC ya HPRCA ka FSO notification nahi mila. Official sites par dekhte rahein." },
      { q: "Haryana FSO aur Himachal FSO ek hi exam hain?", a: "Nahi. Haryana ka exam Haryana Public Service Commission ka hai, Himachal ka alag notification aayega." },
      { q: "FSO ke liye kaun si degree chahiye?", a: "Food, dairy, biotechnology, agriculture, veterinary, biochemistry ya microbiology jaisi degrees, ya chemistry me master's, ya medical degree. Exact list advertisement me hoti hai." },
    ],
  },

  {
    slug: "hppsc-medical-officer-veterinary-officer-syllabus-preparation",
    seoTitle: "HPPSC Medical Officer and Veterinary Officer Syllabus, Preparation",
    seoDescription: "HPPSC Medical Officer (MBBS) aur Veterinary Officer (B.V.Sc.) ka qualification, paper ke subjects aur preparation strategy. Dono ke free mock test links.",
    title: "HPPSC Medical Officer and Veterinary Officer: Syllabus and Preparation Strategy",
    titleHi: "एचपीपीएससी मेडिकल ऑफिसर और वेटरनरी ऑफिसर: सिलेबस और तैयारी",
    excerpt: "Himachal ke do professional doctor posts ka qualification, paper ke subjects aur ek common preparation strategy.",
    category: "STRATEGY",
    exams: ["hppsc/medical-officer", "hppsc/veterinary-officer"],
    content: `Himachal ke **Health** aur **Animal Husbandry** departments ke doctors ki bharti **HPPSC, Shimla** karta hai. Dono posts ke liye professional degree aur council registration chahiye, aur advertisement me age limit, vacancies aur selection stages di jaati hain.

## Dono posts ek nazar me

| | Medical Officer (MO) | Veterinary Officer (VO) |
|---|---|---|
| Department | Health and Family Welfare | Animal Husbandry |
| Degree | MBBS (AYUSH posts: BAMS / BHMS) | B.V.Sc. & A.H. |
| Registration | Medical council | Veterinary council |
| Kaam | CHC, PHC, civil hospitals | Veterinary hospitals aur dispensaries |

## Paper ke subjects

**Medical Officer:** MBBS ke saare subjects, **community medicine**, national health programmes aur Himachal ka health GK.

**Veterinary Officer:** veterinary medicine, surgery, gynaecology and obstetrics, pathology, pharmacology, parasitology aur public health, saath me animal husbandry (breeds, nutrition, dairy management) aur Himachal ki livestock schemes.

## Common preparation strategy

1. Standard textbooks se **high-yield topics** pehle revise karo, last 5 saal ke papers dekh kar pehchano.
2. Community medicine / public health aur national programmes pe alag se dhyan do, ye hissa aksar neglect hota hai.
3. Himachal ke health ya livestock schemes ke notes banao.
4. Hafte me 2 timed mocks aur galtiyon ki notebook.

Free mocks: [Medical Officer](${free("hppsc-medical-officer-free-mock-1")}) aur [Veterinary Officer](${free("hppsc-veterinary-officer-free-mock-1")}). Detail me dekhne ke liye [MO page](/hppsc/medical-officer) aur [VO page](/hppsc/veterinary-officer).`,
    faqs: [
      { q: "Medical Officer ke liye kaun si degree chahiye?", a: "Allopathic MO ke liye MBBS, AYUSH posts ke liye BAMS ya BHMS, relevant council registration ke saath. Internship ki condition advertisement me hoti hai." },
      { q: "Veterinary Officer ke liye qualification kya hai?", a: "B.V.Sc. & A.H. degree aur Veterinary Council registration. Age limit aur vacancies advertisement me hoti hain." },
      { q: "Kaun si bharti HPPSC karta hai?", a: "Allopathic Medical Officer aur Veterinary Officer dono HPPSC, Shimla ke through bharti hote hain. AYUSH MO posts alag advertise hoti hain." },
    ],
  },
];
