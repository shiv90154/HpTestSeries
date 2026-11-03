import type { ExamPage, ExamPages } from "./types";

// IIT JAM test papers (national, shown on every site). The pattern below is common to all seven papers and has been the same for
// several years: 60 questions, 100 marks, 3 hours, in three sections. Dates, eligibility, seats and the cut-offs change every cycle,
// so the copy points to the official JAM information brochure for them. Matches prisma/jam/index.ts.

type Subject = {
  slug: string;
  name: string;
  code: string;
  /** One sentence on who takes this paper and what it leads to. */
  who: string;
  /** What the paper tests, in the order the syllabus lists it. */
  tests: string;
  /** Markdown "###" blocks. */
  syllabus: string;
  seoDescription: string;
  /** Hinglish tip, like the other exam pages. */
  tip: string;
  prepare: string;
  freeMock: string;
  related: string;
};

const SUBJECTS: Subject[] = [
  {
    slug: "physics",
    name: "Physics",
    code: "PH",
    who: "It is the entry route to M.Sc. Physics and related integrated or joint programmes at the IITs and to M.Sc. programmes at IISc and other institutes that accept JAM scores.",
    tests: "a strong grip on mathematical methods and on classical mechanics, electromagnetism, thermal physics, waves and optics, quantum and modern physics, and basic electronics",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Mathematical Methods
- Calculus of single and several variables, vector calculus, theorems of Gauss, Stokes and Green
- Linear algebra: matrices, eigenvalues and eigenvectors, differential equations, Fourier series, Laplace transforms, complex analysis basics

### Mechanics and General Properties of Matter
- Newton's laws, central forces, rigid-body motion, Lagrangian mechanics, special relativity
- Elasticity, fluids and surface tension

### Oscillations, Waves and Optics
- Simple, damped and forced oscillations, wave equation, interference, diffraction, polarisation

### Electricity and Magnetism
- Electrostatics, magnetostatics, Maxwell's equations, electromagnetic waves, circuits

### Thermal Physics
- Laws of thermodynamics, kinetic theory, Maxwell–Boltzmann distribution, statistical distributions

### Modern Physics and Electronics
- Wave–particle duality, hydrogen atom, uncertainty principle, nuclei and radioactivity
- Semiconductors, diodes, transistors, logic gates, band theory of solids`,
    seoDescription: "IIT JAM Physics mock test: 30 fresh MCQs on mechanics, electromagnetism, thermal physics, optics and quantum physics, with detailed solutions.",
    tip: "Physics paper me numerical aur concept dono chalte hain: mathematical methods pe pakad rakho kyunki wahi baaki sections ke sawal fast banata hai.",
    prepare: "Revise one section a week from a standard B.Sc. text, solve previous-year JAM questions chapter-wise, and keep a short sheet of formulas and constants for quick revision.",
    freeMock: "jam-physics-free-mock-1",
    related: "iit-jam/mathematics",
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    code: "CY",
    who: "It is the entry route to M.Sc. Chemistry and related programmes at the IITs, IISc and other institutes that accept JAM scores.",
    tests: "physical, organic and inorganic chemistry in roughly equal parts, with questions on mechanisms, structure and bonding, thermodynamics, kinetics and coordination chemistry",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Physical Chemistry
- Atomic and molecular structure, quantum chemistry basics, the gaseous and solid states
- Chemical thermodynamics, equilibrium, electrochemistry, chemical kinetics, surface chemistry, spectroscopy

### Organic Chemistry
- Basic concepts: electronic effects, acidity and basicity, aromaticity, stereochemistry
- Reaction mechanisms, functional groups, carbonyl chemistry, pericyclic reactions, biomolecules, spectroscopic techniques

### Inorganic Chemistry
- Periodic properties, chemical bonding and molecular shapes, acids and bases
- Coordination chemistry: crystal field theory, spectral and magnetic properties
- Main group and transition-metal chemistry, bio-inorganic basics, analytical principles`,
    seoDescription: "IIT JAM Chemistry mock test: 30 fresh MCQs on physical, organic and inorganic chemistry for the CY paper, with step-by-step solutions.",
    tip: "Chemistry me organic ke mechanisms aur inorganic ke exceptions yaad karne se hi marks aate hain, isliye har week ek mechanism-sheet khud banao.",
    prepare: "Split your week across physical, organic and inorganic, practise mechanisms by drawing them out, and finish each topic with previous-year JAM questions.",
    freeMock: "jam-chemistry-free-mock-1",
    related: "iit-jam/physics",
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    code: "MA",
    who: "It is the entry route to M.Sc. Mathematics and related programmes at the IITs, IISc and other institutes that accept JAM scores.",
    tests: "proofs-oriented undergraduate mathematics: real analysis, calculus, linear algebra, differential equations and abstract algebra",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Real Analysis
- Sequences and series of real numbers, convergence tests, limit superior and inferior
- Functions of one real variable: continuity, uniform continuity, differentiability, mean value theorems, Riemann integration

### Calculus
- Functions of two and three variables: limits, partial derivatives, maxima and minima, Lagrange multipliers
- Double and triple integrals, vector calculus, Green's, Gauss's and Stokes' theorems

### Differential Equations
- First-order equations, linear equations with constant coefficients, Cauchy–Euler equation

### Linear Algebra and Abstract Algebra
- Vector spaces, linear transformations, rank and nullity, eigenvalues, Cayley–Hamilton theorem
- Groups, subgroups, cyclic groups, permutation groups, Lagrange's theorem, rings and fields`,
    seoDescription: "IIT JAM Mathematics mock test: 30 fresh MCQs on real analysis, calculus, linear algebra, ODEs and algebra for the MA paper, with detailed solutions.",
    tip: "Maths me proof wali soch chahiye: formula ratne se kaam nahi chalta, har theorem ki shart (hypothesis) yaad rakho kyunki options usi pe trap lagate hain.",
    prepare: "Build the definitions and standard counter-examples first, then solve previous-year JAM questions topic by topic, and attempt a timed mock every weekend.",
    freeMock: "jam-mathematics-free-mock-1",
    related: "iit-jam/mathematical-statistics",
  },
  {
    slug: "mathematical-statistics",
    name: "Mathematical Statistics",
    code: "MS",
    who: "It is the entry route to M.Sc. programmes in statistics and data-related fields at the IITs and other institutes that accept JAM scores.",
    tests: "calculus and linear algebra as the base, with most of the weight on probability, random variables and distributions, and statistical inference",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Mathematics
- Sequences and series, differential and integral calculus, functions of several variables
- Matrices, determinants, eigenvalues and eigenvectors

### Probability
- Axioms of probability, conditional probability, Bayes' theorem, independence
- Random variables, expectation, moments and moment generating functions, Chebyshev's inequality

### Distributions
- Binomial, Poisson, geometric, uniform, exponential, gamma, normal and chi-square distributions
- Joint, marginal and conditional distributions, covariance and correlation, order statistics, limit theorems

### Statistics
- Sampling distributions, point estimation: unbiasedness, MLE, Cramér–Rao bound
- Interval estimation and testing of hypotheses: error types, power, chi-square tests`,
    seoDescription: "IIT JAM Mathematical Statistics mock test: 30 fresh MCQs on probability, distributions, estimation and testing for the MS paper, with solutions.",
    tip: "MS paper me probability aur distributions ke sawal sabse zyada aate hain; moments, MGF aur standard distributions ki table ratne se pehle unka derivation samjho.",
    prepare: "Master calculus and matrices quickly, then spend most time on distributions and inference problems, and check every answer with a quick sanity bound.",
    freeMock: "jam-mathematical-statistics-free-mock-1",
    related: "iit-jam/mathematics",
  },
  {
    slug: "biotechnology",
    name: "Biotechnology",
    code: "BT",
    who: "It is the entry route to M.Sc. Biotechnology and related programmes at the IITs and other institutes that accept JAM scores.",
    tests: "biology (biochemistry, cell and molecular biology, genetics, microbiology, immunology, plant and animal biology) together with chemistry, physics and mathematics at the basic level",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Biology
- Biochemistry: biomolecules, enzymes and metabolism
- Cell biology, molecular biology, genetics and genetic engineering tools
- Microbiology and immunology, plant and animal physiology, ecology and evolution

### Chemistry
- Atomic structure, bonding, thermodynamics, equilibrium, organic reactions and functional groups

### Physics and Mathematics
- Mechanics, electricity, optics, modern physics at the basic level
- Calculus, matrices, probability and permutations`,
    seoDescription: "IIT JAM Biotechnology mock test: 30 fresh MCQs on biochemistry, cell and molecular biology, genetics, immunology plus chemistry and maths.",
    tip: "BT me biology ka bada hissa hai, par chemistry, physics aur maths ke sawal bhi aate hain; unhe ignore karne se rank neeche aati hai.",
    prepare: "Anchor your preparation in biochemistry and molecular biology, practise the numerical side of genetics and kinetics, and keep a weekly slot for chemistry and maths.",
    freeMock: "jam-biotechnology-free-mock-1",
    related: "iit-jam/biological-sciences",
  },
  {
    slug: "biological-sciences",
    name: "Biological Sciences",
    code: "BL",
    who: "It is the entry route to M.Sc. programmes in the life sciences at the IITs, IISc and other institutes that accept JAM scores.",
    tests: "biology (cell biology, genetics, physiology, ecology, evolution, plant biology) together with chemistry, mathematics and physics at the basic level",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### Biology
- Biochemistry and cell biology: biomolecules, enzymes, organelles, the cell cycle
- Genetics and molecular biology: inheritance, replication, transcription, translation, gene regulation
- Physiology of plants and animals, ecology, evolution, biodiversity and basics of biotechnology

### Chemistry, Mathematics and Physics
- Chemical bonding, thermodynamics, equilibrium, organic basics
- Calculus, algebra, probability and statistics basics
- Mechanics, heat, electricity and optics at the basic level`,
    seoDescription: "IIT JAM Biological Sciences mock test: 30 fresh MCQs on cell biology, genetics, physiology, ecology and evolution for the BL paper, with solutions.",
    tip: "BL me physiology, ecology aur evolution ke concept-based sawal aate hain, isliye diagrams aur flow-charts banakar revise karo.",
    prepare: "Read the core biology chapters in a standard text, solve numerical problems in genetics and ecology, and revise chemistry and maths basics every week.",
    freeMock: "jam-biological-sciences-free-mock-1",
    related: "iit-jam/biotechnology",
  },
  {
    slug: "geology",
    name: "Geology",
    code: "GG",
    who: "It is the entry route to M.Sc. programmes in geology, applied geology and earth sciences at the IITs and other institutes that accept JAM scores.",
    tests: "earth science: minerals and rocks, structural geology, stratigraphy and palaeontology, geomorphology, hydrogeology and economic geology, with general science in Section A",
    syllabus: `The syllabus is published in the JAM information brochure. In brief:

### The Earth and Mineralogy
- Earth's internal structure, plate tectonics, earthquakes and volcanoes
- Crystallography and optical mineralogy, rock-forming minerals

### Petrology
- Igneous, sedimentary and metamorphic rocks, magma evolution, metamorphic facies

### Structural Geology and Geomorphology
- Strike and dip, folds, faults, joints, stress and strain
- Weathering, erosion, fluvial, glacial, aeolian and coastal landforms

### Palaeontology and Stratigraphy
- Fossils and evolution, geological time scale, Indian stratigraphy, radiometric dating

### Hydrogeology and Economic Geology
- Aquifers and groundwater flow, ore deposits, fuels and mineral resources`,
    seoDescription: "IIT JAM Geology mock test: 30 fresh MCQs on mineralogy, petrology, structural geology, stratigraphy and geomorphology for the GG paper, with solutions.",
    tip: "Geology me diagrams, field terms aur Indian stratigraphy ka revision zaroori hai; sirf theory padhne se hand-specimen wale sawal reh jaate hain.",
    prepare: "Study mineral and rock properties as tables, practise structural geology problems on paper, and revise the geological time scale with the Indian examples.",
    freeMock: "jam-geology-free-mock-1",
    related: "iit-jam/chemistry",
  },
];

const NAME: Record<string, string> = Object.fromEntries(SUBJECTS.map((x) => [`iit-jam/${x.slug}`, `IIT JAM ${x.name}`]));

const PATTERN =
  "Every JAM paper has **60 questions for 100 marks in 3 hours**, in three sections: **Section A** has 30 single-answer multiple-choice questions (10 of 1 mark and 20 of 2 marks); " +
  "**Section B** has 10 multiple-select questions of 2 marks; **Section C** has 20 numerical-answer questions (10 of 1 mark and 10 of 2 marks). A wrong MCQ answer costs one-third of its marks (⅓ for a 1-mark and ⅔ for a 2-mark question); " +
  "multiple-select and numerical-answer questions carry no negative marking. The test is computer-based and in English.";

function page(s: Subject): ExamPage {
  return {
    seo: {
      title: `IIT JAM ${s.name} Mock Test {year} — Free Online Test`,
      description: s.seoDescription,
    },
    description: `The **IIT JAM ${s.name} (${s.code}) paper** is one of the seven test papers of the **Joint Admission Test for M.Sc. (IIT JAM)**, a national computer-based entrance exam held once a year by one of the IITs on rotation. ${s.who} Eligibility, seats, important dates and the cut-offs are in the official JAM information brochure and change every cycle, so always check them there.

${PATTERN}

The ${s.name} paper tests ${s.tests}. Questions are conceptual and application-based, so reading a book once is not enough: you need to solve many problems under a time limit.

${s.tip}

**How to prepare:** ${s.prepare} Take our [free ${s.name} mock](/tests/${s.freeMock}) to find out where you stand, and see the [${NAME[s.related]} paper](/${s.related}) too if your plan involves a second subject.`,
    syllabus: s.syllabus,
    faqs: [
      {
        q: `How many questions and how much time are there in the IIT JAM ${s.name} paper?`,
        a: "60 questions for 100 marks in 3 hours: 30 single-answer MCQs, 10 multiple-select questions and 20 numerical-answer questions. Check the current JAM brochure in case the pattern changes.",
      },
      {
        q: `Is there negative marking in IIT JAM ${s.name}?`,
        a: "Yes, for the single-answer MCQs: one-third of the question's marks is deducted for a wrong answer (⅓ for 1-mark and ⅔ for 2-mark questions). Multiple-select and numerical-answer questions have no negative marking.",
      },
      {
        q: `What does the IIT JAM ${s.name} mock test on this site contain?`,
        a: `A free 30-question set of single-answer MCQs for ${s.name} (${s.code}) with 1 mark per question, 0.33 negative marking and detailed solutions, to be taken in 90 minutes. Multiple-select and numerical-answer questions are not part of it yet.`,
      },
    ],
  };
}

export const JAM_PAGES: ExamPages = Object.fromEntries(SUBJECTS.map((s) => [`iit-jam/${s.slug}`, page(s)]));
