// IIT JAM Chemistry (CY) — Mocks 5 to 8: 30 MCQs each, written fresh: physical 10, organic 10, inorganic 10.

import { j } from "./types";

const C = "jam-chemistry";

export const jamChemistryMock5 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "E", 1, "A mixture of 2 mol N₂ and 3 mol O₂ has a total pressure of 5 atm. The partial pressure of N₂ is:", ["1 atm", "2 atm", "3 atm", "5 atm"], "Dalton's law: p = x × P_total = (2/5) × 5 = 2 atm."),
  j(C, "physical", "M", 0, "Given ΔH(C + O₂ → CO₂) = −393 kJ and ΔH(CO + ½O₂ → CO₂) = −283 kJ, the enthalpy change of C + ½O₂ → CO is:", ["−110 kJ", "−676 kJ", "+110 kJ", "−283 kJ"], "By Hess's law: −393 − (−283) = −110 kJ."),
  j(C, "physical", "M", 2, "For A ⇌ B with K = 4, starting from 1 M of pure A, the equilibrium concentration of B is:", ["0.25 M", "0.5 M", "0.8 M", "0.2 M"], "x/(1 − x) = 4 gives x = 0.8 M."),
  j(C, "physical", "H", 0, "The limiting molar conductivities (S cm² mol⁻¹) are 426 for HCl, 91 for CH₃COONa and 126 for NaCl. For CH₃COOH the value is:", ["391", "461", "217", "643"], "By Kohlrausch's law: 426 + 91 − 126 = 391."),
  j(C, "physical", "E", 1, "According to Henry's law, if the pressure of a gas above a liquid is doubled at constant temperature, its solubility:", ["Is halved", "Doubles", "Is unchanged", "Becomes four times"], "Solubility is proportional to the partial pressure."),
  j(C, "physical", "M", 1, "If the uncertainty in the position of an electron is reduced, the minimum uncertainty in its momentum:", ["Decreases", "Increases", "Is unchanged", "Becomes zero"], "Δx·Δp ≥ h/4π, so reducing Δx raises the minimum Δp."),
  j(C, "physical", "M", 2, "The maximum number of different spectral lines that can be emitted when hydrogen atoms fall from n = 4 to lower levels is:", ["3", "4", "6", "10"], "n(n − 1)/2 = 4 × 3/2 = 6."),
  j(C, "physical", "M", 1, "For a reaction with rate = k[A][B], if B is present in a very large excess, the reaction behaves as:", ["Zero order", "Pseudo-first order", "Second order in A", "Third order"], "[B] stays effectively constant, so the rate depends on [A] only."),
  j(C, "physical", "M", 1, "The maximum efficiency of a Carnot engine working between 500 K and 300 K is:", ["20%", "40%", "60%", "80%"], "η = 1 − Tc/Th = 1 − 300/500 = 0.4."),
  j(C, "physical", "H", 1, "For a reaction at equilibrium at constant temperature and pressure, the Gibbs energy change ΔG of the reaction is:", ["Equal to ΔG°", "Zero", "Equal to −RT ln K", "Equal to RT ln K"], "At equilibrium Q = K, so ΔG = ΔG° + RT ln K = 0."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "Which reagent converts an alcohol ROH into the alkyl chloride RCl with only gaseous by-products?", ["NaCl", "SOCl₂", "Cl₂", "NaOCl"], "SOCl₂ gives SO₂ and HCl, both gases."),
  j(C, "organic", "M", 1, "Pyridinium chlorochromate (PCC) oxidises a primary alcohol to:", ["A carboxylic acid", "An aldehyde", "A ketone", "An ester"], "PCC in anhydrous medium stops at the aldehyde stage."),
  j(C, "organic", "M", 2, "Which of the following gives a positive iodoform test?", ["Propan-1-ol", "Propanal", "Propan-2-ol", "Methanol"], "The test needs CH₃CO– or CH₃CH(OH)– attached to carbon or hydrogen; propan-2-ol is oxidised to acetone."),
  j(C, "organic", "M", 0, "The Sandmeyer reaction converts an aryl diazonium salt, with a copper(I) halide, into:", ["An aryl halide", "A phenol only", "Nitrobenzene", "Aniline"], "The diazonium group is replaced by Cl, Br or CN."),
  j(C, "organic", "E", 1, "The peptide bond in proteins is a(n):", ["Ester linkage", "Amide linkage", "Ether linkage", "Glycosidic linkage"], "It joins the carboxyl group of one amino acid to the amino group of the next."),
  j(C, "organic", "H", 2, "The cyclic transition state of a thermal Diels–Alder reaction involves how many π electrons?", ["2", "4", "6", "8"], "Four π electrons of the diene and two of the dienophile: a 4n + 2 aromatic transition state."),
  j(C, "organic", "M", 2, "The most stable conformation of n-butane about the C2–C3 bond is:", ["Totally eclipsed", "Gauche", "Anti", "Partially eclipsed"], "In the anti conformation the two methyl groups are 180° apart, which minimises steric strain."),
  j(C, "organic", "M", 1, "Which property is identical for a pair of enantiomers?", ["Direction of optical rotation", "Boiling point", "Interaction with a chiral reagent", "Taste and odour"], "In an achiral environment enantiomers share physical properties such as boiling point; they differ in rotation sign and chiral interactions."),
  j(C, "organic", "M", 2, "Which carboxylic acid derivative is the most reactive towards nucleophilic acyl substitution?", ["Amide", "Ester", "Acid chloride", "Carboxylate"], "Chloride is the best leaving group and the carbonyl carbon is the most electrophilic."),
  j(C, "organic", "H", 1, "In pyridine, the lone pair on nitrogen lies in:", ["A p orbital forming part of the aromatic sextet", "An sp² orbital in the plane of the ring", "An sp³ orbital", "A 1s orbital"], "The aromatic sextet uses the p electrons; the lone pair is in the plane, so pyridine is basic."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "E", 2, "Which of the following is a Lewis base?", ["BF₃", "AlCl₃", "NH₃", "H⁺"], "NH₃ has a lone pair that it can donate."),
  j(C, "inorganic", "M", 1, "The hybridisation of the carbon atoms in graphite is:", ["sp³", "sp²", "sp", "sp³d"], "Each carbon is bonded to three others in a planar hexagonal layer."),
  j(C, "inorganic", "M", 1, "The N₂ molecule contains:", ["1 σ and 1 π bond", "1 σ and 2 π bonds", "2 σ and 1 π bond", "3 σ bonds"], "The triple bond N≡N consists of one σ and two π bonds."),
  j(C, "inorganic", "M", 1, "The bond order of N₂⁺ is:", ["2", "2.5", "3", "3.5"], "N₂ has bond order 3; removing a bonding electron gives (9 − 4)/2 = 2.5."),
  j(C, "inorganic", "M", 2, "Which of the following compounds is the most ionic?", ["LiI", "NaCl", "CsF", "MgBr₂"], "The large electropositive Cs⁺ and the small, highly electronegative F⁻ give the greatest ionic character."),
  j(C, "inorganic", "M", 1, "Which of the following complexes can show cis–trans isomerism?", ["Tetrahedral [Zn(NH₃)₂Cl₂]", "Square planar [Pt(NH₃)₂Cl₂]", "[Ni(CO)₄]", "[Fe(CN)₆]⁴⁻"], "Square planar MA₂B₂ has cis and trans forms; in a tetrahedron all positions are adjacent."),
  j(C, "inorganic", "H", 1, "The number of valence electrons around the metal in Fe(CO)₅ is:", ["16", "18", "20", "14"], "Fe contributes 8 electrons and five CO ligands donate 2 each: 8 + 10 = 18."),
  j(C, "inorganic", "M", 2, "Which of the following chlorides has the most covalent character?", ["NaCl", "MgCl₂", "AlCl₃", "KCl"], "By Fajans' rules, the highly polarising small, highly charged Al³⁺ gives the most covalent bonding."),
  j(C, "inorganic", "M", 1, "The first noble gas compound to be prepared was:", ["XeF₄", "XePtF₆", "KrF₂", "XeO₃"], "Bartlett made Xe⁺[PtF₆]⁻ in 1962."),
  j(C, "inorganic", "M", 2, "Temporary hardness of water is caused by dissolved:", ["Chlorides of Ca and Mg", "Sulphates of Ca and Mg", "Bicarbonates of Ca and Mg", "Sodium salts"], "Boiling decomposes the bicarbonates to insoluble carbonates."),
];

export const jamChemistryMock6 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 1, "At very high pressures the compressibility factor Z of a real gas is:", ["Less than 1", "Greater than 1", "Zero", "Exactly 1"], "At high pressure the finite size of molecules (repulsion) dominates, so PV/nRT exceeds 1."),
  j(C, "physical", "M", 1, "When an ideal gas is compressed adiabatically, its temperature:", ["Falls", "Rises", "Stays constant", "Cannot be predicted"], "Work done on the gas increases its internal energy since q = 0."),
  j(C, "physical", "M", 2, "The unit of the rate constant of a third-order reaction is:", ["s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹", "mol L⁻¹ s⁻¹"], "For order n, k has units (mol/L)^(1 − n) s⁻¹; for n = 3 this is L² mol⁻² s⁻¹."),
  j(C, "physical", "M", 1, "The pH of a 0.1 M ammonia solution (Kb = 1.8 × 10⁻⁵) is about:", ["9.87", "11.13", "13.00", "8.87"], "[OH⁻] = √(Kb c) = √(1.8 × 10⁻⁶) = 1.34 × 10⁻³ M, so pOH = 2.87 and pH = 11.13."),
  j(C, "physical", "M", 1, "Electrolysis of concentrated aqueous NaCl liberates which gas at the cathode?", ["Na", "H₂", "Cl₂", "O₂"], "Water is reduced in preference to Na⁺, giving H₂ and OH⁻."),
  j(C, "physical", "M", 1, "The energy of a photon of wavelength 500 nm is about:", ["1.24 eV", "2.48 eV", "4.96 eV", "0.248 eV"], "E = 1240 eV nm/λ = 1240/500 = 2.48 eV."),
  j(C, "physical", "E", 2, "The maximum number of electrons that can be accommodated in the n = 3 shell is:", ["8", "10", "18", "32"], "2n² = 2 × 9 = 18."),
  j(C, "physical", "M", 2, "The number of unpaired electrons in a ground-state oxygen atom is:", ["0", "1", "2", "4"], "O is 2s²2p⁴; by Hund's rule two of the p electrons are unpaired."),
  j(C, "physical", "E", 1, "The Tyndall effect is shown by:", ["True solutions", "Colloidal solutions", "Pure gases", "Ideal solutions"], "Colloidal particles are large enough to scatter light."),
  j(C, "physical", "H", 1, "For a cell reaction with n = 2 and E° = 1.10 V, the standard Gibbs energy change is about:", ["−106 kJ", "−212 kJ", "−425 kJ", "+212 kJ"], "ΔG° = −nFE° = −2 × 96 500 × 1.10 ≈ −212 kJ."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 0, "Which reagent converts an alkene into an epoxide?", ["m-Chloroperoxybenzoic acid (mCPBA)", "NaBH₄", "LiAlH₄", "H₂/Pd"], "Peracids transfer an oxygen atom to the C=C double bond."),
  j(C, "organic", "E", 0, "Acid hydrolysis of ethyl acetate gives:", ["Acetic acid and ethanol", "Acetaldehyde", "Diethyl ether", "Acetone"], "It is the reverse of esterification."),
  j(C, "organic", "M", 1, "Kolbe electrolysis of aqueous sodium acetate gives mainly:", ["Methane", "Ethane", "Ethene", "Propane"], "Decarboxylation at the anode gives methyl radicals, which couple to form ethane."),
  j(C, "organic", "M", 1, "In the chair form of cyclohexane, a bulky substituent prefers the:", ["Axial position", "Equatorial position", "Boat position", "Eclipsed position"], "The equatorial position avoids 1,3-diaxial interactions."),
  j(C, "organic", "M", 2, "With the Lucas reagent (ZnCl₂/conc. HCl) at room temperature, which alcohol reacts fastest?", ["Primary", "Secondary", "Tertiary", "All react at the same rate"], "The reaction proceeds through carbocations, and tertiary carbocations are the most stable."),
  j(C, "organic", "M", 1, "Complete acid hydrolysis of acetonitrile, CH₃CN, gives:", ["Acetamide only", "Acetic acid", "Ethylamine", "Acetaldehyde"], "The nitrile goes through the amide to the carboxylic acid and ammonium ion."),
  j(C, "organic", "H", 0, "The pinacol–pinacolone rearrangement converts a vicinal diol, in acid, into a:", ["Ketone", "Alkene", "Ether", "Carboxylic acid"], "Protonation, loss of water and a 1,2-shift give a protonated ketone."),
  j(C, "organic", "E", 0, "Which cycloalkane has the highest angle strain?", ["Cyclopropane", "Cyclobutane", "Cyclopentane", "Cyclohexane"], "Its 60° C–C–C angles deviate most from 109.5°."),
  j(C, "organic", "M", 2, "The molecular ion peak of ethanol in its mass spectrum appears at m/z:", ["44", "45", "46", "47"], "The molar mass of C₂H₅OH is 46."),
  j(C, "organic", "M", 0, "Increasing the length of conjugation in a polyene:", ["Shifts λmax to longer wavelength", "Shifts λmax to shorter wavelength", "Has no effect on λmax", "Removes UV absorption"], "The HOMO–LUMO gap narrows as conjugation increases."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "H", 1, "Which halogen has the largest magnitude of negative electron gain enthalpy?", ["F", "Cl", "Br", "I"], "Chlorine exceeds fluorine because the compact 2p subshell of F suffers strong electron–electron repulsion."),
  j(C, "inorganic", "M", 1, "A diagonal relationship exists between lithium and:", ["Sodium", "Magnesium", "Calcium", "Aluminium"], "Li and Mg have similar charge-to-radius ratios."),
  j(C, "inorganic", "M", 0, "On descending group 2, the thermal stability of the carbonates:", ["Increases", "Decreases", "Stays the same", "First falls and then rises"], "Larger cations polarise the carbonate ion less, so decomposition is harder."),
  j(C, "inorganic", "M", 1, "The structure of solid silicon dioxide is best described as:", ["Discrete molecules", "A giant covalent network", "An ionic lattice", "A metallic lattice"], "Each Si is bonded tetrahedrally to four O atoms, and the network extends through the crystal."),
  j(C, "inorganic", "M", 1, "The most common oxidation state of the lanthanides is:", ["+2", "+3", "+4", "+5"], "Loss of the 6s and one 5d/4f electron gives Ln³⁺."),
  j(C, "inorganic", "M", 1, "The complex ion [Fe(CN)₆]⁴⁻ is:", ["Paramagnetic with 4 unpaired electrons", "Diamagnetic", "Paramagnetic with 2 unpaired electrons", "Paramagnetic with 1 unpaired electron"], "Fe²⁺ is d⁶; CN⁻ is a strong-field ligand, so the electrons pair in t₂g⁶."),
  j(C, "inorganic", "M", 0, "The IUPAC name of K₃[Fe(CN)₆] is:", ["Potassium hexacyanoferrate(III)", "Potassium hexacyanoiron(II)", "Tripotassium ferrocyanide", "Potassium iron(III) cyanide"], "Three K⁺ balance a −3 complex, so iron is +3."),
  j(C, "inorganic", "M", 1, "Aluminium is extracted from purified alumina by:", ["Carbon reduction", "Electrolysis in molten cryolite", "Roasting", "Zone refining"], "Hall–Héroult electrolysis of Al₂O₃ dissolved in cryolite."),
  j(C, "inorganic", "M", 1, "Nickel tetracarbonyl, [Ni(CO)₄], has which geometry?", ["Square planar", "Tetrahedral", "Octahedral", "Linear"], "Ni(0) is d¹⁰ with sp³ hybridisation."),
  j(C, "inorganic", "H", 3, "The spin-only magnetic moment of [Fe(H₂O)₆]³⁺ is about:", ["1.73 BM", "3.87 BM", "4.90 BM", "5.92 BM"], "Fe³⁺ is d⁵; water is a weak-field ligand, so the five electrons are unpaired: √(5 × 7) = 5.92 BM."),
];

export const jamChemistryMock7 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 1, "For the free expansion of an ideal gas into a vacuum, the entropy change of the gas is:", ["Zero", "Positive", "Negative", "Equal to q/T = 0"], "The process is irreversible; ΔS is found along a reversible path and is nR ln(V₂/V₁) > 0."),
  j(C, "physical", "E", 0, "According to the third law of thermodynamics, the entropy of a perfect crystal at 0 K is:", ["Zero", "Positive", "Negative", "Infinite"], "A single perfectly ordered arrangement has no disorder."),
  j(C, "physical", "E", 2, "A radioactive sample of 100 g is left for three half-lives. The mass remaining is:", ["50 g", "25 g", "12.5 g", "6.25 g"], "100 × (1/2)³ = 12.5 g."),
  j(C, "physical", "M", 1, "On dilution, the molar conductivity of acetic acid solution:", ["Decreases", "Increases", "Is unchanged", "Becomes zero"], "Dilution increases the degree of dissociation."),
  j(C, "physical", "M", 3, "A reaction with ΔH < 0 and ΔS > 0 is spontaneous:", ["Never", "Only at high temperature", "Only at low temperature", "At all temperatures"], "ΔG = ΔH − TΔS is negative at every T."),
  j(C, "physical", "M", 2, "The radius of the n = 2 orbit of the hydrogen atom (a₀ = 0.53 Å) is about:", ["0.53 Å", "1.06 Å", "2.12 Å", "4.77 Å"], "rₙ = n²a₀ = 4 × 0.53 = 2.12 Å."),
  j(C, "physical", "E", 3, "The number of orbitals in a 4f subshell is:", ["1", "3", "5", "7"], "A subshell with azimuthal quantum number l has 2l + 1 orbitals, which is 7 for l = 3."),
  j(C, "physical", "M", 1, "Adding NaCl to a saturated solution of AgCl:", ["Increases the solubility of AgCl", "Decreases the solubility of AgCl", "Leaves it unchanged", "Makes it infinite"], "The common ion Cl⁻ shifts the dissolution equilibrium towards solid AgCl."),
  j(C, "physical", "H", 1, "Which vibrational mode of CO₂ is inactive in the infrared?", ["Asymmetric stretch", "Symmetric stretch", "Bending", "None; all are active"], "The symmetric stretch produces no change in dipole moment."),
  j(C, "physical", "M", 1, "The coordination numbers of Na⁺ and Cl⁻ in the NaCl crystal are:", ["4 and 4", "6 and 6", "8 and 8", "6 and 4"], "NaCl has a rock-salt structure with octahedral coordination for both ions."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "The Williamson ether synthesis works best with:", ["A tertiary alkyl halide", "A primary alkyl halide", "An aryl halide", "A vinyl halide"], "The SN2 attack of alkoxide on a primary halide avoids elimination."),
  j(C, "organic", "M", 0, "The Hell–Volhard–Zelinsky reaction is used for:", ["α-Halogenation of carboxylic acids", "Ring bromination of phenol", "Oxidation of alcohols", "Decarboxylation of acids"], "Br₂/red P brominates the α-carbon via the acyl bromide enol."),
  j(C, "organic", "E", 1, "The alkaline hydrolysis of an ester is known as:", ["Esterification", "Saponification", "Hydrogenation", "Acylation"], "The reaction of fats with NaOH gives soap, hence the name."),
  j(C, "organic", "M", 1, "Aniline treated with NaNO₂/HCl at 0–5 °C gives:", ["Nitrobenzene", "Benzenediazonium chloride", "Phenol only", "Azobenzene"], "Diazotisation of a primary aromatic amine."),
  j(C, "organic", "M", 1, "A mixture contains 75% of the R enantiomer and 25% of the S enantiomer. Its enantiomeric excess is:", ["25%", "50%", "75%", "100%"], "ee = 75 − 25 = 50%."),
  j(C, "organic", "M", 1, "Which of the following is aromatic?", ["Cyclooctatetraene", "Furan", "Cyclobutadiene", "Cycloheptatrienyl anion"], "Furan is planar, cyclic and fully conjugated with six π electrons including the oxygen lone pair."),
  j(C, "organic", "M", 1, "Tollens' reagent is reduced to metallic silver by:", ["Acetone", "Acetaldehyde", "Ethanol", "Diethyl ether"], "Aldehydes are oxidised to carboxylates, giving a silver mirror."),
  j(C, "organic", "M", 0, "Phenol on heating with CHCl₃ and aqueous NaOH (Reimer–Tiemann reaction), followed by acidification, gives mainly:", ["Salicylaldehyde", "Salicylic acid", "Benzoic acid", "Catechol"], "Dichlorocarbene attacks the phenoxide ortho position, giving an o-hydroxybenzaldehyde."),
  j(C, "organic", "H", 1, "The number of geometrical isomers of CH₃CH=CH–CH=CHCH₃ is:", ["2", "3", "4", "6"], "The molecule is symmetric, giving (E,E), (Z,Z) and (E,Z)."),
  j(C, "organic", "M", 1, "A very broad IR absorption between 2500 and 3300 cm⁻¹ is characteristic of:", ["Alcohols only", "Carboxylic acids", "Ketones", "Alkenes"], "It arises from the strongly hydrogen-bonded O–H of the dimeric acid."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 3, "Among the isoelectronic species K⁺, Ca²⁺, Cl⁻ and S²⁻, the largest is:", ["K⁺", "Ca²⁺", "Cl⁻", "S²⁻"], "With the same electron count, the smallest nuclear charge (S²⁻) gives the largest radius."),
  j(C, "inorganic", "M", 3, "The strongest acid among the oxoacids of chlorine is:", ["HClO", "HClO₂", "HClO₃", "HClO₄"], "More oxygen atoms stabilise the conjugate base, so HClO₄ is the strongest."),
  j(C, "inorganic", "H", 1, "The ion ICl₄⁻ has which shape?", ["Tetrahedral", "Square planar", "See-saw", "Square pyramidal"], "Iodine has four bond pairs and two lone pairs, giving a square planar arrangement."),
  j(C, "inorganic", "M", 0, "Ferrocene, Fe(C₅H₅)₂, is:", ["A sandwich compound", "A square planar complex", "An ionic salt", "A tetrahedral complex"], "The Fe²⁺ ion sits between two parallel cyclopentadienyl rings."),
  j(C, "inorganic", "M", 1, "Roasting converts a sulphide ore into:", ["The metal", "The oxide", "The chloride", "The carbonate"], "Heating in air oxidises the sulphide, releasing SO₂."),
  j(C, "inorganic", "M", 1, "The spin-only magnetic moment of Cu²⁺ is about:", ["0", "1.73 BM", "2.83 BM", "3.87 BM"], "Cu²⁺ is d⁹ with one unpaired electron."),
  j(C, "inorganic", "M", 2, "The coordination number of Cs⁺ in the CsCl structure is:", ["4", "6", "8", "12"], "CsCl has a body-centred cubic arrangement with 8:8 coordination."),
  j(C, "inorganic", "M", 0, "The strongest oxidising agent among the halogens is:", ["F₂", "Cl₂", "Br₂", "I₂"], "F₂ has the highest standard reduction potential."),
  j(C, "inorganic", "M", 0, "Which of the following is a metalloid?", ["Si", "Sn", "Pb", "Na"], "Silicon has properties intermediate between metals and non-metals."),
  j(C, "inorganic", "H", 2, "The crystal field stabilisation energy of [Cr(H₂O)₆]³⁺ (units of Δo, ignoring pairing energy) is:", ["−0.4", "−0.8", "−1.2", "−2.4"], "Cr³⁺ is d³ with t₂g³: 3 × (−0.4) = −1.2 Δo."),
];

export const jamChemistryMock8 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "E", 2, "A gas occupies 2 L at 3 atm. At the same temperature, its volume at 1 atm is:", ["2 L", "3 L", "6 L", "9 L"], "Boyle's law: P₁V₁ = P₂V₂, so V₂ = 3 × 2/1 = 6 L."),
  j(C, "physical", "M", 0, "The molar enthalpy of neutralisation of a strong acid by a strong base in dilute solution is about:", ["−57 kJ", "+57 kJ", "−114 kJ", "−28 kJ"], "The net reaction is H⁺ + OH⁻ → H₂O, with ΔH ≈ −57.1 kJ/mol."),
  j(C, "physical", "M", 1, "When the concentration of A is doubled the rate of a reaction becomes four times. The order with respect to A is:", ["First", "Second", "Zero", "Third"], "Rate ∝ [A]ⁿ and 2ⁿ = 4 gives n = 2."),
  j(C, "physical", "M", 3, "Which 0.1 molal aqueous solution has the highest boiling point?", ["Glucose", "NaCl", "CaCl₂", "Al₂(SO₄)₃"], "Assuming complete dissociation, the van 't Hoff factors are 1, 2, 3 and 5."),
  j(C, "physical", "H", 1, "For Zn²⁺ + 2e⁻ → Zn at 298 K and [Zn²⁺] = 0.01 M, the electrode potential is:", ["E° + 0.0592 V", "E° − 0.0592 V", "E° − 0.0296 V", "E°"], "E = E° + (0.0592/2) log 0.01 = E° − 0.0592 V."),
  j(C, "physical", "E", 1, "The Lyman series of the hydrogen spectrum lies in the:", ["Visible region", "Ultraviolet region", "Infrared region", "Microwave region"], "Transitions to n = 1 release large energies."),
  j(C, "physical", "M", 0, "According to the (n + l) rule, the orbital filled immediately after 4s is:", ["3d", "4p", "4d", "5s"], "3d has n + l = 5, the smallest value above 4s (n + l = 4)."),
  j(C, "physical", "M", 0, "For gas molecules, the correct order of speeds is:", ["v_mp < v_avg < v_rms", "v_rms < v_avg < v_mp", "v_avg < v_mp < v_rms", "All are equal"], "The ratios are √2 : √(8/π) : √3."),
  j(C, "physical", "E", 2, "A catalyst changes:", ["The Gibbs energy change of the reaction", "The equilibrium constant", "The activation energy", "The enthalpy of the reaction"], "A catalyst provides an alternative path with lower activation energy but does not alter thermodynamic quantities."),
  j(C, "physical", "H", 2, "For an ideal gas, the Joule–Thomson coefficient is:", ["Positive", "Negative", "Zero", "Infinite"], "Enthalpy depends only on temperature for an ideal gas, so there is no temperature change on throttling."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "E", 1, "Nitrobenzene is reduced to aniline by:", ["NaOH", "Sn/HCl", "KMnO₄", "Br₂"], "Metal–acid reduction converts –NO₂ to –NH₂."),
  j(C, "organic", "M", 0, "The Gabriel phthalimide synthesis is used to prepare:", ["Primary amines", "Secondary amines", "Tertiary amines", "Quaternary ammonium salts"], "Alkylation of potassium phthalimide followed by hydrolysis releases RNH₂."),
  j(C, "organic", "M", 1, "The Michael reaction involves:", ["1,2-Addition to a C=O group", "1,4-Conjugate addition to an α,β-unsaturated carbonyl", "Substitution on an aromatic ring", "Elimination of HX"], "A stabilised enolate attacks the β-carbon of the enone."),
  j(C, "organic", "M", 2, "Which acid readily loses CO₂ on gentle heating?", ["Acetic acid", "Benzoic acid", "3-Oxobutanoic acid", "Formic acid"], "β-Keto acids decarboxylate through a cyclic six-membered transition state."),
  j(C, "organic", "M", 1, "Treating CH₃MgBr with CO₂ followed by H₃O⁺ gives:", ["Ethanol", "Acetic acid", "Acetaldehyde", "Methane only"], "Grignard reagents add to CO₂ to give carboxylates."),
  j(C, "organic", "M", 2, "SN2 reactions are generally fastest in:", ["Water", "Methanol", "DMSO", "Acetic acid"], "Polar aprotic solvents leave the nucleophile unsolvated and reactive."),
  j(C, "organic", "M", 1, "The number of sp²-hybridised carbon atoms in toluene is:", ["5", "6", "7", "1"], "The six ring carbons are sp²; the methyl carbon is sp³."),
  j(C, "organic", "H", 1, "Which of the following alkenes is the most stable?", ["cis-2-Butene", "trans-2-Butene", "1-Butene", "Isobutene"], "The heats of hydrogenation show trans-2-butene is the most stable of these isomers."),
  j(C, "organic", "M", 0, "The Hinsberg reagent used to distinguish primary, secondary and tertiary amines is:", ["Benzenesulfonyl chloride", "Acetyl chloride", "Benzoyl chloride", "Phenyl isocyanate"], "Primary and secondary amines form sulfonamides; tertiary amines do not."),
  j(C, "organic", "M", 2, "A solution containing 0.5 g/mL of a compound in a 1 dm tube rotates plane-polarised light by 2°. The specific rotation is:", ["1°", "2°", "4°", "8°"], "[α] = α/(l c) = 2/(1 × 0.5) = 4°."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 3, "The strongest base among the group 1 hydroxides is:", ["LiOH", "NaOH", "KOH", "CsOH"], "Basic strength rises down the group as the M–O bond becomes more ionic."),
  j(C, "inorganic", "M", 1, "The number of lone pairs on the oxygen atom in H₂O is:", ["1", "2", "3", "4"], "Oxygen has six valence electrons: two form bonds, leaving two lone pairs."),
  j(C, "inorganic", "H", 1, "The number of pentagonal rings in the C₆₀ fullerene is:", ["6", "12", "20", "60"], "C₆₀ has 12 pentagons and 20 hexagons."),
  j(C, "inorganic", "M", 3, "Which noble gas forms the largest number of compounds?", ["He", "Ne", "Ar", "Xe"], "Xenon has the lowest ionisation energy of the stable noble gases, so it is the most reactive."),
  j(C, "inorganic", "M", 0, "The average oxidation state of sulphur in Na₂S₂O₃ is:", ["+2", "+4", "+6", "0"], "2(+1) + 2x + 3(−2) = 0 gives x = +2."),
  j(C, "inorganic", "M", 1, "The ground-state electronic configuration of copper is:", ["[Ar] 3d⁹ 4s²", "[Ar] 3d¹⁰ 4s¹", "[Ar] 3d⁸ 4s²", "[Ar] 3d¹⁰ 4s²"], "A filled d subshell gives extra stability."),
  j(C, "inorganic", "M", 2, "Which of the following ligands can show linkage isomerism?", ["Cl⁻", "NH₃", "NO₂⁻", "H₂O"], "NO₂⁻ can bind through N (nitro) or O (nitrito)."),
  j(C, "inorganic", "M", 1, "The number of geometrical isomers of [Co(NH₃)₄Cl₂]⁺ is:", ["1", "2", "3", "4"], "The two chloride ligands can be cis or trans."),
  j(C, "inorganic", "M", 1, "Barium salts impart which colour to a flame?", ["Crimson", "Apple green", "Golden yellow", "Lilac"], "Barium gives an apple-green flame."),
  j(C, "inorganic", "H", 1, "The molecule XeF₂ is:", ["Bent", "Linear", "T-shaped", "Tetrahedral"], "Xe has two bond pairs and three lone pairs in equatorial positions of a trigonal bipyramid."),
];
