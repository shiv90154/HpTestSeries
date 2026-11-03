// IIT JAM Mathematical Statistics (MS) — Free Mock 1: 30 MCQs written fresh: mathematics 6, probability 4, distributions 10, inference 10.

import { j } from "./types";

const S = "jam-statistics";

export const jamStatisticsMock1 = [
  // ───────── Mathematics ─────────
  j(S, "maths-foundations", "M", 2, "The limit of sin(3x)/x as x → 0 is:", ["0", "1", "3", "1/3"], "sin(3x)/x = 3·sin(3x)/(3x) → 3 × 1 = 3."),
  j(S, "maths-foundations", "M", 1, "The value of ∫₀^∞ e^(−2x) dx is:", ["1/4", "1/2", "1", "2"], "The integral equals [−e^(−2x)/2] from 0 to ∞ = 1/2."),
  j(S, "maths-foundations", "M", 2, "The determinant of the matrix [[1, 2, 0], [0, 3, 4], [0, 0, 5]] is:", ["9", "12", "15", "30"], "The matrix is upper triangular, so det = 1 × 3 × 5 = 15.", "1 * 3 * 5"),
  j(S, "maths-foundations", "M", 3, "The sum of the series Σ (1/2)ⁿ for n = 0 to ∞ is:", ["1", "3/2", "4", "2"], "A geometric series with first term 1 and ratio 1/2 sums to 1/(1 − 1/2) = 2."),
  j(S, "maths-foundations", "M", 1, "The maximum value of f(x) = x(1 − x) on [0, 1] is:", ["1/2", "1/4", "1/8", "1"], "f′ = 1 − 2x = 0 at x = 1/2 and f(1/2) = 1/4."),
  j(S, "maths-foundations", "H", 2, "A 3 × 3 real matrix A has eigenvalues 1, 2 and 3. Then det(A²) is:", ["6", "12", "36", "14"], "det A = 1·2·3 = 6, so det(A²) = 36.", "(1 * 2 * 3) ** 2"),
  // ───────── Probability ─────────
  j(S, "probability", "M", 2, "If A and B are independent events with P(A) = 0.5 and P(B) = 0.4, then P(A ∪ B) is:", ["0.9", "0.2", "0.7", "0.45"], "P(A ∪ B) = 0.5 + 0.4 − 0.5 × 0.4 = 0.7.", "0.5 + 0.4 - 0.5 * 0.4"),
  j(S, "probability", "H", 2, "Urn I has 3 red and 2 blue balls; urn II has 1 red and 4 blue. An urn is chosen at random and a red ball is drawn. The probability that it came from urn I is:", ["0.5", "0.6", "0.75", "0.8"], "By Bayes: (0.5 × 0.6)/(0.5 × 0.6 + 0.5 × 0.2) = 0.3/0.4 = 0.75."),
  j(S, "probability", "M", 2, "A pair of fair dice is rolled. What is the probability that the two numbers add up to 7?", ["1/12", "1/9", "1/6", "7/36"], "There are 6 favourable outcomes out of 36, so the probability is 1/6."),
  j(S, "probability", "M", 1, "By Chebyshev's inequality, P(|X − μ| ≥ 2σ) is at most:", ["1/2", "1/4", "1/8", "1/16"], "P(|X − μ| ≥ kσ) ≤ 1/k², with k = 2."),
  // ───────── Distributions ─────────
  j(S, "distributions", "M", 0, "If X follows a Binomial(10, 0.3) distribution, Var(X) is:", ["2.1", "3", "0.21", "7"], "Var = np(1 − p) = 10 × 0.3 × 0.7 = 2.1.", "10 * 0.3 * 0.7"),
  j(S, "distributions", "M", 0, "If X follows a Poisson distribution with mean 2, P(X = 0) is:", ["e⁻²", "2e⁻²", "1 − e⁻²", "e²"], "P(X = 0) = e^(−λ) λ⁰/0! = e⁻²."),
  j(S, "distributions", "M", 1, "If Z follows N(0, 1), then P(|Z| < 1.96) is approximately:", ["0.90", "0.95", "0.975", "0.99"], "The central 95% of the standard normal lies within ±1.96."),
  j(S, "distributions", "M", 0, "If X is exponential with mean 5, then P(X > 5) equals:", ["e⁻¹", "1 − e⁻¹", "e⁻⁵", "1/5"], "P(X > x) = e^(−x/5), so at x = 5 it is e⁻¹."),
  j(S, "distributions", "M", 1, "If X is uniform on (0, 1), then E[X²] equals:", ["1/4", "1/3", "1/2", "1/12"], "E[X²] = ∫₀¹ x² dx = 1/3."),
  j(S, "distributions", "H", 2, "X and Y are independent with Var(X) = 4 and Var(Y) = 1. Then Var(2X − 3Y) equals:", ["7", "13", "25", "19"], "Var = 2² × 4 + 3² × 1 = 16 + 9 = 25.", "4 * 4 + 9 * 1"),
  j(S, "distributions", "M", 2, "If Y = 3X + 2 with X non-degenerate, the correlation coefficient between X and Y is:", ["−1", "0", "1", "3"], "Y is an exact increasing linear function of X, so the correlation is +1."),
  j(S, "distributions", "H", 0, "The moment generating function of a Poisson(λ) random variable is:", ["exp(λ(eᵗ − 1))", "λeᵗ", "(1 − λt)⁻¹", "exp(λt)"], "M(t) = Σ e^(tk) e^(−λ) λᵏ/k! = exp(λ(eᵗ − 1))."),
  j(S, "distributions", "H", 1, "If X follows a chi-square distribution with 5 degrees of freedom, Var(X) is:", ["5", "10", "25", "2.5"], "A chi-square variable with n degrees of freedom has mean n and variance 2n."),
  j(S, "distributions", "M", 2, "The number of trials needed for the first success, each trial succeeding with probability 0.25, has expected value:", ["2", "3", "4", "5"], "For a geometric distribution E[X] = 1/p = 1/0.25 = 4.", "1 / 0.25"),
  j(S, "distributions", "H", 2, "For 4 independent U(0, 1) random variables, the expected value of the maximum is:", ["0.5", "0.75", "0.8", "0.2"], "E[max] = n/(n + 1) = 4/5 = 0.8.", "4 / 5"),
  // ───────── Estimation and testing ─────────
  j(S, "estimation-testing", "M", 0, "For a random sample from Bernoulli(p), the maximum likelihood estimator of p is:", ["The sample mean X̄", "1 − X̄", "X̄²", "n·X̄"], "The likelihood pˢ(1 − p)ⁿ⁻ˢ is maximised at p = s/n = X̄."),
  j(S, "estimation-testing", "H", 2, "For a random sample from U(0, θ), the maximum likelihood estimator of θ is:", ["The sample mean", "The sample median", "The sample maximum", "Twice the sample mean"], "The likelihood θ⁻ⁿ decreases in θ but needs θ ≥ every observation, so it peaks at θ = max Xᵢ."),
  j(S, "estimation-testing", "M", 1, "An unbiased estimator of the population variance σ² is:", ["Σ(Xᵢ − X̄)² / n", "Σ(Xᵢ − X̄)² / (n − 1)", "Σ(Xᵢ − X̄)² / (n + 1)", "Σ(Xᵢ − X̄)² / (n − 2)"], "Dividing by n − 1 corrects the bias of dividing by n, giving E[S²] = σ²."),
  j(S, "estimation-testing", "H", 0, "For a sample of size n from N(μ, σ²) with σ² known, the Cramér–Rao lower bound for the variance of an unbiased estimator of μ is:", ["σ²/n", "σ²", "nσ²", "σ/√n"], "The Fisher information per observation is 1/σ², so the bound is σ²/n; X̄ attains it."),
  j(S, "estimation-testing", "E", 0, "A Type I error occurs when we:", ["Reject a true null hypothesis", "Accept a false null hypothesis", "Reject a false null hypothesis", "Accept a true null hypothesis"], "A Type I error is a false rejection of H₀; its probability is the significance level α."),
  j(S, "estimation-testing", "M", 1, "If β is the probability of a Type II error, the power of a test is:", ["β", "1 − β", "α", "1 − α"], "Power is the probability of rejecting H₀ when it is false, which is 1 − β."),
  j(S, "estimation-testing", "M", 0, "A sample of 100 observations from a normal population with known σ = 10 has mean 50. A 95% confidence interval for μ is:", ["(48.04, 51.96)", "(40.2, 59.8)", "(49, 51)", "(47.5, 52.5)"], "X̄ ± 1.96σ/√n = 50 ± 1.96 × 1 = (48.04, 51.96)."),
  j(S, "estimation-testing", "M", 1, "A chi-square goodness-of-fit test with 5 categories and no estimated parameters has how many degrees of freedom?", ["3", "4", "5", "6"], "Degrees of freedom = categories − 1 − estimated parameters = 5 − 1 = 4.", "5 - 1"),
  j(S, "estimation-testing", "M", 1, "In simple linear regression the correlation between X and Y is 0.8. The coefficient of determination R² is:", ["0.4", "0.64", "0.8", "0.9"], "R² is the square of the correlation: 0.8² = 0.64.", "0.8 * 0.8"),
];
