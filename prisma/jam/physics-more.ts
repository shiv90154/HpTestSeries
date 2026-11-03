// IIT JAM Physics (PH) — Mocks 2 to 4: 30 MCQs each, written fresh. Mock 2 is exam level, mock 3 is a little easier on
// numericals, mock 4 is slightly above exam level (derivations, standard results, conceptual traps).

import { j } from "./types";

const P = "jam-physics";

export const jamPhysicsMock2 = [
  // ───────── Mathematical methods ─────────
  j(P, "math-methods", "M", 1, "The Laplace transform of e^(−3t) is:", ["1/(s − 3)", "1/(s + 3)", "3/(s + 3)", "s/(s + 3)"], "L{e^(−at)} = 1/(s + a), here with a = 3."),
  j(P, "math-methods", "E", 2, "The unit vector normal to the sphere x² + y² + z² = 9 at the point (0, 0, 3) is:", ["î", "ĵ", "k̂", "−k̂"], "The normal is along ∇f = (2x, 2y, 2z) = (0, 0, 6), which points along +k̂."),
  j(P, "math-methods", "H", 0, "The solution of y″ + 4y = 0 with y(0) = 0 and y′(0) = 2 is:", ["sin 2x", "2 sin x", "cos 2x", "2 sin 2x"], "y = A cos 2x + B sin 2x; y(0) = 0 gives A = 0 and y′(0) = 2B = 2 gives B = 1."),
  j(P, "math-methods", "M", 3, "The value of the contour integral of dz/z around the circle |z| = 2 traversed once anticlockwise is:", ["0", "πi", "4πi", "2πi"], "The pole at z = 0 lies inside the contour with residue 1, so the integral is 2πi."),
  j(P, "math-methods", "M", 1, "The dot product of the vectors A = (1, 2, 3) and B = (2, −1, 1) is:", ["0", "3", "5", "7"], "A·B = 1·2 + 2·(−1) + 3·1 = 2 − 2 + 3 = 3.", "2 - 2 + 3"),
  // ───────── Mechanics ─────────
  j(P, "mechanics", "M", 2, "A projectile is launched at 45° with a speed of 20 m/s (g = 10 m/s², no air resistance). Its horizontal range is:", ["10 m", "20 m", "40 m", "80 m"], "R = v² sin 2θ / g = 400 × 1 / 10 = 40 m.", "400 / 10"),
  j(P, "mechanics", "H", 1, "A planet orbits at four times the orbital radius of another planet around the same star. Its orbital period is larger by a factor of:", ["4", "8", "16", "2"], "Kepler's third law gives T ∝ r^(3/2), so the factor is 4^(3/2) = 8."),
  j(P, "mechanics", "H", 3, "A car takes a frictionless banked curve of radius 10 m at 10 m/s (g = 10 m/s²). The banking angle is:", ["15°", "30°", "60°", "45°"], "tan θ = v²/(rg) = 100/100 = 1, so θ = 45°."),
  j(P, "mechanics", "H", 0, "Two particles of masses m and 2m interact only with each other. The reduced mass of the pair is:", ["2m/3", "m/3", "3m/2", "m"], "μ = m₁m₂/(m₁ + m₂) = 2m²/3m = 2m/3."),
  j(P, "mechanics", "M", 2, "A ball of mass m moving at speed v makes a head-on elastic collision with an identical ball at rest. Immediately afterwards the first ball:", ["Moves back at speed v", "Continues at speed v/2", "Is at rest", "Moves at speed v/√2"], "For equal masses in a head-on elastic collision the velocities are exchanged."),
  // ───────── Electricity and magnetism ─────────
  j(P, "electromagnetism", "M", 1, "The energy stored in a 10 μF capacitor charged to 100 V is:", ["0.5 J", "0.05 J", "5 J", "0.005 J"], "U = ½ C V² = 0.5 × 10 × 10⁻⁶ × 10⁴ = 0.05 J.", "0.5 * 10e-6 * 100 ** 2"),
  j(P, "electromagnetism", "H", 2, "A circular coil of radius R carries a steady current I. The field strength at its centre is:", ["μ₀I/(4πR)", "μ₀I/R", "μ₀I/(2R)", "2μ₀I/R"], "By the Biot–Savart law, B = μ₀I/(2R) at the centre."),
  j(P, "electromagnetism", "E", 0, "The negative sign in Faraday's law of induction (Lenz's law) reflects the conservation of:", ["Energy", "Charge", "Linear momentum", "Mass"], "The induced current opposes the change in flux; otherwise energy would be created from nothing."),
  j(P, "electromagnetism", "M", 3, "The magnitude of the Poynting vector represents:", ["Energy density of the field", "Charge flowing per second", "Momentum density of the field", "Energy flux per unit area"], "S = E × H gives the rate of energy flow per unit area, in W/m²."),
  // ───────── Thermal and statistical physics ─────────
  j(P, "thermal-statistical", "M", 1, "If the absolute temperature of an ideal gas is raised to four times its value, the rms speed of its molecules:", ["Remains unchanged", "Doubles", "Becomes four times", "Increases by a factor of √2"], "v_rms ∝ √T, so quadrupling T doubles v_rms."),
  j(P, "thermal-statistical", "H", 2, "A heat engine absorbs 500 J from the hot reservoir and rejects 300 J to the cold reservoir in each cycle. Its efficiency is:", ["20%", "30%", "40%", "60%"], "η = W/Q_h = (500 − 300)/500 = 0.4, that is 40%.", "(500 - 300) / 500 * 100"),
  j(P, "thermal-statistical", "H", 0, "A monatomic ideal gas (γ = 5/3) is compressed reversibly and adiabatically to half its volume. Its pressure rises by a factor of:", ["2^(5/3)", "2^(3/5)", "2", "4"], "PV^γ is constant, so P₂/P₁ = (V₁/V₂)^γ = 2^(5/3)."),
  j(P, "thermal-statistical", "H", 3, "According to Wien's displacement law, if the temperature of a black body is doubled, the wavelength of peak emission:", ["Doubles", "Is unchanged", "Becomes √2 times larger", "Is halved"], "λ_max T = constant, so doubling T halves λ_max."),
  // ───────── Waves and optics ─────────
  j(P, "waves-optics", "M", 1, "An object is placed 30 cm from a thin convex lens of focal length 20 cm. The image distance is:", ["12 cm", "60 cm", "30 cm", "10 cm"], "1/v = 1/f + 1/u with u = −30 cm: 1/v = 1/20 − 1/30 = 1/60, so v = 60 cm.", "1 / (1/20 - 1/30)"),
  j(P, "waves-optics", "M", 1, "The speed of a transverse wave on a stretched string of tension T and mass per unit length μ is:", ["√(μ/T)", "√(T/μ)", "T/μ", "Tμ"], "v = √(T/μ)."),
  j(P, "waves-optics", "H", 0, "A pipe of length 0.5 m is closed at one end. Taking the speed of sound as 340 m/s, its fundamental frequency is:", ["170 Hz", "340 Hz", "680 Hz", "85 Hz"], "A closed pipe has f₁ = v/(4L) = 340/2 = 170 Hz.", "340 / (4 * 0.5)"),
  j(P, "waves-optics", "M", 3, "Light travels in a medium of refractive index 1.5. Taking c = 3 × 10⁸ m/s, its speed there is:", ["4.5 × 10⁸ m/s", "3 × 10⁸ m/s", "1.5 × 10⁸ m/s", "2 × 10⁸ m/s"], "v = c/n = 3 × 10⁸ / 1.5 = 2 × 10⁸ m/s.", "3e8 / 1.5 / 1e8"),
  // ───────── Quantum and modern physics ─────────
  j(P, "quantum-modern", "M", 1, "The commutator [x, p] of the position and momentum operators equals:", ["ħ", "iħ", "−ħ", "0"], "The canonical commutation relation is [x, p] = iħ."),
  j(P, "quantum-modern", "M", 2, "A photon has a wavelength of 620 nm. Its energy is about (hc = 1240 eV nm):", ["0.5 eV", "1 eV", "2 eV", "4 eV"], "E = hc/λ = 1240/620 = 2 eV.", "1240 / 620"),
  j(P, "quantum-modern", "H", 0, "The zero-point energy of a one-dimensional quantum harmonic oscillator of angular frequency ω is:", ["ħω/2", "ħω", "0", "3ħω/2"], "E_n = (n + ½)ħω, so the ground state has ħω/2."),
  j(P, "quantum-modern", "H", 3, "Ignoring spin, the degeneracy of the n = 3 level of the hydrogen atom is:", ["3", "6", "8", "9"], "The degeneracy is n² = 9 (l = 0, 1, 2 give 1 + 3 + 5 states).", "9"),
  j(P, "quantum-modern", "M", 1, "A nuclear reaction has a mass defect of 0.02 u (1 u = 931.5 MeV/c²). The energy released is:", ["9.3 MeV", "18.63 MeV", "93.15 MeV", "1.86 MeV"], "E = Δm c² = 0.02 × 931.5 = 18.63 MeV.", "931.5 * 0.02"),
  j(P, "quantum-modern", "H", 2, "When ²³⁸₉₂U undergoes α decay, the daughter nucleus has mass number and atomic number respectively:", ["238 and 91", "236 and 90", "234 and 90", "234 and 92"], "An α particle carries away 4 nucleons and 2 protons: 238 − 4 = 234 and 92 − 2 = 90."),
  // ───────── Electronics ─────────
  j(P, "electronics-solid-state", "M", 0, "A full-wave rectifier is fed from a 50 Hz supply. The fundamental frequency of the output ripple is:", ["100 Hz", "50 Hz", "25 Hz", "200 Hz"], "Both half-cycles produce an output pulse, so the ripple frequency is twice the supply frequency."),
  j(P, "electronics-solid-state", "H", 1, "An ideal inverting op-amp amplifier has a feedback resistor of 100 kΩ and an input resistor of 10 kΩ. Its voltage gain is:", ["+10", "−10", "−11", "+11"], "The inverting gain is −R_f/R_in = −100/10 = −10."),
];

export const jamPhysicsMock3 = [
  // ───────── Mathematical methods ─────────
  j(P, "math-methods", "M", 1, "The eigenvalues of the matrix [[0, 1], [1, 0]] are:", ["0 and 1", "1 and −1", "i and −i", "2 and 0"], "λ² − 1 = 0 gives λ = ±1."),
  j(P, "math-methods", "H", 2, "The value of the integral of x e^(−x) from 0 to ∞ is:", ["0", "1/2", "1", "2"], "This is Γ(2) = 1! = 1.", "1"),
  j(P, "math-methods", "M", 0, "The directional derivative of f(x, y) = x²y at (1, 2) along the unit vector (3/5, 4/5) is:", ["3.2", "4", "2.4", "5.6"], "∇f = (2xy, x²) = (4, 1) at (1, 2); the dot product with (0.6, 0.8) is 2.4 + 0.8 = 3.2.", "4 * 0.6 + 1 * 0.8"),
  j(P, "math-methods", "H", 1, "The coefficient of x⁴ in the Maclaurin series of cos x is:", ["1/12", "1/24", "1/16", "−1/24"], "cos x = 1 − x²/2! + x⁴/4! − …, so the coefficient is 1/24."),
  j(P, "math-methods", "H", 1, "The value of (1 + i)⁸ is:", ["8", "16", "16i", "−16"], "(1 + i)² = 2i, (1 + i)⁴ = −4 and (1 + i)⁸ = 16."),
  // ───────── Mechanics ─────────
  j(P, "mechanics", "E", 2, "A body of mass 2 kg moves at 3 m/s. Its kinetic energy is:", ["3 J", "6 J", "9 J", "18 J"], "K = ½ m v² = 0.5 × 2 × 9 = 9 J.", "0.5 * 2 * 9"),
  j(P, "mechanics", "H", 2, "An ice skater spinning with arms outstretched pulls her arms in so that her moment of inertia halves. Her angular speed:", ["Halves", "Is unchanged", "Doubles", "Becomes four times"], "Angular momentum Iω is conserved, so halving I doubles ω."),
  j(P, "mechanics", "H", 2, "A damped oscillator obeys ẍ + 2γẋ + ω₀²x = 0. It is critically damped when:", ["γ = 0", "γ < ω₀", "γ = ω₀", "γ > ω₀"], "The characteristic roots −γ ± √(γ² − ω₀²) coincide when γ = ω₀."),
  j(P, "mechanics", "M", 1, "At a height equal to the Earth's radius above the surface, the acceleration due to gravity is:", ["g/2", "g/4", "g/9", "g/16"], "The distance from the centre is 2R, so g′ = g/2² = g/4."),
  j(P, "mechanics", "H", 1, "The Hamiltonian of a one-dimensional harmonic oscillator of mass m and angular frequency ω is:", ["p²/2m − ½mω²x²", "p²/2m + ½mω²x²", "p²/m + mω²x²", "p²/2m + mω²x²"], "H = kinetic energy p²/2m plus potential energy ½mω²x²."),
  // ───────── Electricity and magnetism ─────────
  j(P, "electromagnetism", "E", 2, "Two resistors of 6 Ω and 3 Ω are connected in parallel. The equivalent resistance is:", ["9 Ω", "4.5 Ω", "2 Ω", "1 Ω"], "R = (6 × 3)/(6 + 3) = 2 Ω.", "6 * 3 / (6 + 3)"),
  j(P, "electromagnetism", "H", 1, "A 1 kΩ resistor and a 1 μF capacitor form an RC circuit. Its time constant is:", ["1 μs", "1 ms", "1 s", "10 ms"], "τ = RC = 10³ × 10⁻⁶ = 10⁻³ s = 1 ms.", "1e3 * 1e-6 * 1000"),
  j(P, "electromagnetism", "H", 0, "The magnetic force per unit length between two long parallel wires 1 m apart, each carrying 1 A in the same direction, is:", ["2 × 10⁻⁷ N/m", "4π × 10⁻⁷ N/m", "10⁻⁷ N/m", "2π × 10⁻⁷ N/m"], "F/L = μ₀I₁I₂/(2πd) = 4π × 10⁻⁷/(2π) = 2 × 10⁻⁷ N/m, attractive."),
  j(P, "electromagnetism", "H", 1, "At the boundary between two dielectrics with no free surface charge, which quantity is continuous?", ["The tangential component of D", "The normal component of D", "The normal component of E", "The tangential component of P"], "Gauss's law with no free charge makes the normal component of D continuous, while the tangential component of E is continuous."),
  // ───────── Thermal and statistical physics ─────────
  j(P, "thermal-statistical", "M", 1, "A gas expands at a constant pressure of 2 × 10⁵ Pa from 1 L to 3 L. The work done by the gas is:", ["200 J", "400 J", "600 J", "1200 J"], "W = PΔV = 2 × 10⁵ × 2 × 10⁻³ = 400 J.", "2e5 * 2e-3"),
  j(P, "thermal-statistical", "H", 0, "In thermal equilibrium at temperature T, the ratio of the populations of two levels separated by energy ΔE (equal degeneracy, upper to lower) is:", ["exp(−ΔE/kT)", "exp(ΔE/kT)", "ΔE/kT", "1 − ΔE/kT"], "The Boltzmann factor gives n_upper/n_lower = exp(−ΔE/kT)."),
  j(P, "thermal-statistical", "M", 1, "According to the third law of thermodynamics, the entropy of a perfect crystal at absolute zero is:", ["Maximum", "Zero", "Infinite", "R ln 2"], "A unique ground state gives W = 1 and S = k ln 1 = 0."),
  j(P, "thermal-statistical", "H", 2, "At low temperatures the lattice heat capacity of a Debye solid varies with temperature as:", ["T", "T²", "T³", "T⁴"], "The Debye T³ law applies at T ≪ Θ_D."),
  // ───────── Waves and optics ─────────
  j(P, "waves-optics", "M", 1, "The angular resolution limit of a telescope of aperture diameter D at wavelength λ (Rayleigh criterion) is:", ["λ/D", "1.22 λ/D", "2.44 λ/D", "0.61 λ/D"], "A circular aperture gives θ_min = 1.22 λ/D."),
  j(P, "waves-optics", "H", 1, "Unpolarised light of intensity I₀ passes through a polariser; the transmitted light then meets an analyser at 60° to the polariser axis. The final intensity is:", ["I₀/2", "I₀/8", "3I₀/8", "I₀/4"], "The polariser transmits I₀/2, and Malus's law gives (I₀/2)cos²60° = (I₀/2)(1/4) = I₀/8."),
  j(P, "waves-optics", "M", 1, "Two tuning forks of 256 Hz and 260 Hz are sounded together. The beat frequency is:", ["2 Hz", "4 Hz", "258 Hz", "516 Hz"], "Beat frequency = |f₁ − f₂| = 4 Hz.", "260 - 256"),
  j(P, "waves-optics", "H", 1, "The group velocity of a wave packet with angular frequency ω and wave number k is:", ["ω/k", "dω/dk", "dk/dω", "ωk"], "The envelope moves at v_g = dω/dk; ω/k is the phase velocity."),
  // ───────── Quantum and modern physics ─────────
  j(P, "quantum-modern", "H", 1, "A particle is in the ground state of an infinite one-dimensional well of width L. The probability of finding it in the left half of the well is:", ["1/4", "1/2", "1/3", "3/4"], "The ground-state probability density sin²(πx/L) is symmetric about the centre."),
  j(P, "quantum-modern", "H", 2, "The total number of spin states of two spin-½ particles is:", ["2", "3", "4", "6"], "Each particle has 2 states, so the pair has 2 × 2 = 4 (one singlet and three triplet states)."),
  j(P, "quantum-modern", "M", 1, "The longest wavelength in the Lyman series of hydrogen, for the n = 2 → n = 1 transition, is about:", ["91 nm", "121.5 nm", "656 nm", "486 nm"], "1/λ = R(1 − 1/4) = 3R/4 gives λ ≈ 121.5 nm, in the ultraviolet."),
  j(P, "quantum-modern", "H", 1, "The maximum Compton shift in wavelength, for scattering through 180°, is about:", ["0.0243 Å", "0.0486 Å", "0.243 Å", "1.22 Å"], "Δλ = (h/mc)(1 − cos θ) = 2 × 0.0243 = 0.0486 Å."),
  j(P, "quantum-modern", "M", 1, "A particle moves at 0.8c relative to the lab. Its Lorentz factor is about:", ["1.25", "1.67", "2.0", "0.6"], "γ = 1/√(1 − 0.64) = 1/0.6 ≈ 1.67."),
  j(P, "quantum-modern", "M", 2, "Which of the following particles is a lepton?", ["Proton", "Neutron", "Muon", "Pion"], "The muon is a lepton; the proton and neutron are baryons and the pion is a meson."),
  // ───────── Electronics ─────────
  j(P, "electronics-solid-state", "M", 1, "A transistor in common-emitter mode has a current gain β = 100 and a base current of 20 μA. The collector current is:", ["0.2 mA", "2 mA", "20 mA", "0.02 mA"], "I_C = β I_B = 100 × 20 μA = 2 mA.", "100 * 20e-3"),
  j(P, "electronics-solid-state", "H", 1, "A two-input NOR gate gives an output of 1 when:", ["At least one input is 1", "Every input is 0", "Exactly one input is 1", "The inputs differ"], "NOR is the complement of OR, so the output is 1 only when all inputs are 0."),
];

export const jamPhysicsMock4 = [
  // ───────── Mathematical methods ─────────
  j(P, "math-methods", "H", 0, "The eigenvalues of the matrix [[1, 2], [2, 4]] are:", ["0 and 5", "1 and 4", "2 and 3", "−1 and 6"], "The trace is 5 and the determinant is 0, so λ² − 5λ = 0 and λ = 0 or 5."),
  j(P, "math-methods", "H", 1, "The flux of the position vector r outward through the surface of the unit sphere is:", ["π", "4π", "12π", "4π/3"], "By the divergence theorem the flux is ∫ (∇·r) dV = 3 × (4π/3) = 4π."),
  j(P, "math-methods", "H", 1, "The residue of e^z/z² at z = 0 is:", ["0", "1", "2", "1/2"], "e^z/z² = 1/z² + 1/z + …, so the coefficient of 1/z is 1."),
  j(P, "math-methods", "M", 1, "The solution of dy/dx = x/y with y(0) = 1 takes the value y(√3) equal to:", ["√2", "2", "3", "√3"], "Separating variables gives y² = x² + 1, so y(√3)² = 4 and y = 2."),
  j(P, "math-methods", "H", 1, "Using Γ(1/2) = √π, the value of Γ(5/2) is:", ["√π/2", "3√π/4", "3√π/2", "√π"], "Γ(5/2) = (3/2)(1/2)Γ(1/2) = 3√π/4."),
  // ───────── Mechanics ─────────
  j(P, "mechanics", "H", 1, "A satellite of mass m moves in an elliptical orbit of semi-major axis a around a mass M. Its total energy is:", ["−GMm/a", "−GMm/(2a)", "+GMm/(2a)", "−GMm/(4a)"], "For a bound Kepler orbit E = −GMm/(2a), independent of the eccentricity."),
  j(P, "mechanics", "H", 1, "A solid cylinder rolls without slipping down an incline of angle θ. Its acceleration of the centre of mass is:", ["g sin θ", "(2/3) g sin θ", "(1/2) g sin θ", "(3/5) g sin θ"], "a = g sin θ / (1 + I/mR²) = g sin θ / (1 + 1/2) = (2/3) g sin θ."),
  j(P, "mechanics", "M", 0, "A simple pendulum of length 2.5 m oscillates through small angles (g = 10 m/s²). Its period is:", ["π s", "2π s", "π/2 s", "4π s"], "T = 2π√(l/g) = 2π√0.25 = 2π × 0.5 = π s."),
  j(P, "mechanics", "H", 1, "A rocket in free space ejects exhaust at a constant speed u relative to itself. If its mass falls by a factor of e², its final speed (starting from rest) is:", ["u", "2u", "e²u", "u/2"], "The rocket equation gives v = u ln(m₀/m) = u ln e² = 2u."),
  j(P, "mechanics", "E", 1, "The moment of inertia of a thin ring of mass M and radius R about its symmetry axis is:", ["MR²/2", "MR²", "2MR²", "MR²/4"], "All the mass lies at distance R from the axis, so I = MR²."),
  // ───────── Electricity and magnetism ─────────
  j(P, "electromagnetism", "M", 2, "The characteristic impedance of free space is about:", ["50 Ω", "120 Ω", "377 Ω", "600 Ω"], "Z₀ = √(μ₀/ε₀) ≈ 377 Ω."),
  j(P, "electromagnetism", "H", 2, "On the axis of a magnetic dipole, far from it, the magnetic field falls off with distance r as:", ["1/r", "1/r²", "1/r³", "1/r⁴"], "The dipole field varies as 1/r³."),
  j(P, "electromagnetism", "H", 1, "A plane wave of intensity I falls at normal incidence on a perfectly reflecting surface. The radiation pressure is:", ["I/c", "2I/c", "I/(2c)", "Ic"], "Absorption gives I/c; reflection reverses the momentum, which doubles it to 2I/c."),
  j(P, "electromagnetism", "H", 1, "The electric field at distance r from a long straight line charge of linear density λ is:", ["λ/(4πε₀r²)", "λ/(2πε₀r)", "λ/(2ε₀)", "λ/(πε₀r)"], "Gauss's law on a coaxial cylinder gives E·2πrL = λL/ε₀."),
  // ───────── Thermal and statistical physics ─────────
  j(P, "thermal-statistical", "M", 1, "The Helmholtz free energy is defined as:", ["U + TS", "U − TS", "H − TS", "H + PV"], "F = U − TS; H − TS is the Gibbs free energy G."),
  j(P, "thermal-statistical", "H", 1, "N distinguishable two-level spins are all equally likely to be in either level with no constraint. The entropy is:", ["k ln N", "N k ln 2", "k ln 2", "N² k"], "There are 2^N microstates, so S = k ln 2^N = N k ln 2."),
  j(P, "thermal-statistical", "M", 3, "The total power radiated by a black body is increased by what factor when its absolute temperature doubles?", ["2", "4", "8", "16"], "The Stefan–Boltzmann law gives P ∝ T⁴, so 2⁴ = 16.", "2 ** 4"),
  j(P, "thermal-statistical", "H", 1, "Photons in a cavity obey:", ["Fermi–Dirac statistics", "Bose–Einstein statistics", "Maxwell–Boltzmann statistics", "Pauli statistics"], "Photons are bosons, with zero chemical potential in a cavity."),
  // ───────── Waves and optics ─────────
  j(P, "waves-optics", "H", 1, "In a Michelson interferometer, moving one mirror by 0.1 mm shifts 400 fringes. The wavelength of the light is:", ["250 nm", "500 nm", "1000 nm", "400 nm"], "Each fringe corresponds to a mirror shift of λ/2, so λ = 2d/N = 2 × 0.1 × 10⁻³ / 400 = 500 nm.", "2 * 0.1e-3 / 400 * 1e9"),
  j(P, "waves-optics", "H", 0, "Light of wavelength 500 nm falls on a single slit of width 0.2 mm. The first diffraction minimum occurs where sin θ is:", ["2.5 × 10⁻³", "5 × 10⁻³", "1.25 × 10⁻³", "2.5 × 10⁻⁴"], "a sin θ = λ gives sin θ = 500 × 10⁻⁹ / (0.2 × 10⁻³) = 2.5 × 10⁻³.", "500e-9 / 0.2e-3 * 1000"),
  j(P, "waves-optics", "H", 2, "Waves in a plasma with plasma frequency ω_p propagate when their angular frequency satisfies:", ["ω < ω_p", "ω = 0", "ω > ω_p", "ω = ω_p/2"], "From ω² = ω_p² + c²k², k is real only for ω > ω_p; below it the wave is evanescent."),
  j(P, "waves-optics", "M", 2, "If the intensity of a sound increases tenfold, the sound level rises by:", ["1 dB", "3 dB", "10 dB", "20 dB"], "Level = 10 log₁₀(I/I₀), so a factor 10 adds 10 dB."),
  // ───────── Quantum and modern physics ─────────
  j(P, "quantum-modern", "H", 0, "For an electron with orbital quantum number l = 1 and spin ½, the possible values of the total angular momentum quantum number j are:", ["1/2 and 3/2", "1 and 2", "0 and 1", "1/2 and 5/2"], "j runs from |l − s| to l + s: 1/2 and 3/2."),
  j(P, "quantum-modern", "H", 1, "The eigenvalues of the spin component S_z of a spin-½ particle are:", ["±ħ", "±ħ/2", "0 and ħ", "ħ/2 and ħ"], "S_z has eigenvalues m_s ħ with m_s = ±1/2."),
  j(P, "quantum-modern", "H", 1, "The probability of tunnelling through a rectangular potential barrier varies with the barrier width as:", ["Linearly", "Exponentially, decreasing with width", "It does not depend on width", "Quadratically"], "The transmission coefficient falls as exp(−2κa) for a wide barrier of width a."),
  j(P, "quantum-modern", "M", 0, "In any stationary state of the one-dimensional harmonic oscillator, the expectation value ⟨x⟩ is:", ["Zero", "√(ħ/mω)", "ħ/(mω)", "ħω/2"], "The potential is symmetric, so each eigenstate has definite parity and |ψ|² is even, giving ⟨x⟩ = 0."),
  j(P, "quantum-modern", "H", 1, "A radioactive isotope has a half-life of 6.93 days. Its mean life is:", ["4.8 days", "10 days", "6.93 days", "14 days"], "τ = T½/ln 2 = 6.93/0.693 = 10 days.", "6.93 / 0.693"),
  j(P, "quantum-modern", "H", 0, "A photon has a wavelength of 600 nm. Its momentum is about (h = 6.63 × 10⁻³⁴ J s):", ["1.1 × 10⁻²⁷ kg m/s", "1.1 × 10⁻²⁸ kg m/s", "3.3 × 10⁻²⁷ kg m/s", "2.2 × 10⁻²⁷ kg m/s"], "p = h/λ = 6.63 × 10⁻³⁴ / (6 × 10⁻⁷) ≈ 1.1 × 10⁻²⁷ kg m/s."),
  // ───────── Electronics ─────────
  j(P, "electronics-solid-state", "M", 2, "The forward voltage drop across a conducting silicon p–n junction diode is about:", ["0.2 V", "0.3 V", "0.7 V", "1.2 V"], "A silicon diode starts conducting at about 0.6–0.7 V."),
  j(P, "electronics-solid-state", "H", 1, "An ideal non-inverting op-amp amplifier has a feedback resistor of 9 kΩ and a grounded resistor of 1 kΩ. Its voltage gain is:", ["9", "10", "−9", "1"], "The non-inverting gain is 1 + R_f/R = 1 + 9 = 10.", "1 + 9"),
];
