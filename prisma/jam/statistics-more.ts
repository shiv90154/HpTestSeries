// IIT JAM Mathematical Statistics (MS) — Mocks 2 to 4: 30 MCQs each, written fresh: mathematics 6, probability 4, distributions 10, inference 10.

import { j } from "./types";

const S = "jam-statistics";

export const jamStatisticsMock2 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 1, "The derivative of ln(1 + x²) at x = 1 is:", ["1/2", "1", "2", "ln 2"], "d/dx ln(1 + x²) = 2x/(1 + x²), which is 2/2 = 1 at x = 1."),
  j(S, "maths-foundations", "M", 0, "The series Σ 1/n^1.5 over n ≥ 1 is:", ["Convergent", "Divergent", "Oscillating", "Convergent only for even n"], "It is a p-series with p = 1.5 > 1."),
  j(S, "maths-foundations", "E", 0, "A 3 × 3 matrix has eigenvalues 2, 3 and 5. Its trace is:", ["10", "30", "15", "6"], "The trace is the sum of the eigenvalues."),
  j(S, "maths-foundations", "M", 1, "The minimum value of f(x) = x + 1/x for x > 0 is:", ["1", "2", "0", "1/2"], "By AM–GM, x + 1/x ≥ 2, with equality at x = 1."),
  j(S, "maths-foundations", "H", 1, "The value of ∫₀^∞ x e^(−x²) dx is:", ["1", "1/2", "1/4", "√π/2"], "With u = x², the integral is ½∫₀^∞ e^(−u) du = 1/2."),
  j(S, "maths-foundations", "E", 0, "The determinant of [[2, 1], [1, 3]] is:", ["5", "7", "6", "1"], "2 × 3 − 1 × 1 = 5."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 1, "If P(A) = 0.6, P(B) = 0.5 and P(A ∪ B) = 0.8, then P(A ∩ B) is:", ["0.1", "0.3", "0.5", "0.4"], "P(A ∩ B) = P(A) + P(B) − P(A ∪ B) = 1.1 − 0.8 = 0.3."),
  j(S, "probability", "M", 1, "Two cards are drawn without replacement from a standard 52-card deck. The probability that both are aces is:", ["1/169", "1/221", "1/26", "2/52"], "(4/52)(3/51) = 12/2652 = 1/221."),
  j(S, "probability", "M", 1, "A fair coin is tossed three times. The probability of getting at least two heads is:", ["3/8", "1/2", "5/8", "7/8"], "Three outcomes have exactly two heads and one has three, so 4/8 = 1/2."),
  j(S, "probability", "M", 0, "If P(B) = 0.4 and P(A ∩ B) = 0.1, then P(A | B) is:", ["0.25", "0.4", "0.1", "0.04"], "P(A | B) = 0.1/0.4 = 0.25."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 1, "If X follows Binomial(8, 0.5), P(X = 4) is:", ["1/2", "35/128", "1/4", "7/16"], "C(8, 4)/2⁸ = 70/256 = 35/128."),
  j(S, "distributions", "E", 0, "If X is Poisson with mean 3, the variance of X is:", ["3", "9", "√3", "1/3"], "For a Poisson distribution the variance equals the mean."),
  j(S, "distributions", "M", 1, "An exponential random variable with rate 2 has expected value:", ["2", "1/2", "1/4", "4"], "E[X] = 1/λ = 1/2."),
  j(S, "distributions", "M", 0, "The variance of a Uniform(2, 8) random variable is:", ["3", "6", "9", "1/3"], "(b − a)²/12 = 36/12 = 3."),
  j(S, "distributions", "M", 1, "If Z follows N(0, 1), then Z² follows:", ["N(0, 1)", "Chi-square with 1 degree of freedom", "Chi-square with 2 degrees of freedom", "Exponential with mean 1"], "A squared standard normal variable is χ²(1)."),
  j(S, "distributions", "H", 1, "A geometric random variable (trials up to the first success) with success probability 1/3 has variance:", ["3", "6", "9", "2"], "Var = (1 − p)/p² = (2/3)/(1/9) = 6."),
  j(S, "distributions", "H", 1, "A Gamma random variable with shape 3 and rate 2 has mean:", ["6", "3/2", "2/3", "1/6"], "The mean of Gamma(α, β) with rate β is α/β = 3/2."),
  j(S, "distributions", "M", 0, "The mean of the Beta(2, 3) distribution is:", ["2/5", "3/5", "1/2", "1/3"], "α/(α + β) = 2/5."),
  j(S, "distributions", "M", 1, "The moment generating function of a standard normal random variable is:", ["eᵗ", "e^(t²/2)", "e^(−t²)", "1/(1 − t)"], "M(t) = exp(μt + σ²t²/2) with μ = 0 and σ = 1."),
  j(S, "distributions", "M", 1, "For X ~ N(10, 4), the probability P(X > 10) is:", ["0.25", "0.5", "0.75", "0.1587"], "The normal distribution is symmetric about its mean 10."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "For a random sample from a Poisson(λ) distribution, the maximum likelihood estimator of λ is:", ["The sample mean", "The reciprocal of the sample mean", "The square of the sample mean", "The sample median"], "The log-likelihood −nλ + (Σxᵢ) ln λ is maximised at λ = x̄."),
  j(S, "estimation-testing", "E", 0, "The sample mean is an unbiased estimator of the:", ["Population mean", "Population variance", "Population median", "Population standard deviation"], "The expected value of the sample mean equals the population mean μ."),
  j(S, "estimation-testing", "M", 0, "A test has a p-value of 0.03. At the 5% level of significance the null hypothesis is:", ["Rejected", "Not rejected", "Proved true", "Impossible to decide"], "The p-value is smaller than α = 0.05."),
  j(S, "estimation-testing", "M", 1, "In a one-sample t-test with a sample of size 16, the degrees of freedom are:", ["16", "15", "14", "17"], "Degrees of freedom = n − 1."),
  j(S, "estimation-testing", "M", 1, "A 95% confidence interval for a mean with unknown σ and a small normal sample uses a quantile of the:", ["Normal distribution", "t distribution", "Chi-square distribution", "F distribution"], "Estimating σ by s gives a t-distributed pivot."),
  j(S, "estimation-testing", "M", 0, "For a sample from N(μ, 1), a sufficient statistic for μ is:", ["The sample mean", "The first observation only", "The sample maximum", "The sample variance"], "By the factorisation theorem, the likelihood depends on the data through Σxᵢ."),
  j(S, "estimation-testing", "H", 0, "The Neyman–Pearson lemma gives:", ["The most powerful test of a simple null against a simple alternative", "An unbiased estimator", "A confidence interval", "A sufficient statistic"], "It shows that a likelihood-ratio test is most powerful at a given size."),
  j(S, "estimation-testing", "H", 1, "For a sample of size n from N(μ, σ²) with μ unknown, the expected value of the MLE of σ² is:", ["σ²", "(n − 1)σ²/n", "nσ²/(n − 1)", "σ²/n"], "The MLE divides by n instead of n − 1, so E = ((n − 1)/n)σ²."),
  j(S, "estimation-testing", "M", 0, "A chi-square test of independence on a 3 × 4 contingency table has how many degrees of freedom?", ["6", "7", "11", "12"], "(3 − 1)(4 − 1) = 6."),
  j(S, "estimation-testing", "M", 1, "If the correlation between X and Y is −0.6, then in simple linear regression the coefficient of determination is:", ["−0.36", "0.36", "0.6", "−0.6"], "R² = r² = 0.36."),
];

export const jamStatisticsMock3 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 1, "In the Maclaurin series of sin x, the coefficient of x³ is:", ["1/6", "−1/6", "1/3", "−1/3"], "sin x = x − x³/3! + …"),
  j(S, "maths-foundations", "M", 1, "The value of ∫₀¹ x√x dx is:", ["2/3", "2/5", "1/2", "3/5"], "∫ x^(3/2) dx = (2/5)x^(5/2), which is 2/5 on [0, 1]."),
  j(S, "maths-foundations", "E", 1, "The limit of (3x² + 1)/(x² − 5) as x → ∞ is:", ["1", "3", "0", "∞"], "The ratio of leading coefficients is 3."),
  j(S, "maths-foundations", "M", 1, "A 2 × 2 real matrix has trace 6 and determinant 8. Its eigenvalues are:", ["1 and 8", "2 and 4", "3 and 3", "−2 and −4"], "λ² − 6λ + 8 = (λ − 2)(λ − 4)."),
  j(S, "maths-foundations", "M", 1, "The radius of convergence of Σ xⁿ/n² is:", ["0", "1", "2", "∞"], "The ratio of consecutive coefficients tends to 1."),
  j(S, "maths-foundations", "M", 1, "For f(x, y) = x³y, the value of ∂²f/∂x² at (1, 2) is:", ["6", "12", "3", "2"], "∂²f/∂x² = 6xy, which is 12 at (1, 2)."),
  // ───────── Probability ─────────
  j(S, "probability", "H", 2, "A disease affects 1% of a population. A test detects it in 90% of cases but gives a false positive in 10% of healthy people. The probability that a person who tests positive has the disease is about:", ["0.9", "0.5", "0.083", "0.01"], "P = 0.009/(0.009 + 0.099) = 0.083."),
  j(S, "probability", "H", 1, "The probability that a random permutation of three distinct objects leaves none in its original position is:", ["1/6", "1/3", "1/2", "2/3"], "The two derangements (cycles) among 6 permutations give 2/6 = 1/3."),
  j(S, "probability", "M", 1, "When a pair of fair dice is rolled, the probability that the sum is 8 is:", ["1/6", "5/36", "1/9", "7/36"], "The favourable outcomes are (2,6), (3,5), (4,4), (5,3) and (6,2)."),
  j(S, "probability", "E", 2, "A fair coin is tossed three times. The probability of at least one head is:", ["1/8", "3/8", "7/8", "1/2"], "1 − P(no head) = 1 − 1/8."),
  // ───────── Distributions ─────────
  j(S, "distributions", "H", 1, "If X follows Binomial(5, 0.2), then E[X²] equals:", ["1.0", "1.8", "0.8", "2.0"], "Var(X) = 0.8 and E[X] = 1, so E[X²] = 0.8 + 1 = 1.8."),
  j(S, "distributions", "M", 1, "If X is Poisson with mean 2, then P(X ≥ 1) equals:", ["e⁻²", "1 − e⁻²", "2e⁻²", "1 − 2e⁻²"], "P(X ≥ 1) = 1 − P(X = 0)."),
  j(S, "distributions", "M", 1, "If X follows N(50, 100), then P(40 < X < 60) is approximately:", ["0.50", "0.68", "0.95", "0.99"], "The interval is μ ± σ."),
  j(S, "distributions", "M", 1, "For an exponential random variable X and s, t > 0, P(X > s + t | X > s) equals:", ["P(X > s)", "P(X > t)", "P(X > s + t)", "P(X < t)"], "This is the memoryless property."),
  j(S, "distributions", "M", 1, "A random variable has density f(x) = 2x on (0, 1). Its mean is:", ["1/2", "2/3", "1/3", "3/4"], "E[X] = ∫₀¹ 2x² dx = 2/3."),
  j(S, "distributions", "E", 0, "The variance of a Uniform(0, 1) random variable is:", ["1/12", "1/6", "1/4", "1/3"], "(b − a)²/12 with b − a = 1."),
  j(S, "distributions", "H", 1, "If Z follows N(0, 1), then E[Z⁴] equals:", ["1", "3", "0", "4"], "The fourth moment of a standard normal variable is 3."),
  j(S, "distributions", "M", 0, "For a t distribution with n > 1 degrees of freedom, the mean is:", ["0", "1", "n", "n/(n − 2)"], "The t distribution is symmetric about 0."),
  j(S, "distributions", "M", 1, "If X ~ Poisson(1) and Y ~ Poisson(2) are independent, then X + Y follows:", ["Poisson(2)", "Poisson(3)", "A binomial distribution", "N(3, 3) exactly"], "Sums of independent Poisson variables are Poisson with added means."),
  j(S, "distributions", "M", 1, "An urn has 5 red and 5 blue balls. Two are drawn without replacement. The probability that both are red is:", ["1/4", "2/9", "1/5", "5/18"], "C(5, 2)/C(10, 2) = 10/45 = 2/9."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "H", 1, "For a random sample from a geometric distribution (trials up to the first success) with success probability p, the MLE of p is:", ["The sample mean", "The reciprocal of the sample mean", "The sample mean divided by n", "n divided by the sample mean"], "The log-likelihood n ln p + (Σxᵢ − n) ln(1 − p) is maximised at p = n/Σxᵢ = 1/x̄."),
  j(S, "estimation-testing", "E", 1, "The standard error of the sample mean of 25 observations from a population with σ = 10 is:", ["10", "2", "0.4", "5"], "σ/√n = 10/5 = 2."),
  j(S, "estimation-testing", "M", 1, "To halve the width of a confidence interval for a mean (other things fixed), the sample size must be:", ["Doubled", "Quadrupled", "Halved", "Increased by 50%"], "The width is proportional to 1/√n."),
  j(S, "estimation-testing", "M", 1, "The F test is used to compare:", ["Two means", "Two variances", "Two proportions", "A mean with a constant"], "F is the ratio of two independent scaled chi-square variables."),
  j(S, "estimation-testing", "H", 1, "For large n, the statistic −2 ln Λ for the likelihood ratio Λ is approximately distributed as:", ["Normal", "Chi-square", "t", "Exponential"], "This is Wilks' theorem."),
  j(S, "estimation-testing", "M", 1, "For a sample from U(0, θ), the method-of-moments estimator of θ is:", ["X̄", "2X̄", "X̄/2", "The sample maximum"], "E[X] = θ/2, so θ̂ = 2X̄."),
  j(S, "estimation-testing", "H", 1, "The Fisher information in a single observation from Bernoulli(p) is:", ["p(1 − p)", "1/(p(1 − p))", "1/p", "p"], "I(p) = −E[∂² ln f/∂p²] = 1/(p(1 − p))."),
  j(S, "estimation-testing", "M", 0, "A paired t-test is appropriate when:", ["The observations are before-and-after measurements on the same units", "Two independent samples have equal sizes", "The variances are known", "The data are categorical"], "The analysis uses the differences within each pair."),
  j(S, "estimation-testing", "M", 0, "An estimator is consistent if it:", ["Converges in probability to the true parameter as n → ∞", "Is unbiased for every n", "Has zero variance for every n", "Equals the parameter in expectation only"], "This is the definition of consistency."),
  j(S, "estimation-testing", "M", 0, "The critical value for a two-sided z test at the 5% level is:", ["1.96", "1.645", "2.58", "1.28"], "The two tails each hold 2.5% of the standard normal distribution."),
];

export const jamStatisticsMock4 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "H", 1, "The value of ∫₀¹ ln(1 + x) dx is:", ["ln 2", "2 ln 2 − 1", "1 − ln 2", "ln 2 − 1/2"], "By parts: [x ln(1 + x)] − ∫ x/(1 + x) dx = ln 2 − (1 − ln 2) = 2 ln 2 − 1."),
  j(S, "maths-foundations", "M", 0, "The series Σ 1/(n² + 1) over n ≥ 1 is:", ["Convergent", "Divergent", "Oscillating", "Conditionally convergent"], "The terms are bounded by 1/n², so the series converges by comparison."),
  j(S, "maths-foundations", "M", 1, "The (1, 2) entry of the inverse of [[1, 2], [0, 1]] is:", ["2", "−2", "1", "0"], "The inverse is [[1, −2], [0, 1]]."),
  j(S, "maths-foundations", "E", 0, "The function f(x, y) = x² + y² has at the origin a:", ["Global minimum", "Global maximum", "Saddle point", "Point of inflection"], "f ≥ 0 everywhere and f(0, 0) = 0."),
  j(S, "maths-foundations", "E", 0, "A 2 × 2 matrix has eigenvalues 3 and −2. Its determinant is:", ["−6", "6", "1", "5"], "The determinant is the product of the eigenvalues."),
  j(S, "maths-foundations", "M", 1, "The limit of (1 + 3/n)ⁿ as n → ∞ is:", ["e", "e³", "3", "1"], "(1 + a/n)ⁿ → eᵃ."),
  // ───────── Probability ─────────
  j(S, "probability", "M", 1, "Three independent events each have probability 1/2. The probability that exactly two occur is:", ["1/4", "3/8", "1/2", "5/8"], "C(3, 2)/2³ = 3/8."),
  j(S, "probability", "H", 1, "A family has two children and at least one is a boy. The probability that both are boys is:", ["1/4", "1/3", "1/2", "2/3"], "Of the equally likely BB, BG, GB, one of three outcomes is BB."),
  j(S, "probability", "E", 0, "Two fair dice are rolled. The probability that they show the same number is:", ["1/6", "1/36", "1/12", "1/3"], "There are 6 matching outcomes out of 36."),
  j(S, "probability", "M", 0, "Machine A makes 60% of items with 2% defective and machine B makes 40% with 5% defective. The probability a random item is defective is:", ["0.032", "0.035", "0.07", "0.02"], "0.6 × 0.02 + 0.4 × 0.05 = 0.012 + 0.020."),
  // ───────── Distributions ─────────
  j(S, "distributions", "H", 2, "A binomial distribution has mean 6 and variance 3.6. The number of trials n is:", ["10", "12", "15", "20"], "1 − p = 3.6/6 = 0.6, so p = 0.4 and n = 6/0.4 = 15."),
  j(S, "distributions", "H", 1, "A Poisson distribution has P(X = 1) = P(X = 2). Its mean is:", ["1", "2", "3", "e"], "λe^(−λ) = λ²e^(−λ)/2 gives λ = 2."),
  j(S, "distributions", "E", 1, "For Z ~ N(0, 1), P(Z > 1.645) is approximately:", ["0.01", "0.05", "0.10", "0.025"], "1.645 is the 95th percentile."),
  j(S, "distributions", "M", 1, "If X is exponential with rate λ, then E[X²] equals:", ["1/λ²", "2/λ²", "λ²", "2λ²"], "Var = 1/λ² and E[X]² = 1/λ², so E[X²] = 2/λ²."),
  j(S, "distributions", "M", 0, "If X follows a chi-square distribution with 7 degrees of freedom, E[X] is:", ["7", "14", "3.5", "49"], "The mean of χ²(n) is n."),
  j(S, "distributions", "H", 1, "The joint density of (X, Y) is f(x, y) = x + y on the unit square. Then E[X] equals:", ["1/2", "7/12", "5/12", "2/3"], "E[X] = ∫₀¹∫₀¹ x(x + y) dy dx = 1/3 + 1/4 = 7/12."),
  j(S, "distributions", "M", 0, "For f(x, y) = x + y on the unit square, the marginal density of X is:", ["x + 1/2", "x", "2x", "x² + 1/2"], "∫₀¹ (x + y) dy = x + 1/2."),
  j(S, "distributions", "M", 1, "Cov(X, Y) = 2, Var(X) = 4 and Var(Y) = 9. The correlation coefficient is:", ["2/3", "1/3", "1/6", "1/2"], "ρ = 2/√(4 × 9) = 1/3."),
  j(S, "distributions", "M", 1, "The median of an exponential distribution with rate λ is:", ["1/λ", "ln 2/λ", "2/λ", "λ ln 2"], "Solving 1 − e^(−λm) = 1/2 gives m = ln 2/λ."),
  j(S, "distributions", "M", 0, "By the central limit theorem, for i.i.d. observations with mean μ and variance σ², (X̄ − μ)/(σ/√n) is approximately distributed as:", ["N(0, 1)", "N(μ, σ²)", "Chi-square", "t with n degrees of freedom"], "This is the standardised sample mean."),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "For X ~ Binomial(n, p), an unbiased estimator of p is:", ["X/n", "X/(n + 1)", "X²/n", "nX"], "E[X/n] = p."),
  j(S, "estimation-testing", "M", 0, "The mean squared error of an estimator equals:", ["Variance + bias²", "Variance − bias²", "Variance × bias", "Bias² only"], "MSE = E[(θ̂ − θ)²] = Var(θ̂) + (bias)²."),
  j(S, "estimation-testing", "M", 1, "For a fixed significance level, the power of a test generally:", ["Decreases as the sample size increases", "Increases as the sample size increases", "Is unaffected by the sample size", "Becomes zero for large samples"], "A larger sample reduces the standard error and separates the hypotheses better."),
  j(S, "estimation-testing", "M", 0, "In a z test of H₀: μ = μ₀ against H₁: μ > μ₀, the null hypothesis is rejected for:", ["Large positive values of z", "Large negative values of z", "Small values of |z|", "z = 0"], "The alternative is one-sided to the right."),
  j(S, "estimation-testing", "H", 0, "The Rao–Blackwell theorem says that conditioning an unbiased estimator on a sufficient statistic gives an estimator with:", ["Variance no larger", "Greater bias", "Larger variance", "Zero variance"], "The new estimator is unbiased and its variance does not exceed the original."),
  j(S, "estimation-testing", "M", 1, "A chi-square goodness-of-fit test has 6 categories and one parameter estimated from the data. The degrees of freedom are:", ["3", "4", "5", "6"], "6 − 1 − 1 = 4."),
  j(S, "estimation-testing", "M", 1, "A pooled two-sample t-test uses samples of sizes 10 and 12. The degrees of freedom are:", ["22", "20", "21", "10"], "n₁ + n₂ − 2 = 20."),
  j(S, "estimation-testing", "M", 1, "In a sample of 100, the proportion is 0.5. The approximate half-width of a 95% confidence interval for the population proportion is:", ["0.049", "0.098", "0.196", "0.5"], "1.96 × √(0.25/100) = 1.96 × 0.05."),
  j(S, "estimation-testing", "H", 0, "For a sample from Poisson(λ), a complete sufficient statistic is:", ["ΣXᵢ", "X₁", "max Xᵢ", "X₁ − X₂"], "Poisson is a one-parameter exponential family, and ΣXᵢ is its natural statistic."),
  j(S, "estimation-testing", "H", 0, "For a sample of size n from Poisson(λ), the Cramér–Rao lower bound for an unbiased estimator of λ is:", ["λ/n", "λ²/n", "1/(nλ)", "nλ"], "The Fisher information per observation is 1/λ, so the bound is λ/n."),
];
