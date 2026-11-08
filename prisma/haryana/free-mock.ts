// The hr site's free no-login mock (src/sites/hr.ts freeMockSlug): 16 Haryana GK questions plus the same Reasoning &
// Maths and Computer questions as the HP free mock. Well-known, stable facts only; a human should spot-check them
// before hr launches, as with HP GK.

import { hr } from "../../src/sites/hr";
import type { DemoQuestion, FreeMockDef } from "../seed-demo";

const haryanaGk: DemoQuestion[] = [
  {
    section: 0, subject: "haryana-gk", topic: "history", difficulty: "EASY", answer: 1,
    en: { q: "Haryana was carved out of Punjab as a separate state on:", o: ["15 August 1947", "1 November 1966", "26 January 1950", "1 November 1956"], e: "Haryana became the 17th state of India on 1 November 1966, when the Punjab Reorganisation Act separated its Hindi-speaking areas from Punjab." },
    hi: { q: "हरियाणा को पंजाब से अलग करके एक पृथक राज्य कब बनाया गया?", o: ["15 अगस्त 1947", "1 नवंबर 1966", "26 जनवरी 1950", "1 नवंबर 1956"], e: "पंजाब पुनर्गठन अधिनियम के तहत पंजाब के हिंदीभाषी क्षेत्रों को अलग कर 1 नवंबर 1966 को हरियाणा भारत का 17वाँ राज्य बना।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "polity-administration", difficulty: "EASY", answer: 0,
    en: { q: "Which city is the capital of Haryana, shared with Punjab?", o: ["Chandigarh", "Gurugram", "Panchkula", "Rohtak"], e: "Chandigarh is the capital of both Haryana and Punjab and is also a Union Territory. Haryana's own administrative offices are partly at Panchkula." },
    hi: { q: "पंजाब के साथ साझा हरियाणा की राजधानी कौन-सा शहर है?", o: ["चंडीगढ़", "गुरुग्राम", "पंचकूला", "रोहतक"], e: "चंडीगढ़ हरियाणा और पंजाब दोनों की राजधानी है और साथ ही एक केंद्रशासित प्रदेश भी है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "polity-administration", difficulty: "EASY", answer: 2,
    en: { q: "The common High Court for Punjab and Haryana is located at:", o: ["Ambala", "Panchkula", "Chandigarh", "Hisar"], e: "The Punjab and Haryana High Court sits at Chandigarh and serves Punjab, Haryana and the Union Territory of Chandigarh." },
    hi: { q: "पंजाब और हरियाणा का साझा उच्च न्यायालय कहाँ स्थित है?", o: ["अंबाला", "पंचकूला", "चंडीगढ़", "हिसार"], e: "पंजाब एवं हरियाणा उच्च न्यायालय चंडीगढ़ में है और पंजाब, हरियाणा व केंद्रशासित प्रदेश चंडीगढ़ के लिए कार्य करता है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "geography", difficulty: "EASY", answer: 3,
    en: { q: "What is the state bird of Haryana?", o: ["Peacock", "Sarus crane", "House sparrow", "Black francolin (black partridge)"], e: "The black francolin, locally called the black partridge or 'teetar', is the state bird of Haryana. The blackbuck is the state animal, the peepal the state tree and the lotus the state flower." },
    hi: { q: "हरियाणा का राज्य पक्षी कौन-सा है?", o: ["मोर", "सारस", "गौरैया", "काला तीतर (ब्लैक फ्रेंकोलिन)"], e: "काला तीतर हरियाणा का राज्य पक्षी है। काला हिरण राज्य पशु, पीपल राज्य वृक्ष और कमल राज्य पुष्प है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "rivers", difficulty: "EASY", answer: 1,
    en: { q: "The river Yamuna forms the eastern boundary of Haryana with which state?", o: ["Rajasthan", "Uttar Pradesh", "Punjab", "Madhya Pradesh"], e: "The Yamuna flows along Haryana's eastern edge and separates it from Uttar Pradesh. Yamunanagar, Karnal, Panipat, Sonipat, Faridabad and Palwal lie on its bank." },
    hi: { q: "यमुना नदी हरियाणा की पूर्वी सीमा पर किस राज्य से उसे अलग करती है?", o: ["राजस्थान", "उत्तर प्रदेश", "पंजाब", "मध्य प्रदेश"], e: "यमुना हरियाणा के पूर्वी किनारे पर बहती है और उसे उत्तर प्रदेश से अलग करती है। यमुनानगर, करनाल, पानीपत, सोनीपत, फरीदाबाद और पलवल इसके किनारे बसे हैं।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "rivers", difficulty: "MEDIUM", answer: 0,
    en: { q: "Which seasonal river rises in the Shivalik hills of Himachal Pradesh and flows through Panchkula, Ambala and Sirsa in Haryana?", o: ["Ghaggar", "Markanda", "Sahibi", "Tangri"], e: "The Ghaggar rises in the Shivalik hills of Himachal Pradesh, enters Haryana near Panchkula, passes Ambala and Sirsa and then goes on into Rajasthan. It is a seasonal river." },
    hi: { q: "हिमाचल प्रदेश की शिवालिक पहाड़ियों से निकलकर हरियाणा में पंचकूला, अंबाला और सिरसा से बहने वाली मौसमी नदी कौन-सी है?", o: ["घग्गर", "मारकंडा", "साहिबी", "टांगरी"], e: "घग्गर हिमाचल की शिवालिक पहाड़ियों से निकलकर पंचकूला के पास हरियाणा में आती है, अंबाला और सिरसा से गुज़रकर राजस्थान की ओर जाती है। यह मौसमी नदी है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "history", difficulty: "EASY", answer: 2,
    en: { q: "In which year was the First Battle of Panipat fought, in which Babur defeated Ibrahim Lodi?", o: ["1556", "1761", "1526", "1539"], e: "The First Battle of Panipat was fought in 1526 and began Mughal rule in India. The Second (1556) and Third (1761) battles were also fought at Panipat." },
    hi: { q: "पानीपत का प्रथम युद्ध किस वर्ष हुआ, जिसमें बाबर ने इब्राहिम लोदी को हराया?", o: ["1556", "1761", "1526", "1539"], e: "पानीपत का प्रथम युद्ध 1526 में हुआ और इसी से भारत में मुगल शासन शुरू हुआ। दूसरा (1556) और तीसरा (1761) युद्ध भी पानीपत में ही लड़े गए।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "districts", difficulty: "EASY", answer: 3,
    en: { q: "The sacred tank Brahma Sarovar, where a big fair is held during a solar eclipse, is in which district?", o: ["Karnal", "Jind", "Kaithal", "Kurukshetra"], e: "Brahma Sarovar is at Kurukshetra, the land of the Mahabharata war and the Bhagavad Gita. A large fair is held there at the time of a solar eclipse." },
    hi: { q: "पवित्र ब्रह्म सरोवर, जहाँ सूर्य ग्रहण के समय बड़ा मेला लगता है, किस जिले में है?", o: ["करनाल", "जींद", "कैथल", "कुरुक्षेत्र"], e: "ब्रह्म सरोवर कुरुक्षेत्र में है, जो महाभारत युद्ध और भगवद्गीता की भूमि है। सूर्य ग्रहण के समय यहाँ बड़ा मेला लगता है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "history", difficulty: "MEDIUM", answer: 1,
    en: { q: "Rakhigarhi, one of the largest sites of the Indus Valley (Harappan) Civilisation in India, is in which district?", o: ["Rohtak", "Hisar", "Sirsa", "Bhiwani"], e: "Rakhigarhi lies in Hisar district and is among the largest Harappan sites in India. It is sometimes counted as the largest of all." },
    hi: { q: "भारत में सिंधु घाटी (हड़प्पा) सभ्यता के सबसे बड़े स्थलों में से एक राखीगढ़ी किस जिले में है?", o: ["रोहतक", "हिसार", "सिरसा", "भिवानी"], e: "राखीगढ़ी हिसार जिले में है और भारत में हड़प्पा सभ्यता के सबसे बड़े स्थलों में गिना जाता है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "geography", difficulty: "EASY", answer: 0,
    en: { q: "Sultanpur National Park, a well-known bird sanctuary, is in which district?", o: ["Gurugram", "Faridabad", "Sonipat", "Jhajjar"], e: "Sultanpur National Park (Sultanpur Bird Sanctuary) is in Gurugram district. Migratory birds visit its wetland in winter." },
    hi: { q: "प्रसिद्ध पक्षी विहार सुल्तानपुर राष्ट्रीय उद्यान किस जिले में है?", o: ["गुरुग्राम", "फरीदाबाद", "सोनीपत", "झज्जर"], e: "सुल्तानपुर राष्ट्रीय उद्यान (सुल्तानपुर पक्षी विहार) गुरुग्राम जिले में है। सर्दियों में प्रवासी पक्षी यहाँ आते हैं।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "culture", difficulty: "EASY", answer: 2,
    en: { q: "The Surajkund International Crafts Mela is held every year in which district?", o: ["Gurugram", "Panipat", "Faridabad", "Rewari"], e: "The Surajkund International Crafts Mela is held every February at Surajkund, Faridabad. It showcases handicrafts and handlooms of India and partner countries." },
    hi: { q: "सूरजकुंड अंतरराष्ट्रीय शिल्प मेला हर वर्ष किस जिले में लगता है?", o: ["गुरुग्राम", "पानीपत", "फरीदाबाद", "रेवाड़ी"], e: "सूरजकुंड अंतरराष्ट्रीय शिल्प मेला हर साल फरवरी में फरीदाबाद के सूरजकुंड में लगता है। इसमें भारत और साझेदार देशों के हस्तशिल्प व हथकरघा उत्पाद प्रदर्शित होते हैं।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "culture", difficulty: "MEDIUM", answer: 3,
    en: { q: "The Mughal-style Pinjore Gardens (Yadavindra Gardens) are in which district?", o: ["Ambala", "Yamunanagar", "Karnal", "Panchkula"], e: "Pinjore Gardens, also called Yadavindra Gardens, are a Mughal-style garden in Pinjore, Panchkula district, at the foot of the Shivalik hills." },
    hi: { q: "मुगल शैली के पिंजौर उद्यान (यादवेंद्र गार्डन) किस जिले में हैं?", o: ["अंबाला", "यमुनानगर", "करनाल", "पंचकूला"], e: "पिंजौर उद्यान, जिसे यादवेंद्र गार्डन भी कहते हैं, शिवालिक पहाड़ियों की तलहटी में पंचकूला जिले के पिंजौर में बना मुगल शैली का बाग है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "economy", difficulty: "EASY", answer: 1,
    en: { q: "Which famous breed of buffalo originated in Haryana (Rohtak, Hisar and Jind region)?", o: ["Jaffarabadi", "Murrah", "Surti", "Mehsana"], e: "The Murrah buffalo, known for its high milk yield and fat, comes from Haryana. Hisar's National Research Centre on Equines and the Central Institute for Research on Buffaloes work on these breeds." },
    hi: { q: "भैंस की कौन-सी प्रसिद्ध नस्ल हरियाणा (रोहतक, हिसार और जींद क्षेत्र) की देन है?", o: ["जाफराबादी", "मुर्रा", "सूरती", "मेहसाणा"], e: "मुर्रा भैंस, जो अधिक दूध और वसा के लिए जानी जाती है, हरियाणा की नस्ल है।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "polity-administration", difficulty: "MEDIUM", answer: 0,
    en: { q: "Which language was given the status of the second official language of Haryana in 2010?", o: ["Punjabi", "Urdu", "Sanskrit", "Haryanvi"], e: "Hindi is the first official language of Haryana. In 2010 Punjabi was declared the additional (second) official language." },
    hi: { q: "वर्ष 2010 में किस भाषा को हरियाणा की द्वितीय राजभाषा का दर्जा दिया गया?", o: ["पंजाबी", "उर्दू", "संस्कृत", "हरियाणवी"], e: "हरियाणा की पहली राजभाषा हिंदी है। 2010 में पंजाबी को अतिरिक्त (द्वितीय) राजभाषा घोषित किया गया।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "polity-administration", difficulty: "EASY", answer: 2,
    en: { q: "How many seats does the Haryana Vidhan Sabha (Legislative Assembly) have?", o: ["70", "80", "90", "100"], e: "The Haryana Vidhan Sabha has 90 seats. The state also sends 10 members to the Lok Sabha and 5 to the Rajya Sabha." },
    hi: { q: "हरियाणा विधानसभा में कुल कितनी सीटें हैं?", o: ["70", "80", "90", "100"], e: "हरियाणा विधानसभा में 90 सीटें हैं। राज्य से लोकसभा में 10 और राज्यसभा में 5 सदस्य जाते हैं।" },
  },
  {
    section: 0, subject: "haryana-gk", topic: "districts", difficulty: "EASY", answer: 3,
    en: { q: "Olympic javelin champion Neeraj Chopra belongs to a village in which district of Haryana?", o: ["Rohtak", "Jind", "Sonipat", "Panipat"], e: "Neeraj Chopra, who won gold in javelin throw at the Tokyo Olympics 2020, is from Khandra village in Panipat district." },
    hi: { q: "ओलंपिक भाला फेंक चैंपियन नीरज चोपड़ा हरियाणा के किस जिले के गाँव के रहने वाले हैं?", o: ["रोहतक", "जींद", "सोनीपत", "पानीपत"], e: "टोक्यो ओलंपिक 2020 में भाला फेंक का स्वर्ण पदक जीतने वाले नीरज चोपड़ा पानीपत जिले के खंडरा गाँव के हैं।" },
  },
];

export function haryanaFreeMock(common: DemoQuestion[]): FreeMockDef {
  return {
    slug: hr.freeMockSlug,
    site: hr.code,
    title: "Haryana GK Free Mock Test 1",
    titleHi: "हरियाणा GK फ्री मॉक टेस्ट 1",
    instructions:
      "This free mock covers Haryana GK, Reasoning & Maths and Computer — the common core of HSSC CET, Haryana Police and HPSC exams.",
    sections: [
      { name: "Haryana GK", nameHi: "हरियाणा सामान्य ज्ञान" },
      { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित" },
      { name: "Computer", nameHi: "कंप्यूटर" },
    ],
    questions: [...haryanaGk, ...common],
  };
}
