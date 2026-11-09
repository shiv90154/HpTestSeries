// HP Police Head Constable Free Mock 1 — 15 questions (Himachal GK 4, General Studies 3, Reasoning 3, Mathematics 2, English 2, Computer 1).

import { q, type PatwariQuestion } from "../patwari/types";

export const headConstableMock1: PatwariQuestion[] = [
  // ───────── Section 0: Himachal GK ─────────
  q(0, "hp-gk", "geography", "E", 1,
    ["The highest peak located within Himachal Pradesh is:", ["Kinner Kailash", "Reo Purgyil", "Shilla", "Hanuman Tibba"], "Reo Purgyil (about 6,816 m) in the Kinnaur district is the highest peak entirely within Himachal Pradesh."],
    ["हिमाचल प्रदेश के भीतर स्थित सबसे ऊँची चोटी कौन-सी है?", ["किन्नर कैलाश", "रियो पुर्गिल", "शिल्ला", "हनुमान टिब्बा"], "किन्नौर जिले की रियो पुर्गिल (लगभग 6,816 मी) हिमाचल प्रदेश के भीतर स्थित सबसे ऊँची चोटी है।"]),
  q(0, "hp-gk", "rivers-lakes", "E", 0,
    ["Renuka Lake, the largest natural lake of Himachal Pradesh, is in which district?", ["Sirmaur", "Mandi", "Kangra", "Kullu"], "Renuka Lake, named after Renuka Devi, is in Sirmaur district and hosts the Renuka fair every November."],
    ["हिमाचल प्रदेश की सबसे बड़ी प्राकृतिक झील रेणुका झील किस जिले में है?", ["सिरमौर", "मंडी", "कांगड़ा", "कुल्लू"], "रेणुका देवी के नाम पर बनी रेणुका झील सिरमौर जिले में है और यहाँ हर वर्ष नवंबर में रेणुका मेला लगता है।"]),
  q(0, "hp-gk", "economy", "M", 1,
    ["The Kangra valley is famous for the cultivation of which beverage crop?", ["Coffee", "Tea", "Cocoa", "Rubber"], "Kangra tea, grown around Palampur and Baijnath, is a well-known Himachal product and has a GI tag."],
    ["कांगड़ा घाटी किस पेय फसल की खेती के लिए प्रसिद्ध है?", ["कॉफी", "चाय", "कोको", "रबर"], "पालमपुर और बैजनाथ के आसपास उगाई जाने वाली कांगड़ा चाय हिमाचल का प्रसिद्ध उत्पाद है और इसे GI टैग प्राप्त है।"]),
  q(0, "hp-gk", "history", "M", 2,
    ["Which famous fort in Himachal Pradesh was ruled by the Katoch dynasty?", ["Kumarsain Fort", "Nalagarh Fort", "Kangra Fort", "Bahu Fort"], "Kangra Fort, one of the oldest forts in India, was the seat of the Katoch rulers of Kangra."],
    ["हिमाचल प्रदेश का कौन-सा प्रसिद्ध किला कटोच वंश के अधीन था?", ["कुमारसैन किला", "नालागढ़ किला", "कांगड़ा किला", "बाहू किला"], "भारत के प्राचीनतम किलों में से एक कांगड़ा किला कांगड़ा के कटोच शासकों की राजधानी था।"]),

  // ───────── Section 1: General Studies ─────────
  q(1, "general-studies", "indian-polity", "E", 2,
    ["Which of the following is the supreme law of India?", ["Indian Penal Code", "An Act of Parliament", "The Constitution", "Supreme Court judgments"], "The Constitution of India is the supreme law; every other law must conform to it."],
    ["निम्नलिखित में से भारत का सर्वोच्च कानून कौन-सा है?", ["भारतीय दंड संहिता", "संसद का कोई अधिनियम", "संविधान", "सर्वोच्च न्यायालय के निर्णय"], "भारत का संविधान सर्वोच्च विधि है; अन्य सभी कानूनों को इसके अनुरूप होना चाहिए।"]),
  q(1, "general-studies", "indian-polity", "M", 1,
    ["Under the Code of Criminal Procedure, a police officer can arrest a person without a warrant in which type of offence?", ["Non-cognizable offence", "Cognizable offence", "Civil dispute", "Compoundable civil wrong"], "In a cognizable offence the police may register an FIR, investigate and arrest without a warrant; in a non-cognizable case a magistrate's order is generally required."],
    ["दंड प्रक्रिया संहिता के अनुसार किस प्रकार के अपराध में पुलिस अधिकारी बिना वारंट के गिरफ्तारी कर सकता है?", ["असंज्ञेय अपराध", "संज्ञेय अपराध", "दीवानी विवाद", "शमनीय दीवानी अपकृत्य"], "संज्ञेय अपराध में पुलिस एफआईआर दर्ज कर जाँच कर सकती है और बिना वारंट गिरफ्तार कर सकती है; असंज्ञेय मामले में सामान्यतः मजिस्ट्रेट का आदेश आवश्यक है।"]),
  q(1, "general-studies", "indian-geography", "E", 3,
    ["Which is the longest river of India flowing entirely within the country?", ["Yamuna", "Brahmaputra", "Indus", "Ganga"], "The Ganga, about 2,525 km long, is the longest river that flows entirely in India; the Brahmaputra and Indus originate outside the country."],
    ["भारत में पूरी तरह देश के भीतर बहने वाली सबसे लंबी नदी कौन-सी है?", ["यमुना", "ब्रह्मपुत्र", "सिंधु", "गंगा"], "लगभग 2,525 किमी लंबी गंगा देश के भीतर बहने वाली सबसे लंबी नदी है; ब्रह्मपुत्र और सिंधु देश के बाहर से निकलती हैं।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "E", 2,
    ["Find the next number: 1, 4, 9, 16, 25, ?", ["30", "34", "36", "49"], "These are the squares of 1, 2, 3, 4 and 5, so the next is 6² = 36."],
    ["अगली संख्या ज्ञात कीजिए: 1, 4, 9, 16, 25, ?", ["30", "34", "36", "49"], "ये क्रमशः 1, 2, 3, 4, 5 के वर्ग हैं, इसलिए अगली संख्या 6² = 36 है।"]),
  q(2, "reasoning", "odd-one-out", "E", 1,
    ["Find the odd one out: Sword, Rifle, Pistol, Revolver", ["Rifle", "Sword", "Pistol", "Revolver"], "Rifle, pistol and revolver are firearms, while a sword is a bladed weapon."],
    ["बेमेल पद चुनिए: तलवार, राइफल, पिस्तौल, रिवॉल्वर", ["राइफल", "तलवार", "पिस्तौल", "रिवॉल्वर"], "राइफल, पिस्तौल और रिवॉल्वर आग्नेयास्त्र हैं, जबकि तलवार धारदार हथियार है।"]),
  q(2, "reasoning", "clock-calendar", "M", 0,
    ["What is the angle between the hour hand and the minute hand of a clock at 3:00?", ["90°", "60°", "120°", "45°"], "At 3:00 the hands are 3 hour-marks apart, and each mark is 30°, so the angle is 3 × 30° = 90°."],
    ["घड़ी में 3:00 बजे घंटे की सुई और मिनट की सुई के बीच कितना कोण होता है?", ["90°", "60°", "120°", "45°"], "3:00 बजे सुइयों के बीच 3 घंटे के निशान होते हैं और प्रत्येक निशान 30° का है, इसलिए कोण 3 × 30° = 90° है।"]),

  // ───────── Section 3: Mathematics ─────────
  q(3, "quant", "speed-distance", "E", 1,
    ["A police vehicle travels at 60 km/h. How far does it go in 45 minutes?", ["30 km", "45 km", "50 km", "60 km"], "45 minutes is 0.75 hour, so distance = 60 × 0.75 = 45 km."],
    ["एक पुलिस वाहन 60 किमी/घंटा की चाल से चल रहा है। वह 45 मिनट में कितनी दूरी तय करेगा?", ["30 किमी", "45 किमी", "50 किमी", "60 किमी"], "45 मिनट = 0.75 घंटा, इसलिए दूरी = 60 × 0.75 = 45 किमी।"]),
  q(3, "quant", "percentage", "M", 3,
    ["A recruitment drive received 8,000 applications and 35% were rejected. How many applications were accepted?", ["2,800", "3,200", "4,800", "5,200"], "Accepted = 65% of 8,000 = 0.65 × 8,000 = 5,200."],
    ["एक भर्ती में 8,000 आवेदन आए और 35% निरस्त कर दिए गए। कितने आवेदन स्वीकार हुए?", ["2,800", "3,200", "4,800", "5,200"], "स्वीकृत = 8,000 का 65% = 0.65 × 8,000 = 5,200।"]),

  // ───────── Section 4: English ─────────
  q(4, "english", "grammar", "E", 0,
    ["Choose the correct form: The inspector ____ the report yesterday.", ["submitted", "submit", "submits", "has submit"], "'Yesterday' indicates the simple past tense, so the verb is 'submitted'."],
    ["सही रूप चुनिए: The inspector ____ the report yesterday.", ["submitted", "submit", "submits", "has submit"], "'Yesterday' सामान्य भूतकाल दर्शाता है, इसलिए क्रिया 'submitted' होगी।"]),
  q(4, "english", "one-word", "M", 2,
    ["One word for 'a person who commits a crime':", ["Victim", "Witness", "Criminal", "Judge"], "A criminal is a person who has committed a crime; a victim suffers it and a witness sees it."],
    ["'अपराध करने वाला व्यक्ति' के लिए एक शब्द:", ["Victim", "Witness", "Criminal", "Judge"], "Criminal वह व्यक्ति है जिसने अपराध किया हो; victim पीड़ित होता है और witness गवाह।"]),

  // ───────── Section 5: Computer ─────────
  q(5, "computer", "ms-office", "E", 3,
    ["Which keyboard shortcut is used to save a document in MS Word?", ["Ctrl + P", "Ctrl + C", "Ctrl + V", "Ctrl + S"], "Ctrl + S saves the current document; Ctrl + P prints, Ctrl + C copies and Ctrl + V pastes."],
    ["MS Word में दस्तावेज़ को सहेजने (save) के लिए कौन-सा शॉर्टकट प्रयोग होता है?", ["Ctrl + P", "Ctrl + C", "Ctrl + V", "Ctrl + S"], "Ctrl + S वर्तमान दस्तावेज़ सहेजता है; Ctrl + P प्रिंट, Ctrl + C कॉपी और Ctrl + V पेस्ट करता है।"]),
];
