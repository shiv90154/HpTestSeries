// HP Judicial Services Free Mock 1 — 15 questions (Constitution 4, Criminal Law 4, Civil Law, Contract & Evidence 4, General Knowledge & English 3).
// Written around settled principles, not section numbers, because the criminal codes were replaced in July 2024.

import { q, type PatwariQuestion } from "../patwari/types";

export const judicialServicesMock1: PatwariQuestion[] = [
  // ───────── Section 0: Constitutional Law ─────────
  q(0, "law", "constitution", "E", 1,
    ["Which Article of the Constitution guarantees 'Equality before law'?", ["Article 12", "Article 14", "Article 19", "Article 21"], "Article 14 guarantees equality before the law and the equal protection of the laws."],
    ["संविधान का कौन-सा अनुच्छेद 'विधि के समक्ष समता' की गारंटी देता है?", ["अनुच्छेद 12", "अनुच्छेद 14", "अनुच्छेद 19", "अनुच्छेद 21"], "अनुच्छेद 14 विधि के समक्ष समता और विधियों के समान संरक्षण की गारंटी देता है।"]),
  q(0, "law", "constitution", "M", 2,
    ["Dr. B.R. Ambedkar described which Article as the 'heart and soul' of the Constitution?", ["Article 14", "Article 21", "Article 32", "Article 368"], "Article 32, the right to move the Supreme Court for enforcement of fundamental rights, was called the heart and soul of the Constitution."],
    ["डॉ. बी.आर. अंबेडकर ने संविधान का 'हृदय और आत्मा' किस अनुच्छेद को कहा?", ["अनुच्छेद 14", "अनुच्छेद 21", "अनुच्छेद 32", "अनुच्छेद 368"], "मौलिक अधिकारों के प्रवर्तन के लिए सर्वोच्च न्यायालय जाने के अधिकार वाले अनुच्छेद 32 को संविधान का हृदय और आत्मा कहा गया।"]),
  q(0, "law", "constitution", "M", 0,
    ["Which Article empowers the High Courts to issue writs?", ["Article 226", "Article 136", "Article 143", "Article 245"], "Article 226 empowers High Courts to issue writs for enforcing fundamental rights and for any other purpose."],
    ["किस अनुच्छेद के अंतर्गत उच्च न्यायालयों को रिट जारी करने की शक्ति प्राप्त है?", ["अनुच्छेद 226", "अनुच्छेद 136", "अनुच्छेद 143", "अनुच्छेद 245"], "अनुच्छेद 226 उच्च न्यायालयों को मौलिक अधिकारों के प्रवर्तन तथा अन्य प्रयोजनों हेतु रिट जारी करने की शक्ति देता है।"]),
  q(0, "law", "constitution", "M", 3,
    ["The right to education for children aged 6 to 14 years was made a fundamental right (Article 21A) by the:", ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"], "The 86th Constitutional Amendment Act, 2002 inserted Article 21A."],
    ["6 से 14 वर्ष के बच्चों के शिक्षा के अधिकार को मौलिक अधिकार (अनुच्छेद 21A) किस संशोधन द्वारा बनाया गया?", ["42वाँ संशोधन", "44वाँ संशोधन", "73वाँ संशोधन", "86वाँ संशोधन"], "86वें संविधान संशोधन अधिनियम, 2002 ने अनुच्छेद 21A जोड़ा।"]),

  // ───────── Section 1: Criminal Law ─────────
  q(1, "law", "criminal-law", "E", 1,
    ["The Bharatiya Nyaya Sanhita, 2023 replaced which earlier law?", ["Code of Criminal Procedure, 1973", "Indian Penal Code, 1860", "Indian Evidence Act, 1872", "Code of Civil Procedure, 1908"], "The Bharatiya Nyaya Sanhita replaced the Indian Penal Code, 1860, from 1 July 2024."],
    ["भारतीय न्याय संहिता, 2023 ने किस पूर्ववर्ती कानून का स्थान लिया?", ["दंड प्रक्रिया संहिता, 1973", "भारतीय दंड संहिता, 1860", "भारतीय साक्ष्य अधिनियम, 1872", "सिविल प्रक्रिया संहिता, 1908"], "भारतीय न्याय संहिता ने 1 जुलाई 2024 से भारतीय दंड संहिता, 1860 का स्थान लिया।"]),
  q(1, "law", "criminal-law", "M", 2,
    ["The Bharatiya Nagarik Suraksha Sanhita, 2023 replaced the:", ["Indian Evidence Act", "Indian Penal Code", "Code of Criminal Procedure, 1973", "Arms Act"], "The BNSS replaced the Code of Criminal Procedure, 1973 and governs criminal procedure."],
    ["भारतीय नागरिक सुरक्षा संहिता, 2023 ने किसका स्थान लिया?", ["भारतीय साक्ष्य अधिनियम", "भारतीय दंड संहिता", "दंड प्रक्रिया संहिता, 1973", "शस्त्र अधिनियम"], "BNSS ने दंड प्रक्रिया संहिता, 1973 का स्थान लिया और आपराधिक प्रक्रिया को शासित करती है।"]),
  q(1, "law", "criminal-law", "M", 0,
    ["The legal term 'mens rea' means:", ["Guilty mind", "Guilty act", "Innocent act", "Burden of proof"], "Mens rea is the guilty mind or criminal intention, while actus reus is the guilty act."],
    ["विधिक शब्द 'मेन्स रिया' का अर्थ है:", ["दोषी मन (आपराधिक आशय)", "दोषपूर्ण कृत्य", "निर्दोष कृत्य", "सबूत का भार"], "मेन्स रिया दोषी मन या आपराधिक आशय है, जबकि एक्टस रियस दोषपूर्ण कृत्य है।"]),
  q(1, "law", "criminal-law", "M", 3,
    ["A person is presumed innocent until proven guilty. This principle in criminal law places the burden of proof on:", ["The accused", "The court", "The defence witnesses", "The prosecution"], "In criminal trials the prosecution must prove the guilt of the accused beyond reasonable doubt."],
    ["आपराधिक विधि का सिद्धांत है कि दोष सिद्ध होने तक व्यक्ति निर्दोष माना जाता है। इसमें सबूत का भार किस पर होता है?", ["अभियुक्त", "न्यायालय", "बचाव पक्ष के गवाह", "अभियोजन"], "आपराधिक विचारण में अभियोजन को अभियुक्त का दोष युक्तियुक्त संदेह से परे सिद्ध करना होता है।"]),

  // ───────── Section 2: Civil Law, Contract & Evidence ─────────
  q(2, "law", "civil-law", "E", 2,
    ["The Indian Contract Act was enacted in:", ["1860", "1908", "1872", "1950"], "The Indian Contract Act was enacted in 1872."],
    ["भारतीय संविदा अधिनियम कब पारित हुआ?", ["1860", "1908", "1872", "1950"], "भारतीय संविदा अधिनियम 1872 में पारित हुआ।"]),
  q(2, "law", "civil-law", "M", 1,
    ["An agreement with a minor is, in Indian law, generally:", ["Valid", "Void ab initio", "Voidable at the option of the minor", "Enforceable by the minor against the other party"], "As held in Mohori Bibee v. Dharmodas Ghose, an agreement with a minor is void ab initio."],
    ["भारतीय विधि में अवयस्क के साथ किया गया करार सामान्यतः होता है:", ["वैध", "प्रारंभ से ही शून्य", "अवयस्क के विकल्प पर शून्यकरणीय", "अवयस्क द्वारा दूसरे पक्ष के विरुद्ध प्रवर्तनीय"], "मोहोरी बीबी बनाम धर्मदास घोष में निर्णय हुआ कि अवयस्क के साथ करार प्रारंभ से ही शून्य होता है।"]),
  q(2, "law", "civil-law", "M", 3,
    ["The Code of Civil Procedure was enacted in the year:", ["1860", "1872", "1973", "1908"], "The Code of Civil Procedure was enacted in 1908 and governs the procedure in civil courts."],
    ["सिविल प्रक्रिया संहिता किस वर्ष पारित हुई?", ["1860", "1872", "1973", "1908"], "सिविल प्रक्रिया संहिता 1908 में पारित हुई और दीवानी न्यायालयों की प्रक्रिया को शासित करती है।"]),
  q(2, "law", "civil-law", "M", 0,
    ["Under evidence law, a confession made by an accused to a police officer is generally:", ["Not admissible against the accused", "Fully admissible", "Admissible only in civil cases", "Admissible if signed"], "A confession made to a police officer is, as a general rule, inadmissible against the accused, subject to narrow exceptions."],
    ["साक्ष्य विधि में अभियुक्त द्वारा पुलिस अधिकारी के समक्ष की गई संस्वीकृति सामान्यतः होती है:", ["अभियुक्त के विरुद्ध अग्राह्य", "पूर्णतः ग्राह्य", "केवल दीवानी मामलों में ग्राह्य", "हस्ताक्षरित हो तो ग्राह्य"], "सामान्य नियम के अनुसार पुलिस अधिकारी के समक्ष की गई संस्वीकृति अभियुक्त के विरुद्ध अग्राह्य है, कुछ सीमित अपवादों को छोड़कर।"]),

  // ───────── Section 3: General Knowledge & English ─────────
  q(3, "english", "vocabulary", "M", 2,
    ["The Latin maxim 'Audi alteram partem' means:", ["Let the buyer beware", "No one is above the law", "Hear the other side", "The thing speaks for itself"], "'Audi alteram partem' is a principle of natural justice: no one should be condemned unheard."],
    ["लैटिन सूक्ति 'ऑडी अल्टरम पार्टेम' का अर्थ है:", ["क्रेता सावधान रहे", "कोई विधि से ऊपर नहीं", "दूसरे पक्ष को भी सुनो", "वस्तु स्वयं बोलती है"], "'ऑडी अल्टरम पार्टेम' नैसर्गिक न्याय का सिद्धांत है: किसी को बिना सुने दंडित नहीं किया जाना चाहिए।"]),
  q(3, "english", "vocabulary", "M", 1,
    ["The term 'ultra vires' means:", ["Within powers", "Beyond powers", "By consent", "Without cause"], "'Ultra vires' means beyond the legal power or authority of a person or body."],
    ["'अल्ट्रा वायरस' (ultra vires) शब्द का अर्थ है:", ["शक्तियों के भीतर", "शक्तियों से परे", "सहमति से", "बिना कारण"], "'अल्ट्रा वायरस' का अर्थ है किसी व्यक्ति या निकाय की विधिक शक्ति या प्राधिकार से परे।"]),
  q(3, "hp-gk", "polity-administration", "E", 3,
    ["Where is the High Court of Himachal Pradesh situated?", ["Dharamshala", "Mandi", "Solan", "Shimla"], "The High Court of Himachal Pradesh is situated at Shimla."],
    ["हिमाचल प्रदेश उच्च न्यायालय कहाँ स्थित है?", ["धर्मशाला", "मंडी", "सोलन", "शिमला"], "हिमाचल प्रदेश उच्च न्यायालय शिमला में स्थित है।"]),
];
