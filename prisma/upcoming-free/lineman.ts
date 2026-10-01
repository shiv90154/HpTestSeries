// HPSEBL Lineman Free Mock 1 — 15 questions (Electrical Basics 5, Safety & Wiring 4, Equipment & Tools 2, Maths 2, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const linemanMock1: PatwariQuestion[] = [
  // ───────── Section 0: Electrical Basics ─────────
  q(0, "electrical-engineering", "circuits", "E", 0,
    ["The unit of electric current is:", ["Ampere", "Volt", "Ohm", "Watt"], "Electric current is measured in amperes (A)."],
    ["विद्युत धारा का मात्रक है:", ["ऐम्पियर", "वोल्ट", "ओम", "वाट"], "विद्युत धारा ऐम्पियर (A) में मापी जाती है।"]),
  q(0, "electrical-engineering", "circuits", "E", 2,
    ["The unit of electrical resistance is:", ["Ampere", "Volt", "Ohm", "Farad"], "Resistance is measured in ohms (Ω)."],
    ["विद्युत प्रतिरोध का मात्रक है:", ["ऐम्पियर", "वोल्ट", "ओम", "फैराड"], "प्रतिरोध ओम (Ω) में मापा जाता है।"]),
  q(0, "electrical-engineering", "circuits", "M", 1,
    ["The voltage across a 10 Ω resistor carrying a current of 3 A is:", ["13 V", "30 V", "3.3 V", "7 V"], "V = I × R = 3 × 10 = 30 V."],
    ["3 A धारा वाले 10 Ω प्रतिरोध के सिरों पर वोल्टेज कितना होगा?", ["13 V", "30 V", "3.3 V", "7 V"], "V = I × R = 3 × 10 = 30 V।"]),
  q(0, "electrical-engineering", "circuits", "M", 3,
    ["Electrical power is given by:", ["V / I", "I / V", "V + I", "V × I"], "Power P = V × I (watts)."],
    ["विद्युत शक्ति का सूत्र है:", ["V / I", "I / V", "V + I", "V × I"], "शक्ति P = V × I (वाट)।"]),
  q(0, "electrical-engineering", "circuits", "E", 1,
    ["Which of the following is an insulator?", ["Copper", "Rubber", "Aluminium", "Silver"], "Rubber does not conduct electricity and is used as an insulator; copper, aluminium and silver are conductors."],
    ["निम्नलिखित में से कौन-सा विद्युतरोधी (कुचालक) है?", ["तांबा", "रबर", "एल्युमिनियम", "चाँदी"], "रबर विद्युत का चालन नहीं करता और रोधी के रूप में प्रयुक्त होता है; तांबा, एल्युमिनियम और चाँदी चालक हैं।"]),

  // ───────── Section 1: Safety & Wiring ─────────
  q(1, "electrical-engineering", "measurements-safety", "E", 3,
    ["Before starting work on an overhead line, the lineman must first:", ["Climb the pole", "Remove the fuse only", "Inform nobody", "Switch off, isolate and earth the line (permit-to-work)"], "Safe practice is to de-energise, isolate, test for no voltage and earth the line, with a permit-to-work, before anyone climbs."],
    ["ओवरहेड लाइन पर कार्य शुरू करने से पहले लाइनमैन को सबसे पहले क्या करना चाहिए?", ["खंभे पर चढ़ना", "केवल फ्यूज़ निकालना", "किसी को सूचित न करना", "लाइन बंद, पृथक् और अर्थित करना (परमिट-टू-वर्क)"], "सुरक्षित कार्यविधि में कोई चढ़े इससे पहले लाइन को बंद करना, पृथक् करना, वोल्टेज की जाँच करना और अर्थ करना तथा परमिट-टू-वर्क लेना शामिल है।"]),
  q(1, "electrical-engineering", "measurements-safety", "M", 0,
    ["In a standard single-phase wiring colour code in India, the earth wire is usually:", ["Green (or green-yellow)", "Red", "Black", "Blue"], "Earth is green or green-yellow; live is red/brown/black and neutral is black/blue depending on the code."],
    ["भारत में एकल-कला वायरिंग के मानक रंग-कोड में अर्थ तार सामान्यतः किस रंग का होता है?", ["हरा (या हरा-पीला)", "लाल", "काला", "नीला"], "अर्थ तार हरा या हरा-पीला होता है; फेज़ लाल/भूरा/काला और न्यूट्रल काला/नीला कोड के अनुसार होता है।"]),
  q(1, "electrical-engineering", "measurements-safety", "E", 2,
    ["The device that automatically cuts the supply on a leakage (earth fault) current to prevent electric shock is the:", ["Switch", "Bulb holder", "RCCB / ELCB", "Regulator"], "An RCCB (residual current circuit breaker) trips when it detects a small earth-leakage current."],
    ["रिसाव (अर्थ फॉल्ट) धारा होने पर बिजली के झटके से बचाने के लिए आपूर्ति स्वतः काटने वाला उपकरण है:", ["स्विच", "बल्ब होल्डर", "RCCB / ELCB", "रेगुलेटर"], "RCCB (रेज़िडुअल करंट सर्किट ब्रेकर) छोटी अर्थ-रिसाव धारा पहचानते ही ट्रिप हो जाता है।"]),
  q(1, "electrical-engineering", "measurements-safety", "M", 1,
    ["For an electrical fire, which extinguisher is suitable?", ["Water", "Carbon dioxide (CO₂)", "Foam", "Soda acid"], "CO₂ and dry powder extinguishers do not conduct electricity, whereas water and foam are unsafe on live equipment."],
    ["बिजली से लगी आग के लिए कौन-सा अग्निशामक उपयुक्त है?", ["पानी", "कार्बन डाइऑक्साइड (CO₂)", "फोम", "सोडा-अम्ल"], "CO₂ और ड्राई पाउडर अग्निशामक विद्युत का चालन नहीं करते, जबकि पानी और फोम चालू उपकरण पर असुरक्षित हैं।"]),

  // ───────── Section 2: Equipment & Tools ─────────
  q(2, "electrical-engineering", "machines", "M", 3,
    ["A distribution transformer is used to:", ["Increase the frequency", "Convert AC to DC", "Generate electricity", "Step down high voltage to the consumer voltage"], "A distribution transformer steps 11 kV down to about 415/230 V for consumers."],
    ["वितरण ट्रांसफार्मर का कार्य है:", ["आवृत्ति बढ़ाना", "AC को DC में बदलना", "बिजली उत्पन्न करना", "उच्च वोल्टेज को उपभोक्ता वोल्टेज तक घटाना"], "वितरण ट्रांसफार्मर 11 kV को उपभोक्ताओं के लिए लगभग 415/230 V तक घटाता है।"]),
  q(2, "electrical-engineering", "measurements-safety", "E", 0,
    ["Which tool is used to check whether a line is live?", ["Voltage tester", "Spanner", "Hammer", "Plumb bob"], "A voltage tester (or test lamp) indicates the presence of voltage on a conductor."],
    ["यह जाँचने के लिए कि लाइन में बिजली है या नहीं, किस उपकरण का उपयोग होता है?", ["वोल्टेज टेस्टर", "स्पैनर", "हथौड़ा", "साहुल"], "वोल्टेज टेस्टर (टेस्ट लैंप) चालक में वोल्टेज की उपस्थिति बताता है।"]),

  // ───────── Section 3: Maths ─────────
  q(3, "quant", "simplification", "E", 2,
    ["What is 15 × 12 + 20?", ["190", "180", "200", "210"], "15 × 12 = 180 and 180 + 20 = 200."],
    ["15 × 12 + 20 का मान क्या है?", ["190", "180", "200", "210"], "15 × 12 = 180 और 180 + 20 = 200।"]),
  q(3, "quant", "speed-distance", "M", 1,
    ["A lineman covers 36 km in 4 hours by jeep. His average speed is:", ["8 km/h", "9 km/h", "12 km/h", "6 km/h"], "Speed = distance / time = 36 / 4 = 9 km/h."],
    ["एक लाइनमैन जीप से 4 घंटे में 36 किमी की दूरी तय करता है। उसकी औसत चाल है:", ["8 किमी/घंटा", "9 किमी/घंटा", "12 किमी/घंटा", "6 किमी/घंटा"], "चाल = दूरी / समय = 36 / 4 = 9 किमी/घंटा।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "geography", "E", 3,
    ["Which district of Himachal Pradesh is known as the 'Apple Bowl' with Shimla as its centre?", ["Una", "Bilaspur", "Hamirpur", "Shimla"], "Shimla district, with Kotgarh and Theog, is the heart of the Himachal apple belt."],
    ["हिमाचल का कौन-सा जिला, जिसका केंद्र शिमला है, सेब का प्रमुख क्षेत्र माना जाता है?", ["ऊना", "बिलासपुर", "हमीरपुर", "शिमला"], "कोटगढ़ और ठियोग वाला शिमला जिला हिमाचल के सेब क्षेत्र का केंद्र है।"]),
  q(4, "hp-gk", "culture-festivals", "M", 0,
    ["The famous Jwalamukhi temple is located in:", ["Kangra district", "Una district", "Sirmaur district", "Kinnaur district"], "The Jwalamukhi Shaktipeeth, known for its natural flames, is in Kangra district."],
    ["प्रसिद्ध ज्वालामुखी मंदिर किस जिले में स्थित है?", ["कांगड़ा", "ऊना", "सिरमौर", "किन्नौर"], "प्राकृतिक ज्वालाओं के लिए प्रसिद्ध ज्वालामुखी शक्तिपीठ कांगड़ा जिले में है।"]),
];
