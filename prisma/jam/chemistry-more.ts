// IIT JAM Chemistry (CY) — Mocks 2 to 4: 30 MCQs each, written fresh: physical 10, organic 10, inorganic 10.

import { j } from "./types";

const C = "jam-chemistry";

export const jamChemistryMock2 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 2, "A gas at 1 atm occupies 2 L at 300 K. Keeping the pressure constant, its volume at 600 K is:", ["1 L", "2 L", "4 L", "8 L"], "By Charles's law V ∝ T, so doubling the Kelvin temperature doubles the volume."),
  j(C, "physical", "M", 3, "For a second-order reaction with k = 0.1 L mol⁻¹ s⁻¹ and [A]₀ = 0.5 M, the half-life is:", ["2 s", "5 s", "10 s", "20 s"], "t½ = 1/(k[A]₀) = 1/(0.1 × 0.5) = 20 s."),
  j(C, "physical", "M", 0, "The standard Gibbs energy change for a reaction with K = 10 at 298 K is about:", ["−5.7 kJ/mol", "+5.7 kJ/mol", "−57 kJ/mol", "−2.5 kJ/mol"], "ΔG° = −RT ln K = −8.314 × 298 × 2.303 × 1 J ≈ −5.7 kJ/mol."),
  j(C, "physical", "M", 1, "One mole of A (pure vapour pressure 100 torr) is mixed with one mole of B (300 torr) to form an ideal solution. The total vapour pressure is:", ["150 torr", "200 torr", "250 torr", "400 torr"], "Each mole fraction is 0.5, so P = 0.5 × 100 + 0.5 × 300 = 200 torr."),
  j(C, "physical", "M", 1, "Given E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V, the standard emf of the Daniell cell is:", ["0.42 V", "1.10 V", "−1.10 V", "0.76 V"], "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V."),
  j(C, "physical", "M", 1, "If the speed of a particle is doubled, its de Broglie wavelength:", ["Doubles", "Is halved", "Is unchanged", "Becomes four times"], "λ = h/(mv), so λ is inversely proportional to the speed."),
  j(C, "physical", "M", 2, "What is the energy of the second Bohr level (n = 2) of hydrogen?", ["−13.6 eV", "−6.8 eV", "−3.4 eV", "−1.51 eV"], "Eₙ = −13.6/n² eV, which for n = 2 is −3.4 eV."),
  j(C, "physical", "M", 1, "The pH of a buffer containing 0.1 M acetic acid (pKa = 4.76) and 0.1 M sodium acetate is:", ["2.38", "4.76", "7.00", "9.52"], "With equal concentrations, pH = pKa + log 1 = 4.76."),
  j(C, "physical", "M", 1, "The number of atoms that belong to one face-centred cubic unit cell is:", ["2", "4", "6", "8"], "8 corners × 1/8 + 6 faces × 1/2 = 4."),
  j(C, "physical", "H", 1, "The magnitude of the work done by one mole of an ideal gas expanding reversibly and isothermally at T from volume V to 2V is:", ["RT", "RT ln 2", "2RT", "R ln 2"], "w = RT ln(V₂/V₁) = RT ln 2."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "E", 1, "Ethanol heated with excess concentrated H₂SO₄ at 443 K mainly gives:", ["Diethyl ether", "Ethene", "Ethanal", "Ethyl acetate"], "At 443 K dehydration to the alkene dominates; ether formation occurs near 413 K with excess alcohol."),
  j(C, "organic", "M", 1, "Nitration of toluene with HNO₃/H₂SO₄ mainly gives:", ["meta-Nitrotoluene", "ortho- and para-Nitrotoluene", "2,4,6-Trinitrotoluene only", "Benzoic acid"], "The methyl group is an activating, ortho/para-directing substituent."),
  j(C, "organic", "M", 2, "Which of the following acids is the strongest?", ["CH₃COOH", "ClCH₂COOH", "Cl₂CHCOOH", "FCH₂COOH"], "Two chlorine atoms on the α-carbon withdraw electrons more than one; Cl₂CHCOOH has pKa ≈ 1.3 against ≈ 2.6 for FCH₂COOH."),
  j(C, "organic", "M", 1, "Acetaldehyde treated with dilute NaOH gives, by aldol addition:", ["Ethyl acetate", "3-Hydroxybutanal", "Butanal", "Acetic acid"], "The enolate of one molecule adds to the carbonyl of another, forming CH₃CH(OH)CH₂CHO."),
  j(C, "organic", "M", 1, "Propanamide on Hofmann bromamide degradation gives:", ["Propylamine", "Ethylamine", "Methylamine", "Butylamine"], "The reaction removes the carbonyl carbon, so the amine has one carbon fewer than the amide."),
  j(C, "organic", "M", 1, "The number of chiral centres in open-chain glucose is:", ["3", "4", "5", "6"], "Carbons 2, 3, 4 and 5 of the aldohexose each carry four different groups."),
  j(C, "organic", "E", 1, "The IUPAC name of CH₃CH(OH)CH₂CH₃ is:", ["Butan-1-ol", "Butan-2-ol", "2-Methylpropan-1-ol", "Butanal"], "The hydroxyl group is on carbon 2 of a four-carbon chain."),
  j(C, "organic", "M", 1, "The Diels–Alder reaction is best described as a:", ["[2+2] photochemical cycloaddition", "Thermal [4+2] cycloaddition", "Nucleophilic substitution", "Free-radical addition"], "A conjugated diene (4π) and a dienophile (2π) combine in a concerted thermal cycloaddition."),
  j(C, "organic", "H", 2, "Which compound has the highest enol content at equilibrium?", ["Acetone", "Ethyl acetate", "Pentane-2,4-dione", "Cyclohexanone"], "The enol of a 1,3-diketone is stabilised by conjugation and an intramolecular hydrogen bond."),
  j(C, "organic", "H", 1, "The number of signals in the ¹H NMR spectrum of 2-methylpropane is:", ["1", "2", "3", "4"], "The nine methyl hydrogens are equivalent, and the single methine hydrogen gives the second signal."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "E", 1, "Which of the following elements has the highest electronegativity?", ["Cl", "F", "O", "N"], "Fluorine is the most electronegative element."),
  j(C, "inorganic", "M", 1, "Sulphur hexafluoride has a central sulphur atom with hybridisation:", ["sp³d", "sp³d²", "sp³", "sp²"], "Six bond pairs and no lone pair on S correspond to sp³d² and an octahedral shape."),
  j(C, "inorganic", "M", 1, "The number of unpaired electrons in high-spin Co²⁺ is:", ["1", "3", "5", "7"], "Co²⁺ is d⁷; in the high-spin arrangement t₂g⁵e_g² has three unpaired electrons."),
  j(C, "inorganic", "M", 1, "Which of the following molecules is paramagnetic?", ["N₂", "O₂", "F₂", "H₂"], "The MO diagram of O₂ has two unpaired electrons in the π* orbitals."),
  j(C, "inorganic", "M", 1, "The shape of the XeO₃ molecule is:", ["Trigonal planar", "Trigonal pyramidal", "Tetrahedral", "T-shaped"], "Xe has three bond pairs and one lone pair, giving a pyramidal arrangement."),
  j(C, "inorganic", "E", 1, "Which of the following oxides is amphoteric?", ["Na₂O", "Al₂O₃", "CO₂", "MgO"], "Al₂O₃ reacts with both acids and strong bases."),
  j(C, "inorganic", "M", 2, "The coordination number of cobalt in [Co(en)₃]³⁺ is:", ["3", "4", "6", "9"], "Ethylenediamine is bidentate, so three of them occupy six coordination sites."),
  j(C, "inorganic", "M", 1, "The spin-only magnetic moment of Ti³⁺ is about:", ["0", "1.73 BM", "2.83 BM", "3.87 BM"], "Ti³⁺ is d¹ with one unpaired electron: √(1 × 3) = 1.73 BM."),
  j(C, "inorganic", "H", 2, "Among the alkali metals, the most negative standard reduction potential (E° M⁺/M) belongs to:", ["Na", "K", "Li", "Cs"], "The very high hydration enthalpy of the small Li⁺ ion makes lithium the strongest reductant in water."),
  j(C, "inorganic", "H", 1, "The number of three-centre two-electron bonds in diborane, B₂H₆, is:", ["0", "2", "4", "6"], "The two bridging B–H–B bonds are three-centre two-electron bonds."),
];

export const jamChemistryMock3 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 2, "The average translational kinetic energy of one mole of an ideal gas at temperature T is:", ["RT/2", "RT", "3RT/2", "3RT"], "Each of the three translational degrees of freedom contributes RT/2 per mole."),
  j(C, "physical", "E", 0, "The standard enthalpy of formation of graphite at 298 K is:", ["0", "+1.9 kJ/mol", "−393.5 kJ/mol", "+715 kJ/mol"], "By definition, an element in its standard reference state has zero enthalpy of formation."),
  j(C, "physical", "H", 1, "A reaction rate doubles when the temperature is raised from 300 K to 310 K. The activation energy is about:", ["26 kJ/mol", "53 kJ/mol", "106 kJ/mol", "5.3 kJ/mol"], "ln 2 = (Ea/R)(1/300 − 1/310), so Ea = 0.693 × 8.314/(1.075 × 10⁻⁴) ≈ 5.4 × 10⁴ J/mol."),
  j(C, "physical", "M", 0, "The freezing-point depression of a 0.5 molal aqueous glucose solution (Kf = 1.86 K kg/mol) is:", ["0.93 K", "1.86 K", "3.72 K", "0.465 K"], "ΔTf = Kf m = 1.86 × 0.5 = 0.93 K, since glucose does not dissociate."),
  j(C, "physical", "M", 1, "The charge needed to deposit one mole of copper from Cu²⁺ solution is:", ["96 500 C", "193 000 C", "289 500 C", "48 250 C"], "Two moles of electrons are needed per mole of Cu: 2 × 96 500 C."),
  j(C, "physical", "M", 1, "For a particle in a one-dimensional box, E₂/E₁ equals:", ["2", "4", "8", "16"], "Eₙ ∝ n², so E₂/E₁ = 4."),
  j(C, "physical", "M", 2, "The number of angular nodes in a 3d orbital is:", ["0", "1", "2", "3"], "The number of angular nodes equals l, which is 2 for d orbitals."),
  j(C, "physical", "M", 1, "For N₂O₄(g) ⇌ 2NO₂(g), increasing the total pressure at constant temperature shifts the equilibrium:", ["To the right", "To the left", "Not at all", "In a direction that cannot be predicted"], "The system opposes the rise in pressure by moving to the side with fewer moles of gas, the left."),
  j(C, "physical", "H", 1, "X-rays of wavelength 1.54 Å are diffracted by planes with d = 1.54 Å. The first-order Bragg angle θ is:", ["15°", "30°", "45°", "60°"], "nλ = 2d sin θ gives sin θ = 1.54/(2 × 1.54) = 0.5."),
  j(C, "physical", "M", 1, "Which statement about physisorption is correct?", ["It involves the formation of chemical bonds", "It is usually multilayer and decreases as temperature rises", "It is irreversible", "It has an enthalpy of about −400 kJ/mol"], "Physisorption is due to weak van der Waals forces, so it is reversible and falls with temperature."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "Addition of bromine to cyclohexene gives mainly:", ["cis-1,2-Dibromocyclohexane", "trans-1,2-Dibromocyclohexane", "1,1-Dibromocyclohexane", "3-Bromocyclohexene"], "The cyclic bromonium ion is opened by bromide from the opposite face, giving anti addition."),
  j(C, "organic", "E", 0, "The catalyst usually used for the Friedel–Crafts alkylation of benzene is:", ["AlCl₃", "NaOH", "Pd/C", "Dilute H₂SO₄"], "Anhydrous AlCl₃ is the Lewis acid that generates the carbocation electrophile."),
  j(C, "organic", "H", 2, "In aqueous solution, which amine is the most basic?", ["Aniline", "Ammonia", "Diethylamine", "Triphenylamine"], "Alkyl groups raise the basicity relative to ammonia; the aryl amines are much weaker."),
  j(C, "organic", "M", 0, "The Wittig reaction converts an aldehyde or ketone into:", ["An alkene", "An alcohol", "An ether", "An alkyne"], "A phosphorus ylide replaces the C=O oxygen with a C=C."),
  j(C, "organic", "M", 0, "The number of signals in the ¹³C NMR spectrum of benzene is:", ["1", "2", "3", "6"], "All six carbons are equivalent by symmetry."),
  j(C, "organic", "M", 0, "The rate of an SN1 reaction depends on the concentration of:", ["The substrate only", "The nucleophile only", "Both the substrate and the nucleophile", "Neither"], "The slow step is ionisation of the substrate, so the rate law is first order in substrate."),
  j(C, "organic", "M", 1, "Reductive ozonolysis of 2-butene gives:", ["One molecule of butanal", "Two molecules of ethanal", "Butanoic acid", "Propanal and methanal"], "Cleavage of CH₃CH=CHCH₃ gives two CH₃CHO molecules."),
  j(C, "organic", "E", 0, "Heating acetic acid with ethanol in the presence of a trace of H₂SO₄ gives mainly:", ["Ethyl acetate", "Diethyl ether", "Acetaldehyde", "Acetone"], "This is Fischer esterification."),
  j(C, "organic", "M", 1, "A meso compound is optically inactive because:", ["It has no stereocentres", "It has an internal plane of symmetry", "It is a racemic mixture", "It is planar"], "The two halves of the molecule rotate plane-polarised light equally and oppositely."),
  j(C, "organic", "M", 1, "Zn(Hg) with concentrated HCl (Clemmensen reduction) converts a ketone C=O group into:", ["CH–OH", "CH₂", "C=C", "COOH"], "The carbonyl is reduced completely to a methylene group."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 1, "Which ion has the largest number of unpaired electrons in its high-spin state?", ["Fe²⁺", "Mn²⁺", "Co²⁺", "Ni²⁺"], "Mn²⁺ is d⁵ with five unpaired electrons; Fe²⁺, Co²⁺ and Ni²⁺ have 4, 3 and 2."),
  j(C, "inorganic", "M", 2, "Among the isoelectronic ions Na⁺, Mg²⁺, Al³⁺ and F⁻, the smallest is:", ["Na⁺", "Mg²⁺", "Al³⁺", "F⁻"], "With the same number of electrons, the higher nuclear charge of Al³⁺ pulls them in most."),
  j(C, "inorganic", "E", 1, "The H–O–H bond angle in water is about:", ["90°", "104.5°", "109.5°", "120°"], "Two lone pairs compress the tetrahedral angle to about 104.5°."),
  j(C, "inorganic", "H", 1, "According to the HSAB principle, the soft Ag⁺ ion prefers to bind:", ["F⁻", "I⁻", "OH⁻", "O²⁻"], "Soft acids pair with soft bases, and iodide is the most polarisable halide."),
  j(C, "inorganic", "M", 1, "Froth flotation is mainly used to concentrate:", ["Oxide ores of iron", "Sulphide ores", "Bauxite", "Haematite"], "Sulphide minerals are wetted by oil and carried up in the froth, while the gangue sinks."),
  j(C, "inorganic", "M", 2, "The most abundant noble gas in the Earth's atmosphere is:", ["He", "Ne", "Ar", "Kr"], "Argon makes up about 0.93% of air, mostly from the decay of ⁴⁰K."),
  j(C, "inorganic", "M", 3, "Which of the following is the strongest-field ligand?", ["I⁻", "H₂O", "NH₃", "CO"], "CO is a strong σ-donor and π-acceptor and lies at the top of the spectrochemical series."),
  j(C, "inorganic", "M", 1, "The oxidation state of manganese in K₂MnO₄ is:", ["+4", "+6", "+7", "+5"], "2(+1) + x + 4(−2) = 0 gives x = +6."),
  j(C, "inorganic", "M", 1, "Which of the following is isoelectronic with CO?", ["O₂", "N₂", "NO", "Cl₂"], "Both CO and N₂ have 14 electrons."),
  j(C, "inorganic", "M", 1, "In its reactions with Lewis bases, boron trifluoride acts as:", ["A Brønsted base", "A Lewis acid", "A Lewis base", "A reducing agent only"], "Boron in BF₃ has an empty p orbital and accepts an electron pair."),
];

export const jamChemistryMock4 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "M", 0, "If the absolute temperature of an ideal gas is quadrupled, its root-mean-square speed:", ["Doubles", "Is halved", "Quadruples", "Is unchanged"], "v_rms = √(3RT/M) ∝ √T."),
  j(C, "physical", "M", 1, "In the van der Waals equation, the constant 'a' is a measure of:", ["The volume of the molecules", "The attraction between molecules", "The speed of molecules", "The temperature"], "The term a/V² corrects the pressure for intermolecular attraction."),
  j(C, "physical", "M", 1, "The molar enthalpy of fusion of ice is 6010 J/mol at 273 K. The entropy of fusion is about:", ["6.0 J/(mol K)", "22.0 J/(mol K)", "273 J/(mol K)", "0.022 J/(mol K)"], "ΔS = ΔH/T = 6010/273 ≈ 22.0 J/(mol K)."),
  j(C, "physical", "M", 2, "For a zero-order reaction, a straight line is obtained by plotting:", ["ln[A] against t", "1/[A] against t", "[A] against t", "[A]² against t"], "[A] = [A]₀ − kt."),
  j(C, "physical", "M", 1, "The solubility of AgCl (Ksp = 1.8 × 10⁻¹⁰) in pure water is about:", ["1.8 × 10⁻¹⁰ M", "1.3 × 10⁻⁵ M", "9.0 × 10⁻¹¹ M", "1.8 × 10⁻⁵ M"], "s = √Ksp = √(1.8 × 10⁻¹⁰) ≈ 1.3 × 10⁻⁵ M."),
  j(C, "physical", "H", 1, "The standard emf (E°cell) of a concentration cell is:", ["Positive", "Zero", "Negative", "Equal to the electrode potential"], "Both electrodes are identical, so E° is zero; the emf arises only from the concentration difference."),
  j(C, "physical", "M", 1, "In the photoelectric effect, when the photon energy exactly equals the work function, the kinetic energy of the emitted electron is:", ["Maximum", "Zero", "Equal to hν", "Negative"], "KE = hν − φ = 0 at the threshold frequency."),
  j(C, "physical", "M", 2, "Which of these molecules shows a pure rotational (microwave) spectrum?", ["N₂", "O₂", "HCl", "CO₂"], "A permanent dipole moment is needed, and only HCl has one."),
  j(C, "physical", "H", 0, "At the triple point of water, the number of degrees of freedom is:", ["0", "1", "2", "3"], "F = C − P + 2 = 1 − 3 + 2 = 0."),
  j(C, "physical", "M", 1, "The osmotic pressure of a 0.1 M non-electrolyte solution at 300 K is about (R = 0.0821 L atm K⁻¹ mol⁻¹):", ["0.25 atm", "2.46 atm", "24.6 atm", "0.82 atm"], "π = CRT = 0.1 × 0.0821 × 300 ≈ 2.46 atm."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 1, "Propene reacts with HBr in the presence of peroxide to give mainly:", ["2-Bromopropane", "1-Bromopropane", "Propane", "Allyl bromide"], "The radical mechanism gives anti-Markovnikov addition of Br to the terminal carbon."),
  j(C, "organic", "E", 1, "Benzene reacts with acetyl chloride in the presence of AlCl₃ to give:", ["Toluene", "Acetophenone", "Benzaldehyde", "Phenol"], "This is Friedel–Crafts acylation."),
  j(C, "organic", "M", 1, "Hydroboration–oxidation of 1-butene gives mainly:", ["Butan-2-ol", "Butan-1-ol", "Butanal", "Butanone"], "Boron adds to the less hindered terminal carbon and is replaced by OH with anti-Markovnikov orientation."),
  j(C, "organic", "E", 1, "Which of the following is a reducing sugar?", ["Sucrose", "Glucose", "Starch", "Cellulose"], "Glucose has a free hemiacetal (aldehyde) group; in sucrose both anomeric carbons are tied up in the glycosidic bond."),
  j(C, "organic", "M", 1, "In the solid state and in water near its isoelectric point, glycine exists mainly as a:", ["Cation", "Zwitterion", "Anion", "Non-polar neutral molecule"], "The NH₂ group is protonated and the COOH is deprotonated: ⁺H₃N–CH₂–COO⁻."),
  j(C, "organic", "M", 1, "A ketoxime on treatment with PCl₅ or H₂SO₄ (Beckmann rearrangement) gives:", ["An amine", "An amide", "A nitrile only", "An alcohol"], "The group anti to the OH migrates to nitrogen, giving a substituted amide."),
  j(C, "organic", "M", 0, "Baeyer–Villiger oxidation of a ketone with a peracid gives:", ["An ester", "An alcohol", "A carboxylic acid", "An alkane"], "An oxygen atom is inserted next to the carbonyl carbon."),
  j(C, "organic", "M", 2, "Which compound is the most reactive towards electrophilic aromatic substitution?", ["Benzene", "Nitrobenzene", "Anisole", "Benzoic acid"], "The methoxy group donates electrons by resonance and activates the ring; the other substituents do not."),
  j(C, "organic", "M", 1, "E2 elimination of 2-bromobutane with alcoholic KOH gives mainly:", ["1-Butene", "2-Butene", "Butan-2-ol", "Butane"], "Zaitsev's rule favours the more substituted, more stable alkene."),
  j(C, "organic", "H", 1, "Which of the following is anti-aromatic?", ["Benzene", "Cyclobutadiene", "Pyridine", "Cyclopentadienyl anion"], "Cyclobutadiene is planar and cyclic with 4π electrons, which is 4n."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "E", 0, "The hybridisation of carbon in CO₂ is:", ["sp", "sp²", "sp³", "sp³d"], "Two σ bonds and no lone pair give a linear sp carbon."),
  j(C, "inorganic", "M", 1, "The hybridisation of phosphorus in PCl₅ is:", ["sp³", "sp³d", "sp³d²", "sp²"], "Five bond pairs give a trigonal bipyramidal sp³d arrangement."),
  j(C, "inorganic", "M", 3, "Which of the following oxides is the most acidic?", ["Na₂O", "MgO", "Al₂O₃", "SO₃"], "Acidity of oxides rises across a period, and SO₃ gives sulphuric acid with water."),
  j(C, "inorganic", "M", 0, "The ground-state electronic configuration of Cr³⁺ is:", ["[Ar] 3d³", "[Ar] 3d⁴", "[Ar] 3d² 4s¹", "[Ar] 3d⁶"], "Cr is [Ar] 3d⁵ 4s¹, and it loses the 4s electron and two 3d electrons."),
  j(C, "inorganic", "H", 1, "[Co(NH₃)₅Cl]Cl₂ dissolves in water to give how many ions per formula unit?", ["2", "3", "4", "6"], "One complex cation and two free chloride ions: 3."),
  j(C, "inorganic", "M", 1, "Because of the inert pair effect, the more stable oxidation state of lead is:", ["+4", "+2", "+6", "0"], "The 6s² pair is reluctant to take part in bonding, so Pb(II) is more stable than Pb(IV)."),
  j(C, "inorganic", "E", 2, "Which of the following has the highest boiling point?", ["HCl", "HBr", "HF", "HI"], "Hydrogen bonding in HF outweighs the larger dispersion forces of the heavier halides."),
  j(C, "inorganic", "M", 3, "Δo is largest for which of the following complexes?", ["[CoF₆]³⁻", "[Co(H₂O)₆]³⁺", "[Co(NH₃)₆]³⁺", "[Co(CN)₆]³⁻"], "CN⁻ is the strongest-field ligand among these."),
  j(C, "inorganic", "M", 2, "Which of the following ions is colourless in aqueous solution?", ["Cu²⁺", "Ni²⁺", "Zn²⁺", "Fe³⁺"], "Zn²⁺ is d¹⁰, so there are no d–d transitions."),
  j(C, "inorganic", "H", 2, "The number of lone pairs on the central chlorine atom of ClF₃ is:", ["0", "1", "2", "3"], "Chlorine has seven valence electrons: three go to bonds, leaving two lone pairs (T-shaped molecule)."),
];
