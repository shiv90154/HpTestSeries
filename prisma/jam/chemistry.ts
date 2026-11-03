// IIT JAM Chemistry (CY) — Free Mock 1: 30 MCQs written fresh: physical 10, organic 10, inorganic 10.

import { j } from "./types";

const C = "jam-chemistry";

export const jamChemistryMock1 = [
  // ───────── Physical chemistry ─────────
  j(C, "physical", "E", 1, "The pH of a 0.01 M solution of the strong acid HCl at 25 °C is:", ["1", "2", "12", "0.01"], "[H⁺] = 10⁻² M, so pH = 2."),
  j(C, "physical", "M", 2, "A first-order reaction has a rate constant of 0.0693 min⁻¹. Its half-life is:", ["1 min", "6.93 min", "10 min", "100 min"], "t½ = 0.693/k = 0.693/0.0693 = 10 min.", "0.693 / 0.0693"),
  j(C, "physical", "H", 2, "For a reaction ΔH = +40 kJ/mol and ΔS = +100 J/(mol K), both independent of temperature. The reaction becomes spontaneous above:", ["298 K", "350 K", "400 K", "4000 K"], "ΔG = ΔH − TΔS < 0 when T > ΔH/ΔS = 40000/100 = 400 K.", "40000 / 100"),
  j(C, "physical", "M", 1, "Under identical conditions the ratio of the effusion rate of H₂ to that of O₂ is:", ["2", "4", "8", "16"], "Graham's law: rate ∝ 1/√M, so the ratio is √(32/2) = 4.", "Math.sqrt(32 / 2)"),
  j(C, "physical", "H", 1, "At 298 K the electrode potential of Cu²⁺/Cu (n = 2) with [Cu²⁺] = 0.01 M is:", ["E° + 0.0591 V", "E° − 0.0591 V", "E° − 0.0296 V", "E° + 0.0296 V"], "E = E° + (0.0591/2) log[Cu²⁺] = E° + 0.02955 × (−2) = E° − 0.0591 V."),
  j(C, "physical", "H", 1, "Kb of water is 0.52 K kg/mol. Treating NaCl as fully dissociated, the boiling-point elevation of a 0.5 molal aqueous NaCl solution is:", ["0.26 K", "0.52 K", "1.04 K", "0.13 K"], "ΔTb = i·Kb·m = 2 × 0.52 × 0.5 = 0.52 K.", "2 * 0.52 * 0.5"),
  j(C, "physical", "M", 1, "A solution has an absorbance of 1.0 in a 1 cm cell. Its percentage transmittance is:", ["1%", "10%", "50%", "90%"], "A = −log T, so T = 10⁻¹ = 0.1, which is 10%."),
  j(C, "physical", "M", 1, "The number of radial nodes in a 3p orbital is:", ["0", "1", "2", "3"], "Radial nodes = n − l − 1 = 3 − 1 − 1 = 1."),
  j(C, "physical", "M", 1, "The packing efficiency of a body-centred cubic lattice is approximately:", ["52%", "68%", "74%", "90%"], "In bcc, 2 atoms fill (√3π/8) of the cell, about 0.68."),
  j(C, "physical", "H", 1, "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the ratio K_p/K_c is:", ["(RT)²", "(RT)⁻²", "RT", "(RT)⁻¹"], "K_p = K_c (RT)^Δn with Δn = 2 − 4 = −2."),
  // ───────── Organic chemistry ─────────
  j(C, "organic", "M", 3, "Among the following carbocations, which one is the most stable in solution?", ["CH₃⁺", "CH₃CH₂⁺", "(CH₃)₂CH⁺", "(CH₃)₃C⁺"], "Stability rises with hyperconjugation and the inductive effect of alkyl groups, so tertiary > secondary > primary > methyl."),
  j(C, "organic", "M", 1, "Propene reacts with HBr in the absence of peroxide to give mainly:", ["1-Bromopropane", "2-Bromopropane", "Propane", "1,2-Dibromopropane"], "Markovnikov addition places H on the carbon with more hydrogens and Br on the carbon that gives the more stable secondary carbocation."),
  j(C, "organic", "H", 1, "Which species is aromatic according to Hückel's rule?", ["Cyclopentadienyl cation", "Cyclopentadienyl anion", "Cyclooctatetraene", "Cyclobutadiene"], "The cyclopentadienyl anion is planar, fully conjugated and has 6 π electrons (4n + 2 with n = 1)."),
  j(C, "organic", "H", 1, "The total number of stereoisomers of 2,3-dibromobutane is:", ["2", "3", "4", "6"], "There are two stereocentres, but the molecule is symmetric: one enantiomeric pair plus one meso form gives 3."),
  j(C, "organic", "M", 1, "Which reagent reduces a ketone to a secondary alcohol without reducing a nitro group or an ester under mild conditions?", ["LiAlH₄", "NaBH₄", "Zn(Hg)/HCl", "H₂O₂"], "NaBH₄ is a mild hydride donor that reduces aldehydes and ketones; LiAlH₄ also reduces esters and nitro compounds, and Zn(Hg)/HCl removes the carbonyl oxygen entirely."),
  j(C, "organic", "M", 3, "Which alkyl bromide reacts fastest by the SN2 mechanism?", ["tert-Butyl bromide", "Isopropyl bromide", "Ethyl bromide", "Methyl bromide"], "SN2 is hindered by alkyl substituents at the reacting carbon, so methyl > primary > secondary > tertiary."),
  j(C, "organic", "M", 2, "Which compound is the most acidic?", ["Phenol", "p-Cresol", "p-Nitrophenol", "p-Methoxyphenol"], "The –NO₂ group withdraws electrons by resonance and induction and stabilises the phenoxide ion most."),
  j(C, "organic", "M", 1, "Which compound undergoes the Cannizzaro reaction with concentrated NaOH?", ["Acetaldehyde", "Benzaldehyde", "Acetone", "Propanal"], "Cannizzaro needs an aldehyde with no α-hydrogen; benzaldehyde has none."),
  j(C, "organic", "M", 0, "A strong, sharp C=O stretching band of a simple ketone appears in the infrared near:", ["1700 cm⁻¹", "2200 cm⁻¹", "3300 cm⁻¹", "1000 cm⁻¹"], "Saturated ketones absorb at about 1715 cm⁻¹; nitriles near 2200 cm⁻¹ and O–H/N–H stretches above 3200 cm⁻¹."),
  j(C, "organic", "E", 2, "Which of the following alcohols is chiral?", ["Ethanol", "2-Propanol", "2-Butanol", "Methanol"], "Only 2-butanol has a carbon bearing four different groups (H, OH, CH₃, C₂H₅)."),
  // ───────── Inorganic chemistry ─────────
  j(C, "inorganic", "M", 2, "The number of unpaired electrons in the high-spin Fe³⁺ ion is:", ["3", "4", "5", "6"], "Fe³⁺ is d⁵; in a high-spin arrangement each d orbital holds one electron, giving 5 unpaired electrons."),
  j(C, "inorganic", "H", 0, "The crystal field stabilisation energy of a low-spin d⁶ octahedral complex, ignoring pairing energy, is:", ["−2.4 Δo", "−0.4 Δo", "−1.2 Δo", "0"], "t₂g⁶ e_g⁰ gives 6 × (−0.4 Δo) = −2.4 Δo."),
  j(C, "inorganic", "M", 1, "The molecular geometry of xenon tetrafluoride, XeF₄, is:", ["Tetrahedral", "Square planar", "See-saw", "Octahedral"], "Xe has 4 bond pairs and 2 lone pairs (octahedral electron geometry); the lone pairs sit opposite each other, leaving a square planar molecule."),
  j(C, "inorganic", "M", 2, "Which of these elements has the highest first ionisation energy?", ["Be", "B", "N", "O"], "N has a half-filled stable 2p³ configuration and a higher nuclear charge than Be or B; it exceeds O because of the p⁴ pairing repulsion in O."),
  j(C, "inorganic", "H", 2, "The bond order of the O₂⁺ ion is:", ["1.5", "2", "2.5", "3"], "O₂ has 12 valence electrons giving bond order 2; removing an electron from an antibonding π* orbital gives (8 − 3)/2 = 2.5."),
  j(C, "inorganic", "M", 0, "The lanthanide contraction is mainly responsible for the nearly identical atomic radii of:", ["Zr and Hf", "Sc and Y", "Na and K", "Fe and Co"], "Poor shielding by the 4f electrons shrinks the 5d series so that Hf (5d) has almost the same radius as Zr (4d)."),
  j(C, "inorganic", "M", 1, "The red colour of ruby is due to traces of which ion in Al₂O₃?", ["Fe²⁺", "Cr³⁺", "Co²⁺", "Mn²⁺"], "Cr³⁺ replaces Al³⁺ in the corundum lattice and its d–d transitions give the red colour."),
  j(C, "inorganic", "H", 1, "The geometry and magnetic behaviour of [Ni(CN)₄]²⁻ are:", ["Tetrahedral, paramagnetic", "Square planar, diamagnetic", "Square planar, paramagnetic", "Tetrahedral, diamagnetic"], "CN⁻ is a strong-field ligand that pairs the d⁸ electrons of Ni²⁺, giving dsp² square planar geometry with no unpaired electrons."),
  j(C, "inorganic", "M", 0, "Among the alkali metal ions, the highest hydration enthalpy belongs to:", ["Li⁺", "Na⁺", "K⁺", "Cs⁺"], "Li⁺ has the smallest ionic radius and so the highest charge density and hydration enthalpy."),
  j(C, "inorganic", "E", 2, "The oxidation state of chromium in K₂Cr₂O₇ is:", ["+3", "+4", "+6", "+7"], "2(+1) + 2x + 7(−2) = 0 gives x = +6."),
];
