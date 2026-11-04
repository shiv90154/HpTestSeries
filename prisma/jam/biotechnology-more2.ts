// IIT JAM Biotechnology (BT) — Mocks 5 to 8: 30 MCQs each, written fresh: biochemistry 5, cell and molecular biology 7, genetics 4,
// microbiology and immunology 4, plant and animal biology 3, chemistry, physics and mathematics 7.

import { j } from "./types";

const B = "jam-biotechnology";

export const jamBiotechnologyMock5 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "2,3-Bisphosphoglycerate (BPG) affects the oxygen affinity of haemoglobin by:", ["Increasing it", "Decreasing it", "Having no effect", "Abolishing oxygen binding"], "BPG binds the deoxy form and stabilises it, so oxygen is released more easily."),
  j(B, "biochemistry", "M", 1, "The peptide bond is planar and rigid because it has:", ["Free rotation about C–N", "Partial double-bond character", "An ionic character", "A weak hydrogen bond"], "Resonance delocalises the nitrogen lone pair into the C=O group."),
  j(B, "biochemistry", "M", 1, "Branch points in glycogen are formed by:", ["α-1,4 linkages", "α-1,6 linkages", "β-1,4 linkages", "β-1,6 linkages"], "A branching enzyme transfers a chain to the C-6 hydroxyl of a glucose unit."),
  j(B, "biochemistry", "M", 1, "The main reducing equivalent produced in the pentose phosphate pathway is:", ["NADH", "NADPH", "FADH₂", "ATP"], "The oxidative phase generates NADPH for biosynthesis."),
  j(B, "biochemistry", "E", 0, "Cholesterol is the biosynthetic precursor of:", ["Steroid hormones", "Vitamin C", "Haemoglobin", "Glycogen"], "Cortisol, aldosterone and the sex hormones are made from cholesterol."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 0, "The protein Ras belongs to which class of proteins?", ["Small GTP-binding protein", "Receptor tyrosine kinase", "Transcription factor", "Phosphatase"], "Ras switches between an active GTP-bound state and an inactive GDP-bound state."),
  j(B, "cell-molecular", "E", 1, "During translation the anticodon of tRNA pairs with the:", ["DNA template", "Codon on mRNA", "rRNA of the large subunit", "Signal peptide"], "Base pairing between the anticodon and the codon sets the amino acid sequence."),
  j(B, "cell-molecular", "M", 0, "Telomerase is a:", ["Ribonucleoprotein with reverse transcriptase activity", "DNA ligase", "Topoisomerase", "Helicase"], "It uses its own RNA as the template to extend chromosome ends."),
  j(B, "cell-molecular", "H", 1, "Topoisomerase II relieves supercoiling by:", ["Cutting one strand", "Cutting both strands of DNA and passing another duplex through", "Joining Okazaki fragments", "Unwinding the helix using ATP only"], "Type II enzymes make a transient double-strand break."),
  j(B, "cell-molecular", "M", 0, "GroEL–GroES in bacteria is an example of a:", ["Chaperonin", "Protease", "Ribozyme", "Transporter"], "It provides a chamber in which unfolded proteins can fold."),
  j(B, "cell-molecular", "H", 1, "Cytochalasins block cell movement because they inhibit:", ["Microtubule polymerisation", "Actin polymerisation", "Assembly of intermediate filaments", "DNA replication"], "They cap the barbed ends of actin filaments."),
  j(B, "cell-molecular", "M", 1, "Mitochondrial DNA in humans is inherited:", ["From the father", "From the mother", "Equally from both parents", "Not inherited"], "Sperm mitochondria are generally eliminated after fertilisation."),
  // ───────── Genetics ─────────
  j(B, "genetics", "H", 1, "A dihybrid cross showing recessive epistasis gives an F₂ phenotypic ratio of:", ["9:3:3:1", "9:3:4", "9:7", "12:3:1"], "Homozygous recessive at one locus masks the expression of the other locus."),
  j(B, "genetics", "M", 1, "A trait that appears in both sexes and sometimes skips generations is most likely:", ["Autosomal dominant", "Autosomal recessive", "Y-linked", "Mitochondrial"], "Carriers can pass the allele on without showing the trait."),
  j(B, "genetics", "M", 0, "Triploid organisms are usually sterile because:", ["Chromosomes cannot pair evenly at meiosis", "They lack a nucleus", "They have no sex chromosomes", "They cannot replicate DNA"], "An odd chromosome set leads to unbalanced gametes."),
  j(B, "genetics", "M", 1, "A Northern blot is used to detect:", ["DNA", "RNA", "Protein", "Lipids"], "Northern blotting probes electrophoresed RNA."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 0, "The membrane attack complex of the complement system:", ["Forms pores in the target cell membrane", "Neutralises toxins", "Presents antigens", "Produces antibodies"], "C5b–C9 assemble into a pore that lyses the cell."),
  j(B, "microbiology-immunology", "M", 2, "Interferons are best known for:", ["Opsonisation of bacteria", "Neutralising toxins", "Inducing an antiviral state in cells", "Producing antibodies"], "They induce proteins that block viral replication."),
  j(B, "microbiology-immunology", "M", 1, "Autoclaving for sterilisation is usually carried out at:", ["100 °C for 5 min", "121 °C at 15 psi for 15–20 min", "160 °C for 1 min", "80 °C for 30 min"], "Pressurised steam at 121 °C kills even bacterial endospores."),
  j(B, "microbiology-immunology", "M", 0, "Streptococci appear under the microscope as:", ["Cocci in chains", "Cocci in clusters", "Spirals", "Rods in pairs"], "They divide in one plane and stay attached."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "In C₄ plants the primary carboxylation of CO₂ is catalysed by:", ["RuBisCO in mesophyll cells", "PEP carboxylase in mesophyll cells", "RuBisCO in guard cells", "Hexokinase"], "PEP carboxylase fixes bicarbonate into oxaloacetate."),
  j(B, "plant-animal", "M", 0, "Which hormone mainly maintains apical dominance in a shoot?", ["Auxin", "Cytokinin", "Abscisic acid", "Ethylene"], "Auxin from the shoot tip suppresses lateral bud growth."),
  j(B, "plant-animal", "E", 1, "Which structure initiates the heartbeat in the human heart?", ["AV node", "SA node", "Bundle of His", "Purkinje fibres"], "The sinoatrial node has the fastest rate of spontaneous depolarisation."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The number of molecules in 0.5 mol of a substance is:", ["6.022 × 10²³", "3.011 × 10²³", "1.2 × 10²⁴", "3 × 10²²"], "N = 0.5 × 6.022 × 10²³."),
  j(B, "chemistry-maths", "M", 1, "The heat needed to raise 100 g of water by 10 °C (specific heat 4.18 J g⁻¹ °C⁻¹) is:", ["418 J", "4180 J", "41.8 J", "1000 J"], "q = mcΔT = 100 × 4.18 × 10."),
  j(B, "chemistry-maths", "M", 1, "The number of π bonds in an acetylene (ethyne) molecule is:", ["1", "2", "3", "4"], "The C≡C triple bond has one σ and two π bonds."),
  j(B, "chemistry-maths", "E", 1, "A current of 2 A flows through a 5 Ω resistor. The voltage across it is:", ["2.5 V", "10 V", "7 V", "0.4 V"], "By Ohm's law, V = IR = 2 × 5 = 10 V."),
  j(B, "chemistry-maths", "M", 0, "The determinant of [[2, 3], [1, 4]] is:", ["5", "11", "8", "−5"], "2 × 4 − 3 × 1."),
  j(B, "chemistry-maths", "M", 2, "Two fair coins are tossed. The probability that both show heads is:", ["1/2", "1/3", "1/4", "1/8"], "(1/2)² = 1/4."),
  j(B, "chemistry-maths", "M", 1, "The area under one arch of the curve y = sin x, from x = 0 to x = π, is:", ["1", "2", "π", "0"], "∫₀^π sin x dx = [−cos x] = 2."),
];

export const jamBiotechnologyMock6 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 0, "An enzyme with a low Km for its substrate has:", ["High affinity for the substrate", "Low affinity for the substrate", "No catalytic activity", "A lower Vmax always"], "A lower Km means half-maximal velocity is reached at a lower substrate concentration."),
  j(B, "biochemistry", "E", 1, "Which of the following is an essential amino acid for humans?", ["Glycine", "Lysine", "Alanine", "Proline"], "Lysine cannot be synthesised by humans and must come from the diet."),
  j(B, "biochemistry", "M", 2, "The main role of lactate formation in anaerobic glycolysis is to:", ["Produce extra ATP", "Remove excess carbon dioxide", "Regenerate NAD⁺", "Generate NADPH"], "Reduction of pyruvate to lactate oxidises NADH back to NAD⁺."),
  j(B, "biochemistry", "M", 1, "Allosteric enzymes typically show:", ["Hyperbolic kinetics", "Sigmoidal kinetics", "Zero-order kinetics always", "No dependence on substrate"], "Cooperative substrate binding gives a sigmoidal curve."),
  j(B, "biochemistry", "M", 0, "The melting temperature of a DNA duplex rises with increasing:", ["G+C content", "A+T content", "Number of introns", "RNA content"], "G–C pairs have three hydrogen bonds against two for A–T."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "E", 1, "Secretory proteins are synthesised mainly by ribosomes attached to the:", ["Smooth ER", "Rough ER", "Peroxisome", "Plasma membrane"], "The ribosomes are directed to the ER by the signal sequence."),
  j(B, "cell-molecular", "M", 0, "Progress through the eukaryotic cell cycle is driven by:", ["Cyclin-dependent kinases", "Actin filaments", "Restriction enzymes", "Histone deacetylases only"], "Cyclins activate Cdks at specific stages."),
  j(B, "cell-molecular", "M", 0, "The CRISPR–Cas9 system is directed to its DNA target by:", ["A guide RNA", "A guide protein", "A restriction site", "A transposon"], "Base pairing of the guide RNA identifies the matching sequence."),
  j(B, "cell-molecular", "M", 0, "The restriction enzyme EcoRI recognises the sequence:", ["5′-GAATTC-3′", "5′-GGATCC-3′", "5′-AAGCTT-3′", "5′-CCCGGG-3′"], "EcoRI cuts between G and A in GAATTC, leaving sticky ends."),
  j(B, "cell-molecular", "H", 1, "Catabolite repression of the lac operon in the presence of glucose results from low levels of:", ["cGMP", "cAMP", "ATP", "Lactose only"], "Low cAMP means the CAP–cAMP complex cannot activate transcription."),
  j(B, "cell-molecular", "M", 1, "The Shine–Dalgarno sequence is important in:", ["Eukaryotic splicing", "Prokaryotic ribosome binding to mRNA", "DNA replication origins", "Transcription termination"], "It base-pairs with the 16S rRNA and positions the start codon."),
  j(B, "cell-molecular", "M", 1, "In eukaryotes, the poly(A) tail is added to the:", ["5′ end of mRNA", "3′ end of mRNA", "5′ end of DNA", "tRNA"], "Polyadenylation stabilises the mRNA and aids export."),
  // ───────── Genetics ─────────
  j(B, "genetics", "E", 0, "The law of segregation proposed by Mendel states that:", ["The two alleles of a gene separate during gamete formation", "Genes on different chromosomes assort independently", "All traits blend", "Dominant alleles always mask recessives"], "Each gamete carries only one allele of each gene."),
  j(B, "genetics", "M", 1, "The son of a carrier mother and a normal father has what chance of being colour blind (X-linked recessive)?", ["0%", "50%", "25%", "100%"], "Half the sons receive the mother's affected X chromosome."),
  j(B, "genetics", "M", 1, "In a chi-square test of a 3:1 monohybrid ratio, the degrees of freedom are:", ["0", "1", "2", "3"], "Number of classes minus one: 2 − 1."),
  j(B, "genetics", "H", 2, "In a three-point test cross, the gene in the middle is identified by comparing the:", ["Most frequent classes with the least frequent classes", "Parental with the single crossover classes", "Double crossover classes with the parental classes", "Sex of the progeny"], "The double crossovers differ from the parental combination only at the middle gene."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 0, "Which genus is a well-known bacterial endospore former?", ["Bacillus", "Escherichia", "Vibrio", "Streptococcus"], "Bacillus and Clostridium produce highly resistant endospores."),
  j(B, "microbiology-immunology", "M", 1, "The T-cell receptor recognises:", ["Free antigen in solution", "Peptide presented on an MHC molecule", "Polysaccharides directly", "Lipids only"], "T cells are MHC-restricted."),
  j(B, "microbiology-immunology", "M", 0, "Monoclonal antibodies are produced from:", ["Hybridoma cells", "Plasmids", "Red blood cells", "Bacteriophages"], "Fusion of a B cell with a myeloma cell produces an immortal antibody-secreting line."),
  j(B, "microbiology-immunology", "M", 1, "The enzyme that makes DNA from the RNA genome of a retrovirus is:", ["RNA polymerase II", "Reverse transcriptase", "DNA ligase", "Helicase"], "Reverse transcriptase copies RNA into DNA."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 2, "A stoma opens when its guard cells:", ["Lose potassium ions", "Lose water", "Accumulate potassium ions and become turgid", "Close their plasmodesmata"], "Uptake of K⁺ draws water in by osmosis."),
  j(B, "plant-animal", "M", 1, "A typical neuron at rest has a membrane potential of about:", ["+70 mV", "−70 mV", "0 mV", "−7 mV"], "The inside of the cell is negative relative to the outside."),
  j(B, "plant-animal", "M", 0, "Vitamin K is essential for:", ["Blood clotting", "Vision", "Calcium absorption", "Red blood cell formation"], "It is needed for the carboxylation of clotting factors."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 3, "The strongest intermolecular hydrogen bonds among the following are found in:", ["HCl", "H₂S", "CH₄", "HF"], "Fluorine is the most electronegative element."),
  j(B, "chemistry-maths", "M", 1, "A solution is diluted from 1 M to 0.1 M by taking 10 mL and making up to:", ["50 mL", "100 mL", "1000 mL", "20 mL"], "C₁V₁ = C₂V₂ gives V₂ = 10 × 1/0.1."),
  j(B, "chemistry-maths", "M", 2, "The number of stereoisomers of a molecule with 3 distinct chiral centres is:", ["3", "6", "8", "9"], "Each chiral centre can have two configurations, so 2³ = 8."),
  j(B, "chemistry-maths", "M", 1, "An object falls freely from rest for 2 s (g = 10 m/s²). The distance fallen is:", ["10 m", "20 m", "40 m", "5 m"], "s = ½gt² = 20 m."),
  j(B, "chemistry-maths", "E", 1, "The value of ln(e⁴) is:", ["e", "4", "1/4", "0"], "The natural logarithm and the exponential cancel."),
  j(B, "chemistry-maths", "M", 0, "The slope of the line 3y = 6x + 9 is:", ["2", "3", "6", "9"], "Rewriting, y = 2x + 3."),
  j(B, "chemistry-maths", "M", 1, "For 10 observations with a mean of 12 and one extra observation of 23, the new mean is:", ["12", "13", "14", "11.5"], "(120 + 23)/11 = 13."),
];

export const jamBiotechnologyMock7 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 2, "The Ramachandran plot describes the allowed values of:", ["Bond lengths in proteins", "Temperature factors", "Backbone φ and ψ torsion angles", "Side-chain charges"], "It shows which φ–ψ combinations are sterically allowed."),
  j(B, "biochemistry", "M", 1, "The enzyme complex that links glycolysis to the citric acid cycle is:", ["Pyruvate kinase", "Pyruvate dehydrogenase complex", "Citrate synthase", "Lactate dehydrogenase"], "It converts pyruvate to acetyl-CoA."),
  j(B, "biochemistry", "M", 0, "Which of the following is a non-reducing disaccharide?", ["Sucrose", "Maltose", "Lactose", "Cellobiose"], "Sucrose has its anomeric carbons linked in the glycosidic bond."),
  j(B, "biochemistry", "H", 1, "The total number of ATP molecules produced by complete oxidation of one molecule of glucose in a eukaryotic cell is approximately (using 2.5 ATP/NADH and 1.5 ATP/FADH₂):", ["30–32", "36–38", "2", "18"], "The textbook yield is about 30–32 ATP."),
  j(B, "biochemistry", "M", 1, "Sickle cell anaemia results from the substitution of glutamate by which amino acid at position 6 of β-globin?", ["Lysine", "Valine", "Glycine", "Leucine"], "The Glu6Val change creates a hydrophobic patch that promotes polymerisation."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 1, "Which cytoskeletal element forms the contractile ring in cytokinesis?", ["Microtubules", "Actin and myosin filaments", "Intermediate filaments", "Lamins"], "The ring is made of actin and myosin II."),
  j(B, "cell-molecular", "M", 1, "The enzyme that unwinds DNA at the replication fork is:", ["DNA ligase", "Helicase", "Primase", "Telomerase"], "Helicase breaks the hydrogen bonds between the strands."),
  j(B, "cell-molecular", "M", 2, "Which of the following is a feature of the genetic code?", ["It is overlapping", "It is different in every species", "It is degenerate", "It has no stop codons"], "Most amino acids are encoded by more than one codon."),
  j(B, "cell-molecular", "M", 0, "Enhancers in eukaryotes:", ["Can act at a distance from the promoter", "Must lie immediately upstream of the start codon", "Are RNA sequences", "Code for proteins"], "They bind activator proteins and loop to the promoter."),
  j(B, "cell-molecular", "H", 1, "Western blotting detects:", ["DNA fragments", "Specific proteins using antibodies", "RNA molecules", "Lipids"], "Proteins are transferred to a membrane and probed with antibodies."),
  j(B, "cell-molecular", "M", 1, "The ‘Hayflick limit’ refers to:", ["The maximum rate of transcription", "The limited number of divisions of normal somatic cells", "The size limit of cells", "The age of the organism"], "Telomere shortening limits how many times normal cells divide."),
  j(B, "cell-molecular", "M", 0, "Which receptor class directly forms an ion channel?", ["Ligand-gated ion channel", "G-protein-coupled receptor", "Receptor tyrosine kinase", "Steroid receptor"], "Binding of a ligand opens the channel pore."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 1, "A woman with blood group A (genotype IAi) marries a man of group B (IBi). The chance that a child has group O is:", ["0", "1/4", "1/2", "3/4"], "Only ii children are of group O, which has probability 1/4."),
  j(B, "genetics", "M", 2, "The type of chromosomal change that moves a segment to a non-homologous chromosome is a:", ["Deletion", "Inversion", "Translocation", "Duplication"], "Reciprocal translocations exchange segments between non-homologues."),
  j(B, "genetics", "M", 0, "The ‘Philadelphia chromosome’ is associated with:", ["Chronic myeloid leukaemia", "Down syndrome", "Cystic fibrosis", "Haemophilia"], "It is a 9;22 translocation creating the BCR–ABL fusion."),
  j(B, "genetics", "H", 1, "In a population in Hardy–Weinberg equilibrium, 16% of individuals show a recessive trait. The frequency of the dominant allele is:", ["0.4", "0.6", "0.16", "0.84"], "q² = 0.16 gives q = 0.4, so p = 0.6."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 1, "The bacterial cell wall component that is a major endotoxin is:", ["Peptidoglycan", "Lipopolysaccharide", "Teichoic acid", "Flagellin"], "Lipid A of the LPS in Gram-negative bacteria triggers fever and shock."),
  j(B, "microbiology-immunology", "M", 0, "Which of the following cells produce antibodies?", ["Plasma cells", "Macrophages", "Natural killer cells", "Mast cells"], "Plasma cells are differentiated B cells."),
  j(B, "microbiology-immunology", "M", 2, "The Gram stain was developed to differentiate bacteria based on the structure of the:", ["Flagella", "Capsule", "Cell wall", "Nucleoid"], "Crystal violet is retained by thick peptidoglycan."),
  j(B, "microbiology-immunology", "M", 1, "PCR amplification of DNA requires:", ["DNA ligase and restriction enzymes", "Thermostable DNA polymerase and primers", "RNA polymerase and ribosomes", "Reverse transcriptase only"], "Taq polymerase survives the denaturation step."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 0, "Which tissue provides mechanical strength to the plant through lignified cell walls?", ["Sclerenchyma", "Parenchyma", "Phloem parenchyma", "Meristem"], "Sclerenchyma cells are dead at maturity with thick lignified walls."),
  j(B, "plant-animal", "M", 2, "Antidiuretic hormone acts mainly on the:", ["Glomerulus", "Proximal tubule", "Collecting duct", "Loop of Henle's ascending limb"], "ADH inserts aquaporins in the collecting duct to retain water."),
  j(B, "plant-animal", "M", 1, "The gas exchange in the lungs takes place across the:", ["Bronchi", "Alveoli", "Trachea", "Pleura"], "Alveoli have thin walls and a rich capillary supply."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The conjugate base of H₂PO₄⁻ is:", ["H₃PO₄", "HPO₄²⁻", "PO₄³⁻", "H₂PO₃⁻"], "Removing a proton from H₂PO₄⁻ gives HPO₄²⁻."),
  j(B, "chemistry-maths", "M", 0, "In an SN2 reaction the rate depends on:", ["Both the substrate and the nucleophile", "The substrate only", "The nucleophile only", "The solvent only"], "The mechanism is bimolecular."),
  j(B, "chemistry-maths", "M", 2, "A lens of focal length 20 cm has a power of:", ["0.5 D", "2 D", "5 D", "20 D"], "P = 1/f = 1/0.2 m = 5 D."),
  j(B, "chemistry-maths", "M", 1, "The frequency of a wave of wavelength 3 m travelling at 330 m/s is:", ["990 Hz", "110 Hz", "11 Hz", "1.1 Hz"], "f = v/λ = 330/3."),
  j(B, "chemistry-maths", "M", 1, "The value of ∫₀¹ x² dx is:", ["1/2", "1/3", "1/4", "1"], "[x³/3] from 0 to 1."),
  j(B, "chemistry-maths", "E", 2, "The number of ways of arranging the letters of the word CAT is:", ["3", "4", "6", "9"], "Three distinct letters can be arranged in 3! = 6 ways."),
  j(B, "chemistry-maths", "M", 3, "The sum of the first 10 natural numbers is:", ["45", "50", "60", "55"], "n(n + 1)/2 = 55."),
];

export const jamBiotechnologyMock8 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "Which amino acid residue can form disulphide bonds in proteins?", ["Methionine", "Cysteine", "Serine", "Threonine"], "Two cysteine thiol groups oxidise to form cystine."),
  j(B, "biochemistry", "M", 0, "The enzyme that catalyses the first step of the urea cycle in mitochondria is:", ["Carbamoyl phosphate synthetase I", "Arginase", "Urease", "Glutaminase"], "It forms carbamoyl phosphate from NH₄⁺ and bicarbonate."),
  j(B, "biochemistry", "M", 1, "Competitive inhibition can be overcome by:", ["Lowering the temperature", "Increasing the substrate concentration", "Adding more inhibitor", "Removing the enzyme"], "A high substrate concentration outcompetes the inhibitor."),
  j(B, "biochemistry", "H", 2, "The proton gradient across the inner mitochondrial membrane is dissipated, without ATP synthesis, by:", ["Oligomycin", "Cyanide", "2,4-Dinitrophenol", "Antimycin A"], "DNP is an uncoupler that carries protons across the membrane."),
  j(B, "biochemistry", "M", 1, "Which of the following is a ketone body?", ["Pyruvate", "Acetoacetate", "Oxaloacetate", "Citrate"], "Acetoacetate, β-hydroxybutyrate and acetone are the ketone bodies."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 1, "The Golgi apparatus is mainly involved in:", ["ATP production", "Modification and sorting of proteins", "DNA replication", "Photosynthesis"], "Glycosylation and packaging for secretion occur here."),
  j(B, "cell-molecular", "M", 2, "The proofreading activity of DNA polymerase is carried out by its:", ["5′→3′ polymerase activity", "5′→3′ exonuclease activity", "3′→5′ exonuclease activity", "Helicase activity"], "Misincorporated nucleotides are removed from the 3′ end."),
  j(B, "cell-molecular", "M", 0, "Which RNA polymerase transcribes the genes for rRNA (28S, 18S, 5.8S) in eukaryotes?", ["RNA polymerase I", "RNA polymerase II", "RNA polymerase III", "Primase"], "Pol I is dedicated to the large rRNA precursor."),
  j(B, "cell-molecular", "M", 1, "Nuclear localisation signals are recognised by:", ["Signal recognition particles", "Importins", "Chaperones", "Ubiquitin ligases"], "Importins carry cargo through nuclear pores."),
  j(B, "cell-molecular", "H", 1, "Which of the following is a tumour suppressor gene?", ["Ras", "p53", "Myc", "Src"], "p53 halts the cell cycle or triggers apoptosis after DNA damage."),
  j(B, "cell-molecular", "M", 0, "RNA interference involves the formation of:", ["siRNA-guided RISC complexes", "DNA–RNA hybrids", "Telomeres", "Okazaki fragments"], "Small RNAs guide the cleavage of complementary mRNA."),
  j(B, "cell-molecular", "M", 1, "The sodium–potassium pump moves ions in the ratio:", ["2 Na⁺ in : 3 K⁺ out", "3 Na⁺ out : 2 K⁺ in", "1 Na⁺ out : 1 K⁺ in", "3 Na⁺ in : 2 K⁺ out"], "Each cycle uses one ATP."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 2, "Two genes that are 50 map units apart on the same chromosome behave in a cross as if they are:", ["Completely linked", "Partially linked", "Independently assorting", "Alleles of each other"], "Recombination frequency saturates at 50%."),
  j(B, "genetics", "M", 1, "The condition caused by the loss of a part of the short arm of chromosome 5 is:", ["Down syndrome", "Cri-du-chat syndrome", "Turner syndrome", "Edwards syndrome"], "The infant's cry resembles that of a cat."),
  j(B, "genetics", "M", 0, "Which of the following can be used as a selectable marker in plasmids?", ["Antibiotic resistance gene", "Origin of replication", "Multiple cloning site", "Terminator"], "Cells that carry the plasmid survive on the antibiotic."),
  j(B, "genetics", "H", 1, "In Drosophila, the white-eye gene is X-linked recessive. A white-eyed female crossed with a red-eyed male gives:", ["All red-eyed offspring", "Red-eyed daughters and white-eyed sons", "White-eyed daughters and red-eyed sons", "A 1:1 ratio in both sexes"], "Daughters get a normal X from the father; sons receive the mother's mutant X."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 1, "Which of the following is used as a probiotic organism?", ["Lactobacillus", "Salmonella", "Clostridium botulinum", "Pseudomonas aeruginosa"], "Lactobacillus species are common in fermented dairy products."),
  j(B, "microbiology-immunology", "M", 0, "Memory cells are produced by:", ["Clonal expansion after antigen exposure", "Complement activation", "Phagocytosis only", "Thymic selection of all T cells"], "A subset of activated lymphocytes persists as memory cells."),
  j(B, "microbiology-immunology", "M", 1, "Rabies is caused by a:", ["Bacterium", "Virus", "Fungus", "Protozoan"], "Rabies virus is a neurotropic RNA virus."),
  j(B, "microbiology-immunology", "M", 0, "The principal role of MHC class I molecules is to present antigens to:", ["CD8⁺ T cells", "CD4⁺ T cells", "B cells", "NK cells only"], "They display peptides from the cell's own proteins to cytotoxic T cells."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "The red-light absorbing form of phytochrome is called:", ["Pfr", "Pr", "Pb", "Cry"], "Pr is converted to the active Pfr by red light."),
  j(B, "plant-animal", "M", 0, "Which part of the nephron is the main site of glucose reabsorption?", ["Proximal convoluted tubule", "Distal convoluted tubule", "Collecting duct", "Loop of Henle"], "Glucose is completely reabsorbed there by sodium-linked transporters."),
  j(B, "plant-animal", "M", 2, "Bile is stored in the:", ["Liver", "Pancreas", "Gall bladder", "Duodenum"], "The gall bladder concentrates and stores bile."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 2, "The IUPAC name of CH₃CH₂CHO is:", ["Propanol", "Propanone", "Propanal", "Propanoic acid"], "An aldehyde with three carbons is propanal."),
  j(B, "chemistry-maths", "M", 1, "The pH of 0.1 M acetic acid (Ka = 1.8 × 10⁻⁵) is about:", ["1", "2.9", "4.7", "7"], "[H⁺] = √(Ka C) = 1.3 × 10⁻³ M."),
  j(B, "chemistry-maths", "M", 0, "Electric charge is measured in the SI unit called the:", ["Coulomb", "Ampere", "Volt", "Farad"], "One coulomb is one ampere-second."),
  j(B, "chemistry-maths", "M", 1, "A force of 20 N acts on a body of mass 4 kg. Its acceleration is:", ["80 m/s²", "5 m/s²", "0.2 m/s²", "16 m/s²"], "By Newton's second law, a = F/m = 20/4 = 5 m/s²."),
  j(B, "chemistry-maths", "M", 1, "The derivative of sin x with respect to x at x = 0 is:", ["0", "1", "−1", "∞"], "d/dx sin x = cos x."),
  j(B, "chemistry-maths", "E", 0, "If a die is thrown once, the probability of getting an even number is:", ["1/2", "1/3", "1/6", "2/3"], "Three of the six faces are even."),
  j(B, "chemistry-maths", "M", 2, "Solve the quadratic x² − 5x + 6 = 0; its roots are:", ["1 and 6", "−2 and −3", "2 and 3", "1 and 5"], "x² − 5x + 6 = (x − 2)(x − 3)."),
];
