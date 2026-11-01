// Free demo mock test (no login needed) — real, verified questions in English and Hindi.
// Idempotent: questions are matched by text hash, the test by slug.

import type { PrismaClient } from "../src/generated/prisma/client";
import { hp } from "../src/sites/hp";
import { questionTextHash } from "../src/modules/content/text-hash";

type Lang = { q: string; o: [string, string, string, string]; e: string };
export type DemoQuestion = {
  section: 0 | 1 | 2;
  subject: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  answer: 0 | 1 | 2 | 3;
  en: Lang;
  hi: Lang;
};

export const DEMO_TEST_SLUG = hp.freeMockSlug;

const sections = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
  { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित" },
  { name: "Computer", nameHi: "कंप्यूटर" },
];

const questions: DemoQuestion[] = [
  {
    section: 0, subject: "hp-gk", topic: "history", difficulty: "MEDIUM", answer: 1,
    en: { q: "Himachal Pradesh came into existence on 15 April 1948 by joining how many princely states of the Punjab Hill region?", o: ["28", "30", "32", "36"], e: "The Chief Commissioner's province of Himachal Pradesh was formed on 15 April 1948 by merging 30 princely states." },
    hi: { q: "पंजाब पहाड़ी क्षेत्र की कितनी रियासतों को मिलाकर 15 अप्रैल 1948 को हिमाचल प्रदेश अस्तित्व में आया?", o: ["28", "30", "32", "36"], e: "15 अप्रैल 1948 को 30 रियासतों को मिलाकर चीफ़ कमिश्नर प्रांत के रूप में हिमाचल प्रदेश बना।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "history", difficulty: "MEDIUM", answer: 2,
    en: { q: "Himachal Pradesh was given full statehood by which Act of Parliament?", o: ["Punjab Reorganisation Act, 1966", "States Reorganisation Act, 1956", "State of Himachal Pradesh Act, 1970", "Himachal Pradesh Act, 1948"], e: "Parliament passed the State of Himachal Pradesh Act in 1970, and the state came into being on 25 January 1971." },
    hi: { q: "संसद के किस अधिनियम द्वारा हिमाचल प्रदेश को पूर्ण राज्य का दर्जा दिया गया?", o: ["पंजाब पुनर्गठन अधिनियम, 1966", "राज्य पुनर्गठन अधिनियम, 1956", "हिमाचल प्रदेश राज्य अधिनियम, 1970", "हिमाचल प्रदेश अधिनियम, 1948"], e: "संसद ने 1970 में हिमाचल प्रदेश राज्य अधिनियम पारित किया और 25 जनवरी 1971 को राज्य अस्तित्व में आया।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "personalities", difficulty: "HARD", answer: 0,
    en: { q: "Tabo Monastery in Spiti, founded in 996 AD, is associated with which Buddhist translator?", o: ["Rinchen Zangpo", "Padmasambhava", "Atisha", "Tsongkhapa"], e: "Tabo Monastery was founded in 996 AD by the great translator Rinchen Zangpo. It is one of the oldest continuously working Buddhist monasteries in India." },
    hi: { q: "स्पीति में 996 ई. में स्थापित ताबो मठ किस बौद्ध अनुवादक से जुड़ा है?", o: ["रिनचेन ज़ंगपो", "पद्मसंभव", "अतीश", "चोंखापा"], e: "ताबो मठ की स्थापना 996 ई. में महान अनुवादक रिनचेन ज़ंगपो ने की। यह भारत के सबसे पुराने लगातार चल रहे बौद्ध मठों में से है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "districts", difficulty: "MEDIUM", answer: 3,
    en: { q: "Which district headquarters of Himachal Pradesh is known as 'Chhoti Kashi' for its many ancient Shiva temples?", o: ["Kullu", "Chamba", "Bilaspur", "Mandi"], e: "Mandi, on the Beas, is called Chhoti Kashi because of its large number of old temples, many of them dedicated to Lord Shiva." },
    hi: { q: "अपने अनेक प्राचीन शिव मंदिरों के कारण हिमाचल प्रदेश का कौन-सा ज़िला मुख्यालय 'छोटी काशी' कहलाता है?", o: ["कुल्लू", "चंबा", "बिलासपुर", "मंडी"], e: "ब्यास किनारे बसा मंडी अपने बहुत से प्राचीन मंदिरों, विशेषकर शिव मंदिरों, के कारण छोटी काशी कहलाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 1,
    en: { q: "Through which pass does the river Satluj enter India from Tibet?", o: ["Baralacha La", "Shipki La", "Kunzum La", "Rohtang Pass"], e: "The Satluj rises near Mansarovar in Tibet and enters India through Shipki La in the Kinnaur district of Himachal Pradesh." },
    hi: { q: "सतलुज नदी तिब्बत से भारत में किस दर्रे से प्रवेश करती है?", o: ["बारालाचा ला", "शिपकी ला", "कुंज़ुम ला", "रोहतांग दर्रा"], e: "सतलुज मानसरोवर के पास तिब्बत से निकलती है और हिमाचल प्रदेश के किन्नौर ज़िले में शिपकी ला से भारत में प्रवेश करती है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Parvati river joins the Beas at which place in the Kullu valley?", o: ["Bhuntar", "Manali", "Naggar", "Banjar"], e: "The Parvati, flowing down from the Mantalai glacier, meets the Beas at Bhuntar, close to the Kullu airport." },
    hi: { q: "कुल्लू घाटी में पार्वती नदी ब्यास से किस स्थान पर मिलती है?", o: ["भुंतर", "मनाली", "नग्गर", "बंजार"], e: "मंतलाई हिमनद से आने वाली पार्वती नदी कुल्लू हवाई अड्डे के पास भुंतर में ब्यास से मिलती है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "rivers-lakes", difficulty: "HARD", answer: 2,
    en: { q: "Suraj Tal, the source lake of the Bhaga river, lies just below which pass?", o: ["Rohtang Pass", "Kunzum Pass", "Baralacha La", "Jalori Pass"], e: "Suraj Tal lies below Baralacha La in Lahaul. The Bhaga flows out of it and later joins the Chandra at Tandi to form the Chandrabhaga." },
    hi: { q: "भागा नदी का उद्गम सरोवर सूरज ताल किस दर्रे के ठीक नीचे स्थित है?", o: ["रोहतांग दर्रा", "कुंज़ुम दर्रा", "बारालाचा ला", "जलोरी दर्रा"], e: "सूरज ताल लाहौल में बारालाचा ला के नीचे है। इससे भागा निकलती है, जो आगे तांदी में चंद्रा से मिलकर चंद्रभागा बनती है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "geography", difficulty: "MEDIUM", answer: 1,
    en: { q: "The Pin Valley National Park, home of the snow leopard and the ibex, lies in which district?", o: ["Kinnaur", "Lahaul and Spiti", "Chamba", "Kullu"], e: "Pin Valley National Park is a cold-desert park in the Spiti part of the Lahaul and Spiti district." },
    hi: { q: "हिम तेंदुए और आइबेक्स के घर पिन वैली राष्ट्रीय उद्यान कौन-से ज़िले में स्थित है?", o: ["किन्नौर", "लाहौल और स्पीति", "चंबा", "कुल्लू"], e: "पिन वैली राष्ट्रीय उद्यान लाहौल और स्पीति ज़िले के स्पीति भाग में स्थित एक शीत मरुस्थलीय उद्यान है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "geography", difficulty: "MEDIUM", answer: 3,
    en: { q: "The Kunzum Pass connects which two regions of Himachal Pradesh?", o: ["Kullu and Lahaul", "Kinnaur and Spiti", "Chamba and Lahaul", "Lahaul and Spiti"], e: "The Kunzum Pass, at about 4,500 m, links the Lahaul and Spiti valleys." },
    hi: { q: "कुंज़ुम दर्रा हिमाचल प्रदेश के किन दो क्षेत्रों को जोड़ता है?", o: ["कुल्लू और लाहौल", "किन्नौर और स्पीति", "चंबा और लाहौल", "लाहौल और स्पीति"], e: "लगभग 4,500 मीटर ऊँचा कुंज़ुम दर्रा लाहौल और स्पीति घाटियों को जोड़ता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "culture-festivals", difficulty: "HARD", answer: 0,
    en: { q: "The Phulaich (Ukhyang) festival, in which flowers are gathered from the high pastures, is celebrated in which district?", o: ["Kinnaur", "Mandi", "Sirmaur", "Hamirpur"], e: "Phulaich, also called Ukhyang, is the festival of flowers of Kinnaur, held in the month of Bhadon (August–September)." },
    hi: { q: "फूलों के उत्सव फुलाइच (उख्यांग), जिसमें ऊँचे चरागाहों से फूल लाए जाते हैं, कौन-से ज़िले में मनाया जाता है?", o: ["किन्नौर", "मंडी", "सिरमौर", "हमीरपुर"], e: "फुलाइच, जिसे उख्यांग भी कहते हैं, किन्नौर का फूलों का उत्सव है, जो भादों (अगस्त–सितंबर) में मनाया जाता है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "culture-festivals", difficulty: "MEDIUM", answer: 2,
    en: { q: "The Kangra school of Pahari miniature painting reached its peak under which Katoch ruler?", o: ["Ghamand Chand", "Bhuvan Chand", "Sansar Chand", "Hamir Chand"], e: "Raja Sansar Chand of Kangra (1775–1823) was the great patron of the Kangra school of painting." },
    hi: { q: "पहाड़ी लघु चित्रकला की कांगड़ा शैली किस कटोच शासक के काल में चरम पर पहुँची?", o: ["घमंड चंद", "भुवन चंद", "संसार चंद", "हमीर चंद"], e: "कांगड़ा के राजा संसार चंद (1775–1823) कांगड़ा चित्रशैली के महान संरक्षक थे।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "economy", difficulty: "EASY", answer: 1,
    en: { q: "Which district of Himachal Pradesh is the largest apple-producing district?", o: ["Kullu", "Shimla", "Kinnaur", "Mandi"], e: "Shimla district grows the largest share of the state's apples, with Kullu and Kinnaur following." },
    hi: { q: "हिमाचल प्रदेश का सबसे बड़ा सेब उत्पादक ज़िला कौन-सा है?", o: ["कुल्लू", "शिमला", "किन्नौर", "मंडी"], e: "राज्य के सेब का सबसे बड़ा हिस्सा शिमला ज़िले में होता है, उसके बाद कुल्लू और किन्नौर आते हैं।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "economy", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Nathpa Jhakri hydroelectric project (1,500 MW), the largest in Himachal Pradesh, is built on which river?", o: ["Satluj", "Beas", "Ravi", "Chenab"], e: "Nathpa Jhakri is on the Satluj, between Kinnaur and Shimla, and has an installed capacity of 1,500 MW." },
    hi: { q: "हिमाचल प्रदेश की सबसे बड़ी जलविद्युत परियोजना नाथपा झाकड़ी (1,500 मेगावाट) किस नदी पर बनी है?", o: ["सतलुज", "ब्यास", "रावी", "चिनाब"], e: "नाथपा झाकड़ी किन्नौर और शिमला के बीच सतलुज पर है और इसकी स्थापित क्षमता 1,500 मेगावाट है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "polity-administration", difficulty: "EASY", answer: 2,
    en: { q: "Which town was declared the second (winter) capital of Himachal Pradesh in 2017?", o: ["Mandi", "Solan", "Dharamshala", "Una"], e: "Dharamshala was declared the winter capital of Himachal Pradesh in January 2017. Shimla remains the main capital." },
    hi: { q: "2017 में किस शहर को हिमाचल प्रदेश की दूसरी (शीतकालीन) राजधानी घोषित किया गया?", o: ["मंडी", "सोलन", "धर्मशाला", "ऊना"], e: "जनवरी 2017 में धर्मशाला को हिमाचल प्रदेश की शीतकालीन राजधानी घोषित किया गया। शिमला मुख्य राजधानी बनी हुई है।" },
  },
  {
    section: 0, subject: "hp-gk", topic: "polity-administration", difficulty: "MEDIUM", answer: 1,
    en: { q: "How many members does Himachal Pradesh send to the Rajya Sabha?", o: ["2", "3", "4", "5"], e: "Himachal Pradesh has 3 seats in the Rajya Sabha and 4 in the Lok Sabha." },
    hi: { q: "हिमाचल प्रदेश राज्य सभा में कितने सदस्य भेजता है?", o: ["2", "3", "4", "5"], e: "हिमाचल प्रदेश की राज्य सभा में 3 और लोक सभा में 4 सीटें हैं।" },
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

/** A free no-login mock: one per site (src/sites freeMockSlug). `site` places it, since it belongs to no exam. */
export type FreeMockDef = {
  slug: string;
  site: string;
  title: string;
  titleHi: string;
  instructions: string;
  sections: { name: string; nameHi: string }[];
  questions: DemoQuestion[];
};

export const HP_FREE_MOCK: FreeMockDef = {
  slug: DEMO_TEST_SLUG,
  site: hp.code,
  title: "Himachal GK Free Mock Test 1",
  titleHi: "हिमाचल GK फ्री मॉक टेस्ट 1",
  instructions: "This free mock covers Himachal GK, Reasoning & Maths and Computer — the common core of HPRCA, HP Police, Patwari and HPAS exams.",
  sections,
  questions,
};

/** The Reasoning & Maths and Computer questions every site's free mock shares. */
export const COMMON_FREE_QUESTIONS = questions.filter((q) => q.section > 0);

export async function seedDemoTest(db: PrismaClient) {
  await seedFreeMock(db, HP_FREE_MOCK);
}

/** Creates the questions that are missing (matched by text hash) and returns every question's id, in order. */
export async function ensureDemoQuestions(db: PrismaClient, questions: DemoQuestion[]): Promise<string[]> {
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
  return questionIds;
}

export async function seedFreeMock(db: PrismaClient, def: FreeMockDef) {
  const { questions } = def;
  const questionIds = await ensureDemoQuestions(db, questions);

  const existingTest = await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } });
  if (existingTest) return;

  const test = await db.test.create({
    select: { id: true, sections: { select: { id: true, order: true } } },
    data: {
      slug: def.slug,
      site: def.site,
      title: def.title,
      titleHi: def.titleHi,
      type: "MOCK",
      durationSec: 20 * 60,
      isFree: true,
      status: "PUBLISHED",
      publishedAt: new Date(),
      instructions: def.instructions,
      sections: { create: def.sections.map((s, order) => ({ ...s, order, marksCorrect: 1, marksWrong: 0.25 })) },
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
