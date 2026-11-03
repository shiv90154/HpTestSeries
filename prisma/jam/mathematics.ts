// IIT JAM Mathematics (MA) — Free Mock 1: 30 MCQs written fresh over analysis, calculus, linear algebra, ODEs and algebra.

import { j } from "./types";

const M = "jam-mathematics";

export const jamMathematicsMock1 = [
  j(M, "real-analysis", "M", 1, "Evaluate lim (1 + 2/n)ⁿ as n tends to infinity:", ["e", "e²", "2e", "1"], "(1 + a/n)ⁿ → eᵃ, so with a = 2 the limit is e²."),
  j(M, "real-analysis", "M", 1, "The sum of the series Σ 1/[n(n + 1)] from n = 1 to ∞ is:", ["1/2", "1", "2", "The series diverges"], "Writing 1/[n(n + 1)] = 1/n − 1/(n + 1), the partial sums telescope to 1 − 1/(N + 1) → 1."),
  j(M, "real-analysis", "H", 1, "The radius of convergence of the power series Σ n! xⁿ / nⁿ is:", ["1/e", "e", "1", "∞"], "The ratio of consecutive coefficients is (n/(n + 1))ⁿ → 1/e, so R = e."),
  j(M, "real-analysis", "M", 0, "The function f(x) = |x| on ℝ is:", ["Continuous but not differentiable at 0", "Differentiable at 0 but not continuous", "Differentiable at every point", "Discontinuous at 0 and not differentiable there"], "|x| is continuous everywhere, but the left and right derivatives at 0 are −1 and +1, so it is not differentiable at 0."),
  j(M, "real-analysis", "H", 2, "The subset (0, 1) of ℝ with the usual topology is:", ["Compact", "Closed and bounded", "Open and not compact", "Open and compact"], "(0, 1) is open, but it is not closed, so by Heine–Borel it is not compact."),
  j(M, "calculus", "M", 1, "The limit of (1 − cos x)/x² as x → 0 is:", ["0", "1/2", "1", "2"], "Using 1 − cos x = 2 sin²(x/2) ≈ x²/2, the limit is 1/2."),
  j(M, "calculus", "M", 1, "The value of ∫₀¹ x eˣ dx is:", ["0", "1", "e", "e − 1"], "By parts: [x eˣ − eˣ] from 0 to 1 = (e − e) − (0 − 1) = 1."),
  j(M, "calculus", "H", 1, "The maximum value of f(x) = x³ − 3x on the interval [−2, 2] is:", ["0", "2", "4", "−2"], "f′ = 3x² − 3 = 0 at x = ±1; f(−1) = 2, f(1) = −2, f(2) = 2 and f(−2) = −2, so the maximum is 2."),
  j(M, "calculus", "H", 1, "The value of ∬ (x² + y²) dA over the unit disc x² + y² ≤ 1 is:", ["π", "π/2", "π/4", "2π"], "In polar coordinates: ∫₀^{2π} ∫₀¹ r²·r dr dθ = 2π × 1/4 = π/2."),
  j(M, "calculus", "M", 2, "For f(x, y) = x²y + y³, the value of ∂f/∂y at (1, 1) is:", ["2", "3", "4", "5"], "∂f/∂y = x² + 3y² = 1 + 3 = 4.", "1 + 3"),
  j(M, "vector-calculus", "H", 1, "For the unit circle C traversed anticlockwise, ∮ (x dy − y dx) equals:", ["π", "2π", "4π", "0"], "By Green's theorem the integral is 2 × (area enclosed) = 2π."),
  j(M, "vector-calculus", "M", 1, "For f = x² + y² + z², the magnitude of ∇f at (1, 2, 2) is:", ["3", "6", "9", "12"], "∇f = (2x, 2y, 2z) = (2, 4, 4) with magnitude √(4 + 16 + 16) = 6.", "Math.sqrt(4 + 16 + 16)"),
  j(M, "linear-algebra", "M", 1, "The rank of the matrix [[1, 2, 3], [2, 4, 6], [1, 0, 1]] is:", ["1", "2", "3", "0"], "Row 2 is twice row 1, while row 3 is independent of row 1, so the rank is 2."),
  j(M, "linear-algebra", "M", 0, "A 2 × 2 real matrix has trace 5 and determinant 4. Its eigenvalues are:", ["1 and 4", "2 and 3", "−1 and −4", "5 and 4"], "The eigenvalues satisfy λ² − 5λ + 4 = 0, so λ = 1 or 4."),
  j(M, "linear-algebra", "H", 2, "A real 4 × 6 matrix has rank 3. The dimension of its null space is:", ["1", "2", "3", "4"], "By rank–nullity, nullity = 6 − 3 = 3.", "6 - 3"),
  j(M, "linear-algebra", "H", 0, "The eigenvalues of the symmetric matrix [[3, 2], [2, 3]] are:", ["1 and 5", "2 and 3", "0 and 6", "−1 and 5"], "For [[a, b], [b, a]] the eigenvalues are a ± b, here 3 ± 2."),
  j(M, "linear-algebra", "M", 2, "If A is a 3 × 3 matrix with det A = 2, then det(3A) is:", ["6", "18", "54", "162"], "det(cA) = cⁿ det A with n = 3, so 27 × 2 = 54.", "27 * 2"),
  j(M, "differential-equations", "M", 1, "The initial value problem dy/dx = y, y(0) = 2 has the solution:", ["eˣ", "2eˣ", "e²ˣ", "2e⁻ˣ"], "y = Ceˣ and y(0) = C = 2."),
  j(M, "differential-equations", "M", 0, "The general solution of y″ − 3y′ + 2y = 0 is:", ["c₁eˣ + c₂e²ˣ", "c₁e⁻ˣ + c₂e⁻²ˣ", "c₁eˣ + c₂xeˣ", "c₁cos x + c₂sin 2x"], "The auxiliary equation m² − 3m + 2 = 0 has roots 1 and 2."),
  j(M, "differential-equations", "M", 1, "An integrating factor of dy/dx + (2/x) y = x² is:", ["x", "x²", "1/x²", "eˣ"], "IF = exp(∫ 2/x dx) = exp(2 ln x) = x²."),
  j(M, "differential-equations", "E", 0, "The order and degree of (d²y/dx²)³ + (dy/dx)⁴ = x are respectively:", ["2 and 3", "3 and 2", "2 and 4", "3 and 4"], "The highest derivative is of order 2 and it is raised to the power 3."),
  j(M, "abstract-algebra", "M", 1, "In the additive group ℤ₁₂, the order of the element 3 is:", ["3", "4", "6", "12"], "The order of k in ℤₙ is n/gcd(k, n) = 12/3 = 4.", "12 / 3"),
  j(M, "abstract-algebra", "H", 2, "How many subgroups does the cyclic group ℤ₁₂ (under addition) have?", ["4", "5", "6", "12"], "A cyclic group of order n has exactly one subgroup for each divisor of n; 12 has 6 divisors (1, 2, 3, 4, 6, 12).", "6"),
  j(M, "abstract-algebra", "H", 0, "A group of order 15 is:", ["Always cyclic", "Always non-abelian", "Never abelian", "Isomorphic to S₃ × ℤ₅"], "Since 15 = 3·5 and 3 does not divide 5 − 1, a group of order 15 has a normal Sylow subgroup of each order and is cyclic."),
  j(M, "abstract-algebra", "H", 2, "How many elements of order 2 does the permutation group S₃ contain?", ["1", "2", "3", "6"], "The elements of order 2 are the three transpositions."),
  j(M, "abstract-algebra", "M", 2, "Which of the following cannot be the order of a subgroup of a group of order 20?", ["4", "5", "8", "10"], "By Lagrange's theorem the order of a subgroup divides 20; 8 does not."),
  j(M, "abstract-algebra", "M", 1, "Which of the following rings is a field?", ["ℤ₆", "ℤ₇", "ℤ₈", "ℤ₉"], "ℤₙ is a field exactly when n is prime."),
  j(M, "real-analysis", "H", 2, "The limit superior of the sequence aₙ = (−1)ⁿ + 1/n is:", ["−1", "0", "1", "2"], "The even terms 1 + 1/n tend to 1 and the odd terms −1 + 1/n tend to −1, so lim sup = 1."),
  j(M, "real-analysis", "H", 2, "Which of the following functions is uniformly continuous on (0, 1)?", ["1/x", "sin(1/x)", "x²", "ln x"], "x² extends continuously to [0, 1], a compact set, so it is uniformly continuous; the others are unbounded or oscillate near 0."),
  j(M, "vector-calculus", "M", 0, "For a twice-differentiable vector field F, ∇·(∇ × F) equals:", ["0", "∇²F", "F", "∇(∇·F)"], "The divergence of a curl is identically zero."),
];
