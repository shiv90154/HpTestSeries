// The rj site's free no-login mock (src/sites/rj.ts freeMockSlug): 16 Rajasthan GK questions plus the same Reasoning &
// Maths and Computer questions as the HP free mock. Well-known, stable facts only; a human should spot-check them
// before rj launches, as with HP GK.

import { rj } from "../../src/sites/rj";
import type { DemoQuestion, FreeMockDef } from "../seed-demo";

const rajasthanGk: DemoQuestion[] = [
  {
    section: 0, subject: "rajasthan-gk", topic: "history", difficulty: "EASY", answer: 1,
    en: { q: "Rajasthan Diwas (Rajasthan Day) is celebrated every year on:", o: ["1 November", "30 March", "26 January", "15 August"], e: "Rajasthan Diwas is celebrated on 30 March: on that day in 1949 Jaipur, Jodhpur, Bikaner and Jaisalmer joined to form Greater Rajasthan. The state took its present shape on 1 November 1956." },
    hi: { q: "राजस्थान दिवस हर वर्ष किस तिथि को मनाया जाता है?", o: ["1 नवंबर", "30 मार्च", "26 जनवरी", "15 अगस्त"], e: "राजस्थान दिवस 30 मार्च को मनाया जाता है: 1949 में इसी दिन जयपुर, जोधपुर, बीकानेर और जैसलमेर मिलकर वृहत् राजस्थान बने। राज्य को वर्तमान स्वरूप 1 नवंबर 1956 को मिला।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "polity-administration", difficulty: "EASY", answer: 0,
    en: { q: "Which city is the capital of Rajasthan?", o: ["Jaipur", "Jodhpur", "Ajmer", "Udaipur"], e: "Jaipur, the 'Pink City', is the capital of Rajasthan. The principal seat of the Rajasthan High Court is at Jodhpur." },
    hi: { q: "राजस्थान की राजधानी कौन-सा शहर है?", o: ["जयपुर", "जोधपुर", "अजमेर", "उदयपुर"], e: "'गुलाबी नगरी' जयपुर राजस्थान की राजधानी है। राजस्थान उच्च न्यायालय की मुख्य पीठ जोधपुर में है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "geography", difficulty: "EASY", answer: 2,
    en: { q: "By area, what is Rajasthan's rank among the states of India?", o: ["Second", "Third", "First", "Fourth"], e: "Rajasthan is the largest state of India by area, about 3.42 lakh sq km, or roughly 10.4% of the country." },
    hi: { q: "क्षेत्रफल की दृष्टि से भारत के राज्यों में राजस्थान का कौन-सा स्थान है?", o: ["दूसरा", "तीसरा", "पहला", "चौथा"], e: "राजस्थान क्षेत्रफल में भारत का सबसे बड़ा राज्य है, लगभग 3.42 लाख वर्ग किमी, यानी देश का करीब 10.4%।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "geography", difficulty: "EASY", answer: 1,
    en: { q: "Which is the highest peak of the Aravalli range?", o: ["Kumbhalgarh", "Guru Shikhar", "Taragarh", "Jarga"], e: "Guru Shikhar (about 1,722 m), near Mount Abu in Sirohi district, is the highest peak of the Aravallis." },
    hi: { q: "अरावली पर्वतमाला की सबसे ऊँची चोटी कौन-सी है?", o: ["कुंभलगढ़", "गुरु शिखर", "तारागढ़", "जरगा"], e: "सिरोही जिले में माउंट आबू के पास स्थित गुरु शिखर (लगभग 1,722 मी) अरावली की सबसे ऊँची चोटी है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 3,
    en: { q: "Which river is known as the only perennial river of Rajasthan?", o: ["Luni", "Banas", "Mahi", "Chambal"], e: "The Chambal is called Rajasthan's only perennial river. Gandhi Sagar, Rana Pratap Sagar, Jawahar Sagar and the Kota Barrage are built on it." },
    hi: { q: "किस नदी को राजस्थान की एकमात्र बारहमासी नदी कहा जाता है?", o: ["लूणी", "बनास", "माही", "चंबल"], e: "चंबल को राजस्थान की एकमात्र बारहमासी नदी कहा जाता है। इस पर गांधी सागर, राणा प्रताप सागर, जवाहर सागर और कोटा बैराज बने हैं।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "rivers-lakes", difficulty: "MEDIUM", answer: 3,
    en: { q: "The Luni river, which rises near Ajmer, finally ends in:", o: ["the Gulf of Khambhat", "Sambhar Lake", "the Arabian Sea", "the Rann of Kutch"], e: "The Luni rises in the Nag hills near Ajmer, flows south-west through western Rajasthan and ends in the Rann of Kutch in Gujarat. Its water turns salty after Balotra." },
    hi: { q: "अजमेर के पास से निकलने वाली लूणी नदी अंत में कहाँ समाप्त होती है?", o: ["खंभात की खाड़ी", "सांभर झील", "अरब सागर", "कच्छ का रण"], e: "लूणी अजमेर के पास नाग पहाड़ से निकलकर पश्चिमी राजस्थान से दक्षिण-पश्चिम दिशा में बहती है और गुजरात के कच्छ के रण में समाप्त होती है। बालोतरा के बाद इसका पानी खारा हो जाता है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "rivers-lakes", difficulty: "EASY", answer: 2,
    en: { q: "Which lake of Rajasthan is the largest inland saltwater lake in India?", o: ["Pushkar", "Pichola", "Sambhar", "Jaisamand"], e: "Sambhar Lake, on the borders of Jaipur, Nagaur and Ajmer, is India's largest inland salt lake and a Ramsar site." },
    hi: { q: "राजस्थान की कौन-सी झील भारत की सबसे बड़ी अंतर्देशीय खारे पानी की झील है?", o: ["पुष्कर", "पिछोला", "सांभर", "जयसमंद"], e: "जयपुर, नागौर और अजमेर की सीमा पर स्थित सांभर झील भारत की सबसे बड़ी अंतर्देशीय खारी झील है और एक रामसर स्थल है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "geography", difficulty: "EASY", answer: 1,
    en: { q: "What is the state bird of Rajasthan?", o: ["Peacock", "Great Indian Bustard (Godawan)", "Sarus crane", "Northern Goshawk"], e: "The Great Indian Bustard (Godawan) is the state bird of Rajasthan. It survives mainly in the Desert National Park of Jaisalmer and Barmer." },
    hi: { q: "राजस्थान का राज्य पक्षी कौन-सा है?", o: ["मोर", "गोडावण (ग्रेट इंडियन बस्टर्ड)", "सारस", "बाज़"], e: "गोडावण (ग्रेट इंडियन बस्टर्ड) राजस्थान का राज्य पक्षी है। यह मुख्य रूप से जैसलमेर और बाड़मेर के मरु राष्ट्रीय उद्यान में बचा है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "geography", difficulty: "EASY", answer: 0,
    en: { q: "Which tree is the state tree of Rajasthan?", o: ["Khejri", "Rohida", "Neem", "Babool"], e: "The Khejri (Prosopis cineraria) is the state tree. Rohida is the state flower; the Bishnois' Khejarli sacrifice of 1730 was to save Khejri trees." },
    hi: { q: "राजस्थान का राज्य वृक्ष कौन-सा है?", o: ["खेजड़ी", "रोहिड़ा", "नीम", "बबूल"], e: "खेजड़ी राजस्थान का राज्य वृक्ष है और रोहिड़ा राज्य पुष्प है। 1730 में बिश्नोइयों का खेजड़ली बलिदान खेजड़ी के पेड़ बचाने के लिए हुआ था।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "history", difficulty: "EASY", answer: 1,
    en: { q: "In which year was the Battle of Haldighati fought between Maharana Pratap and Akbar's army?", o: ["1556", "1576", "1527", "1615"], e: "The Battle of Haldighati was fought on 18 June 1576 between Maharana Pratap and the Mughal army led by Raja Man Singh of Amber." },
    hi: { q: "महाराणा प्रताप और अकबर की सेना के बीच हल्दीघाटी का युद्ध किस वर्ष हुआ?", o: ["1556", "1576", "1527", "1615"], e: "हल्दीघाटी का युद्ध 18 जून 1576 को महाराणा प्रताप और आमेर के राजा मानसिंह के नेतृत्व वाली मुगल सेना के बीच हुआ।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "history", difficulty: "MEDIUM", answer: 3,
    en: { q: "In the Battle of Khanwa (1527), Rana Sanga of Mewar was defeated by:", o: ["Akbar", "Humayun", "Sher Shah Suri", "Babur"], e: "Babur defeated Rana Sanga at Khanwa, near Bharatpur, in March 1527, which settled Mughal rule in north India." },
    hi: { q: "खानवा के युद्ध (1527) में मेवाड़ के राणा सांगा को किसने हराया?", o: ["अकबर", "हुमायूँ", "शेरशाह सूरी", "बाबर"], e: "मार्च 1527 में भरतपुर के पास खानवा में बाबर ने राणा सांगा को हराया, जिससे उत्तर भारत में मुगल शासन जम गया।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "history", difficulty: "MEDIUM", answer: 1,
    en: { q: "Who built the Vijay Stambh (Victory Tower) in Chittorgarh fort?", o: ["Rana Sanga", "Rana Kumbha", "Maharana Pratap", "Bappa Rawal"], e: "Rana Kumbha built the Vijay Stambh to mark his victory over Mahmud Khilji of Malwa. He also built Kumbhalgarh fort." },
    hi: { q: "चित्तौड़गढ़ दुर्ग में विजय स्तंभ किसने बनवाया?", o: ["राणा सांगा", "राणा कुंभा", "महाराणा प्रताप", "बप्पा रावल"], e: "राणा कुंभा ने मालवा के महमूद खिलजी पर विजय की याद में विजय स्तंभ बनवाया। कुंभलगढ़ दुर्ग भी उन्होंने ही बनवाया।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "economy", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Indira Gandhi Canal, the lifeline of western Rajasthan, starts from:", o: ["Harike Barrage", "Bhakra Dam", "Rana Pratap Sagar", "Ropar headworks"], e: "The Indira Gandhi Canal takes off from the Harike Barrage in Punjab, where the Sutlej and Beas meet, and carries their water to the Thar desert." },
    hi: { q: "पश्चिमी राजस्थान की जीवनरेखा इंदिरा गांधी नहर कहाँ से निकलती है?", o: ["हरिके बैराज", "भाखड़ा बाँध", "राणा प्रताप सागर", "रोपड़ हेडवर्क्स"], e: "इंदिरा गांधी नहर पंजाब के हरिके बैराज से निकलती है, जहाँ सतलुज और ब्यास मिलती हैं, और इनका पानी थार मरुस्थल तक ले जाती है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "geography", difficulty: "EASY", answer: 2,
    en: { q: "Keoladeo National Park, a UNESCO World Heritage Site famous for birds, is in which district?", o: ["Sawai Madhopur", "Alwar", "Bharatpur", "Jaisalmer"], e: "Keoladeo National Park (Ghana Bird Sanctuary) is in Bharatpur. It became a UNESCO World Heritage Site in 1985." },
    hi: { q: "पक्षियों के लिए प्रसिद्ध यूनेस्को विश्व धरोहर केवलादेव राष्ट्रीय उद्यान किस जिले में है?", o: ["सवाई माधोपुर", "अलवर", "भरतपुर", "जैसलमेर"], e: "केवलादेव राष्ट्रीय उद्यान (घना पक्षी विहार) भरतपुर में है। यह 1985 में यूनेस्को विश्व धरोहर स्थल बना।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "art-culture", difficulty: "EASY", answer: 0,
    en: { q: "The famous Pushkar Fair is held in which district of Rajasthan?", o: ["Ajmer", "Nagaur", "Tonk", "Bikaner"], e: "The Pushkar Fair is held at Pushkar, Ajmer district, on Kartik Purnima. It is known for its camel and cattle fair and the Brahma temple." },
    hi: { q: "प्रसिद्ध पुष्कर मेला राजस्थान के किस जिले में लगता है?", o: ["अजमेर", "नागौर", "टोंक", "बीकानेर"], e: "पुष्कर मेला अजमेर जिले के पुष्कर में कार्तिक पूर्णिमा पर लगता है। यह ऊँट व पशु मेले और ब्रह्मा मंदिर के लिए प्रसिद्ध है।" },
  },
  {
    section: 0, subject: "rajasthan-gk", topic: "districts", difficulty: "MEDIUM", answer: 2,
    en: { q: "How many districts does Rajasthan have after the December 2024 reorganisation?", o: ["33", "50", "41", "45"], e: "Rajasthan has 41 districts. In December 2024 the state abolished 9 of the 17 districts created in 2023, bringing the number down from 50 to 41." },
    hi: { q: "दिसंबर 2024 के पुनर्गठन के बाद राजस्थान में कितने जिले हैं?", o: ["33", "50", "41", "45"], e: "राजस्थान में 41 जिले हैं। दिसंबर 2024 में राज्य ने 2023 में बने 17 में से 9 जिले समाप्त किए, जिससे संख्या 50 से घटकर 41 हो गई।" },
  },
];

export function rajasthanFreeMock(common: DemoQuestion[]): FreeMockDef {
  return {
    slug: rj.freeMockSlug,
    site: rj.code,
    title: "Rajasthan GK Free Mock Test 1",
    titleHi: "राजस्थान GK फ्री मॉक टेस्ट 1",
    instructions:
      "This free mock covers Rajasthan GK, Reasoning & Maths and Computer — the common core of RSSB, Rajasthan Police and RPSC exams.",
    sections: [
      { name: "Rajasthan GK", nameHi: "राजस्थान सामान्य ज्ञान" },
      { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित" },
      { name: "Computer", nameHi: "कंप्यूटर" },
    ],
    questions: [...rajasthanGk, ...common],
  };
}
