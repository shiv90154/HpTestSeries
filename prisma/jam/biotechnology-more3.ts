// IIT JAM Biotechnology (BT) — Mocks 9 to 12: 30 MCQs each, written fresh: biochemistry 5, cell and molecular biology 7, genetics 4,
// microbiology and immunology 4, plant and animal biology 3, chemistry, physics and mathematics 7. Mock 12 is slightly above exam level.

import { j } from "./types";

const B = "jam-biotechnology";

export const jamBiotechnologyMock9 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 0, "When the substrate concentration is much greater than Km, the reaction velocity of a Michaelis–Menten enzyme approaches:", ["Vmax", "Km", "Zero", "Vmax/2"], "The enzyme becomes saturated with substrate."),
  j(B, "biochemistry", "M", 1, "Fatty acid synthesis in animal cells takes place mainly in the:", ["Mitochondrial matrix", "Cytosol", "Nucleus", "Peroxisome only"], "Fatty acid synthase is a cytosolic multienzyme complex."),
  j(B, "biochemistry", "M", 0, "Pyruvate carboxylase, which acts in gluconeogenesis, requires which cofactor?", ["Biotin", "Thiamine pyrophosphate", "Lipoic acid", "FAD"], "Biotin carries the activated carboxyl group."),
  j(B, "biochemistry", "M", 2, "Z-DNA is best described as a:", ["Right-handed double helix", "Single-stranded form", "Left-handed double helix", "Triple helix"], "It forms in alternating purine–pyrimidine sequences, especially under high salt."),
  j(B, "biochemistry", "M", 1, "Which pair of amino acids is most abundant in collagen?", ["Tryptophan and cysteine", "Glycine and proline", "Leucine and valine", "Histidine and arginine"], "Every third residue is glycine, and proline and hydroxyproline are abundant."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 0, "Peroxisomes contain the enzyme catalase, which:", ["Decomposes hydrogen peroxide", "Synthesises ATP", "Digests proteins", "Replicates DNA"], "Catalase converts H₂O₂ into water and oxygen."),
  j(B, "cell-molecular", "M", 0, "Acetylation of histone tails generally:", ["Relaxes chromatin and promotes transcription", "Condenses chromatin", "Blocks translation", "Causes DNA breaks"], "Acetylation neutralises the positive charge and weakens histone–DNA binding."),
  j(B, "cell-molecular", "E", 1, "The 80S ribosome of eukaryotes consists of:", ["50S and 30S subunits", "60S and 40S subunits", "70S and 50S subunits", "40S and 30S subunits"], "The large and small subunits are 60S and 40S."),
  j(B, "cell-molecular", "M", 1, "Proteins destined for degradation by the proteasome are tagged with:", ["SUMO", "Ubiquitin", "Glycogen", "Biotin"], "A chain of ubiquitin molecules acts as the degradation signal."),
  j(B, "cell-molecular", "M", 2, "Barbara McClintock's discovery in maize concerned:", ["DNA structure", "The genetic code", "Transposable elements", "Restriction enzymes"], "She described the Ac/Ds mobile elements."),
  j(B, "cell-molecular", "M", 1, "Alternative splicing allows:", ["The same protein to be made from many genes", "A single gene to give rise to several different proteins", "RNA to be translated without ribosomes", "DNA to replicate faster"], "Different combinations of exons are joined in different tissues."),
  j(B, "cell-molecular", "H", 1, "Integrins link the extracellular matrix to the:", ["Microtubules", "Actin cytoskeleton", "Nuclear lamina", "Golgi"], "Through adaptor proteins like talin they connect to actin filaments."),
  // ───────── Genetics ─────────
  j(B, "genetics", "E", 2, "The AB blood group is an example of:", ["Complete dominance", "Incomplete dominance", "Codominance", "Epistasis"], "Both IA and IB alleles are fully expressed in the heterozygote."),
  j(B, "genetics", "M", 1, "Pleiotropy means that:", ["Many genes affect one trait", "A single gene affects several traits", "A trait is carried on the Y chromosome", "Alleles blend together"], "A defect in one gene can produce multiple symptoms."),
  j(B, "genetics", "M", 0, "A transition mutation is the replacement of:", ["A purine by another purine", "A purine by a pyrimidine", "A codon by a stop codon", "A single base by a triplet"], "For example A to G, or C to T."),
  j(B, "genetics", "M", 0, "Methylation of cytosine in CpG islands in promoters usually:", ["Silences gene expression", "Activates transcription", "Causes mutations in tRNA", "Prevents translation"], "Methylated promoters recruit repressive proteins."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 0, "Lysozyme kills bacteria by:", ["Hydrolysing peptidoglycan", "Blocking protein synthesis", "Binding DNA", "Disrupting ribosomes"], "It cleaves the β-1,4 bond between NAM and NAG."),
  j(B, "microbiology-immunology", "M", 1, "A bacteriophage that integrates its DNA into the host chromosome follows the:", ["Lytic cycle", "Lysogenic cycle", "Conjugation", "Transformation"], "The integrated prophage is replicated with the host DNA."),
  j(B, "microbiology-immunology", "M", 2, "Haemolytic disease of the newborn can arise when an Rh⁻ mother carries an Rh⁺ fetus because she makes:", ["Anti-A antibodies", "Anti-B antibodies", "Anti-D antibodies", "Antinuclear antibodies"], "Maternal anti-D IgG crosses the placenta in later pregnancies."),
  j(B, "microbiology-immunology", "M", 1, "The fungal cell wall contains:", ["Peptidoglycan", "Chitin", "Cellulose", "Teichoic acid"], "Chitin is a polymer of N-acetylglucosamine."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 0, "A short-day plant flowers when:", ["The night is longer than a critical length", "The day is longer than a critical length", "Temperature is high", "Water is plentiful"], "The length of the uninterrupted dark period is the crucial factor."),
  j(B, "plant-animal", "E", 1, "Which plant hormone promotes cell division?", ["Ethylene", "Cytokinin", "Abscisic acid", "Gibberellin only"], "Cytokinins act with auxin to stimulate cytokinesis."),
  j(B, "plant-animal", "M", 2, "Erythropoietin is produced mainly by the:", ["Liver", "Bone marrow", "Kidney", "Spleen"], "Low oxygen in the kidney stimulates erythropoietin release."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 2, "The osmolarity of a 0.15 M NaCl solution, assuming complete dissociation, is:", ["0.15 osmol/L", "0.45 osmol/L", "0.30 osmol/L", "0.075 osmol/L"], "Each formula unit gives two particles."),
  j(B, "chemistry-maths", "E", 1, "The number of sp³-hybridised carbon atoms in ethane is:", ["1", "2", "3", "6"], "Both carbons are sp³."),
  j(B, "chemistry-maths", "M", 1, "The volume occupied by 2 mol of an ideal gas at STP (0 °C, 1 atm) is:", ["22.4 L", "44.8 L", "11.2 L", "67.2 L"], "2 × 22.4 L."),
  j(B, "chemistry-maths", "M", 0, "The momentum of a 2 kg body moving at 5 m/s is:", ["10 kg m/s", "2.5 kg m/s", "25 kg m/s", "7 kg m/s"], "Momentum is p = mv = 2 × 5 = 10 kg m/s."),
  j(B, "chemistry-maths", "M", 2, "The value of log₂ 8 is:", ["2", "4", "3", "8"], "Since 2³ = 8, the logarithm to base 2 of 8 is 3."),
  j(B, "chemistry-maths", "M", 1, "The (population) variance of the data 2, 4, 6 is:", ["2", "8/3", "4", "2/3"], "Mean 4; squared deviations 4, 0 and 4 average to 8/3."),
  j(B, "chemistry-maths", "M", 2, "In three tosses of a fair coin, the probability of getting exactly one head is:", ["1/8", "1/4", "3/8", "1/2"], "There are C(3, 1) = 3 favourable outcomes out of 8."),
];

export const jamBiotechnologyMock10 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "M", 1, "Which class of enzymes catalyses the interconversion of isomers?", ["Ligases", "Isomerases", "Hydrolases", "Lyases"], "Isomerases rearrange atoms within a molecule."),
  j(B, "biochemistry", "H", 1, "Glucokinase differs from hexokinase in having a:", ["Lower Km for glucose", "Higher Km for glucose", "Requirement for GTP", "Lower Vmax and product inhibition by glucose 6-phosphate"], "Glucokinase acts only when blood glucose is high."),
  j(B, "biochemistry", "M", 0, "Vitamin B₁₂ contains which metal ion?", ["Cobalt", "Iron", "Zinc", "Magnesium"], "The corrin ring holds a central cobalt atom."),
  j(B, "biochemistry", "M", 2, "Carbonic anhydrase requires which metal ion for its activity?", ["Fe²⁺", "Mg²⁺", "Zn²⁺", "Cu²⁺"], "Zinc activates a bound water molecule for catalysis."),
  j(B, "biochemistry", "M", 1, "Insulin is composed of:", ["One polypeptide chain without disulphide bonds", "Two chains linked by disulphide bonds", "Four identical subunits", "A steroid ring"], "The A and B chains are held by two interchain disulphides."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 1, "The nucleosome core contains DNA of about how many base pairs wound around the histone octamer?", ["50", "147", "500", "1000"], "About 147 bp are wrapped in 1.65 turns."),
  j(B, "cell-molecular", "M", 1, "RT-PCR is used to:", ["Amplify genomic DNA only", "Make cDNA from RNA and amplify it", "Sequence proteins", "Clone plasmids"], "Reverse transcriptase first copies the RNA into cDNA."),
  j(B, "cell-molecular", "M", 2, "The wobble hypothesis explains why:", ["tRNAs are so large", "The genetic code is overlapping", "One tRNA can recognise more than one codon", "mRNA has a poly(A) tail"], "Pairing at the third codon position is less strict."),
  j(B, "cell-molecular", "H", 0, "Rho-dependent transcription termination in E. coli requires:", ["A hexameric RNA helicase protein", "A hairpin followed by U residues only", "The sigma factor", "A poly(A) signal"], "Rho binds the nascent RNA and uses ATP to chase the polymerase."),
  j(B, "cell-molecular", "M", 0, "The kinetochore is the protein structure that assembles at the:", ["Centromere", "Telomere", "Origin of replication", "Nucleolus"], "Spindle microtubules attach to it."),
  j(B, "cell-molecular", "M", 0, "Receptor-mediated endocytosis involves coated pits made of:", ["Clathrin", "Collagen", "Actin only", "Keratin"], "Clathrin forms a lattice around the invaginating membrane."),
  j(B, "cell-molecular", "E", 2, "Sister chromatids separate during:", ["Prophase", "Metaphase", "Anaphase", "Telophase"], "The cohesin link is cleaved at the start of anaphase."),
  // ───────── Genetics ─────────
  j(B, "genetics", "E", 1, "Mendel's law of independent assortment applies to genes that are:", ["On the same chromosome very close together", "On different chromosomes", "On the sex chromosomes only", "Mitochondrial"], "Unlinked genes assort independently during meiosis."),
  j(B, "genetics", "M", 0, "The karyotype of a female with Turner syndrome is:", ["45,X", "47,XXY", "47,XXX", "46,XX"], "One X chromosome is missing."),
  j(B, "genetics", "M", 0, "Targeted gene knockouts in mice are typically made by:", ["Homologous recombination in embryonic stem cells", "Conjugation", "Reverse transcription of mRNA", "Transposition of IS elements"], "A construct with flanking homology replaces the target gene."),
  j(B, "genetics", "M", 1, "RFLP analysis detects variation in:", ["Protein charge", "The sizes of restriction fragments", "Lipid composition", "Enzyme activity"], "A mutation can create or destroy a restriction site."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "M", 0, "A plasmid vector must contain an origin of replication so that it can:", ["Replicate in the host cell", "Integrate into the genome", "Encode the antibiotic", "Make RNA"], "Without an origin it would be lost when the cell divides."),
  j(B, "microbiology-immunology", "E", 2, "In the bacterial growth curve, cells divide at a constant maximum rate during the:", ["Lag phase", "Stationary phase", "Log phase", "Death phase"], "Growth is exponential in the log phase."),
  j(B, "microbiology-immunology", "M", 0, "Natural killer cells can kill virus-infected cells:", ["Without prior sensitisation", "Only after antibody production", "Only with the help of B cells", "Only through MHC class II"], "They recognise cells that lack MHC class I."),
  j(B, "microbiology-immunology", "M", 1, "Prions, the agents of BSE, are:", ["Viruses with RNA", "Infectious proteins", "Bacterial spores", "Plasmids"], "Misfolded PrP proteins cause diseases like BSE."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "Which hormone causes stomatal closure during water stress?", ["Auxin", "Abscisic acid", "Gibberellin", "Cytokinin"], "ABA triggers loss of K⁺ and water from guard cells."),
  j(B, "plant-animal", "E", 2, "The main component of the plant cell wall is:", ["Chitin", "Peptidoglycan", "Cellulose", "Lignin only"], "Cellulose microfibrils provide tensile strength."),
  j(B, "plant-animal", "M", 2, "Which part of the brain controls balance and coordination of movement?", ["Cerebrum", "Medulla", "Cerebellum", "Hypothalamus"], "The cerebellum coordinates posture and fine movement."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The normality of 0.1 M H₂SO₄ is:", ["0.1 N", "0.2 N", "0.05 N", "0.4 N"], "Each mole supplies two equivalents of H⁺."),
  j(B, "chemistry-maths", "M", 1, "For a reaction at equilibrium under standard conditions with K = 1, ΔG° equals:", ["−RT", "0", "RT", "Infinity"], "ΔG° = −RT ln K."),
  j(B, "chemistry-maths", "M", 1, "Light travels in a medium at 2 × 10⁸ m/s. The refractive index (c = 3 × 10⁸ m/s) is:", ["1.0", "1.5", "2.0", "0.67"], "The refractive index is n = c/v = 3/2 = 1.5."),
  j(B, "chemistry-maths", "M", 0, "According to Newton's third law, when body A exerts a force on body B:", ["B exerts an equal and opposite force on A", "B exerts no force on A", "The force on A is greater", "Only A accelerates"], "Forces come in equal and opposite pairs."),
  j(B, "chemistry-maths", "M", 3, "The slope of the tangent to y = x² at x = 3 is:", ["3", "9", "2", "6"], "dy/dx = 2x."),
  j(B, "chemistry-maths", "M", 2, "The number of ways of choosing and arranging 2 items out of 5 (⁵P₂) is:", ["10", "5", "20", "25"], "The first item has 5 choices and the second 4, giving 5 × 4 = 20."),
  j(B, "chemistry-maths", "M", 0, "The standard deviation of the numbers 5, 5, 5, 5 is:", ["0", "5", "1", "25"], "There is no variation."),
];

export const jamBiotechnologyMock11 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "H", 1, "On a Lineweaver–Burk plot, lines for a competitive inhibitor and the uninhibited enzyme intersect on the:", ["x-axis", "y-axis", "Origin", "They do not intersect"], "Vmax is unchanged, so the 1/Vmax intercept is the same."),
  j(B, "biochemistry", "M", 0, "Glucagon raises blood glucose mainly by stimulating:", ["Glycogenolysis in the liver", "Glycogen synthesis", "Fatty acid synthesis", "Glucose uptake by muscle"], "Glucagon activates glycogen phosphorylase through cAMP."),
  j(B, "biochemistry", "M", 2, "Adult haemoglobin A contains how many polypeptide subunits?", ["2", "3", "4", "6"], "It is a tetramer of two α and two β chains."),
  j(B, "biochemistry", "E", 2, "In RNA, guanine pairs with:", ["Adenine", "Uracil", "Cytosine", "Thymine"], "G pairs with C by three hydrogen bonds."),
  j(B, "biochemistry", "M", 0, "The specific activity of an enzyme preparation is expressed as:", ["Units of activity per mg of protein", "Units per mL only", "Grams of enzyme per litre", "Substrate concentration per second"], "It measures purity."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 1, "p21 inhibits cell cycle progression by inhibiting:", ["DNA polymerase", "Cyclin-dependent kinases", "RNA polymerase", "Topoisomerases"], "p21 is induced by p53 after DNA damage."),
  j(B, "cell-molecular", "M", 0, "According to the endosymbiont theory, mitochondria evolved from:", ["α-Proteobacteria", "Cyanobacteria", "Archaea", "Viruses"], "An ancestral aerobic bacterium was engulfed by a host cell."),
  j(B, "cell-molecular", "M", 1, "The peptidyl transferase activity of the ribosome is catalysed by:", ["A ribosomal protein", "rRNA of the large subunit", "tRNA", "mRNA"], "The ribosome is a ribozyme."),
  j(B, "cell-molecular", "H", 0, "Kinesin motors move cargo along microtubules towards the:", ["Plus end", "Minus end", "Centrosome", "Nucleus only"], "Most kinesins walk to the plus end, whereas dynein goes to the minus end."),
  j(B, "cell-molecular", "M", 2, "Cadherins mediate cell–cell adhesion in a manner dependent on:", ["Na⁺", "K⁺", "Ca²⁺", "Mg²⁺"], "Calcium rigidifies the extracellular domains."),
  j(B, "cell-molecular", "H", 1, "During splicing, the intron is released as a:", ["Linear molecule", "Lariat", "Circle with no branch", "Double helix"], "The 2′-OH of the branch-point adenosine attacks the 5′ splice site."),
  j(B, "cell-molecular", "M", 2, "G-protein-coupled receptors span the membrane with:", ["One transmembrane helix", "Four transmembrane helices", "Seven transmembrane helices", "No transmembrane region"], "They are also called seven-transmembrane receptors."),
  // ───────── Genetics ─────────
  j(B, "genetics", "M", 1, "Genetic drift has the greatest effect on allele frequencies in:", ["Large populations", "Small populations", "Populations with much migration", "Populations under strong selection"], "Chance sampling of gametes causes large fluctuations when N is small."),
  j(B, "genetics", "E", 2, "The ABO blood group system is an example of:", ["Polygenic inheritance", "Epistasis", "Multiple alleles", "Incomplete dominance"], "Three alleles (IA, IB, i) exist in the population."),
  j(B, "genetics", "M", 0, "Down syndrome most often arises from:", ["Nondisjunction of chromosome 21", "A deletion in chromosome 5", "A Y-linked gene", "Mitochondrial inheritance"], "A gamete with an extra chromosome 21 gives trisomy."),
  j(B, "genetics", "M", 1, "Crossing over occurs during:", ["Leptotene", "Pachytene of prophase I", "Anaphase II", "Interphase only"], "Homologous chromosomes are tightly synapsed at pachytene."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "H", 1, "Cholera toxin acts by ADP-ribosylating the:", ["Gi protein, shutting it off", "Gs protein, keeping adenylate cyclase active", "Ribosome", "Elongation factor 2"], "Persistently high cAMP drives chloride and water secretion."),
  j(B, "microbiology-immunology", "M", 0, "Which disease is the BCG vaccine used to prevent?", ["Tuberculosis", "Typhoid", "Measles", "Polio"], "BCG is an attenuated Mycobacterium bovis strain."),
  j(B, "microbiology-immunology", "M", 1, "CD4⁺ helper T cells mainly:", ["Kill infected cells directly", "Secrete cytokines that coordinate immune responses", "Produce antibodies", "Present antigens to B cells without MHC"], "They license B cells and cytotoxic T cells."),
  j(B, "microbiology-immunology", "M", 0, "Viroids, found in plants, are:", ["Small circular naked RNA molecules that infect plants", "Bacteriophages", "Prions", "Fungal spores"], "They lack a protein coat and do not encode proteins."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "Biological nitrogen fixation in legume root nodules is carried out by:", ["Nitrosomonas", "Rhizobium", "Nitrobacter", "Pseudomonas"], "The enzyme nitrogenase reduces N₂ to NH₃."),
  j(B, "plant-animal", "M", 0, "Double fertilisation in angiosperms results in the formation of:", ["A zygote and the endosperm", "Two zygotes", "Two embryos", "A seed coat only"], "One sperm fuses with the egg, the other with the central cell."),
  j(B, "plant-animal", "M", 1, "Parathyroid hormone:", ["Lowers blood calcium", "Raises blood calcium", "Lowers blood glucose", "Raises blood sodium only"], "It mobilises calcium from bone and enhances renal reabsorption."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "M", 1, "The C–C bond order in benzene is:", ["1", "1.5", "2", "3"], "Resonance delocalises the π electrons, giving intermediate bonds."),
  j(B, "chemistry-maths", "M", 1, "Of two acids, the stronger acid has the:", ["Higher pKa", "Lower pKa", "Higher pH always", "Lower Ka"], "A smaller pKa means a larger Ka."),
  j(B, "chemistry-maths", "M", 1, "At STP, the volume of 2 mol of an ideal gas is about:", ["22.4 L", "44.8 L", "11.2 L", "89.6 L"], "Each mole occupies 22.4 L."),
  j(B, "chemistry-maths", "E", 1, "The work done by a constant force of 10 N acting through 3 m along its direction is:", ["13 J", "30 J", "3.3 J", "7 J"], "Work is W = F d = 10 × 3 = 30 J."),
  j(B, "chemistry-maths", "M", 0, "The value of ∫ from 0 to ln 2 of eˣ dx is:", ["1", "2", "ln 2", "e"], "[eˣ] = 2 − 1 = 1."),
  j(B, "chemistry-maths", "M", 1, "The number of ways of choosing 2 items from 6 is:", ["12", "15", "30", "36"], "C(6, 2) = 15."),
  j(B, "chemistry-maths", "M", 0, "A sample of 16 observations has standard deviation 4. The standard error of the mean is:", ["1", "4", "0.25", "16"], "SE = s/√n = 4/4."),
];

export const jamBiotechnologyMock12 = [
  // ───────── Biochemistry ─────────
  j(B, "biochemistry", "H", 0, "Enzymes accelerate reactions mainly by:", ["Stabilising the transition state", "Changing the equilibrium constant", "Raising the temperature locally", "Changing the standard free energy of the reaction"], "They lower the activation energy without altering ΔG°."),
  j(B, "biochemistry", "H", 1, "The Hill coefficient of haemoglobin for oxygen binding is approximately:", ["1.0", "2.8", "6", "0.5"], "A value greater than 1 indicates positive cooperativity."),
  j(B, "biochemistry", "H", 2, "Under physiological cellular conditions, the free energy change of ATP hydrolysis is about:", ["−5 kJ/mol", "−30 kJ/mol", "−50 to −60 kJ/mol", "−120 kJ/mol"], "Concentrations in cells make it more negative than the standard value of −30.5 kJ/mol."),
  j(B, "biochemistry", "H", 0, "Glycogen phosphorylase requires which cofactor?", ["Pyridoxal phosphate", "Biotin", "Thiamine pyrophosphate", "NAD⁺"], "Its phosphate group assists the phosphorolysis of the glycosidic bond."),
  j(B, "biochemistry", "H", 1, "The relation between the standard free energy change and the standard reduction potential difference is:", ["ΔG° = nFΔE°", "ΔG° = −nFΔE°", "ΔG° = RTΔE°", "ΔG° = −RT/nF"], "A positive ΔE° gives a negative ΔG°."),
  // ───────── Cell and molecular biology ─────────
  j(B, "cell-molecular", "M", 0, "Sanger sequencing relies on:", ["Dideoxynucleotides that terminate chain extension", "Restriction enzymes", "Reverse transcriptase", "Ligation of fragments"], "Chain terminators lacking a 3′-OH are incorporated at random positions."),
  j(B, "cell-molecular", "H", 0, "Nonsense-mediated decay is a surveillance mechanism that degrades:", ["mRNAs containing premature stop codons", "Misfolded proteins in the ER", "Damaged DNA", "Excess ribosomes"], "It prevents the accumulation of truncated proteins."),
  j(B, "cell-molecular", "H", 1, "The yeast two-hybrid system is used to detect:", ["DNA sequence variation", "Protein–protein interactions", "RNA splicing patterns", "Enzyme kinetics"], "Interaction reconstitutes a functional transcription factor."),
  j(B, "cell-molecular", "H", 2, "The Kozak sequence is important for:", ["Replication initiation in bacteria", "Termination of transcription", "Translation initiation in eukaryotes", "DNA repair"], "It surrounds the AUG start codon in eukaryotic mRNA."),
  j(B, "cell-molecular", "H", 1, "In the trp operon, attenuation depends on:", ["Allolactose binding", "Coupling of transcription and translation", "A sigma factor switch", "Methylation of DNA"], "Ribosome position over the leader peptide determines which hairpin forms."),
  j(B, "cell-molecular", "M", 0, "Steroid hormone receptors act as:", ["Ligand-activated transcription factors", "Ion channels", "Receptor tyrosine kinases", "G-protein-coupled receptors"], "The hormone–receptor complex binds hormone response elements in DNA."),
  j(B, "cell-molecular", "H", 2, "SNARE proteins are essential for:", ["Protein folding", "DNA repair", "Vesicle fusion with target membranes", "Ribosome assembly"], "v-SNAREs and t-SNAREs zipper together to pull membranes together."),
  // ───────── Genetics ─────────
  j(B, "genetics", "H", 0, "Incomplete penetrance means that:", ["Some individuals with the genotype do not show the phenotype", "All carriers show the trait", "The gene is X-linked", "The mutation rate is high"], "Penetrance is the proportion of genotype carriers who show the phenotype."),
  j(B, "genetics", "H", 1, "Genomic imprinting is the phenomenon in which:", ["Mutations are repaired immediately", "Gene expression depends on the parent of origin", "Genes jump between chromosomes", "RNA edits DNA"], "Methylation marks differ between maternal and paternal alleles."),
  j(B, "genetics", "M", 1, "Nondisjunction at meiosis I produces gametes that are:", ["All normal", "n + 1 and n − 1", "Triploid", "Haploid with extra mitochondria"], "Two homologues go to the same pole."),
  j(B, "genetics", "H", 2, "A LOD score of 3 or more in linkage analysis is taken as evidence that:", ["There is no linkage", "The genes are on different chromosomes", "The loci are linked", "The marker is dominant"], "A LOD of 3 means odds of 1000:1 in favour of linkage."),
  // ───────── Microbiology and immunology ─────────
  j(B, "microbiology-immunology", "H", 0, "Immunoglobulin class switching requires the enzyme:", ["Activation-induced cytidine deaminase", "RAG1 only", "Terminal deoxynucleotidyl transferase only", "Complement C3 convertase"], "AID deaminates cytosines in switch regions."),
  j(B, "microbiology-immunology", "H", 1, "V(D)J recombination of antigen receptor genes is initiated by:", ["Topoisomerase I", "RAG1 and RAG2", "DNA ligase III", "AID"], "The RAG proteins cut at recombination signal sequences."),
  j(B, "microbiology-immunology", "M", 0, "Quorum sensing in bacteria depends on:", ["Secreted signalling molecules that accumulate with cell density", "Phage infection", "Antibiotic exposure", "Conjugation pilus formation"], "Autoinducers regulate gene expression when a threshold is reached."),
  j(B, "microbiology-immunology", "M", 1, "Antigenic drift in influenza viruses is due to:", ["Reassortment of segments between strains", "Accumulation of point mutations in surface antigens", "Integration into the host genome", "Loss of the envelope"], "Gradual changes in haemagglutinin and neuraminidase let the virus escape immunity."),
  // ───────── Plant and animal biology ─────────
  j(B, "plant-animal", "M", 1, "CAM plants open their stomata:", ["During the day", "At night", "Only in winter", "Never"], "CO₂ is fixed as malate at night to reduce water loss."),
  j(B, "plant-animal", "H", 0, "The mobile signal that moves from leaves to the shoot apex to induce flowering is thought to be the:", ["FT protein", "Auxin", "Gibberellic acid", "Ethylene"], "FLOWERING LOCUS T protein is the florigen."),
  j(B, "plant-animal", "M", 2, "The Bohr effect describes the:", ["Increase in haemoglobin affinity for oxygen at high CO₂", "Binding of CO to haemoglobin", "Decrease in haemoglobin oxygen affinity at lower pH or higher CO₂", "Effect of 2,3-BPG on glucose uptake"], "A fall in pH shifts the oxygen dissociation curve to the right."),
  // ───────── Chemistry, physics and mathematics ─────────
  j(B, "chemistry-maths", "H", 0, "Using E = 61 mV × log([K⁺]out/[K⁺]in) with [K⁺]out = 5 mM and [K⁺]in = 150 mM, the potassium equilibrium potential is about:", ["−90 mV", "+90 mV", "−30 mV", "0 mV"], "61 × log(1/30) = 61 × (−1.48) ≈ −90 mV."),
  j(B, "chemistry-maths", "M", 1, "According to Boltzmann's relation S = k ln W, the entropy of a system with a single microstate (W = 1) is:", ["k", "0", "Infinite", "Negative"], "With W = 1, S = k ln 1 = 0, in line with the third law."),
  j(B, "chemistry-maths", "M", 2, "The unit used to express the sedimentation coefficient is the:", ["Dalton", "Gray", "Svedberg", "Becquerel"], "One Svedberg is 10⁻¹³ s."),
  j(B, "chemistry-maths", "H", 1, "The value of ∫ from 1 to e of ln x dx is:", ["0", "1", "e", "e − 1"], "[x ln x − x] from 1 to e = (e − e) − (0 − 1) = 1."),
  j(B, "chemistry-maths", "M", 2, "Find the eigenvalues of the symmetric matrix [[2, 1], [1, 2]]:", ["0 and 4", "2 and 2", "1 and 3", "−1 and 3"], "The characteristic equation is (2 − λ)² = 1."),
  j(B, "chemistry-maths", "H", 0, "A test has 90% sensitivity and 90% specificity. In a population with 10% prevalence, the probability that a positive result is a true positive is:", ["0.5", "0.9", "0.1", "0.09"], "True positives 0.09 against false positives 0.09: 0.09/0.18."),
  j(B, "chemistry-maths", "M", 0, "Colony counts follow a Poisson distribution with mean 4 per plate. The probability that a plate has no colonies is:", ["e⁻⁴", "4e⁻⁴", "1 − e⁻⁴", "e⁴"], "P(0) = e^(−λ)."),
];
