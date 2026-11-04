// IIT JAM Biological Sciences (BL) — Mocks 9 to 12: 30 MCQs each, written fresh: cell biology and biochemistry 5, genetics and molecular
// biology 5, physiology 5, ecology and evolution 5, plant biology 4, chemistry, mathematics and physics 6. Mock 12 is slightly above exam level.

import { j } from "./types";

const B = "jam-biological-sciences";

export const jamBiologicalSciencesMock9 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "E", 1, "Glycolysis takes place in the:", ["Mitochondrial matrix", "Cytosol", "Nucleus", "Chloroplast stroma"], "The ten enzymes of the pathway are soluble cytosolic proteins."),
  j(B, "cell-biochemistry", "M", 2, "In a chloroplast, the light-dependent reactions take place in the:", ["Stroma", "Mitochondrial matrix", "Thylakoid membranes", "Cytosol"], "Photosystems and the electron transport chain are embedded in the thylakoids."),
  j(B, "cell-biochemistry", "H", 0, "The Warburg effect refers to the fact that many cancer cells:", ["Rely heavily on glycolysis even in the presence of oxygen", "Cannot take up glucose", "Lack mitochondria", "Use only the pentose phosphate pathway"], "Aerobic glycolysis gives intermediates for rapid biosynthesis."),
  j(B, "cell-biochemistry", "M", 1, "The cell wall of most bacteria is made of:", ["Cellulose", "Peptidoglycan", "Chitin", "Lignin"], "Peptidoglycan is a polymer of NAG and NAM cross-linked by peptides."),
  j(B, "cell-biochemistry", "M", 1, "Lipid rafts in the plasma membrane are enriched in:", ["Triglycerides", "Cholesterol and sphingolipids", "Nucleic acids", "Starch"], "They form ordered microdomains involved in signalling."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 1, "Griffith's experiment with Streptococcus pneumoniae demonstrated:", ["Conjugation", "Transformation", "Transduction", "Mutation in the lab only"], "Heat-killed virulent bacteria transformed harmless bacteria."),
  j(B, "genetics-molecular", "M", 2, "The proofreading ability of DNA polymerase depends on its:", ["5′→3′ polymerase activity", "5′→3′ exonuclease activity", "3′→5′ exonuclease activity", "Ligase activity"], "A wrongly paired base is removed from the 3′ end."),
  j(B, "genetics-molecular", "M", 0, "The trp operon of E. coli is an example of a:", ["Repressible operon", "Inducible operon", "Constitutive operon", "Eukaryotic operon"], "Tryptophan acts as a corepressor."),
  j(B, "genetics-molecular", "E", 3, "Which statement defines alleles correctly? Alleles are:", ["Different genes on different chromosomes", "Identical copies of a gene", "Parts of the same gene", "Alternative forms of a gene at the same locus"], "For example A and a at one locus."),
  j(B, "genetics-molecular", "M", 1, "Edwards syndrome is caused by trisomy of chromosome:", ["13", "18", "21", "X"], "Trisomy 18 causes severe developmental defects."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 0, "Oedema can result from:", ["Decreased plasma protein concentration", "Increased plasma protein concentration", "Dehydration", "Increased urine production"], "Low oncotic pressure lets fluid leak into the tissues."),
  j(B, "physiology", "M", 2, "The body's thermostat is located in the:", ["Medulla", "Cerebellum", "Hypothalamus", "Thalamus"], "The hypothalamus compares blood temperature with a set point."),
  j(B, "physiology", "H", 1, "Trypsinogen is converted to trypsin by:", ["Pepsin", "Enteropeptidase", "Amylase", "Bile salts"], "The brush-border enzyme activates trypsinogen in the duodenum."),
  j(B, "physiology", "M", 1, "In an ECG, the QRS complex represents:", ["Atrial depolarisation", "Ventricular depolarisation", "Ventricular repolarisation", "Atrial repolarisation"], "The large spike coincides with ventricular depolarisation."),
  j(B, "physiology", "M", 2, "Thyroid-stimulating hormone is secreted by the:", ["Hypothalamus", "Thyroid", "Anterior pituitary", "Posterior pituitary"], "TRH from the hypothalamus triggers its release."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 0, "An ecological niche is best defined as:", ["The role and resource use of a species in its habitat", "The physical address of an organism", "The place where it was born", "A group of interbreeding individuals"], "It includes the range of conditions and resources used."),
  j(B, "ecology-evolution", "E", 2, "Permafrost is a characteristic feature of the:", ["Tropical rainforest", "Desert", "Tundra", "Savanna"], "The soil remains frozen year-round."),
  j(B, "ecology-evolution", "M", 1, "The low genetic diversity of cheetahs is attributed to a:", ["High mutation rate", "Genetic bottleneck", "Large population size", "High gene flow"], "A severe reduction in population size in the past."),
  j(B, "ecology-evolution", "M", 1, "Bergmann's rule states that within a species, body size is larger in:", ["Warmer climates", "Colder climates", "Deserts", "Islands"], "Larger bodies conserve heat better."),
  j(B, "ecology-evolution", "M", 2, "In a mark–recapture study, 50 animals were marked. A later sample of 40 contained 10 marked animals. The estimated population size is:", ["100", "150", "200", "400"], "N = (50 × 40)/10."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "H", 0, "In germinating cereal grains, gibberellin induces the aleurone layer to produce:", ["α-Amylase", "Lipase", "Catalase", "RuBisCO"], "α-Amylase digests the starch of the endosperm."),
  j(B, "plant-biology", "E", 1, "The edible part of a bean seed is mainly the:", ["Endosperm", "Cotyledons", "Seed coat", "Pericarp"], "Dicot seeds like beans store food in their cotyledons."),
  j(B, "plant-biology", "M", 2, "Heterospory is the production of:", ["One type of spore", "Spores of two sizes", "Only microspores in ferns", "Gametes without meiosis"], "Microspores and megaspores develop into male and female gametophytes."),
  j(B, "plant-biology", "M", 1, "Mycorrhizal fungi benefit plants chiefly by improving the uptake of:", ["Carbon dioxide", "Phosphate and water", "Light", "Oxygen"], "The hyphae extend the effective absorbing area of the roots."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 1, "The pH of a buffer containing equal concentrations of acetic acid and sodium acetate (pKa = 4.76) is:", ["2.38", "4.76", "7.00", "9.52"], "pH = pKa when the acid and its salt are equal."),
  j(B, "general-science", "M", 0, "Evaluate tan 45°:", ["1", "0", "√3", "1/√2"], "The opposite and adjacent sides are equal."),
  j(B, "general-science", "M", 2, "An object is placed 20 cm from a convex lens of focal length 10 cm. The image is formed at:", ["10 cm", "15 cm", "20 cm", "30 cm"], "1/v = 1/10 − 1/20, so v = 20 cm."),
  j(B, "general-science", "M", 1, "The number of neutrons in a ¹⁴C atom is:", ["6", "8", "14", "12"], "14 − 6 = 8."),
  j(B, "general-science", "M", 2, "The sum of the infinite series 1 + 1/2 + 1/4 + … is:", ["1", "3/2", "2", "4"], "a/(1 − r) = 1/(1/2)."),
  j(B, "general-science", "M", 1, "The pressure added by 10 m of water (ρ = 1000 kg/m³, g = 10 m/s²) is about:", ["10⁴ Pa", "10⁵ Pa", "10⁶ Pa", "10³ Pa"], "ρgh = 1000 × 10 × 10."),
];

export const jamBiologicalSciencesMock10 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 1, "Which sequence correctly orders the phases of mitosis?", ["Prophase, anaphase, metaphase, telophase", "Prophase, metaphase, anaphase, telophase", "Metaphase, prophase, anaphase, telophase", "Prophase, telophase, metaphase, anaphase"], "Chromosomes condense, align, separate and then decondense."),
  j(B, "cell-biochemistry", "M", 0, "The coenzyme form of vitamin B₁ (thiamine) is:", ["Thiamine pyrophosphate", "FAD", "NAD⁺", "Coenzyme A"], "TPP is required by pyruvate dehydrogenase and transketolase."),
  j(B, "cell-biochemistry", "M", 2, "The glucose transporter whose number at the cell surface increases in response to insulin is:", ["GLUT1", "GLUT2", "GLUT4", "SGLT1"], "GLUT4 is found in muscle and adipose tissue."),
  j(B, "cell-biochemistry", "M", 1, "Compared with euchromatin, heterochromatin is:", ["Less condensed and transcriptionally active", "More condensed and generally transcriptionally inactive", "Lacking DNA", "Found only in prokaryotes"], "Tightly packed chromatin is poorly accessible to polymerases."),
  j(B, "cell-biochemistry", "M", 0, "Proteins are targeted to the proteasome by attachment of a chain of:", ["Ubiquitin", "Phosphate", "Glycogen", "Acetyl-CoA"], "The polyubiquitin tag is recognised by the proteasome."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 2, "DNA fingerprinting is based on the variation in the number of:", ["Exons", "Promoters", "Tandem repeats (VNTRs)", "Ribosomes"], "Repeat numbers differ widely between individuals."),
  j(B, "genetics-molecular", "M", 1, "Ultraviolet light mainly damages DNA by forming:", ["Strand breaks", "Thymine dimers", "Deaminated adenines", "Methylated guanines"], "Adjacent pyrimidines become covalently linked."),
  j(B, "genetics-molecular", "M", 0, "A cDNA library is made using:", ["Reverse transcriptase", "Restriction enzymes only", "Primase", "DNA gyrase"], "mRNA is copied into complementary DNA."),
  j(B, "genetics-molecular", "H", 1, "Enhancers regulate gene expression by:", ["Being translated into activator proteins", "Binding transcription factors that act on the promoter from a distance", "Encoding tRNA", "Cutting DNA"], "DNA looping brings them close to the promoter."),
  j(B, "genetics-molecular", "M", 1, "In a pedigree, an affected child is born to two unaffected parents. The trait is likely:", ["Autosomal dominant", "Autosomal recessive", "Y-linked", "Mitochondrial"], "Both parents are carriers."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 1, "Red cells of which blood group can be given to recipients of any ABO and Rh group?", ["AB positive", "O negative", "A positive", "B negative"], "O red cells lack A and B antigens, and O-negative cells also lack Rh."),
  j(B, "physiology", "M", 0, "The knee-jerk reflex is an example of a:", ["Monosynaptic reflex", "Polysynaptic reflex", "Conditioned reflex", "Voluntary action"], "A single synapse links the sensory and the motor neuron."),
  j(B, "physiology", "M", 2, "The hormone that causes milk ejection is:", ["Prolactin", "Oestrogen", "Oxytocin", "Progesterone"], "Suckling stimulates its release from the posterior pituitary."),
  j(B, "physiology", "M", 1, "Which structure collects urine from the kidney and carries it to the bladder?", ["Urethra", "Ureter", "Nephron", "Renal artery"], "Peristalsis moves urine through the ureter."),
  j(B, "physiology", "M", 0, "Most of the digestion of carbohydrates is completed in the:", ["Small intestine", "Stomach", "Oesophagus", "Large intestine"], "Pancreatic amylase and brush-border enzymes finish the job."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 2, "The final stable community in an ecological succession is called the:", ["Pioneer community", "Seral stage", "Climax community", "Ecotone"], "It is in equilibrium with the environment."),
  j(B, "ecology-evolution", "M", 1, "Allelopathy is the:", ["Cooperation between species", "Release of chemicals by one plant that inhibit others", "Competition for light", "Parasitism"], "Black walnut produces juglone, which stunts neighbours."),
  j(B, "ecology-evolution", "M", 0, "Gause's principle states that two species with identical niches:", ["Cannot coexist indefinitely", "Always coexist", "Evolve into one", "Hybridise"], "One will outcompete the other."),
  j(B, "ecology-evolution", "H", 1, "The theory of punctuated equilibrium proposes that:", ["Evolution is always gradual and constant", "Species change rapidly in short periods followed by long periods of stability", "Species never change", "Mutation rates stay constant"], "Eldredge and Gould used the fossil record to propose it."),
  j(B, "ecology-evolution", "E", 1, "Which of the following is a primary producer?", ["Mushroom", "Phytoplankton", "Zooplankton", "Earthworm"], "Phytoplankton photosynthesise."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "Aerenchyma in aquatic plants helps in:", ["Gas exchange and buoyancy", "Storage of starch", "Mechanical support only", "Seed dispersal"], "Large air spaces in the tissue carry oxygen to the roots."),
  j(B, "plant-biology", "M", 1, "‘Bolting’ in rosette plants like cabbage can be induced by:", ["Abscisic acid", "Gibberellin", "Ethylene", "Cytokinin"], "GA triggers rapid stem elongation before flowering."),
  j(B, "plant-biology", "M", 2, "Sugars are transported in phloem sieve tubes by:", ["Transpiration pull", "Root pressure", "Pressure flow from source to sink", "Diffusion only"], "Münch's hypothesis explains the bulk flow."),
  j(B, "plant-biology", "M", 1, "A deficiency of iron in plants causes:", ["Early flowering", "Chlorosis of young leaves", "Longer roots", "Thicker stems"], "Iron is needed for chlorophyll synthesis and is not mobile in plants."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 1, "Which of the following shows optical isomerism?", ["Propane", "2-Hydroxypropanoic acid (lactic acid)", "Ethene", "Benzene"], "Lactic acid has a stereogenic centre."),
  j(B, "general-science", "M", 2, "The equation of a straight line with slope 2 passing through the origin is:", ["y = x + 2", "y = 2", "y = 2x", "x = 2y"], "A line through the origin with slope m has the equation y = mx."),
  j(B, "general-science", "M", 0, "Pressure is measured in the SI unit called the:", ["Pascal", "Newton", "Joule", "Watt"], "One pascal is one newton per square metre."),
  j(B, "general-science", "E", 3, "Glucose has which molecular formula?", ["C₆H₁₀O₅", "C₁₂H₂₂O₁₁", "C₆H₁₂O₅", "C₆H₁₂O₆"], "It is a hexose."),
  j(B, "general-science", "M", 1, "The standard deviation of the values 2, 4, 6, 8 (population) is:", ["√2", "√5", "5", "2.5"], "The mean is 5; the variance is (9 + 1 + 1 + 9)/4 = 5."),
  j(B, "general-science", "M", 2, "A wave travels from air into glass. Which quantity remains unchanged?", ["Speed", "Wavelength", "Frequency", "Amplitude always"], "The frequency is set by the source."),
];

export const jamBiologicalSciencesMock11 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 0, "The sodium-dependent glucose transporter in the intestine is an example of:", ["Secondary active transport", "Simple diffusion", "Primary active transport", "Facilitated diffusion"], "It uses the Na⁺ gradient maintained by the Na⁺/K⁺ pump."),
  j(B, "cell-biochemistry", "M", 2, "Which organelle is involved in detoxification of drugs in liver cells?", ["Rough ER", "Golgi", "Smooth ER", "Lysosome"], "Cytochrome P450 enzymes are located in the smooth ER."),
  j(B, "cell-biochemistry", "M", 1, "In the lock-and-key model, the specificity of an enzyme arises from the:", ["Cofactor only", "Shape and chemistry of its active site", "Rate of the reaction", "Temperature"], "The substrate fits the active site."),
  j(B, "cell-biochemistry", "H", 2, "Which complex of the respiratory chain does NOT pump protons?", ["Complex I", "Complex III", "Complex II", "Complex IV"], "Succinate dehydrogenase passes electrons to ubiquinone without proton pumping."),
  j(B, "cell-biochemistry", "M", 1, "The tertiary structure of a protein is stabilised by:", ["Peptide bonds only", "Side-chain interactions such as hydrogen bonds, ionic bonds and disulphides", "Phosphodiester bonds", "Glycosidic bonds"], "These interactions fold the polypeptide into its 3D shape."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 0, "Which of the following techniques amplifies a specific DNA sequence?", ["PCR", "Western blot", "ELISA", "Gel filtration"], "Repeated cycles double the target DNA."),
  j(B, "genetics-molecular", "M", 1, "A mutation that changes a codon to another codon for the same amino acid is called:", ["Nonsense", "Silent", "Missense", "Frameshift"], "The genetic code is degenerate."),
  j(B, "genetics-molecular", "H", 2, "Which RNA contains an anticodon?", ["mRNA", "rRNA", "tRNA", "snRNA"], "The anticodon loop of tRNA reads the codon."),
  j(B, "genetics-molecular", "M", 1, "An individual with the genotype AaBb produces gametes AB, Ab, aB and ab in equal numbers if the genes are:", ["Completely linked", "Independently assorting", "Sex-linked", "Mitochondrial"], "Independent assortment gives four equal gamete classes."),
  j(B, "genetics-molecular", "M", 0, "Which enzyme seals nicks between adjacent nucleotides in DNA?", ["DNA ligase", "Helicase", "Topoisomerase", "Primase"], "It forms phosphodiester bonds."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 1, "Which part of the brain is the centre for respiratory rhythm?", ["Cerebrum", "Medulla oblongata", "Cerebellum", "Hippocampus"], "Respiratory neurons in the medulla set the basic breathing pattern."),
  j(B, "physiology", "M", 0, "The cells that secrete HCl in the stomach are the:", ["Parietal cells", "Chief cells", "Goblet cells", "Mucous neck cells"], "They also secrete intrinsic factor."),
  j(B, "physiology", "M", 2, "Which hormone is secreted by the adrenal medulla?", ["Cortisol", "Aldosterone", "Adrenaline", "Testosterone"], "Adrenaline and noradrenaline prepare the body for ‘fight or flight’."),
  j(B, "physiology", "M", 1, "The main function of the Eustachian tube is to:", ["Carry sound to the cochlea", "Equalise pressure on both sides of the eardrum", "Produce earwax", "Detect balance"], "It connects the middle ear to the pharynx."),
  j(B, "physiology", "M", 0, "Erythrocytes are destroyed mainly in the:", ["Spleen", "Pancreas", "Thyroid", "Lungs"], "Old red cells are removed by macrophages in the spleen."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 1, "An ecosystem service provided by forests is:", ["Raising the water table to cause floods", "Carbon sequestration", "Increasing erosion", "Reducing rainfall"], "Trees store carbon in their biomass and soil."),
  j(B, "ecology-evolution", "M", 0, "Sympatric speciation commonly occurs through:", ["Polyploidy", "Mountain formation", "Continental drift", "River formation"], "Polyploids can be reproductively isolated in a single generation."),
  j(B, "ecology-evolution", "H", 1, "The ‘tragedy of the commons’ describes:", ["The extinction of fossils", "Overuse of shared resources by self-interested individuals", "A mutualism", "Genetic drift in islands"], "Individuals benefit from exploiting a shared resource while the cost is shared."),
  j(B, "ecology-evolution", "M", 2, "The Montreal Protocol aims to protect:", ["Wetlands", "Endangered species", "The ozone layer", "Forests"], "It phases out ozone-depleting substances."),
  j(B, "ecology-evolution", "M", 1, "Vestigial organs provide evidence for:", ["Special creation", "Common ancestry and evolution", "Lamarckism", "Absence of change"], "They are remnants of structures functional in ancestors."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 2, "Which phytohormone is responsible for the ‘bakanae’ (foolish seedling) disease of rice?", ["Auxin", "Ethylene", "Gibberellin", "ABA"], "Fungal gibberellin causes excessive elongation."),
  j(B, "plant-biology", "M", 0, "The primary function of root hairs is to:", ["Absorb water and minerals", "Store food", "Photosynthesise", "Anchor the plant only"], "They increase the surface area for absorption."),
  j(B, "plant-biology", "M", 1, "The photosynthetic pigment that absorbs light and passes energy to the reaction centre is part of the:", ["Cytochrome complex", "Antenna (light-harvesting) complex", "ATP synthase", "Calvin cycle"], "Antenna pigments funnel the excitation energy inward."),
  j(B, "plant-biology", "M", 0, "Most gymnosperms are pollinated by:", ["Wind", "Insects", "Birds", "Water"], "They produce large amounts of light pollen."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 1, "The conjugate acid of NH₃ is:", ["NH₂⁻", "NH₄⁺", "N₂H₄", "NH₂OH"], "NH₃ accepts a proton."),
  j(B, "general-science", "M", 1, "The determinant of the matrix [[3, 1], [2, 4]] is:", ["10", "14", "12", "8"], "3 × 4 − 1 × 2."),
  j(B, "general-science", "M", 0, "A resistor of 10 Ω carries a current of 2 A. The heat produced per second is:", ["40 W", "20 W", "5 W", "100 W"], "Joule heating gives P = I²R = 4 × 10 = 40 W."),
  j(B, "general-science", "M", 2, "The sum of the roots of x² − 7x + 12 = 0 is:", ["12", "−7", "7", "−12"], "The sum of the roots is −b/a."),
  j(B, "general-science", "E", 3, "The element with atomic number 8 is:", ["Nitrogen", "Carbon", "Fluorine", "Oxygen"], "Oxygen has 8 protons."),
  j(B, "general-science", "M", 1, "The half-life of a radioactive sample is 5 days. The fraction remaining after 15 days is:", ["1/4", "1/8", "1/16", "1/2"], "Three half-lives: (1/2)³."),
];

export const jamBiologicalSciencesMock12 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "H", 1, "In the Lineweaver–Burk plot of an uncompetitive inhibitor, compared to the uninhibited enzyme, the lines are:", ["Intersecting on the y-axis", "Parallel", "Intersecting on the x-axis", "Identical"], "Both Km and Vmax decrease by the same factor."),
  j(B, "cell-biochemistry", "H", 2, "The chemiosmotic hypothesis was proposed by:", ["Krebs", "Calvin", "Mitchell", "Meselson"], "Peter Mitchell proposed that the proton gradient drives ATP synthesis."),
  j(B, "cell-biochemistry", "H", 0, "Which amino acid is most likely to be found in the interior of a globular water-soluble protein?", ["Leucine", "Lysine", "Aspartate", "Arginine"], "Hydrophobic residues are buried, away from water."),
  j(B, "cell-biochemistry", "H", 1, "Ras proteins become oncogenic when mutations make them:", ["Permanently bound to GDP", "Permanently active (GTP-bound)", "Unable to be made", "Unable to bind membranes"], "Loss of GTPase activity locks the protein in the on state."),
  j(B, "cell-biochemistry", "M", 2, "The enzyme complex that adds the 5′ cap to eukaryotic pre-mRNA works:", ["After translation", "After splicing only", "Co-transcriptionally", "In the cytoplasm"], "Capping occurs when the nascent RNA is about 25 nucleotides long."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "H", 1, "A cross AaBb × aabb yields 42% AaBb, 8% Aabb, 8% aaBb and 42% aabb. The map distance between the loci is:", ["8 cM", "16 cM", "42 cM", "84 cM"], "Recombinants are 16% of the progeny."),
  j(B, "genetics-molecular", "H", 2, "Which of the following is an example of an epigenetic mark?", ["A point mutation", "A deletion", "DNA methylation", "A translocation"], "It changes expression without altering the DNA sequence."),
  j(B, "genetics-molecular", "M", 0, "The CRISPR–Cas9 system cuts DNA at a site specified by:", ["A guide RNA complementary to the target", "A restriction site", "A promoter", "A ribosome binding site"], "The Cas9 nuclease is directed by base pairing."),
  j(B, "genetics-molecular", "H", 1, "In prokaryotic translation initiation, the 30S subunit binds the mRNA by pairing between 16S rRNA and the:", ["Poly(A) tail", "Shine–Dalgarno sequence", "5′ cap", "Intron"], "It lies a few bases upstream of the start codon."),
  j(B, "genetics-molecular", "H", 2, "If the frequency of a recessive lethal allele q in a population is 0.01, the frequency of carriers is about:", ["0.0001", "0.01", "0.02", "0.1"], "2pq ≈ 2 × 0.99 × 0.01."),
  // ───────── Physiology ─────────
  j(B, "physiology", "H", 0, "The Frank–Starling law of the heart states that:", ["Stroke volume increases as the end-diastolic volume increases", "Heart rate is independent of venous return", "The atria contract after the ventricles", "Stroke volume falls with increased filling"], "A greater stretch of cardiac muscle gives a stronger contraction."),
  j(B, "physiology", "H", 1, "In the nephron, tubular secretion of H⁺ occurs mainly in the:", ["Loop of Henle's thin segment", "Proximal and distal tubules", "Bowman's capsule", "Renal pelvis"], "This helps regulate blood pH."),
  j(B, "physiology", "M", 2, "Long-term memory formation involves the:", ["Cerebellum", "Medulla", "Hippocampus", "Pons"], "The hippocampus is crucial for consolidating new declarative memories."),
  j(B, "physiology", "H", 1, "A drug that blocks acetylcholinesterase at the neuromuscular junction would cause:", ["Flaccid paralysis", "Prolonged muscle stimulation (spastic paralysis)", "Increased blood glucose", "A fall in heart rate only"], "Acetylcholine persists and keeps stimulating the receptors."),
  j(B, "physiology", "H", 2, "Which of the following shifts the haemoglobin–oxygen dissociation curve to the right?", ["Fall in temperature", "Increased pH", "Increased CO₂ and 2,3-BPG", "Fetal haemoglobin"], "These factors reduce the affinity for oxygen."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "H", 0, "In a population at Hardy–Weinberg equilibrium with 4% of individuals being recessive (aa), the frequency of heterozygotes is:", ["32%", "16%", "48%", "64%"], "q = 0.2, p = 0.8, 2pq = 0.32."),
  j(B, "ecology-evolution", "H", 2, "Reciprocal altruism requires that individuals:", ["Are genetically identical", "Never meet again", "Interact repeatedly and recognise cheaters", "Live in large groups only"], "Trivers' idea depends on repeated interaction."),
  j(B, "ecology-evolution", "H", 1, "According to the island biogeography theory, the species richness on an island is the balance between:", ["Birth and death", "Immigration and extinction", "Predation and competition", "Temperature and rainfall"], "MacArthur and Wilson modelled the equilibrium number."),
  j(B, "ecology-evolution", "M", 1, "The Simpson's diversity index is higher when:", ["A single species dominates", "Species are more evenly represented", "There are very few species", "Individuals are all of one species"], "Evenness and richness increase diversity."),
  j(B, "ecology-evolution", "H", 0, "Industrial melanism in the peppered moth is an example of:", ["Directional selection", "Stabilising selection", "Disruptive selection", "Genetic drift"], "The allele for dark colour increased in polluted woods."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "H", 1, "Which type of plant uses PEP carboxylase at night to fix CO₂ into organic acids?", ["C₃ plants", "CAM plants", "C₄ plants", "Gymnosperms"], "Stomata open in the cool night to reduce water loss."),
  j(B, "plant-biology", "H", 0, "The enzyme nitrogenase is inhibited by:", ["Oxygen", "Hydrogen", "Nitrogen gas", "ATP"], "Leghaemoglobin in nodules keeps free oxygen low."),
  j(B, "plant-biology", "M", 1, "Which plant hormone is a derivative of the amino acid tryptophan?", ["Gibberellin", "Auxin (IAA)", "Abscisic acid", "Cytokinin"], "Indole-3-acetic acid is made from tryptophan."),
  j(B, "plant-biology", "H", 2, "The pressure-flow hypothesis of phloem transport requires:", ["Transpiration", "Root pressure only", "A turgor pressure gradient between source and sink", "Cytoplasmic streaming alone"], "Loading at the source draws in water and raises pressure."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "H", 1, "A first-order reaction is 75% complete in 40 minutes. Its half-life is:", ["10 min", "20 min", "40 min", "80 min"], "75% completion is two half-lives."),
  j(B, "general-science", "H", 0, "The Nernst potential for a monovalent cation at 37 °C is 61 mV × log(Cout/Cin). If Cout is 10 times Cin, the potential is:", ["+61 mV", "−61 mV", "+6.1 mV", "0 mV"], "log 10 = 1."),
  j(B, "general-science", "M", 1, "The value of ∫₀¹ eˣ dx is:", ["e", "e − 1", "1", "e + 1"], "[eˣ] from 0 to 1."),
  j(B, "general-science", "H", 2, "A projectile is launched at 30° above the horizontal with speed 20 m/s (g = 10 m/s²). Its time of flight is:", ["1 s", "2 s", "3 s", "4 s"], "T = 2u sin θ/g."),
  j(B, "general-science", "H", 1, "If the probability of an event is 0.2 in each of 3 independent trials, the probability it occurs at least once is:", ["0.008", "0.488", "0.6", "0.8"], "1 − 0.8³ = 0.488."),
  j(B, "general-science", "H", 3, "The oxidation number of Cr in the dichromate ion Cr₂O₇²⁻ is:", ["+3", "+4", "+7", "+6"], "2x − 14 = −2 gives x = +6."),
];
