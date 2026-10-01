// HPPSC Medical Officer Free Mock 1 — 15 questions (General Medicine 4, Surgery 3, Community Medicine 3, Anatomy, Physiology & Pharmacology 3, Himachal GK 2).

import { q, type PatwariQuestion } from "../patwari/types";

export const medicalOfficerMock1: PatwariQuestion[] = [
  // ───────── Section 0: General Medicine ─────────
  q(0, "medicine", "general-medicine", "E", 1,
    ["The drug of first choice in anaphylactic shock is:", ["Hydrocortisone", "Adrenaline (epinephrine) intramuscular", "Chlorpheniramine", "Salbutamol"], "Intramuscular adrenaline is the first-line, life-saving treatment in anaphylaxis; the others are adjuncts."],
    ["एनाफिलैक्टिक शॉक में पहली पसंद की औषधि है:", ["हाइड्रोकॉर्टिसोन", "एड्रेनालिन (एपिनेफ्रिन) माँसपेशी में", "क्लोरफेनिरामिन", "सल्ब्यूटामोल"], "एनाफिलैक्सिस में माँसपेशी में एड्रेनालिन पहली पंक्ति का जीवनरक्षक उपचार है; बाकी सहायक हैं।"]),
  q(0, "medicine", "general-medicine", "M", 2,
    ["Diabetes mellitus is diagnosed when the fasting plasma glucose is at least:", ["100 mg/dL", "110 mg/dL", "126 mg/dL", "160 mg/dL"], "A fasting plasma glucose of 126 mg/dL or more (on two occasions) is diagnostic of diabetes mellitus."],
    ["उपवास प्लाज़्मा ग्लूकोज़ कम से कम कितना होने पर मधुमेह का निदान किया जाता है?", ["100 mg/dL", "110 mg/dL", "126 mg/dL", "160 mg/dL"], "उपवास प्लाज़्मा ग्लूकोज़ 126 mg/dL या अधिक (दो अवसरों पर) होने पर मधुमेह का निदान होता है।"]),
  q(0, "medicine", "general-medicine", "M", 0,
    ["Rheumatic fever follows an infection with:", ["Group A beta-haemolytic Streptococcus", "Staphylococcus aureus", "Escherichia coli", "Salmonella typhi"], "Rheumatic fever is an autoimmune sequel to pharyngeal infection with group A beta-haemolytic streptococci."],
    ["आमवाती ज्वर (रूमेटिक फीवर) किस संक्रमण के बाद होता है?", ["ग्रुप A बीटा-हीमोलिटिक स्ट्रेप्टोकोकस", "स्टैफिलोकोकस ऑरियस", "ई. कोलाई", "साल्मोनेला टाइफी"], "आमवाती ज्वर ग्रुप A बीटा-हीमोलिटिक स्ट्रेप्टोकोकस से गले के संक्रमण के बाद होने वाली स्वप्रतिरक्षी प्रतिक्रिया है।"]),
  q(0, "medicine", "general-medicine", "M", 3,
    ["Deep, laboured (Kussmaul) breathing is characteristically seen in:", ["Asthma", "Pneumothorax", "Pulmonary embolism", "Diabetic ketoacidosis"], "Kussmaul respiration is the compensatory deep, rapid breathing of metabolic acidosis, classically in diabetic ketoacidosis."],
    ["गहरी, श्रमपूर्ण (कसमॉल) श्वसन विशेष रूप से किसमें देखी जाती है?", ["दमा", "न्यूमोथोरैक्स", "फुफ्फुसीय अंतःशल्यता", "डायबिटिक कीटोएसिडोसिस"], "कसमॉल श्वसन उपापचयी अम्लता में होने वाली क्षतिपूरक गहरी, तीव्र श्वसन है, विशेषतः डायबिटिक कीटोएसिडोसिस में।"]),

  // ───────── Section 1: Surgery ─────────
  q(1, "medicine", "surgery", "M", 2,
    ["McBurney's point lies at the junction of the lateral one-third and medial two-thirds of the line joining the:", ["Umbilicus and pubic symphysis", "Xiphoid process and umbilicus", "Anterior superior iliac spine and umbilicus", "Costal margin and iliac crest"], "McBurney's point, the usual site of maximal tenderness in appendicitis, lies on the line from the right ASIS to the umbilicus."],
    ["मैक्बर्नी बिंदु किन दो बिंदुओं को जोड़ने वाली रेखा के पार्श्व एक-तिहाई और मध्य दो-तिहाई के जोड़ पर होता है?", ["नाभि और जघन संधान", "ज़िफ़ॉइड प्रवर्ध और नाभि", "पूर्वी ऊपरी इलियाक कंटक और नाभि", "कोस्टल किनारा और इलियाक क्रेस्ट"], "एपेंडिसाइटिस में अधिकतम कोमलता का सामान्य स्थान मैक्बर्नी बिंदु दाएँ ASIS और नाभि को जोड़ने वाली रेखा पर होता है।"]),
  q(1, "medicine", "surgery", "M", 0,
    ["Charcot's triad of ascending cholangitis consists of:", ["Fever, jaundice and right upper quadrant pain", "Fever, vomiting and diarrhoea", "Jaundice, ascites and encephalopathy", "Pain, pallor and pulselessness"], "Charcot's triad: fever with rigors, jaundice and right upper quadrant pain."],
    ["आरोही कोलैंजाइटिस की शार्को त्रयी में क्या शामिल है?", ["बुखार, पीलिया और दाएँ ऊपरी पेट में दर्द", "बुखार, उल्टी और दस्त", "पीलिया, जलोदर और एन्सेफैलोपैथी", "दर्द, पीलापन और नाड़ी का अभाव"], "शार्को त्रयी: कंपकंपी के साथ बुखार, पीलिया और दाएँ ऊपरी उदर में दर्द।"]),
  q(1, "medicine", "surgery", "E", 3,
    ["The maximum score on the Glasgow Coma Scale is:", ["10", "12", "13", "15"], "The Glasgow Coma Scale ranges from 3 to 15; 15 indicates full consciousness."],
    ["ग्लासगो कोमा स्केल का अधिकतम अंक कितना होता है?", ["10", "12", "13", "15"], "ग्लासगो कोमा स्केल 3 से 15 तक होता है; 15 पूर्ण चेतना दर्शाता है।"]),

  // ───────── Section 2: Community Medicine ─────────
  q(2, "medicine", "community-medicine", "M", 1,
    ["Infant Mortality Rate is the number of deaths of children under one year of age per:", ["100 live births", "1,000 live births", "10,000 live births", "1,000 population"], "IMR is deaths under one year per 1,000 live births in a given year."],
    ["शिशु मृत्यु दर एक वर्ष से कम आयु के बच्चों की मृत्यु की वह संख्या है जो प्रति:", ["100 जीवित जन्म पर", "1,000 जीवित जन्म पर", "10,000 जीवित जन्म पर", "1,000 जनसंख्या पर"], "शिशु मृत्यु दर किसी वर्ष में प्रति 1,000 जीवित जन्मों पर एक वर्ष से कम आयु की मृत्युओं की संख्या है।"]),
  q(2, "medicine", "community-medicine", "M", 2,
    ["The residual chlorine level recommended in drinking water after 1 hour of contact is at least:", ["0.1 mg/L", "0.2 mg/L", "0.5 mg/L", "2 mg/L"], "A free residual chlorine of 0.5 mg/L after one hour of contact is the standard for safe disinfection."],
    ["पीने के पानी में 1 घंटे के संपर्क के बाद अनुशंसित अवशिष्ट क्लोरीन स्तर कम से कम कितना होना चाहिए?", ["0.1 mg/L", "0.2 mg/L", "0.5 mg/L", "2 mg/L"], "सुरक्षित संक्रमणहरण के लिए एक घंटे के संपर्क के बाद 0.5 mg/L मुक्त अवशिष्ट क्लोरीन मानक है।"]),
  q(2, "medicine", "community-medicine", "E", 0,
    ["Which vitamin deficiency is the commonest cause of preventable childhood blindness?", ["Vitamin A", "Vitamin B1", "Vitamin C", "Vitamin D"], "Vitamin A deficiency is the leading preventable cause of childhood blindness, hence prophylactic Vitamin A doses."],
    ["बचपन के रोकथाम योग्य अंधेपन का सबसे आम कारण किस विटामिन की कमी है?", ["विटामिन A", "विटामिन B1", "विटामिन C", "विटामिन D"], "विटामिन A की कमी बाल्यावस्था के रोकथाम योग्य अंधेपन का प्रमुख कारण है, इसीलिए विटामिन A की रोगनिरोधी खुराकें दी जाती हैं।"]),

  // ───────── Section 3: Anatomy, Physiology & Pharmacology ─────────
  q(3, "medicine", "preclinical", "E", 1,
    ["The natural pacemaker of the heart is the:", ["AV node", "SA node", "Bundle of His", "Purkinje fibres"], "The sinoatrial (SA) node has the fastest intrinsic rate and sets the heart rhythm."],
    ["हृदय का प्राकृतिक पेसमेकर कौन-सा है?", ["AV नोड", "SA नोड", "हिस बंडल", "पर्किंजे तंतु"], "साइनोएट्रियल (SA) नोड की आंतरिक दर सबसे अधिक होती है और यह हृदय की लय निर्धारित करता है।"]),
  q(3, "medicine", "preclinical", "M", 3,
    ["The specific antidote for heparin overdose is:", ["Vitamin K", "Tranexamic acid", "Naloxone", "Protamine sulfate"], "Protamine sulfate neutralises heparin; vitamin K reverses warfarin."],
    ["हेपरिन की अधिक मात्रा का विशिष्ट प्रतिकारक है:", ["विटामिन K", "ट्रेनेक्सामिक एसिड", "नैलोक्सोन", "प्रोटामिन सल्फेट"], "प्रोटामिन सल्फेट हेपरिन को निष्प्रभावी करता है; विटामिन K वारफेरिन का प्रतिकारक है।"]),
  q(3, "medicine", "preclinical", "E", 2,
    ["The longest and strongest bone of the human body is the:", ["Humerus", "Tibia", "Femur", "Fibula"], "The femur (thigh bone) is the longest and strongest bone in the human body."],
    ["मानव शरीर की सबसे लंबी और मजबूत हड्डी कौन-सी है?", ["ह्यूमरस", "टिबिया", "फीमर", "फिबुला"], "फीमर (जाँघ की हड्डी) मानव शरीर की सबसे लंबी और मजबूत हड्डी है।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "polity-administration", "M", 0,
    ["AIIMS in Himachal Pradesh is located at:", ["Bilaspur", "Shimla", "Una", "Solan"], "AIIMS Bilaspur (Kothipura) is the All India Institute of Medical Sciences in Himachal Pradesh."],
    ["हिमाचल प्रदेश में AIIMS कहाँ स्थित है?", ["बिलासपुर", "शिमला", "ऊना", "सोलन"], "AIIMS बिलासपुर (कोठीपुरा) हिमाचल प्रदेश में स्थित अखिल भारतीय आयुर्विज्ञान संस्थान है।"]),
  q(4, "hp-gk", "polity-administration", "M", 3,
    ["Dr. Rajendra Prasad Government Medical College is located at:", ["Hamirpur", "Chamba", "Nerchowk", "Tanda"], "Dr. Rajendra Prasad Government Medical College is at Tanda in Kangra district."],
    ["डॉ. राजेंद्र प्रसाद सरकारी मेडिकल कॉलेज कहाँ स्थित है?", ["हमीरपुर", "चंबा", "नेरचौक", "टांडा"], "डॉ. राजेंद्र प्रसाद सरकारी मेडिकल कॉलेज कांगड़ा जिले के टांडा में है।"]),
];
