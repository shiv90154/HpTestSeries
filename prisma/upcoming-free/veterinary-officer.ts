// HPPSC Veterinary Officer Free Mock 1 — 15 questions (Animal Husbandry & Nutrition 5, Veterinary Medicine & Pathology 4, Anatomy & Physiology 3, Himachal GK 3).

import { q, type PatwariQuestion } from "../patwari/types";

export const veterinaryOfficerMock1: PatwariQuestion[] = [
  // ───────── Section 0: Animal Husbandry & Nutrition ─────────
  q(0, "veterinary", "animal-husbandry", "E", 1,
    ["The average gestation period of a cow is about:", ["210 days", "280 days", "310 days", "150 days"], "A cow's gestation period is about 280–285 days; for a buffalo it is about 310 days."],
    ["गाय की औसत गर्भावधि लगभग कितनी होती है?", ["210 दिन", "280 दिन", "310 दिन", "150 दिन"], "गाय की गर्भावधि लगभग 280–285 दिन होती है; भैंस की लगभग 310 दिन।"]),
  q(0, "veterinary", "animal-husbandry", "M", 2,
    ["Murrah is a well-known breed of:", ["Cattle", "Goat", "Buffalo", "Sheep"], "Murrah, originating from Haryana, is the best-known dairy breed of buffalo."],
    ["मुर्रा किसकी प्रसिद्ध नस्ल है?", ["गाय", "बकरी", "भैंस", "भेड़"], "हरियाणा मूल की मुर्रा भैंस की सबसे प्रसिद्ध दुग्ध नस्ल है।"]),
  q(0, "veterinary", "animal-husbandry", "M", 0,
    ["'Operation Flood', the world's largest dairy development programme, was launched in India in:", ["1970", "1950", "1985", "2000"], "Operation Flood was launched by the NDDB in 1970 under Dr. Verghese Kurien, leading to the White Revolution."],
    ["विश्व के सबसे बड़े डेयरी विकास कार्यक्रम 'ऑपरेशन फ्लड' की शुरुआत भारत में कब हुई?", ["1970", "1950", "1985", "2000"], "NDDB ने डॉ. वर्गीज़ कुरियन के नेतृत्व में 1970 में ऑपरेशन फ्लड शुरू किया, जिससे श्वेत क्रांति आई।"]),
  q(0, "veterinary", "animal-husbandry", "E", 3,
    ["The incubation period of a chicken egg is:", ["10 days", "15 days", "28 days", "21 days"], "Hen eggs hatch after about 21 days of incubation."],
    ["मुर्गी के अंडे का ऊष्मायन काल कितना होता है?", ["10 दिन", "15 दिन", "28 दिन", "21 दिन"], "मुर्गी के अंडे लगभग 21 दिन के ऊष्मायन के बाद फूटते हैं।"]),
  q(0, "veterinary", "animal-husbandry", "M", 1,
    ["The 'true stomach' of a ruminant, where gastric digestion takes place, is the:", ["Rumen", "Abomasum", "Reticulum", "Omasum"], "The abomasum is the glandular true stomach; the rumen, reticulum and omasum are fore-stomachs."],
    ["जुगाली करने वाले पशु का 'वास्तविक आमाशय', जहाँ जठर पाचन होता है, कौन-सा है?", ["रूमेन", "एबोमेसम", "रेटिकुलम", "ओमेसम"], "एबोमेसम ग्रंथियुक्त वास्तविक आमाशय है; रूमेन, रेटिकुलम और ओमेसम अग्र-आमाशय हैं।"]),

  // ───────── Section 1: Veterinary Medicine & Pathology ─────────
  q(1, "veterinary", "vet-medicine", "E", 2,
    ["Milk fever in dairy cows is mainly due to deficiency of:", ["Sodium", "Iron", "Calcium", "Iodine"], "Milk fever (parturient paresis) occurs soon after calving because of hypocalcaemia."],
    ["दुधारू गायों में दुग्ध ज्वर (मिल्क फीवर) मुख्यतः किसकी कमी से होता है?", ["सोडियम", "लोहा", "कैल्शियम", "आयोडीन"], "दुग्ध ज्वर ब्याने के कुछ समय बाद रक्त में कैल्शियम की कमी (हाइपोकैल्सीमिया) से होता है।"]),
  q(1, "veterinary", "vet-medicine", "M", 0,
    ["Haemorrhagic septicaemia in cattle and buffalo is caused by:", ["Pasteurella multocida", "Brucella abortus", "Bacillus anthracis", "Clostridium chauvoei"], "Haemorrhagic septicaemia is caused by Pasteurella multocida, a major monsoon-season killer of buffaloes."],
    ["गाय-भैंसों में गलघोंटू (हीमोरेजिक सेप्टिसीमिया) किससे होता है?", ["पास्चुरेला मल्टोसिडा", "ब्रूसेला एबॉर्टस", "बेसिलस एन्थ्रासिस", "क्लॉस्ट्रिडियम चोवी"], "गलघोंटू पास्चुरेला मल्टोसिडा से होता है और मानसून में भैंसों की मृत्यु का बड़ा कारण है।"]),
  q(1, "veterinary", "vet-medicine", "M", 3,
    ["Foot-and-mouth disease is caused by a:", ["Bacterium", "Protozoan", "Fungus", "Virus"], "Foot-and-mouth disease is caused by a picornavirus (an Aphthovirus) and affects cloven-hoofed animals."],
    ["खुरपका-मुँहपका रोग किससे होता है?", ["जीवाणु", "प्रोटोज़ोआ", "कवक", "विषाणु"], "खुरपका-मुँहपका रोग पिकोर्नावायरस (एफ्थोवायरस) से होता है और दो खुर वाले पशुओं को प्रभावित करता है।"]),
  q(1, "veterinary", "vet-medicine", "M", 1,
    ["Brucellosis in cattle mainly causes:", ["Diarrhoea", "Abortion in late pregnancy", "Blindness", "Skin cancer"], "Bovine brucellosis (Brucella abortus) typically causes abortion in the last trimester and is a zoonosis."],
    ["गायों में ब्रूसेलोसिस मुख्यतः क्या उत्पन्न करता है?", ["दस्त", "गर्भावस्था के अंतिम चरण में गर्भपात", "अंधापन", "त्वचा कैंसर"], "गोपशु ब्रूसेलोसिस (ब्रूसेला एबॉर्टस) सामान्यतः अंतिम तिमाही में गर्भपात कराता है और यह जूनोटिक रोग है।"]),

  // ───────── Section 2: Anatomy & Physiology ─────────
  q(2, "veterinary", "vet-anatomy-physiology", "M", 2,
    ["The normal rectal temperature of an adult cow is about:", ["35.5°C", "37.0°C", "38.5°C", "41.0°C"], "The normal rectal temperature of cattle is around 38–39°C (about 101.5°F)."],
    ["वयस्क गाय का सामान्य मलाशयी तापमान लगभग कितना होता है?", ["35.5°C", "37.0°C", "38.5°C", "41.0°C"], "गोपशु का सामान्य मलाशयी तापमान लगभग 38–39°C (करीब 101.5°F) होता है।"]),
  q(2, "veterinary", "vet-anatomy-physiology", "M", 3,
    ["An adult dog normally has how many permanent teeth?", ["28", "32", "36", "42"], "An adult dog has 42 permanent teeth (puppies have 28 deciduous teeth)."],
    ["वयस्क कुत्ते के सामान्यतः कितने स्थायी दाँत होते हैं?", ["28", "32", "36", "42"], "वयस्क कुत्ते के 42 स्थायी दाँत होते हैं (पिल्लों के 28 अस्थायी दाँत)।"]),
  q(2, "veterinary", "vet-anatomy-physiology", "E", 0,
    ["The hormone responsible for milk let-down is:", ["Oxytocin", "Insulin", "Thyroxine", "Adrenaline"], "Oxytocin from the posterior pituitary causes contraction of myoepithelial cells, ejecting milk."],
    ["दूध उतरने (मिल्क लेट-डाउन) के लिए उत्तरदायी हार्मोन है:", ["ऑक्सीटोसिन", "इंसुलिन", "थायरॉक्सिन", "एड्रेनालिन"], "पश्च पीयूष ग्रंथि का ऑक्सीटोसिन दुग्ध-ग्रंथि की पेशी-उपकला को सिकोड़कर दूध बाहर निकालता है।"]),

  // ───────── Section 3: Himachal GK ─────────
  q(3, "hp-gk", "economy", "M", 1,
    ["Which breed of sheep/goat is traditionally reared by the Gaddi community of Himachal?", ["Jamunapari", "Gaddi", "Marwari", "Barbari"], "The Gaddi breed (of both goat and sheep) is named after the Gaddi shepherds of Chamba and Kangra and is adapted to hill grazing."],
    ["हिमाचल के गद्दी समुदाय द्वारा परंपरागत रूप से कौन-सी नस्ल पाली जाती है?", ["जमुनापारी", "गद्दी", "मारवाड़ी", "बारबरी"], "गद्दी नस्ल (बकरी और भेड़ दोनों) का नाम चंबा-कांगड़ा के गद्दी चरवाहों पर पड़ा है और यह पहाड़ी चराई के अनुकूल है।"]),
  q(3, "hp-gk", "economy", "M", 2,
    ["The Chaudhary Sarwan Kumar Himachal Pradesh Krishi Vishvavidyalaya (agricultural university) is located at:", ["Nauni", "Mandi", "Palampur", "Kullu"], "CSK HPKV, which also houses the College of Veterinary and Animal Sciences, is at Palampur in Kangra district."],
    ["चौधरी सरवन कुमार हिमाचल प्रदेश कृषि विश्वविद्यालय कहाँ स्थित है?", ["नौणी", "मंडी", "पालमपुर", "कुल्लू"], "CSK HPKV, जिसमें पशु चिकित्सा एवं पशु विज्ञान महाविद्यालय भी है, कांगड़ा जिले के पालमपुर में है।"]),
  q(3, "hp-gk", "economy", "M", 0,
    ["Dr. Y.S. Parmar University of Horticulture and Forestry is located at:", ["Nauni (Solan)", "Palampur", "Hamirpur", "Chamba"], "The Dr. Yashwant Singh Parmar University of Horticulture and Forestry is at Nauni in Solan district."],
    ["डॉ. वाई.एस. परमार उद्यानिकी एवं वानिकी विश्वविद्यालय कहाँ स्थित है?", ["नौणी (सोलन)", "पालमपुर", "हमीरपुर", "चंबा"], "डॉ. यशवंत सिंह परमार उद्यानिकी एवं वानिकी विश्वविद्यालय सोलन जिले के नौणी में है।"]),
];
