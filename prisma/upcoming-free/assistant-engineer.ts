// HPPSC Assistant Engineer (Civil) Free Mock 1 — 15 questions (Structures & Design 5, Soil, Water & Environment 4, Transportation & Estimation 3, Himachal GK 3).
// The real papers are discipline-specific; this mock covers the civil stream.

import { q, type PatwariQuestion } from "../patwari/types";

export const assistantEngineerMock1: PatwariQuestion[] = [
  // ───────── Section 0: Structures & Design ─────────
  q(0, "civil-engineering", "structures", "M", 1,
    ["Poisson's ratio is the ratio of:", ["Stress to strain", "Lateral strain to longitudinal strain", "Shear stress to shear strain", "Load to area"], "Poisson's ratio is the ratio of lateral (transverse) strain to the longitudinal strain; for most materials it is about 0.25–0.33."],
    ["पॉयसन अनुपात किसका अनुपात है?", ["प्रतिबल और विकृति का", "पार्श्व विकृति और अनुदैर्ध्य विकृति का", "अपरूपण प्रतिबल और अपरूपण विकृति का", "भार और क्षेत्रफल का"], "पॉयसन अनुपात पार्श्व विकृति और अनुदैर्ध्य विकृति का अनुपात है; अधिकांश पदार्थों के लिए यह लगभग 0.25–0.33 होता है।"]),
  q(0, "civil-engineering", "structures", "M", 3,
    ["In a reinforced concrete beam, steel reinforcement is mainly provided to resist:", ["Compressive stress only", "Shrinkage only", "Fire", "Tensile stress"], "Concrete is strong in compression and weak in tension, so steel is placed in the tension zone."],
    ["प्रबलित कंक्रीट बीम में इस्पात मुख्यतः किसका प्रतिरोध करने के लिए लगाया जाता है?", ["केवल संपीडन प्रतिबल", "केवल संकुचन", "आग", "तनन प्रतिबल"], "कंक्रीट संपीडन में मजबूत और तनन में कमज़ोर होता है, इसलिए इस्पात तनन क्षेत्र में लगाया जाता है।"]),
  q(0, "civil-engineering", "structures", "H", 0,
    ["The Euler's buckling load of a column is inversely proportional to the:", ["Square of the effective length", "Effective length", "Moment of inertia", "Modulus of elasticity"], "Euler's load Pcr = π²EI / Le², so it is inversely proportional to the square of the effective length."],
    ["किसी स्तंभ का यूलर बकलिंग भार किसके व्युत्क्रमानुपाती होता है?", ["प्रभावी लंबाई के वर्ग के", "प्रभावी लंबाई के", "जड़त्व आघूर्ण के", "प्रत्यास्थता गुणांक के"], "यूलर भार Pcr = π²EI / Le² होता है, अतः यह प्रभावी लंबाई के वर्ग के व्युत्क्रमानुपाती है।"]),
  q(0, "civil-engineering", "structures", "M", 2,
    ["The modulus of elasticity of steel is approximately:", ["2 × 10³ N/mm²", "2 × 10⁴ N/mm²", "2 × 10⁵ N/mm²", "2 × 10⁷ N/mm²"], "For structural steel, E is about 2 × 10⁵ N/mm² (200 GPa)."],
    ["इस्पात का प्रत्यास्थता गुणांक लगभग कितना होता है?", ["2 × 10³ N/mm²", "2 × 10⁴ N/mm²", "2 × 10⁵ N/mm²", "2 × 10⁷ N/mm²"], "संरचनात्मक इस्पात के लिए E लगभग 2 × 10⁵ N/mm² (200 GPa) होता है।"]),
  q(0, "civil-engineering", "building-materials", "E", 1,
    ["The initial setting time of Ordinary Portland Cement should not be less than:", ["10 minutes", "30 minutes", "60 minutes", "600 minutes"], "As per IS code, the initial setting time of OPC must be at least 30 minutes and the final setting time not more than 600 minutes."],
    ["साधारण पोर्टलैंड सीमेंट का प्रारंभिक जमाव समय कम से कम कितना होना चाहिए?", ["10 मिनट", "30 मिनट", "60 मिनट", "600 मिनट"], "IS कोड के अनुसार OPC का प्रारंभिक जमाव समय कम से कम 30 मिनट और अंतिम जमाव समय अधिकतम 600 मिनट होना चाहिए।"]),

  // ───────── Section 1: Soil, Water & Environment ─────────
  q(1, "civil-engineering", "geotech-hydrology", "M", 0,
    ["The bearing capacity of soil is generally greatest for:", ["Rock", "Clay", "Silt", "Loose sand"], "Hard rock has the highest bearing capacity among these; loose sand, silt and soft clay have much lower values."],
    ["मृदा की वहन क्षमता सामान्यतः किसमें सबसे अधिक होती है?", ["चट्टान", "चिकनी मिट्टी", "गाद", "ढीली रेत"], "इनमें कठोर चट्टान की वहन क्षमता सबसे अधिक होती है; ढीली रेत, गाद और नरम चिकनी मिट्टी की काफ़ी कम।"]),
  q(1, "civil-engineering", "geotech-hydrology", "M", 3,
    ["Darcy's law is related to the flow of water through:", ["Open channels", "Pipes", "Weirs", "Porous media (soil)"], "Darcy's law, v = ki, describes laminar flow through porous media such as soil."],
    ["डार्सी का नियम किसमें जल प्रवाह से संबंधित है?", ["खुली नहरों", "पाइपों", "बाँधों के ऊपर", "सरंध्र माध्यम (मृदा)"], "डार्सी का नियम v = ki सरंध्र माध्यम जैसे मृदा में धारा-रेखीय प्रवाह को दर्शाता है।"]),
  q(1, "civil-engineering", "geotech-hydrology", "E", 2,
    ["A weir is a structure used for:", ["Storing sediments", "Crossing a river", "Measuring or regulating the flow of water", "Treating sewage"], "A weir is an overflow structure built across a channel to measure or regulate discharge."],
    ["वियर (Weir) किस काम के लिए प्रयुक्त संरचना है?", ["तलछट जमा करना", "नदी पार करना", "जल प्रवाह मापना या नियंत्रित करना", "मल-जल का उपचार"], "वियर नहर या नदी के आर-पार बनी अतिप्रवाह संरचना है जो जल प्रवाह को मापती या नियंत्रित करती है।"]),
  q(1, "civil-engineering", "geotech-hydrology", "M", 1,
    ["The process of removing suspended impurities from water by adding alum is called:", ["Disinfection", "Coagulation", "Aeration", "Softening"], "Alum is a coagulant that causes fine suspended particles to clump together into flocs which then settle."],
    ["फिटकरी (एलम) डालकर पानी से निलंबित अशुद्धियाँ हटाने की प्रक्रिया कहलाती है:", ["संक्रमणहरण", "स्कंदन (कोएगुलेशन)", "वातन", "मृदुकरण"], "फिटकरी स्कंदक है जो सूक्ष्म निलंबित कणों को जमाकर गुच्छे बनाती है, जो फिर नीचे बैठ जाते हैं।"]),

  // ───────── Section 2: Transportation & Estimation ─────────
  q(2, "civil-engineering", "surveying-transport", "M", 3,
    ["The camber provided on a road surface is mainly for:", ["Beautification", "Reducing cost", "Increasing speed", "Draining off rainwater"], "Camber is the transverse slope of the carriageway that helps drain rainwater quickly."],
    ["सड़क की सतह पर कैम्बर (उभार) मुख्यतः किसलिए दिया जाता है?", ["सुंदरता", "लागत घटाने", "गति बढ़ाने", "वर्षा जल की निकासी"], "कैम्बर सड़क की अनुप्रस्थ ढलान है जो वर्षा जल को शीघ्र बहाने में सहायक होती है।"]),
  q(2, "civil-engineering", "surveying-transport", "M", 0,
    ["The unit of measurement for brickwork in estimation is generally:", ["Cubic metre", "Square metre", "Running metre", "Kilogram"], "Brickwork is measured in cubic metres (cum) because it has length, breadth and thickness."],
    ["निर्माण प्राक्कलन में ईंट चिनाई की माप का इकाई सामान्यतः क्या होती है?", ["घन मीटर", "वर्ग मीटर", "रनिंग मीटर", "किलोग्राम"], "ईंट चिनाई की माप घन मीटर में की जाती है क्योंकि उसमें लंबाई, चौड़ाई और मोटाई तीनों होती हैं।"]),
  q(2, "civil-engineering", "surveying-transport", "E", 2,
    ["A theodolite is used for measuring:", ["Only distances", "Only levels", "Horizontal and vertical angles", "Only areas"], "A theodolite measures horizontal and vertical angles precisely."],
    ["थियोडोलाइट से क्या मापा जाता है?", ["केवल दूरी", "केवल तल (लेवल)", "क्षैतिज और ऊर्ध्वाधर कोण", "केवल क्षेत्रफल"], "थियोडोलाइट क्षैतिज और ऊर्ध्वाधर कोणों को सटीकता से मापता है।"]),

  // ───────── Section 3: Himachal GK ─────────
  q(3, "hp-gk", "rivers-lakes", "M", 1,
    ["The Pong Dam on the Beas river forms the reservoir known as:", ["Gobind Sagar", "Maharana Pratap Sagar", "Chamera Lake", "Renuka Lake"], "Pong Dam in Kangra district creates the Maharana Pratap Sagar, a Ramsar wetland."],
    ["ब्यास नदी पर बने पौंग बाँध से बनने वाला जलाशय किस नाम से जाना जाता है?", ["गोबिंद सागर", "महाराणा प्रताप सागर", "चमेरा झील", "रेणुका झील"], "कांगड़ा जिले का पौंग बाँध महाराणा प्रताप सागर बनाता है, जो एक रामसर आर्द्रभूमि है।"]),
  q(3, "hp-gk", "economy", "M", 2,
    ["Which of the following is a major hydroelectric project on the Satluj in Himachal Pradesh?", ["Salal", "Uri", "Chamera", "Nathpa Jhakri"], "Nathpa Jhakri (1,500 MW) on the Satluj is among the largest hydropower projects of Himachal; Salal and Uri are in Jammu & Kashmir."],
    ["निम्नलिखित में से हिमाचल प्रदेश में सतलुज पर कौन-सी प्रमुख जलविद्युत परियोजना है?", ["सलाल", "उरी", "चमेरा", "नाथपा झाकड़ी"], "सतलुज पर नाथपा झाकड़ी (1,500 मेगावाट) हिमाचल की सबसे बड़ी जलविद्युत परियोजनाओं में है; सलाल और उरी जम्मू-कश्मीर में हैं।"]),
  q(3, "hp-gk", "geography", "E", 0,
    ["Rohtang Pass connects the Kullu valley with:", ["Lahaul valley", "Kinnaur valley", "Kangra valley", "Pangi valley"], "Rohtang Pass lies on the Pir Panjal range and links Kullu with Lahaul & Spiti."],
    ["रोहतांग दर्रा कुल्लू घाटी को किससे जोड़ता है?", ["लाहौल घाटी", "किन्नौर घाटी", "कांगड़ा घाटी", "पांगी घाटी"], "रोहतांग दर्रा पीर पंजाल श्रेणी पर स्थित है और कुल्लू को लाहौल-स्पीति से जोड़ता है।"]),
];
