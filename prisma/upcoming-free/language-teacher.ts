// HPRCA Language Teacher Free Mock 1 — 15 questions (Hindi 5, English 3, Pedagogy 4, Himachal GK 3). Language-specific papers differ, so this covers the common Hindi/English/pedagogy base.

import { q, type PatwariQuestion } from "../patwari/types";

export const languageTeacherMock1: PatwariQuestion[] = [
  // ───────── Section 0: Hindi ─────────
  q(0, "hindi", "vyakaran", "M", 2,
    ["'कामायनी' महाकाव्य के रचयिता कौन हैं?", ["सुमित्रानंदन पंत", "महादेवी वर्मा", "जयशंकर प्रसाद", "रामधारी सिंह दिनकर"], "'कामायनी' जयशंकर प्रसाद की रचना है और छायावाद का प्रमुख महाकाव्य मानी जाती है।"],
    ["'कामायनी' महाकाव्य के रचयिता कौन हैं?", ["सुमित्रानंदन पंत", "महादेवी वर्मा", "जयशंकर प्रसाद", "रामधारी सिंह दिनकर"], "'कामायनी' जयशंकर प्रसाद की रचना है और छायावाद का प्रमुख महाकाव्य मानी जाती है।"]),
  q(0, "hindi", "sandhi-samas", "M", 1,
    ["'राजपुत्र' में कौन-सा समास है?", ["द्वंद्व समास", "तत्पुरुष समास", "बहुव्रीहि समास", "द्विगु समास"], "राजा का पुत्र = राजपुत्र; षष्ठी विभक्ति के लोप से बना यह तत्पुरुष समास है।"],
    ["'राजपुत्र' में कौन-सा समास है?", ["द्वंद्व समास", "तत्पुरुष समास", "बहुव्रीहि समास", "द्विगु समास"], "राजा का पुत्र = राजपुत्र; षष्ठी विभक्ति के लोप से बना यह तत्पुरुष समास है।"]),
  q(0, "hindi", "shabdavali", "E", 0,
    ["'विशेषण' किसकी विशेषता बताता है?", ["संज्ञा या सर्वनाम की", "क्रिया की", "अव्यय की", "कारक की"], "विशेषण संज्ञा या सर्वनाम की विशेषता बताने वाला शब्द है।"],
    ["'विशेषण' किसकी विशेषता बताता है?", ["संज्ञा या सर्वनाम की", "क्रिया की", "अव्यय की", "कारक की"], "विशेषण संज्ञा या सर्वनाम की विशेषता बताने वाला शब्द है।"]),
  q(0, "hindi", "vyakaran", "E", 3,
    ["हिंदी दिवस प्रतिवर्ष कब मनाया जाता है?", ["10 जनवरी", "26 जनवरी", "15 अगस्त", "14 सितंबर"], "14 सितंबर 1949 को हिंदी को राजभाषा का दर्जा मिला, इसलिए हिंदी दिवस 14 सितंबर को मनाया जाता है।"],
    ["हिंदी दिवस प्रतिवर्ष कब मनाया जाता है?", ["10 जनवरी", "26 जनवरी", "15 अगस्त", "14 सितंबर"], "14 सितंबर 1949 को हिंदी को राजभाषा का दर्जा मिला, इसलिए हिंदी दिवस 14 सितंबर को मनाया जाता है।"]),
  q(0, "hindi", "alankar-ras", "M", 1,
    ["'पीपर पात सरिस मन डोला' में कौन-सा अलंकार है?", ["रूपक", "उपमा", "यमक", "अतिशयोक्ति"], "मन की तुलना पीपल के पत्ते से 'सरिस' (समान) वाचक शब्द के साथ की गई है, इसलिए उपमा अलंकार है।"],
    ["'पीपर पात सरिस मन डोला' में कौन-सा अलंकार है?", ["रूपक", "उपमा", "यमक", "अतिशयोक्ति"], "मन की तुलना पीपल के पत्ते से 'सरिस' (समान) वाचक शब्द के साथ की गई है, इसलिए उपमा अलंकार है।"]),

  // ───────── Section 1: English ─────────
  q(1, "english", "grammar", "E", 0,
    ["Choose the correct article: She is ____ honest girl.", ["an", "a", "the", "no article"], "'Honest' begins with a vowel sound (the h is silent), so 'an' is used."],
    ["सही आर्टिकल चुनिए: She is ____ honest girl.", ["an", "a", "the", "no article"], "'Honest' का उच्चारण स्वर ध्वनि से शुरू होता है (h मौन है), इसलिए 'an' आता है।"]),
  q(1, "english", "idioms", "M", 2,
    ["The idiom 'a piece of cake' means:", ["A birthday gift", "A small meal", "Something very easy", "A sweet dish"], "'A piece of cake' means something that is very easy to do."],
    ["मुहावरे 'a piece of cake' का अर्थ है:", ["जन्मदिन का उपहार", "छोटा भोजन", "बहुत आसान कार्य", "मिठाई"], "'A piece of cake' का अर्थ है बहुत आसान काम।"]),
  q(1, "english", "vocabulary", "M", 3,
    ["Choose the synonym of 'BENEVOLENT'.", ["Cruel", "Selfish", "Careless", "Kind"], "'Benevolent' means well-meaning and kind."],
    ["'BENEVOLENT' का समानार्थी चुनिए।", ["Cruel", "Selfish", "Careless", "Kind"], "'Benevolent' का अर्थ है परोपकारी और दयालु।"]),

  // ───────── Section 2: Pedagogy ─────────
  q(2, "pedagogy", "learning-theories", "M", 1,
    ["The 'Direct Method' of teaching a language emphasises:", ["Translation into the mother tongue", "Using the target language directly, without translation", "Only grammar rules", "Only writing"], "The Direct Method avoids translation and teaches the target language through speaking and direct association with objects and actions."],
    ["भाषा शिक्षण की 'प्रत्यक्ष विधि' किस पर बल देती है?", ["मातृभाषा में अनुवाद", "अनुवाद के बिना लक्ष्य भाषा का सीधा प्रयोग", "केवल व्याकरण नियम", "केवल लेखन"], "प्रत्यक्ष विधि में अनुवाद से बचकर बोलचाल और वस्तुओं/क्रियाओं से सीधा संबंध जोड़कर भाषा सिखाई जाती है।"]),
  q(2, "pedagogy", "child-development", "E", 3,
    ["The correct order of language skills a child naturally acquires is:", ["Reading, writing, speaking, listening", "Writing, reading, listening, speaking", "Speaking, listening, writing, reading", "Listening, speaking, reading, writing"], "Children first listen, then speak, and later learn to read and write (LSRW)."],
    ["बच्चे द्वारा भाषा कौशल सीखने का स्वाभाविक क्रम है:", ["पढ़ना, लिखना, बोलना, सुनना", "लिखना, पढ़ना, सुनना, बोलना", "बोलना, सुनना, लिखना, पढ़ना", "सुनना, बोलना, पढ़ना, लिखना"], "बच्चे पहले सुनते हैं, फिर बोलते हैं, उसके बाद पढ़ना और लिखना सीखते हैं (LSRW)।"]),
  q(2, "pedagogy", "learning-theories", "M", 0,
    ["The 'Zone of Proximal Development' concept is associated with:", ["Vygotsky", "Skinner", "Freud", "Maslow"], "Lev Vygotsky introduced the Zone of Proximal Development in his sociocultural theory."],
    ["'निकटतम विकास का क्षेत्र' की अवधारणा किससे संबंधित है?", ["वाइगोत्स्की", "स्किनर", "फ्रायड", "मैस्लो"], "लेव वाइगोत्स्की ने अपने सामाजिक-सांस्कृतिक सिद्धांत में यह अवधारणा दी।"]),
  q(2, "pedagogy", "inclusive-education", "E", 2,
    ["The medium of instruction in the early years is best the child's:", ["Foreign language", "Classical language", "Mother tongue", "Link language"], "Learning is most effective in the child's mother tongue or home language in the early years."],
    ["प्रारंभिक वर्षों में शिक्षण का सर्वश्रेष्ठ माध्यम बच्चे की कौन-सी भाषा है?", ["विदेशी भाषा", "शास्त्रीय भाषा", "मातृभाषा", "संपर्क भाषा"], "शुरुआती वर्षों में बच्चे की मातृभाषा या घर की भाषा में सीखना सबसे प्रभावी होता है।"]),

  // ───────── Section 3: Himachal GK ─────────
  q(3, "hp-gk", "culture-festivals", "E", 1,
    ["The official language of Himachal Pradesh is:", ["Pahari", "Hindi", "Punjabi", "Urdu"], "Hindi is the official language of Himachal Pradesh; Sanskrit was made the second official language in 2019."],
    ["हिमाचल प्रदेश की राजभाषा कौन-सी है?", ["पहाड़ी", "हिंदी", "पंजाबी", "उर्दू"], "हिंदी हिमाचल की राजभाषा है; 2019 में संस्कृत को दूसरी राजभाषा का दर्जा दिया गया।"]),
  q(3, "hp-gk", "culture-festivals", "M", 3,
    ["Which dance is performed by the Gaddi community during festivals?", ["Garba", "Bihu", "Bhangra", "Nati"], "Nati is the best-known folk dance of Himachal and is performed by the hill communities, including the Gaddis, at fairs and festivals."],
    ["गद्दी समुदाय द्वारा उत्सवों में कौन-सा नृत्य किया जाता है?", ["गरबा", "बिहू", "भांगड़ा", "नाटी"], "नाटी हिमाचल का प्रसिद्ध लोकनृत्य है, जिसे गद्दी सहित पहाड़ी समुदाय मेलों और उत्सवों में करते हैं।"]),
  q(3, "hp-gk", "culture-festivals", "M", 2,
    ["The Kangra Painting school is most famous for its theme of:", ["War scenes", "Animal hunting", "Romantic and Radha-Krishna themes", "Court proceedings"], "Kangra miniature painting is known for delicate lyrical depictions of Radha-Krishna and romantic themes."],
    ["कांगड़ा चित्रकला शैली किस विषय के लिए सबसे प्रसिद्ध है?", ["युद्ध दृश्य", "शिकार", "प्रेम और राधा-कृष्ण के विषय", "दरबारी कार्यवाही"], "कांगड़ा लघुचित्र शैली राधा-कृष्ण और प्रेम विषयों के कोमल, काव्यात्मक चित्रण के लिए जानी जाती है।"]),
];
