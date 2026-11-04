// IIT JAM Chemistry (CY) — Mocks 9 to 12: 30 MCQs each, written fresh: physical 10, organic 10, inorganic 10. Mock 12 is slightly above exam level.

import { j } from "./types";

const C = "jam-chemistry";

export const jamChemistryMock9 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 2, "A gas has a density of 1.43 g/L at STP (molar volume 22.4 L). Its molar mass is about:", ["16 g/mol", "28 g/mol", "32 g/mol", "44 g/mol"], "M = density × molar volume = 1.43 × 22.4 ≈ 32 g/mol."),
  j(C, "physical", "M", 1, "Trouton's rule puts the entropy of vaporisation of many normal liquids at about:", ["8.8 J/(mol K)", "88 J/(mol K)", "880 J/(mol K)", "0.88 J/(mol K)"], "ΔS_vap ≈ 85–88 J/(mol K) for non-associated liquids."),
  j(C, "physical", "M", 1, "A first-order reaction has k = 0.0231 min⁻¹. Its half-life is:", ["15 min", "30 min", "60 min", "90 min"], "t½ = 0.693/0.0231 = 30 min."),
  j(C, "physical", "H", 1, "The pH of a 10⁻⁸ M HCl solution at 25 °C is closest to:", ["8", "6.98", "7", "6"], "Water's own H⁺ (10⁻⁷ M) must be included: [H⁺] ≈ 1.05 × 10⁻⁷ M, so pH ≈ 6.98."),
  j(C, "physical", "M", 1, "For which of the following equilibria is Kp equal to Kc?", ["N₂ + 3H₂ ⇌ 2NH₃", "H₂ + I₂ ⇌ 2HI", "PCl₅ ⇌ PCl₃ + Cl₂", "2SO₂ + O₂ ⇌ 2SO₃"], "Kp = Kc(RT)^Δn and Δn = 0 only for H₂ + I₂ ⇌ 2HI."),
  j(C, "physical", "E", 2, "Which metal will displace copper from copper sulphate solution?", ["Ag", "Au", "Zn", "Hg"], "Zinc lies above copper in the electrochemical series."),
  j(C, "physical", "M", 1, "The number of radial nodes in a 2s orbital is:", ["0", "1", "2", "3"], "Radial nodes = n − l − 1 = 2 − 0 − 1 = 1."),
  j(C, "physical", "M", 1, "If the length of a one-dimensional box is doubled, the ground-state energy of the particle is reduced by a factor of:", ["2", "4", "8", "16"], "For a particle in a box E ∝ 1/L², so doubling L divides E by 4."),
  j(C, "physical", "M", 0, "The Freundlich adsorption isotherm is expressed as x/m =", ["kP^(1/n)", "kPⁿ", "k/P", "kP"], "The extent of adsorption varies as a fractional power of pressure."),
  j(C, "physical", "H", 1, "The entropy of mixing when 1 mol of ideal gas A is mixed with 1 mol of ideal gas B at the same T and P is:", ["R ln 2", "2R ln 2", "4R ln 2", "R"], "ΔS_mix = −R Σ nᵢ ln xᵢ = −R(1 ln ½ + 1 ln ½) = 2R ln 2."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "Cold, dilute, alkaline KMnO₄ (Baeyer's reagent) converts an alkene into:", ["An epoxide", "A vicinal diol", "Two carboxylic acids", "An alkyne"], "Syn dihydroxylation of the double bond."),
  j(C, "organic", "E", 1, "Benzene reacts with Cl₂ in the presence of FeCl₃ to give:", ["Hexachlorocyclohexane", "Chlorobenzene", "Benzyl chloride", "Chlorocyclohexane"], "This is electrophilic aromatic substitution."),
  j(C, "organic", "E", 0, "Ketones react with hydroxylamine to give:", ["Oximes", "Hydrazones", "Amides", "Nitriles"], "NH₂OH condenses with C=O to form C=N–OH."),
  j(C, "organic", "M", 0, "The Claisen condensation of ethyl acetate with sodium ethoxide gives:", ["Ethyl acetoacetate", "Diethyl ether", "Acetone", "Ethyl propionate"], "Two ester molecules combine to form a β-keto ester."),
  j(C, "organic", "M", 1, "Which of the following is the weakest acid?", ["Phenol", "Ethanol", "Acetic acid", "Water"], "Ethanol (pKa ≈ 16) is slightly weaker than water (15.7); phenol (≈ 10) and acetic acid (4.76) are stronger."),
  j(C, "organic", "M", 1, "The IUPAC name of (CH₃)₂CHCH₂CH₂OH is:", ["2-Methylbutan-1-ol", "3-Methylbutan-1-ol", "3-Methylbutan-2-ol", "Pentan-1-ol"], "The longest chain carrying OH has four carbons, numbered from the OH end, with a methyl on C-3."),
  j(C, "organic", "H", 1, "The number of stereoisomers of tartaric acid (2,3-dihydroxybutanedioic acid) is:", ["2", "3", "4", "6"], "Two stereocentres give a pair of enantiomers plus one meso form."),
  j(C, "organic", "M", 2, "Friedel–Crafts alkylation fails with:", ["Toluene", "Benzene", "Nitrobenzene", "Anisole"], "A strongly deactivated ring does not attack the carbocation."),
  j(C, "organic", "H", 1, "Birch reduction of benzene with Na in liquid NH₃ and an alcohol gives:", ["Cyclohexane", "1,4-Cyclohexadiene", "Cyclohexene", "Phenol"], "A dissolving-metal reduction adds two hydrogens at the 1,4-positions."),
  j(C, "organic", "M", 2, "The aldehydic proton in a ¹H NMR spectrum appears at about:", ["1 ppm", "5 ppm", "9.5 ppm", "12 ppm"], "It is strongly deshielded by the carbonyl group."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "E", 1, "Which element has the highest first ionisation energy?", ["H", "He", "Ne", "F"], "Helium's two electrons are held very tightly in the 1s shell close to the nucleus."),
  j(C, "inorganic", "M", 2, "The hybridisation of xenon in XeF₄ is:", ["sp³", "sp³d", "sp³d²", "sp²"], "Four bond pairs and two lone pairs give an octahedral electron arrangement."),
  j(C, "inorganic", "M", 2, "The number of unpaired electrons in Ni²⁺ in a weak octahedral field is:", ["0", "1", "2", "3"], "Ni²⁺ is d⁸: t₂g⁶e_g² with two unpaired electrons."),
  j(C, "inorganic", "M", 1, "The shape of the SF₄ molecule is:", ["Tetrahedral", "See-saw", "Square planar", "Trigonal pyramidal"], "Four bond pairs and one lone pair around S in a trigonal bipyramid."),
  j(C, "inorganic", "M", 1, "In the vapour phase, aluminium chloride exists mainly as:", ["AlCl₃ monomers", "Al₂Cl₆ dimers", "Al₃Cl₉", "Al⁺ and Cl⁻ ions"], "Chlorine bridges between two aluminium atoms complete their octets."),
  j(C, "inorganic", "H", 1, "The number of unpaired electrons in low-spin [Mn(CN)₆]³⁻ is:", ["0", "2", "4", "5"], "Mn³⁺ is d⁴ and CN⁻ is strong field, giving t₂g⁴ with two unpaired electrons."),
  j(C, "inorganic", "M", 1, "Nitric acid is manufactured industrially by the:", ["Haber process", "Ostwald process", "Contact process", "Solvay process"], "Ammonia is oxidised catalytically over Pt–Rh to NO, which is converted to HNO₃."),
  j(C, "inorganic", "M", 1, "The catalyst used in the contact process for sulphuric acid is:", ["Fe", "V₂O₅", "Pt–Rh gauze", "Ni"], "V₂O₅ catalyses the oxidation of SO₂ to SO₃."),
  j(C, "inorganic", "M", 2, "Which of the following metals has the highest melting point?", ["Fe", "Cu", "W", "Zn"], "Tungsten melts at about 3422 °C."),
  j(C, "inorganic", "M", 1, "The reducing agent used in the thermite reaction is:", ["Carbon", "Aluminium", "Hydrogen", "Sodium"], "Al reduces iron(III) oxide, releasing a great amount of heat."),
];

export const jamChemistryMock10 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 1, "A reaction at 300 K has ΔH = −10 kJ/mol and ΔS = −20 J/(mol K). Its ΔG is:", ["−16 kJ/mol", "−4 kJ/mol", "+4 kJ/mol", "−10 kJ/mol"], "ΔG = −10 000 − 300 × (−20) = −4000 J/mol."),
  j(C, "physical", "M", 1, "For CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp and Kc are related by:", ["Kp = Kc", "Kp = Kc RT", "Kp = Kc/RT", "Kp = Kc (RT)²"], "Δn(gas) = +1."),
  j(C, "physical", "E", 1, "For a first-order reaction, the fraction of reactant remaining after two half-lives is:", ["50%", "25%", "12.5%", "75%"], "(1/2)² = 25%."),
  j(C, "physical", "M", 1, "The molality of a solution of 4 g of NaOH (M = 40 g/mol) in 100 g of water is:", ["0.1 m", "1 m", "10 m", "0.4 m"], "0.1 mol in 0.1 kg of solvent."),
  j(C, "physical", "E", 0, "In a galvanic cell the salt bridge:", ["Maintains electrical neutrality in the two half-cells", "Is a source of electrons", "Reacts with the electrodes", "Increases the cell voltage"], "It allows ions to migrate and complete the circuit."),
  j(C, "physical", "M", 1, "The de Broglie wavelength of an electron accelerated through 100 V is about:", ["0.123 Å", "1.23 Å", "12.3 Å", "123 Å"], "λ = 12.27/√V Å = 1.23 Å."),
  j(C, "physical", "M", 2, "The spin multiplicity of a ground-state nitrogen atom is:", ["2", "3", "4", "5"], "N has three unpaired electrons, so S = 3/2 and 2S + 1 = 4."),
  j(C, "physical", "H", 1, "A solution showing negative deviation from Raoult's law has:", ["ΔH_mix > 0", "ΔH_mix < 0", "ΔV_mix > 0", "ΔH_mix = 0 always"], "Stronger A–B interactions release heat on mixing and reduce vapour pressure."),
  j(C, "physical", "M", 1, "Compared with a perfect crystal, an ionic solid with Schottky defects has:", ["A higher density", "A lower density", "The same density", "Extra ions at interstitial sites"], "Equal numbers of cations and anions are missing from the lattice."),
  j(C, "physical", "M", 2, "Which of the following has the highest lattice energy?", ["NaCl", "KBr", "MgO", "CsI"], "Doubly charged and small ions in MgO give the largest value."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 2, "Which compound reacts most readily with aqueous NaOH by nucleophilic aromatic substitution?", ["Chlorobenzene", "p-Chlorotoluene", "2,4-Dinitrochlorobenzene", "p-Chloroanisole"], "The two nitro groups ortho and para to Cl stabilise the Meisenheimer intermediate."),
  j(C, "organic", "M", 1, "Ethyl bromide treated with KCN gives mainly:", ["Ethyl isocyanide", "Propanenitrile", "Ethanol", "Ethene"], "Cyanide attacks through carbon in an SN2 reaction."),
  j(C, "organic", "E", 1, "Which of the following molecules is chiral?", ["2-Chloropropane", "2-Chlorobutane", "1-Chlorobutane", "Chloroethane"], "Only C-2 of 2-chlorobutane carries four different groups."),
  j(C, "organic", "E", 0, "The number of structural isomers of C₄H₁₀ is:", ["2", "3", "4", "5"], "Butane and 2-methylpropane."),
  j(C, "organic", "M", 0, "Anisole treated with excess hot HI gives:", ["Phenol and methyl iodide", "Iodobenzene and methanol", "Benzene", "Phenyl iodide only"], "The alkyl–oxygen bond is cleaved; the aryl–oxygen bond is too strong."),
  j(C, "organic", "M", 2, "Which of the following carbocations is the most stable?", ["CH₃CH₂⁺", "(CH₃)₂CH⁺", "C₆H₅CH₂⁺", "CH₂=CH⁺"], "The benzyl cation is stabilised by delocalisation into the ring."),
  j(C, "organic", "M", 1, "Which carbonyl compound is the most reactive towards nucleophilic addition?", ["Acetone", "Formaldehyde", "Benzaldehyde", "Benzophenone"], "It has no alkyl group to donate electrons and little steric hindrance."),
  j(C, "organic", "M", 1, "Which natural α-amino acid is achiral?", ["Alanine", "Glycine", "Serine", "Valine"], "The α-carbon of glycine has two hydrogens."),
  j(C, "organic", "H", 1, "The number of signals in the ¹H NMR spectrum of p-xylene is:", ["1", "2", "3", "4"], "The four aromatic hydrogens are equivalent, as are the six methyl hydrogens."),
  j(C, "organic", "H", 1, "The number of π electrons in the tropylium cation (C₇H₇⁺) is:", ["4", "6", "8", "7"], "Six π electrons occupy seven p orbitals, making it aromatic."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 0, "Which noble gas has the lowest boiling point?", ["He", "Ne", "Ar", "Kr"], "Helium has the weakest dispersion forces."),
  j(C, "inorganic", "M", 1, "Iodine reacts with sodium thiosulphate to give:", ["Sulphate", "Tetrathionate", "Sulphite", "Sulphur"], "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻."),
  j(C, "inorganic", "M", 2, "The spin-only magnetic moment of the high-spin [CoF₆]³⁻ ion is about:", ["0", "2.83 BM", "4.90 BM", "5.92 BM"], "Co³⁺ is d⁶; weak-field F⁻ gives four unpaired electrons: √(4 × 6) = 4.90 BM."),
  j(C, "inorganic", "M", 2, "Which of the following species is diamagnetic?", ["O₂", "NO", "N₂", "B₂"], "N₂ has all electrons paired; B₂, NO and O₂ each have unpaired electrons."),
  j(C, "inorganic", "H", 2, "The number of bridging carbonyl ligands in Fe₂(CO)₉ is:", ["0", "1", "3", "6"], "Two Fe(CO)₃ units are linked by three bridging CO groups."),
  j(C, "inorganic", "M", 0, "Which silver halide dissolves readily in dilute aqueous ammonia?", ["AgCl", "AgBr", "AgI", "None of them"], "AgCl forms the soluble [Ag(NH₃)₂]⁺ complex; AgBr dissolves only in concentrated ammonia."),
  j(C, "inorganic", "M", 0, "The coordination numbers of Zn²⁺ and S²⁻ in zinc blende (ZnS) are:", ["4 and 4", "6 and 6", "8 and 8", "6 and 4"], "Each ion occupies tetrahedral sites relative to the other."),
  j(C, "inorganic", "H", 1, "The F–F bond is weaker than the Cl–Cl bond mainly because of:", ["The large size of F", "Lone pair–lone pair repulsion between the small F atoms", "The higher electronegativity of Cl", "The presence of d orbitals in Cl"], "The short F–F bond brings the lone pairs close together."),
  j(C, "inorganic", "M", 2, "Which of the following is an ionic (saline) hydride?", ["CH₄", "NH₃", "NaH", "H₂O"], "NaH contains Na⁺ and H⁻."),
  j(C, "inorganic", "M", 1, "The oxidation state of oxygen in H₂O₂ is:", ["−2", "−1", "0", "+1"], "In a peroxide each oxygen is −1."),
];

export const jamChemistryMock11 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "E", 0, "The mole fraction of ethanol in a mixture of 1 mol ethanol and 3 mol water is:", ["0.25", "0.33", "0.75", "0.5"], "1/(1 + 3) = 0.25."),
  j(C, "physical", "M", 0, "For an ideal gas, Cp − Cv per mole equals:", ["R", "2R", "R/2", "3R/2"], "From H = U + RT, dH/dT − dU/dT = R."),
  j(C, "physical", "M", 2, "A reaction's rate doubles for every 10 K rise in temperature. When the temperature rises by 30 K the rate increases by a factor of:", ["3", "6", "8", "9"], "Thirty kelvin is three 10 K steps, each doubling the rate: 2³ = 8."),
  j(C, "physical", "M", 1, "For strong electrolytes in dilute solution, the molar conductivity varies linearly with:", ["c", "√c", "1/c", "ln c"], "Kohlrausch's law: Λm = Λ° − A√c."),
  j(C, "physical", "E", 0, "By convention, the standard electrode potential of the standard hydrogen electrode is:", ["0 V", "+1 V", "−1 V", "+0.34 V"], "It is the reference point of the scale."),
  j(C, "physical", "H", 0, "The number of photons of wavelength 600 nm contained in 1 J of light is about:", ["3.0 × 10¹⁸", "3.0 × 10²⁰", "6.0 × 10¹⁸", "3.0 × 10¹⁶"], "N = Eλ/(hc) = 600 × 10⁻⁹/(6.626 × 10⁻³⁴ × 3 × 10⁸) ≈ 3.0 × 10¹⁸."),
  j(C, "physical", "M", 2, "The maximum number of electrons that can have n = 2 and l = 1 is:", ["2", "4", "6", "10"], "The 2p subshell holds six electrons."),
  j(C, "physical", "M", 1, "For l = 2, the number of possible values of the magnetic quantum number mₗ is:", ["3", "5", "7", "9"], "mₗ runs from −2 to +2."),
  j(C, "physical", "M", 1, "For the sparingly soluble salt Mg(OH)₂ with molar solubility s, the solubility product is:", ["s²", "4s³", "27s⁴", "s³"], "[Mg²⁺] = s and [OH⁻] = 2s, so Ksp = s(2s)² = 4s³."),
  j(C, "physical", "H", 0, "A crystal of CO with molecules randomly oriented as CO or OC at 0 K has a residual molar entropy of about:", ["R ln 2", "2R ln 2", "0", "R"], "S = k ln W with W = 2^N gives S = R ln 2 per mole."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "Acid-catalysed dehydration of 2-methylbutan-2-ol gives mainly:", ["2-Methylbut-1-ene", "2-Methylbut-2-ene", "3-Methylbut-1-ene", "Pent-2-ene"], "Zaitsev's rule favours the more substituted alkene."),
  j(C, "organic", "M", 1, "Lithium aluminium hydride reduces ethyl acetate to:", ["Acetic acid", "Ethanol", "Acetaldehyde", "Diethyl ether"], "The ester is reduced to two molecules of primary alcohol, both ethanol."),
  j(C, "organic", "E", 1, "Aspirin is made by acetylating:", ["Phenol", "Salicylic acid", "Benzoic acid", "Toluene"], "The phenolic OH of salicylic acid is acetylated by acetic anhydride."),
  j(C, "organic", "H", 0, "Free-radical bromination of 2-methylpropane with Br₂ and light gives mainly:", ["tert-Butyl bromide", "Isobutyl bromide", "Equal amounts of both", "A dibromide"], "Bromine radicals are highly selective for the weakest, tertiary C–H bond."),
  j(C, "organic", "E", 1, "The number of optical isomers of lactic acid is:", ["1", "2", "3", "4"], "It has one stereocentre: a pair of enantiomers."),
  j(C, "organic", "M", 1, "The number of σ bonds in ethene is:", ["4", "5", "6", "3"], "Four C–H σ bonds and one C–C σ bond."),
  j(C, "organic", "M", 0, "The carbylamine test (CHCl₃, KOH, heat) is given by:", ["Primary amines", "Secondary amines", "Tertiary amines", "Amides"], "Primary amines form foul-smelling isocyanides."),
  j(C, "organic", "M", 0, "α- and β-glucose are anomers; they differ in configuration at:", ["C-1", "C-2", "C-4", "C-5"], "The anomeric carbon, C-1, is the new stereocentre formed on ring closure."),
  j(C, "organic", "H", 1, "The number of hyperconjugative structures of the ethyl cation, CH₃CH₂⁺, is:", ["1", "3", "5", "6"], "The adjacent CH₃ group has three C–H bonds that can overlap with the empty p orbital."),
  j(C, "organic", "M", 1, "A compound containing one bromine atom shows M and M+2 peaks in the mass spectrum with intensity ratio about:", ["3:1", "1:1", "1:2", "9:1"], "⁷⁹Br and ⁸¹Br occur in nearly equal abundance."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 1, "Which of the following metals is liquid at room temperature?", ["Ga", "Hg", "Zn", "Cs"], "Mercury melts at −39 °C."),
  j(C, "inorganic", "M", 2, "The hybridisation of chlorine in the ClO₄⁻ ion is:", ["sp", "sp²", "sp³", "sp³d"], "Four bond pairs and no lone pair give a tetrahedral ion."),
  j(C, "inorganic", "M", 2, "The bond order of the CO molecule is:", ["2", "2.5", "3", "3.5"], "CO is isoelectronic with N₂ and has a triple bond."),
  j(C, "inorganic", "M", 1, "Which of the following oxides is neutral?", ["CO₂", "N₂O", "SO₂", "Na₂O"], "N₂O neither reacts with acids nor with bases."),
  j(C, "inorganic", "M", 1, "Phosphorous acid, H₃PO₃, is:", ["Monobasic", "Dibasic", "Tribasic", "Tetrabasic"], "Only the two P–OH hydrogens are ionisable; the third H is bonded to phosphorus."),
  j(C, "inorganic", "M", 0, "Zeolites are used for:", ["Softening hard water", "Purifying air", "Reducing ores", "Making steel"], "They exchange their Na⁺ ions for Ca²⁺ and Mg²⁺."),
  j(C, "inorganic", "M", 3, "Ethylenediaminetetraacetate (EDTA) is a:", ["Monodentate ligand", "Bidentate ligand", "Tridentate ligand", "Hexadentate ligand"], "It binds through two nitrogen and four carboxylate oxygen atoms."),
  j(C, "inorganic", "M", 1, "Which metal ion typically forms square planar complexes?", ["Zn²⁺", "Pd²⁺", "Mn²⁺", "Ca²⁺"], "d⁸ ions of the second and third transition series prefer square planar geometry."),
  j(C, "inorganic", "H", 2, "Strong Jahn–Teller distortion is expected for octahedral complexes of:", ["d³", "Low-spin d⁶", "d⁹", "d¹⁰"], "Unequal occupation of the e_g orbitals (d⁹) gives a degenerate ground state that distorts."),
  j(C, "inorganic", "M", 1, "Bleaching powder has the formula:", ["CaCl₂", "Ca(OCl)Cl", "Ca(ClO₃)₂", "CaO"], "It is a mixed calcium chloride–hypochlorite, CaOCl₂."),
];

export const jamChemistryMock12 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "H", 1, "A cell reaction has n = 2 and E° = 0.0592 V at 298 K. Its equilibrium constant is:", ["10", "100", "1000", "10⁴"], "log K = nE°/0.0592 = 2, so K = 100."),
  j(C, "physical", "H", 0, "A reactant undergoes two parallel first-order reactions with k₁ = 3 min⁻¹ and k₂ = 2 min⁻¹. Its overall half-life is:", ["0.139 min", "0.277 min", "0.693 min", "0.347 min"], "k_total = 5 min⁻¹, so t½ = 0.693/5 = 0.139 min."),
  j(C, "physical", "H", 1, "In the mechanism A ⇌ B (fast pre-equilibrium, constant K) followed by B → C (slow, constant k), the rate of formation of C is:", ["k[B] only, with no relation to [A]", "kK[A]", "k[C]", "k[A]²"], "[B] = K[A] from the fast equilibrium, so rate = k[B] = kK[A]."),
  j(C, "physical", "M", 0, "A buffer has its maximum buffer capacity when:", ["[A⁻] = [HA]", "[A⁻] ≫ [HA]", "[HA] ≫ [A⁻]", "pH = 7"], "At pH = pKa both components are equally able to neutralise added acid or base."),
  j(C, "physical", "M", 0, "Kirchhoff's equation relates the enthalpy change of a reaction at two temperatures through:", ["ΔCp", "ΔS", "ΔG", "Kp"], "ΔH(T₂) = ΔH(T₁) + ΔCp (T₂ − T₁)."),
  j(C, "physical", "M", 1, "The zero-point energy of a harmonic oscillator of frequency ν is:", ["0", "hν/2", "hν", "3hν/2"], "Eₙ = (n + ½)hν with n = 0."),
  j(C, "physical", "H", 2, "The ground-state energy of the He⁺ ion is:", ["−13.6 eV", "−27.2 eV", "−54.4 eV", "−108.8 eV"], "E = −13.6 Z²/n² = −13.6 × 4 = −54.4 eV."),
  j(C, "physical", "M", 1, "For a body-centred cubic lattice of edge length a, the atomic radius is:", ["a/2", "√3 a/4", "a/(2√2)", "√2 a/4"], "Atoms touch along the body diagonal: 4r = √3 a."),
  j(C, "physical", "H", 1, "For a reaction at constant pressure, the slope of a plot of ΔG against T is:", ["ΔH", "−ΔS", "ΔS", "−ΔH"], "(∂G/∂T)_P = −S, and for a reaction (∂ΔG/∂T)_P = −ΔS."),
  j(C, "physical", "H", 0, "According to the Debye–Hückel limiting law, ln γ± for a dilute electrolyte solution is proportional to:", ["The square root of the ionic strength", "The square of the ionic strength", "The reciprocal of the ionic strength", "None of these; it is independent of ionic strength"], "log γ± = −A|z₊z₋|√I."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "(R)-2-Bromobutane reacts with OH⁻ by a pure SN2 mechanism. The product is:", ["(R)-Butan-2-ol", "(S)-Butan-2-ol", "A racemic mixture", "But-2-ene only"], "SN2 proceeds with inversion of configuration, and the priorities of the groups are unchanged."),
  j(C, "organic", "M", 1, "Treating cyclohexanone oxime with acid (Beckmann rearrangement) gives:", ["Cyclohexylamine", "ε-Caprolactam", "Adipic acid", "Cyclohexanol"], "The ring expands by insertion of nitrogen next to the carbonyl carbon."),
  j(C, "organic", "M", 3, "Which of the following is the strongest base?", ["Pyridine", "Aniline", "Acetamide", "Ethylamine"], "The lone pair on ethylamine is localised and its conjugate acid has pKa ≈ 10.7."),
  j(C, "organic", "H", 0, "Heating allyl phenyl ether (Claisen rearrangement) gives mainly:", ["o-Allylphenol", "p-Allylphenol only", "Phenol and propene", "Benzaldehyde"], "A [3,3]-sigmatropic shift moves the allyl group to the ortho position."),
  j(C, "organic", "H", 1, "2-Bromo-2-methylbutane with the bulky base potassium tert-butoxide gives mainly:", ["2-Methylbut-2-ene", "2-Methylbut-1-ene", "2-Methylbutan-2-ol", "Isopentane"], "A bulky base abstracts the more accessible hydrogen, giving the Hofmann product."),
  j(C, "organic", "H", 1, "Which of the following is chiral despite having no stereocentre?", ["Propadiene", "Penta-2,3-diene", "Ethene", "Cyclohexane"], "Penta-2,3-diene is an allene with different groups on each end and so has an axis of chirality."),
  j(C, "organic", "M", 1, "The Wolff–Kishner reduction uses:", ["Zn(Hg)/HCl", "N₂H₄ with KOH and heat", "LiAlH₄", "H₂/Pd"], "It converts C=O to CH₂ under basic conditions."),
  j(C, "organic", "H", 2, "A sample of a chiral compound has specific rotation +25°, whereas the pure R enantiomer has +50°. The percentage of R in the sample is:", ["50%", "62.5%", "75%", "87.5%"], "ee = 25/50 = 50%, so R = (100 + 50)/2 = 75%."),
  j(C, "organic", "H", 1, "Benzenediazonium chloride couples with phenol best in:", ["Strongly acidic medium", "Mildly alkaline medium", "Neutral water only", "Anhydrous ether"], "The phenoxide ion is a much more reactive coupling partner, while strongly alkaline conditions destroy the diazonium ion."),
  j(C, "organic", "M", 0, "The Perkin reaction of benzaldehyde with acetic anhydride and sodium acetate gives:", ["Cinnamic acid", "Benzoic acid", "Benzyl alcohol", "Acetophenone"], "It forms an α,β-unsaturated aromatic acid."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "H", 1, "The ground-state term symbol of a free d² ion is:", ["³P", "³F", "¹D", "¹G"], "By Hund's rules the highest-spin term with the largest L is ³F."),
  j(C, "inorganic", "H", 1, "According to Wade's rules, B₅H₉ is a:", ["closo-borane", "nido-borane", "arachno-borane", "hypho-borane"], "B₅H₉ is BₙHₙ₊₄ with n = 5, which is the nido series."),
  j(C, "inorganic", "H", 1, "The number of metal–metal bonds in Mn₂(CO)₁₀ is:", ["0", "1", "2", "3"], "Two Mn(CO)₅ units, each with 17 electrons, pair up through one Mn–Mn bond."),
  j(C, "inorganic", "H", 1, "The complex [NiCl₄]²⁻ is:", ["Square planar and diamagnetic", "Tetrahedral and paramagnetic", "Octahedral and diamagnetic", "Tetrahedral and diamagnetic"], "Cl⁻ is a weak-field ligand, so Ni²⁺ (d⁸) is tetrahedral with two unpaired electrons."),
  j(C, "inorganic", "M", 2, "Which of the following pentahalides does not exist?", ["PCl₅", "AsF₅", "NCl₅", "SbCl₅"], "Nitrogen has no d orbitals and cannot expand its octet."),
  j(C, "inorganic", "H", 0, "In Zeise's salt, K[PtCl₃(C₂H₄)], the ethene is bound to platinum through:", ["Donation of its π electrons, with back-donation from Pt into π*", "A σ bond from one carbon only", "An ionic bond", "A hydrogen bond"], "This is the Dewar–Chatt–Duncanson bonding model."),
  j(C, "inorganic", "M", 0, "Wilkinson's catalyst, RhCl(PPh₃)₃, is used for:", ["Homogeneous hydrogenation of alkenes", "Olefin polymerisation", "Ammonia synthesis", "Oxidation of ethene to ethanal"], "It catalyses the hydrogenation of C=C bonds in solution."),
  j(C, "inorganic", "M", 0, "The oxidation state of chromium in [Cr(CO)₆] is:", ["0", "+3", "+6", "−6"], "CO is a neutral ligand and the complex is neutral."),
  j(C, "inorganic", "H", 1, "In the Ellingham diagram, the line for the reaction 2C + O₂ → 2CO has:", ["A positive slope", "A negative slope", "Zero slope", "A sharp break only"], "The reaction increases the amount of gas, so ΔS is positive and ΔG° falls with temperature."),
  j(C, "inorganic", "H", 0, "The number of unpaired electrons in the peroxide ion O₂²⁻ is:", ["0", "1", "2", "3"], "O₂²⁻ has 14 valence electrons and a bond order of 1 with all electrons paired."),
];
