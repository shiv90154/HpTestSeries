// HP Police Sub-Inspector Free Mock 1 — 15 questions (Himachal GK 3, General Studies 3, Reasoning 3, Maths 2, English 2, Hindi 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const subInspectorMock1: PatwariQuestion[] = [
  // ───────── Section 0: Himachal GK ─────────
  q(0, "hp-gk", "history", "E", 1,
    ["Himachal Pradesh became a full-fledged state of India on:", ["15 April 1948", "25 January 1971", "1 November 1966", "26 January 1950"], "Himachal Pradesh was granted full statehood on 25 January 1971 and became the 18th state of India."],
    ["हिमाचल प्रदेश को भारत का पूर्ण राज्य कब बनाया गया?", ["15 अप्रैल 1948", "25 जनवरी 1971", "1 नवंबर 1966", "26 जनवरी 1950"], "हिमाचल प्रदेश को 25 जनवरी 1971 को पूर्ण राज्य का दर्जा मिला और यह भारत का 18वाँ राज्य बना।"]),
  q(0, "hp-gk", "polity-administration", "E", 2,
    ["Which is the winter capital of Himachal Pradesh?", ["Shimla", "Mandi", "Dharamshala", "Solan"], "Dharamshala in Kangra district was declared the second (winter) capital of Himachal Pradesh in 2017."],
    ["हिमाचल प्रदेश की शीतकालीन राजधानी कौन-सी है?", ["शिमला", "मंडी", "धर्मशाला", "सोलन"], "कांगड़ा जिले के धर्मशाला को 2017 में हिमाचल प्रदेश की दूसरी (शीतकालीन) राजधानी घोषित किया गया।"]),
  q(0, "hp-gk", "rivers-lakes", "M", 0,
    ["Which river of Himachal Pradesh is the longest within the state?", ["Satluj", "Beas", "Ravi", "Yamuna"], "The Satluj flows about 320 km inside Himachal Pradesh, more than any other river in the state."],
    ["हिमाचल प्रदेश के भीतर सबसे लंबी नदी कौन-सी है?", ["सतलुज", "ब्यास", "रावी", "यमुना"], "सतलुज हिमाचल प्रदेश में लगभग 320 किमी बहती है, जो राज्य की किसी भी अन्य नदी से अधिक है।"]),

  // ───────── Section 1: General Studies ─────────
  q(1, "general-studies", "indian-polity", "E", 3,
    ["Who appoints the Governor of a state in India?", ["Chief Minister", "Prime Minister", "Chief Justice of India", "President"], "The Governor is appointed by the President of India under Article 155."],
    ["भारत में राज्य के राज्यपाल की नियुक्ति कौन करता है?", ["मुख्यमंत्री", "प्रधानमंत्री", "भारत के मुख्य न्यायाधीश", "राष्ट्रपति"], "अनुच्छेद 155 के अंतर्गत राज्यपाल की नियुक्ति भारत के राष्ट्रपति करते हैं।"]),
  q(1, "general-studies", "indian-polity", "M", 1,
    ["Protection of life and personal liberty is guaranteed by which Article of the Constitution?", ["Article 14", "Article 21", "Article 19", "Article 32"], "Article 21 says no person shall be deprived of life or personal liberty except according to procedure established by law."],
    ["जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण संविधान के किस अनुच्छेद में है?", ["अनुच्छेद 14", "अनुच्छेद 21", "अनुच्छेद 19", "अनुच्छेद 32"], "अनुच्छेद 21 के अनुसार विधि द्वारा स्थापित प्रक्रिया के बिना किसी व्यक्ति को जीवन या दैहिक स्वतंत्रता से वंचित नहीं किया जा सकता।"]),
  q(1, "general-studies", "general-science", "E", 2,
    ["Which instrument is used to measure atmospheric pressure?", ["Thermometer", "Hygrometer", "Barometer", "Anemometer"], "A barometer measures atmospheric pressure; a thermometer measures temperature, a hygrometer humidity and an anemometer wind speed."],
    ["वायुमंडलीय दाब मापने के लिए किस यंत्र का प्रयोग होता है?", ["थर्मामीटर", "हाइग्रोमीटर", "बैरोमीटर", "एनीमोमीटर"], "बैरोमीटर वायुमंडलीय दाब मापता है; थर्मामीटर तापमान, हाइग्रोमीटर आर्द्रता और एनीमोमीटर पवन की गति मापता है।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "M", 0,
    ["Find the next number: 3, 8, 15, 24, 35, ?", ["48", "46", "49", "50"], "The differences are 5, 7, 9, 11, so the next difference is 13 and the next number is 35 + 13 = 48."],
    ["अगली संख्या ज्ञात कीजिए: 3, 8, 15, 24, 35, ?", ["48", "46", "49", "50"], "अंतर 5, 7, 9, 11 हैं, इसलिए अगला अंतर 13 होगा और अगली संख्या 35 + 13 = 48 होगी।"]),
  q(2, "reasoning", "direction-sense", "M", 2,
    ["A man walks 5 km north, then 5 km east, then 5 km south. How far and in which direction is he from the starting point?", ["5 km north", "10 km east", "5 km east", "5 km west"], "The north and south legs cancel out, leaving him 5 km east of the starting point."],
    ["एक व्यक्ति 5 किमी उत्तर, फिर 5 किमी पूर्व और फिर 5 किमी दक्षिण चलता है। वह प्रारंभिक बिंदु से कितनी दूर और किस दिशा में है?", ["5 किमी उत्तर", "10 किमी पूर्व", "5 किमी पूर्व", "5 किमी पश्चिम"], "उत्तर और दक्षिण की दूरियाँ आपस में कट जाती हैं, इसलिए वह प्रारंभिक बिंदु से 5 किमी पूर्व में है।"]),
  q(2, "reasoning", "coding-decoding", "M", 3,
    ["In a certain code, POLICE is written as QPMJDF. How is CRIME written in that code?", ["DSJNG", "DSKNF", "BQHLD", "DSJNF"], "Each letter is moved one place forward: C→D, R→S, I→J, M→N, E→F, so CRIME becomes DSJNF."],
    ["एक कूट भाषा में POLICE को QPMJDF लिखा जाता है। उसी कूट में CRIME कैसे लिखा जाएगा?", ["DSJNG", "DSKNF", "BQHLD", "DSJNF"], "प्रत्येक अक्षर को एक स्थान आगे बढ़ाया गया है: C→D, R→S, I→J, M→N, E→F, इसलिए CRIME = DSJNF।"]),

  // ───────── Section 3: Maths ─────────
  q(3, "quant", "percentage", "E", 1,
    ["What is 25% of 240 plus 10% of 300?", ["80", "90", "100", "70"], "25% of 240 = 60 and 10% of 300 = 30, so the sum is 90."],
    ["240 का 25% तथा 300 के 10% का योग कितना है?", ["80", "90", "100", "70"], "240 का 25% = 60 और 300 का 10% = 30, अतः योग 90 है।"]),
  q(3, "quant", "average", "E", 2,
    ["The average of 12, 18, 24, 30 and 36 is:", ["20", "22", "24", "26"], "The sum is 120 and there are 5 numbers, so the average is 120 ÷ 5 = 24."],
    ["12, 18, 24, 30 और 36 का औसत है:", ["20", "22", "24", "26"], "योग 120 है और 5 संख्याएँ हैं, इसलिए औसत 120 ÷ 5 = 24 है।"]),

  // ───────── Section 4: English ─────────
  q(4, "english", "synonyms-antonyms", "E", 0,
    ["Choose the word opposite in meaning to 'BRAVE'.", ["Cowardly", "Bold", "Fearless", "Strong"], "'Brave' means courageous, so its antonym is 'cowardly'."],
    ["'BRAVE' का विलोम शब्द चुनिए।", ["Cowardly", "Bold", "Fearless", "Strong"], "'Brave' का अर्थ साहसी है, इसलिए इसका विलोम 'Cowardly' (कायर) है।"]),
  q(4, "english", "grammar", "M", 1,
    ["Fill in the blank: The police ____ arrived at the spot within ten minutes.", ["has", "have", "is", "was being"], "'Police' is a plural collective noun in English, so it takes the plural verb 'have'."],
    ["रिक्त स्थान भरिए: The police ____ arrived at the spot within ten minutes.", ["has", "have", "is", "was being"], "अंग्रेज़ी में 'police' बहुवचन समूहवाचक संज्ञा है, इसलिए इसके साथ बहुवचन क्रिया 'have' आती है।"]),

  // ───────── Section 5: Hindi ─────────
  q(5, "hindi", "paryay-vilom", "E", 2,
    ["'उत्थान' का विलोम शब्द है:", ["उन्नति", "विकास", "पतन", "प्रगति"], "'उत्थान' का अर्थ ऊपर उठना है और उसका विलोम 'पतन' है।"],
    ["'उत्थान' का विलोम शब्द है:", ["उन्नति", "विकास", "पतन", "प्रगति"], "'उत्थान' का अर्थ ऊपर उठना है और उसका विलोम 'पतन' है।"]),
  q(5, "hindi", "muhavare", "M", 3,
    ["'नाक में दम करना' मुहावरे का अर्थ है:", ["नाक बंद होना", "बहुत प्रसन्न होना", "डर जाना", "बहुत तंग करना"], "'नाक में दम करना' का अर्थ है किसी को बहुत परेशान या तंग करना।"],
    ["'नाक में दम करना' मुहावरे का अर्थ है:", ["नाक बंद होना", "बहुत प्रसन्न होना", "डर जाना", "बहुत तंग करना"], "'नाक में दम करना' का अर्थ है किसी को बहुत परेशान या तंग करना।"]),
];
