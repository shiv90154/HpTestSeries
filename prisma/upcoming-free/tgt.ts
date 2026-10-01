// HPRCA TGT Teacher Free Mock 1 — 15 questions (Pedagogy 5, Himachal GK 3, English 3, Hindi 2, Reasoning 2). The subject paper differs by discipline, so this covers the common sections.

import { q, type PatwariQuestion } from "../patwari/types";

export const tgtMock1: PatwariQuestion[] = [
  // ───────── Section 0: Pedagogy ─────────
  q(0, "pedagogy", "child-development", "M", 1,
    ["Adolescence is generally considered to be the period between:", ["3 and 6 years", "12 and 19 years", "20 and 30 years", "6 and 9 years"], "Adolescence is the transition from childhood to adulthood, roughly from 12 to 19 years of age."],
    ["किशोरावस्था को सामान्यतः किन आयु वर्षों के बीच माना जाता है?", ["3 से 6 वर्ष", "12 से 19 वर्ष", "20 से 30 वर्ष", "6 से 9 वर्ष"], "किशोरावस्था बाल्यावस्था से वयस्कता के बीच का संक्रमण काल है, लगभग 12 से 19 वर्ष।"]),
  q(0, "pedagogy", "learning-theories", "M", 3,
    ["Who proposed the theory of multiple intelligences?", ["Binet", "Spearman", "Thorndike", "Howard Gardner"], "Howard Gardner proposed the theory of multiple intelligences in 1983."],
    ["बहु-बुद्धि सिद्धांत किसने प्रस्तुत किया?", ["बिने", "स्पीयरमैन", "थॉर्नडाइक", "हावर्ड गार्डनर"], "हावर्ड गार्डनर ने 1983 में बहु-बुद्धि सिद्धांत प्रस्तुत किया।"]),
  q(0, "pedagogy", "learning-theories", "H", 0,
    ["Bloom's revised taxonomy places which of the following at the highest level of the cognitive domain?", ["Creating", "Remembering", "Understanding", "Applying"], "In the revised taxonomy the order from lowest to highest is remember, understand, apply, analyse, evaluate, create."],
    ["ब्लूम के संशोधित वर्गीकरण में संज्ञानात्मक क्षेत्र के सर्वोच्च स्तर पर क्या है?", ["सृजन", "स्मरण", "समझना", "अनुप्रयोग"], "संशोधित वर्गीकरण में निम्न से उच्च क्रम: याद करना, समझना, लागू करना, विश्लेषण, मूल्यांकन, सृजन।"]),
  q(0, "pedagogy", "inclusive-education", "M", 2,
    ["Which of the following best describes inclusive education in a school?", ["Teaching only gifted children", "Separate schools for disabled children", "Teaching all children together in the same classroom", "Teaching only in the mother tongue"], "Inclusive education brings children of all abilities and backgrounds into the same regular classroom with suitable support."],
    ["विद्यालय में समावेशी शिक्षा का सबसे उपयुक्त वर्णन कौन-सा है?", ["केवल प्रतिभाशाली बच्चों को पढ़ाना", "दिव्यांग बच्चों के लिए अलग विद्यालय", "सभी बच्चों को एक ही कक्षा में साथ पढ़ाना", "केवल मातृभाषा में पढ़ाना"], "समावेशी शिक्षा में सभी क्षमताओं और पृष्ठभूमि के बच्चों को उचित सहायता के साथ एक ही सामान्य कक्षा में पढ़ाया जाता है।"]),
  q(0, "pedagogy", "child-development", "E", 2,
    ["A good teacher should mainly:", ["Punish wrong answers", "Only complete the syllabus", "Motivate students and encourage curiosity", "Avoid student questions"], "Motivation and encouraging curiosity make learning effective and long-lasting."],
    ["एक अच्छे शिक्षक को मुख्यतः क्या करना चाहिए?", ["गलत उत्तर पर दंड देना", "केवल पाठ्यक्रम पूरा करना", "विद्यार्थियों को प्रेरित करना और जिज्ञासा बढ़ाना", "प्रश्नों से बचना"], "प्रेरणा और जिज्ञासा सीखने को प्रभावी और स्थायी बनाती हैं।"]),

  // ───────── Section 1: Himachal GK ─────────
  q(1, "hp-gk", "geography", "M", 1,
    ["The highest peak of Himachal Pradesh is:", ["Shilla", "Reo Purgyil", "Indrasan", "Mulkila"], "Reo Purgyil (about 6,816 m) in Kinnaur is the highest peak of Himachal Pradesh."],
    ["हिमाचल प्रदेश की सबसे ऊँची चोटी कौन-सी है?", ["शिल्ला", "रियो पुर्गिल", "इंद्रासन", "मुलकिला"], "किन्नौर में रियो पुर्गिल (लगभग 6,816 मी) हिमाचल की सबसे ऊँची चोटी है।"]),
  q(1, "hp-gk", "rivers-lakes", "M", 0,
    ["The Chandra and Bhaga rivers meet at Tandi to form the:", ["Chenab", "Ravi", "Beas", "Yamuna"], "The Chandra and Bhaga join at Tandi in Lahaul to form the Chandrabhaga, which is called the Chenab downstream."],
    ["चंद्रा और भागा नदियाँ तांदी में मिलकर किस नदी का निर्माण करती हैं?", ["चिनाब", "रावी", "ब्यास", "यमुना"], "चंद्रा और भागा लाहौल के तांदी में मिलकर चंद्रभागा बनाती हैं, जिसे आगे चिनाब कहा जाता है।"]),
  q(1, "hp-gk", "culture-festivals", "E", 3,
    ["The International Kullu Dussehra is held at:", ["Ridge, Shimla", "Paddal Ground, Mandi", "Chaugan, Chamba", "Dhalpur Maidan"], "The Kullu Dussehra is held at Dhalpur Maidan, beginning on Vijayadashami, when other festivals end."],
    ["अंतर्राष्ट्रीय कुल्लू दशहरा कहाँ मनाया जाता है?", ["रिज, शिमला", "पड्डल मैदान, मंडी", "चौगान, चंबा", "ढालपुर मैदान"], "कुल्लू दशहरा विजयादशमी से ढालपुर मैदान में शुरू होता है, जब अन्य स्थानों पर दशहरा समाप्त होता है।"]),

  // ───────── Section 2: English ─────────
  q(2, "english", "grammar", "M", 2,
    ["Choose the correct preposition: The cat jumped ____ the wall.", ["on", "at", "over", "by"], "'Jumped over the wall' is the natural, correct usage."],
    ["सही पूर्वसर्ग चुनिए: The cat jumped ____ the wall.", ["on", "at", "over", "by"], "'Jumped over the wall' सही प्रयोग है।"]),
  q(2, "english", "one-word", "M", 1,
    ["One word for 'a person who writes the life story of another':", ["Autobiographer", "Biographer", "Novelist", "Historian"], "A biographer writes the life story of another person; an autobiographer writes about their own life."],
    ["'दूसरे व्यक्ति की जीवनी लिखने वाला' के लिए एक शब्द:", ["Autobiographer", "Biographer", "Novelist", "Historian"], "Biographer दूसरे की जीवनी लिखता है; autobiographer अपनी स्वयं की।"]),
  q(2, "english", "error-spotting", "M", 0,
    ["Identify the error: \"He don't know the answer.\"", ["don't", "He", "know", "answer"], "A singular subject 'He' takes 'doesn't', so 'don't' is the error."],
    ["त्रुटि पहचानिए: \"He don't know the answer.\"", ["don't", "He", "know", "answer"], "एकवचन कर्ता 'He' के साथ 'doesn't' आता है, इसलिए 'don't' गलत है।"]),

  // ───────── Section 3: Hindi ─────────
  q(3, "hindi", "alankar-ras", "M", 1,
    ["'चरण कमल बंदौं हरि राई' में कौन-सा अलंकार है?", ["उपमा", "रूपक", "अनुप्रास", "श्लेष"], "चरणों को ही कमल कह दिया गया है (उपमेय-उपमान में अभेद), इसलिए रूपक अलंकार है।"],
    ["'चरण कमल बंदौं हरि राई' में कौन-सा अलंकार है?", ["उपमा", "रूपक", "अनुप्रास", "श्लेष"], "चरणों को ही कमल कह दिया गया है (उपमेय-उपमान में अभेद), इसलिए रूपक अलंकार है।"]),
  q(3, "hindi", "shuddh-vartani", "E", 3,
    ["शुद्ध शब्द चुनिए:", ["आर्शीवाद", "आशिर्वाद", "आर्शिवाद", "आशीर्वाद"], "सही वर्तनी 'आशीर्वाद' है।"],
    ["शुद्ध शब्द चुनिए:", ["आर्शीवाद", "आशिर्वाद", "आर्शिवाद", "आशीर्वाद"], "सही वर्तनी 'आशीर्वाद' है।"]),

  // ───────── Section 4: Reasoning ─────────
  q(4, "reasoning", "analogy", "E", 2,
    ["Book : Reading :: Song : ?", ["Writing", "Seeing", "Listening", "Smelling"], "A book is meant for reading, and a song is meant for listening."],
    ["पुस्तक : पढ़ना :: गीत : ?", ["लिखना", "देखना", "सुनना", "सूँघना"], "पुस्तक पढ़ने के लिए है और गीत सुनने के लिए।"]),
  q(4, "reasoning", "ranking", "M", 1,
    ["In a row of 30 students, Ravi is 12th from the left. What is his position from the right?", ["17th", "19th", "18th", "20th"], "Position from right = 30 − 12 + 1 = 19th."],
    ["30 विद्यार्थियों की पंक्ति में रवि बाएँ से 12वें स्थान पर है। दाएँ से उसका स्थान कौन-सा है?", ["17वाँ", "19वाँ", "18वाँ", "20वाँ"], "दाएँ से स्थान = 30 − 12 + 1 = 19वाँ।"]),
];
