// KCCB / JCCB Clerk Free Mock 1 — 15 questions (Banking & Cooperative Awareness 4, Quantitative Aptitude 3, Reasoning 3, English 3, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const kccbJccbClerkMock1: PatwariQuestion[] = [
  // ───────── Section 0: Banking & Cooperative Awareness ─────────
  q(0, "banking", "banking-awareness", "E", 1,
    ["The Reserve Bank of India (RBI) was established in:", ["1 January 1935", "1 April 1935", "15 August 1947", "26 January 1950"], "The RBI began operations on 1 April 1935 under the RBI Act, 1934, and was nationalised on 1 January 1949."],
    ["भारतीय रिज़र्व बैंक (RBI) की स्थापना कब हुई थी?", ["1 जनवरी 1935", "1 अप्रैल 1935", "15 अगस्त 1947", "26 जनवरी 1950"], "RBI ने RBI अधिनियम, 1934 के तहत 1 अप्रैल 1935 को कार्य शुरू किया और 1 जनवरी 1949 को इसका राष्ट्रीयकरण हुआ।"]),
  q(0, "banking", "cooperative-banking", "M", 2,
    ["In the three-tier short-term cooperative credit structure, the District Central Cooperative Bank (DCCB) works between the:", ["RBI and NABARD", "NABARD and commercial banks", "State Cooperative Bank and the Primary Agricultural Credit Societies (PACS)", "Gram Panchayat and Zila Parishad"], "The structure is the State Cooperative Bank at the top, the District Central Cooperative Banks in the middle and the PACS at the village level."],
    ["त्रिस्तरीय अल्पकालीन सहकारी ऋण संरचना में जिला केंद्रीय सहकारी बैंक (DCCB) किनके बीच कार्य करता है?", ["RBI और नाबार्ड", "नाबार्ड और वाणिज्यिक बैंक", "राज्य सहकारी बैंक और प्राथमिक कृषि ऋण समितियाँ (PACS)", "ग्राम पंचायत और जिला परिषद"], "इस संरचना में शीर्ष पर राज्य सहकारी बैंक, मध्य में जिला केंद्रीय सहकारी बैंक और गाँव स्तर पर प्राथमिक कृषि ऋण समितियाँ होती हैं।"]),
  q(0, "banking", "cooperative-banking", "M", 0,
    ["The right to form cooperative societies was made a Fundamental Right under Article 19(1)(c) by which Constitutional Amendment?", ["97th Amendment, 2011", "73rd Amendment, 1992", "86th Amendment, 2002", "42nd Amendment, 1976"], "The 97th Amendment (2011) added 'cooperative societies' to Article 19(1)(c) and inserted Part IXB (Articles 243ZH to 243ZT)."],
    ["सहकारी समितियाँ बनाने के अधिकार को अनुच्छेद 19(1)(ग) के अंतर्गत मौलिक अधिकार किस संविधान संशोधन से बनाया गया?", ["97वाँ संशोधन, 2011", "73वाँ संशोधन, 1992", "86वाँ संशोधन, 2002", "42वाँ संशोधन, 1976"], "97वें संशोधन (2011) ने अनुच्छेद 19(1)(ग) में 'सहकारी समितियाँ' जोड़ीं और भाग IXख (अनुच्छेद 243ZH से 243ZT) जोड़ा।"]),
  q(0, "banking", "banking-awareness", "E", 3,
    ["The rate at which the RBI lends short-term funds to commercial banks against government securities is called the:", ["Reverse repo rate", "Bank rate", "CRR", "Repo rate"], "The repo rate is the rate at which the RBI lends to banks against securities; a higher repo rate makes borrowing costlier for banks."],
    ["जिस दर पर RBI सरकारी प्रतिभूतियों के बदले वाणिज्यिक बैंकों को अल्पकालिक ऋण देता है, उसे क्या कहते हैं?", ["रिवर्स रेपो दर", "बैंक दर", "सीआरआर", "रेपो दर"], "रेपो दर वह दर है जिस पर RBI प्रतिभूतियों के बदले बैंकों को उधार देता है; रेपो दर बढ़ने से बैंकों के लिए ऋण महँगा हो जाता है।"]),

  // ───────── Section 1: Quantitative Aptitude ─────────
  q(1, "quant", "interest", "M", 1,
    ["What is the compound interest on ₹10,000 for 2 years at 10% per annum, compounded annually?", ["₹2,000", "₹2,100", "₹2,200", "₹2,400"], "Amount = 10,000 × 1.1 × 1.1 = ₹12,100, so compound interest = 12,100 − 10,000 = ₹2,100."],
    ["₹10,000 पर 10% वार्षिक दर से 2 वर्ष का चक्रवृद्धि ब्याज (वार्षिक संयोजन) कितना होगा?", ["₹2,000", "₹2,100", "₹2,200", "₹2,400"], "मिश्रधन = 10,000 × 1.1 × 1.1 = ₹12,100, इसलिए चक्रवृद्धि ब्याज = 12,100 − 10,000 = ₹2,100।"]),
  q(1, "quant", "profit-loss", "M", 2,
    ["An article bought for ₹400 is sold for ₹480. What is the profit percentage?", ["10%", "15%", "20%", "25%"], "Profit = 480 − 400 = ₹80, so profit % = 80 / 400 × 100 = 20%."],
    ["₹400 में खरीदी गई वस्तु ₹480 में बेची गई। लाभ प्रतिशत कितना है?", ["10%", "15%", "20%", "25%"], "लाभ = 480 − 400 = ₹80, अतः लाभ % = 80 / 400 × 100 = 20%।"]),
  q(1, "quant", "time-work", "M", 0,
    ["A can finish a task in 12 days and B can finish it in 6 days. Working together, how many days will they take?", ["4 days", "5 days", "6 days", "9 days"], "Combined rate = 1/12 + 1/6 = 3/12 = 1/4 of the work per day, so they finish in 4 days."],
    ["A एक कार्य 12 दिन में और B उसी कार्य को 6 दिन में पूरा कर सकता है। साथ मिलकर वे कितने दिन में पूरा करेंगे?", ["4 दिन", "5 दिन", "6 दिन", "9 दिन"], "संयुक्त दर = 1/12 + 1/6 = 3/12 = 1/4 कार्य प्रतिदिन, इसलिए वे 4 दिन में कार्य पूरा करेंगे।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "E", 3,
    ["Find the next term: 5, 10, 20, 40, ?", ["60", "70", "75", "80"], "Each term doubles, so the next term is 40 × 2 = 80."],
    ["अगला पद ज्ञात कीजिए: 5, 10, 20, 40, ?", ["60", "70", "75", "80"], "प्रत्येक पद दुगुना होता जाता है, इसलिए अगला पद 40 × 2 = 80 है।"]),
  q(2, "reasoning", "inequality", "M", 1,
    ["If P > Q, Q ≥ R and R > S, which of the following is definitely true?", ["S > P", "P > S", "R > P", "Q < S"], "Chaining the statements gives P > Q ≥ R > S, so P > S is definitely true."],
    ["यदि P > Q, Q ≥ R और R > S है, तो निम्नलिखित में से कौन-सा निश्चित रूप से सत्य है?", ["S > P", "P > S", "R > P", "Q < S"], "कथनों को जोड़ने पर P > Q ≥ R > S मिलता है, इसलिए P > S निश्चित रूप से सत्य है।"]),
  q(2, "reasoning", "ranking", "M", 1,
    ["In a queue at a bank counter, Ravi is 7th from the front and 14th from the back. How many people are there in the queue?", ["19", "20", "21", "22"], "Total = 7 + 14 − 1 = 20, because Ravi is counted in both positions."],
    ["बैंक काउंटर की कतार में रवि आगे से 7वें और पीछे से 14वें स्थान पर है। कतार में कुल कितने लोग हैं?", ["19", "20", "21", "22"], "कुल = 7 + 14 − 1 = 20, क्योंकि रवि दोनों गणनाओं में शामिल है।"]),

  // ───────── Section 3: English ─────────
  q(3, "english", "grammar", "E", 0,
    ["Choose the correct preposition: The bank is open ____ 10 a.m. to 4 p.m.", ["from", "since", "at", "by"], "'From ... to ...' is used to give the start and end of a period of time."],
    ["सही पूर्वसर्ग चुनिए: The bank is open ____ 10 a.m. to 4 p.m.", ["from", "since", "at", "by"], "'From ... to ...' का प्रयोग समय की अवधि का आरंभ और अंत बताने के लिए होता है।"]),
  q(3, "english", "vocabulary", "M", 3,
    ["The word 'DEPOSIT' in banking means:", ["To withdraw money", "To borrow money", "To transfer a loan", "To put money into an account"], "To deposit is to place money in a bank account; withdrawing is the opposite action."],
    ["बैंकिंग में 'DEPOSIT' शब्द का अर्थ है:", ["पैसे निकालना", "पैसे उधार लेना", "ऋण हस्तांतरित करना", "खाते में पैसे जमा करना"], "डिपॉज़िट का अर्थ है बैंक खाते में धन जमा करना; धन निकालना इसका विपरीत कार्य है।"]),
  q(3, "english", "one-word", "M", 1,
    ["One who is unable to pay his debts is called:", ["Solvent", "Insolvent", "Creditor", "Guarantor"], "An insolvent person cannot pay his debts as they fall due; a creditor is the one to whom money is owed."],
    ["अपने ऋण चुकाने में असमर्थ व्यक्ति को अंग्रेज़ी में क्या कहते हैं?", ["Solvent", "Insolvent", "Creditor", "Guarantor"], "Insolvent वह व्यक्ति है जो देय होने पर अपने ऋण नहीं चुका सकता; creditor वह होता है जिसका धन बकाया है।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "geography", "E", 2,
    ["Kangra, the district whose name the Kangra Central Co-operative Bank carries, has its headquarters at:", ["Palampur", "Kangra town", "Dharamshala", "Nurpur"], "Dharamshala is the district headquarters of Kangra district; Kangra town is known for the Brajeshwari Devi temple and the Kangra Fort."],
    ["कांगड़ा जिला, जिसके नाम पर कांगड़ा केंद्रीय सहकारी बैंक है, का मुख्यालय कहाँ है?", ["पालमपुर", "कांगड़ा शहर", "धर्मशाला", "नूरपुर"], "धर्मशाला कांगड़ा जिले का मुख्यालय है; कांगड़ा शहर ब्रजेश्वरी देवी मंदिर और कांगड़ा किले के लिए प्रसिद्ध है।"]),
  q(4, "hp-gk", "districts", "M", 0,
    ["Which district of Himachal Pradesh is the largest by area?", ["Lahaul and Spiti", "Kangra", "Chamba", "Kinnaur"], "Lahaul and Spiti is the largest district of Himachal Pradesh by area, though it is the least densely populated."],
    ["क्षेत्रफल की दृष्टि से हिमाचल प्रदेश का सबसे बड़ा जिला कौन-सा है?", ["लाहौल एवं स्पीति", "कांगड़ा", "चंबा", "किन्नौर"], "क्षेत्रफल में लाहौल एवं स्पीति हिमाचल प्रदेश का सबसे बड़ा जिला है, हालाँकि यहाँ जनसंख्या घनत्व सबसे कम है।"]),
];
