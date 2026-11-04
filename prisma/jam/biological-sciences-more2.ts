// IIT JAM Biological Sciences (BL) — Mocks 5 to 8: 30 MCQs each, written fresh: cell biology and biochemistry 5, genetics and molecular
// biology 5, physiology 5, ecology and evolution 5, plant biology 4, chemistry, mathematics and physics 6.

import { j } from "./types";

const B = "jam-biological-sciences";

export const jamBiologicalSciencesMock5 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 0, "The cristae of a mitochondrion serve to:", ["Increase the surface area for ATP synthesis", "Raise membrane fluidity", "Degrade proteins", "Store DNA"], "Folding of the inner membrane packs in more electron transport chains and ATP synthase."),
  j(B, "cell-biochemistry", "M", 0, "A double-stranded DNA sample has 30% guanine. The percentage of adenine is:", ["20%", "30%", "40%", "60%"], "G = C = 30%, so A + T = 40% and A = 20%."),
  j(B, "cell-biochemistry", "M", 0, "A coenzyme differs from a prosthetic group in being:", ["Loosely bound to the enzyme", "Permanently bound to the enzyme", "Always a protein", "Always inorganic"], "Coenzymes such as NAD⁺ associate with enzymes only transiently."),
  j(B, "cell-biochemistry", "M", 1, "The hydrophobic effect is the main driving force for:", ["Peptide bond formation", "The burial of non-polar side chains inside folded proteins", "DNA replication", "Glycosylation"], "Water is excluded from non-polar residues, which collapse into the core."),
  j(B, "cell-biochemistry", "M", 2, "In animal cells, the main microtubule-organising centre is the:", ["Nucleolus", "Golgi body", "Centrosome", "Plasma membrane"], "The centrosome nucleates the spindle during mitosis."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 1, "The Hershey–Chase experiment with ³²P and ³⁵S showed that the genetic material of bacteriophage T2 is:", ["Protein", "DNA", "RNA", "Lipid"], "Radioactive phosphorus entered the bacteria, whereas radioactive sulphur stayed outside."),
  j(B, "genetics-molecular", "M", 0, "In bacteria, all kinds of RNA are synthesised by:", ["A single RNA polymerase", "Three different RNA polymerases", "Reverse transcriptase", "Primase only"], "Eukaryotes use RNA polymerases I, II and III, but bacteria use one enzyme."),
  j(B, "genetics-molecular", "M", 2, "The Barr body in a female mammalian cell is a:", ["Nucleolus", "Mitochondrial inclusion", "Condensed inactive X chromosome", "Y-chromosome remnant"], "X-inactivation silences one X chromosome in each somatic cell."),
  j(B, "genetics-molecular", "H", 1, "In the ‘repulsion’ phase, two linked genes are arranged as:", ["AB/ab", "Ab/aB", "AB/AB", "ab/ab"], "Each homologue carries one dominant and one recessive allele."),
  j(B, "genetics-molecular", "M", 0, "Introns in nuclear pre-mRNA typically begin with GU and end with:", ["AG", "UA", "CC", "UU"], "The GU–AG rule marks the splice sites."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 0, "The ‘lub’ sound of the heart is produced by the closure of the:", ["Atrioventricular valves", "Semilunar valves", "Pulmonary vein", "Aorta"], "Ventricular systole begins as the AV valves slam shut."),
  j(B, "physiology", "M", 1, "Pulmonary surfactant helps breathing by:", ["Increasing surface tension in alveoli", "Reducing surface tension in alveoli", "Carrying oxygen", "Producing mucus"], "It prevents collapse of the small alveoli."),
  j(B, "physiology", "M", 1, "Aldosterone acts on the distal tubule to promote:", ["Sodium excretion", "Sodium reabsorption", "Glucose reabsorption", "Urea formation"], "Water follows the retained sodium."),
  j(B, "physiology", "M", 2, "The neurotransmitter released at the vertebrate neuromuscular junction is:", ["Dopamine", "GABA", "Acetylcholine", "Serotonin"], "It binds nicotinic receptors on the muscle fibre."),
  j(B, "physiology", "E", 3, "Which disease in children results from a lack of vitamin D?", ["Scurvy", "Beriberi", "Night blindness", "Rickets"], "Poor calcium absorption weakens bones."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 0, "According to the species–area relationship, as the area of a habitat increases, the number of species:", ["Increases", "Decreases", "Stays the same", "Falls to zero"], "S = cA^z with z usually between 0.1 and 0.3."),
  j(B, "ecology-evolution", "M", 1, "K-selected species are characterised by:", ["Many small offspring and little parental care", "Few offspring and high parental care", "Early maturity", "Short life span"], "They live near the carrying capacity and invest in each offspring."),
  j(B, "ecology-evolution", "M", 2, "In the nitrogen cycle, the conversion of ammonia to nitrite is carried out by:", ["Rhizobium", "Pseudomonas", "Nitrosomonas", "Azotobacter"], "Nitrosomonas oxidises ammonia, and Nitrobacter then oxidises nitrite to nitrate."),
  j(B, "ecology-evolution", "H", 2, "In a population in Hardy–Weinberg equilibrium the frequency of allele A is 0.7. The expected frequency of heterozygotes is:", ["0.09", "0.21", "0.42", "0.49"], "2pq = 2 × 0.7 × 0.3."),
  j(B, "ecology-evolution", "M", 1, "A species restricted to a particular geographic area is called:", ["Cosmopolitan", "Endemic", "Keystone", "Exotic"], "Endemic species are found nowhere else."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 1, "Kranz anatomy is found in the leaves of:", ["C₃ plants", "C₄ plants", "CAM plants only", "Gymnosperms"], "Bundle sheath cells ring the vascular bundles."),
  j(B, "plant-biology", "M", 0, "Vernalisation is the promotion of flowering by:", ["A period of low temperature", "High light intensity", "Auxin", "Long days only"], "Winter varieties need a cold exposure before they flower."),
  j(B, "plant-biology", "M", 2, "Guttation occurs because of:", ["High transpiration", "Photosynthesis", "Root pressure", "Stomatal closure"], "Water is forced out through hydathodes when root pressure is positive."),
  j(B, "plant-biology", "M", 1, "Secondary growth in the stem of dicots is due to the activity of the:", ["Apical meristem", "Vascular cambium", "Intercalary meristem", "Epidermis"], "The cambium adds secondary xylem and phloem."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 2, "The number of oxygen atoms in 1 mol of O₂ molecules is:", ["6 × 10²³", "3 × 10²³", "1.2 × 10²⁴", "2.4 × 10²⁴"], "Each molecule has two atoms, so 2 × 6.02 × 10²³."),
  j(B, "general-science", "E", 0, "The IUPAC name of CH₃COOH is:", ["Ethanoic acid", "Methanoic acid", "Propanoic acid", "Ethanol"], "A two-carbon carboxylic acid is ethanoic acid."),
  j(B, "general-science", "M", 1, "The value of log₁₀(0.01) is:", ["2", "−2", "0.01", "−1"], "0.01 = 10⁻²."),
  j(B, "general-science", "M", 1, "Two resistors of 4 Ω and 6 Ω are connected in parallel. The equivalent resistance is:", ["10 Ω", "2.4 Ω", "5 Ω", "24 Ω"], "R = (4 × 6)/(4 + 6)."),
  j(B, "general-science", "M", 2, "The number of ways of selecting 2 objects from 5 is:", ["5", "20", "10", "25"], "C(5, 2) = 10."),
  j(B, "general-science", "M", 1, "A wave of frequency 50 Hz and wavelength 4 m travels with a speed of:", ["12.5 m/s", "200 m/s", "54 m/s", "0.08 m/s"], "The wave speed is v = fλ = 50 × 4 = 200 m/s."),
];

export const jamBiologicalSciencesMock6 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 1, "An animal cell placed in a hypotonic solution will:", ["Shrink", "Swell and may burst", "Remain unchanged", "Divide"], "Water enters by osmosis."),
  j(B, "cell-biochemistry", "H", 1, "A competitive inhibitor changes the apparent Km and Vmax of an enzyme as follows:", ["Km decreases, Vmax unchanged", "Km increases, Vmax unchanged", "Km unchanged, Vmax decreases", "Both decrease"], "Higher substrate concentrations are needed, but Vmax can still be reached."),
  j(B, "cell-biochemistry", "M", 2, "ATP synthase is driven by:", ["Substrate-level phosphorylation", "Direct hydrolysis of NADH", "A proton gradient across the membrane", "Light directly"], "Protons flow back through the F₀ subunit."),
  j(B, "cell-biochemistry", "E", 1, "Phospholipids are called amphipathic because they have:", ["Only hydrophilic parts", "Both hydrophilic and hydrophobic parts", "Only hydrophobic parts", "A net charge"], "The head is polar and the tails are non-polar."),
  j(B, "cell-biochemistry", "M", 0, "Ribosomal subunits are assembled in the:", ["Nucleolus", "Lysosome", "Golgi complex", "Peroxisome"], "rRNA genes are clustered in the nucleolus."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 0, "Which codon is a termination (stop) codon?", ["UAG", "AUG", "UUU", "GCA"], "UAA, UAG and UGA do not code for any amino acid."),
  j(B, "genetics-molecular", "M", 1, "The sickle-cell mutation (GAG → GTG) is a:", ["Nonsense mutation", "Missense mutation", "Frameshift mutation", "Silent mutation"], "It changes glutamate to valine."),
  j(B, "genetics-molecular", "M", 2, "In eukaryotes, mRNA is transcribed by:", ["RNA polymerase I", "RNA polymerase III", "RNA polymerase II", "DNA polymerase"], "Pol II also makes most snRNAs and microRNAs."),
  j(B, "genetics-molecular", "M", 1, "A multiple cloning site in a plasmid is a stretch of DNA containing:", ["Many origins of replication", "Several unique restriction sites", "Several antibiotic resistance genes", "Terminator sequences"], "It allows insertion of foreign DNA using different enzymes."),
  j(B, "genetics-molecular", "M", 1, "Crossing over increases genetic variation by:", ["Producing mutations", "Creating new combinations of linked alleles", "Doubling chromosomes", "Eliminating recessive alleles"], "Alleles on homologous chromosomes are exchanged."),
  // ───────── Physiology ─────────
  j(B, "physiology", "H", 0, "The countercurrent multiplier system in the loop of Henle helps to:", ["Create a hyperosmotic medulla to concentrate urine", "Filter blood", "Secrete urea only", "Absorb glucose"], "The gradient lets water leave the collecting duct."),
  j(B, "physiology", "M", 1, "The oxygen dissociation curve of haemoglobin is:", ["Hyperbolic", "Sigmoidal", "Linear", "Parabolic"], "Binding of oxygen to one subunit raises affinity of the others."),
  j(B, "physiology", "M", 0, "Diabetes insipidus is caused by a deficiency of:", ["ADH", "Insulin", "Glucagon", "Thyroxine"], "The kidney cannot conserve water without ADH."),
  j(B, "physiology", "M", 1, "In a simple spinal reflex arc, the sequence of components is:", ["Effector → motor neuron → interneuron → sensory neuron → receptor", "Receptor → sensory neuron → integration centre → motor neuron → effector", "Receptor → motor neuron → effector", "Integration centre → receptor → effector"], "Information flows from receptor to effector."),
  j(B, "physiology", "M", 2, "Leptin, a hormone regulating appetite, is secreted by:", ["The pancreas", "The liver", "Adipose tissue", "The pituitary"], "It signals the amount of body fat to the hypothalamus."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 0, "A J-shaped growth curve represents:", ["Exponential growth", "Logistic growth", "Population decline", "A stable population"], "Resources are unlimited and the rate of increase is constant."),
  j(B, "ecology-evolution", "M", 1, "A keystone species is one that:", ["Is most abundant in the community", "Has a disproportionately large effect on community structure", "Is the largest in size", "Is an introduced species"], "Its removal causes major changes, like the loss of sea otters."),
  j(B, "ecology-evolution", "M", 0, "Depletion of the stratospheric ozone layer is mainly caused by:", ["Chlorofluorocarbons", "Carbon dioxide", "Methane", "Sulphur dioxide"], "Chlorine atoms from CFCs catalyse ozone breakdown."),
  j(B, "ecology-evolution", "M", 2, "In Müllerian mimicry:", ["A harmless species mimics a harmful one", "A predator mimics its prey", "Two or more harmful species resemble each other", "A plant mimics a leaf"], "Shared warning colouration reinforces predator learning."),
  j(B, "ecology-evolution", "M", 3, "Organisms that feed on dead organic matter fragments are called:", ["Producers", "Primary consumers", "Predators", "Detritivores"], "Earthworms and millipedes are examples."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "Wind-pollinated flowers typically have:", ["Large feathery stigmas and light pollen", "Bright petals and nectar", "Sticky heavy pollen", "Scent to attract insects"], "These features increase capture of airborne pollen."),
  j(B, "plant-biology", "M", 1, "Seed dormancy is maintained mainly by:", ["Gibberellin", "Abscisic acid", "Cytokinin", "Auxin"], "ABA inhibits germination."),
  j(B, "plant-biology", "H", 1, "In plant tissue culture, a high cytokinin-to-auxin ratio promotes the formation of:", ["Roots", "Shoots", "Callus only", "Embryos only"], "Skoog and Miller showed that the ratio determines organogenesis."),
  j(B, "plant-biology", "E", 0, "The rate of transpiration generally rises when:", ["Temperature rises and humidity falls", "Humidity rises", "Wind stops", "Stomata close"], "A steeper vapour-pressure gradient speeds water loss."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 3, "Which of these has the highest boiling point?", ["H₂S", "HCl", "CH₄", "H₂O"], "Hydrogen bonding in water raises its boiling point."),
  j(B, "general-science", "M", 1, "The derivative of e^(2x) with respect to x is:", ["e^(2x)", "2e^(2x)", "e^(2x)/2", "2xe^(2x)"], "Chain rule."),
  j(B, "general-science", "M", 2, "A heater operates at 220 V and draws 5 A. Its power is:", ["44 W", "225 W", "1100 W", "11 W"], "Electrical power is P = VI = 220 × 5 = 1100 W."),
  j(B, "general-science", "E", 1, "The mass of 2 mol of O₂ (O = 16) is:", ["32 g", "64 g", "16 g", "96 g"], "Each mole of O₂ weighs 32 g, so 2 mol weigh 2 × 32 = 64 g."),
  j(B, "general-science", "M", 3, "The real solutions of x² = 9 are:", ["3 only", "9 only", "−9 and 9", "−3 and 3"], "Taking the square root gives x = +3 or x = −3."),
  j(B, "general-science", "M", 0, "The slope of a velocity–time graph gives:", ["Acceleration", "Displacement", "Speed", "Force"], "Acceleration is the rate of change of velocity, a = dv/dt."),
];

export const jamBiologicalSciencesMock7 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 2, "Which of the following is a reducing disaccharide?", ["Sucrose", "Trehalose", "Lactose", "Raffinose"], "Lactose has a free hemiacetal group on the glucose unit."),
  j(B, "cell-biochemistry", "M", 1, "Nucleosomes are formed by DNA wrapped around:", ["Histone H1 only", "An octamer of core histones", "Ribosomal proteins", "Nonhistone proteins only"], "Two copies each of H2A, H2B, H3 and H4."),
  j(B, "cell-biochemistry", "M", 0, "Cell–cell communication through gap junctions allows direct passage of:", ["Small molecules and ions", "Whole organelles", "Nuclei", "Large proteins"], "Connexon channels link the cytoplasm of neighbouring cells."),
  j(B, "cell-biochemistry", "M", 1, "In cellular respiration, the oxidation of NADH at complex I pumps protons from the:", ["Intermembrane space into the matrix", "Matrix to the intermembrane space", "Cytosol into the nucleus", "Matrix into the cytosol"], "A proton gradient builds up across the inner membrane."),
  j(B, "cell-biochemistry", "M", 3, "Which phase of the cell cycle is characterised by DNA replication?", ["G1", "G2", "M", "S"], "The S phase doubles the DNA content."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 1, "Transcription in bacteria ends when the polymerase meets a:", ["Start codon", "Terminator sequence", "TATA box", "Poly(A) signal"], "A hairpin followed by a run of U residues often dislodges the enzyme."),
  j(B, "genetics-molecular", "M", 2, "The structure of ribosomal RNA in the large subunit that catalyses peptide bond formation is called a:", ["Spliceosome", "Telomere", "Ribozyme", "Enhancer"], "The peptidyl transferase centre is built of rRNA."),
  j(B, "genetics-molecular", "M", 1, "A woman with normal vision whose father was colour blind marries a normal man. The probability that their son is colour blind is:", ["0", "1/2", "1/4", "1"], "She is a carrier, so half the sons receive the affected X."),
  j(B, "genetics-molecular", "H", 2, "Which type of RNA is NOT translated into protein but regulates gene expression post-transcriptionally?", ["mRNA", "tRNA", "microRNA", "Pre-mRNA"], "MicroRNAs guide the silencing of target mRNAs."),
  j(B, "genetics-molecular", "M", 0, "Gel electrophoresis separates DNA fragments on the basis of:", ["Size", "Base composition only", "Colour", "Hydrophobicity"], "Smaller fragments migrate faster through the gel."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 2, "Which blood cells are mainly responsible for antibody production?", ["Neutrophils", "Erythrocytes", "B lymphocytes", "Platelets"], "Plasma cells derived from B cells secrete antibodies."),
  j(B, "physiology", "M", 0, "The hormone melatonin is secreted by the:", ["Pineal gland", "Pituitary", "Thyroid", "Adrenal cortex"], "It regulates the sleep–wake cycle."),
  j(B, "physiology", "M", 1, "Muscle contraction occurs by the sliding of:", ["Myosin filaments over each other", "Actin filaments over myosin filaments", "Microtubules", "Sarcomere bands without any change"], "Cross-bridge cycling pulls the thin filaments toward the centre."),
  j(B, "physiology", "M", 3, "The enzyme that converts angiotensin I to angiotensin II is:", ["Renin", "Pepsin", "Trypsin", "ACE"], "Angiotensin-converting enzyme is found in lung capillaries."),
  j(B, "physiology", "M", 1, "Most nutrient absorption takes place in the:", ["Stomach", "Small intestine", "Large intestine", "Oesophagus"], "Villi and microvilli provide a large absorptive surface."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 0, "The ratio of energy transferred from one trophic level to the next is typically about:", ["10%", "50%", "90%", "1%"], "Lindeman's ten percent law."),
  j(B, "ecology-evolution", "M", 1, "Fossils of Archaeopteryx are regarded as evidence of a link between:", ["Fish and amphibians", "Reptiles and birds", "Birds and mammals", "Amphibians and reptiles"], "It had both feathers and reptilian features."),
  j(B, "ecology-evolution", "M", 0, "Eutrophication of a lake is caused by an excess of:", ["Nutrients such as nitrogen and phosphorus", "Oxygen", "Sunlight", "Salt"], "Algal blooms deplete the dissolved oxygen."),
  j(B, "ecology-evolution", "M", 2, "Sexual selection typically leads to:", ["Reduced sexual dimorphism", "Convergent evolution", "Exaggerated traits that help in obtaining mates", "Extinction of males"], "Examples include the peacock's tail."),
  j(B, "ecology-evolution", "H", 2, "Hamilton's rule states that an altruistic act is favoured if:", ["B < C", "r < C/B", "rB > C", "r = 0"], "Relatedness times benefit must exceed the cost."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "The ‘Casparian strip’ in root endodermis:", ["Blocks the apoplastic movement of water and ions", "Stores starch", "Carries out photosynthesis", "Secretes mucilage"], "It forces substances to pass through the cell membranes."),
  j(B, "plant-biology", "M", 1, "The male gametes of flowering plants are carried by the:", ["Ovule", "Pollen tube", "Style wall", "Seed coat"], "The tube grows down the style to the ovule."),
  j(B, "plant-biology", "M", 2, "Which pigment absorbs far-red light and triggers many responses in the seeds?", ["Chlorophyll a", "Carotenoids", "Phytochrome", "Anthocyanin"], "Phytochrome converts between Pr and Pfr forms."),
  j(B, "plant-biology", "M", 1, "The first stable product of the C₃ pathway is a:", ["4-carbon compound", "3-carbon compound (3-PGA)", "5-carbon sugar", "6-carbon sugar"], "RuBisCO fixes CO₂ onto RuBP to give two molecules of 3-PGA."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 2, "The pH of a solution with [H⁺] = 2 × 10⁻⁴ M is about (log 2 = 0.30):", ["2.7", "4", "3.7", "10.3"], "pH = 4 − 0.30."),
  j(B, "general-science", "M", 1, "The number of significant figures in 0.00450 is:", ["2", "3", "5", "6"], "Leading zeros are not significant, but the trailing zero after the decimal point is."),
  j(B, "general-science", "M", 0, "The limit of sin x / x as x → 0 is:", ["1", "0", "∞", "Does not exist"], "This is a standard limit."),
  j(B, "general-science", "M", 1, "The work done in lifting a 5 kg object by 2 m (g = 10 m/s²) is:", ["10 J", "100 J", "50 J", "1000 J"], "mgh = 5 × 10 × 2."),
  j(B, "general-science", "E", 0, "The sum of the interior angles of a triangle is:", ["180°", "90°", "270°", "360°"], "This is a basic geometric fact."),
  j(B, "general-science", "M", 2, "Ethanol (C₂H₅OH) belongs to the class of:", ["Aldehydes", "Ethers", "Alcohols", "Ketones"], "It contains the –OH group on an sp³ carbon."),
];

export const jamBiologicalSciencesMock8 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "M", 2, "Which of the following describes the fluid mosaic model of the membrane?", ["A rigid protein layer with lipid islands", "A lipid monolayer", "Proteins floating in a fluid lipid bilayer", "A cellulose network"], "Singer and Nicolson described lateral mobility of proteins in the bilayer."),
  j(B, "cell-biochemistry", "M", 0, "Cyclin-dependent kinases are activated by binding to:", ["Cyclins", "Histones", "Actin", "Tubulin"], "Cyclin levels rise and fall through the cell cycle."),
  j(B, "cell-biochemistry", "M", 1, "Enzymes are most active at their:", ["Isoelectric point only", "Optimum pH and temperature", "Freezing point", "Highest possible temperature"], "Beyond the optimum they denature."),
  j(B, "cell-biochemistry", "M", 3, "The α-helix and β-pleated sheet are examples of:", ["Primary structure", "Tertiary structure", "Quaternary structure", "Secondary structure"], "They are regular patterns held by backbone hydrogen bonds."),
  j(B, "cell-biochemistry", "M", 1, "Cytochrome c is a component of the:", ["Calvin cycle", "Mitochondrial electron transport chain", "Citric acid cycle", "Glycolytic pathway"], "It shuttles electrons between complex III and IV."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 3, "The enzyme that unwinds the DNA double helix during replication is:", ["DNA ligase", "Primase", "DNA polymerase", "Helicase"], "Helicase breaks the hydrogen bonds between the strands."),
  j(B, "genetics-molecular", "M", 1, "Which of the following is a purine?", ["Thymine", "Guanine", "Cytosine", "Uracil"], "Adenine and guanine have a double-ring structure."),
  j(B, "genetics-molecular", "M", 0, "The cross Aa × Aa gives a genotypic ratio of:", ["1:2:1", "3:1", "1:1", "9:3:3:1"], "AA : Aa : aa."),
  j(B, "genetics-molecular", "H", 1, "Which of these is a type of chromosomal rearrangement in which a segment is reversed end to end?", ["Translocation", "Inversion", "Deletion", "Duplication"], "A paracentric or pericentric inversion changes the gene order."),
  j(B, "genetics-molecular", "M", 2, "In the Sanger method of DNA sequencing, chain termination occurs because the terminator nucleotide lacks:", ["A base", "A 5′ phosphate", "A 3′ hydroxyl group", "A sugar"], "Without the 3′-OH no further nucleotide can be added."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 0, "The vital capacity of the lungs equals:", ["Inspiratory reserve + tidal volume + expiratory reserve", "Tidal volume only", "Residual volume + tidal volume", "Total lung capacity"], "It is the maximum volume that can be exhaled after a maximal inspiration."),
  j(B, "physiology", "M", 1, "In the kidney, the filtration of blood takes place in the:", ["Loop of Henle", "Glomerulus", "Collecting duct", "Distal tubule"], "Blood pressure drives plasma through the glomerular capillaries."),
  j(B, "physiology", "M", 2, "Which hormone surge triggers ovulation?", ["FSH", "Progesterone", "LH", "Oestrogen only"], "A mid-cycle LH surge triggers release of the egg."),
  j(B, "physiology", "M", 0, "The sarcoplasmic reticulum stores:", ["Calcium ions", "Glycogen only", "Myosin", "Sodium ions"], "Calcium release triggers muscle contraction."),
  j(B, "physiology", "M", 1, "Vitamin B₁₂ deficiency leads to:", ["Scurvy", "Pernicious anaemia", "Rickets", "Night blindness"], "Intrinsic factor is needed for B₁₂ absorption."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 1, "The study of the relationships among organisms and their evolutionary history is called:", ["Taxonomy", "Phylogenetics", "Palaeontology", "Ecology"], "Phylogenetic trees depict evolutionary relationships."),
  j(B, "ecology-evolution", "M", 0, "The Shannon index is a measure of:", ["Species diversity", "Soil pH", "Primary productivity", "Climate"], "It combines species richness and evenness."),
  j(B, "ecology-evolution", "M", 2, "The decomposition of litter is fastest in:", ["Cold, dry conditions", "Waterlogged soils", "Warm, moist conditions", "Acidic bogs"], "Microbial activity is highest under warm and moist conditions."),
  j(B, "ecology-evolution", "M", 0, "Which of the following is a density-dependent factor limiting population growth?", ["Competition for food", "A forest fire", "A volcanic eruption", "A flood"], "Its effect changes with population density."),
  j(B, "ecology-evolution", "H", 1, "The Miller–Urey experiment demonstrated that:", ["Life arose from space", "Organic molecules such as amino acids can form from inorganic gases under simulated early-Earth conditions", "DNA is the genetic material", "Fossils form quickly"], "A spark discharge in a mixture of methane, ammonia, hydrogen and water produced amino acids."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 0, "The dormancy of buds in winter is mainly associated with high levels of:", ["Abscisic acid", "Gibberellin", "Cytokinin", "Auxin"], "ABA inhibits growth in unfavourable seasons."),
  j(B, "plant-biology", "M", 2, "In angiosperms, the triploid tissue is the:", ["Zygote", "Embryo", "Endosperm", "Seed coat"], "It forms from fusion of a sperm with the two polar nuclei."),
  j(B, "plant-biology", "M", 1, "Which element is a constituent of chlorophyll?", ["Iron", "Magnesium", "Calcium", "Zinc"], "Magnesium sits at the centre of the porphyrin ring."),
  j(B, "plant-biology", "M", 1, "Plants take up nitrogen from the soil mainly as:", ["N₂ gas", "Nitrate and ammonium ions", "Urea only", "Nitrogen oxides"], "These ions are taken up by roots."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "M", 0, "Which of the following is a strong electrolyte?", ["NaCl", "Acetic acid", "Glucose", "Ethanol"], "NaCl dissociates completely in water."),
  j(B, "general-science", "M", 1, "The value of 5! (factorial) is:", ["25", "120", "60", "720"], "5 × 4 × 3 × 2 × 1."),
  j(B, "general-science", "M", 2, "The kinetic energy of a 4 kg mass moving at 5 m/s is:", ["20 J", "40 J", "50 J", "100 J"], "½ × 4 × 25."),
  j(B, "general-science", "M", 1, "The equilibrium constant of a reaction is changed by:", ["A catalyst", "Temperature", "Pressure", "Concentration"], "K depends only on temperature."),
  j(B, "general-science", "E", 0, "The next term in the series 2, 4, 8, 16, ... is:", ["32", "24", "20", "18"], "Each term is double the previous."),
  j(B, "general-science", "M", 1, "The principal quantum number of the outermost electron in a sodium atom is:", ["2", "3", "4", "1"], "Na is 1s²2s²2p⁶3s¹."),
];
