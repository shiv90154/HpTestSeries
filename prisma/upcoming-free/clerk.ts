// HPRCA Clerk Free Mock 1 — 15 questions (Himachal GK 4, General Studies 3, Reasoning 3, Maths 2, English 2, Hindi 1).

import { q, type PatwariQuestion } from "../patwari/types";

export const clerkMock1: PatwariQuestion[] = [
  // ───────── Section 0: Himachal GK ─────────
  q(0, "hp-gk", "history", "M", 1,
    ["Himachal Pradesh came into existence on 15 April 1948 by merging how many princely states?", ["21", "30", "15", "36"], "On 15 April 1948 about 30 princely states of the Shimla Hills and Punjab Hill States were merged to form Himachal Pradesh as a Chief Commissioner's province."],
    ["15 अप्रैल 1948 को कितनी रियासतों को मिलाकर हिमाचल प्रदेश का गठन हुआ?", ["21", "30", "15", "36"], "15 अप्रैल 1948 को शिमला हिल्स और पंजाब हिल स्टेट्स की लगभग 30 रियासतों को मिलाकर चीफ कमिश्नर प्रांत के रूप में हिमाचल प्रदेश बनाया गया।"]),
  q(0, "hp-gk", "rivers-lakes", "M", 0,
    ["The river Sutlej enters Himachal Pradesh through which pass?", ["Shipki La", "Rohtang", "Baralacha La", "Jalori"], "The Sutlej enters India from Tibet at Shipki La in Kinnaur district."],
    ["सतलुज नदी किस दर्रे से हिमाचल प्रदेश में प्रवेश करती है?", ["शिपकी ला", "रोहतांग", "बारालाचा ला", "जलोड़ी"], "सतलुज तिब्बत से किन्नौर जिले के शिपकी ला दर्रे से भारत में प्रवेश करती है।"]),
  q(0, "hp-gk", "polity-administration", "E", 1,
    ["The headquarters of the Himachal Pradesh Rajya Chayan Aayog (HPRCA) is at:", ["Shimla", "Hamirpur", "Dharamshala", "Mandi"], "HPRCA, which recruits for Clerk, JOA IT and other posts, is headquartered at Hamirpur."],
    ["हिमाचल प्रदेश राज्य चयन आयोग (HPRCA) का मुख्यालय कहाँ है?", ["शिमला", "हमीरपुर", "धर्मशाला", "मंडी"], "क्लर्क, जेओए आईटी आदि पदों की भर्ती करने वाले HPRCA का मुख्यालय हमीरपुर में है।"]),
  q(0, "hp-gk", "districts", "E", 2,
    ["Which is the largest district of Himachal Pradesh by area?", ["Chamba", "Kinnaur", "Lahaul & Spiti", "Kangra"], "Lahaul & Spiti (about 13,835 sq km) is the largest district of Himachal Pradesh by area."],
    ["क्षेत्रफल की दृष्टि से हिमाचल प्रदेश का सबसे बड़ा जिला कौन-सा है?", ["चंबा", "किन्नौर", "लाहौल-स्पीति", "कांगड़ा"], "लाहौल-स्पीति (लगभग 13,835 वर्ग किमी) क्षेत्रफल में हिमाचल प्रदेश का सबसे बड़ा जिला है।"]),

  // ───────── Section 1: General Studies ─────────
  q(1, "general-studies", "indian-history", "E", 0,
    ["The book 'The Discovery of India' was written by:", ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose"], "Jawaharlal Nehru wrote 'The Discovery of India' in 1944 while imprisoned at Ahmednagar Fort."],
    ["'द डिस्कवरी ऑफ इंडिया' पुस्तक किसने लिखी?", ["जवाहरलाल नेहरू", "महात्मा गांधी", "सरदार पटेल", "सुभाष चंद्र बोस"], "जवाहरलाल नेहरू ने अहमदनगर किले में कैद के दौरान 1944 में 'द डिस्कवरी ऑफ इंडिया' लिखी।"]),
  q(1, "general-studies", "general-science", "E", 2,
    ["Deficiency of which vitamin causes scurvy?", ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"], "Scurvy is caused by a lack of Vitamin C (ascorbic acid), leading to bleeding gums and weak connective tissue."],
    ["किस विटामिन की कमी से स्कर्वी रोग होता है?", ["विटामिन A", "विटामिन D", "विटामिन C", "विटामिन K"], "स्कर्वी रोग विटामिन C (एस्कॉर्बिक अम्ल) की कमी से होता है, जिसमें मसूड़ों से खून आता है।"]),
  q(1, "general-studies", "indian-geography", "M", 1,
    ["Which is the longest river of peninsular India?", ["Krishna", "Godavari", "Kaveri", "Mahanadi"], "The Godavari (about 1,465 km) is the longest river of peninsular India and is called the 'Dakshin Ganga'."],
    ["प्रायद्वीपीय भारत की सबसे लंबी नदी कौन-सी है?", ["कृष्णा", "गोदावरी", "कावेरी", "महानदी"], "गोदावरी (लगभग 1,465 किमी) प्रायद्वीपीय भारत की सबसे लंबी नदी है और 'दक्षिण गंगा' कहलाती है।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "M", 2,
    ["Find the next number: 2, 6, 12, 20, 30, ?", ["40", "44", "42", "36"], "The differences are 4, 6, 8, 10, so the next difference is 12 and the next number is 30 + 12 = 42."],
    ["अगली संख्या ज्ञात कीजिए: 2, 6, 12, 20, 30, ?", ["40", "44", "42", "36"], "अंतर 4, 6, 8, 10 हैं, इसलिए अगला अंतर 12 होगा और अगली संख्या 30 + 12 = 42 होगी।"]),
  q(2, "reasoning", "coding-decoding", "M", 0,
    ["In a certain code, BOOK is written as CPPL. How is FISH written in that code?", ["GJTI", "GHTI", "FJTI", "GJSI"], "Each letter is moved one place forward: F→G, I→J, S→T, H→I, so FISH becomes GJTI."],
    ["एक कूट भाषा में BOOK को CPPL लिखा जाता है। उसी कूट में FISH कैसे लिखा जाएगा?", ["GJTI", "GHTI", "FJTI", "GJSI"], "प्रत्येक अक्षर को एक स्थान आगे बढ़ाया गया है: F→G, I→J, S→T, H→I, इसलिए FISH = GJTI।"]),
  q(2, "reasoning", "blood-relations", "M", 1,
    ["Pointing to a man, a woman says, \"He is the son of my mother's only brother.\" How is the man related to the woman?", ["Brother", "Cousin", "Nephew", "Uncle"], "The woman's mother's only brother is her maternal uncle, and his son is her cousin."],
    ["एक पुरुष की ओर संकेत करते हुए एक महिला कहती है, \"यह मेरी माँ के इकलौते भाई का पुत्र है।\" वह पुरुष महिला का क्या लगता है?", ["भाई", "चचेरा/ममेरा भाई", "भतीजा", "चाचा"], "महिला की माँ का इकलौता भाई उसका मामा है और मामा का पुत्र उसका ममेरा भाई होता है।"]),

  // ───────── Section 3: Maths ─────────
  q(3, "quant", "percentage", "E", 3,
    ["What is 20% of 450 plus 15% of 200?", ["110", "115", "125", "120"], "20% of 450 = 90 and 15% of 200 = 30, so the sum is 90 + 30 = 120."],
    ["450 का 20% तथा 200 के 15% का योग कितना है?", ["110", "115", "125", "120"], "450 का 20% = 90 और 200 का 15% = 30, अतः योग 90 + 30 = 120 है।"]),
  q(3, "quant", "speed-distance", "M", 1,
    ["A train running at 60 km/h crosses a pole in 12 seconds. What is the length of the train?", ["120 m", "200 m", "240 m", "300 m"], "Speed = 60 × 5/18 = 50/3 m/s. Length = speed × time = (50/3) × 12 = 200 m."],
    ["60 किमी/घंटा की चाल से चल रही एक ट्रेन एक खंभे को 12 सेकंड में पार करती है। ट्रेन की लंबाई कितनी है?", ["120 मी", "200 मी", "240 मी", "300 मी"], "चाल = 60 × 5/18 = 50/3 मी/से। लंबाई = चाल × समय = (50/3) × 12 = 200 मी।"]),

  // ───────── Section 4: English ─────────
  q(4, "english", "synonyms-antonyms", "E", 1,
    ["Choose the word closest in meaning to 'ABUNDANT'.", ["Scarce", "Plentiful", "Tiny", "Rare"], "'Abundant' means existing in large quantities, so 'plentiful' is the synonym."],
    ["'ABUNDANT' का समानार्थी शब्द चुनिए।", ["Scarce", "Plentiful", "Tiny", "Rare"], "'Abundant' का अर्थ है बहुतायत में, इसलिए 'Plentiful' इसका समानार्थी है।"]),
  q(4, "english", "grammar", "M", 2,
    ["Fill in the blank: She has been living in Shimla ____ 2015.", ["for", "from", "since", "by"], "'Since' is used with a fixed point in time (2015); 'for' is used with a duration."],
    ["रिक्त स्थान भरिए: She has been living in Shimla ____ 2015.", ["for", "from", "since", "by"], "समय के निश्चित बिंदु (2015) के साथ 'since' का प्रयोग होता है; अवधि के साथ 'for' आता है।"]),

  // ───────── Section 5: Hindi ─────────
  q(5, "hindi", "muhavare", "E", 0,
    ["'आँखों का तारा' मुहावरे का अर्थ है:", ["बहुत प्यारा", "बहुत तेज़ नज़र वाला", "अंधा होना", "रात में जागना"], "'आँखों का तारा' का अर्थ है अत्यंत प्रिय व्यक्ति।"],
    ["'आँखों का तारा' मुहावरे का अर्थ है:", ["बहुत प्यारा", "बहुत तेज़ नज़र वाला", "अंधा होना", "रात में जागना"], "'आँखों का तारा' का अर्थ है अत्यंत प्रिय व्यक्ति।"]),
];
