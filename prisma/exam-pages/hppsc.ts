import type { ExamPages } from "./types";

// Exams recruited by the Himachal Pradesh Public Service Commission (HPPSC), Shimla. HPAS already has hand-written copy in
// prisma/seed-content.ts; only its SEO fields live here. BDO, Tehsildar and the other allied posts are filled through the
// HPAS Combined Competitive Exam, so they have no pages of their own.

const free = (slug: string) => `/tests/${slug}`;

export const HPPSC_PAGES: ExamPages = {
  "hppsc/hpas": {
    seo: {
      title: "HPAS Mock Test {year} — Free HPPSC Prelims Test Series",
      description: "Free HPAS prelims mock tests: General Studies and Himachal GK in a real CBT format. Hindi & English solutions and your rank among HP aspirants. No login to start.",
    },
  },

  "hppsc/assistant-professor": {
    seo: {
      title: "HPPSC Assistant Professor Mock Test {year} — Free Series",
      description: "Free HPPSC Assistant Professor mock tests: Paper I screening (Himachal GK, current affairs, Hindi, English) in real CBT format, with Hindi & English solutions.",
    },
    description: `**Assistant Professor** posts in Himachal Pradesh government colleges are filled by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**, subject by subject. The 2026 advertisement covered 369 posts across 22 subjects, with a separate online application for each subject on the HPPSC portal.

The qualification asked was a **Master's degree with at least 55% marks (50% for reserved categories) plus UGC NET / SLET / SET, or a PhD** as per UGC rules; the notification gives the subject-wise conditions and the age limit. Selected candidates join as Job Trainees on a fixed monthly amount before regularisation, as stated in the advertisement.

In the 2026 scheme the written test had two papers on the same day: **Paper I (screening, 100 marks, qualifying only)** and **Paper II (subject aptitude test, 120 marks)**, followed by a **personality test of 30 marks**. Final merit was built from Paper II plus the personality test, so Paper I only decides who gets evaluated.

Paper I me **Himachal GK, national and international affairs, Hindi aur English** aate hain. Yeh qualifying hai, lekin cutoff clear karna zaroori hai. Merit asli me Paper II (apna subject) aur interview se banti hai, isliye subject par sabse zyada time do aur Paper I ke liye roz thoda GK revision karo.

**How to prepare:** finish your subject at the UGC NET level, then revise Himachal GK and current affairs for Paper I. Start with the free [HPPSC Assistant Professor mock test](${free("hppsc-assistant-professor-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. The structure followed in 2026:

### Paper I: screening test (qualifying)
- General knowledge of Himachal Pradesh: history, geography, economy, culture, polity
- National and international affairs
- General Hindi
- General English

### Paper II: subject aptitude test
- Postgraduate-level syllabus of the subject applied for (the UGC NET syllabus of that subject is a reliable guide)
- Subject-wise topics are listed in the HPPSC notification

### Personality test
- Subject knowledge, communication, teaching aptitude and awareness of higher education`,
    pattern: {
      sections: [],
      durationMin: null,
      negativeMarking: "",
      note: "2026 scheme: Paper I screening test (100 marks, qualifying only; Himachal GK, national and international affairs, Hindi, English), Paper II subject aptitude test (120 marks) and a personality test (30 marks). Final merit is from Paper II plus the personality test. Confirm the current scheme in the HPPSC advertisement.",
    },
    faqs: [
      {
        q: "Assistant Professor ke liye qualification kya hai?",
        a: "Subject me Master's degree (kam se kam 55% marks, reserved categories ke liye 50%) aur UGC NET/SLET/SET, ya PhD as per UGC rules. Subject-wise conditions HPPSC ke advertisement me hoti hain.",
      },
      {
        q: "Do Paper I marks count in the final merit?",
        a: "In the 2026 scheme Paper I was a qualifying screening test, and final merit was based on Paper II plus the personality test. Check the current advertisement for any change.",
      },
      {
        q: "How many Assistant Professor posts did HPPSC advertise in 2026?",
        a: "The 2026 advertisement covered 369 posts in 22 subjects, each with its own application. Subject-wise dates and new notifications are posted on hppsc.hp.gov.in.",
      },
      {
        q: "Is Himachal GK needed for Assistant Professor?",
        a: "Yes. Paper I has a Himachal GK section along with current affairs, Hindi and English, so it is worth revising even if your subject is your main focus.",
      },
    ],
  },

  "hppsc/ado": {
    seo: {
      title: "HPPSC ADO Mock Test {year} — Agriculture Development Officer",
      description: "Free HPPSC ADO (Agriculture Development Officer) mock tests: agronomy, soil, horticulture, plant protection and Himachal GK in real CBT format, with solutions.",
    },
    description: `**Agriculture Development Officer (ADO)** is the officer who guides farmers in a development block on crops, soil health, inputs, pest management and government schemes, working under the Department of Agriculture, Himachal Pradesh. The post is filled by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**. In September 2026 HPPSC advertised 23 ADO posts with the last date of application on 22 October 2026.

The usual qualification is a **B.Sc. (Agriculture)** or the degree named in the recruitment rules; the advertisement states the exact subjects, percentage, age limit and selection stages, so read it before applying. Selection is by HPPSC in the stages mentioned in that advertisement.

ADO paper me **agronomy, soil science, horticulture, plant protection aur agricultural extension** ka technical hissa sabse zyada weight rakhta hai. Himachal ke liye khaas topics, jaise apple aur sabzi ki kheti, seed potato, natural farming aur horticulture schemes, ke seedhe questions aate hain. Saath me Himachal GK aur current affairs ke aasaan marks bhi hote hain.

**How to prepare:** revise agronomy, soil and extension from your degree notes, make a separate notebook for Himachal's crops, fruit belts and agriculture schemes, and take timed mocks. Start with the free [HPPSC ADO mock test](${free("hppsc-ado-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas for ADO:

### Agriculture subjects
- Agronomy: crops, cropping systems, weed management, water management
- Soil science and agricultural chemistry: soil fertility, fertilisers, soil testing
- Horticulture: fruit crops, vegetables, floriculture, post-harvest management
- Plant protection: entomology, plant pathology, integrated pest management
- Agricultural extension, rural development and farmer schemes
- Agricultural economics, marketing and statistics
- Genetics and plant breeding, seed technology

### Himachal agriculture
- Major crops, fruit belts and zones of Himachal Pradesh
- Natural farming and state agriculture and horticulture schemes

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge and English`,
    faqs: [
      {
        q: "ADO ke liye qualification kya hai?",
        a: "Aam taur par B.Sc. (Agriculture) ya recruitment rules me bataya gaya degree. Percentage aur age limit HPPSC ke advertisement me hoti hai.",
      },
      {
        q: "How many ADO posts did HPPSC advertise in 2026?",
        a: "HPPSC advertised 23 Agriculture Development Officer posts in September 2026, with the last date of application on 22 October 2026. Always confirm on hppsc.hp.gov.in.",
      },
      {
        q: "Does the ADO exam include Himachal-specific agriculture?",
        a: "Yes. Himachal's crops, fruit zones, horticulture and natural farming schemes are regularly asked, along with Himachal GK and current affairs.",
      },
    ],
  },

  "hppsc/assistant-engineer": {
    seo: {
      title: "HPPSC Assistant Engineer Mock Test {year} — AE Civil, Electrical",
      description: "Free HPPSC Assistant Engineer mock tests: civil, electrical and mechanical technical subjects plus Himachal GK in real CBT format, with solutions.",
    },
    description: `**Assistant Engineer (AE)** is a technical officer post in Himachal Pradesh government departments such as the PWD and Jal Shakti Vibhag, in the Civil, Electrical and Mechanical branches. AE posts in these departments are advertised by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**. The HPSEBL (electricity board) recruits its own AEs; see the [HPSEBL Assistant Engineer](/hpsebl/assistant-engineer) page for that.

The qualification is a **B.E. / B.Tech in the relevant branch** and the advertisement gives the percentage, age limit and the selection stages (a written test, with an interview where notified). Because these are technical posts with small vacancy numbers, the written test is demanding.

AE paper me **tumhari branch ka degree-level technical syllabus** sabse bada hissa hota hai, saath me General Studies aur Himachal GK. Civil me structures, geotechnical, hydrology aur transportation; Electrical me machines, power systems aur control; Mechanical me thermodynamics aur machine design par focus rakho.

**How to prepare:** revise core subjects of your branch from your degree books, practise GATE-style numericals and keep a short Himachal GK notebook (hydropower projects and rivers matter for engineers). Start with the free [HPPSC Assistant Engineer mock test](${free("hppsc-assistant-engineer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas:

### Civil engineering
- Structural analysis, RCC and steel design
- Geotechnical engineering and foundation
- Fluid mechanics, hydrology and water resources
- Transportation engineering, surveying, construction management
- Environmental engineering, estimating and costing

### Electrical engineering
- Circuits, electrical machines and transformers
- Power systems, protection, transmission and distribution
- Control systems, measurements and power electronics

### Mechanical engineering
- Thermodynamics, fluid machinery, heat transfer
- Strength of materials, theory of machines, machine design
- Manufacturing, industrial engineering and IC engines

### General section
- General studies, Himachal Pradesh GK and current affairs
- English comprehension`,
    faqs: [
      {
        q: "HPPSC AE ke liye qualification kya hai?",
        a: "Relevant branch (Civil, Electrical ya Mechanical) me B.E./B.Tech. Percentage aur age limit advertisement me di jaati hain.",
      },
      {
        q: "Is HPSEBL Assistant Engineer recruited by HPPSC?",
        a: "No. HPSEBL (the state electricity board) recruits its own engineers through its own notifications. This page covers AE posts advertised by HPPSC.",
      },
      {
        q: "Which branches have AE posts?",
        a: "Civil, Electrical and Mechanical branches are advertised depending on the department's vacancies. Each advertisement lists branch-wise posts.",
      },
    ],
  },

  "hppsc/medical-officer": {
    seo: {
      title: "HPPSC Medical Officer Mock Test {year} — Free MO Series",
      description: "Free HPPSC Medical Officer mock tests: MBBS subjects, community medicine, national health programmes and Himachal health GK in real CBT format.",
    },
    description: `**Medical Officer (MO)** is the entry-level doctor post in the Himachal Pradesh Department of Health and Family Welfare, serving in community health centres, primary health centres and civil hospitals. Allopathic MO posts are filled by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**, and the Commission also advertises Medical Officer posts for Ayurveda and Homeopathy separately.

The qualification is an **MBBS degree** (BAMS or BHMS for the AYUSH posts) with registration in the relevant medical council; the advertisement states the internship requirement, age limit, vacancies and the selection stages.

MO paper me **MBBS ke saare subjects** aate hain, lekin sabse zyada weight **Community Medicine (PSM), Medicine, Surgery, OBG aur Paediatrics** ka hota hai. Public health ke saath national health programmes, vaccination schedule aur Himachal ke health indicators par bhi seedhe questions puchhe jaate hain, jo MBBS ke baad bhi alag se padhne padte hain.

**How to prepare:** revise PSM and national programmes first, then clinical subjects through a standard MCQ book, and add a page of Himachal health facts (health institutions, schemes, indicators). Start with the free [HPPSC Medical Officer mock test](${free("hppsc-medical-officer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas for the MBBS MO paper:

### Clinical subjects
- General medicine, surgery, obstetrics and gynaecology, paediatrics
- Orthopaedics, ophthalmology, ENT, dermatology, psychiatry, anaesthesia

### Pre- and para-clinical subjects
- Anatomy, physiology, biochemistry
- Pathology, microbiology, pharmacology, forensic medicine

### Public health
- Community medicine (PSM), epidemiology and biostatistics
- National health programmes, immunisation, maternal and child health
- Health system of Himachal Pradesh, health schemes and indicators

### General awareness
- Himachal Pradesh GK and current affairs`,
    faqs: [
      {
        q: "HPPSC Medical Officer ke liye qualification kya hai?",
        a: "MBBS (AYUSH posts ke liye BAMS/BHMS) aur relevant medical council me registration. Internship, age limit aur selection stages advertisement me bataye jaate hain.",
      },
      {
        q: "Which subject carries the most weight in the MO paper?",
        a: "Community medicine (PSM) and the core clinical subjects (medicine, surgery, OBG, paediatrics) carry the most weight, along with national health programmes.",
      },
      {
        q: "Are AYUSH Medical Officers recruited by HPPSC too?",
        a: "Yes, HPPSC advertises Medical Officer posts for Ayurveda and Homeopathy separately. Each has its own qualification and syllabus in the advertisement.",
      },
    ],
  },

  "hppsc/veterinary-officer": {
    seo: {
      title: "HPPSC Veterinary Officer Mock Test {year} — Free VO Series",
      description: "Free HPPSC Veterinary Officer mock tests: veterinary medicine, surgery, animal husbandry and Himachal GK in real CBT format, with Hindi & English solutions.",
    },
    description: `**Veterinary Officer (VO)** is the doctor of the Animal Husbandry Department in Himachal Pradesh, treating livestock in veterinary hospitals and dispensaries and running vaccination, breeding and disease-control programmes. Posts are filled by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**. The qualification is a **B.V.Sc. & A.H.** degree with registration with the Veterinary Council; the advertisement states the age limit, vacancies and selection stages.

Livestock is central to rural Himachal, so the department is a major employer of veterinary graduates and competition is strong for the limited vacancies. Read the advertisement for the exact selection process and weightage.

VO paper me **veterinary medicine, surgery, gynaecology and obstetrics, pathology, pharmacology, parasitology aur public health** ke questions aate hain. Animal husbandry me breeds, nutrition aur dairy management ke saath Himachal ki livestock schemes, jaise sheep and wool, gaddi sheep aur cattle breeding, ka bhi hissa hota hai.

**How to prepare:** revise each veterinary subject through standard MCQ books, memorise common diseases with their causes, vaccines and treatments, and add a short page on Himachal's livestock. Start with the free [HPPSC Veterinary Officer mock test](${free("hppsc-veterinary-officer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas for the B.V.Sc. paper:

### Veterinary sciences
- Veterinary anatomy, physiology and biochemistry
- Pathology, microbiology and parasitology
- Pharmacology and toxicology
- Veterinary medicine, surgery and radiology
- Gynaecology, obstetrics and reproductive management
- Veterinary public health, zoonoses and epidemiology

### Animal husbandry
- Animal nutrition, feeds and fodder
- Livestock production and management, breeds of cattle, sheep, goat and poultry
- Dairy science and animal genetics

### Himachal and general
- Livestock and animal husbandry schemes of Himachal Pradesh
- Himachal Pradesh GK and current affairs`,
    faqs: [
      {
        q: "Veterinary Officer ke liye qualification kya hai?",
        a: "B.V.Sc. & A.H. degree aur Veterinary Council me registration. Age limit aur other conditions HPPSC ke advertisement me hoti hain.",
      },
      {
        q: "Which topics are most important for the VO exam?",
        a: "Veterinary medicine, surgery, gynaecology and obstetrics, pathology and pharmacology carry the most questions, along with animal husbandry and zoonoses.",
      },
      {
        q: "Is Himachal GK part of the Veterinary Officer paper?",
        a: "The general awareness part covers Himachal GK and current affairs, plus state livestock schemes. Check the advertisement for the exact split.",
      },
    ],
  },

  "hppsc/food-safety-officer": {
    seo: {
      title: "HPPSC Food Safety Officer Mock Test {year} — Free FSO Series",
      description: "Free Food Safety Officer mock tests: FSS Act 2006, food chemistry, microbiology, adulteration and Himachal GK in real CBT format, with solutions.",
    },
    description: `**Food Safety Officer (FSO)** enforces the **Food Safety and Standards Act, 2006** at district level: inspecting food businesses, drawing samples, sending them to labs and starting action against adulteration. In Himachal Pradesh the post sits in the Health and Family Welfare Department and is filled through **HPPSC, Shimla** advertisements.

The qualification set by the Food Safety and Standards rules is a **degree in Food Technology, Dairy Technology, Biotechnology, Oil Technology, Agricultural Science, Veterinary Science, Biochemistry or Microbiology, a master's degree in Chemistry, or a medical degree** (the advertisement lists the exact eligible degrees), plus the age limit and selection stages given in it.

FSO paper me **FSS Act aur uske Rules, Regulations** ke seedhe questions sabse zyada aate hain, saath me food chemistry, food microbiology, nutrition, food preservation aur adulteration tests. Act ke sections, licensing aur registration ki limits, aur sampling procedure yaad karna scoring hai.

**How to prepare:** read the FSS Act chapter by chapter, make a table of licensing conditions and penalties, and revise food chemistry and microbiology from standard books. Start with the free [Food Safety Officer mock test](${free("hppsc-food-safety-officer-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas:

### Food law
- Food Safety and Standards Act, 2006: authorities, licensing, registration, penalties
- FSS Rules and Regulations, labelling, packaging and advertising
- Role and powers of the Food Safety Officer, sampling and analysis procedure

### Food science
- Food chemistry: carbohydrates, proteins, fats, vitamins, additives
- Food microbiology: spoilage, foodborne diseases, preservation
- Food processing, quality control and HACCP
- Nutrition, adulteration and detection tests

### General awareness
- Himachal Pradesh GK and current affairs
- General knowledge and English`,
    faqs: [
      {
        q: "Food Safety Officer ke liye kaun si degree chahiye?",
        a: "Food Technology, Dairy Technology, Biotechnology, Oil Technology, Agricultural Science, Veterinary Science, Biochemistry ya Microbiology me degree, Chemistry me master's, ya medical degree. Exact list advertisement me hoti hai.",
      },
      {
        q: "Is the FSS Act important for the FSO exam?",
        a: "Yes. Direct questions on the Food Safety and Standards Act, 2006, its rules and regulations, licensing and penalties form a large part of the paper.",
      },
      {
        q: "Who recruits Food Safety Officers in Himachal?",
        a: "FSO posts in the Health and Family Welfare Department have been advertised through HPPSC. Watch hppsc.hp.gov.in for notifications and read the advertisement for the recruiting agency.",
      },
    ],
  },

  "hppsc/judicial-services": {
    seo: {
      title: "HP Judicial Services Mock Test {year} — Civil Judge Prelims",
      description: "Free HP Judicial Services (Civil Judge) prelims mock tests: Constitution, CPC, evidence, contract and criminal law in real CBT format, with solutions.",
    },
    description: `**HP Judicial Services** is the entry route to the post of **Civil Judge (Junior Division)** in the Himachal Pradesh subordinate judiciary. The examination is conducted by the **Himachal Pradesh Public Service Commission (HPPSC), Shimla**, in consultation with the High Court of Himachal Pradesh. The selection has a **preliminary examination (objective)**, a **main examination (descriptive law papers)** and a **viva-voce**, as given in the advertisement.

The basic qualification is a **law degree (LL.B.)** with the eligibility to practise as an advocate; the advertisement states the age limit, the practice or enrolment condition and the number of vacancies.

Prelims me **Constitution, CPC, CrPC/BNSS, IPC/BNS, Indian Evidence Act/BSA, Contract Act, Transfer of Property Act** aur Himachal-specific laws se questions aate hain. Dhyan rahe ki 1 July 2024 se IPC, CrPC aur Evidence Act ki jagah **BNS, BNSS aur BSA** lagu hain; advertisement me jo version bataya ho wahi padho.

**How to prepare:** read bare acts with illustrations, solve past prelims papers, and make short notes of landmark judgments. Start with the free [HP Judicial Services mock test](${free("hppsc-judicial-services-free-mock-1")}).`,
    syllabus: `The detailed syllabus is in the HPPSC advertisement. Usual areas:

### Constitutional and procedural law
- Constitution of India: fundamental rights, directive principles, judiciary
- Code of Civil Procedure, 1908
- Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita, 2023

### Substantive law
- Indian Penal Code / Bharatiya Nyaya Sanhita, 2023
- Indian Evidence Act / Bharatiya Sakshya Adhiniyam, 2023
- Indian Contract Act, Sale of Goods Act, Transfer of Property Act
- Specific Relief Act, Limitation Act, Negotiable Instruments Act
- Himachal Pradesh land and tenancy laws as notified

### General and language
- General knowledge, current affairs and legal awareness
- English and Hindi (translation and essay in the mains)`,
    faqs: [
      {
        q: "HP Judicial Services ke liye qualification kya hai?",
        a: "LL.B. degree aur advocate ke roop me practise karne ki eligibility. Age limit aur enrolment ki condition advertisement me hoti hai.",
      },
      {
        q: "Which criminal laws should I study now?",
        a: "From 1 July 2024 the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam replaced the IPC, CrPC and Evidence Act. Follow the version named in the advertisement.",
      },
      {
        q: "What are the stages of the HP Civil Judge selection?",
        a: "A preliminary examination, a main examination of descriptive law papers and a viva-voce, as given in the HPPSC advertisement.",
      },
    ],
  },
};
