// Short, stable explanations of the bodies that recruit for the exams, shown on the body pages (/hprca, /hppsc, ...). A body gets a
// page only when it has text here AND at least two exams, so single-exam bodies do not get a near-copy of their exam page.
// Keep it to facts that outlive one notification; dated facts belong in blog posts.

export type BodyInfo = {
  /** Markdown, two short paragraphs. */
  about: string;
  /** Exam-agnostic questions for this body; the page adds "which exams" and "where to practise" itself. */
  faqs: { q: string; a: string }[];
};

/** A body page is worth having only when the body has text here and at least two exams to list. */
export function hasBodyPage(body: { slug: string; exams: unknown[] }): boolean {
  return body.exams.length >= 2 && !!BODY_INFO[body.slug];
}

export const BODY_INFO: Record<string, BodyInfo> = {
  hprca: {
    about: `The **Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur** is the state agency that recruits for a wide range of posts in Himachal Pradesh government departments, mainly Class III: clerks, junior office assistants, teachers (JBT, TGT, Language Teacher), nurses, pharmacists, engineers, [Patwari](/hp-revenue/patwari) and more. It replaced the earlier HP Staff Selection Commission (HPSSC).

Most HPRCA selections use a **computer-based test (CBT)** followed by document verification, and clerical posts add a typing skill test. The post-wise notification states the exact stages, so every HPRCA mock test here runs in a CBT-style interface with a timer, a question palette and a Hindi-English switch.`,
    faqs: [
      {
        q: "HPRCA ka exam kaise hota hai?",
        a: "Zyadatar posts me computer-based test hota hai, uske baad document verification; Clerk aur JOA jaise posts me typing skill test bhi hota hai. Exact pattern post-wise notification me hota hai.",
      },
      {
        q: "Did HPRCA replace HPSSC Hamirpur?",
        a: "Yes. Recruitment that the HP Staff Selection Commission (HPSSC) used to do is now handled by HPRCA, Hamirpur.",
      },
    ],
  },

  hppsc: {
    about: `The **Himachal Pradesh Public Service Commission (HPPSC), Shimla** is the constitutional body that recruits officers for the state: HPAS and the allied services, Assistant Professors, Assistant Engineers, Medical and Veterinary Officers, Agriculture Development Officers and more.

Selection usually combines an objective screening or prelims test with descriptive papers or an interview, as each advertisement states. Himachal GK and General Studies appear in almost every HPPSC paper, so the mock tests here start with them.`,
    faqs: [
      {
        q: "HPPSC kaun si exams conduct karta hai?",
        a: "HPAS combined exam, Assistant Professor, Agriculture Development Officer, Assistant Engineer, Medical Officer, Veterinary Officer, Food Safety Officer, Civil Judge aur anya officer-level posts.",
      },
      {
        q: "Is Himachal GK asked in HPPSC exams?",
        a: "Yes. Most HPPSC papers include Himachal Pradesh GK along with General Studies, and screening papers such as the Assistant Professor Paper I test it directly.",
      },
    ],
  },

  "hp-police": {
    about: `**Himachal Pradesh Police** recruits constables and sub-inspectors. Selection combines physical standard and efficiency tests with a written objective test, and each advertisement states the order of the stages and the marks for each.

The written papers test general knowledge, Himachal GK, reasoning and numerical ability, so steady practice on these sections matters as much as the physical preparation.`,
    faqs: [
      {
        q: "HP Police ki written exam me kya aata hai?",
        a: "General knowledge, Himachal GK, reasoning aur numerical ability (SI me English/Hindi bhi). Marks aur qualifying standards notification me diye hote hain.",
      },
    ],
  },

  "hp-high-court": {
    about: `The **High Court of Himachal Pradesh, Shimla** recruits its own registry and court staff, such as clerks, stenographers, process servers and court managers, and takes applications on its own recruitment portal (hphcrecruitment.in). In August 2026 it advertised 388 posts.

Papers for clerical posts typically cover English, Hindi, general knowledge including Himachal GK, reasoning, maths and computer basics, and posts such as clerk and stenographer carry typing or shorthand skill tests. The High Court notification states the stages and the syllabus.`,
    faqs: [
      {
        q: "Does HPRCA conduct the High Court recruitment?",
        a: "No. The High Court of Himachal Pradesh recruits its own staff and receives applications on its recruitment portal.",
      },
    ],
  },

  hpsebl: {
    about: `The **Himachal Pradesh State Electricity Board Limited (HPSEBL), Shimla** runs the state's power distribution and recruits its own engineers and technical staff: Junior Engineers, Assistant Engineers and Linemen.

Technical subject knowledge is the core of these papers, with a smaller general section on Himachal GK and aptitude. HPSEBL advertises its posts on its own website, so read its notification for the qualification, process and syllabus.`,
    faqs: [
      {
        q: "Does HPSEBL recruit through HPPSC or HPRCA?",
        a: "HPSEBL advertises its own posts on its website. Always read the HPSEBL notification for the recruiting agency and the process.",
      },
    ],
  },
};
