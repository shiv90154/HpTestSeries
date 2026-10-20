// The pb site's free no-login mock (src/sites/pb.ts freeMockSlug): 16 Punjab GK questions plus the same Reasoning &
// Maths and Computer questions as the HP free mock. Well-known, stable facts only; a human should spot-check them
// before pb launches, as with HP GK.

import { pb } from "../../src/sites/pb";
import type { DemoQuestion, FreeMockDef } from "../seed-demo";

const punjabGk: DemoQuestion[] = [
  {
    section: 0, subject: "punjab-gk", topic: "history", difficulty: "EASY", answer: 2,
    en: { q: "On which date was the present state of Punjab formed under the Punjab Reorganisation Act?", o: ["15 August 1947", "26 January 1950", "1 November 1966", "1 November 1956"], e: "The Punjab Reorganisation Act, 1966 created the present state of Punjab on 1 November 1966; Haryana was formed the same day and some hill areas went to Himachal Pradesh." },
    hi: { q: "पंजाब पुनर्गठन अधिनियम के तहत वर्तमान पंजाब राज्य किस तिथि को बना?", o: ["15 अगस्त 1947", "26 जनवरी 1950", "1 नवंबर 1966", "1 नवंबर 1956"], e: "पंजाब पुनर्गठन अधिनियम, 1966 से 1 नवंबर 1966 को वर्तमान पंजाब राज्य बना; उसी दिन हरियाणा बना और कुछ पहाड़ी क्षेत्र हिमाचल प्रदेश में गए।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "polity-administration", difficulty: "EASY", answer: 2,
    en: { q: "Which city is the capital of Punjab?", o: ["Amritsar", "Ludhiana", "Chandigarh", "Patiala"], e: "Chandigarh is the capital of Punjab. It is a Union Territory and is also the capital of Haryana." },
    hi: { q: "पंजाब की राजधानी कौन-सा शहर है?", o: ["अमृतसर", "लुधियाना", "चंडीगढ़", "पटियाला"], e: "चंडीगढ़ पंजाब की राजधानी है। यह एक केंद्र शासित प्रदेश है और हरियाणा की भी राजधानी है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "districts", difficulty: "MEDIUM", answer: 2,
    en: { q: "How many districts are there in Punjab?", o: ["20", "22", "23", "25"], e: "Punjab has 23 districts. Malerkotla, carved out of Sangrur in 2021, is the newest." },
    hi: { q: "पंजाब में कितने जिले हैं?", o: ["20", "22", "23", "25"], e: "पंजाब में 23 जिले हैं। 2021 में संगरूर से अलग होकर बना मलेरकोटला सबसे नया जिला है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "geography", difficulty: "EASY", answer: 1,
    en: { q: "The word 'Punjab' means:", o: ["Land of five hills", "Land of five rivers", "Land of five cities", "Land of five gurus"], e: "Punjab comes from the Persian words 'panj' (five) and 'aab' (water): the land of five rivers." },
    hi: { q: "'पंजाब' शब्द का अर्थ है:", o: ["पाँच पहाड़ियों की भूमि", "पाँच नदियों की भूमि", "पाँच शहरों की भूमि", "पाँच गुरुओं की भूमि"], e: "पंजाब फ़ारसी शब्दों 'पंज' (पाँच) और 'आब' (पानी) से बना है: पाँच नदियों की भूमि।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "rivers", difficulty: "MEDIUM", answer: 3,
    en: { q: "Which of these rivers does NOT flow through present-day Punjab?", o: ["Sutlej", "Beas", "Ravi", "Chenab"], e: "The Sutlej, Beas and Ravi flow through present-day Punjab. The Chenab flows through Jammu & Kashmir into Pakistan's Punjab." },
    hi: { q: "इनमें से कौन-सी नदी वर्तमान पंजाब से होकर नहीं बहती?", o: ["सतलुज", "ब्यास", "रावी", "चिनाब"], e: "सतलुज, ब्यास और रावी वर्तमान पंजाब से बहती हैं। चिनाब जम्मू-कश्मीर से होकर पाकिस्तान के पंजाब में जाती है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "rivers", difficulty: "MEDIUM", answer: 0,
    en: { q: "The Beas and the Sutlej meet at which place in Punjab?", o: ["Harike", "Ropar", "Nangal", "Hussainiwala"], e: "The Beas joins the Sutlej at Harike. The wetland formed there, Harike, is a Ramsar site known for migratory birds." },
    hi: { q: "ब्यास और सतलुज नदियाँ पंजाब में किस स्थान पर मिलती हैं?", o: ["हरिके", "रोपड़", "नंगल", "हुसैनीवाला"], e: "ब्यास नदी हरिके में सतलुज से मिलती है। वहाँ बनी हरिके आर्द्रभूमि एक रामसर स्थल है और प्रवासी पक्षियों के लिए जानी जाती है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "geography", difficulty: "MEDIUM", answer: 1,
    en: { q: "The Doaba region of Punjab lies between which two rivers?", o: ["Ravi and Beas", "Beas and Sutlej", "Sutlej and Ghaggar", "Ravi and Chenab"], e: "Doaba ('two waters') is the land between the Beas and the Sutlej. Majha lies between the Ravi and the Beas, and Malwa lies south of the Sutlej." },
    hi: { q: "पंजाब का दोआबा क्षेत्र किन दो नदियों के बीच स्थित है?", o: ["रावी और ब्यास", "ब्यास और सतलुज", "सतलुज और घग्गर", "रावी और चिनाब"], e: "दोआबा ('दो पानी') ब्यास और सतलुज के बीच का क्षेत्र है। माझा रावी और ब्यास के बीच तथा मालवा सतलुज के दक्षिण में है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "geography", difficulty: "EASY", answer: 0,
    en: { q: "What is the state animal of Punjab?", o: ["Blackbuck", "Sambar", "Nilgai", "Leopard"], e: "The Blackbuck (Kala Hiran) is the state animal of Punjab. The state bird is the Baaz (Northern Goshawk)." },
    hi: { q: "पंजाब का राज्य पशु कौन-सा है?", o: ["काला हिरण", "सांभर", "नीलगाय", "तेंदुआ"], e: "काला हिरण पंजाब का राज्य पशु है। राज्य पक्षी बाज़ (नॉर्दर्न गोशॉक) है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "history", difficulty: "EASY", answer: 1,
    en: { q: "In which year did the Jallianwala Bagh massacre take place in Amritsar?", o: ["1917", "1919", "1921", "1930"], e: "The Jallianwala Bagh massacre took place on 13 April 1919, Baisakhi day, when troops under General Dyer fired on an unarmed crowd." },
    hi: { q: "अमृतसर में जलियाँवाला बाग हत्याकांड किस वर्ष हुआ?", o: ["1917", "1919", "1921", "1930"], e: "जलियाँवाला बाग हत्याकांड 13 अप्रैल 1919, बैसाखी के दिन हुआ, जब जनरल डायर के सैनिकों ने निहत्थी भीड़ पर गोली चलाई।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "culture-religion", difficulty: "EASY", answer: 3,
    en: { q: "Guru Gobind Singh Ji founded the Khalsa Panth in 1699 at:", o: ["Amritsar", "Talwandi Sabo", "Fatehgarh Sahib", "Anandpur Sahib"], e: "Guru Gobind Singh Ji founded the Khalsa at Anandpur Sahib on Baisakhi, 1699." },
    hi: { q: "गुरु गोबिंद सिंह जी ने 1699 में खालसा पंथ की स्थापना कहाँ की?", o: ["अमृतसर", "तलवंडी साबो", "फतेहगढ़ साहिब", "आनंदपुर साहिब"], e: "गुरु गोबिंद सिंह जी ने 1699 की बैसाखी को आनंदपुर साहिब में खालसा की स्थापना की।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "history", difficulty: "EASY", answer: 2,
    en: { q: "What was the capital of Maharaja Ranjit Singh's Sikh empire?", o: ["Amritsar", "Patiala", "Lahore", "Multan"], e: "Maharaja Ranjit Singh made Lahore the capital of his empire after taking it in 1799." },
    hi: { q: "महाराजा रणजीत सिंह के सिख साम्राज्य की राजधानी क्या थी?", o: ["अमृतसर", "पटियाला", "लाहौर", "मुल्तान"], e: "महाराजा रणजीत सिंह ने 1799 में लाहौर जीतने के बाद उसे अपने साम्राज्य की राजधानी बनाया।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "districts", difficulty: "MEDIUM", answer: 1,
    en: { q: "Khatkar Kalan, the ancestral village of Shaheed Bhagat Singh, is in which district?", o: ["Ludhiana", "Shaheed Bhagat Singh Nagar", "Ferozepur", "Jalandhar"], e: "Khatkar Kalan is in Shaheed Bhagat Singh Nagar (Nawanshahr) district, which is named after him." },
    hi: { q: "शहीद भगत सिंह का पैतृक गाँव खटकड़ कलां किस जिले में है?", o: ["लुधियाना", "शहीद भगत सिंह नगर", "फिरोज़पुर", "जालंधर"], e: "खटकड़ कलां शहीद भगत सिंह नगर (नवांशहर) जिले में है, जिसका नाम उन्हीं के नाम पर रखा गया है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "districts", difficulty: "MEDIUM", answer: 3,
    en: { q: "The National Martyrs Memorial at Hussainiwala, where Bhagat Singh, Rajguru and Sukhdev were cremated, is in which district?", o: ["Amritsar", "Fazilka", "Tarn Taran", "Ferozepur"], e: "Hussainiwala, on the Sutlej near the Pakistan border, is in Ferozepur district." },
    hi: { q: "हुसैनीवाला में राष्ट्रीय शहीद स्मारक, जहाँ भगत सिंह, राजगुरु और सुखदेव का अंतिम संस्कार हुआ, किस जिले में है?", o: ["अमृतसर", "फाज़िल्का", "तरनतारन", "फिरोज़पुर"], e: "पाकिस्तान सीमा के पास सतलुज के किनारे बसा हुसैनीवाला फिरोज़पुर जिले में है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "culture-religion", difficulty: "EASY", answer: 0,
    en: { q: "Punjabi, the official language of Punjab, is written in which script?", o: ["Gurmukhi", "Devanagari", "Shahmukhi", "Sharada"], e: "In Indian Punjab, Punjabi is written in Gurmukhi. In Pakistan's Punjab it is written in Shahmukhi." },
    hi: { q: "पंजाब की राजभाषा पंजाबी किस लिपि में लिखी जाती है?", o: ["गुरमुखी", "देवनागरी", "शाहमुखी", "शारदा"], e: "भारतीय पंजाब में पंजाबी गुरमुखी लिपि में लिखी जाती है। पाकिस्तान के पंजाब में यह शाहमुखी में लिखी जाती है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "economy", difficulty: "MEDIUM", answer: 2,
    en: { q: "Where in Punjab is the Rail Coach Factory of Indian Railways?", o: ["Ludhiana", "Patiala", "Kapurthala", "Bathinda"], e: "The Rail Coach Factory (RCF) is at Kapurthala. Punjab Agricultural University is at Ludhiana." },
    hi: { q: "भारतीय रेल की रेल कोच फैक्ट्री पंजाब में कहाँ है?", o: ["लुधियाना", "पटियाला", "कपूरथला", "बठिंडा"], e: "रेल कोच फैक्ट्री (RCF) कपूरथला में है। पंजाब कृषि विश्वविद्यालय लुधियाना में है।" },
  },
  {
    section: 0, subject: "punjab-gk", topic: "culture-religion", difficulty: "MEDIUM", answer: 1,
    en: { q: "Takht Sri Damdama Sahib is located at:", o: ["Anandpur Sahib", "Talwandi Sabo", "Sri Muktsar Sahib", "Fatehgarh Sahib"], e: "Takht Sri Damdama Sahib is at Talwandi Sabo in Bathinda district. Takht Sri Kesgarh Sahib is at Anandpur Sahib." },
    hi: { q: "तख्त श्री दमदमा साहिब कहाँ स्थित है?", o: ["आनंदपुर साहिब", "तलवंडी साबो", "श्री मुक्तसर साहिब", "फतेहगढ़ साहिब"], e: "तख्त श्री दमदमा साहिब बठिंडा जिले के तलवंडी साबो में है। तख्त श्री केसगढ़ साहिब आनंदपुर साहिब में है।" },
  },
];

export function punjabFreeMock(common: DemoQuestion[]): FreeMockDef {
  return {
    slug: pb.freeMockSlug,
    site: pb.code,
    title: "Punjab GK Free Mock Test 1",
    titleHi: "पंजाब GK फ्री मॉक टेस्ट 1",
    instructions:
      "This free mock covers Punjab GK, Reasoning & Maths and Computer — the common core of Punjab Police, PSSSB and PPSC exams.",
    sections: [
      { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान" },
      { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित" },
      { name: "Computer", nameHi: "कंप्यूटर" },
    ],
    questions: [...punjabGk, ...common],
  };
}

export const PUNJAB_GK_FREE = punjabGk;
