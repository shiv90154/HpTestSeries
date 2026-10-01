// HPSEBL Assistant Engineer (Electrical) Free Mock 1 — 15 questions (Power Systems 4, Electrical Machines 3, Control & Electronics 3, Circuits & Measurements 3, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const hpseblAeMock1: PatwariQuestion[] = [
  // ───────── Section 0: Power Systems ─────────
  q(0, "electrical-engineering", "power-systems", "M", 1,
    ["In a power system, the function of a circuit breaker is to:", ["Increase voltage", "Interrupt fault current and isolate the faulty section", "Measure power", "Store energy"], "A circuit breaker opens automatically on a fault to interrupt the heavy current and isolate the faulty part."],
    ["विद्युत शक्ति प्रणाली में सर्किट ब्रेकर का कार्य है:", ["वोल्टेज बढ़ाना", "दोष धारा को रोककर दोषपूर्ण भाग को अलग करना", "शक्ति मापना", "ऊर्जा संचित करना"], "दोष होने पर सर्किट ब्रेकर स्वतः खुलकर भारी धारा को रोकता है और दोषपूर्ण भाग को अलग करता है।"]),
  q(0, "electrical-engineering", "power-systems", "M", 3,
    ["The Ferranti effect refers to:", ["Voltage drop at the receiving end", "Frequency rise at the sending end", "Heating of conductors", "Rise of receiving-end voltage over sending-end voltage on a lightly loaded long line"], "In a long, lightly loaded or open-circuit line, the capacitive charging current makes the receiving-end voltage higher than the sending-end voltage."],
    ["फेरांटी प्रभाव का अर्थ है:", ["प्राप्ति सिरे पर वोल्टेज गिरना", "भेजने के सिरे पर आवृत्ति बढ़ना", "चालकों का गर्म होना", "हल्के भार वाली लंबी लाइन में प्राप्ति सिरे का वोल्टेज भेजने के सिरे से अधिक होना"], "लंबी, हल्के भार या खुली लाइन में धारिता आवेशन धारा के कारण प्राप्ति सिरे का वोल्टेज भेजने के सिरे से अधिक हो जाता है।"]),
  q(0, "electrical-engineering", "power-systems", "M", 0,
    ["The material commonly used for the conductors of overhead transmission lines is:", ["ACSR (aluminium conductor steel reinforced)", "Pure copper only", "Lead", "Tungsten"], "ACSR combines the light weight and conductivity of aluminium with the strength of a steel core."],
    ["ओवरहेड पारेषण लाइनों के चालकों में सामान्यतः प्रयुक्त पदार्थ है:", ["ACSR (इस्पात-प्रबलित एल्युमिनियम चालक)", "केवल शुद्ध तांबा", "सीसा", "टंगस्टन"], "ACSR में एल्युमिनियम की हल्कापन-चालकता और इस्पात क्रोड की मजबूती दोनों मिलती हैं।"]),
  q(0, "electrical-engineering", "power-systems", "E", 2,
    ["The usual generation voltage of a large power station alternator is of the order of:", ["230 V", "415 V", "11 kV", "400 kV"], "Large alternators generate at about 11 kV to 33 kV, which is then stepped up for transmission."],
    ["बड़े विद्युत संयंत्र के अल्टरनेटर का सामान्य उत्पादन वोल्टेज किस कोटि का होता है?", ["230 V", "415 V", "11 kV", "400 kV"], "बड़े अल्टरनेटर लगभग 11 kV से 33 kV पर विद्युत उत्पन्न करते हैं, जिसे पारेषण के लिए बढ़ाया जाता है।"]),

  // ───────── Section 1: Electrical Machines ─────────
  q(1, "electrical-engineering", "machines", "M", 1,
    ["The efficiency of a transformer is maximum when:", ["Copper loss is zero", "Copper loss equals iron loss", "Iron loss is zero", "Load is zero"], "Maximum efficiency occurs when variable (copper) loss equals constant (iron) loss."],
    ["ट्रांसफार्मर की दक्षता अधिकतम कब होती है?", ["ताम्र हानि शून्य हो", "ताम्र हानि लौह हानि के बराबर हो", "लौह हानि शून्य हो", "भार शून्य हो"], "अधिकतम दक्षता तब होती है जब परिवर्ती (ताम्र) हानि स्थिर (लौह) हानि के बराबर हो।"]),
  q(1, "electrical-engineering", "machines", "M", 3,
    ["The slip of an induction motor at standstill is:", ["0", "0.5", "0.05", "1"], "Slip s = (Ns − N) / Ns; at standstill N = 0, so s = 1 (100%)."],
    ["विराम अवस्था में इंडक्शन मोटर की स्लिप कितनी होती है?", ["0", "0.5", "0.05", "1"], "स्लिप s = (Ns − N) / Ns; विराम में N = 0, इसलिए s = 1 (100%)।"]),
  q(1, "electrical-engineering", "machines", "M", 2,
    ["A DC series motor is generally used where we need:", ["Constant speed", "Zero starting torque", "High starting torque such as in traction", "Variable frequency"], "A DC series motor gives very high starting torque, which suits electric traction, cranes and hoists."],
    ["DC श्रेणी मोटर सामान्यतः कहाँ प्रयुक्त होती है?", ["नियत गति के लिए", "शून्य प्रारंभिक बल-आघूर्ण के लिए", "उच्च प्रारंभिक बल-आघूर्ण जैसे कर्षण में", "परिवर्ती आवृत्ति के लिए"], "DC श्रेणी मोटर का प्रारंभिक बल-आघूर्ण बहुत अधिक होता है, इसलिए यह कर्षण, क्रेन और होइस्ट में काम आती है।"]),

  // ───────── Section 2: Control & Electronics ─────────
  q(2, "electrical-engineering", "circuits", "E", 0,
    ["A diode allows current to flow:", ["In one direction only", "In both directions", "Only in AC circuits", "Only when open"], "An ideal diode conducts in forward bias and blocks in reverse bias, so it is a one-way device."],
    ["डायोड धारा को प्रवाहित होने देता है:", ["केवल एक दिशा में", "दोनों दिशाओं में", "केवल AC परिपथों में", "केवल खुली अवस्था में"], "आदर्श डायोड अग्र-बायस में चालन करता है और पश्च-बायस में रोकता है, इसलिए यह एकदिशीय युक्ति है।"]),
  q(2, "electrical-engineering", "circuits", "M", 1,
    ["A full-wave bridge rectifier uses ____ diodes.", ["2", "4", "6", "8"], "A single-phase bridge rectifier uses four diodes."],
    ["पूर्ण-तरंग सेतु दिष्टकारी में ____ डायोड लगते हैं।", ["2", "4", "6", "8"], "एकल-कला सेतु दिष्टकारी में चार डायोड लगते हैं।"]),
  q(2, "electrical-engineering", "circuits", "M", 3,
    ["The power factor of a purely resistive AC circuit is:", ["0", "0.5", "Zero lagging", "1"], "In a purely resistive circuit the voltage and current are in phase, so cos φ = 1."],
    ["विशुद्ध प्रतिरोधी AC परिपथ का शक्ति गुणांक होता है:", ["0", "0.5", "शून्य पश्चगामी", "1"], "विशुद्ध प्रतिरोधी परिपथ में वोल्टेज और धारा समान कला में होते हैं, इसलिए cos φ = 1।"]),

  // ───────── Section 3: Circuits & Measurements ─────────
  q(3, "electrical-engineering", "measurements-safety", "M", 2,
    ["The instrument used to measure insulation resistance is a:", ["Wattmeter", "Ammeter", "Megger", "Tachometer"], "A megger (insulation resistance tester) measures very high resistances such as cable and winding insulation."],
    ["इन्सुलेशन प्रतिरोध मापने के लिए प्रयुक्त यंत्र है:", ["वाटमीटर", "एमीटर", "मेगर", "टैकोमीटर"], "मेगर (इन्सुलेशन प्रतिरोध परीक्षक) केबल और वाइंडिंग के इन्सुलेशन जैसे बहुत उच्च प्रतिरोध मापता है।"]),
  q(3, "electrical-engineering", "circuits", "M", 0,
    ["The RMS value of a sinusoidal AC with peak value 100 V is approximately:", ["70.7 V", "100 V", "141 V", "63.6 V"], "Vrms = Vpeak / √2 = 100 / 1.414 ≈ 70.7 V."],
    ["शिखर मान 100 V वाली ज्यावक्रीय AC का RMS मान लगभग कितना होता है?", ["70.7 V", "100 V", "141 V", "63.6 V"], "Vrms = Vशिखर / √2 = 100 / 1.414 ≈ 70.7 V।"]),
  q(3, "electrical-engineering", "circuits", "E", 3,
    ["The unit of electrical power is:", ["Joule", "Coulomb", "Ampere", "Watt"], "Power is measured in watts; 1 W = 1 joule per second."],
    ["विद्युत शक्ति का मात्रक है:", ["जूल", "कूलॉम", "ऐम्पियर", "वाट"], "शक्ति वाट में मापी जाती है; 1 वाट = 1 जूल प्रति सेकंड।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "economy", "M", 1,
    ["The Himachal Pradesh State Electricity Board Limited (HPSEBL) has its headquarters at:", ["Mandi", "Shimla", "Hamirpur", "Solan"], "HPSEBL (Vidyut Bhawan) is headquartered at Shimla."],
    ["हिमाचल प्रदेश राज्य विद्युत बोर्ड लिमिटेड (HPSEBL) का मुख्यालय कहाँ है?", ["मंडी", "शिमला", "हमीरपुर", "सोलन"], "HPSEBL (विद्युत भवन) का मुख्यालय शिमला में है।"]),
  q(4, "hp-gk", "rivers-lakes", "M", 0,
    ["The Parbati river, on which hydro projects are built, is a tributary of the:", ["Beas", "Sutlej", "Ravi", "Yamuna"], "The Parbati river rises in the Kullu Himalaya and joins the Beas at Bhuntar."],
    ["जलविद्युत परियोजनाओं वाली पार्वती नदी किसकी सहायक नदी है?", ["ब्यास", "सतलुज", "रावी", "यमुना"], "पार्वती नदी कुल्लू हिमालय से निकलकर भुंतर में ब्यास से मिलती है।"]),
];
