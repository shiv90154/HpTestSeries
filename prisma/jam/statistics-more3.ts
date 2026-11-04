// IIT JAM Mathematical Statistics (MS) — Mocks 9 to 12: 30 MCQs each, written fresh: mathematics 6, probability 4, distributions 10, inference 10.
// Mock 12 is slightly above exam level.

import { j } from "./types";

const S = "jam-statistics";

export const jamStatisticsMock9 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "E", 1, "The value of ∫ from −1 to 1 of |x| dx is:", ["0", "1", "2", "1/2"], "The area is two triangles of area 1/2 each."),
  j(S, "maths-foundations", "M", 1, "The limit of n sin(1/n) as n → ∞ is:", ["0", "1", "∞", "π"], "sin h/h → 1 with h = 1/n."),
  j(S, "maths-foundations", "H", 1, "The sum of the series Σ n x^(n−1) for n ≥ 1 at x = 1/2 is:", ["2", "4", "1/4", "8"], "Σ n x^(n−1) = 1/(1 − x)², which is 4 at x = 1/2."),
  j(S, "maths-foundations", "M", 0, "For square matrices A and B of the same order, tr(AB) equals:", ["tr(BA)", "tr(A)·tr(B)", "det(A)·det(B)", "tr(A) + tr(B)"], "Both traces equal Σᵢⱼ aᵢⱼbⱼᵢ."),
  j(S, "maths-foundations", "M", 0, "The function f(x) = x⁴ − 2x² has local minima at:", ["x = ±1", "x = 0", "x = ±2", "x = 1 only"], "f′ = 4x(x² − 1) and f″(±1) = 8 > 0."),
  j(S, "maths-foundations", "M", 0, "For f(x, y) = eˣ sin y, the mixed partial ∂²f/∂x∂y at (0, π/2) is:", ["0", "1", "e", "−1"], "∂²f/∂x∂y = eˣ cos y, which is 0 at y = π/2."),
  // ───────── Probability ─────────
  j(S, "probability", "E", 2, "A fair coin is tossed repeatedly. The probability that the first head appears on the third toss is:", ["1/2", "1/4", "1/8", "3/8"], "(1/2)³ for tail, tail, head."),
  j(S, "probability", "M", 2, "Urn A has 2 white and 1 black ball; urn B has 1 white and 2 black. An urn is chosen at random and a white ball is drawn. The probability it came from urn A is:", ["1/3", "1/2", "2/3", "3/4"], "(½ · ⅔)/(½ · ⅔ + ½ · ⅓) = 2/3."),
  j(S, "probability", "M", 2, "Three distinct prizes are given to five students, and a student may receive any number of prizes. The number of ways is:", ["15", "60", "125", "243"], "Each prize can go to any of 5 students: 5³."),
  j(S, "probability", "E", 1, "A card is drawn from a standard deck. The probability that it is a king or a queen is:", ["1/13", "2/13", "4/13", "1/26"], "8 favourable cards out of 52."),
  // ───────── Distributions ─────────
  j(S, "distributions", "H", 1, "If X ~ Binomial(10, 0.5), then P(X ≤ 1) is:", ["1/1024", "11/1024", "10/1024", "1/2"], "(C(10, 0) + C(10, 1))/2¹⁰ = 11/1024."),
  j(S, "distributions", "H", 1, "If X ~ Poisson(λ), then E[X(X − 1)] equals:", ["λ", "λ²", "λ² + λ", "λ² − λ"], "The second factorial moment of a Poisson variable is λ²."),
  j(S, "distributions", "M", 0, "If X ~ N(0, 4), then P(|X| > 4) is approximately:", ["0.0456", "0.0228", "0.1587", "0.3174"], "|X| > 4 means |Z| > 2."),
  j(S, "distributions", "M", 0, "The sum of 5 independent exponential variables, each with rate 2, has mean:", ["5/2", "2/5", "10", "5"], "Each has mean 1/2, so the sum has mean 5/2."),
  j(S, "distributions", "M", 1, "The density f(x) = c x(1 − x) on (0, 1) is valid when c equals:", ["3", "6", "12", "1/6"], "∫₀¹ x(1 − x) dx = 1/6."),
  j(S, "distributions", "M", 1, "For the density 6x(1 − x) on (0, 1), the mean is:", ["1/3", "1/2", "2/3", "3/4"], "The density is symmetric about 1/2."),
  j(S, "distributions", "H", 0, "X and Y are independent with variance 1. The correlation between X and X + Y is:", ["1/√2", "1/2", "1", "0"], "Cov(X, X + Y) = 1 and the standard deviations are 1 and √2."),
  j(S, "distributions", "M", 2, "If X₁, X₂, X₃ are independent Uniform(0, 1), then P(max ≤ 1/2) is:", ["1/2", "1/4", "1/8", "3/8"], "All three must be at most 1/2, each with probability 1/2, so (1/2)³ = 1/8."),
  j(S, "distributions", "M", 1, "The variance of a t distribution with 5 degrees of freedom is:", ["1", "5/3", "5/2", "3/5"], "n/(n − 2) = 5/3."),
  j(S, "distributions", "E", 0, "If X ~ χ²(3) and Y ~ χ²(4) are independent, then X + Y follows:", ["χ²(7)", "χ²(12)", "χ²(1)", "F(3, 4)"], "Degrees of freedom add for independent chi-square variables."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "For a sample from Uniform(0, θ), the estimator 2X̄ is:", ["Unbiased for θ", "Biased upwards", "Biased downwards", "Inconsistent"], "E[2X̄] = 2 · θ/2 = θ."),
  j(S, "estimation-testing", "H", 0, "For a sample of size n from Uniform(0, θ), the variance of 2X̄ is:", ["θ²/(3n)", "θ²/(12n)", "θ²/n", "θ²/(6n)"], "Var(X) = θ²/12, so Var(2X̄) = 4θ²/(12n)."),
  j(S, "estimation-testing", "M", 0, "If a test has significance level α = 0.01, then P(reject H₀ | H₀ true) equals:", ["0.01", "0.99", "0.05", "0.5"], "This is the definition of the significance level."),
  j(S, "estimation-testing", "M", 0, "A confidence interval for a normal variance is based on the:", ["Chi-square distribution", "Normal distribution", "t distribution", "Binomial distribution"], "(n − 1)S²/σ² has a chi-square distribution."),
  j(S, "estimation-testing", "M", 1, "Two independent samples of size 18 each come from populations with σ = 6. The standard error of the difference of the sample means is:", ["1", "2", "4", "6"], "√(36/18 + 36/18) = √4."),
  j(S, "estimation-testing", "H", 1, "With a uniform prior and 7 successes in 10 Bernoulli trials, the posterior mean of p is:", ["7/10", "2/3", "3/4", "1/2"], "The posterior is Beta(8, 4), with mean 8/12."),
  j(S, "estimation-testing", "M", 0, "A test of H₀: σ² = σ₀² for a normal population uses the:", ["Chi-square distribution", "t distribution", "z test for proportions", "Mann–Whitney test"], "The statistic (n − 1)S²/σ₀² is chi-square under H₀."),
  j(S, "estimation-testing", "H", 0, "Under regularity conditions, √n(θ̂ − θ) for the MLE θ̂ is asymptotically distributed as:", ["N(0, 1/I(θ))", "N(0, I(θ))", "N(θ, 1)", "Chi-square"], "I(θ) is the Fisher information per observation."),
  j(S, "estimation-testing", "M", 1, "In a regression, SST = 100 and SSE = 20. The coefficient of determination is:", ["0.2", "0.8", "0.25", "1.25"], "R² = 1 − SSE/SST = 0.8."),
  j(S, "estimation-testing", "M", 0, "In one-way ANOVA with k groups, the mean square between groups is:", ["SSB/(k − 1)", "SSB/(N − k)", "SSB/N", "SSB/k"], "The between-group sum of squares has k − 1 degrees of freedom."),
];

export const jamStatisticsMock10 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 1, "Evaluate the integral of sin²x over the interval from 0 to π/2:", ["π/2", "π/4", "1", "π"], "sin²x = (1 − cos 2x)/2, giving π/4."),
  j(S, "maths-foundations", "E", 0, "The limit of x e^(−x) as x → ∞ is:", ["0", "1", "∞", "e"], "The exponential decay dominates the linear growth."),
  j(S, "maths-foundations", "H", 1, "The sum of the series Σ n/3ⁿ from n = 1 to ∞ is:", ["1/2", "3/4", "1", "3/2"], "Σ n xⁿ = x/(1 − x)², which at x = 1/3 equals (1/3)/(4/9) = 3/4."),
  j(S, "maths-foundations", "M", 1, "The real matrix [[0, 1], [−1, 0]] has eigenvalues:", ["±1", "±i", "0 and 1", "0 only"], "λ² + 1 = 0."),
  j(S, "maths-foundations", "M", 0, "The maximum of x + y subject to x² + y² = 2 is:", ["2", "√2", "4", "1"], "By symmetry the maximum is at x = y = 1."),
  j(S, "maths-foundations", "E", 1, "The value of ∫₀¹ ∫₀¹ xy dx dy is:", ["1/2", "1/4", "1/3", "1"], "(∫₀¹ x dx)² = 1/4."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 1, "P(A ∪ B) = 0.9, P(A) = 0.6 and P(B) = 0.5. The events A and B are:", ["Independent", "Not independent", "Mutually exclusive", "Identical"], "P(A ∩ B) = 0.2, which differs from P(A)P(B) = 0.3."),
  j(S, "probability", "M", 1, "Two dice are rolled. The probability that the larger number shown is 6 is:", ["1/6", "11/36", "1/3", "25/36"], "1 − (5/6)² = 11/36."),
  j(S, "probability", "M", 0, "A committee of 3 is chosen from 5 men and 4 women. The probability that it has 2 men and 1 woman is:", ["10/21", "5/21", "20/63", "2/3"], "C(5, 2) C(4, 1)/C(9, 3) = 40/84."),
  j(S, "probability", "E", 1, "For events A and B with P(B) > 0, P(A | B) + P(Aᶜ | B) equals:", ["0", "1", "1/2", "P(A)"], "Conditional probabilities of complementary events sum to 1."),
  // ───────── Distributions ─────────
  j(S, "distributions", "E", 0, "If X ~ Binomial(2, 0.9), then P(X = 2) is:", ["0.81", "0.9", "0.18", "0.99"], "Both of the two trials must succeed: 0.9 × 0.9 = 0.81."),
  j(S, "distributions", "M", 0, "If X is Poisson with mean 0.5, then P(X = 1) equals:", ["0.5e^(−0.5)", "e^(−0.5)", "0.25e^(−0.5)", "0.5e^(0.5)"], "P(X = 1) = λe^(−λ)."),
  j(S, "distributions", "M", 2, "For X ~ N(μ, σ²), P(|X − μ| < 3σ) is approximately:", ["0.68", "0.95", "0.997", "0.999999"], "This is the three-sigma rule."),
  j(S, "distributions", "H", 1, "The coefficient of variation (standard deviation divided by mean) of an exponential distribution is:", ["0.5", "1", "2", "λ"], "Both the mean and the standard deviation equal 1/λ."),
  j(S, "distributions", "M", 0, "If X is exponential with rate 1, then P(1 < X < 2) is:", ["e⁻¹ − e⁻²", "e⁻² − e⁻¹", "1 − e⁻²", "e⁻¹"], "P(X > 1) − P(X > 2)."),
  j(S, "distributions", "M", 0, "If X₁, …, Xₙ are independent N(0, 1), then ΣXᵢ² follows:", ["χ²(n)", "χ²(n − 1)", "N(0, n)", "t(n)"], "This is the definition of the chi-square distribution."),
  j(S, "distributions", "M", 1, "The identity E[X + Y] = E[X] + E[Y] holds:", ["Only if X and Y are independent", "Always", "Only if X and Y are uncorrelated", "Never"], "Expectation is linear."),
  j(S, "distributions", "M", 0, "If (X, Y) is bivariate normal, the regression E[Y | X = x] is:", ["Linear in x", "Quadratic in x", "Constant", "Exponential in x"], "E[Y | X = x] = μ_Y + ρ(σ_Y/σ_X)(x − μ_X)."),
  j(S, "distributions", "M", 1, "The variance of a Beta(1, 1) distribution is:", ["1/4", "1/12", "1/6", "1/3"], "Beta(1, 1) is Uniform(0, 1)."),
  j(S, "distributions", "M", 1, "X and Y are independent Exponential(1) variables. Then P(X < Y) is:", ["1/4", "1/2", "1/3", "1"], "By symmetry, and ties have probability zero."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "The sample variance S² with divisor n − 1 satisfies E[S²] =", ["σ²", "σ²(n − 1)/n", "σ", "nσ²"], "S² is unbiased for σ²."),
  j(S, "estimation-testing", "M", 0, "The Mann–Whitney test is used to compare two:", ["Independent samples without assuming normality", "Variances", "Proportions only", "Correlated pairs"], "It is a rank-based test of location."),
  j(S, "estimation-testing", "M", 1, "The width of a 95% confidence interval for a mean with σ = 10 and n = 100 is:", ["1.96", "3.92", "19.6", "0.98"], "2 × 1.96 × 10/10."),
  j(S, "estimation-testing", "M", 0, "The likelihood ratio test statistic compares:", ["The maximised likelihoods under H₀ and over the whole parameter space", "Only the p-values", "Prior probabilities", "The residuals only"], "Λ = sup over H₀ of L divided by sup over all θ of L."),
  j(S, "estimation-testing", "H", 1, "For a sample of size n from N(μ, σ²), the Cramér–Rao lower bound for an unbiased estimator of σ² is:", ["σ⁴/n", "2σ⁴/n", "σ²/n", "2σ²/n"], "The Fisher information for σ² per observation is 1/(2σ⁴)."),
  j(S, "estimation-testing", "M", 0, "In a linear regression with an intercept, the sum of the residuals is:", ["0", "n", "1", "Σy"], "The normal equation for the intercept forces Σeᵢ = 0."),
  j(S, "estimation-testing", "M", 0, "A rule of thumb for the chi-square approximation to be reliable is that:", ["Expected frequencies are about 5 or more", "Observed counts are all equal", "The sample is normal", "n is below 30"], "Small expected counts make the approximation poor."),
  j(S, "estimation-testing", "M", 0, "One-way ANOVA assumes:", ["Independent normal errors with equal variances", "Unequal sample sizes", "A perfect correlation", "Discrete responses only"], "These are the standard model assumptions."),
  j(S, "estimation-testing", "M", 0, "The Kolmogorov–Smirnov test compares:", ["An empirical distribution function with a specified distribution function", "Two means", "Two variances", "A correlation with zero"], "The statistic is the maximum absolute difference between the two distribution functions."),
  j(S, "estimation-testing", "H", 0, "Under squared-error loss, the Bayes estimator of a parameter is the:", ["Posterior mean", "Posterior mode", "Posterior median", "Prior mean"], "The posterior mean minimises the posterior expected squared error."),
];

export const jamStatisticsMock11 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 0, "The limit of sin 2x / sin 3x as x → 0 is:", ["2/3", "3/2", "1", "0"], "sin 2x ≈ 2x and sin 3x ≈ 3x."),
  j(S, "maths-foundations", "E", 1, "The value of ∫₀¹ (1 − x)³ dx is:", ["1/3", "1/4", "1/2", "3/4"], "The substitution u = 1 − x gives ∫₀¹ u³ du."),
  j(S, "maths-foundations", "H", 2, "The sum of the series Σ (n + 1)/2ⁿ from n = 0 to ∞ is:", ["2", "3", "4", "6"], "Σ (n + 1)xⁿ = 1/(1 − x)², which at x = 1/2 is 4."),
  j(S, "maths-foundations", "E", 0, "If det A = 3 and det B = −2 for 3 × 3 matrices, then det(AB) is:", ["−6", "6", "1", "−1"], "det(AB) = det A · det B."),
  j(S, "maths-foundations", "H", 1, "The critical point of f(x, y) = x² + xy + y² − 3x is:", ["(1, 1)", "(2, −1)", "(3, 0)", "(−2, 1)"], "f_x = 2x + y − 3 = 0 and f_y = x + 2y = 0 give x = 2, y = −1."),
  j(S, "maths-foundations", "M", 1, "Using ln(1 + x) ≈ x − x²/2, the value of ln 1.1 is about:", ["0.100", "0.095", "0.105", "0.090"], "0.1 − 0.005 = 0.095."),
  // ───────── Probability ─────────
  j(S, "probability", "H", 1, "Three fair dice are rolled. The probability that the sum is 9 is:", ["1/9", "25/216", "1/8", "5/36"], "There are 25 ordered outcomes summing to 9."),
  j(S, "probability", "M", 0, "If A and B are independent, then A and Bᶜ are:", ["Independent", "Mutually exclusive", "Identical", "Dependent"], "P(A ∩ Bᶜ) = P(A) − P(A)P(B) = P(A)P(Bᶜ)."),
  j(S, "probability", "H", 1, "The expected number of fixed points of a random permutation of n objects is:", ["1/n", "1", "n/2", "n"], "Each of the n positions is fixed with probability 1/n."),
  j(S, "probability", "M", 0, "If P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2, the probability that exactly one of A and B occurs is:", ["0.5", "0.7", "0.3", "0.9"], "0.5 + 0.4 − 2 × 0.2."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 0, "If X ~ Binomial(3, 1/3), then P(X = 1) is:", ["4/9", "1/3", "2/9", "8/27"], "3 × (1/3) × (2/3)² = 4/9."),
  j(S, "distributions", "M", 1, "If X is Poisson with mean 3, then Var(2X + 1) is:", ["6", "12", "7", "9"], "4 × Var(X) = 12."),
  j(S, "distributions", "H", 0, "For Z ~ N(0, 1), E|Z| equals:", ["√(2/π)", "1", "1/√(2π)", "2/π"], "E|Z| = 2∫₀^∞ z φ(z) dz = 2φ(0)."),
  j(S, "distributions", "M", 0, "If X is exponential with rate 1, then P(X > 2 | X > 1) equals:", ["e⁻¹", "e⁻²", "1 − e⁻¹", "1/2"], "By the memoryless property this is P(X > 1)."),
  j(S, "distributions", "E", 1, "The mean of a discrete uniform distribution on {1, 2, …, 10} is:", ["5", "5.5", "6", "10"], "The mean of a discrete uniform on 1..n is (n + 1)/2 = 11/2."),
  j(S, "distributions", "H", 0, "For random variables X and Y, Cov(X + Y, X − Y) equals:", ["Var(X) − Var(Y)", "Var(X) + Var(Y)", "0 always", "2 Cov(X, Y)"], "Cov(X + Y, X − Y) = Var(X) − Var(Y), as the cross terms cancel."),
  j(S, "distributions", "M", 0, "The t distribution with 1 degree of freedom is the:", ["Cauchy distribution", "Normal distribution", "Uniform distribution", "Exponential distribution"], "It is the ratio of two independent standard normals."),
  j(S, "distributions", "M", 0, "The maximum of n independent Uniform(0, 1) variables has density:", ["n x^(n−1)", "n(1 − x)^(n−1)", "1/n", "x^n"], "The distribution function is xⁿ."),
  j(S, "distributions", "M", 0, "Arrivals form a Poisson process with rate 2 per hour. The probability of no arrival in 30 minutes is:", ["e⁻¹", "e⁻²", "1/2", "1 − e⁻¹"], "The mean number of arrivals in 30 minutes is 1."),
  j(S, "distributions", "E", 1, "The joint pmf of (X, Y) is P(0,0) = 0.3, P(0,1) = 0.2, P(1,0) = 0.1 and P(1,1) = 0.4. Then P(Y = 1) is:", ["0.4", "0.6", "0.5", "0.2"], "P(Y = 1) = P(0, 1) + P(1, 1) = 0.2 + 0.4 = 0.6."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "For a sample from N(0, σ²), the MLE of σ² is:", ["ΣXᵢ²/n", "ΣXᵢ²/(n − 1)", "(ΣXᵢ)²/n", "ΣXᵢ/n"], "The log-likelihood is maximised where σ² equals the mean of the squares."),
  j(S, "estimation-testing", "M", 0, "Compared with a 95% confidence interval from the same data, a 90% interval is:", ["Narrower", "Wider", "The same width", "Not comparable"], "A lower confidence level uses a smaller critical value."),
  j(S, "estimation-testing", "H", 1, "For normal data, the asymptotic relative efficiency of the sample median compared with the sample mean is:", ["π/2", "2/π", "1", "1/2"], "The median's asymptotic variance is (π/2)σ²/n against σ²/n for the mean."),
  j(S, "estimation-testing", "M", 0, "Fisher's exact test is used for:", ["Small 2 × 2 contingency tables", "Large normal samples", "Regression slopes", "Time series"], "It computes exact hypergeometric probabilities."),
  j(S, "estimation-testing", "M", 0, "In the bootstrap method, resamples are drawn:", ["From the observed sample with replacement", "From the population without replacement", "Only from a normal distribution", "As subsets without replacement"], "This mimics repeated sampling from the empirical distribution."),
  j(S, "estimation-testing", "H", 0, "X is Poisson with mean 1 under H₀, and H₀ is rejected when X ≥ 3. The size of the test is:", ["0.0803", "0.9197", "0.0613", "0.3679"], "1 − e⁻¹(1 + 1 + 1/2) = 1 − 0.9197."),
  j(S, "estimation-testing", "M", 0, "Under the Gauss–Markov conditions, the ordinary least squares estimator is:", ["Best linear unbiased", "Best among all estimators", "The maximum likelihood estimator only", "Biased but consistent"], "This is the content of the Gauss–Markov theorem."),
  j(S, "estimation-testing", "M", 0, "A hypothesis H₀: μ = μ₀ is rejected at the 5% level exactly when μ₀ lies:", ["Outside the 95% confidence interval", "Inside the 95% confidence interval", "At its midpoint", "At the sample mean"], "Confidence intervals and two-sided tests are dual."),
  j(S, "estimation-testing", "M", 0, "Multicollinearity in regression refers to:", ["Strong linear relationships among the predictors", "Non-normal errors", "Errors with unequal variances", "Outliers in the response"], "It inflates the variance of the estimated coefficients."),
  j(S, "estimation-testing", "M", 0, "For n independent observations, the Fisher information equals:", ["n I(θ)", "I(θ)/n", "I(θ)²", "√n I(θ)"], "Information is additive over independent observations."),
];

export const jamStatisticsMock12 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "H", 0, "The limit of (eˣ − 1 − x − x²/2)/x³ as x → 0 is:", ["1/6", "1/2", "1/3", "0"], "The next Maclaurin term is x³/6."),
  j(S, "maths-foundations", "H", 1, "The value of ∫ from −∞ to ∞ of e^(−x²/2) dx is:", ["√π", "√(2π)", "2π", "1"], "This is the Gaussian integral, equal to 1/φ(0)."),
  j(S, "maths-foundations", "M", 0, "The sum of the series Σ 1/n² from n = 1 to ∞ is:", ["π²/6", "π²/3", "π/2", "π²/12"], "This is Euler's result, ζ(2)."),
  j(S, "maths-foundations", "H", 0, "A 2 × 2 invertible matrix A satisfies A² − 3A + 2I = 0. Then A⁻¹ equals:", ["(3I − A)/2", "(A − 3I)/2", "3I − A", "(A + 3I)/2"], "Rewriting, A(3I − A) = 2I."),
  j(S, "maths-foundations", "M", 0, "The function f(x, y) = x² + xy + y² has at the origin a:", ["Local minimum", "Local maximum", "Saddle point", "Inconclusive test"], "The Hessian [[2, 1], [1, 2]] is positive definite."),
  j(S, "maths-foundations", "H", 0, "The value of the Beta function B(2, 3) is:", ["1/12", "1/6", "1/4", "1/24"], "B(2, 3) = Γ(2)Γ(3)/Γ(5) = 1 · 2/24."),
  // ───────── Probability ─────────
  j(S, "probability", "H", 2, "A fair die is rolled until a 6 appears. The probability that more than two rolls are needed is:", ["1/36", "11/36", "25/36", "5/6"], "The first two rolls must both be non-6: (5/6)²."),
  j(S, "probability", "H", 1, "A fair die is rolled three times. The probability that the maximum is exactly 4 is:", ["1/6", "37/216", "27/216", "1/3"], "(4³ − 3³)/6³ = 37/216."),
  j(S, "probability", "M", 2, "In the Monty Hall problem, the probability of winning by switching doors is:", ["1/3", "1/2", "2/3", "1"], "The first choice is right with probability 1/3, so switching wins the other 2/3."),
  j(S, "probability", "H", 1, "The probability that, among three people, at least two share a birthday (365 equally likely days) is about:", ["0.27%", "0.82%", "8.2%", "2.7%"], "1 − (364 × 363)/365² ≈ 0.0082."),
  // ───────── Distributions ─────────
  j(S, "distributions", "H", 1, "Given Y, X is Poisson with mean Y, and Y is exponential with mean 1. Then Var(X) is:", ["1", "2", "3", "1/2"], "Var(X) = E[Y] + Var(Y) = 1 + 1."),
  j(S, "distributions", "H", 0, "For a sample of size n from N(μ, σ²), Var(S²) equals:", ["2σ⁴/(n − 1)", "2σ⁴/n", "σ⁴/(n − 1)", "σ⁴/n"], "(n − 1)S²/σ² ~ χ²(n − 1) has variance 2(n − 1)."),
  j(S, "distributions", "H", 0, "If X and Y are independent Exponential(1) variables, then X/(X + Y) follows:", ["Uniform(0, 1)", "Exponential", "Beta(2, 2)", "Normal"], "It is Beta(1, 1), which is the uniform distribution."),
  j(S, "distributions", "H", 0, "If X ~ Gamma(2, 1) and Y ~ Gamma(3, 1) are independent, then X/(X + Y) follows:", ["Beta(2, 3)", "Beta(3, 2)", "Gamma(5, 1)", "F(2, 3)"], "This is the standard beta–gamma relation."),
  j(S, "distributions", "H", 0, "For a bivariate normal pair (X, Y) with correlation ρ, Var(Y | X = x) equals:", ["σ_Y²(1 − ρ²)", "σ_Y² ρ²", "σ_Y²(1 + ρ²)", "σ_Y²"], "The conditional variance is reduced by the proportion ρ² explained by X."),
  j(S, "distributions", "M", 1, "X is non-negative with E[X] = 2. By Markov's inequality, P(X ≥ 8) is at most:", ["1/8", "1/4", "1/2", "1/16"], "E[X]/8 = 1/4."),
  j(S, "distributions", "M", 0, "Convergence in probability of the sample mean to the population mean is guaranteed by:", ["The weak law of large numbers", "The central limit theorem", "Chebyshev's rule for normal data only", "Slutsky's theorem alone"], "The weak law states exactly this convergence."),
  j(S, "distributions", "H", 1, "The expected value of the second smallest of three independent Uniform(0, 1) variables is:", ["1/3", "1/2", "2/3", "1/4"], "The kth order statistic of n uniforms has mean k/(n + 1) = 2/4."),
  j(S, "distributions", "H", 1, "The joint density of (X, Y) is x + y on the unit square. Then P(X + Y < 1) is:", ["1/6", "1/3", "1/2", "2/3"], "∫₀¹ [x(1 − x) + (1 − x)²/2] dx = 1/6 + 1/6."),
  j(S, "distributions", "M", 0, "The moment generating function of a Gamma(α, rate λ) distribution is:", ["(λ/(λ − t))^α", "(1 − λt)^α", "exp(αt/λ)", "α/(λ − t)"], "For t < λ, M(t) = (1 − t/λ)^(−α)."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "H", 0, "The Cramér–Rao inequality does not apply to estimation of θ from a Uniform(0, θ) sample because:", ["The support of the distribution depends on θ", "The estimator is biased", "The sample is too small", "The variance is infinite"], "The regularity condition permitting differentiation under the integral fails."),
  j(S, "estimation-testing", "H", 0, "For a sample of size n from Uniform(0, θ), the UMVUE of θ is:", ["((n + 1)/n) max Xᵢ", "2X̄", "max Xᵢ", "X̄"], "The maximum is complete and sufficient, and its expectation is nθ/(n + 1)."),
  j(S, "estimation-testing", "M", 0, "For a Bernoulli(p) sample of size n, the asymptotic variance of the MLE of p is:", ["p(1 − p)/n", "p/n", "1/(np)", "n p(1 − p)"], "The inverse of the Fisher information n/(p(1 − p))."),
  j(S, "estimation-testing", "H", 0, "Under the null hypothesis, the Wald, likelihood ratio and score tests are:", ["Asymptotically equivalent", "Identical for every sample size", "Always in conflict", "Valid for normal data only"], "They share the same limiting chi-square distribution."),
  j(S, "estimation-testing", "H", 1, "To test H₀: μ = 0 against H₁: μ = 1 for N(μ, 1) with n = 4, the test rejects when X̄ > 0.8225. Its power is about:", ["0.36", "0.64", "0.95", "0.50"], "P(X̄ > 0.8225 | μ = 1) = P(Z > (0.8225 − 1)/0.5) = P(Z > −0.355)."),
  j(S, "estimation-testing", "H", 1, "A single observation x is taken from N(μ, 1) with prior μ ~ N(0, 1). The posterior mean of μ is:", ["x", "x/2", "2x", "0"], "Equal prior and data precisions give a posterior mean of x/2."),
  j(S, "estimation-testing", "M", 0, "For a sample from N(μ, σ²) with both parameters unknown, a sufficient statistic is:", ["(ΣXᵢ, ΣXᵢ²)", "ΣXᵢ only", "ΣXᵢ² only", "The sample median and range"], "The normal density is a two-parameter exponential family."),
  j(S, "estimation-testing", "M", 1, "A sample of 11 observations has S² = 8. The test statistic for H₀: σ² = 4 is:", ["10", "20", "22", "2"], "(n − 1)S²/σ₀² = 10 × 8/4."),
  j(S, "estimation-testing", "M", 1, "In simple regression r = 0.5, s_y = 4 and s_x = 2. The least-squares slope is:", ["0.25", "1", "4", "2"], "b = r · s_y/s_x = 0.5 × 2."),
  j(S, "estimation-testing", "M", 0, "Simpson's paradox refers to the fact that:", ["Aggregating data can reverse a trend present in every subgroup", "Correlation implies causation", "The mean always equals the median", "The variance equals the mean"], "A lurking grouping variable can change the direction of the association."),
];
