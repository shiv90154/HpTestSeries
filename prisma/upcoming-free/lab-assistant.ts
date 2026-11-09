// HPRCA Lab Assistant Free Mock 1 — 15 questions (Physics 4, Chemistry 4, Biology 3, Mathematics 2, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const labAssistantMock1: PatwariQuestion[] = [
  // ───────── Section 0: Physics ─────────
  q(0, "physics", "mechanics", "E", 1,
    ["The SI unit of force is:", ["Joule", "Newton", "Pascal", "Watt"], "Force is measured in newton (N); one newton is the force that gives a mass of 1 kg an acceleration of 1 m/s²."],
    ["बल का SI मात्रक क्या है?", ["जूल", "न्यूटन", "पास्कल", "वाट"], "बल का मात्रक न्यूटन (N) है; एक न्यूटन वह बल है जो 1 किग्रा द्रव्यमान में 1 मी/से² त्वरण उत्पन्न करता है।"]),
  q(0, "physics", "electricity-magnetism", "E", 3,
    ["An instrument used to measure electric current in a circuit is called a:", ["Voltmeter", "Galvanometer only for voltage", "Barometer", "Ammeter"], "An ammeter is connected in series in a circuit to measure current, whereas a voltmeter is connected in parallel to measure potential difference."],
    ["परिपथ में विद्युत धारा मापने वाला उपकरण क्या कहलाता है?", ["वोल्टमीटर", "केवल वोल्टता के लिए गैल्वेनोमीटर", "बैरोमीटर", "अमीटर"], "अमीटर को परिपथ में श्रेणी क्रम में जोड़कर धारा मापी जाती है, जबकि वोल्टमीटर को समांतर क्रम में जोड़कर विभवांतर मापा जाता है।"]),
  q(0, "physics", "optics-waves", "M", 0,
    ["The SI unit of frequency is:", ["Hertz", "Decibel", "Tesla", "Henry"], "Frequency, the number of cycles per second, is measured in hertz (Hz)."],
    ["आवृत्ति का SI मात्रक क्या है?", ["हर्ट्ज़", "डेसीबल", "टेस्ला", "हेनरी"], "आवृत्ति, यानी प्रति सेकंड चक्रों की संख्या, का मात्रक हर्ट्ज़ (Hz) है।"]),
  q(0, "physics", "heat-thermodynamics", "M", 2,
    ["At what temperature on the Celsius scale does pure water boil at normal atmospheric pressure?", ["90 °C", "95 °C", "100 °C", "110 °C"], "At standard pressure of one atmosphere pure water boils at 100 °C, which is 373 K."],
    ["सामान्य वायुमंडलीय दाब पर शुद्ध जल सेल्सियस पैमाने पर किस ताप पर उबलता है?", ["90 °C", "95 °C", "100 °C", "110 °C"], "एक वायुमंडलीय दाब पर शुद्ध जल 100 °C (373 K) पर उबलता है।"]),

  // ───────── Section 1: Chemistry ─────────
  q(1, "chemistry", "atomic-structure", "E", 2,
    ["The atomic number of an element is equal to the number of its:", ["Neutrons", "Neutrons plus protons", "Protons", "Nucleons"], "The atomic number is the number of protons in the nucleus; in a neutral atom it equals the number of electrons."],
    ["किसी तत्व का परमाणु क्रमांक उसके किसके बराबर होता है?", ["न्यूट्रॉनों की संख्या", "न्यूट्रॉन और प्रोटॉन का योग", "प्रोटॉनों की संख्या", "न्यूक्लिऑनों की संख्या"], "परमाणु क्रमांक नाभिक में प्रोटॉनों की संख्या है; उदासीन परमाणु में यह इलेक्ट्रॉनों की संख्या के भी बराबर होता है।"]),
  q(1, "chemistry", "acids-bases-salts", "E", 1,
    ["Which of the following turns blue litmus paper red?", ["Soap solution", "Lemon juice", "Baking soda solution", "Lime water"], "Acids turn blue litmus red; lemon juice contains citric acid, while soap, baking soda and lime water are basic."],
    ["निम्नलिखित में से कौन नीले लिटमस पत्र को लाल कर देता है?", ["साबुन का घोल", "नींबू का रस", "खाने के सोडे का घोल", "चूने का पानी"], "अम्ल नीले लिटमस को लाल करते हैं; नींबू के रस में सिट्रिक अम्ल होता है, जबकि साबुन, खाने का सोडा और चूने का पानी क्षारीय हैं।"]),
  q(1, "chemistry", "chemical-bonding", "M", 3,
    ["Which type of bond is formed by the sharing of electron pairs between two atoms?", ["Ionic bond", "Metallic bond", "Hydrogen bond", "Covalent bond"], "A covalent bond forms when two atoms share one or more pairs of electrons, as in H₂O and CH₄; an ionic bond involves transfer of electrons."],
    ["दो परमाणुओं के बीच इलेक्ट्रॉन युग्मों की साझेदारी से कौन-सा बंध बनता है?", ["आयनिक बंध", "धात्विक बंध", "हाइड्रोजन बंध", "सहसंयोजक बंध"], "सहसंयोजक बंध में दो परमाणु एक या अधिक इलेक्ट्रॉन युग्म साझा करते हैं, जैसे H₂O और CH₄ में; आयनिक बंध में इलेक्ट्रॉनों का स्थानांतरण होता है।"]),
  q(1, "chemistry", "physical-chemistry", "M", 0,
    ["The process of conversion of a solid directly into vapour without passing through the liquid state is called:", ["Sublimation", "Condensation", "Fusion", "Deposition"], "Sublimation is the direct change from solid to gas, as seen with camphor, naphthalene and dry ice."],
    ["ठोस के द्रव अवस्था में आए बिना सीधे वाष्प में बदलने की प्रक्रिया को क्या कहते हैं?", ["ऊर्ध्वपातन", "संघनन", "गलन", "निक्षेपण"], "ऊर्ध्वपातन में ठोस सीधे गैस में बदलता है, जैसे कपूर, नेफ्थलीन और शुष्क बर्फ में।"]),

  // ───────── Section 2: Biology ─────────
  q(2, "biology", "cell-biology", "E", 1,
    ["Which cell organelle is called the 'powerhouse of the cell'?", ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], "Mitochondria release energy from food through cellular respiration and store it as ATP, so they are called the powerhouse of the cell."],
    ["कोशिका के किस कोशिकांग को 'कोशिका का ऊर्जा-गृह' कहा जाता है?", ["केंद्रक", "माइटोकॉन्ड्रिया", "राइबोसोम", "गॉल्जी काय"], "माइटोकॉन्ड्रिया कोशिकीय श्वसन द्वारा भोजन से ऊर्जा मुक्त करके ATP के रूप में संचित करते हैं, इसलिए इन्हें कोशिका का ऊर्जा-गृह कहते हैं।"]),
  q(2, "biology", "human-physiology", "E", 2,
    ["Which blood cells help in the clotting of blood?", ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"], "Platelets (thrombocytes) gather at a wound and trigger clotting to stop bleeding."],
    ["रक्त के थक्का जमने में कौन-सी रक्त कोशिकाएँ सहायता करती हैं?", ["लाल रक्त कोशिकाएँ", "श्वेत रक्त कोशिकाएँ", "प्लेटलेट्स", "प्लाज़्मा कोशिकाएँ"], "प्लेटलेट्स (थ्रोम्बोसाइट्स) घाव पर एकत्र होकर रक्त का थक्का बनाती हैं और रक्तस्राव रोकती हैं।"]),
  q(2, "biology", "plant-biology", "M", 0,
    ["The green pigment that helps plants prepare food by photosynthesis is:", ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"], "Chlorophyll absorbs mainly red and blue light and drives photosynthesis in the chloroplasts."],
    ["पौधों में प्रकाश-संश्लेषण द्वारा भोजन बनाने में सहायक हरा वर्णक कौन-सा है?", ["क्लोरोफिल", "कैरोटीन", "ज़ैंथोफिल", "एंथोसायनिन"], "क्लोरोफिल मुख्यतः लाल और नीले प्रकाश को अवशोषित करता है और हरितलवक में प्रकाश-संश्लेषण को संचालित करता है।"]),

  // ───────── Section 3: Mathematics ─────────
  q(3, "quant", "average", "E", 1,
    ["The average of 12, 18, 24 and 30 is:", ["20", "21", "22", "24"], "Sum = 12 + 18 + 24 + 30 = 84, and 84 ÷ 4 = 21."],
    ["12, 18, 24 और 30 का औसत कितना है?", ["20", "21", "22", "24"], "योग = 12 + 18 + 24 + 30 = 84, और 84 ÷ 4 = 21।"]),
  q(3, "quant", "ratio-proportion", "M", 3,
    ["Two numbers are in the ratio 3 : 5 and their sum is 160. What is the larger number?", ["60", "80", "90", "100"], "The sum of the ratio parts is 8, so one part is 160 ÷ 8 = 20 and the larger number is 5 × 20 = 100."],
    ["दो संख्याओं का अनुपात 3 : 5 है और उनका योग 160 है। बड़ी संख्या कौन-सी है?", ["60", "80", "90", "100"], "अनुपात के भागों का योग 8 है, अतः एक भाग = 160 ÷ 8 = 20 और बड़ी संख्या = 5 × 20 = 100।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "geography", "E", 0,
    ["Which town is the capital of Himachal Pradesh during summers?", ["Shimla", "Dharamshala", "Mandi", "Solan"], "Shimla is the capital of Himachal Pradesh and the state's summer and main capital; Dharamshala was declared the second (winter) capital in 2017."],
    ["ग्रीष्मकाल में हिमाचल प्रदेश की राजधानी कौन-सा शहर है?", ["शिमला", "धर्मशाला", "मंडी", "सोलन"], "शिमला हिमाचल प्रदेश की मुख्य राजधानी है और ग्रीष्मकालीन राजधानी भी; धर्मशाला को 2017 में दूसरी (शीतकालीन) राजधानी घोषित किया गया।"]),
  q(4, "hp-gk", "rivers-lakes", "M", 2,
    ["Gobind Sagar reservoir in Himachal Pradesh is formed by the Bhakra Dam on which river?", ["Beas", "Ravi", "Sutlej", "Yamuna"], "The Bhakra Dam, near Bilaspur, is built across the Sutlej and its reservoir is known as Gobind Sagar."],
    ["हिमाचल प्रदेश का गोबिंद सागर जलाशय किस नदी पर बने भाखड़ा बाँध से बना है?", ["ब्यास", "रावी", "सतलुज", "यमुना"], "बिलासपुर के पास भाखड़ा बाँध सतलुज नदी पर बना है और उसके जलाशय को गोबिंद सागर कहते हैं।"]),
];
