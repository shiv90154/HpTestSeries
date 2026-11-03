import type { SyllabusGuide } from "./syllabus-guides";

/** Study copy for the seven IIT JAM paper pages (important topics, plan, links, FAQs). Keyed "iit-jam/<exam>"; used by syllabus-guides.ts and syllabus-seo.ts. */

type Paper = { slug: string; name: string; code: string; important: string; plan: string; next: string; faq: { q: string; a: string } };

const PAPERS: Paper[] = [
  {
    slug: "physics",
    name: "Physics",
    code: "PH",
    important: `- **Mathematical methods:** eigenvalues and eigenvectors, vector calculus (divergence, curl, Stokes), Fourier series, Laplace transforms, complex residues
- **Mechanics:** Lagrangian formalism and cyclic coordinates, central forces, moment of inertia, special relativity
- **Electromagnetism:** Gauss's law, Maxwell's equations and the displacement current, electromagnetic waves, capacitors with dielectrics
- **Thermal physics:** Carnot cycle, entropy, kinetic theory, Maxwell–Boltzmann and Fermi–Dirac statistics
- **Waves and optics:** Young's double slit, diffraction gratings, polarisation and Brewster angle, Doppler effect
- **Quantum and modern physics:** particle in a box, hydrogen atom levels, uncertainty principle, photoelectric effect, radioactivity
- **Electronics:** diodes, transistors, logic gates and Boolean algebra, semiconductor Fermi level`,
    plan: `1. **Weeks 1–3:** mathematical methods and mechanics, solving 10 problems a day from a standard text.
2. **Weeks 4–6:** electromagnetism, optics and waves, with a sectional test each week.
3. **Weeks 7–9:** thermal physics, quantum and modern physics, electronics.
4. **From week 10:** one timed full mock every weekend and chapter-wise previous-year JAM questions; keep a formula sheet and revise it daily.`,
    next: "iit-jam/mathematics",
    faq: { q: "Which topics carry the most weight in IIT JAM Physics?", a: "Mathematical methods, mechanics, electromagnetism, and quantum and modern physics together make up most of the paper. Thermal physics, optics and electronics fill the rest." },
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    code: "CY",
    important: `- **Physical chemistry:** thermodynamics (ΔG, ΔH, ΔS), chemical kinetics, electrochemistry and the Nernst equation, colligative properties, quantum numbers and orbitals, crystal lattices
- **Organic chemistry:** carbocation stability, SN1/SN2 and elimination, addition and aromatic substitution, stereochemistry, carbonyl reactions, name reactions, IR and NMR basics
- **Inorganic chemistry:** periodic trends, chemical bonding and molecular shapes (VSEPR), molecular orbital theory, crystal field theory, magnetic properties of complexes, f-block chemistry`,
    plan: `1. **Weeks 1–3:** physical chemistry, with numericals every day.
2. **Weeks 4–7:** organic chemistry: draw each mechanism by hand and list reagents with their products.
3. **Weeks 8–9:** inorganic chemistry: bonding, coordination compounds and periodic trends with their exceptions.
4. **From week 10:** timed full mocks and previous-year JAM questions; revise a one-page reagent and exception sheet each week.`,
    next: "iit-jam/physics",
    faq: { q: "How is the IIT JAM Chemistry paper divided between physical, organic and inorganic?", a: "The three branches carry roughly similar weight. Physical chemistry is the most numerical, organic is mechanism-based, and inorganic rewards knowing trends and their exceptions." },
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    code: "MA",
    important: `- **Real analysis:** convergence of sequences and series, limit superior and inferior, continuity and uniform continuity, compactness, mean value theorems
- **Calculus:** maxima and minima, double and triple integrals, Green's, Gauss's and Stokes' theorems
- **Linear algebra:** rank and nullity, eigenvalues, Cayley–Hamilton theorem, diagonalisation
- **Differential equations:** first-order methods, integrating factors, linear equations with constant coefficients
- **Abstract algebra:** orders of elements, cyclic groups, Lagrange's theorem, permutation groups, rings and fields`,
    plan: `1. **Weeks 1–3:** real analysis: definitions first, then standard counter-examples.
2. **Weeks 4–5:** calculus of several variables and vector calculus.
3. **Weeks 6–8:** linear algebra, differential equations and group theory.
4. **From week 9:** previous-year JAM questions topic by topic and a timed full mock every weekend; redo every question you got wrong after three days.`,
    next: "iit-jam/mathematical-statistics",
    faq: { q: "Is IIT JAM Mathematics more about theory or calculation?", a: "Both, but theory decides the harder questions. Know every definition and theorem with its hypotheses, because options are built around missing conditions." },
  },
  {
    slug: "mathematical-statistics",
    name: "Mathematical Statistics",
    code: "MS",
    important: `- **Probability:** conditional probability and Bayes' theorem, independence, Chebyshev's inequality
- **Random variables:** expectation, variance, moments and moment generating functions, covariance and correlation
- **Distributions:** binomial, Poisson, geometric, uniform, exponential, gamma, normal and chi-square, with their means and variances
- **Inference:** unbiased estimators, maximum likelihood, Cramér–Rao bound, confidence intervals, Type I and II errors, power, chi-square tests
- **Mathematics base:** limits, series, integrals, matrices, determinants and eigenvalues`,
    plan: `1. **Weeks 1–2:** calculus, series and matrices as the base.
2. **Weeks 3–5:** probability and random variables, deriving each moment yourself.
3. **Weeks 6–8:** standard distributions, joint distributions and order statistics.
4. **Weeks 9–10:** estimation and testing, then timed full mocks and previous-year JAM questions.`,
    next: "iit-jam/mathematics",
    faq: { q: "How should I split time between mathematics and statistics for IIT JAM MS?", a: "Spend roughly a third on the mathematics base (calculus and linear algebra) and two thirds on probability, distributions and inference, which hold most of the harder questions." },
  },
  {
    slug: "biotechnology",
    name: "Biotechnology",
    code: "BT",
    important: `- **Biochemistry:** amino acids and proteins, enzyme kinetics (Km, Vmax, inhibition), glycolysis, TCA cycle and oxidative phosphorylation
- **Molecular biology and genetic engineering:** DNA replication, transcription, translation, lac operon, restriction enzymes, PCR and blotting techniques
- **Genetics:** Mendelian ratios, linkage and mapping, Hardy–Weinberg equilibrium, pedigrees
- **Microbiology and immunology:** bacterial cell wall, antibodies, MHC molecules, T and B cell roles
- **Plant and animal biology:** C3 and C4 photosynthesis, plant hormones, tissue culture
- **Chemistry, physics and maths:** buffers and pH, absorbance, basic calculus and probability`,
    plan: `1. **Weeks 1–3:** biochemistry and cell biology.
2. **Weeks 4–6:** molecular biology, genetics and the techniques of biotechnology.
3. **Weeks 7–8:** microbiology, immunology, plant and animal biology.
4. **Weeks 9–10:** chemistry, physics and maths basics, then timed full mocks and previous-year JAM questions.`,
    next: "iit-jam/biological-sciences",
    faq: { q: "Do I need to prepare chemistry and maths for IIT JAM Biotechnology?", a: "Yes. Alongside biology the paper has questions on chemistry, physics and mathematics at the basic level, and they are often the easiest marks to secure." },
  },
  {
    slug: "biological-sciences",
    name: "Biological Sciences",
    code: "BL",
    important: `- **Cell biology and biochemistry:** organelles, cell cycle and mitosis, protein targeting, enzymes
- **Genetics and molecular biology:** inheritance patterns, meiosis, RNA polymerases, the genetic code, reverse transcription
- **Physiology:** kidney function, nerve impulse and resting potential, cardiac output, oxygen transport, vitamins
- **Ecology and evolution:** energy flow, logistic growth, genetic drift, homology and analogy, ozone depletion
- **Plant biology:** Calvin cycle, hormones, double fertilisation, stomatal movement
- **Chemistry, maths and physics:** pH, moles, equilibrium, derivatives, probability, work and energy`,
    plan: `1. **Weeks 1–3:** cell biology, biochemistry and genetics.
2. **Weeks 4–6:** molecular biology and physiology of plants and animals.
3. **Weeks 7–8:** ecology and evolution, with diagrams and flow charts.
4. **Weeks 9–10:** chemistry, maths and physics basics, then timed full mocks and previous-year JAM questions.`,
    next: "iit-jam/biotechnology",
    faq: { q: "What is the difference between IIT JAM Biotechnology and Biological Sciences?", a: "Biotechnology leans towards biochemistry, molecular biology and techniques, while Biological Sciences gives more weight to physiology, ecology and evolution. Both include chemistry, physics and maths." },
  },
  {
    slug: "geology",
    name: "Geology",
    code: "GG",
    important: `- **Mineralogy:** Mohs hardness, cleavage, silicate structures, Bowen's reaction series
- **Petrology:** igneous, sedimentary and metamorphic rocks, metamorphic grade and facies
- **Structural geology:** strike and dip, folds, faults, stress, and plate tectonics
- **Stratigraphy and palaeontology:** the geological time scale, index fossils, mass extinctions, radiometric dating, Deccan Traps
- **Geomorphology and hydrogeology:** fluvial and glacial landforms, Darcy's law, porosity and permeability
- **Economic geology:** major ores of aluminium, iron, copper and lead, fuels and mineral resources`,
    plan: `1. **Weeks 1–2:** mineralogy and petrology as tables of properties.
2. **Weeks 3–5:** structural geology and plate tectonics, with problems on paper.
3. **Weeks 6–8:** stratigraphy, palaeontology and Indian geology.
4. **Weeks 9–10:** geomorphology, hydrogeology and economic geology, then timed full mocks and previous-year JAM questions.`,
    next: "iit-jam/chemistry",
    faq: { q: "How should I study Indian stratigraphy for IIT JAM Geology?", a: "Learn the major Indian formations with their ages and the fossils or resources they carry, and tie each to the geological time scale so that a single table does the revising." },
  },
];

const NAMES: Record<string, string> = Object.fromEntries(PAPERS.map((p) => [`iit-jam/${p.slug}`, `IIT JAM ${p.name}`]));

export const JAM_GUIDES: Record<string, SyllabusGuide> = Object.fromEntries(
  PAPERS.map((p) => [
    `iit-jam/${p.slug}`,
    {
      important: p.important,
      plan: p.plan,
      links: [
        { href: `/tests/jam-${p.slug}-free-mock-1`, label: `Free IIT JAM ${p.name} mock test` },
        { href: `/iit-jam/${p.slug}`, label: `IIT JAM ${p.name} mock tests` },
        { href: `/${p.next}`, label: `${NAMES[p.next]} mock tests` },
      ],
      faqs: [
        p.faq,
        { q: `How many months are needed to prepare for IIT JAM ${p.name}?`, a: "Around ten weeks of steady study covers the syllabus once if you already know the undergraduate basics. Add timed mocks every week in the last month." },
        { q: `Is the ${p.code} paper asked in English only?`, a: "Yes, IIT JAM is conducted in English, so the questions and options on our mock tests are in English as well." },
      ],
    } satisfies SyllabusGuide,
  ]),
);

export const JAM_SYLLABUS_SEO: Record<string, { title: string; description: string }> = Object.fromEntries(
  PAPERS.map((p) => [
    `iit-jam/${p.slug}`,
    {
      title: `IIT JAM ${p.name} Syllabus {year}: Important Topics & Free Mock`,
      description: `IIT JAM ${p.name} (${p.code}) syllabus {year} topic-wise, with the most asked topics, a 10-week study plan and a free mock test with solutions.`,
    },
  ]),
);
