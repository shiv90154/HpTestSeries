// HPSCB Clerk Free Mock 1 — 15 questions (Himachal GK 3, General Studies & Banking Awareness 3, Reasoning 3, Maths 3, English 2, Computer 1).

import { q, type PatwariQuestion } from "../patwari/types";

export const hpscbClerkMock1: PatwariQuestion[] = [
  // ───────── Section 0: Himachal GK ─────────
  q(0, "hp-gk", "economy", "M", 1,
    ["Which fruit is known as the 'backbone' of the Himachal economy?", ["Mango", "Apple", "Litchi", "Pear"], "Apple is the most important cash crop of Himachal Pradesh, especially in Shimla, Kullu, Kinnaur and Mandi."],
    ["कौन-सा फल हिमाचल की अर्थव्यवस्था की 'रीढ़' माना जाता है?", ["आम", "सेब", "लीची", "नाशपाती"], "सेब हिमाचल प्रदेश की सबसे महत्वपूर्ण नकदी फसल है, विशेषकर शिमला, कुल्लू, किन्नौर और मंडी में।"]),
  q(0, "hp-gk", "economy", "M", 3,
    ["The Bhakra Dam, whose reservoir is Gobind Sagar, is built on the river:", ["Beas", "Ravi", "Chenab", "Sutlej"], "Bhakra Dam is built on the Sutlej in Bilaspur district; its reservoir is Gobind Sagar."],
    ["गोबिंद सागर जलाशय वाला भाखड़ा बाँध किस नदी पर बना है?", ["ब्यास", "रावी", "चिनाब", "सतलुज"], "भाखड़ा बाँध बिलासपुर जिले में सतलुज पर बना है और इसका जलाशय गोबिंद सागर है।"]),
  q(0, "hp-gk", "districts", "E", 0,
    ["The headquarters of Kinnaur district is:", ["Reckong Peo", "Kalpa", "Keylong", "Kaza"], "Reckong Peo is the district headquarters of Kinnaur; Keylong is for Lahaul & Spiti and Kaza is the Spiti sub-division headquarters."],
    ["किन्नौर जिले का मुख्यालय कहाँ है?", ["रिकांगपिओ", "कल्पा", "केलांग", "काजा"], "रिकांगपिओ किन्नौर का जिला मुख्यालय है; केलांग लाहौल-स्पीति का और काजा स्पीति उपमंडल का मुख्यालय है।"]),

  // ───────── Section 1: General Studies & Banking Awareness ─────────
  q(1, "general-studies", "indian-economy", "E", 2,
    ["The central bank of India is:", ["State Bank of India", "NABARD", "Reserve Bank of India", "SEBI"], "The Reserve Bank of India (RBI), established in 1935, is the central bank of the country."],
    ["भारत का केंद्रीय बैंक कौन-सा है?", ["भारतीय स्टेट बैंक", "नाबार्ड", "भारतीय रिज़र्व बैंक", "सेबी"], "भारतीय रिज़र्व बैंक (RBI), जिसकी स्थापना 1935 में हुई, देश का केंद्रीय बैंक है।"]),
  q(1, "general-studies", "indian-economy", "M", 1,
    ["NABARD is mainly concerned with the development of:", ["Foreign trade", "Agriculture and rural areas", "Stock markets", "Insurance"], "The National Bank for Agriculture and Rural Development (NABARD) supports agriculture and rural development finance."],
    ["नाबार्ड (NABARD) मुख्यतः किसके विकास से संबंधित है?", ["विदेशी व्यापार", "कृषि एवं ग्रामीण क्षेत्र", "शेयर बाज़ार", "बीमा"], "राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) कृषि और ग्रामीण विकास के लिए वित्त की व्यवस्था करता है।"]),
  q(1, "general-studies", "indian-economy", "M", 0,
    ["In banking, the rate at which RBI lends short-term funds to commercial banks against securities is called the:", ["Repo rate", "Reverse repo rate", "Bank rate", "CRR"], "The repo (repurchase) rate is the rate at which RBI lends to banks against government securities."],
    ["बैंकिंग में वह दर जिस पर RBI वाणिज्यिक बैंकों को प्रतिभूतियों के बदले अल्पकालिक ऋण देता है, कहलाती है:", ["रेपो दर", "रिवर्स रेपो दर", "बैंक दर", "CRR"], "रेपो दर वह दर है जिस पर RBI सरकारी प्रतिभूतियों के बदले बैंकों को उधार देता है।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "E", 3,
    ["Find the missing letter: A, C, E, G, ?", ["H", "J", "L", "I"], "The letters skip one each time (A, C, E, G), so the next is I."],
    ["लुप्त अक्षर ज्ञात कीजिए: A, C, E, G, ?", ["H", "J", "L", "I"], "प्रत्येक बार एक अक्षर छोड़ा गया है (A, C, E, G), इसलिए अगला अक्षर I है।"]),
  q(2, "reasoning", "coding-decoding", "M", 2,
    ["If CAT is coded as 24 and DOG as 26, using the sum of the alphabet positions, what is the code of BAD?", ["5", "6", "7", "8"], "Positions: C 3 + A 1 + T 20 = 24, which matches. B 2 + A 1 + D 4 = 7."],
    ["यदि वर्णमाला स्थानों के योग से CAT का कूट 24 और DOG का 26 है, तो BAD का कूट क्या होगा?", ["5", "6", "7", "8"], "स्थान: C 3 + A 1 + T 20 = 24, जो मेल खाता है। B 2 + A 1 + D 4 = 7।"]),
  q(2, "reasoning", "blood-relations", "M", 1,
    ["A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?", ["Father", "Uncle", "Cousin", "Grandfather"], "A and C are siblings, so A is the brother of D's father, i.e. D's uncle."],
    ["A, B का भाई है। B, C की बहन है। C, D का पिता है। A का D से क्या संबंध है?", ["पिता", "चाचा", "चचेरा भाई", "दादा"], "A और C भाई-बहन हैं, इसलिए A, D के पिता का भाई यानी D का चाचा है।"]),

  // ───────── Section 3: Maths ─────────
  q(3, "quant", "ratio-proportion", "E", 0,
    ["If A : B = 2 : 3 and B : C = 4 : 5, then A : C is:", ["8 : 15", "2 : 5", "6 : 5", "4 : 15"], "A : C = (2 × 4) : (3 × 5) = 8 : 15."],
    ["यदि A : B = 2 : 3 और B : C = 4 : 5 है, तो A : C होगा:", ["8 : 15", "2 : 5", "6 : 5", "4 : 15"], "A : C = (2 × 4) : (3 × 5) = 8 : 15।"]),
  q(3, "quant", "time-work", "M", 2,
    ["A can complete a work in 12 days and B in 24 days. Working together, in how many days will they finish it?", ["6 days", "7 days", "8 days", "9 days"], "Combined rate = 1/12 + 1/24 = 3/24 = 1/8 per day, so 8 days."],
    ["A किसी कार्य को 12 दिन में और B 24 दिन में पूरा कर सकता है। साथ मिलकर वे कितने दिन में पूरा करेंगे?", ["6 दिन", "7 दिन", "8 दिन", "9 दिन"], "संयुक्त दर = 1/12 + 1/24 = 3/24 = 1/8 प्रति दिन, इसलिए 8 दिन।"]),
  q(3, "quant", "interest", "M", 1,
    ["The compound interest on Rs 10,000 at 10% per annum for 2 years, compounded annually, is:", ["Rs 2,000", "Rs 2,100", "Rs 2,200", "Rs 2,500"], "Amount = 10000 × 1.1 × 1.1 = 12,100, so CI = 12,100 − 10,000 = Rs 2,100."],
    ["10,000 रुपये पर 10% वार्षिक दर से 2 वर्ष का चक्रवृद्धि ब्याज (वार्षिक संयोजन) कितना होगा?", ["2,000 रुपये", "2,100 रुपये", "2,200 रुपये", "2,500 रुपये"], "मिश्रधन = 10000 × 1.1 × 1.1 = 12,100, इसलिए चक्रवृद्धि ब्याज = 12,100 − 10,000 = 2,100 रुपये।"]),

  // ───────── Section 4: English ─────────
  q(4, "english", "comprehension", "M", 1,
    ["Choose the correct meaning of the idiom 'to beat around the bush':", ["To hunt in a forest", "To avoid coming to the point", "To clean a garden", "To walk in circles for exercise"], "'To beat around the bush' means to avoid talking directly about the main issue."],
    ["मुहावरे 'to beat around the bush' का सही अर्थ चुनिए:", ["जंगल में शिकार करना", "मुख्य बात से बचना", "बगीचा साफ़ करना", "व्यायाम के लिए चक्कर लगाना"], "'To beat around the bush' का अर्थ है मुख्य मुद्दे पर सीधे बात करने से बचना।"]),
  q(4, "english", "grammar", "E", 3,
    ["Fill in the blank: He is senior ____ me.", ["than", "from", "with", "to"], "'Senior' is followed by 'to', not 'than': 'senior to me'."],
    ["रिक्त स्थान भरिए: He is senior ____ me.", ["than", "from", "with", "to"], "'Senior' के बाद 'to' आता है, 'than' नहीं: 'senior to me'।"]),

  // ───────── Section 5: Computer ─────────
  q(5, "computer", "fundamentals", "E", 2,
    ["The full form of CPU is:", ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Utility"], "CPU stands for Central Processing Unit, the brain of the computer."],
    ["CPU का पूर्ण रूप क्या है?", ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Utility"], "CPU का अर्थ Central Processing Unit है, जो कंप्यूटर का मस्तिष्क है।"]),
];
