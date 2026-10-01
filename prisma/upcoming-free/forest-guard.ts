// HPRCA Forest Guard Free Mock 1 — 15 questions (Himachal GK 4, General Studies & Environment 4, Reasoning 3, Maths 2, English 1, Hindi 1).

import { q, type PatwariQuestion } from "../patwari/types";

export const forestGuardMock1: PatwariQuestion[] = [
  // ───────── Section 0: Himachal GK ─────────
  q(0, "hp-gk", "geography", "E", 1,
    ["Which is the state tree of Himachal Pradesh?", ["Chir pine", "Deodar", "Oak", "Walnut"], "The Deodar (Cedrus deodara) is the state tree of Himachal Pradesh."],
    ["हिमाचल प्रदेश का राज्य वृक्ष कौन-सा है?", ["चीड़", "देवदार", "बांज (ओक)", "अखरोट"], "देवदार (सीडरस देओदारा) हिमाचल प्रदेश का राज्य वृक्ष है।"]),
  q(0, "hp-gk", "geography", "M", 2,
    ["The Great Himalayan National Park, a UNESCO World Heritage Site, is located in which district?", ["Chamba", "Kinnaur", "Kullu", "Shimla"], "The Great Himalayan National Park lies in Kullu district and was inscribed as a World Heritage Site in 2014."],
    ["यूनेस्को विश्व धरोहर स्थल 'ग्रेट हिमालयन नेशनल पार्क' किस जिले में स्थित है?", ["चंबा", "किन्नौर", "कुल्लू", "शिमला"], "ग्रेट हिमालयन नेशनल पार्क कुल्लू जिले में है और इसे 2014 में विश्व धरोहर स्थल घोषित किया गया।"]),
  q(0, "hp-gk", "geography", "M", 0,
    ["The Western Tragopan, locally called 'Jujurana', is the state ____ of Himachal Pradesh.", ["bird", "animal", "flower", "tree"], "The Western Tragopan (Jujurana) is the state bird of Himachal Pradesh."],
    ["पश्चिमी ट्रैगोपैन, जिसे स्थानीय भाषा में 'जुजुराना' कहते हैं, हिमाचल प्रदेश का राज्य ____ है।", ["पक्षी", "पशु", "पुष्प", "वृक्ष"], "पश्चिमी ट्रैगोपैन (जुजुराना) हिमाचल प्रदेश का राज्य पक्षी है।"]),
  q(0, "hp-gk", "geography", "M", 3,
    ["Pin Valley National Park, known for the snow leopard and ibex, lies in:", ["Kangra", "Mandi", "Sirmaur", "Lahaul & Spiti"], "Pin Valley National Park is a cold-desert park in the Spiti area of Lahaul & Spiti district."],
    ["हिम तेंदुए और आइबेक्स के लिए प्रसिद्ध पिन वैली नेशनल पार्क कहाँ स्थित है?", ["कांगड़ा", "मंडी", "सिरमौर", "लाहौल-स्पीति"], "पिन वैली नेशनल पार्क लाहौल-स्पीति जिले के स्पीति क्षेत्र में स्थित एक शीत मरुस्थलीय पार्क है।"]),

  // ───────── Section 1: General Studies & Environment ─────────
  q(1, "general-studies", "indian-geography", "E", 2,
    ["World Environment Day is celebrated every year on:", ["22 April", "22 March", "5 June", "16 September"], "World Environment Day is observed on 5 June."],
    ["विश्व पर्यावरण दिवस प्रतिवर्ष कब मनाया जाता है?", ["22 अप्रैल", "22 मार्च", "5 जून", "16 सितंबर"], "विश्व पर्यावरण दिवस 5 जून को मनाया जाता है।"]),
  q(1, "general-studies", "indian-geography", "M", 1,
    ["The Chipko Movement was started to protect:", ["Rivers", "Trees", "Tigers", "Wetlands"], "The Chipko Movement of the 1970s was a non-violent movement in which villagers hugged trees to stop their felling."],
    ["चिपको आंदोलन किसकी रक्षा के लिए शुरू हुआ था?", ["नदियों", "वृक्षों", "बाघों", "आर्द्रभूमियों"], "1970 के दशक का चिपको आंदोलन अहिंसक आंदोलन था जिसमें ग्रामीणों ने पेड़ों से लिपटकर उनकी कटाई रोकी।"]),
  q(1, "general-studies", "indian-polity", "M", 0,
    ["The Wildlife (Protection) Act was enacted in India in:", ["1972", "1980", "1986", "1992"], "The Wildlife (Protection) Act was passed in 1972; the Forest (Conservation) Act followed in 1980."],
    ["भारत में वन्यजीव (संरक्षण) अधिनियम कब पारित हुआ?", ["1972", "1980", "1986", "1992"], "वन्यजीव (संरक्षण) अधिनियम 1972 में पारित हुआ; वन (संरक्षण) अधिनियम 1980 में आया।"]),
  q(1, "general-studies", "general-science", "E", 3,
    ["Which layer of the atmosphere contains the ozone layer?", ["Troposphere", "Mesosphere", "Exosphere", "Stratosphere"], "The ozone layer lies in the stratosphere and absorbs harmful ultraviolet radiation."],
    ["वायुमंडल की किस परत में ओज़ोन परत पाई जाती है?", ["क्षोभमंडल", "मध्यमंडल", "बहिर्मंडल", "समतापमंडल"], "ओज़ोन परत समतापमंडल में होती है और हानिकारक पराबैंगनी किरणों को अवशोषित करती है।"]),

  // ───────── Section 2: Reasoning ─────────
  q(2, "reasoning", "series", "M", 2,
    ["Find the next number: 3, 6, 11, 18, 27, ?", ["36", "37", "38", "40"], "The differences are 3, 5, 7, 9, so the next difference is 11 and the next number is 27 + 11 = 38."],
    ["अगली संख्या ज्ञात कीजिए: 3, 6, 11, 18, 27, ?", ["36", "37", "38", "40"], "अंतर 3, 5, 7, 9 हैं, अगला अंतर 11 होगा, इसलिए अगली संख्या 27 + 11 = 38 है।"]),
  q(2, "reasoning", "odd-one-out", "E", 1,
    ["Find the odd one out: Mango, Apple, Potato, Banana", ["Mango", "Potato", "Apple", "Banana"], "Mango, apple and banana are fruits, whereas potato is a vegetable (a tuber)."],
    ["विषम चुनिए: आम, सेब, आलू, केला", ["आम", "आलू", "सेब", "केला"], "आम, सेब और केला फल हैं, जबकि आलू एक सब्जी (कंद) है।"]),
  q(2, "reasoning", "direction-sense", "M", 0,
    ["A forest guard walks 5 km north, turns right and walks 3 km, then turns right again and walks 5 km. In which direction is he now from the starting point?", ["East", "West", "North", "South"], "He goes north, then east, then south, so he ends 3 km due east of the starting point."],
    ["एक वनरक्षक 5 किमी उत्तर चलता है, दाएँ मुड़कर 3 किमी चलता है, फिर दाएँ मुड़कर 5 किमी चलता है। अब वह आरंभिक बिंदु से किस दिशा में है?", ["पूर्व", "पश्चिम", "उत्तर", "दक्षिण"], "वह पहले उत्तर, फिर पूर्व, फिर दक्षिण चलता है, इसलिए आरंभिक बिंदु से 3 किमी ठीक पूर्व में पहुँचता है।"]),

  // ───────── Section 3: Maths ─────────
  q(3, "quant", "interest", "E", 1,
    ["What is the simple interest on Rs 5,000 at 8% per annum for 3 years?", ["Rs 1,000", "Rs 1,200", "Rs 1,400", "Rs 1,600"], "SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = Rs 1,200."],
    ["5,000 रुपये पर 8% वार्षिक दर से 3 वर्ष का साधारण ब्याज कितना होगा?", ["1,000 रुपये", "1,200 रुपये", "1,400 रुपये", "1,600 रुपये"], "साधारण ब्याज = मूलधन × दर × समय / 100 = 5000 × 8 × 3 / 100 = 1,200 रुपये।"]),
  q(3, "quant", "profit-loss", "M", 3,
    ["An article bought for Rs 400 is sold for Rs 460. What is the profit percent?", ["10%", "12%", "12.5%", "15%"], "Profit = 460 − 400 = 60, and profit % = 60/400 × 100 = 15%."],
    ["400 रुपये में खरीदी गई वस्तु 460 रुपये में बेची गई। लाभ प्रतिशत कितना है?", ["10%", "12%", "12.5%", "15%"], "लाभ = 460 − 400 = 60, इसलिए लाभ % = 60/400 × 100 = 15%।"]),

  // ───────── Section 4: English ─────────
  q(4, "english", "synonyms-antonyms", "E", 2,
    ["Choose the word opposite in meaning to 'ANCIENT'.", ["Old", "Historic", "Modern", "Classical"], "'Ancient' means very old, so its antonym is 'modern'."],
    ["'ANCIENT' का विलोम शब्द चुनिए।", ["Old", "Historic", "Modern", "Classical"], "'Ancient' का अर्थ बहुत पुराना है, इसलिए इसका विलोम 'Modern' है।"]),

  // ───────── Section 5: Hindi ─────────
  q(5, "hindi", "paryay-vilom", "E", 0,
    ["'वन' का पर्यायवाची शब्द है:", ["कानन", "सरिता", "गगन", "सागर"], "'कानन' वन का पर्यायवाची है; सरिता = नदी, गगन = आकाश, सागर = समुद्र।"],
    ["'वन' का पर्यायवाची शब्द है:", ["कानन", "सरिता", "गगन", "सागर"], "'कानन' वन का पर्यायवाची है; सरिता = नदी, गगन = आकाश, सागर = समुद्र।"]),
];
