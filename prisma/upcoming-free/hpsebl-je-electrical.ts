// HPSEBL Junior Engineer (Electrical) Free Mock 1 — 15 questions (Circuit Theory 4, Electrical Machines 4, Power Systems 3, Measurements & Safety 2, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const hpseblJeElectricalMock1: PatwariQuestion[] = [
  // ───────── Section 0: Circuit Theory ─────────
  q(0, "electrical-engineering", "circuits", "E", 1,
    ["According to Ohm's law, the current through a conductor is:", ["Inversely proportional to voltage", "Directly proportional to voltage at constant resistance", "Independent of voltage", "Directly proportional to resistance"], "Ohm's law: V = IR, so at constant resistance the current is directly proportional to the voltage."],
    ["ओम के नियम के अनुसार किसी चालक में धारा:", ["वोल्टेज के व्युत्क्रमानुपाती होती है", "नियत प्रतिरोध पर वोल्टेज के समानुपाती होती है", "वोल्टेज पर निर्भर नहीं करती", "प्रतिरोध के समानुपाती होती है"], "ओम का नियम V = IR है, इसलिए नियत प्रतिरोध पर धारा वोल्टेज के समानुपाती होती है।"]),
  q(0, "electrical-engineering", "circuits", "M", 3,
    ["Three resistors of 6 Ω each are connected in parallel. The equivalent resistance is:", ["18 Ω", "6 Ω", "3 Ω", "2 Ω"], "For n equal resistors in parallel, R = R/n = 6/3 = 2 Ω."],
    ["6 Ω के तीन प्रतिरोध समानांतर क्रम में जुड़े हैं। तुल्य प्रतिरोध है:", ["18 Ω", "6 Ω", "3 Ω", "2 Ω"], "n समान प्रतिरोध समानांतर में जुड़ने पर R/n = 6/3 = 2 Ω होता है।"]),
  q(0, "electrical-engineering", "circuits", "M", 2,
    ["The SI unit of capacitance is:", ["Henry", "Ohm", "Farad", "Weber"], "Capacitance is measured in farads (F); henry is for inductance, ohm for resistance, weber for magnetic flux."],
    ["धारिता का SI मात्रक है:", ["हेनरी", "ओम", "फैराड", "वेबर"], "धारिता फैराड (F) में मापी जाती है; हेनरी प्रेरकत्व, ओम प्रतिरोध और वेबर चुंबकीय फ्लक्स का मात्रक है।"]),
  q(0, "electrical-engineering", "circuits", "M", 0,
    ["The frequency of the AC supply in India is:", ["50 Hz", "60 Hz", "25 Hz", "100 Hz"], "India's standard supply frequency is 50 Hz (60 Hz in the USA)."],
    ["भारत में AC आपूर्ति की आवृत्ति कितनी होती है?", ["50 Hz", "60 Hz", "25 Hz", "100 Hz"], "भारत की मानक आपूर्ति आवृत्ति 50 Hz है (अमेरिका में 60 Hz)।"]),

  // ───────── Section 1: Electrical Machines ─────────
  q(1, "electrical-engineering", "machines", "E", 1,
    ["A transformer works on the principle of:", ["Self induction only", "Mutual induction", "Electrostatic induction", "Photoelectric effect"], "A transformer transfers energy between windings through mutual electromagnetic induction."],
    ["ट्रांसफार्मर किस सिद्धांत पर कार्य करता है?", ["केवल स्वप्रेरण", "अन्योन्य प्रेरण", "स्थिर-वैद्युत प्रेरण", "प्रकाश-विद्युत प्रभाव"], "ट्रांसफार्मर कुंडलियों के बीच अन्योन्य विद्युत-चुंबकीय प्रेरण से ऊर्जा स्थानांतरित करता है।"]),
  q(1, "electrical-engineering", "machines", "M", 2,
    ["A transformer cannot be used with:", ["Single-phase AC", "Three-phase AC", "DC supply", "High-frequency AC"], "A transformer needs a changing flux, which a steady DC supply cannot produce, so it does not work on DC."],
    ["ट्रांसफार्मर किसके साथ प्रयुक्त नहीं किया जा सकता?", ["एकल-कला AC", "त्रि-कला AC", "DC आपूर्ति", "उच्च आवृत्ति AC"], "ट्रांसफार्मर को परिवर्ती फ्लक्स चाहिए, जो स्थिर DC से नहीं बनता, इसलिए यह DC पर काम नहीं करता।"]),
  q(1, "electrical-engineering", "machines", "M", 0,
    ["The speed of a 4-pole induction motor on 50 Hz supply (synchronous speed) is:", ["1500 rpm", "3000 rpm", "1000 rpm", "750 rpm"], "Ns = 120f / P = 120 × 50 / 4 = 1500 rpm."],
    ["50 Hz आपूर्ति पर 4-ध्रुव इंडक्शन मोटर की तुल्यकालिक गति कितनी होती है?", ["1500 rpm", "3000 rpm", "1000 rpm", "750 rpm"], "Ns = 120f / P = 120 × 50 / 4 = 1500 rpm।"]),
  q(1, "electrical-engineering", "machines", "M", 3,
    ["An alternator converts:", ["Electrical energy to mechanical energy", "AC to DC", "DC to AC only", "Mechanical energy to AC electrical energy"], "An alternator is a synchronous generator that converts mechanical energy into alternating-current electrical energy."],
    ["अल्टरनेटर किसे परिवर्तित करता है?", ["विद्युत ऊर्जा को यांत्रिक ऊर्जा में", "AC को DC में", "केवल DC को AC में", "यांत्रिक ऊर्जा को AC विद्युत ऊर्जा में"], "अल्टरनेटर तुल्यकालिक जनित्र है जो यांत्रिक ऊर्जा को प्रत्यावर्ती धारा विद्युत ऊर्जा में बदलता है।"]),

  // ───────── Section 2: Power Systems ─────────
  q(2, "electrical-engineering", "power-systems", "E", 1,
    ["Electrical power is transmitted at high voltage mainly to:", ["Increase current", "Reduce transmission losses", "Increase resistance", "Reduce frequency"], "For a given power, a higher voltage means lower current, so the I²R losses in the line fall."],
    ["विद्युत शक्ति का पारेषण उच्च वोल्टेज पर मुख्यतः क्यों किया जाता है?", ["धारा बढ़ाने के लिए", "पारेषण हानि घटाने के लिए", "प्रतिरोध बढ़ाने के लिए", "आवृत्ति घटाने के लिए"], "समान शक्ति के लिए उच्च वोल्टेज पर धारा कम होती है, जिससे लाइन की I²R हानि घटती है।"]),
  q(2, "electrical-engineering", "power-systems", "M", 3,
    ["A fuse protects an electrical circuit against:", ["Low voltage", "Frequency variation", "Phase reversal", "Overcurrent and short circuit"], "A fuse melts when current exceeds its rating, breaking the circuit during overload or short circuit."],
    ["फ्यूज़ किसी विद्युत परिपथ को किससे बचाता है?", ["निम्न वोल्टेज", "आवृत्ति परिवर्तन", "कला उत्क्रमण", "अतिधारा एवं लघुपथन"], "रेटिंग से अधिक धारा होने पर फ्यूज़ पिघल जाता है और अतिभार या लघुपथन में परिपथ को तोड़ देता है।"]),
  q(2, "electrical-engineering", "power-systems", "M", 0,
    ["Which of the following is the best conductor of electricity?", ["Silver", "Aluminium", "Iron", "Tungsten"], "Silver has the lowest resistivity of all metals; copper is the most widely used conductor in practice."],
    ["निम्नलिखित में से विद्युत का सर्वश्रेष्ठ चालक कौन-सा है?", ["चाँदी", "एल्युमिनियम", "लोहा", "टंगस्टन"], "सभी धातुओं में चाँदी की प्रतिरोधकता सबसे कम होती है; व्यवहार में सबसे अधिक तांबा प्रयुक्त होता है।"]),

  // ───────── Section 3: Measurements & Safety ─────────
  q(3, "electrical-engineering", "measurements-safety", "E", 2,
    ["An ammeter is connected in ____ with the circuit.", ["Parallel", "Series-parallel", "Series", "Delta"], "An ammeter has very low resistance and is connected in series to measure the current."],
    ["एमीटर को परिपथ के साथ ____ में जोड़ा जाता है।", ["समानांतर", "श्रेणी-समानांतर", "श्रेणी", "डेल्टा"], "एमीटर का प्रतिरोध बहुत कम होता है और धारा मापने के लिए इसे श्रेणी क्रम में जोड़ा जाता है।"]),
  q(3, "electrical-engineering", "measurements-safety", "E", 1,
    ["The device used for earthing an appliance's metal body is intended mainly to:", ["Increase power", "Protect against electric shock", "Reduce the bill", "Increase voltage"], "Earthing provides a low-resistance path for fault current, preventing dangerous shock voltages on metal bodies."],
    ["उपकरण के धातु ढाँचे की अर्थिंग मुख्यतः किसलिए की जाती है?", ["शक्ति बढ़ाने", "बिजली के झटके से सुरक्षा", "बिल घटाने", "वोल्टेज बढ़ाने"], "अर्थिंग दोष धारा को कम प्रतिरोध वाला मार्ग देती है, जिससे धातु ढाँचे पर खतरनाक वोल्टेज नहीं बनता।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "economy", "E", 0,
    ["Himachal Pradesh is often called the 'Power House of India' mainly because of its:", ["Hydroelectric potential", "Coal reserves", "Nuclear plants", "Oil fields"], "Its many snow-fed rivers give Himachal large hydropower potential."],
    ["हिमाचल प्रदेश को 'भारत का पावर हाउस' मुख्यतः किस कारण कहा जाता है?", ["जलविद्युत क्षमता", "कोयला भंडार", "परमाणु संयंत्र", "तेल क्षेत्र"], "हिमाचल की कई हिमपोषित नदियाँ इसे बड़ी जलविद्युत क्षमता प्रदान करती हैं।"]),
  q(4, "hp-gk", "polity-administration", "M", 3,
    ["How many districts are there in Himachal Pradesh?", ["10", "11", "13", "12"], "Himachal Pradesh has 12 districts."],
    ["हिमाचल प्रदेश में कितने जिले हैं?", ["10", "11", "13", "12"], "हिमाचल प्रदेश में 12 जिले हैं।"]),
];
