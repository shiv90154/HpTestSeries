// Free demo mock test (no login needed) — real, verified questions in English and Hindi.
// Idempotent: questions are matched by text hash, the test by slug.

import type { PrismaClient } from "../src/generated/prisma/client";
import { FREE_MOCK_SLUG } from "../src/lib/site";
import { questionTextHash } from "../src/modules/content/text-hash";

type Lang = { q: string; o: [string, string, string, string]; e: string };
type DemoQuestion = {
  section: 0 | 1 | 2;
  subject: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  answer: 0 | 1 | 2 | 3;
  en: Lang;
  hi: Lang;
};

export const DEMO_TEST_SLUG = FREE_MOCK_SLUG;

const sections = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
  { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित" },
  { name: "Computer", nameHi: "कंप्यूटर" },
];

const questions: DemoQuestion[] = [
  {
    section: 0, subject: "hp-gk", topic: "history", difficulty: "EASY", answer: 2,
    en: { q: "On which date did Himachal Pradesh become a full-fledged state?", o: ["15 April 1948", "1 November 1966", "25 January 1971", "26 January 1950"], e: "Himachal Pradesh became the 18th state of India on 25 January 1971. This day is celebrated as Statehood Day (Poorn Rajyatva Diwas)." },
    hi: { q: "हिमाचल प्रदेश को पूर्ण राज्य का दर्जा किस तिथि को मिला?", o: ["15 अप्रैल 1948", "1 नवंबर 1966", "25 जनवरी 1971", "26 जनवरी 1950"], e: "हिमाचल प्रदेश 25 जनवरी 1971 को भारत का 18वाँ राज्य बना। इस दिन को पूर्ण राज्यत्व दिवस के रूप में मनाया जाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "personalities", difficulty: "EASY", answer: 1,
    en: { q: "Who was the first Chief Minister of Himachal Pradesh?", o: ["Thakur Ram Lal", "Dr. Yashwant Singh Parmar", "Shanta Kumar", "Virbhadra Singh"], e: "Dr. Yashwant Singh Parmar was the first Chief Minister of Himachal Pradesh and is known as the architect of Himachal Pradesh." },
    hi: { q: "हिमाचल प्रदेश के पहले मुख्यमंत्री कौन थे?", o: ["ठाकुर राम लाल", "डॉ. यशवंत सिंह परमार", "शांता कुमार", "वीरभद्र सिंह"], e: "डॉ. यशवंत सिंह परमार हिमाचल प्रदेश के पहले मुख्यमंत्री थे और उन्हें हिमाचल का निर्माता कहा जाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "districts", difficulty: "EASY", answer: 2,
    en: { q: "How many districts are there in Himachal Pradesh?", o: ["10", "11", "12", "14"], e: "Himachal Pradesh has 12 districts: Bilaspur, Chamba, Hamirpur, Kangra, Kinnaur, Kullu, Lahaul & Spiti, Mandi, Shimla, Sirmaur, Solan and Una." },
    hi: { q: "हिमाचल प्रदेश में कितने जिले हैं?", o: ["10", "11", "12", "14"], e: "हिमाचल प्रदेश में 12 जिले हैं: बिलासपुर, चंबा, हमीरपुर, कांगड़ा, किन्नौर, कुल्लू, लाहौल-स्पीति, मंडी, शिमला, सिरमौर, सोलन और ऊना।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "districts", difficulty: "EASY", answer: 3,
    en: { q: "Which is the largest district of Himachal Pradesh by area?", o: ["Kangra", "Chamba", "Kinnaur", "Lahaul & Spiti"], e: "Lahaul & Spiti is the largest district of Himachal Pradesh by area, but it has the lowest population." },
    hi: { q: "क्षेत्रफल की दृष्टि से हिमाचल प्रदेश का सबसे बड़ा जिला कौन-सा है?", o: ["कांगड़ा", "चंबा", "किन्नौर", "लाहौल-स्पीति"], e: "लाहौल-स्पीति क्षेत्रफल में हिमाचल प्रदेश का सबसे बड़ा जिला है, लेकिन इसकी जनसंख्या सबसे कम है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "districts", difficulty: "MEDIUM", answer: 0,
    en: { q: "Which is the smallest district of Himachal Pradesh by area?", o: ["Hamirpur", "Bilaspur", "Una", "Solan"], e: "Hamirpur is the smallest district of Himachal Pradesh by area." },
    hi: { q: "क्षेत्रफल की दृष्टि से हिमाचल प्रदेश का सबसे छोटा जिला कौन-सा है?", o: ["हमीरपुर", "बिलासपुर", "ऊना", "सोलन"], e: "क्षेत्रफल की दृष्टि से हमीरपुर हिमाचल प्रदेश का सबसे छोटा जिला है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Chandra and Bhaga rivers meet at which place to form the Chandrabhaga?", o: ["Tandi", "Keylong", "Udaipur", "Kaza"], e: "The Chandra and Bhaga meet at Tandi in Lahaul to form the Chandrabhaga, which is known as the Chenab in Jammu & Kashmir." },
    hi: { q: "चंद्रा और भागा नदियाँ किस स्थान पर मिलकर चंद्रभागा बनाती हैं?", o: ["तांदी", "केलांग", "उदयपुर", "काज़ा"], e: "चंद्रा और भागा नदियाँ लाहौल के तांदी में मिलकर चंद्रभागा बनाती हैं, जिसे जम्मू-कश्मीर में चिनाब कहा जाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "EASY", answer: 1,
    en: { q: "The Bhakra Dam is built on which river?", o: ["Beas", "Sutlej", "Ravi", "Yamuna"], e: "The Bhakra Dam is built on the Sutlej river in Bilaspur district. Its reservoir is called Gobind Sagar." },
    hi: { q: "भाखड़ा बाँध किस नदी पर बना है?", o: ["ब्यास", "सतलुज", "रावी", "यमुना"], e: "भाखड़ा बाँध बिलासपुर जिले में सतलुज नदी पर बना है। इसके जलाशय को गोबिंद सागर कहा जाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 1,
    en: { q: "The reservoir of the Pong Dam on the Beas river is known as:", o: ["Gobind Sagar", "Maharana Pratap Sagar", "Chamera Lake", "Pandoh Lake"], e: "The Pong Dam on the Beas river in Kangra district forms the Maharana Pratap Sagar reservoir, an important wetland for migratory birds." },
    hi: { q: "ब्यास नदी पर बने पौंग बाँध के जलाशय को किस नाम से जाना जाता है?", o: ["गोबिंद सागर", "महाराणा प्रताप सागर", "चमेरा झील", "पंडोह झील"], e: "कांगड़ा जिले में ब्यास नदी पर बने पौंग बाँध से महाराणा प्रताप सागर जलाशय बनता है, जो प्रवासी पक्षियों का महत्वपूर्ण स्थल है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "EASY", answer: 1,
    en: { q: "Which is the largest natural lake of Himachal Pradesh?", o: ["Rewalsar", "Renuka", "Prashar", "Chandratal"], e: "Renuka Lake in Sirmaur district is the largest natural lake of Himachal Pradesh." },
    hi: { q: "हिमाचल प्रदेश की सबसे बड़ी प्राकृतिक झील कौन-सी है?", o: ["रिवालसर", "रेणुका", "पराशर", "चंद्रताल"], e: "सिरमौर जिले की रेणुका झील हिमाचल प्रदेश की सबसे बड़ी प्राकृतिक झील है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "geography", difficulty: "EASY", answer: 1,
    en: { q: "The Atal Tunnel is built under which pass?", o: ["Baralacha La", "Rohtang Pass", "Kunzum Pass", "Shipki La"], e: "The Atal Tunnel, opened in October 2020, is built under the Rohtang Pass and connects Manali with the Lahaul-Spiti valley all year round." },
    hi: { q: "अटल सुरंग किस दर्रे के नीचे बनी है?", o: ["बारालाचा ला", "रोहतांग दर्रा", "कुंजुम दर्रा", "शिपकी ला"], e: "अक्टूबर 2020 में खुली अटल सुरंग रोहतांग दर्रे के नीचे बनी है और मनाली को पूरे वर्ष लाहौल-स्पीति घाटी से जोड़ती है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "geography", difficulty: "MEDIUM", answer: 1,
    en: { q: "What is the state bird of Himachal Pradesh?", o: ["Himalayan Monal", "Western Tragopan (Jujurana)", "Peacock", "Cheer Pheasant"], e: "The Western Tragopan, locally called Jujurana, is the state bird of Himachal Pradesh. It replaced the Monal as state bird in 2007." },
    hi: { q: "हिमाचल प्रदेश का राज्य पक्षी कौन-सा है?", o: ["हिमालयन मोनाल", "पश्चिमी ट्रैगोपैन (जुजुराना)", "मोर", "चीड़ फीजेंट"], e: "पश्चिमी ट्रैगोपैन, जिसे स्थानीय रूप से जुजुराना कहते हैं, हिमाचल प्रदेश का राज्य पक्षी है। 2007 में इसने मोनाल का स्थान लिया।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "culture-festivals", difficulty: "EASY", answer: 0,
    en: { q: "The International Kullu Dussehra is celebrated at:", o: ["Dhalpur Maidan", "Paddal Ground", "The Ridge", "Chaugan"], e: "Kullu Dussehra is celebrated at Dhalpur Maidan in Kullu. (Paddal ground is in Mandi, the Ridge in Shimla and Chaugan in Chamba.)" },
    hi: { q: "अंतरराष्ट्रीय कुल्लू दशहरा कहाँ मनाया जाता है?", o: ["ढालपुर मैदान", "पड्डल मैदान", "रिज मैदान", "चौगान"], e: "कुल्लू दशहरा कुल्लू के ढालपुर मैदान में मनाया जाता है। (पड्डल मैदान मंडी में, रिज शिमला में और चौगान चंबा में है।)" },
  },
  {
    section: 0, subject: "hp-gk", topic: "culture-festivals", difficulty: "EASY", answer: 1,
    en: { q: "The famous Minjar fair is held in which district?", o: ["Mandi", "Chamba", "Kullu", "Kinnaur"], e: "The Minjar fair is held in Chamba and is associated with the maize harvest and the Ravi river." },
    hi: { q: "प्रसिद्ध मिंजर मेला किस जिले में आयोजित होता है?", o: ["मंडी", "चंबा", "कुल्लू", "किन्नौर"], e: "मिंजर मेला चंबा में आयोजित होता है और यह मक्की की फसल तथा रावी नदी से जुड़ा है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "geography", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Great Himalayan National Park, a UNESCO World Heritage Site, is located in which district?", o: ["Kullu", "Shimla", "Chamba", "Lahaul & Spiti"], e: "The Great Himalayan National Park is in Kullu district. It was declared a UNESCO World Heritage Site in 2014." },
    hi: { q: "यूनेस्को विश्व धरोहर स्थल ग्रेट हिमालयन नेशनल पार्क किस जिले में स्थित है?", o: ["कुल्लू", "शिमला", "चंबा", "लाहौल-स्पीति"], e: "ग्रेट हिमालयन नेशनल पार्क कुल्लू जिले में है। इसे 2014 में यूनेस्को विश्व धरोहर स्थल घोषित किया गया।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "polity-administration", difficulty: "EASY", answer: 2,
    en: { q: "How many seats are there in the Himachal Pradesh Vidhan Sabha?", o: ["56", "64", "68", "72"], e: "The Himachal Pradesh Legislative Assembly (Vidhan Sabha) has 68 seats. The state also has 4 Lok Sabha and 3 Rajya Sabha seats." },
    hi: { q: "हिमाचल प्रदेश विधानसभा में कितनी सीटें हैं?", o: ["56", "64", "68", "72"], e: "हिमाचल प्रदेश विधानसभा में 68 सीटें हैं। राज्य में लोकसभा की 4 और राज्यसभा की 3 सीटें हैं।" },
  },

  {
    section: 1, subject: "reasoning", topic: "series", difficulty: "EASY", answer: 2,
    en: { q: "Find the next number in the series: 2, 6, 12, 20, 30, ?", o: ["36", "40", "42", "44"], e: "The differences are 4, 6, 8, 10, so the next difference is 12: 30 + 12 = 42. (Each term is n × (n + 1).)" },
    hi: { q: "श्रृंखला में अगली संख्या ज्ञात कीजिए: 2, 6, 12, 20, 30, ?", o: ["36", "40", "42", "44"], e: "अंतर 4, 6, 8, 10 हैं, इसलिए अगला अंतर 12 होगा: 30 + 12 = 42। (प्रत्येक पद n × (n + 1) है।)" },
  },
  {
    section: 1, subject: "reasoning", topic: "coding-decoding", difficulty: "EASY", answer: 0,
    en: { q: "If CAT is coded as DBU, how is DOG coded?", o: ["EPH", "EPI", "FPH", "DNH"], e: "Each letter moves one step forward: C→D, A→B, T→U. So D→E, O→P, G→H gives EPH." },
    hi: { q: "यदि CAT को DBU लिखा जाता है, तो DOG को कैसे लिखा जाएगा?", o: ["EPH", "EPI", "FPH", "DNH"], e: "प्रत्येक अक्षर एक स्थान आगे बढ़ता है: C→D, A→B, T→U। इसलिए D→E, O→P, G→H से EPH बनता है।" },
  },
  {
    section: 1, subject: "quant", topic: "percentage", difficulty: "EASY", answer: 2,
    en: { q: "What is 20% of 250?", o: ["40", "45", "50", "55"], e: "20% of 250 = (20 / 100) × 250 = 50." },
    hi: { q: "250 का 20% कितना है?", o: ["40", "45", "50", "55"], e: "250 का 20% = (20 / 100) × 250 = 50।" },
  },
  {
    section: 1, subject: "quant", topic: "number-system", difficulty: "EASY", answer: 2,
    en: { q: "Which is the smallest prime number?", o: ["0", "1", "2", "3"], e: "2 is the smallest prime number and the only even prime number. 1 is neither prime nor composite." },
    hi: { q: "सबसे छोटी अभाज्य (prime) संख्या कौन-सी है?", o: ["0", "1", "2", "3"], e: "2 सबसे छोटी अभाज्य संख्या है और एकमात्र सम अभाज्य संख्या भी। 1 न तो अभाज्य है और न ही भाज्य।" },
  },
  {
    section: 1, subject: "quant", topic: "profit-loss", difficulty: "EASY", answer: 1,
    en: { q: "A shopkeeper buys an article for ₹400 and sells it for ₹500. What is his profit percentage?", o: ["20%", "25%", "30%", "50%"], e: "Profit = 500 − 400 = ₹100. Profit % = (100 / 400) × 100 = 25%." },
    hi: { q: "एक दुकानदार कोई वस्तु ₹400 में खरीदकर ₹500 में बेचता है। उसका लाभ प्रतिशत कितना है?", o: ["20%", "25%", "30%", "50%"], e: "लाभ = 500 − 400 = ₹100। लाभ % = (100 / 400) × 100 = 25%।" },
  },

  {
    section: 2, subject: "computer", topic: "fundamentals", difficulty: "EASY", answer: 0,
    en: { q: "What is the full form of CPU?", o: ["Central Processing Unit", "Central Program Unit", "Computer Processing Unit", "Control Processing Unit"], e: "CPU stands for Central Processing Unit. It is called the brain of the computer." },
    hi: { q: "CPU का पूर्ण रूप क्या है?", o: ["Central Processing Unit", "Central Program Unit", "Computer Processing Unit", "Control Processing Unit"], e: "CPU का पूर्ण रूप Central Processing Unit है। इसे कंप्यूटर का मस्तिष्क कहा जाता है।" },
  },
  {
    section: 2, subject: "computer", topic: "fundamentals", difficulty: "EASY", answer: 1,
    en: { q: "1 Kilobyte (KB) is equal to:", o: ["1000 bytes", "1024 bytes", "1024 bits", "512 bytes"], e: "In computer memory, 1 KB = 1024 bytes (2¹⁰ bytes)." },
    hi: { q: "1 किलोबाइट (KB) किसके बराबर होता है?", o: ["1000 बाइट", "1024 बाइट", "1024 बिट", "512 बाइट"], e: "कंप्यूटर मेमोरी में 1 KB = 1024 बाइट (2¹⁰ बाइट) होता है।" },
  },
  {
    section: 2, subject: "computer", topic: "ms-office", difficulty: "EASY", answer: 1,
    en: { q: "Which keyboard shortcut is used to Undo the last action in MS Word?", o: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"], e: "Ctrl + Z undoes the last action. Ctrl + Y redoes, Ctrl + U underlines and Ctrl + X cuts." },
    hi: { q: "MS Word में पिछली क्रिया को Undo करने के लिए कौन-सा शॉर्टकट उपयोग होता है?", o: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"], e: "Ctrl + Z से पिछली क्रिया Undo होती है। Ctrl + Y से Redo, Ctrl + U से अंडरलाइन और Ctrl + X से Cut होता है।" },
  },
  {
    section: 2, subject: "computer", topic: "fundamentals", difficulty: "EASY", answer: 2,
    en: { q: "Which of the following is an input device?", o: ["Monitor", "Printer", "Keyboard", "Speaker"], e: "A keyboard is an input device. Monitor, printer and speaker are output devices." },
    hi: { q: "निम्नलिखित में से कौन-सा इनपुट डिवाइस है?", o: ["मॉनिटर", "प्रिंटर", "कीबोर्ड", "स्पीकर"], e: "कीबोर्ड एक इनपुट डिवाइस है। मॉनिटर, प्रिंटर और स्पीकर आउटपुट डिवाइस हैं।" },
  },
  {
    section: 2, subject: "computer", topic: "ms-office", difficulty: "EASY", answer: 0,
    en: { q: "In MS Excel, a formula begins with which symbol?", o: ["=", "#", "&", "%"], e: "Formulas in MS Excel begin with the equals sign (=), for example =SUM(A1:A5)." },
    hi: { q: "MS Excel में फॉर्मूला किस चिह्न से शुरू होता है?", o: ["=", "#", "&", "%"], e: "MS Excel में फॉर्मूला बराबर (=) चिह्न से शुरू होता है, जैसे =SUM(A1:A5)।" },
  },
];

export async function seedDemoTest(db: PrismaClient) {
  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  const questionIds: string[] = [];
  for (const q of questions) {
    const textHash = questionTextHash(q.en.q);
    const existing = await db.question.findFirst({ where: { textHash }, select: { id: true } });
    if (existing) {
      questionIds.push(existing.id);
      continue;
    }
    const tId = topicId.get(`${q.subject}/${q.topic}`);
    if (!tId) throw new Error(`Seed topic missing: ${q.subject}/${q.topic}`);
    const created = await db.question.create({
      data: {
        difficulty: q.difficulty,
        status: "PUBLISHED",
        textHash,
        contents: {
          create: [
            { lang: "en", stem: q.en.q, explanation: q.en.e },
            { lang: "hi", stem: q.hi.q, explanation: q.hi.e },
          ],
        },
        topics: { create: [{ topicId: tId }] },
        options: {
          create: q.en.o.map((text, order) => ({
            order,
            isCorrect: order === q.answer,
            contents: { create: [{ lang: "en", text }, { lang: "hi", text: q.hi.o[order] }] },
          })),
        },
      },
      select: { id: true },
    });
    questionIds.push(created.id);
  }

  const existingTest = await db.test.findUnique({ where: { slug: DEMO_TEST_SLUG }, select: { id: true } });
  if (existingTest) return;

  const test = await db.test.create({
    select: { id: true, sections: { select: { id: true, order: true } } },
    data: {
      slug: DEMO_TEST_SLUG,
      title: "Himachal GK Free Mock Test 1",
      titleHi: "हिमाचल GK फ्री मॉक टेस्ट 1",
      type: "MOCK",
      durationSec: 20 * 60,
      isFree: true,
      status: "PUBLISHED",
      publishedAt: new Date(),
      instructions:
        "This free mock covers Himachal GK, Reasoning & Maths and Computer — the common core of HPRCA, HP Police, Patwari and HPAS exams.",
      sections: { create: sections.map((s, order) => ({ ...s, order, marksCorrect: 1, marksWrong: 0.25 })) },
    },
  });

  const sectionId = new Map(test.sections.map((s) => [s.order, s.id]));
  const perSection = new Map<number, number>();
  await db.testQuestion.createMany({
    data: questions.map((q, i) => {
      const order = perSection.get(q.section) ?? 0;
      perSection.set(q.section, order + 1);
      return { testId: test.id, sectionId: sectionId.get(q.section)!, questionId: questionIds[i], order };
    }),
  });
}
