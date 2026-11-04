// IIT JAM Biotechnology (BT) — Mocks 2 to 4: 30 MCQs each, written fresh: biochemistry 5, cell and molecular biology 7, genetics 4,
// microbiology and immunology 4, plant and animal biology 3, chemistry, physics and mathematics 7.

import { j } from "./types";

const B = "jam-biotechnology";

export const jamBiotechnologyMock2 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "Which amino acid is aromatic and carries a hydroxyl group on its ring?", ["Phenylalanine", "Tyrosine", "Tryptophan", "Histidine"], "Tyrosine is 4-hydroxyphenylalanine."),
  j(B, "biochemistry", "M", 1, "Glycine has pKa values of 2.34 and 9.60. Its isoelectric point is about:", ["2.34", "5.97", "7.00", "9.60"], "pI = (2.34 + 9.60)/2 = 5.97."),
  j(B, "biochemistry", "M", 1, "Which vitamin is the precursor of the coenzyme NAD⁺?", ["Riboflavin", "Niacin", "Thiamine", "Biotin"], "Niacin (nicotinic acid or nicotinamide) is used to make NAD⁺ and NADP⁺."),
  j(B, "biochemistry", "M", 2, "Complete β-oxidation of palmitic acid (C16) yields how many molecules of acetyl-CoA?", ["4", "7", "8", "16"], "Each round removes two carbons, and 16 carbons give 8 acetyl-CoA after 7 rounds."),
  j(B, "biochemistry", "E", 1, "Adjacent nucleotides in a DNA strand are joined by:", ["Glycosidic bonds", "Phosphodiester bonds", "Peptide bonds", "Hydrogen bonds"], "The 3′-OH of one sugar is linked to the 5′-phosphate of the next."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "E", 1, "Oxidative phosphorylation takes place at the:", ["Outer mitochondrial membrane", "Inner mitochondrial membrane", "Cytosol", "Golgi apparatus"], "The electron transport chain and ATP synthase are embedded in the inner membrane."),
  j(B, "cell-molecular", "M", 0, "The retinoblastoma protein (Rb) mainly controls the transition from:", ["G1 to S phase", "S to G2 phase", "Metaphase to anaphase", "G2 to M phase"], "Phosphorylated Rb releases E2F, which switches on genes for S phase."),
  j(B, "cell-molecular", "M", 1, "The σ factor of bacterial RNA polymerase is needed for:", ["Elongation", "Promoter recognition", "Termination", "Splicing"], "It directs the core enzyme to specific promoter sequences."),
  j(B, "cell-molecular", "M", 1, "In E. coli, RNA primers are removed and replaced with DNA by:", ["DNA polymerase III", "DNA polymerase I", "Primase", "DNA gyrase"], "Pol I has 5′→3′ exonuclease activity and a polymerase activity."),
  j(B, "cell-molecular", "M", 1, "The 5′ cap of eukaryotic mRNA contains:", ["7-Methyladenosine", "7-Methylguanosine", "A poly(A) tail", "N-Acetylglucosamine"], "A methylated guanine is attached through a 5′–5′ triphosphate linkage."),
  j(B, "cell-molecular", "M", 1, "A protein with an N-terminal signal peptide is usually targeted first to the:", ["Nucleus", "Endoplasmic reticulum", "Mitochondrial matrix", "Peroxisome"], "The signal recognition particle takes the ribosome to the ER membrane."),
  j(B, "cell-molecular", "H", 1, "Inositol trisphosphate (IP₃) acts as a second messenger by releasing calcium from the:", ["Nucleus", "Endoplasmic reticulum", "Golgi apparatus", "Lysosome"], "IP₃ opens IP₃-gated calcium channels in the ER membrane."),
  // ───────── Genetics ─────────
  j(B, "genetics", "E", 1, "The phenotypic ratio in the F₂ generation of a typical dihybrid cross is:", ["3:1", "9:3:3:1", "1:2:1", "1:1"], "Two independently assorting genes with complete dominance give 9:3:3:1."),
  j(B, "genetics", "M", 0, "A test cross is made with an individual that is:", ["Homozygous recessive", "Homozygous dominant", "Heterozygous", "Of unknown genotype"], "The recessive parent shows the gametes of the tested individual in its offspring."),
  j(B, "genetics", "M", 1, "Two genes show 10% recombination. The map distance between them is:", ["1 map unit", "10 map units", "100 map units", "0.1 map unit"], "One map unit (centimorgan) corresponds to 1% recombination."),
  j(B, "genetics", "M", 1, "The karyotype of a person with Klinefelter syndrome is:", ["45,X", "47,XXY", "47,XYY", "47,XXX"], "An extra X chromosome in a male."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 0, "Gram-positive bacteria retain the crystal violet stain because they have:", ["A thick peptidoglycan layer", "An outer membrane with lipopolysaccharide", "No cell wall", "A capsule only"], "The thick wall resists decolourisation by alcohol."),
  j(B, "microbiology-immunology", "M", 1, "Which immunoglobulin class crosses the placenta?", ["IgA", "IgG", "IgM", "IgE"], "IgG is actively transported across the placenta and protects the newborn."),
  j(B, "microbiology-immunology", "M", 0, "Which of the following are professional antigen-presenting cells?", ["Dendritic cells", "Erythrocytes", "Platelets", "Neutrophils only"], "Dendritic cells, macrophages and B cells present antigen on MHC class II."),
  j(B, "microbiology-immunology", "M", 1, "Penicillin kills bacteria by inhibiting:", ["Protein synthesis", "Cell wall synthesis", "DNA replication", "RNA synthesis"], "It blocks the transpeptidases that cross-link peptidoglycan."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "Water is split to release oxygen in:", ["Photosystem I", "Photosystem II", "The Calvin cycle", "The cytochrome b₆f complex"], "The oxygen-evolving complex of photosystem II oxidises water."),
  j(B, "plant-animal", "E", 2, "The plant hormone that promotes fruit ripening is:", ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"], "Ethylene is a gaseous hormone that triggers ripening."),
  j(B, "plant-animal", "M", 1, "Which hormone is released from the posterior pituitary?", ["Growth hormone", "Oxytocin", "TSH", "ACTH"], "Oxytocin and ADH are made in the hypothalamus and released from the posterior lobe."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 2, "The pH of a 0.001 M solution of HCl is:", ["1", "2", "3", "11"], "pH = −log 10⁻³ = 3."),
  j(B, "chemistry-maths", "M", 1, "The molarity of a solution containing 4 g of NaOH (M = 40 g/mol) in 500 mL is:", ["0.1 M", "0.2 M", "0.4 M", "2 M"], "0.1 mol in 0.5 L is 0.2 M."),
  j(B, "chemistry-maths", "M", 0, "A compound with molar absorptivity 2000 L mol⁻¹ cm⁻¹ gives an absorbance of 0.4 in a 1 cm cuvette. Its concentration is:", ["2 × 10⁻⁴ M", "2 × 10⁻³ M", "8 × 10⁻⁴ M", "5 × 10⁻³ M"], "c = A/(εl) = 0.4/2000."),
  j(B, "chemistry-maths", "M", 1, "The gain in potential energy of a 10 kg mass raised by 5 m (g = 9.8 m/s²) is:", ["49 J", "490 J", "50 J", "98 J"], "mgh = 10 × 9.8 × 5 = 490 J."),
  j(B, "chemistry-maths", "M", 2, "The derivative of x³ at x = 2 is:", ["6", "8", "12", "24"], "d/dx x³ = 3x² = 12 at x = 2."),
  j(B, "chemistry-maths", "M", 1, "A bacterial culture starting with one cell doubles every 20 minutes. After 3 hours the number of cells is:", ["256", "512", "1024", "180"], "3 hours is 9 doublings: 2⁹ = 512."),
  j(B, "chemistry-maths", "M", 0, "The median of the numbers 3, 7, 1, 9, 5 is:", ["5", "7", "3", "9"], "Sorted: 1, 3, 5, 7, 9."),
];

export const jamBiotechnologyMock3 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 2, "The enzyme that catalyses the committed step of glycolysis is:", ["Hexokinase", "Phosphoglucose isomerase", "Phosphofructokinase-1", "Pyruvate kinase"], "PFK-1 is the main regulatory enzyme and is the committed step."),
  j(B, "biochemistry", "M", 1, "In the Lineweaver–Burk plot, the x-intercept equals:", ["Km", "−1/Km", "1/Vmax", "−Vmax"], "The double-reciprocal line crosses the x-axis at −1/Km."),
  j(B, "biochemistry", "M", 3, "Which of the following is a ketose sugar?", ["Glucose", "Galactose", "Ribose", "Fructose"], "Fructose has its carbonyl group at C-2."),
  j(B, "biochemistry", "M", 0, "The α-helix in proteins is stabilised mainly by:", ["Hydrogen bonds between backbone C=O and N–H groups", "Disulphide bonds", "Ionic bonds between side chains", "Hydrophobic interactions only"], "Each carbonyl hydrogen-bonds to the N–H four residues along the chain."),
  j(B, "biochemistry", "H", 0, "The cofactor required by transaminases is:", ["Pyridoxal phosphate", "Thiamine pyrophosphate", "Biotin", "FAD"], "Pyridoxal phosphate (vitamin B₆) carries the amino group."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "E", 2, "Which organelle contains hydrolytic enzymes for intracellular digestion?", ["Peroxisome", "Golgi apparatus", "Lysosome", "Ribosome"], "Lysosomes contain acid hydrolases that work at low pH."),
  j(B, "cell-molecular", "M", 1, "Which of the following is an inhibitor of eukaryotic transcription by RNA polymerase II?", ["Rifampicin", "α-Amanitin", "Chloramphenicol", "Streptomycin"], "α-Amanitin binds RNA polymerase II; rifampicin acts on bacterial polymerase."),
  j(B, "cell-molecular", "M", 1, "Okazaki fragments are formed during the synthesis of the:", ["Leading strand", "Lagging strand", "mRNA", "tRNA"], "The lagging strand is made discontinuously in short pieces."),
  j(B, "cell-molecular", "M", 2, "In the lac operon, allolactose acts as the:", ["Repressor", "Operator", "Inducer", "Promoter"], "It binds the repressor and releases it from the operator."),
  j(B, "cell-molecular", "M", 0, "Spliceosomes are composed mainly of:", ["snRNAs and proteins", "rRNA only", "tRNAs", "DNA and histones"], "snRNPs recognise the splice sites and catalyse intron removal."),
  j(B, "cell-molecular", "M", 1, "Microtubules are polymers of:", ["Actin", "α- and β-tubulin", "Keratin", "Myosin"], "Tubulin heterodimers assemble into hollow tubes."),
  j(B, "cell-molecular", "H", 2, "Which complex is responsible for the metaphase-to-anaphase transition by degrading securin?", ["MPF", "SCF", "APC/C", "Cdk4"], "The anaphase-promoting complex tags securin for destruction, freeing separase."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 2, "In humans, haemophilia A is inherited as:", ["Autosomal dominant", "Autosomal recessive", "X-linked recessive", "Y-linked"], "The gene is on the X chromosome, so males are more often affected."),
  j(B, "genetics", "M", 1, "A mating of two heterozygotes Aa × Aa gives homozygous offspring in the proportion:", ["1/4", "1/2", "3/4", "1"], "AA and aa each occur with probability 1/4."),
  j(B, "genetics", "H", 1, "In an F₂ population of 160 plants showing a 9:7 ratio (complementary gene action), the number with the dominant phenotype is:", ["70", "90", "110", "120"], "9/16 × 160 = 90."),
  j(B, "genetics", "M", 1, "A frameshift mutation is caused by:", ["A base substitution", "Insertion or deletion of a number of bases not divisible by three", "A silent mutation", "A transition"], "The reading frame shifts for all downstream codons."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 1, "Which of the following is a DNA virus?", ["Influenza virus", "Adenovirus", "HIV", "Poliovirus"], "Adenoviruses have a double-stranded DNA genome."),
  j(B, "microbiology-immunology", "M", 2, "Which cells are infected and depleted by HIV?", ["B cells", "CD8⁺ T cells", "CD4⁺ T cells", "Neutrophils"], "HIV binds CD4 and a co-receptor on helper T cells."),
  j(B, "microbiology-immunology", "M", 1, "The type of hypersensitivity involved in allergic asthma is:", ["Type II", "Type I", "Type III", "Type IV"], "IgE bound to mast cells triggers immediate histamine release."),
  j(B, "microbiology-immunology", "M", 0, "The ELISA technique detects an antigen using:", ["An enzyme-linked antibody", "Radioactive DNA", "A fluorescent dye only", "Electrophoresis alone"], "The enzyme converts a substrate into a coloured product."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 0, "Which tissue transports sugars in plants?", ["Phloem", "Xylem", "Collenchyma", "Sclerenchyma"], "Sieve tubes of the phloem carry sucrose from source to sink."),
  j(B, "plant-animal", "M", 2, "Which pancreatic cell type secretes insulin?", ["α cells", "δ cells", "β cells", "Acinar cells"], "The β cells of the islets of Langerhans produce insulin."),
  j(B, "plant-animal", "M", 1, "The pigment that detects red and far-red light in plants is:", ["Cryptochrome", "Phytochrome", "Chlorophyll b", "Carotene"], "Phytochrome switches between Pr and Pfr forms."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The pH of a buffer containing equal concentrations of a weak acid with pKa 7.2 and its conjugate base is:", ["3.6", "7.2", "10.8", "14.4"], "pH = pKa when [A⁻] = [HA]."),
  j(B, "chemistry-maths", "M", 2, "The number of moles of solute in 250 mL of a 0.4 M solution is:", ["0.01", "0.4", "0.1", "1.0"], "0.4 mol/L × 0.25 L = 0.1 mol."),
  j(B, "chemistry-maths", "M", 1, "The hybridisation of the carbon atoms in ethene is:", ["sp³", "sp²", "sp", "dsp²"], "Each carbon forms three σ bonds and one π bond."),
  j(B, "chemistry-maths", "M", 0, "A body of mass 2 kg moving at 3 m/s has kinetic energy:", ["9 J", "6 J", "18 J", "3 J"], "½ × 2 × 9 = 9 J."),
  j(B, "chemistry-maths", "M", 1, "The value of ∫₀¹ 2x dx is:", ["0", "1", "2", "1/2"], "[x²] from 0 to 1 = 1."),
  j(B, "chemistry-maths", "M", 2, "If log₁₀ x = 3, then x equals:", ["30", "300", "1000", "3"], "Taking the antilog, x = 10³ = 1000."),
  j(B, "chemistry-maths", "H", 1, "Two heterozygous carriers of a recessive disease have three children. The probability that none is affected is:", ["1/64", "27/64", "9/16", "3/4"], "Each child is unaffected with probability 3/4, so (3/4)³ = 27/64."),
];

export const jamBiotechnologyMock4 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "The number of NADH molecules generated in one turn of the citric acid cycle is:", ["2", "3", "4", "1"], "Isocitrate, α-ketoglutarate and malate dehydrogenases each make one NADH."),
  j(B, "biochemistry", "M", 2, "Which lipid is the major structural component of the cell membrane bilayer?", ["Triacylglycerol", "Cholesterol esters", "Phospholipid", "Wax"], "Phospholipids are amphipathic and form bilayers."),
  j(B, "biochemistry", "H", 1, "The enzyme inhibited by statins in cholesterol biosynthesis is:", ["Squalene synthase", "HMG-CoA reductase", "Acetyl-CoA carboxylase", "Fatty acid synthase"], "HMG-CoA reductase catalyses the rate-limiting step."),
  j(B, "biochemistry", "M", 1, "Which technique separates proteins by size under denaturing conditions?", ["Isoelectric focusing", "SDS-PAGE", "Affinity chromatography", "Ion-exchange chromatography"], "SDS coats proteins uniformly so they migrate according to mass."),
  j(B, "biochemistry", "M", 0, "Which of these is a purine?", ["Adenine", "Cytosine", "Thymine", "Uracil"], "Adenine and guanine are purines."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "E", 0, "The site of ribosome assembly in a eukaryotic cell is the:", ["Nucleolus", "Golgi apparatus", "Lysosome", "Smooth ER"], "rRNA is transcribed and assembled with proteins in the nucleolus."),
  j(B, "cell-molecular", "M", 1, "Which histone is found in the linker region between nucleosomes?", ["H2A", "H1", "H3", "H4"], "Histone H1 binds the linker DNA and helps compact chromatin."),
  j(B, "cell-molecular", "M", 2, "The start codon in most eukaryotic mRNAs is:", ["UAA", "GUG", "AUG", "UGA"], "AUG codes for methionine."),
  j(B, "cell-molecular", "M", 1, "Which antibiotic blocks translation by binding the 30S ribosomal subunit?", ["Penicillin", "Tetracycline", "Rifampicin", "Nalidixic acid"], "Tetracyclines prevent aminoacyl-tRNA from entering the A site."),
  j(B, "cell-molecular", "M", 1, "Programmed cell death in animals is mediated by:", ["Lysozymes", "Caspases", "Kinesins", "Integrins"], "Caspases are proteases that dismantle the cell during apoptosis."),
  j(B, "cell-molecular", "M", 3, "Which of the following junctions allows direct passage of small molecules between adjacent animal cells?", ["Tight junction", "Desmosome", "Adherens junction", "Gap junction"], "Gap junctions are channels formed by connexons."),
  j(B, "cell-molecular", "H", 0, "In prokaryotes, transcription and translation can occur simultaneously because:", ["There is no nuclear envelope", "mRNA is not degraded", "Ribosomes are larger", "Introns are absent in rRNA"], "Ribosomes can attach to the nascent mRNA while it is being made."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 2, "A cross between two plants gives progeny in the ratio 1:1:1:1. The parents were most likely:", ["AaBb × AaBb", "AABB × aabb", "AaBb × aabb", "Aabb × Aabb"], "A dihybrid test cross gives four equal classes."),
  j(B, "genetics", "M", 1, "Incomplete dominance gives an F₂ phenotypic ratio of:", ["3:1", "1:2:1", "9:3:3:1", "1:1"], "The heterozygote shows an intermediate phenotype."),
  j(B, "genetics", "H", 2, "Hardy–Weinberg: if q² = 0.04 for a recessive allele, the frequency of heterozygotes (2pq) is:", ["0.04", "0.16", "0.32", "0.64"], "q = 0.2 and p = 0.8, so 2pq = 0.32."),
  j(B, "genetics", "M", 1, "Which type of mutation changes a codon into a stop codon?", ["Missense", "Nonsense", "Silent", "Frameshift only"], "A nonsense mutation causes premature termination."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 1, "Bacteria transfer DNA through a sex pilus in:", ["Transformation", "Conjugation", "Transduction", "Binary fission"], "Conjugation requires direct cell-to-cell contact."),
  j(B, "microbiology-immunology", "M", 0, "The antibodies of the primary immune response are mainly of class:", ["IgM", "IgG", "IgE", "IgD"], "IgM appears first after exposure to an antigen."),
  j(B, "microbiology-immunology", "M", 1, "Vaccination works because it:", ["Provides ready-made antibodies", "Induces immunological memory", "Kills the pathogen directly", "Boosts the innate response only"], "Memory B and T cells give a faster, stronger secondary response."),
  j(B, "microbiology-immunology", "M", 0, "Which of these is an obligate intracellular parasite?", ["Chlamydia", "Escherichia coli", "Bacillus subtilis", "Saccharomyces"], "Chlamydia cannot reproduce outside host cells."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "The enzyme that fixes CO₂ in the Calvin cycle is:", ["PEP carboxylase", "RuBisCO", "Hexokinase", "Carbonic anhydrase"], "Ribulose-1,5-bisphosphate carboxylase/oxygenase."),
  j(B, "plant-animal", "M", 2, "Which hormone lowers blood calcium in humans?", ["Parathyroid hormone", "Vitamin D", "Calcitonin", "Aldosterone"], "Calcitonin from the thyroid inhibits bone resorption."),
  j(B, "plant-animal", "M", 1, "The male gametophyte of a flowering plant is the:", ["Embryo sac", "Pollen grain", "Ovule", "Endosperm"], "The pollen grain produces the sperm cells."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The pH of 0.05 M H₂SO₄, assuming complete ionisation, is:", ["1.3", "1.0", "2.0", "0.7"], "[H⁺] = 0.1 M, so pH = 1.0."),
  j(B, "chemistry-maths", "M", 1, "The oxidation state of sulphur in H₂SO₄ is:", ["+4", "+6", "+2", "−2"], "2 + x − 8 = 0 gives x = +6."),
  j(B, "chemistry-maths", "M", 0, "An electron moving in a magnetic field experiences a force that is:", ["Perpendicular to its velocity", "Parallel to its velocity", "Zero always", "In the direction of the field"], "F = qv × B is perpendicular to v."),
  j(B, "chemistry-maths", "M", 2, "The half-life of a first-order process with rate constant 0.0693 h⁻¹ is:", ["1 h", "6.93 h", "10 h", "100 h"], "t½ = 0.693/k = 10 h."),
  j(B, "chemistry-maths", "M", 1, "The solution of dy/dx = 3 with y(0) = 2 gives y(2) equal to:", ["6", "8", "5", "2"], "y = 3x + 2, so y(2) = 8."),
  j(B, "chemistry-maths", "E", 1, "If the mean of 10 numbers is 5, their sum is:", ["15", "50", "5", "500"], "Sum = mean × count."),
  j(B, "chemistry-maths", "M", 3, "The Beer–Lambert law relates the absorbance of a solution to:", ["Its refractive index", "Its conductivity", "Its viscosity", "Its concentration and path length"], "The absorbance is A = εcl: it grows with concentration and path length."),
];
