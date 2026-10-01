// HPRCA Pharmacist Free Mock 1 — 15 questions (Pharmaceutics 4, Pharmacology 4, Pharmaceutical Chemistry & Pharmacognosy 3, Pharmacy Practice & Law 2, General Awareness 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const pharmacistMock1: PatwariQuestion[] = [
  // ───────── Section 0: Pharmaceutics ─────────
  q(0, "pharmacy", "pharmaceutics", "E", 1,
    ["Which of the following is a solid dosage form?", ["Syrup", "Tablet", "Emulsion", "Suspension"], "Tablets are solid dosage forms, whereas syrups, emulsions and suspensions are liquid dosage forms."],
    ["निम्नलिखित में से कौन-सा ठोस मात्रा रूप (डोज़ेज फॉर्म) है?", ["सिरप", "टैबलेट", "इमल्शन", "सस्पेंशन"], "टैबलेट ठोस मात्रा रूप है, जबकि सिरप, इमल्शन और सस्पेंशन तरल रूप हैं।"]),
  q(0, "pharmacy", "pharmaceutics", "M", 2,
    ["Enteric-coated tablets are designed to release the drug in the:", ["Mouth", "Stomach", "Intestine", "Rectum"], "The enteric coat resists stomach acid and dissolves in the higher pH of the intestine."],
    ["एंटेरिक-कोटेड टैबलेट दवा को कहाँ मुक्त करने के लिए बनाई जाती हैं?", ["मुँह में", "आमाशय में", "आँत में", "मलाशय में"], "एंटेरिक कोटिंग आमाशय के अम्ल का प्रतिरोध करती है और आँत के उच्च pH में घुलती है।"]),
  q(0, "pharmacy", "pharmaceutics", "M", 0,
    ["An emulsion is a dispersion of:", ["Two immiscible liquids", "A solid in a liquid", "A gas in a liquid", "Two solids"], "An emulsion is a mixture of two immiscible liquids, one dispersed as droplets in the other, stabilised by an emulsifier."],
    ["इमल्शन किसका परिक्षेपण है?", ["दो अमिश्रणीय द्रवों का", "द्रव में ठोस का", "द्रव में गैस का", "दो ठोसों का"], "इमल्शन दो अमिश्रणीय द्रवों का मिश्रण है जिसमें एक द्रव बूँदों के रूप में दूसरे में फैला होता है और इमल्सीफायर से स्थायी रहता है।"]),
  q(0, "pharmacy", "pharmaceutics", "E", 3,
    ["The route of administration that gives the fastest drug action is:", ["Oral", "Topical", "Rectal", "Intravenous"], "Intravenous administration puts the drug directly into the bloodstream, giving 100% bioavailability and the quickest action."],
    ["दवा देने का कौन-सा मार्ग सबसे तेज़ प्रभाव देता है?", ["मौखिक", "त्वचा पर लगाना", "मलाशय", "अंतःशिरा (IV)"], "अंतःशिरा मार्ग से दवा सीधे रक्त में पहुँचती है, जिससे 100% जैव-उपलब्धता और सबसे तेज़ असर मिलता है।"]),

  // ───────── Section 1: Pharmacology ─────────
  q(1, "pharmacy", "pharmacology", "E", 2,
    ["Paracetamol is mainly used as:", ["An antibiotic", "An anticoagulant", "An analgesic and antipyretic", "An antidiabetic"], "Paracetamol relieves pain and reduces fever."],
    ["पैरासिटामोल का मुख्य उपयोग क्या है?", ["एंटीबायोटिक", "रक्त का थक्का रोकने वाली दवा", "दर्दनाशक एवं ज्वरनाशक", "मधुमेह की दवा"], "पैरासिटामोल दर्द और बुखार दोनों कम करती है।"]),
  q(1, "pharmacy", "pharmacology", "M", 1,
    ["Penicillin was discovered by:", ["Louis Pasteur", "Alexander Fleming", "Robert Koch", "Edward Jenner"], "Alexander Fleming discovered penicillin in 1928."],
    ["पेनिसिलिन की खोज किसने की?", ["लुई पाश्चर", "अलेक्ज़ेंडर फ्लेमिंग", "रॉबर्ट कॉख", "एडवर्ड जेनर"], "अलेक्ज़ेंडर फ्लेमिंग ने 1928 में पेनिसिलिन की खोज की।"]),
  q(1, "pharmacy", "pharmacology", "M", 3,
    ["Which of the following is a beta-blocker?", ["Amlodipine", "Enalapril", "Furosemide", "Atenolol"], "Atenolol is a beta-adrenergic blocker; amlodipine is a calcium-channel blocker, enalapril an ACE inhibitor and furosemide a diuretic."],
    ["निम्नलिखित में से कौन-सी बीटा-ब्लॉकर दवा है?", ["एम्लोडिपिन", "एनालाप्रिल", "फ्यूरोसेमाइड", "एटेनोलोल"], "एटेनोलोल बीटा-एड्रीनर्जिक ब्लॉकर है; एम्लोडिपिन कैल्शियम-चैनल ब्लॉकर, एनालाप्रिल ACE इनहिबिटर और फ्यूरोसेमाइड मूत्रवर्धक है।"]),
  q(1, "pharmacy", "pharmacology", "M", 0,
    ["The antidote for paracetamol overdose is:", ["N-acetylcysteine", "Naloxone", "Atropine", "Vitamin K"], "N-acetylcysteine replenishes glutathione and protects the liver in paracetamol poisoning; naloxone is for opioids and atropine for organophosphates."],
    ["पैरासिटामोल की अधिक मात्रा का प्रतिकारक (एंटीडोट) क्या है?", ["एन-एसिटाइलसिस्टीन", "नैलोक्सोन", "एट्रोपिन", "विटामिन K"], "एन-एसिटाइलसिस्टीन ग्लूटाथायोन की पूर्ति करके यकृत को बचाता है; नैलोक्सोन ओपिओइड के लिए और एट्रोपिन ऑर्गेनोफॉस्फेट के लिए है।"]),

  // ───────── Section 2: Pharmaceutical Chemistry & Pharmacognosy ─────────
  q(2, "pharmacy", "pharmaceutical-chemistry", "M", 1,
    ["The pH of a neutral solution at 25°C is:", ["0", "7", "10", "14"], "A neutral solution has a pH of 7 at 25°C."],
    ["25°C पर उदासीन विलयन का pH कितना होता है?", ["0", "7", "10", "14"], "25°C पर उदासीन विलयन का pH 7 होता है।"]),
  q(2, "pharmacy", "pharmaceutical-chemistry", "M", 2,
    ["Quinine, used against malaria, is obtained from the bark of:", ["Neem", "Eucalyptus", "Cinchona", "Arjuna"], "Quinine is an alkaloid from the bark of the Cinchona tree."],
    ["मलेरिया में प्रयुक्त कुनैन (क्विनीन) किस पेड़ की छाल से प्राप्त होती है?", ["नीम", "यूकेलिप्टस", "सिनकोना", "अर्जुन"], "कुनैन सिनकोना वृक्ष की छाल से प्राप्त एक एल्केलॉइड है।"]),
  q(2, "pharmacy", "pharmaceutical-chemistry", "E", 0,
    ["Aspirin is chemically:", ["Acetylsalicylic acid", "Paracetamol", "Ibuprofen", "Salicylamide"], "Aspirin is acetylsalicylic acid, an NSAID used as an analgesic, antipyretic and antiplatelet agent."],
    ["रासायनिक रूप से एस्पिरिन क्या है?", ["एसिटाइलसैलिसिलिक अम्ल", "पैरासिटामोल", "आइबुप्रोफेन", "सैलिसिलैमाइड"], "एस्पिरिन एसिटाइलसैलिसिलिक अम्ल है, जो दर्दनाशक, ज्वरनाशक और प्लेटलेट-रोधी NSAID है।"]),

  // ───────── Section 3: Pharmacy Practice & Law ─────────
  q(3, "pharmacy", "pharmacy-practice", "M", 3,
    ["In India, the primary law that regulates the import, manufacture, sale and distribution of drugs is the:", ["Narcotic Drugs Act, 1985", "Pharmacy Act, 1948", "Consumer Protection Act", "Drugs and Cosmetics Act, 1940"], "The Drugs and Cosmetics Act, 1940 (with its 1945 Rules) regulates drugs and cosmetics; the Pharmacy Act, 1948 regulates the profession."],
    ["भारत में दवाओं के आयात, निर्माण, बिक्री और वितरण को नियंत्रित करने वाला मुख्य कानून कौन-सा है?", ["नारकोटिक ड्रग्स अधिनियम, 1985", "फार्मेसी अधिनियम, 1948", "उपभोक्ता संरक्षण अधिनियम", "औषधि एवं प्रसाधन सामग्री अधिनियम, 1940"], "औषधि एवं प्रसाधन सामग्री अधिनियम, 1940 (नियम 1945 सहित) दवाओं को नियंत्रित करता है; फार्मेसी अधिनियम, 1948 पेशे को नियंत्रित करता है।"]),
  q(3, "pharmacy", "pharmacy-practice", "E", 1,
    ["The 'expiry date' on a medicine label indicates:", ["The date it was manufactured", "The date until which the manufacturer guarantees its full potency and safety", "The price validity", "The date of dispatch"], "The expiry date is the date up to which the product keeps its stated potency and safety under recommended storage."],
    ["दवा के लेबल पर 'एक्सपायरी डेट' क्या दर्शाती है?", ["निर्माण की तिथि", "वह तिथि जिस तक निर्माता पूर्ण क्षमता और सुरक्षा की गारंटी देता है", "मूल्य की वैधता", "भेजने की तिथि"], "एक्सपायरी डेट वह तिथि है जिस तक उचित भंडारण में दवा अपनी बताई गई क्षमता और सुरक्षा बनाए रखती है।"]),

  // ───────── Section 4: General Awareness ─────────
  q(4, "general-studies", "general-science", "E", 2,
    ["World Pharmacists Day is observed on:", ["7 April", "1 May", "25 September", "5 June"], "World Pharmacists Day is observed on 25 September each year."],
    ["विश्व फार्मासिस्ट दिवस कब मनाया जाता है?", ["7 अप्रैल", "1 मई", "25 सितंबर", "5 जून"], "विश्व फार्मासिस्ट दिवस प्रतिवर्ष 25 सितंबर को मनाया जाता है।"]),
  q(4, "hp-gk", "polity-administration", "E", 0,
    ["The High Court of Himachal Pradesh is located at:", ["Shimla", "Dharamshala", "Mandi", "Solan"], "The Himachal Pradesh High Court sits at Shimla."],
    ["हिमाचल प्रदेश उच्च न्यायालय कहाँ स्थित है?", ["शिमला", "धर्मशाला", "मंडी", "सोलन"], "हिमाचल प्रदेश उच्च न्यायालय शिमला में स्थित है।"]),
];
