// HPRCA Junior Engineer (Civil) Free Mock 1 — 15 questions (Building Materials & Construction 4, Structures 4, Soil, Fluids & Hydrology 3, Surveying & Estimation 2, Himachal GK 2).
// The real papers are discipline-specific (civil, electrical, mechanical); this mock covers the civil stream.

import { q, type PatwariQuestion } from "../patwari/types";

export const juniorEngineerMock1: PatwariQuestion[] = [
  // ───────── Section 0: Building Materials & Construction ─────────
  q(0, "civil-engineering", "building-materials", "E", 2,
    ["The main ingredients of Ordinary Portland Cement are:", ["Sand and gravel", "Gypsum and water", "Lime and clay minerals (calcareous and argillaceous)", "Iron and carbon"], "Cement is made by burning limestone (calcareous) with clay (argillaceous) materials and grinding the clinker with a little gypsum."],
    ["साधारण पोर्टलैंड सीमेंट के मुख्य घटक हैं:", ["रेत और बजरी", "जिप्सम और पानी", "चूना और मिट्टी के खनिज", "लोहा और कार्बन"], "चूना-पत्थर (कैल्शियमयुक्त) और मिट्टी (अल्युमिनायुक्त) को जलाकर क्लिंकर बनाया जाता है और उसे थोड़े जिप्सम के साथ पीसा जाता है।"]),
  q(0, "civil-engineering", "building-materials", "M", 1,
    ["Gypsum is added to cement clinker mainly to:", ["Increase strength", "Control the setting time", "Reduce cost only", "Improve colour"], "Gypsum retards the setting of cement by controlling the rapid hydration of tricalcium aluminate."],
    ["सीमेंट क्लिंकर में जिप्सम मुख्यतः क्यों मिलाया जाता है?", ["मजबूती बढ़ाने के लिए", "जमने का समय नियंत्रित करने के लिए", "केवल लागत घटाने के लिए", "रंग सुधारने के लिए"], "जिप्सम ट्राइकैल्शियम एल्युमिनेट के तेज़ जलयोजन को रोककर सीमेंट के जमने (सेटिंग) को धीमा करता है।"]),
  q(0, "civil-engineering", "building-materials", "M", 0,
    ["The standard size of a modular brick (without mortar) as per IS is:", ["190 × 90 × 90 mm", "230 × 115 × 75 mm", "250 × 125 × 80 mm", "200 × 100 × 100 mm"], "The nominal modular brick is 200 × 100 × 100 mm; its actual size without mortar is 190 × 90 × 90 mm."],
    ["IS के अनुसार मॉड्यूलर ईंट (बिना मसाले) का मानक आकार है:", ["190 × 90 × 90 मिमी", "230 × 115 × 75 मिमी", "250 × 125 × 80 मिमी", "200 × 100 × 100 मिमी"], "मॉड्यूलर ईंट का नाममात्र आकार 200 × 100 × 100 मिमी है; मसाले के बिना वास्तविक आकार 190 × 90 × 90 मिमी होता है।"]),
  q(0, "civil-engineering", "building-materials", "M", 3,
    ["The grade 'M20' of concrete indicates a characteristic compressive strength of:", ["10 N/mm²", "15 N/mm²", "25 N/mm²", "20 N/mm²"], "In M20, 'M' is mix and 20 is the characteristic compressive strength in N/mm² at 28 days."],
    ["कंक्रीट का ग्रेड 'M20' किस अभिलक्षणिक संपीडन सामर्थ्य को दर्शाता है?", ["10 N/mm²", "15 N/mm²", "25 N/mm²", "20 N/mm²"], "M20 में 'M' मिश्रण और 20 का अर्थ 28 दिन पर अभिलक्षणिक संपीडन सामर्थ्य 20 N/mm² है।"]),

  // ───────── Section 1: Strength of Materials & Structures ─────────
  q(1, "civil-engineering", "structures", "E", 1,
    ["Stress is defined as:", ["Force × area", "Force per unit area", "Change in length", "Area per unit force"], "Stress is the internal resisting force per unit cross-sectional area."],
    ["प्रतिबल (स्ट्रेस) की परिभाषा है:", ["बल × क्षेत्रफल", "प्रति इकाई क्षेत्रफल पर बल", "लंबाई में परिवर्तन", "प्रति इकाई बल पर क्षेत्रफल"], "प्रतिबल प्रति इकाई अनुप्रस्थ काट क्षेत्रफल पर आंतरिक प्रतिरोधी बल है।"]),
  q(1, "civil-engineering", "structures", "M", 2,
    ["The bending moment at the free end of a cantilever carrying no end moment is:", ["Maximum", "Equal to the load", "Zero", "Infinite"], "At the free end of a cantilever the bending moment is zero and it is maximum at the fixed support."],
    ["बिना सिरे के आघूर्ण वाली केंटिलीवर बीम के मुक्त सिरे पर बंकन आघूर्ण कितना होता है?", ["अधिकतम", "भार के बराबर", "शून्य", "अनंत"], "केंटिलीवर के मुक्त सिरे पर बंकन आघूर्ण शून्य और स्थिर आधार पर अधिकतम होता है।"]),
  q(1, "civil-engineering", "structures", "M", 0,
    ["The unit of Young's modulus in SI is:", ["Pascal (N/m²)", "Newton", "Joule", "Watt"], "Young's modulus is stress divided by strain; strain is dimensionless, so its unit is the same as stress, N/m² (Pa)."],
    ["यंग प्रत्यास्थता गुणांक का SI मात्रक है:", ["पास्कल (N/m²)", "न्यूटन", "जूल", "वाट"], "यंग गुणांक = प्रतिबल / विकृति; विकृति विमाहीन है, इसलिए इसका मात्रक प्रतिबल के समान N/m² (Pa) है।"]),
  q(1, "civil-engineering", "structures", "H", 3,
    ["A simply supported beam of span L carries a uniformly distributed load w per unit length. The maximum bending moment is:", ["wL/2", "wL²/4", "wL²/2", "wL²/8"], "For a simply supported beam with UDL, the maximum bending moment occurs at midspan and equals wL²/8."],
    ["L विस्तार की सरल आधारित बीम पर प्रति इकाई लंबाई w का समान वितरित भार है। अधिकतम बंकन आघूर्ण है:", ["wL/2", "wL²/4", "wL²/2", "wL²/8"], "समान वितरित भार वाली सरल आधारित बीम में अधिकतम बंकन आघूर्ण मध्य में wL²/8 होता है।"]),

  // ───────── Section 2: Soil Mechanics, Fluids & Hydrology ─────────
  q(2, "civil-engineering", "geotech-hydrology", "E", 1,
    ["The unit weight of water is approximately:", ["1 kN/m³", "9.81 kN/m³", "98.1 kN/m³", "0.981 kN/m³"], "Water has a density of 1000 kg/m³, so its unit weight is about 9.81 kN/m³."],
    ["जल का इकाई भार लगभग कितना होता है?", ["1 kN/m³", "9.81 kN/m³", "98.1 kN/m³", "0.981 kN/m³"], "जल का घनत्व 1000 किग्रा/मी³ है, इसलिए इसका इकाई भार लगभग 9.81 kN/m³ होता है।"]),
  q(2, "civil-engineering", "geotech-hydrology", "M", 2,
    ["Pascal's law states that pressure applied to a confined fluid is:", ["Absorbed by the container", "Zero at the bottom", "Transmitted equally in all directions", "Highest at the top"], "Pascal's law: pressure on an enclosed fluid is transmitted undiminished and equally in all directions."],
    ["पास्कल का नियम कहता है कि बंद तरल पर लगाया गया दाब:", ["बर्तन द्वारा सोख लिया जाता है", "तली में शून्य होता है", "सभी दिशाओं में समान रूप से संचरित होता है", "ऊपर सबसे अधिक होता है"], "पास्कल का नियम: बंद तरल पर लगाया गया दाब सभी दिशाओं में बिना घटे समान रूप से संचरित होता है।"]),
  q(2, "civil-engineering", "geotech-hydrology", "M", 0,
    ["Which instrument is used to measure rainfall?", ["Rain gauge", "Anemometer", "Barometer", "Hygrometer"], "A rain gauge measures rainfall; anemometer measures wind speed, barometer pressure and hygrometer humidity."],
    ["वर्षा मापने के लिए किस यंत्र का उपयोग किया जाता है?", ["वर्षामापी (रेन गेज)", "पवनवेगमापी", "वायुदाबमापी", "आर्द्रतामापी"], "वर्षामापी वर्षा मापता है; पवनवेगमापी हवा की चाल, वायुदाबमापी दाब और आर्द्रतामापी आर्द्रता मापता है।"]),

  // ───────── Section 3: Surveying & Estimation ─────────
  q(3, "civil-engineering", "surveying-transport", "E", 3,
    ["In chain surveying, the length of a standard metric Gunter's/surveyor's chain commonly used is:", ["10 m", "15 m", "25 m", "20 m"], "A metric chain is commonly 20 m (also 30 m) long; the 20 m chain has 100 links of 0.2 m each."],
    ["चेन सर्वेक्षण में सामान्यतः प्रयुक्त मीट्रिक चेन की लंबाई होती है:", ["10 मी", "15 मी", "25 मी", "20 मी"], "मीट्रिक चेन सामान्यतः 20 मी (या 30 मी) की होती है; 20 मी की चेन में 0.2 मी की 100 कड़ियाँ होती हैं।"]),
  q(3, "civil-engineering", "surveying-transport", "M", 1,
    ["The volume of an excavation 10 m long, 5 m wide and 2 m deep is:", ["50 m³", "100 m³", "150 m³", "200 m³"], "Volume = 10 × 5 × 2 = 100 m³."],
    ["10 मी लंबे, 5 मी चौड़े और 2 मी गहरे खुदाई कार्य का आयतन कितना है?", ["50 m³", "100 m³", "150 m³", "200 m³"], "आयतन = 10 × 5 × 2 = 100 m³।"]),

  // ───────── Section 4: Himachal GK ─────────
  q(4, "hp-gk", "economy", "M", 2,
    ["The Kalka–Shimla railway line was declared a UNESCO World Heritage Site in:", ["1999", "2003", "2008", "2014"], "The Kalka–Shimla Railway, a narrow-gauge line opened in 1903, became part of the Mountain Railways of India World Heritage Site in 2008."],
    ["कालका–शिमला रेलवे को यूनेस्को विश्व धरोहर घोषित कब किया गया?", ["1999", "2003", "2008", "2014"], "1903 में खुली नैरो-गेज कालका–शिमला रेलवे 2008 में 'भारत की पर्वतीय रेलवे' विश्व धरोहर का हिस्सा बनी।"]),
  q(4, "hp-gk", "economy", "M", 0,
    ["The Atal Tunnel, connecting Manali with Lahaul valley, passes under the:", ["Rohtang Pass", "Jalori Pass", "Baralacha La", "Kunzum Pass"], "The Atal Tunnel (Rohtang Tunnel), about 9 km long, runs beneath the Rohtang Pass and opened in October 2020."],
    ["मनाली को लाहौल घाटी से जोड़ने वाली अटल सुरंग किस दर्रे के नीचे से गुज़रती है?", ["रोहतांग दर्रा", "जलोड़ी दर्रा", "बारालाचा ला", "कुंजुम दर्रा"], "लगभग 9 किमी लंबी अटल सुरंग (रोहतांग टनल) रोहतांग दर्रे के नीचे है और अक्तूबर 2020 में खुली।"]),
];
