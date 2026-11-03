// IIT JAM Biotechnology (BT) — Free Mock 1: 30 MCQs written fresh: biology and biotechnology 23, chemistry, physics and mathematics 7.

import { j } from "./types";

const B = "jam-biotechnology";

export const jamBiotechnologyMock1 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "Which of the standard amino acids has no chiral carbon?", ["Alanine", "Glycine", "Serine", "Valine"], "The α-carbon of glycine carries two hydrogens, so it is not a stereocentre."),
  j(B, "biochemistry", "M", 1, "In Michaelis–Menten kinetics, the substrate concentration at which the reaction rate is half of Vmax is:", ["Km/2", "Km", "2Km", "Vmax"], "Setting v = Vmax/2 in v = Vmax[S]/(Km + [S]) gives [S] = Km."),
  j(B, "biochemistry", "H", 0, "A pure competitive inhibitor changes the kinetic constants of an enzyme as follows:", ["Km rises and Vmax is unchanged", "Km is unchanged and Vmax falls", "Km falls and Vmax falls", "Km falls and Vmax rises"], "The inhibitor competes for the active site, so more substrate is needed for half-saturation (higher apparent Km) but excess substrate can still reach Vmax."),
  j(B, "biochemistry", "M", 1, "The net gain of ATP from the glycolysis of one glucose molecule to pyruvate is:", ["1", "2", "4", "8"], "Glycolysis makes 4 ATP and uses 2, a net gain of 2 ATP (plus 2 NADH)."),
  j(B, "biochemistry", "M", 2, "In oxidative phosphorylation the final electron acceptor is:", ["NAD⁺", "Cytochrome c", "O₂", "FAD"], "Cytochrome c oxidase passes the electrons to molecular oxygen, which is reduced to water."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 1, "Which enzyme synthesises the short RNA primer needed for DNA replication?", ["DNA ligase", "Primase", "Helicase", "Topoisomerase"], "Primase is a specialised RNA polymerase that lays down the primer from which DNA polymerase extends."),
  j(B, "cell-molecular", "H", 1, "The lac operon of E. coli is induced by:", ["Glucose", "Allolactose", "Tryptophan", "The lac repressor"], "Allolactose, an isomer of lactose, binds the repressor and releases it from the operator."),
  j(B, "cell-molecular", "H", 0, "The 5′ cap of eukaryotic mRNA is:", ["7-methylguanosine", "A poly(A) stretch", "Adenosine monophosphate", "Inosine"], "A guanosine is added through a 5′–5′ triphosphate bond and methylated at N-7."),
  j(B, "cell-molecular", "M", 3, "Which of the following is not a stop codon?", ["UAA", "UAG", "UGA", "UGG"], "UGG codes for tryptophan; UAA, UAG and UGA terminate translation."),
  j(B, "cell-molecular", "H", 1, "The technique used to detect a specific DNA sequence in a genomic digest immobilised on a membrane is:", ["Northern blotting", "Southern blotting", "Western blotting", "ELISA"], "Southern blotting uses a labelled probe against membrane-bound DNA; Northern detects RNA and Western detects protein."),
  j(B, "cell-molecular", "M", 2, "Starting from one double-stranded DNA molecule, the number of copies after 5 ideal PCR cycles is:", ["10", "25", "32", "64"], "Each cycle doubles the number of molecules: 2⁵ = 32.", "2 ** 5"),
  j(B, "cell-molecular", "H", 0, "The recognition sequence of the restriction enzyme EcoRI is:", ["GAATTC", "GGATCC", "AAGCTT", "CTGCAG"], "EcoRI cuts G^AATTC; GGATCC is BamHI, AAGCTT is HindIII and CTGCAG is PstI."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 1, "A test cross of a dihybrid AaBb with the double recessive aabb, with independent assortment, gives a phenotypic ratio of:", ["9:3:3:1", "1:1:1:1", "3:1", "1:2:1"], "The dihybrid produces four gamete types in equal numbers and the tester gives only ab, so the ratio is 1:1:1:1."),
  j(B, "genetics", "M", 1, "In a population in Hardy–Weinberg equilibrium q² = 0.04 for a recessive allele. The frequency of heterozygotes is:", ["0.16", "0.32", "0.64", "0.04"], "q = 0.2 and p = 0.8, so 2pq = 2 × 0.8 × 0.2 = 0.32.", "2 * 0.8 * 0.2"),
  j(B, "genetics", "H", 2, "A woman who is a carrier of an X-linked recessive allele marries an unaffected man. The probability that a son is affected is:", ["0%", "25%", "50%", "100%"], "Each son receives either the normal or the mutant X from his mother with equal chance, and his father gives him a Y."),
  j(B, "genetics", "H", 1, "Two linked genes show 10% recombinants. The map distance between them is:", ["1 map unit", "10 map units", "90 map units", "100 map units"], "One map unit (centimorgan) corresponds to 1% recombination."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 1, "Which structure is found in Gram-negative but not in Gram-positive bacteria?", ["Teichoic acids", "An outer membrane containing lipopolysaccharide", "A thick peptidoglycan layer", "A cytoplasmic membrane"], "Gram-negative cells have a thin peptidoglycan layer covered by an outer membrane carrying LPS."),
  j(B, "microbiology-immunology", "M", 1, "The only antibody class that crosses the human placenta is:", ["IgA", "IgG", "IgM", "IgE"], "IgG is actively transported across the placenta by the neonatal Fc receptor."),
  j(B, "microbiology-immunology", "E", 1, "Antibodies are secreted by:", ["T helper cells", "Plasma cells", "Macrophages", "NK cells"], "Activated B lymphocytes differentiate into plasma cells that secrete antibody."),
  j(B, "microbiology-immunology", "H", 1, "MHC class I molecules present peptide antigens to:", ["CD4⁺ T cells", "CD8⁺ T cells", "B cells", "NK cells"], "The CD8 co-receptor binds the α3 domain of MHC class I, so cytotoxic T cells recognise peptide–MHC I."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "The first stable product of CO₂ fixation in C4 plants is:", ["3-Phosphoglycerate", "Oxaloacetate", "Pyruvate", "Ribulose-1,5-bisphosphate"], "PEP carboxylase fixes CO₂ onto phosphoenolpyruvate to give the four-carbon oxaloacetate."),
  j(B, "plant-animal", "H", 2, "Which plant hormone promotes seed dormancy and stomatal closure under water stress?", ["Gibberellin", "Cytokinin", "Abscisic acid", "Ethylene"], "Abscisic acid is the stress hormone that closes stomata and maintains dormancy."),
  j(B, "plant-animal", "M", 1, "In plant tissue culture, a high cytokinin to auxin ratio in the medium favours:", ["Root formation", "Shoot formation", "Cell death", "Embryo abortion"], "A high cytokinin to auxin ratio promotes shoot regeneration, while a low ratio promotes roots."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 2, "A buffer is made from acetic acid (pKa 4.76) and acetate with [acetate] = 10 × [acetic acid]. Its pH is:", ["3.76", "4.76", "5.76", "6.76"], "pH = pKa + log([A⁻]/[HA]) = 4.76 + 1 = 5.76.", "4.76 + 1"),
  j(B, "chemistry-maths", "M", 2, "The pH of a 10⁻³ M NaOH solution at 25 °C is:", ["3", "7", "11", "13"], "pOH = 3, so pH = 14 − 3 = 11.", "14 - 3"),
  j(B, "chemistry-maths", "M", 1, "The derivative of x² eˣ with respect to x is:", ["2x eˣ", "eˣ(x² + 2x)", "x² eˣ", "eˣ(x² + x)"], "By the product rule: 2x eˣ + x² eˣ = eˣ(x² + 2x)."),
  j(B, "chemistry-maths", "M", 2, "The value of ∫₀^π sin x dx is:", ["0", "1", "2", "π"], "[−cos x] from 0 to π = 1 + 1 = 2.", "2"),
  j(B, "chemistry-maths", "H", 0, "A compound has a molar absorptivity of 5000 L mol⁻¹ cm⁻¹. In a 1 cm cell the absorbance is 0.5. Its concentration is:", ["1 × 10⁻⁴ M", "5 × 10⁻⁴ M", "2 × 10⁻⁴ M", "1 × 10⁻³ M"], "A = εcl gives c = 0.5/(5000 × 1) = 1 × 10⁻⁴ M."),
  j(B, "chemistry-maths", "M", 2, "A couple has three children. The probability that exactly two are girls (each birth equally likely a boy or a girl) is:", ["1/8", "1/4", "3/8", "1/2"], "C(3, 2)/2³ = 3/8."),
  j(B, "chemistry-maths", "H", 1, "Which pair of compounds forms a buffer solution?", ["HCl and NaCl", "CH₃COOH and CH₃COONa", "NaOH and NaCl", "H₂SO₄ and Na₂SO₄"], "A buffer needs a weak acid with its conjugate base; HCl, NaOH and H₂SO₄ are strong."),
];
