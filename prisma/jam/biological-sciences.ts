// IIT JAM Biological Sciences (BL) — Free Mock 1: 30 MCQs written fresh: biology 24, chemistry, mathematics and physics 6.

import { j } from "./types";

const B = "jam-biological-sciences";

export const jamBiologicalSciencesMock1 = [
  // ───────── Cell biology and biochemistry ─────────
  j(B, "cell-biochemistry", "E", 2, "Which of the following organelles is bounded by a double membrane and contains its own DNA?", ["Golgi apparatus", "Lysosome", "Mitochondrion", "Peroxisome"], "Mitochondria (like chloroplasts) have two membranes and a circular genome of their own."),
  j(B, "cell-biochemistry", "M", 2, "Sister chromatids separate from each other during:", ["Prophase", "Metaphase", "Anaphase", "Telophase"], "At the metaphase–anaphase transition cohesin is cleaved and the chromatids move to opposite poles in anaphase."),
  j(B, "cell-biochemistry", "H", 1, "Proteins that are destined for secretion are synthesised on ribosomes attached to the:", ["Smooth endoplasmic reticulum", "Rough endoplasmic reticulum", "Golgi membrane", "Nuclear envelope"], "A signal sequence directs the ribosome to the rough ER, where the nascent chain enters the lumen."),
  j(B, "cell-biochemistry", "M", 1, "A double-stranded DNA fragment contains 20% adenine. The percentage of guanine is:", ["20%", "30%", "40%", "60%"], "A = T = 20%, so G + C = 60% and G = 30%.", "(100 - 40) / 2"),
  j(B, "cell-biochemistry", "H", 2, "An enzyme speeds up a reaction by changing:", ["The free-energy change of the reaction", "The equilibrium constant", "The activation energy", "The enthalpy change of the reaction"], "A catalyst lowers the activation energy; the thermodynamics (ΔG, K, ΔH) of the overall reaction are unchanged."),
  // ───────── Genetics and molecular biology ─────────
  j(B, "genetics-molecular", "M", 2, "In meiosis, crossing over takes place during which stage of prophase I?", ["Leptotene", "Zygotene", "Pachytene", "Diplotene"], "Recombination occurs between homologous chromosomes in the synaptonemal complex at pachytene."),
  j(B, "genetics-molecular", "M", 1, "When red-flowered and white-flowered snapdragons (incomplete dominance) are crossed and the F₁ is selfed, the F₂ phenotypic ratio is:", ["3:1", "1:2:1", "9:3:3:1", "1:1"], "With incomplete dominance the genotypic and phenotypic ratios coincide: 1 red : 2 pink : 1 white."),
  j(B, "genetics-molecular", "H", 1, "In eukaryotes, mRNA precursors are transcribed by:", ["RNA polymerase I", "RNA polymerase II", "RNA polymerase III", "Primase"], "RNA polymerase I makes rRNA, polymerase III makes tRNA and 5S rRNA, and polymerase II makes mRNA precursors."),
  j(B, "genetics-molecular", "M", 1, "How many of the 64 codons specify an amino acid?", ["20", "61", "64", "3"], "Three codons (UAA, UAG, UGA) are stop signals, leaving 61 sense codons."),
  j(B, "genetics-molecular", "M", 1, "Reverse transcriptase synthesises:", ["RNA from a DNA template", "DNA from an RNA template", "Protein from mRNA", "RNA from a protein template"], "It is an RNA-dependent DNA polymerase used by retroviruses and in cDNA synthesis."),
  // ───────── Physiology ─────────
  j(B, "physiology", "M", 1, "The main site of glucose reabsorption in the nephron is the:", ["Loop of Henle", "Proximal convoluted tubule", "Distal convoluted tubule", "Collecting duct"], "Nearly all filtered glucose is taken up in the proximal tubule by sodium-coupled transporters."),
  j(B, "physiology", "M", 1, "The resting membrane potential of a neuron is set mainly by the permeability of the membrane to:", ["Na⁺", "K⁺", "Ca²⁺", "Cl⁻"], "Open K⁺ leak channels dominate at rest, so the potential lies close to the K⁺ equilibrium potential."),
  j(B, "physiology", "H", 1, "A person has a heart rate of 72 beats/min and a stroke volume of 70 mL. The cardiac output is about:", ["3.5 L/min", "5.04 L/min", "7.2 L/min", "10.1 L/min"], "Cardiac output = heart rate × stroke volume = 72 × 70 mL = 5040 mL/min.", "72 * 70 / 1000"),
  j(B, "physiology", "M", 1, "A rise in CO₂ and H⁺ in the tissues causes the oxygen–haemoglobin dissociation curve to:", ["Shift to the left", "Shift to the right", "Stay where it is", "Become hyperbolic"], "This is the Bohr effect: lower pH and higher CO₂ reduce haemoglobin's affinity for O₂, shifting the curve to the right."),
  j(B, "physiology", "M", 2, "Deficiency of vitamin B₁₂ leads to:", ["Scurvy", "Rickets", "Pernicious anaemia", "Night blindness"], "Without B₁₂ red-cell precursors cannot divide properly, causing megaloblastic (pernicious) anaemia."),
  // ───────── Ecology and evolution ─────────
  j(B, "ecology-evolution", "M", 2, "Producers fix 10,000 J of energy. By the 10% rule, the energy available to primary consumers is about:", ["10 J", "100 J", "1000 J", "9000 J"], "Only about 10% passes to the next trophic level: 0.1 × 10,000 = 1000 J.", "10000 * 0.1"),
  j(B, "ecology-evolution", "H", 1, "In logistic growth with carrying capacity K, the population growth rate is highest when the population size N is:", ["K/4", "K/2", "K", "2K"], "dN/dt = rN(1 − N/K) is a parabola in N with its maximum at N = K/2."),
  j(B, "ecology-evolution", "M", 1, "Which of the following is chiefly responsible for depletion of stratospheric ozone?", ["CO₂", "Chlorofluorocarbons", "CH₄", "SO₂"], "CFCs release chlorine atoms in the stratosphere that catalytically destroy ozone."),
  j(B, "ecology-evolution", "M", 1, "The forelimb of a human and the wing of a bat are examples of:", ["Analogous organs", "Homologous organs", "Vestigial organs", "Convergent structures"], "They share the same bone plan from a common ancestor but serve different functions: homology."),
  j(B, "ecology-evolution", "H", 1, "Random changes in allele frequency in a small population are called:", ["Gene flow", "Genetic drift", "Natural selection", "Directional selection"], "Chance sampling of gametes causes drift, which is strongest in small populations."),
  // ───────── Plant biology ─────────
  j(B, "plant-biology", "M", 1, "The Calvin cycle takes place in the:", ["Thylakoid lumen", "Chloroplast stroma", "Grana membrane", "Outer chloroplast membrane"], "The enzymes of carbon fixation, including Rubisco, are in the stroma."),
  j(B, "plant-biology", "H", 1, "Apical dominance is maintained mainly by:", ["Cytokinin", "Auxin", "Gibberellin", "Abscisic acid"], "Auxin from the apical bud suppresses the growth of lateral buds."),
  j(B, "plant-biology", "M", 2, "In angiosperms the endosperm is:", ["Haploid", "Diploid", "Triploid", "Tetraploid"], "It forms when a sperm fuses with the two polar nuclei of the central cell (n + n + n)."),
  j(B, "plant-biology", "H", 1, "Stomata open when the guard cells:", ["Lose K⁺", "Take up K⁺ and water", "Lose turgor", "Close their aquaporins"], "K⁺ uptake lowers the water potential, water enters, and the swollen guard cells bow apart."),
  // ───────── Chemistry, mathematics and physics ─────────
  j(B, "general-science", "E", 2, "What is the pH of a 1.0 × 10⁻³ M aqueous solution of hydrochloric acid?", ["1", "2", "3", "4"], "[H⁺] = 10⁻³ M so pH = 3.", "3"),
  j(B, "general-science", "M", 1, "The number of moles in 36 g of water (M = 18 g/mol) is:", ["1", "2", "3", "4"], "n = 36/18 = 2.", "36 / 18"),
  j(B, "general-science", "H", 1, "For N₂ + 3H₂ ⇌ 2NH₃ (exothermic), the equilibrium yield of ammonia is increased by:", ["Lowering the pressure", "Raising the pressure", "Raising the temperature", "Adding a catalyst"], "Higher pressure favours the side with fewer gas molecules (2 versus 4); a catalyst changes the rate, not the equilibrium."),
  j(B, "general-science", "M", 1, "The derivative of sin(x²) with respect to x is:", ["cos(x²)", "2x cos(x²)", "2x sin(x²)", "−2x cos(x²)"], "By the chain rule: cos(x²) × 2x."),
  j(B, "general-science", "H", 1, "Two fair dice are rolled. The probability that the sum is 8 is:", ["1/6", "5/36", "1/9", "7/36"], "The favourable pairs are (2,6), (3,5), (4,4), (5,3), (6,2): 5 out of 36."),
  j(B, "general-science", "M", 2, "A 2 kg mass is lifted slowly through 5 m (g = 10 m/s²). The work done against gravity is:", ["10 J", "50 J", "100 J", "200 J"], "W = mgh = 2 × 10 × 5 = 100 J.", "2 * 10 * 5"),
];
