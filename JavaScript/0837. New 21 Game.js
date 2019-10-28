// Alice plays the following game, loosely based on the card game "21".
// Alice starts with 0 points, and draws numbers while she has less than K points.  During each draw, she gains an integer number of points randomly from the range [1, W], where W is an integer.  Each draw is independent and the outcomes have equal probabilities.
// Alice stops drawing numbers when she gets K or more points.  What is the probability that she has N or less points?
//
// Example 1:
//
// Input: N = 10, K = 1, W = 10
// Output: 1.00000
// Explanation:  Alice gets a single card, then stops.
//
// Example 2:
//
// Input: N = 6, K = 1, W = 10
// Output: 0.60000
// Explanation:  Alice gets a single card, then stops.
// In 6 out of W = 10 possibilities, she is at or below N = 6 points.
//
// Example 3:
//
// Input: N = 21, K = 17, W = 10
// Output: 0.73278
// Note:
//
// 0 <= K <= N <= 10000
// 1 <= W <= 10000
// Answers will be accepted as correct if they are within 10^-5 of the correct answer.
// The judging time limit has been reduced for this question.

/**
 * @param {number} N
 * @param {number} K
 * @param {number} W
 * @return {number}
 */

/** 1) Dynamic Programming */
// https://leetcode.com/problems/new-21-game/discuss/132334/One-Pass-DP-O(N)
//
// Time O(n)
// Space O(n)
const new21Game1 = (N, K, W) => {
  if (K === 0 || N >= K + W) return 1;

  let sum = 1;
  let res = 0;
  const dp = [1];

  for (let i = 1; i <= N; i++) {
    dp[i] = sum / W;

    if (i < K) sum += dp[i];
    else res += dp[i];

    if (i - W >= 0) sum -= dp[i - W];
  }

  return res;
};

/** 2) Dynamic Programming, easier to understand than 1) */
// https://www.youtube.com/watch?v=-zBuTO4sIwQ
//
// Time O(n)
// Space O(n)
//
// [] shows the window
// X X X X [i-W, i-W+1, ..., X, i-1] i
const new21Game = (N, K, W) => {
  const dp = Array(N + 1).fill(0);
  dp[0] = 1;

  let sum = 0;
  for (let i = 1; i <= N; i++) {
    // To count the sum of window, the code below is too slow, since each one probability is 1 / W
    //
    // for (let j = i - W; j <= i - 1; j++) {
    //   if (j >= 0 && j < K) {
    //     dp[i] += dp[j] * (1 / W);
    //   }
    // }

    // It can speed up by minus the one in the beginning, and plus the other one at the end
    if (i - W - 1 >= 0) sum -= dp[i - W - 1];
    if (i - 1 < K) sum += dp[i - 1];
    dp[i] = sum * (1 / W);
  }

  let res = 0;
  for (let i = K; i <= N; i++) {
    res += dp[i];
  }
  return res;
};
