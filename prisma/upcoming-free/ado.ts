// HPPSC Agriculture Development Officer Free Mock 1 — 15 questions (Agronomy & Soil 6, Horticulture & Plant Protection 5, Extension & Economics 4).

import { q, type PatwariQuestion } from "../patwari/types";

export const adoMock1: PatwariQuestion[] = [
  // ───────── Section 0: Agronomy & Soil Science ─────────
  q(0, "agriculture", "agronomy", "E", 2,
    ["Which of the following is a rabi crop?", ["Paddy", "Maize", "Wheat", "Cotton"], "Wheat is sown in October–December and harvested in March–April, so it is a rabi crop; paddy, maize and cotton are kharif crops."],
    ["निम्नलिखित में से कौन-सी रबी की फसल है?", ["धान", "मक्का", "गेहूँ", "कपास"], "गेहूँ अक्तूबर–दिसंबर में बोया जाता है और मार्च–अप्रैल में कटता है, इसलिए यह रबी फसल है; धान, मक्का और कपास खरीफ फसलें हैं।"]),
  q(0, "agriculture", "soil-science", "M", 1,
    ["Which bacterium lives symbiotically in the root nodules of leguminous plants and fixes nitrogen?", ["Azotobacter", "Rhizobium", "Nitrosomonas", "Clostridium"], "Rhizobium forms root nodules on legumes and fixes atmospheric nitrogen symbiotically; Azotobacter and Clostridium are free-living."],
    ["दलहनी पौधों की जड़ों की ग्रंथियों में सहजीवी रूप से रहकर नाइट्रोजन स्थिरीकरण करने वाला जीवाणु कौन-सा है?", ["एज़ोटोबैक्टर", "राइज़ोबियम", "नाइट्रोसोमोनास", "क्लॉस्ट्रिडियम"], "राइज़ोबियम दलहनी पौधों की जड़ों में ग्रंथियाँ बनाकर सहजीवी रूप से वायुमंडलीय नाइट्रोजन स्थिर करता है; एज़ोटोबैक्टर और क्लॉस्ट्रिडियम मुक्तजीवी हैं।"]),
  q(0, "agriculture", "soil-science", "E", 0,
    ["The pH value of a neutral soil is:", ["7", "5", "9", "11"], "A pH of 7 is neutral; below 7 is acidic and above 7 is alkaline."],
    ["उदासीन (neutral) मृदा का pH मान कितना होता है?", ["7", "5", "9", "11"], "pH 7 उदासीन होता है; 7 से कम अम्लीय और 7 से अधिक क्षारीय मृदा दर्शाता है।"]),
  q(0, "agriculture", "soil-science", "M", 3,
    ["Which of the following is a macronutrient required by plants?", ["Zinc", "Iron", "Boron", "Potassium"], "Nitrogen, phosphorus, potassium, calcium, magnesium and sulphur are macronutrients; zinc, iron and boron are micronutrients."],
    ["निम्नलिखित में से कौन-सा पौधों के लिए आवश्यक macronutrient (मुख्य पोषक तत्व) है?", ["जिंक", "आयरन", "बोरॉन", "पोटैशियम"], "नाइट्रोजन, फास्फोरस, पोटैशियम, कैल्शियम, मैग्नीशियम और सल्फर मुख्य पोषक तत्व हैं; जिंक, आयरन और बोरॉन सूक्ष्म पोषक तत्व हैं।"]),
  q(0, "agriculture", "agronomy", "E", 1,
    ["The loss of water in the form of vapour from the aerial parts of a plant is called:", ["Guttation", "Transpiration", "Evaporation", "Absorption"], "Transpiration is the loss of water vapour mainly through the stomata of leaves."],
    ["पौधे के वायवीय भागों से जलवाष्प के रूप में जल की हानि को क्या कहते हैं?", ["बिंदुस्राव", "वाष्पोत्सर्जन", "वाष्पीकरण", "अवशोषण"], "वाष्पोत्सर्जन में जल मुख्यतः पत्तियों के रंध्रों से वाष्प के रूप में निकलता है।"]),
  q(0, "agriculture", "agronomy", "M", 2,
    ["Which of the following is a legume (pulse) crop?", ["Sorghum", "Sugarcane", "Chickpea", "Mustard"], "Chickpea (gram) is a leguminous pulse crop that fixes nitrogen; sorghum is a cereal, sugarcane a cash crop and mustard an oilseed."],
    ["निम्नलिखित में से कौन-सी दलहनी फसल है?", ["ज्वार", "गन्ना", "चना", "सरसों"], "चना दलहनी फसल है जो नाइट्रोजन स्थिर करती है; ज्वार अनाज, गन्ना नकदी फसल और सरसों तिलहन है।"]),

  // ───────── Section 1: Horticulture & Plant Protection ─────────
  q(1, "agriculture", "horticulture", "M", 1,
    ["The apple belongs to which plant family?", ["Solanaceae", "Rosaceae", "Rutaceae", "Cucurbitaceae"], "Apple (Malus domestica) belongs to the rose family, Rosaceae, along with pear, peach, plum and cherry."],
    ["सेब किस पादप कुल से संबंधित है?", ["सोलेनेसी", "रोज़ेसी", "रूटेसी", "कुकुरबिटेसी"], "सेब (Malus domestica) गुलाब कुल रोज़ेसी का सदस्य है, जिसमें नाशपाती, आड़ू, आलूबुखारा और चेरी भी आते हैं।"]),
  q(1, "agriculture", "horticulture", "M", 0,
    ["The Kufri series of improved varieties was developed for which crop at CPRI, Shimla?", ["Potato", "Tomato", "Apple", "Pea"], "The Central Potato Research Institute at Shimla developed the Kufri varieties of potato, such as Kufri Jyoti and Kufri Chipsona."],
    ["CPRI, शिमला में विकसित 'कुफरी' श्रृंखला की उन्नत किस्में किस फसल की हैं?", ["आलू", "टमाटर", "सेब", "मटर"], "शिमला के केंद्रीय आलू अनुसंधान संस्थान ने कुफरी ज्योति, कुफरी चिप्सोना आदि आलू की किस्में विकसित की हैं।"]),
  q(1, "agriculture", "plant-protection", "M", 3,
    ["Late blight of potato is caused by:", ["Alternaria solani", "Fusarium oxysporum", "Xanthomonas", "Phytophthora infestans"], "Late blight, responsible for the Irish potato famine, is caused by the oomycete Phytophthora infestans; Alternaria solani causes early blight."],
    ["आलू का पछेती झुलसा (late blight) रोग किसके कारण होता है?", ["ऑल्टरनेरिया सोलेनाई", "फ्यूज़ेरियम ऑक्सीस्पोरम", "ज़ैंथोमोनास", "फाइटोफ्थोरा इन्फेस्टैंस"], "पछेती झुलसा रोग, जो आयरिश आलू अकाल का कारण था, फाइटोफ्थोरा इन्फेस्टैंस से होता है; ऑल्टरनेरिया सोलेनाई अगेती झुलसा करता है।"]),
  q(1, "agriculture", "plant-protection", "M", 2,
    ["Apple scab is caused by:", ["Podosphaera leucotricha", "Erwinia amylovora", "Venturia inaequalis", "Phytophthora cactorum"], "Apple scab, a major disease in the Himachal apple belt, is caused by the fungus Venturia inaequalis."],
    ["सेब का स्कैब रोग किसके कारण होता है?", ["पोडोस्फेरा ल्यूकोट्राइका", "इर्विनिया एमाइलोवोरा", "वेंचुरिया इनेक्वालिस", "फाइटोफ्थोरा कैक्टोरम"], "सेब का स्कैब, हिमाचल के सेब क्षेत्रों का प्रमुख रोग, कवक वेंचुरिया इनेक्वालिस से होता है।"]),
  q(1, "agriculture", "plant-protection", "E", 1,
    ["Bordeaux mixture is a combination of:", ["Sulphur and lime", "Copper sulphate and lime", "Zinc sulphate and lime", "Copper sulphate and sulphur"], "Bordeaux mixture is a fungicide prepared from copper sulphate (blue vitriol) and slaked lime."],
    ["बोर्डो मिश्रण किनका मिश्रण है?", ["गंधक और चूना", "कॉपर सल्फेट और चूना", "जिंक सल्फेट और चूना", "कॉपर सल्फेट और गंधक"], "बोर्डो मिश्रण कॉपर सल्फेट (नीला थोथा) और बुझे चूने से बना कवकनाशी है।"]),

  // ───────── Section 2: Extension & Agricultural Economics ─────────
  q(2, "agriculture", "extension-economics", "E", 0,
    ["MSP in agriculture stands for:", ["Minimum Support Price", "Maximum Selling Price", "Market Stabilisation Plan", "Minimum Subsidy Payment"], "The Minimum Support Price is the price at which the government is ready to purchase specified crops from farmers."],
    ["कृषि में MSP का पूर्ण रूप क्या है?", ["न्यूनतम समर्थन मूल्य", "अधिकतम विक्रय मूल्य", "बाज़ार स्थिरीकरण योजना", "न्यूनतम सब्सिडी भुगतान"], "न्यूनतम समर्थन मूल्य वह मूल्य है जिस पर सरकार निर्दिष्ट फसलें किसानों से खरीदने को तैयार रहती है।"]),
  q(2, "agriculture", "extension-economics", "M", 3,
    ["Who is known as the 'Father of the Green Revolution in India'?", ["Verghese Kurien", "Norman Borlaug", "Dr. A. P. J. Abdul Kalam", "Dr. M. S. Swaminathan"], "Dr. M. S. Swaminathan led the introduction of high-yielding wheat and rice varieties in India; Norman Borlaug is the father of the global Green Revolution."],
    ["'भारत की हरित क्रांति के जनक' के रूप में किसे जाना जाता है?", ["वर्गीज़ कुरियन", "नॉर्मन बोरलॉग", "डॉ. ए. पी. जे. अब्दुल कलाम", "डॉ. एम. एस. स्वामीनाथन"], "डॉ. एम. एस. स्वामीनाथन ने भारत में उच्च उपज वाली गेहूँ-धान किस्में लाने का नेतृत्व किया; नॉर्मन बोरलॉग वैश्विक हरित क्रांति के जनक हैं।"]),
  q(2, "agriculture", "extension-economics", "M", 1,
    ["Krishi Vigyan Kendras (KVKs) are mainly meant for:", ["Marketing of farm produce", "On-farm testing, training and demonstration at district level", "Issuing crop loans", "Fixing support prices"], "KVKs, run under ICAR, carry out on-farm testing, frontline demonstrations and farmer training in each district."],
    ["कृषि विज्ञान केंद्र (KVK) मुख्यतः किसलिए स्थापित किए गए हैं?", ["कृषि उपज का विपणन", "जिला स्तर पर प्रक्षेत्र परीक्षण, प्रशिक्षण और प्रदर्शन", "फसल ऋण देना", "समर्थन मूल्य तय करना"], "ICAR के अधीन KVK प्रत्येक जिले में प्रक्षेत्र परीक्षण, अग्रिम पंक्ति प्रदर्शन और किसान प्रशिक्षण करते हैं।"]),
  q(2, "agriculture", "extension-economics", "M", 2,
    ["The Kisan Credit Card (KCC) scheme was introduced in:", ["1985", "1991", "1998", "2008"], "The Kisan Credit Card scheme was introduced in 1998–99 on NABARD's recommendation to give farmers timely short-term credit."],
    ["किसान क्रेडिट कार्ड (KCC) योजना किस वर्ष शुरू की गई?", ["1985", "1991", "1998", "2008"], "नाबार्ड की सिफारिश पर किसानों को समय पर अल्पकालिक ऋण देने के लिए किसान क्रेडिट कार्ड योजना 1998–99 में शुरू हुई।"]),
];
