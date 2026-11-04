// IIT JAM Mathematical Statistics (MS) — Mocks 5 to 8: 30 MCQs each, written fresh: mathematics 6, probability 4, distributions 10, inference 10.

import { j } from "./types";

const S = "jam-statistics";

export const jamStatisticsMock5 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 1, "The limit of (1 − cos 2x)/x² as x → 0 is:", ["1", "2", "4", "1/2"], "1 − cos 2x = 2 sin²x ≈ 2x², so the limit is 2."),
  j(S, "maths-foundations", "H", 0, "The value of ∫₁^e x ln x dx is:", ["(e² + 1)/4", "e²/2", "(e² − 1)/4", "1/4"], "By parts: [x²ln x/2 − x²/4] from 1 to e = e²/4 + 1/4."),
  j(S, "maths-foundations", "E", 1, "The sum of the series Σ 1/4ⁿ for n = 1 to ∞ is:", ["1/4", "1/3", "1/2", "3/4"], "A geometric series with first term 1/4 and ratio 1/4: (1/4)/(3/4) = 1/3."),
  j(S, "maths-foundations", "M", 1, "The eigenvalues of [[1, 1], [1, 1]] are:", ["0 and 1", "0 and 2", "1 and 1", "1 and 2"], "The trace is 2 and the determinant is 0."),
  j(S, "maths-foundations", "M", 0, "The local minimum value of f(x) = x³ − 3x is:", ["−2", "2", "0", "−3"], "f′ = 3x² − 3 vanishes at x = ±1; f″(1) > 0 and f(1) = 1 − 3 = −2."),
  j(S, "maths-foundations", "M", 1, "The solution space of the system x + y + z = 0, x − y = 0 in ℝ³ has dimension:", ["0", "1", "2", "3"], "Two independent equations in three unknowns leave one free variable."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 0, "A and B are independent with P(A) = 1/3 and P(B) = 1/4. The probability that neither occurs is:", ["1/2", "7/12", "5/12", "1/12"], "(1 − 1/3)(1 − 1/4) = (2/3)(3/4) = 1/2."),
  j(S, "probability", "H", 0, "The number of distinct arrangements of the letters of STATISTICS is:", ["50400", "151200", "3628800", "25200"], "10!/(3! 3! 2!) because S and T each repeat three times and I twice."),
  j(S, "probability", "M", 0, "A bag has 4 red and 6 black balls. Three are drawn without replacement. The probability that all are red is:", ["1/30", "1/6", "2/15", "1/10"], "C(4, 3)/C(10, 3) = 4/120 = 1/30."),
  j(S, "probability", "E", 1, "If P(A | B) = P(A), the events A and B are:", ["Mutually exclusive", "Independent", "Complementary", "Exhaustive"], "Knowing B does not change the probability of A."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 0, "The variance of a Binomial(20, 0.25) random variable is:", ["3.75", "5", "1.25", "15"], "np(1 − p) = 20 × 0.25 × 0.75."),
  j(S, "distributions", "M", 1, "If X is Poisson with mean 4, then P(X = 2) equals:", ["4e⁻⁴", "8e⁻⁴", "16e⁻⁴", "2e⁻⁴"], "e⁻⁴ · 4²/2! = 8e⁻⁴."),
  j(S, "distributions", "M", 0, "If X follows N(100, 16), then P(X < 92) is approximately:", ["0.0228", "0.1587", "0.0013", "0.05"], "92 is two standard deviations below the mean."),
  j(S, "distributions", "M", 1, "If X is exponential with mean 10, then P(X < 10) is:", ["e⁻¹", "1 − e⁻¹", "1/10", "1 − e⁻¹⁰"], "P(X < x) = 1 − e^(−x/10)."),
  j(S, "distributions", "M", 0, "A random variable has density 3x² on (0, 1). Then P(X < 1/2) equals:", ["1/8", "1/4", "1/2", "3/8"], "The distribution function is x³, which equals 1/8 at x = 1/2."),
  j(S, "distributions", "E", 0, "If E[X] = 3 and E[X²] = 13, then Var(X) is:", ["4", "10", "16", "9"], "Var = E[X²] − (E[X])² = 13 − 9."),
  j(S, "distributions", "H", 0, "X and Y are independent with E[X] = 2, E[Y] = 3, Var(X) = 1 and Var(Y) = 2. Then Var(XY) is:", ["19", "6", "11", "2"], "E[X²]E[Y²] − (E[X]E[Y])² = (1 + 4)(2 + 9) − 36 = 55 − 36."),
  j(S, "distributions", "M", 0, "If Z ~ N(0, 1) and U ~ χ²(n) are independent, then Z/√(U/n) follows:", ["A t distribution with n degrees of freedom", "A chi-square distribution with n degrees of freedom", "An F distribution with (1, n) degrees of freedom", "A Cauchy distribution for every n"], "This is the definition of Student's t distribution."),
  j(S, "distributions", "M", 1, "If F follows an F distribution with (3, 7) degrees of freedom, then 1/F follows:", ["F(3, 7)", "F(7, 3)", "t with 7 degrees of freedom", "χ² with 3 degrees of freedom"], "Interchanging numerator and denominator reverses the degrees of freedom."),
  j(S, "distributions", "M", 1, "If X is the total score when three fair dice are rolled, then E[X] equals:", ["9", "10.5", "12", "7"], "Each die has mean 3.5, so the sum has mean 3 × 3.5 = 10.5."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "H", 1, "A sample of 9 observations from a normal population has mean 5 and standard deviation 3. Given t₀.₀₂₅,₈ = 2.306, the 95% confidence interval for μ has half-width:", ["1.96", "2.306", "6.9", "0.77"], "Half-width = t · s/√n = 2.306 × 3/3."),
  j(S, "estimation-testing", "M", 0, "If the significance level α of a test is increased (other things fixed), the probability of a Type II error:", ["Decreases", "Increases", "Is unchanged", "Becomes 1"], "A larger rejection region makes it easier to reject a false H₀."),
  j(S, "estimation-testing", "M", 2, "To estimate a mean to within ±1 with 95% confidence when σ = 5, the smallest sample size is:", ["25", "50", "97", "196"], "n ≥ (1.96 × 5/1)² = 96.04, so n = 97."),
  j(S, "estimation-testing", "M", 0, "If θ̂ is the maximum likelihood estimator of θ, the MLE of θ² is:", ["θ̂²", "√θ̂", "2θ̂", "θ̂"], "This is the invariance property of the MLE."),
  j(S, "estimation-testing", "M", 1, "A coin is tossed 100 times and shows 60 heads. The z statistic for testing H₀: p = 0.5 is:", ["1", "2", "0.2", "4"], "z = (0.6 − 0.5)/√(0.25/100) = 0.1/0.05."),
  j(S, "estimation-testing", "M", 0, "Which of the following is a non-parametric test?", ["The Wilcoxon signed-rank test", "The paired t-test", "The z test for a mean", "The F test for variances"], "The signed-rank test does not assume a normal population."),
  j(S, "estimation-testing", "H", 0, "For a sample from N(μ, σ²) with σ² known, the UMVUE of μ is:", ["The sample mean", "The sample median", "The first observation", "The square of the sample mean"], "X̄ is unbiased, complete and sufficient, so by Lehmann–Scheffé it is the UMVUE."),
  j(S, "estimation-testing", "H", 1, "With a Beta(2, 2) prior and 3 successes in 4 Bernoulli trials, the posterior mean of p is:", ["3/4", "5/8", "1/2", "3/5"], "The posterior is Beta(5, 3), whose mean is 5/8."),
  j(S, "estimation-testing", "M", 1, "For a fixed sample, a 99% confidence interval is _____ a 95% confidence interval.", ["Narrower than", "Wider than", "The same width as", "Not comparable with"], "Higher confidence requires a larger critical value."),
  j(S, "estimation-testing", "M", 1, "In a one-way ANOVA with 3 groups and 30 observations in all, the F statistic has degrees of freedom:", ["(3, 30)", "(2, 27)", "(3, 27)", "(2, 29)"], "Between groups k − 1 = 2; within groups N − k = 27."),
];

export const jamStatisticsMock6 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "H", 0, "The limit of (sin x − x)/x³ as x → 0 is:", ["−1/6", "1/6", "−1/3", "0"], "sin x − x = −x³/6 + …"),
  j(S, "maths-foundations", "E", 1, "The value of ∫₀^(π/2) sin x cos x dx is:", ["1", "1/2", "1/4", "π/4"], "With u = sin x, the integral is ∫₀¹ u du = 1/2."),
  j(S, "maths-foundations", "M", 1, "The sum of the series Σ (−1)ⁿ/n! from n = 0 to ∞ is:", ["e", "1/e", "0", "1"], "It is the Maclaurin series of eˣ at x = −1."),
  j(S, "maths-foundations", "M", 2, "If A is a 3 × 3 matrix with det A = 2, then det(2A) is:", ["4", "8", "16", "6"], "det(cA) = c³ det A = 8 × 2."),
  j(S, "maths-foundations", "M", 1, "The maximum value of xy subject to x + 2y = 8 is:", ["4", "8", "16", "6"], "With x = 8 − 2y, xy = 8y − 2y² is maximised at y = 2, giving 8."),
  j(S, "maths-foundations", "M", 1, "For f(x, y) = e^(xy), the value of ∂f/∂y at (1, 0) is:", ["0", "1", "e", "2"], "∂f/∂y = x e^(xy), which is 1 at (1, 0)."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 1, "A bag holds 3 red and 2 blue balls. Two are drawn with replacement. The probability that both have the same colour is:", ["12/25", "13/25", "1/2", "2/5"], "(3/5)² + (2/5)² = 9/25 + 4/25."),
  j(S, "probability", "H", 0, "Five letters are put at random into five addressed envelopes, one per envelope. The probability that exactly four are in the correct envelope is:", ["0", "1/120", "1/5", "4/5"], "If four are correct, the fifth must also be correct."),
  j(S, "probability", "E", 1, "A and B are mutually exclusive with P(A) = 0.3 and P(B) = 0.5. Then P(A ∪ B) is:", ["0.15", "0.8", "0.2", "0.65"], "For mutually exclusive events the probabilities add."),
  j(S, "probability", "M", 1, "If P(A | B) = 0.5 and P(B) = 0.4, then P(A ∩ B) is:", ["0.9", "0.2", "0.8", "0.1"], "P(A ∩ B) = P(A | B)P(B) = 0.5 × 0.4."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 1, "If X follows Binomial(4, 1/2), then P(X ≥ 3) is:", ["1/4", "5/16", "3/8", "11/16"], "(C(4, 3) + C(4, 4))/16 = 5/16."),
  j(S, "distributions", "M", 0, "The number of trials to the first success is geometric with p = 0.2. Then P(X > 3) is:", ["0.512", "0.488", "0.2", "0.64"], "Three initial failures: 0.8³ = 0.512."),
  j(S, "distributions", "M", 0, "If Z follows N(0, 1), then P(−1 < Z < 2) is approximately:", ["0.8185", "0.6826", "0.9544", "0.8413"], "Φ(2) − Φ(−1) = 0.9772 − 0.1587."),
  j(S, "distributions", "E", 1, "If X follows Uniform(0, 10), then P(3 < X < 7) is:", ["0.3", "0.4", "0.7", "0.5"], "The interval has length 4 out of 10."),
  j(S, "distributions", "M", 1, "An exponential random variable with rate 0.5 has variance:", ["2", "4", "0.25", "0.5"], "Var = 1/λ² = 1/0.25 = 4."),
  j(S, "distributions", "M", 2, "If X ~ N(1, 4) and Y = 3 − 2X, then Var(Y) is:", ["4", "8", "16", "12"], "Var(Y) = (−2)² × 4 = 16."),
  j(S, "distributions", "M", 0, "For jointly (bivariate) normal random variables X and Y, zero correlation implies:", ["Independence", "Equal means", "Equal variances", "X = Y"], "For the bivariate normal distribution, the joint density factorises when ρ = 0."),
  j(S, "distributions", "H", 0, "If X follows Uniform(0, 1), then −ln X follows:", ["Exponential with mean 1", "Uniform(0, 1)", "A normal distribution", "Gamma(2, 1)"], "P(−ln X > t) = P(X < e^(−t)) = e^(−t)."),
  j(S, "distributions", "H", 2, "The minimum of 4 independent exponential random variables, each with rate 2, is exponential with rate:", ["2", "4", "8", "1/2"], "The rates add: 4 × 2 = 8."),
  j(S, "distributions", "M", 0, "A random variable is uniformly distributed on (−1, 1). Its variance is:", ["1/3", "1/12", "1/4", "1"], "(b − a)²/12 = 4/12 = 1/3."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 1, "In a two-sided z test, the observed statistic is z = 2.33. The p-value is about:", ["0.0099", "0.0198", "0.05", "0.99"], "The upper tail beyond 2.33 is 0.0099; doubling gives 0.0198."),
  j(S, "estimation-testing", "E", 0, "Student's t statistic is used for testing H₀: μ = μ₀ when:", ["σ is unknown and the population is normal", "σ is known", "The data are categorical", "n is large and the data are non-normal"], "The unknown σ is replaced by the sample standard deviation."),
  j(S, "estimation-testing", "M", 1, "Two unbiased estimators of the same parameter have variances 4 and 2. The more efficient one has variance:", ["4", "2", "Both are equally efficient", "Neither"], "Among unbiased estimators, the smaller variance is more efficient."),
  j(S, "estimation-testing", "H", 1, "For a sample of size n from Uniform(0, θ), the expected value of the sample maximum is:", ["θ/2", "nθ/(n + 1)", "θ", "θ/(n + 1)"], "The maximum has density n xⁿ⁻¹/θⁿ, giving E = nθ/(n + 1)."),
  j(S, "estimation-testing", "M", 0, "A 95% confidence interval means that:", ["95% of such intervals from repeated samples would contain the true parameter", "The parameter lies in this particular interval with probability 0.95", "95% of the data lie in the interval", "The estimator is 95% accurate"], "The probability statement refers to the procedure, not to one realised interval."),
  j(S, "estimation-testing", "M", 0, "For a sample of size n from a normal distribution, (n − 1)S²/σ² follows:", ["χ²(n − 1)", "χ²(n)", "t(n − 1)", "N(0, 1)"], "This is the standard result on the distribution of the sample variance."),
  j(S, "estimation-testing", "H", 1, "To test H₀: μ = 0 against H₁: μ = 1 for N(μ, 1) with n = 4, the test rejects when X̄ > c. For size 0.05, c equals:", ["1.645", "0.8225", "0.4", "1.96"], "Under H₀, X̄ ~ N(0, 1/4), so c = 1.645 × 0.5."),
  j(S, "estimation-testing", "M", 1, "In simple linear regression, Sxy = 20 and Sxx = 10. The least-squares slope is:", ["0.5", "2", "10", "200"], "b = Sxy/Sxx = 2."),
  j(S, "estimation-testing", "M", 0, "If Sxy = 20, Sxx = 25 and Syy = 64, the sample correlation coefficient is:", ["0.5", "0.25", "0.8", "1"], "r = 20/√(25 × 64) = 20/40."),
  j(S, "estimation-testing", "M", 0, "For a sample from N(μ, σ²) with μ known, an unbiased estimator of σ² is:", ["Σ(Xᵢ − μ)²/n", "Σ(Xᵢ − μ)²/(n − 1)", "Σ(Xᵢ − X̄)²/n", "Σ(Xᵢ − μ)/n"], "Each (Xᵢ − μ)² has expectation σ²."),
];

export const jamStatisticsMock7 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 0, "The limit of (e^(3x) − 1)/(2x) as x → 0 is:", ["3/2", "3", "2/3", "1"], "(e^(3x) − 1)/x → 3, so dividing by 2 gives 3/2."),
  j(S, "maths-foundations", "M", 1, "The value of ∫₀¹ x²(1 − x) dx is:", ["1/6", "1/12", "1/3", "1/4"], "1/3 − 1/4 = 1/12."),
  j(S, "maths-foundations", "E", 1, "The sum 2 + 4 + 8 + … + 2¹⁰ is:", ["1023", "2046", "2048", "1024"], "2(2¹⁰ − 1) = 2046."),
  j(S, "maths-foundations", "M", 0, "The trace of the inverse of diag(2, 5) is:", ["0.7", "7", "10", "0.1"], "The inverse is diag(1/2, 1/5), with trace 0.7."),
  j(S, "maths-foundations", "M", 2, "At the origin, f(x, y) = x² + 3xy + y² has:", ["A local minimum", "A local maximum", "A saddle point", "No critical point"], "The Hessian [[2, 3], [3, 2]] has determinant −5 < 0."),
  j(S, "maths-foundations", "M", 1, "The minimum of x² + y² subject to x + y = 4 is:", ["4", "8", "16", "2"], "The minimum is at x = y = 2, giving 8."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 1, "One of two coins is fair and the other has two heads. A coin picked at random shows a head. The probability it is the two-headed coin is:", ["1/2", "2/3", "1/3", "3/4"], "(1/2 · 1)/(1/2 · 1 + 1/2 · 1/2) = 2/3."),
  j(S, "probability", "H", 2, "Three letters are placed at random into three addressed envelopes. The probability that at least one is in the right envelope is:", ["1/3", "1/2", "2/3", "5/6"], "1 − P(no match) = 1 − 2/6 = 2/3."),
  j(S, "probability", "H", 1, "P(A) = P(B) = P(C) = 1/2, each pair has probability 1/4 of occurring together, and P(A ∩ B ∩ C) = 1/8. Then P(A ∪ B ∪ C) is:", ["3/4", "7/8", "1", "5/8"], "3/2 − 3/4 + 1/8 = 7/8."),
  j(S, "probability", "M", 0, "A card is drawn from a standard deck. The probability that it is a heart or a face card is:", ["11/26", "1/2", "5/13", "23/52"], "13 + 12 − 3 = 22 cards qualify, so 22/52 = 11/26."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 1, "If X ~ Binomial(3, p) and P(X = 0) = 1/27, then p equals:", ["1/3", "2/3", "1/2", "1/9"], "(1 − p)³ = 1/27 gives 1 − p = 1/3."),
  j(S, "distributions", "M", 1, "If X is Poisson with mean 1, then P(X ≤ 1) equals:", ["1/e", "2/e", "1 − 1/e", "3/e"], "e⁻¹ + e⁻¹ = 2/e."),
  j(S, "distributions", "M", 1, "If X ~ N(2, 9), then P(X > 5) is approximately:", ["0.0228", "0.1587", "0.3413", "0.5"], "5 is one standard deviation above the mean."),
  j(S, "distributions", "M", 1, "The hazard rate of an exponential distribution with mean 4 is:", ["4", "1/4", "1/16", "Not constant"], "The hazard rate of an exponential distribution is its rate 1/mean."),
  j(S, "distributions", "H", 2, "A random variable with density ½e^(−|x|) on ℝ has variance:", ["0", "1", "2", "4"], "The Laplace distribution has variance 2/λ² with λ = 1."),
  j(S, "distributions", "M", 1, "The standard Cauchy distribution:", ["Has mean 0 and variance 1", "Has no finite mean", "Has a finite variance", "Equals t with 30 degrees of freedom"], "The integral defining E[X] does not converge absolutely."),
  j(S, "distributions", "M", 0, "If X ~ N(1, 4) and Y ~ N(2, 5) are independent, then X + Y follows:", ["N(3, 9)", "N(3, 3)", "N(3, 20)", "N(2, 9)"], "Means and variances of independent normal variables add."),
  j(S, "distributions", "H", 1, "If X and Y are independent Uniform(0, 1), then E[min(X, Y)] is:", ["1/4", "1/3", "1/2", "2/3"], "The minimum has density 2(1 − x), so E = ∫ 2x(1 − x) dx = 1/3."),
  j(S, "distributions", "E", 1, "The mode of a Binomial(10, 0.5) distribution is:", ["4", "5", "6", "10"], "The mode is ⌊(n + 1)p⌋ = 5 for this symmetric case."),
  j(S, "distributions", "H", 1, "The joint density of (X, Y) is 2 on 0 < y < x < 1. Then P(Y < X/2) is:", ["1/4", "1/2", "1/3", "3/4"], "∫₀¹ ∫₀^(x/2) 2 dy dx = ∫₀¹ x dx = 1/2."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 1, "To test H₀: μ = 50 against H₁: μ ≠ 50, a sample of 100 observations from a population with σ = 10 has mean 52. The z statistic is:", ["0.2", "2", "20", "1"], "z = (52 − 50)/(10/10) = 2."),
  j(S, "estimation-testing", "E", 1, "A symmetric 95% confidence interval for μ is (4.2, 5.8). The sample mean is:", ["4.2", "5", "5.8", "1.6"], "The midpoint of the interval is the point estimate."),
  j(S, "estimation-testing", "M", 1, "A die is rolled 60 times and the counts are 8, 12, 10, 9, 11 and 10. The chi-square statistic for fairness is:", ["0.5", "1.0", "1.5", "10"], "Σ(O − E)²/E = (4 + 4 + 0 + 1 + 1 + 0)/10 = 1.0."),
  j(S, "estimation-testing", "M", 0, "The Fisher–Neyman factorisation theorem is used to identify:", ["Sufficient statistics", "Unbiased estimators", "Consistent estimators", "The power of a test"], "A statistic is sufficient if the likelihood factors through it."),
  j(S, "estimation-testing", "M", 1, "In Bayesian inference, the posterior distribution is proportional to:", ["The prior alone", "The likelihood times the prior", "The likelihood alone", "The prior divided by the likelihood"], "This is Bayes' theorem up to the normalising constant."),
  j(S, "estimation-testing", "M", 1, "Two samples have s₁² = 4 with n₁ = 11 and s₂² = 9 with n₂ = 16. The pooled variance is:", ["6.5", "7", "8", "13"], "(10 × 4 + 15 × 9)/25 = 175/25."),
  j(S, "estimation-testing", "M", 1, "X ~ Binomial(5, 0.5). A test rejects H₀: p = 0.5 when X = 5. Its size is:", ["1/2", "1/32", "5/32", "1/5"], "P(X = 5) = (1/2)⁵."),
  j(S, "estimation-testing", "H", 0, "If T is a complete sufficient statistic and g(T) is an unbiased estimator of θ, then g(T) is the:", ["UMVUE of θ", "MLE of θ only", "Biased estimator of θ", "Method-of-moments estimator only"], "This is the Lehmann–Scheffé theorem."),
  j(S, "estimation-testing", "E", 1, "A fitted regression line is ŷ = 2 + 3x. The predicted value at x = 4 is:", ["12", "14", "11", "10"], "2 + 3 × 4 = 14."),
  j(S, "estimation-testing", "M", 0, "In a one-way ANOVA, the total sum of squares equals:", ["SSB + SSW", "SSB − SSW", "SSB × SSW", "SSW only"], "Total variation splits into between-group and within-group parts."),
];

export const jamStatisticsMock8 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 1, "The second derivative of ln x at x = 2 is:", ["1/4", "−1/4", "−1/2", "1/2"], "d²/dx² ln x = −1/x², which is −1/4 at x = 2."),
  j(S, "maths-foundations", "E", 1, "The value of ∫₀^∞ e^(−3x) dx is:", ["3", "1/3", "1/9", "∞"], "[−e^(−3x)/3] from 0 to ∞ = 1/3."),
  j(S, "maths-foundations", "H", 1, "The sum of the series Σ 1/[(2n − 1)(2n + 1)] from n = 1 to ∞ is:", ["1/4", "1/2", "1", "2"], "Partial fractions give ½[1/(2n − 1) − 1/(2n + 1)], which telescopes to ½."),
  j(S, "maths-foundations", "M", 0, "A real symmetric 2 × 2 matrix always has:", ["Real eigenvalues", "Complex non-real eigenvalues only", "Zero determinant", "Equal eigenvalues"], "This is the spectral theorem for real symmetric matrices."),
  j(S, "maths-foundations", "M", 1, "Using e^x ≈ 1 + x + x²/2, the value of e^0.2 is approximately:", ["1.20", "1.22", "1.24", "1.25"], "1 + 0.2 + 0.02 = 1.22."),
  j(S, "maths-foundations", "E", 0, "The rank of [[1, 2, 3], [2, 4, 6], [3, 6, 9]] is:", ["1", "2", "3", "0"], "Every row is a multiple of (1, 2, 3)."),
  // ───────── Probability ─────────
  j(S, "probability", "E", 1, "Three mutually exclusive events have probabilities 0.2, 0.3 and 0.1. The probability that at least one occurs is:", ["0.06", "0.6", "0.5", "0.4"], "For mutually exclusive events the probabilities add."),
  j(S, "probability", "H", 0, "If P(A) = 0.7 and P(B) = 0.8, the smallest possible value of P(A ∩ B) is:", ["0.5", "0.56", "0.7", "0.1"], "P(A ∩ B) ≥ P(A) + P(B) − 1 = 0.5."),
  j(S, "probability", "H", 2, "Four people are seated at random in a row. The probability that two particular people sit next to each other is:", ["1/4", "1/3", "1/2", "2/3"], "Treating the pair as a block: 3! × 2!/4! = 12/24."),
  j(S, "probability", "M", 1, "A student guesses on 3 questions, each with a 1/4 chance of being right. The probability of exactly one correct answer is:", ["9/64", "27/64", "1/4", "3/4"], "3 × (1/4) × (3/4)² = 27/64."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 1, "The variance of a Binomial(100, 0.01) random variable is:", ["1", "0.99", "0.01", "0.1"], "np(1 − p) = 100 × 0.01 × 0.99."),
  j(S, "distributions", "M", 0, "The Poisson approximation to Binomial(200, 0.01) gives P(X = 0) approximately:", ["e⁻²", "2e⁻²", "e⁻²⁰⁰", "e⁻¹"], "The Poisson mean is np = 2."),
  j(S, "distributions", "M", 0, "If X is exponential with rate 1/3, then P(X > 6) is:", ["e⁻²", "e⁻⁶", "1/3", "e⁻¹⁸"], "P(X > x) = e^(−x/3)."),
  j(S, "distributions", "M", 1, "If X follows Uniform(0, 2), then E[X²] is:", ["1", "4/3", "2", "1/3"], "E[X²] = ∫₀² x²/2 dx = 4/3."),
  j(S, "distributions", "E", 0, "If Var(X) = 3, then Var(4 − 2X) is:", ["12", "6", "−6", "8"], "Var(aX + b) = a² Var(X) = 4 × 3."),
  j(S, "distributions", "H", 0, "For X ~ N(0, 1), Cov(X, X²) equals:", ["0", "1", "2", "3"], "Cov = E[X³] − E[X]E[X²] = 0 since odd moments vanish."),
  j(S, "distributions", "H", 0, "A random variable with moment generating function (1 − 2t)^(−3) follows:", ["χ²(6)", "χ²(3)", "Gamma(1, 2)", "Exponential"], "The χ²(n) MGF is (1 − 2t)^(−n/2), so n = 6."),
  j(S, "distributions", "M", 0, "If X and Y are independent, then E[Y | X] equals:", ["E[Y]", "E[X]", "0", "Y"], "Independence means conditioning on X gives no information about Y."),
  j(S, "distributions", "H", 0, "The law of total variance states that Var(X) equals:", ["E[Var(X | Y)] + Var(E[X | Y])", "Var(E[X | Y]) − E[Var(X | Y)]", "E[Var(X | Y)] only", "Var(X | Y) + Var(Y)"], "Total variance splits into the average within-group variance and the variance of the group means."),
  j(S, "distributions", "M", 1, "The expected number of tosses of a fair coin up to and including the first head is:", ["1", "2", "3", "4"], "The number of tosses is geometric with p = 1/2, so the mean is 1/p = 2."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "The standard error of the mean of 36 observations from a population with σ = 6 is:", ["1", "6", "0.17", "36"], "σ/√n = 6/6."),
  j(S, "estimation-testing", "M", 1, "The z critical value for a two-sided 99% confidence interval is:", ["1.645", "1.96", "2.576", "3.09"], "Each tail holds 0.5% of the standard normal distribution."),
  j(S, "estimation-testing", "M", 1, "For a random sample from an exponential distribution with rate λ, the MLE of λ is:", ["X̄", "1/X̄", "X̄²", "nX̄"], "The log-likelihood n ln λ − λΣxᵢ is maximised at λ = n/Σxᵢ."),
  j(S, "estimation-testing", "H", 0, "For a sample from N(μ, σ²) with σ² known, testing H₀: μ ≤ μ₀ against H₁: μ > μ₀:", ["A uniformly most powerful test exists", "No uniformly most powerful test can exist", "Only a two-sided test is possible", "The test must be randomised"], "The normal family has monotone likelihood ratio in X̄."),
  j(S, "estimation-testing", "M", 0, "Ordinary least squares chooses the line that minimises:", ["The sum of squared residuals", "The sum of residuals", "The largest residual", "The correlation"], "That is the least-squares criterion."),
  j(S, "estimation-testing", "M", 0, "If the sample correlation between x and y is 0, the least-squares slope of y on x is:", ["Zero", "One", "Negative", "Undefined"], "The slope equals r · s_y/s_x."),
  j(S, "estimation-testing", "M", 1, "A sample of 400 has p̂ = 0.55. The z statistic for H₀: p = 0.5 is:", ["1", "2", "4", "0.5"], "z = 0.05/√(0.25/400) = 0.05/0.025."),
  j(S, "estimation-testing", "M", 0, "For a Bernoulli sample X₁, …, Xₙ, a sufficient statistic for p is:", ["ΣXᵢ", "X₁", "X₁X₂", "max Xᵢ"], "The likelihood depends on the data only through the number of successes."),
  j(S, "estimation-testing", "H", 1, "The bias of X̄² as an estimator of μ², for a sample of size n with variance σ², is:", ["0", "σ²/n", "−σ²/n", "σ²"], "E[X̄²] = μ² + σ²/n."),
  j(S, "estimation-testing", "M", 0, "A one-sided z test of H₀ : μ = μ₀ against H₁ : μ > μ₀ at the 5% level rejects when z exceeds:", ["1.645", "1.96", "2.33", "1.28"], "5% of the standard normal lies above 1.645."),
];
