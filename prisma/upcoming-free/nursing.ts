// PGIMER Nursing Officer Free Mock 1 — 15 questions (Fundamentals & Anatomy 5, Medical-Surgical 4, Community/Child/Midwifery 4, General Awareness 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const nursingMock1: PatwariQuestion[] = [
  // ───────── Section 0: Fundamentals of Nursing & Anatomy ─────────
  q(0, "nursing", "fundamentals", "E", 1,
    ["The normal resting pulse rate of a healthy adult is:", ["40–60 beats/min", "60–100 beats/min", "100–120 beats/min", "120–140 beats/min"], "A healthy adult's resting pulse is 60–100 beats per minute."],
    ["एक स्वस्थ वयस्क की सामान्य विश्राम अवस्था में नाड़ी दर कितनी होती है?", ["40–60 धड़कन/मिनट", "60–100 धड़कन/मिनट", "100–120 धड़कन/मिनट", "120–140 धड़कन/मिनट"], "स्वस्थ वयस्क की विश्राम नाड़ी दर 60–100 धड़कन प्रति मिनट होती है।"]),
  q(0, "nursing", "fundamentals", "E", 2,
    ["The normal oral body temperature of an adult is about:", ["35°C", "36°C", "37°C", "39°C"], "Normal body temperature is about 37°C (98.6°F)."],
    ["वयस्क का सामान्य मौखिक शारीरिक तापमान लगभग कितना होता है?", ["35°C", "36°C", "37°C", "39°C"], "सामान्य शारीरिक तापमान लगभग 37°C (98.6°F) होता है।"]),
  q(0, "nursing", "anatomy-physiology", "E", 0,
    ["The largest organ of the human body is the:", ["Skin", "Liver", "Lung", "Intestine"], "The skin is the largest organ of the human body by surface area and weight."],
    ["मानव शरीर का सबसे बड़ा अंग कौन-सा है?", ["त्वचा", "यकृत", "फेफड़ा", "आँत"], "त्वचा क्षेत्रफल और भार दोनों में मानव शरीर का सबसे बड़ा अंग है।"]),
  q(0, "nursing", "fundamentals", "M", 3,
    ["A normal blood pressure reading for a healthy adult is approximately:", ["90/40 mmHg", "100/100 mmHg", "160/100 mmHg", "120/80 mmHg"], "The conventional normal adult blood pressure is about 120/80 mmHg."],
    ["एक स्वस्थ वयस्क का सामान्य रक्तचाप लगभग कितना होता है?", ["90/40 mmHg", "100/100 mmHg", "160/100 mmHg", "120/80 mmHg"], "वयस्क का सामान्य रक्तचाप पारंपरिक रूप से लगभग 120/80 mmHg माना जाता है।"]),
  q(0, "nursing", "anatomy-physiology", "M", 1,
    ["The number of bones in an adult human body is:", ["186", "206", "226", "306"], "An adult has 206 bones; a newborn has about 300 that fuse as the child grows."],
    ["वयस्क मानव शरीर में अस्थियों की संख्या कितनी होती है?", ["186", "206", "226", "306"], "वयस्क में 206 अस्थियाँ होती हैं; नवजात में लगभग 300 होती हैं जो वृद्धि के साथ जुड़ जाती हैं।"]),

  // ───────── Section 1: Medical-Surgical Nursing ─────────
  q(1, "nursing", "medical-surgical", "M", 2,
    ["Insulin is secreted by which cells of the pancreas?", ["Alpha cells", "Delta cells", "Beta cells", "Acinar cells"], "Beta cells of the islets of Langerhans secrete insulin; alpha cells secrete glucagon."],
    ["अग्न्याशय की किन कोशिकाओं से इंसुलिन स्रावित होता है?", ["एल्फा कोशिकाएँ", "डेल्टा कोशिकाएँ", "बीटा कोशिकाएँ", "एसिनर कोशिकाएँ"], "लैंगरहैंस के द्वीपों की बीटा कोशिकाएँ इंसुलिन स्रावित करती हैं; एल्फा कोशिकाएँ ग्लूकागॉन बनाती हैं।"]),
  q(1, "nursing", "medical-surgical", "M", 0,
    ["The specific antidote for paracetamol overdose is:", ["N-acetylcysteine", "Naloxone", "Atropine", "Flumazenil"], "N-acetylcysteine replenishes glutathione and prevents liver damage in paracetamol poisoning; naloxone is for opioids, atropine for organophosphates and flumazenil for benzodiazepines."],
    ["पैरासिटामॉल की अधिक मात्रा का विशिष्ट प्रतिविष (antidote) कौन-सा है?", ["N-एसिटाइलसिस्टीन", "नैलोक्सोन", "एट्रोपिन", "फ्लुमाज़ेनिल"], "N-एसिटाइलसिस्टीन ग्लूटाथायोन की पूर्ति कर यकृत को क्षति से बचाता है; नैलोक्सोन ओपिओइड, एट्रोपिन ऑर्गेनोफॉस्फेट और फ्लुमाज़ेनिल बेंज़ोडायज़ेपीन के लिए है।"]),
  q(1, "nursing", "medical-surgical", "M", 3,
    ["The immediate treatment for a conscious patient with hypoglycaemia is:", ["Insulin injection", "Complete bed rest only", "Intravenous saline", "Oral fast-acting sugar such as glucose"], "A conscious hypoglycaemic patient should be given 15–20 g of fast-acting carbohydrate orally; glucagon or IV dextrose is used if unconscious."],
    ["सचेत अवस्था में हाइपोग्लाइसीमिया वाले रोगी का तत्काल उपचार क्या है?", ["इंसुलिन का इंजेक्शन", "केवल पूर्ण बिस्तर आराम", "अंतःशिरा सलाइन", "ग्लूकोज़ जैसी तेज़ असर वाली मीठी चीज़ मुँह से देना"], "सचेत रोगी को 15–20 ग्राम तेज़ असर वाला कार्बोहाइड्रेट मुँह से देना चाहिए; बेहोशी में ग्लूकागॉन या IV डेक्सट्रोज़ दिया जाता है।"]),
  q(1, "nursing", "medical-surgical", "H", 1,
    ["The normal haemoglobin level in an adult male is approximately:", ["8–10 g/dL", "13–17 g/dL", "18–22 g/dL", "4–6 g/dL"], "Normal adult male haemoglobin is about 13–17 g/dL; adult female about 12–15 g/dL."],
    ["वयस्क पुरुष में हीमोग्लोबिन का सामान्य स्तर लगभग कितना होता है?", ["8–10 g/dL", "13–17 g/dL", "18–22 g/dL", "4–6 g/dL"], "वयस्क पुरुष में हीमोग्लोबिन लगभग 13–17 g/dL और वयस्क महिला में लगभग 12–15 g/dL होता है।"]),

  // ───────── Section 2: Community, Child Health & Midwifery ─────────
  q(2, "nursing", "midwifery", "E", 2,
    ["The normal duration of a full-term pregnancy is about:", ["32 weeks", "36 weeks", "40 weeks", "46 weeks"], "A full-term pregnancy lasts about 40 weeks (280 days) from the first day of the last menstrual period."],
    ["पूर्णकालिक गर्भावस्था की सामान्य अवधि लगभग कितनी होती है?", ["32 सप्ताह", "36 सप्ताह", "40 सप्ताह", "46 सप्ताह"], "पूर्णकालिक गर्भावस्था अंतिम मासिक धर्म के पहले दिन से लगभग 40 सप्ताह (280 दिन) की होती है।"]),
  q(2, "nursing", "community-health", "E", 0,
    ["The BCG vaccine gives protection against:", ["Tuberculosis", "Polio", "Measles", "Hepatitis B"], "BCG (Bacillus Calmette–Guérin) protects mainly against severe forms of tuberculosis in children."],
    ["BCG का टीका किस रोग से सुरक्षा देता है?", ["क्षयरोग (टीबी)", "पोलियो", "खसरा", "हेपेटाइटिस B"], "BCG (बैसिलस कैलमेट–ग्वेरिन) मुख्यतः बच्चों में क्षयरोग के गंभीर रूपों से बचाता है।"]),
  q(2, "nursing", "child-health", "M", 3,
    ["A newborn is classified as 'low birth weight' if the birth weight is less than:", ["1.5 kg", "2.0 kg", "3.0 kg", "2.5 kg"], "The WHO defines low birth weight as less than 2,500 g (2.5 kg), irrespective of gestational age."],
    ["जन्म के समय कितने भार से कम होने पर नवजात को 'कम जन्म भार' वाला माना जाता है?", ["1.5 किग्रा", "2.0 किग्रा", "3.0 किग्रा", "2.5 किग्रा"], "WHO के अनुसार गर्भावधि की परवाह किए बिना 2,500 ग्राम (2.5 किग्रा) से कम जन्म भार कम जन्म भार कहलाता है।"]),
  q(2, "nursing", "community-health", "M", 1,
    ["Deficiency of Vitamin A causes:", ["Rickets", "Night blindness", "Beriberi", "Pellagra"], "Vitamin A deficiency causes night blindness (nyctalopia) and, if severe, xerophthalmia."],
    ["विटामिन A की कमी से कौन-सा रोग होता है?", ["रिकेट्स", "रतौंधी", "बेरीबेरी", "पेलाग्रा"], "विटामिन A की कमी से रतौंधी (नाइक्टालोपिया) और गंभीर अवस्था में ज़ेरोफ्थैल्मिया होता है।"]),

  // ───────── Section 3: General Awareness ─────────
  q(3, "general-studies", "general-science", "E", 0,
    ["PGIMER, a leading medical institute, is located in:", ["Chandigarh", "Shimla", "Lucknow", "Ludhiana"], "The Postgraduate Institute of Medical Education and Research (PGIMER) is in Chandigarh."],
    ["प्रमुख चिकित्सा संस्थान PGIMER कहाँ स्थित है?", ["चंडीगढ़", "शिमला", "लखनऊ", "लुधियाना"], "स्नातकोत्तर चिकित्सा शिक्षा एवं अनुसंधान संस्थान (PGIMER) चंडीगढ़ में है।"]),
  q(3, "general-studies", "general-science", "E", 2,
    ["International Nurses Day is observed every year on:", ["8 March", "7 April", "12 May", "5 June"], "International Nurses Day is observed on 12 May, the birth anniversary of Florence Nightingale."],
    ["अंतर्राष्ट्रीय नर्स दिवस प्रतिवर्ष कब मनाया जाता है?", ["8 मार्च", "7 अप्रैल", "12 मई", "5 जून"], "अंतर्राष्ट्रीय नर्स दिवस 12 मई को फ्लोरेंस नाइटिंगेल की जयंती पर मनाया जाता है।"]),
];
