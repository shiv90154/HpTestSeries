// HPPSC Food Safety Officer Free Mock 1 — 15 questions (Food Safety Law & Standards 5, Food Science & Chemistry 5, Food Microbiology & Nutrition 3, General Awareness 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const foodSafetyOfficerMock1: PatwariQuestion[] = [
  // ───────── Section 0: Food Safety Law & Standards ─────────
  q(0, "food-safety", "food-law", "E", 2,
    ["The Food Safety and Standards Act was enacted in:", ["1954", "1986", "2006", "2013"], "The Food Safety and Standards Act was passed in 2006 and consolidated earlier food laws such as the Prevention of Food Adulteration Act, 1954."],
    ["खाद्य सुरक्षा एवं मानक अधिनियम कब पारित हुआ?", ["1954", "1986", "2006", "2013"], "खाद्य सुरक्षा एवं मानक अधिनियम 2006 में पारित हुआ और इसने खाद्य अपमिश्रण निवारण अधिनियम, 1954 जैसे पूर्व कानूनों को समेकित किया।"]),
  q(0, "food-safety", "food-law", "M", 0,
    ["The FSSAI works under the administrative control of the Ministry of:", ["Health and Family Welfare", "Agriculture", "Commerce and Industry", "Consumer Affairs"], "The Food Safety and Standards Authority of India (FSSAI) is under the Ministry of Health and Family Welfare."],
    ["FSSAI किस मंत्रालय के प्रशासनिक नियंत्रण में कार्य करता है?", ["स्वास्थ्य एवं परिवार कल्याण", "कृषि", "वाणिज्य एवं उद्योग", "उपभोक्ता मामले"], "भारतीय खाद्य सुरक्षा एवं मानक प्राधिकरण (FSSAI) स्वास्थ्य एवं परिवार कल्याण मंत्रालय के अधीन है।"]),
  q(0, "food-safety", "food-law", "M", 3,
    ["As per the Act, a food sample taken by a Food Safety Officer for analysis is divided into:", ["Two parts", "Three parts", "Five parts", "Four parts"], "The sample is divided into four parts, one sent to the Food Analyst and others kept for the Designated Officer and further analysis."],
    ["अधिनियम के अनुसार खाद्य सुरक्षा अधिकारी द्वारा विश्लेषण हेतु लिया गया नमूना कितने भागों में बाँटा जाता है?", ["दो भाग", "तीन भाग", "पाँच भाग", "चार भाग"], "नमूने को चार भागों में बाँटा जाता है; एक खाद्य विश्लेषक को भेजा जाता है और शेष नामित अधिकारी तथा आगे के विश्लेषण के लिए रखे जाते हैं।"]),
  q(0, "food-safety", "food-law", "M", 1,
    ["A person who intends to start any food business in India must obtain:", ["Only a trade licence", "FSSAI licence or registration", "A passport", "Only an Agmark certificate"], "Every food business operator needs an FSSAI licence or registration depending on turnover and activity."],
    ["भारत में कोई भी खाद्य व्यवसाय शुरू करने के इच्छुक व्यक्ति को क्या प्राप्त करना आवश्यक है?", ["केवल व्यापार लाइसेंस", "FSSAI लाइसेंस या पंजीकरण", "पासपोर्ट", "केवल एगमार्क प्रमाणपत्र"], "प्रत्येक खाद्य व्यवसायी को कारोबार और गतिविधि के अनुसार FSSAI लाइसेंस या पंजीकरण लेना होता है।"]),
  q(0, "food-safety", "food-law", "E", 2,
    ["The 'Agmark' certification mark in India is mainly for:", ["Electrical goods", "Textiles", "Agricultural products", "Pharmaceuticals"], "Agmark certifies the quality grade of agricultural commodities such as ghee, honey, pulses and spices."],
    ["भारत में 'एगमार्क' प्रमाणन चिह्न मुख्यतः किसके लिए है?", ["विद्युत सामान", "वस्त्र", "कृषि उत्पाद", "औषधियाँ"], "एगमार्क घी, शहद, दालों और मसालों जैसे कृषि उत्पादों की गुणवत्ता श्रेणी प्रमाणित करता है।"]),

  // ───────── Section 1: Food Science & Chemistry ─────────
  q(1, "food-safety", "food-science", "E", 1,
    ["Which reagent is used for the simple test of starch?", ["Benedict's solution", "Iodine solution", "Fehling's solution", "Litmus"], "Iodine gives a blue-black colour with starch."],
    ["स्टार्च की सरल जाँच के लिए किस अभिकर्मक का उपयोग किया जाता है?", ["बेनेडिक्ट विलयन", "आयोडीन विलयन", "फेलिंग विलयन", "लिटमस"], "आयोडीन स्टार्च के साथ नीला-काला रंग देता है।"]),
  q(1, "food-safety", "food-science", "M", 3,
    ["Heating milk to about 72°C for 15 seconds followed by rapid cooling is called:", ["Sterilisation", "Homogenisation", "Boiling", "HTST pasteurisation"], "High-Temperature Short-Time (HTST) pasteurisation heats milk at 72°C for 15 seconds to destroy pathogens."],
    ["दूध को लगभग 72°C पर 15 सेकंड गर्म करके तेज़ी से ठंडा करने की प्रक्रिया कहलाती है:", ["निर्जीवाणुकरण", "समांगीकरण", "उबालना", "HTST पास्चुरीकरण"], "उच्च ताप-अल्प समय (HTST) पास्चुरीकरण में दूध को 72°C पर 15 सेकंड गर्म करके रोगाणु नष्ट किए जाते हैं।"]),
  q(1, "food-safety", "food-science", "M", 0,
    ["The development of an unpleasant smell and taste in fats and oils on storage is called:", ["Rancidity", "Fermentation", "Gelatinisation", "Caramelisation"], "Rancidity is the oxidative or hydrolytic spoilage of fats and oils."],
    ["भंडारण के दौरान वसा और तेलों में अप्रिय गंध और स्वाद आ जाना कहलाता है:", ["विकृतगंधिता (रैन्सिडिटी)", "किण्वन", "जिलेटिनीकरण", "कैरेमलीकरण"], "रैन्सिडिटी वसा और तेलों का ऑक्सीकरण या जल-अपघटन द्वारा खराब होना है।"]),
  q(1, "food-safety", "food-science", "M", 2,
    ["The browning of bread crust and roasted foods due to reaction between amino acids and reducing sugars is called the:", ["Enzymatic browning", "Caramelisation", "Maillard reaction", "Rancidity"], "The Maillard reaction between amino acids and reducing sugars at high heat gives browning and flavour."],
    ["अमीनो अम्लों और अपचायक शर्कराओं की अभिक्रिया से ब्रेड की पपड़ी और भुने भोजन का भूरा होना कहलाता है:", ["एंज़ाइमी भूरापन", "कैरेमलीकरण", "मेलार्ड अभिक्रिया", "रैन्सिडिटी"], "उच्च ताप पर अमीनो अम्लों और अपचायक शर्कराओं की मेलार्ड अभिक्रिया से भूरा रंग और स्वाद बनता है।"]),
  q(1, "food-safety", "food-science", "E", 1,
    ["The sour taste of lemon is mainly due to:", ["Acetic acid", "Citric acid", "Lactic acid", "Tartaric acid"], "Lemon juice is rich in citric acid."],
    ["नींबू का खट्टा स्वाद मुख्यतः किस कारण होता है?", ["एसिटिक अम्ल", "सिट्रिक अम्ल", "लैक्टिक अम्ल", "टार्टरिक अम्ल"], "नींबू के रस में सिट्रिक अम्ल प्रचुर मात्रा में होता है।"]),

  // ───────── Section 2: Food Microbiology & Nutrition ─────────
  q(2, "food-safety", "food-microbiology", "M", 2,
    ["Aflatoxin, a carcinogenic contaminant of groundnuts and maize, is produced by:", ["Salmonella", "Clostridium botulinum", "Aspergillus flavus", "Yeast"], "Aflatoxins are toxic metabolites of the mould Aspergillus flavus (and A. parasiticus) growing on stored grains and nuts."],
    ["मूँगफली और मक्का को दूषित करने वाला कैंसरकारी विष एफ्लाटॉक्सिन किसके द्वारा उत्पन्न होता है?", ["साल्मोनेला", "क्लॉस्ट्रिडियम बोटुलिनम", "एस्परजिलस फ्लेवस", "यीस्ट"], "एफ्लाटॉक्सिन संग्रहित अनाज और मेवों पर उगने वाली फफूँद एस्परजिलस फ्लेवस (तथा ए. पैरासिटिकस) के विषैले उत्पाद हैं।"]),
  q(2, "food-safety", "food-microbiology", "M", 1,
    ["Botulism is food poisoning caused by a toxin of:", ["Salmonella typhi", "Clostridium botulinum", "Vibrio cholerae", "Escherichia coli"], "Botulism results from a potent neurotoxin produced by Clostridium botulinum, often in improperly canned foods."],
    ["बोटुलिज़्म किसके विष से होने वाला खाद्य विषाक्तन है?", ["साल्मोनेला टाइफी", "क्लॉस्ट्रिडियम बोटुलिनम", "विब्रियो कॉलेरी", "ई. कोलाई"], "बोटुलिज़्म क्लॉस्ट्रिडियम बोटुलिनम द्वारा उत्पन्न शक्तिशाली तंत्रिका-विष से होता है, प्रायः ठीक से डिब्बाबंद न किए भोजन में।"]),
  q(2, "food-safety", "food-microbiology", "E", 3,
    ["Iodine deficiency in the diet causes:", ["Anaemia", "Rickets", "Scurvy", "Goitre"], "Iodine is needed for thyroid hormones; its deficiency causes goitre (and cretinism in infants)."],
    ["आहार में आयोडीन की कमी से कौन-सा रोग होता है?", ["एनीमिया", "रिकेट्स", "स्कर्वी", "घेंघा"], "थायरॉइड हार्मोन के लिए आयोडीन आवश्यक है; इसकी कमी से घेंघा (और शिशुओं में क्रेटिनिज़्म) होता है।"]),

  // ───────── Section 3: General Awareness ─────────
  q(3, "general-studies", "general-science", "M", 0,
    ["World Food Safety Day is observed every year on:", ["7 June", "16 October", "1 December", "22 March"], "The UN observes World Food Safety Day on 7 June; World Food Day is on 16 October."],
    ["विश्व खाद्य सुरक्षा दिवस प्रतिवर्ष कब मनाया जाता है?", ["7 जून", "16 अक्तूबर", "1 दिसंबर", "22 मार्च"], "संयुक्त राष्ट्र 7 जून को विश्व खाद्य सुरक्षा दिवस मनाता है; विश्व खाद्य दिवस 16 अक्तूबर को होता है।"]),
  q(3, "hp-gk", "economy", "E", 1,
    ["Which district is the largest producer of apples in Himachal Pradesh?", ["Kangra", "Shimla", "Una", "Bilaspur"], "Shimla district is the largest apple-producing district of Himachal Pradesh."],
    ["हिमाचल प्रदेश में सेब का सबसे बड़ा उत्पादक जिला कौन-सा है?", ["कांगड़ा", "शिमला", "ऊना", "बिलासपुर"], "शिमला जिला हिमाचल प्रदेश का सबसे बड़ा सेब उत्पादक जिला है।"]),
];
