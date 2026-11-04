// IIT JAM Biological Sciences (BL) — Mocks 2 to 4: 30 MCQs each, written fresh: cell biology and biochemistry 5, genetics and molecular
// biology 5, physiology 5, ecology and evolution 5, plant biology 4, chemistry, mathematics and physics 6.

import { j } from "./types";

const B = "jam-biological-sciences";

export const jamBiologicalSciencesMock2 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 1, "Which cell organelle is the main site of phospholipid synthesis?", ["Rough ER", "Smooth ER", "Lysosome", "Nucleolus"], "Enzymes of the smooth ER membrane make phospholipids and steroids."),
  j(B, "cell-biochemistry", "M", 1, "Facilitated diffusion across a membrane requires:", ["ATP", "A carrier or channel protein", "A proton gradient", "Vesicle formation"], "Solutes move down their gradient through a protein pathway without energy input."),
  j(B, "cell-biochemistry", "M", 0, "An increase in the proportion of unsaturated fatty acids in membrane lipids:", ["Increases membrane fluidity", "Decreases membrane fluidity", "Makes the membrane impermeable", "Has no effect"], "Double bonds introduce kinks that prevent tight packing."),
  j(B, "cell-biochemistry", "M", 2, "The reactions of the citric acid cycle take place in the:", ["Cytosol", "Inner mitochondrial membrane", "Mitochondrial matrix", "Nucleus"], "Most cycle enzymes are dissolved in the matrix."),
  j(B, "cell-biochemistry", "E", 2, "Protein kinases regulate proteins by adding:", ["Methyl groups", "Acetyl groups", "Phosphate groups", "Sugar chains"], "Phosphorylation changes the activity of the target protein."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 0, "A TATA box found upstream of many eukaryotic genes is bound by:", ["TFIID (TBP)", "DNA ligase", "Spliceosome", "Ribosome"], "The TATA-binding protein positions the pre-initiation complex."),
  j(B, "genetics-molecular", "M", 1, "Deletion of a single nucleotide from a coding sequence leads to a:", ["Silent mutation", "Frameshift mutation", "Missense mutation only", "No change"], "All the codons downstream are read in a shifted frame."),
  j(B, "genetics-molecular", "M", 1, "The enzyme that attaches an amino acid to its tRNA is:", ["Peptidyl transferase", "Aminoacyl-tRNA synthetase", "RNA polymerase III", "Helicase"], "Each amino acid has its own synthetase, which ensures accurate translation."),
  j(B, "genetics-molecular", "M", 1, "In the absence of lactose the lac repressor:", ["Is removed from the operator", "Binds the operator and blocks transcription", "Degrades the mRNA", "Activates the promoter"], "The repressor blocks RNA polymerase from transcribing the structural genes."),
  j(B, "genetics-molecular", "M", 1, "In a PCR cycle, the primers bind to the template during the:", ["Denaturation step", "Annealing step", "Extension step", "Termination step"], "The temperature is lowered to about 55 °C for annealing."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 0, "A person has a heart rate of 70 beats/min and a stroke volume of 70 mL. The cardiac output is about:", ["4.9 L/min", "0.49 L/min", "49 L/min", "7 L/min"], "CO = HR × SV = 70 × 0.07 L."),
  j(B, "physiology", "M", 2, "Oxygenated blood from the lungs returns to the heart through the:", ["Pulmonary artery", "Vena cava", "Pulmonary veins", "Aorta"], "The pulmonary veins enter the left atrium."),
  j(B, "physiology", "M", 1, "Which hormone raises blood glucose by stimulating glycogen breakdown?", ["Insulin", "Glucagon", "Oxytocin", "Calcitonin"], "Glucagon is secreted by the α cells of the pancreas."),
  j(B, "physiology", "M", 1, "Myelination of axons increases conduction speed because it allows:", ["Continuous conduction", "Saltatory conduction between nodes of Ranvier", "Reverse conduction", "Diffusion of the signal"], "The action potential jumps from node to node."),
  j(B, "physiology", "M", 0, "The main role of bile in digestion is to:", ["Emulsify fats", "Digest proteins", "Digest starch", "Neutralise pepsin"], "Bile salts break large fat droplets into smaller ones."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 0, "The pyramid of energy in an ecosystem is always:", ["Upright", "Inverted", "Spindle-shaped", "Irregular"], "Energy is lost at each trophic level, so there is less at higher levels."),
  j(B, "ecology-evolution", "M", 1, "The wings of a bat and the wings of an insect are examples of:", ["Homologous structures", "Analogous structures", "Vestigial structures", "Atavistic structures"], "They have similar functions but evolved independently."),
  j(B, "ecology-evolution", "M", 2, "In the logistic growth model, the population growth rate becomes zero when the population size reaches:", ["The intrinsic rate r", "Half the carrying capacity", "The carrying capacity K", "Zero"], "At N = K, dN/dt = rN(1 − N/K) = 0."),
  j(B, "ecology-evolution", "M", 1, "Which of these regions is a biodiversity hotspot in India?", ["The Thar desert", "The Western Ghats", "The Deccan plateau", "The Gangetic plain"], "The Western Ghats have high endemism and are threatened by habitat loss."),
  j(B, "ecology-evolution", "M", 0, "The founder effect refers to:", ["Reduced genetic variation in a new population started by a few individuals", "Mutation in a single gene", "Selection for a trait", "Gene flow between populations"], "A small sample of the original gene pool is not representative."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "Photorespiration occurs because RuBisCO can also act as an:", ["Oxygenase", "Dehydrogenase", "Kinase", "Hydrolase"], "Oxygen competes with CO₂ at the active site."),
  j(B, "plant-biology", "M", 1, "The cohesion–tension theory explains the:", ["Transport of sugars in phloem", "Ascent of water in xylem", "Opening of stomata", "Germination of seeds"], "Transpiration creates tension that pulls cohesive water columns up."),
  j(B, "plant-biology", "M", 2, "Which plant hormone stimulates stem elongation and breaks seed dormancy?", ["Abscisic acid", "Ethylene", "Gibberellin", "Cytokinin"], "Gibberellins induce hydrolytic enzymes in germinating seeds."),
  j(B, "plant-biology", "E", 1, "Parallel venation of leaves is characteristic of:", ["Dicots", "Monocots", "Gymnosperms only", "Ferns only"], "Monocot leaves typically show parallel veins."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 1, "The number of moles in 4.4 g of CO₂ (M = 44 g/mol) is:", ["0.01", "0.1", "1", "10"], "n = 4.4/44."),
  j(B, "general-science", "M", 1, "The value of ∫₀² x dx is:", ["1", "2", "4", "1/2"], "[x²/2] from 0 to 2 = 2."),
  j(B, "general-science", "M", 2, "A body falls freely from rest (g = 10 m/s²). Its speed after 3 s is:", ["10 m/s", "15 m/s", "30 m/s", "45 m/s"], "For free fall from rest, v = gt = 10 × 3 = 30 m/s."),
  j(B, "general-science", "M", 2, "The pH of a 0.01 M NaOH solution at 25 °C is:", ["2", "10", "12", "14"], "pOH = 2, so pH = 12."),
  j(B, "general-science", "E", 2, "The arithmetic mean of 4, 8 and 12 is:", ["6", "7", "8", "12"], "(4 + 8 + 12)/3 = 8."),
  j(B, "general-science", "M", 1, "Light of wavelength 600 nm has a frequency of (c = 3 × 10⁸ m/s):", ["5 × 10¹⁴ Hz", "2 × 10¹⁵ Hz", "1.8 × 10¹¹ Hz", "5 × 10⁶ Hz"], "f = c/λ = 3 × 10⁸/6 × 10⁻⁷."),
];

export const jamBiologicalSciencesMock3 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 2, "The main storage polysaccharide in animal cells is:", ["Starch", "Cellulose", "Glycogen", "Chitin"], "Glycogen is a highly branched glucose polymer stored in liver and muscle."),
  j(B, "cell-biochemistry", "M", 1, "Which type of bond is formed between two cysteine residues in a protein?", ["Peptide bond", "Disulphide bond", "Glycosidic bond", "Ester bond"], "The thiol groups are oxidised to form S–S bridges."),
  j(B, "cell-biochemistry", "M", 3, "The cell cycle checkpoint at the G2/M boundary mainly ensures that:", ["Spindle attachment is complete", "Cells have enough nutrients to enter G1", "Chromosomes have separated", "DNA is completely and correctly replicated"], "Damaged or unreplicated DNA blocks mitotic entry."),
  j(B, "cell-biochemistry", "M", 0, "The Km of an enzyme is the substrate concentration at which the velocity is:", ["Half of Vmax", "Equal to Vmax", "Twice Vmax", "Zero"], "It reflects the affinity of the enzyme for its substrate."),
  j(B, "cell-biochemistry", "H", 2, "Oxygen is the final electron acceptor in the electron transport chain because it:", ["Is abundant in cells", "Is a hydrophobic gas", "Has a high affinity for electrons (high reduction potential)", "Is reduced by NADH directly"], "The large positive reduction potential of O₂ drives electron flow."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 1, "Which DNA polymerase is chiefly responsible for chain elongation during E. coli replication?", ["DNA polymerase I", "DNA polymerase III", "DNA polymerase II", "Taq polymerase"], "Pol III is the replicative holoenzyme."),
  j(B, "genetics-molecular", "M", 1, "The anticodon of a tRNA that reads the codon 5′-GCA-3′ is:", ["5′-UGC-3′", "5′-CGU-3′", "5′-GCA-3′", "5′-ACG-3′"], "The anticodon pairs antiparallel with the codon."),
  j(B, "genetics-molecular", "M", 2, "Introns are removed from pre-mRNA by:", ["Ribonuclease H", "RNA polymerase", "The spliceosome", "Reverse transcriptase"], "snRNPs recognise the splice sites and join the exons."),
  j(B, "genetics-molecular", "M", 1, "In a testcross of AaBb × aabb, 40% of progeny are AaBb and 40% aabb; the rest are recombinants. The recombination frequency is:", ["10%", "20%", "40%", "80%"], "20% are recombinant."),
  j(B, "genetics-molecular", "M", 0, "Southern blotting is used to detect:", ["Specific DNA sequences", "Specific RNA sequences", "Specific proteins", "Specific lipids"], "Digested DNA is transferred to a membrane and probed."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 2, "Most CO₂ in the blood is transported as:", ["Dissolved CO₂", "Carbaminohaemoglobin", "Bicarbonate ions", "Carbonic acid"], "Carbonic anhydrase converts CO₂ to HCO₃⁻ inside red cells."),
  j(B, "physiology", "M", 1, "The part of the nephron where most water reabsorption occurs is the:", ["Glomerulus", "Proximal convoluted tubule", "Ureter", "Bowman's capsule"], "About two-thirds of the filtrate is reabsorbed there."),
  j(B, "physiology", "M", 0, "Which ion influx is responsible for the depolarisation phase of a neuronal action potential?", ["Na⁺", "K⁺", "Cl⁻", "Ca²⁺ only"], "Voltage-gated sodium channels open when the threshold is reached."),
  j(B, "physiology", "M", 1, "Which of the following hormones is a steroid?", ["Insulin", "Cortisol", "Adrenaline", "Thyroxine"], "Cortisol is made from cholesterol in the adrenal cortex."),
  j(B, "physiology", "M", 3, "The enzyme that begins protein digestion in the stomach is:", ["Trypsin", "Amylase", "Lipase", "Pepsin"], "Pepsin is active at the acidic pH of the stomach."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 2, "A relationship in which one species benefits and the other is neither harmed nor helped is called:", ["Mutualism", "Parasitism", "Commensalism", "Competition"], "Epiphytes on trees are a classic example."),
  j(B, "ecology-evolution", "M", 1, "The Hardy–Weinberg principle assumes that the population has:", ["Strong natural selection", "Random mating and no selection, mutation or migration", "A very small size", "Frequent migration"], "These conditions keep allele frequencies constant."),
  j(B, "ecology-evolution", "M", 0, "The term ‘biological magnification’ refers to the:", ["Increasing concentration of a toxin at higher trophic levels", "Growth of a population", "Decomposition of litter", "Rise in species richness"], "Persistent chemicals such as DDT accumulate along the food chain."),
  j(B, "ecology-evolution", "M", 3, "Which gas is the major contributor to the enhanced greenhouse effect?", ["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"], "CO₂ from fossil fuel burning traps outgoing infrared radiation."),
  j(B, "ecology-evolution", "H", 1, "Allopatric speciation occurs when populations are separated by:", ["Behavioural isolation within the same area", "A geographic barrier", "Polyploidy", "Habitat preference within the same area"], "Physical separation interrupts gene flow so populations diverge."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 1, "The Hill reaction demonstrated that the oxygen released in photosynthesis comes from:", ["CO₂", "Water", "Glucose", "ATP"], "Isolated chloroplasts released O₂ in the presence of an electron acceptor, without CO₂."),
  j(B, "plant-biology", "M", 2, "Seeds of angiosperms develop from the:", ["Ovary", "Stigma", "Ovule", "Style"], "After fertilisation the ovule becomes the seed."),
  j(B, "plant-biology", "M", 0, "Chlorophyll absorbs light mainly in which wavelengths?", ["Blue and red", "Green and yellow", "Infrared", "Ultraviolet only"], "Green light is mostly reflected, which is why leaves look green."),
  j(B, "plant-biology", "M", 1, "Water enters a root hair mainly by:", ["Active transport", "Osmosis", "Pinocytosis", "Cyclosis"], "The soil solution has a higher water potential than the root cell sap."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 1, "A 0.2 M solution is diluted by adding water so that 50 mL becomes 200 mL. The final concentration is:", ["0.4 M", "0.05 M", "0.8 M", "0.1 M"], "C₂ = 0.2 × 50/200."),
  j(B, "general-science", "M", 0, "The oxidation state of nitrogen in NH₄⁺ is:", ["−3", "+3", "+4", "−4"], "x + 4(+1) = +1 gives x = −3."),
  j(B, "general-science", "M", 1, "The derivative of ln x with respect to x is:", ["x", "1/x", "ln x", "e^x"], "d/dx (ln x) = 1/x."),
  j(B, "general-science", "M", 1, "A lamp rated 60 W works for 2 hours. The energy consumed is:", ["120 J", "0.12 kWh", "30 kWh", "1.2 kWh"], "60 W × 2 h = 120 Wh = 0.12 kWh."),
  j(B, "general-science", "M", 2, "The probability of getting two heads in two tosses of a fair coin is:", ["1/2", "1/3", "1/4", "3/4"], "Each toss gives a head with probability 1/2, so (1/2)² = 1/4."),
  j(B, "general-science", "H", 1, "A gas at 300 K and 1 atm is heated to 600 K at constant volume. Its pressure becomes:", ["0.5 atm", "2 atm", "4 atm", "1 atm"], "P ∝ T at constant volume."),
];

export const jamBiologicalSciencesMock4 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 1, "Which of the following is a competitive inhibitor of succinate dehydrogenase?", ["Pyruvate", "Malonate", "Citrate", "Acetyl-CoA"], "Malonate resembles succinate and occupies the active site."),
  j(B, "cell-biochemistry", "M", 1, "Which of the following is a feature of active transport?", ["Movement down the concentration gradient", "Movement against a gradient using energy", "Requires no protein", "Occurs only in plants"], "ATP or an ion gradient drives uphill transport."),
  j(B, "cell-biochemistry", "E", 0, "The monomers of proteins are:", ["Amino acids", "Nucleotides", "Monosaccharides", "Fatty acids"], "Amino acids are linked by peptide bonds."),
  j(B, "cell-biochemistry", "M", 2, "The cytoskeletal fibres with the smallest diameter are the:", ["Microtubules", "Intermediate filaments", "Microfilaments (actin)", "Cilia"], "Actin filaments are about 7 nm in diameter."),
  j(B, "cell-biochemistry", "M", 1, "Which of the following is NOT a function of the Golgi apparatus?", ["Glycosylation of proteins", "Packaging into vesicles", "Synthesis of ATP by oxidative phosphorylation", "Sorting of proteins"], "ATP synthesis occurs in mitochondria."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 0, "The base that replaces thymine in RNA is:", ["Uracil", "Cytosine", "Guanine", "Adenine"], "RNA contains uracil instead of thymine."),
  j(B, "genetics-molecular", "M", 1, "The Meselson–Stahl experiment proved that DNA replication is:", ["Conservative", "Semiconservative", "Dispersive", "Random"], "Each daughter duplex has one old and one new strand."),
  j(B, "genetics-molecular", "M", 1, "In humans, the genetic basis of cystic fibrosis is a mutation in the gene encoding:", ["Haemoglobin", "CFTR chloride channel", "Insulin", "Collagen"], "It is an autosomal recessive disorder."),
  j(B, "genetics-molecular", "H", 2, "The expected phenotypic ratio from a cross between two double heterozygotes (AaBb × AaBb) for two independent genes with complete dominance is:", ["3:1", "1:1:1:1", "9:3:3:1", "1:2:1"], "This is Mendel's dihybrid ratio."),
  j(B, "genetics-molecular", "M", 1, "The enzyme used in the polymerase chain reaction is isolated from:", ["Escherichia coli", "Thermus aquaticus", "Bacillus subtilis", "Saccharomyces"], "Taq polymerase tolerates the repeated heating."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 1, "The pacemaker region that sets the heart rate is the:", ["AV node", "SA node", "Purkinje fibres", "Aortic valve"], "The sinoatrial node depolarises spontaneously."),
  j(B, "physiology", "M", 0, "Blood pressure is highest in the:", ["Aorta", "Capillaries", "Veins", "Vena cava"], "Pressure falls progressively along the circulation."),
  j(B, "physiology", "M", 0, "The hormone that regulates the metabolic rate and is secreted by the thyroid is:", ["Thyroxine", "Calcitonin", "Glucagon", "Cortisol"], "Thyroxine (T4) and T3 contain iodine."),
  j(B, "physiology", "M", 3, "Where does fertilisation normally occur in a woman's reproductive tract?", ["Uterus", "Ovary", "Vagina", "Fallopian tube"], "The ampulla of the oviduct is the usual site."),
  j(B, "physiology", "M", 2, "Haemoglobin has the highest affinity for which gas?", ["O₂", "CO₂", "CO", "N₂"], "Carbon monoxide binds about 200 times more strongly than oxygen."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 2, "Primary succession starts on:", ["An abandoned farmland", "A burnt forest", "Bare rock", "A cleared pond"], "No soil is present at the start."),
  j(B, "ecology-evolution", "M", 0, "Gross primary productivity minus respiration by plants gives:", ["Net primary productivity", "Secondary productivity", "Biomass", "Standing crop"], "NPP is the energy available to consumers."),
  j(B, "ecology-evolution", "M", 1, "Darwin's finches are cited as an example of:", ["Convergent evolution", "Adaptive radiation", "Coevolution", "Genetic drift only"], "Different beak shapes evolved from a common ancestor on the Galápagos."),
  j(B, "ecology-evolution", "M", 1, "Which of the following is an in situ conservation method?", ["Zoo", "National park", "Seed bank", "Botanical garden"], "In situ means conservation within the natural habitat."),
  j(B, "ecology-evolution", "H", 1, "The ‘Red Queen hypothesis’ explains:", ["Why all species become extinct", "Continuous coevolution between interacting species", "The origin of mitochondria", "Gene flow"], "Species must keep evolving to maintain their relative fitness."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "Which tissue conducts water and minerals from roots to leaves?", ["Xylem", "Phloem", "Cambium", "Epidermis"], "Xylem vessels and tracheids are dead, hollow conduits."),
  j(B, "plant-biology", "M", 2, "The ‘triple response’ of seedlings is caused by:", ["Auxin", "Cytokinin", "Ethylene", "Gibberellin"], "Ethylene inhibits elongation and thickens the stem."),
  j(B, "plant-biology", "M", 1, "Stomatal opening is promoted by:", ["Abscisic acid", "Blue light", "High CO₂ in the leaf", "Drought"], "Blue light activates a proton pump in guard cells."),
  j(B, "plant-biology", "M", 1, "Nitrogen-fixing symbiotic bacteria in legumes live in:", ["Root hairs", "Root nodules", "Leaves", "Stems"], "Rhizobium resides in nodules formed on the root."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 3, "The hybridisation of carbon in methane is:", ["sp", "sp²", "sp²d", "sp³"], "Four σ bonds give a tetrahedral arrangement."),
  j(B, "general-science", "M", 1, "The solution of the equation 3x − 7 = 11 is:", ["4", "6", "18", "3"], "Adding 7 gives 3x = 18, so x = 6."),
  j(B, "general-science", "M", 0, "The unit of power is the:", ["Watt", "Joule", "Newton", "Pascal"], "One watt is one joule per second."),
  j(B, "general-science", "E", 0, "The number of grams in 0.5 mol of NaCl (M = 58.5 g/mol) is:", ["29.25", "58.5", "117", "2.9"], "m = 0.5 × 58.5."),
  j(B, "general-science", "M", 1, "A fair die is rolled. The probability of getting a number greater than 4 is:", ["1/6", "1/3", "1/2", "2/3"], "5 and 6 qualify."),
  j(B, "general-science", "M", 0, "The refractive index of a medium is defined as:", ["Speed of light in vacuum divided by speed in the medium", "Speed in the medium divided by the speed in vacuum", "Frequency of light times wavelength", "Angle of incidence divided by the angle of refraction"], "The refractive index is the ratio n = c/v of the speeds."),
];
