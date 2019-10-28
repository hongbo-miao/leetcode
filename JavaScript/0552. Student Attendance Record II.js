// Given a positive integer n, return the number of all possible attendance records with length n, which will be regarded as rewardable. The answer may be very large, return it after mod 10^9 + 7.
// A student attendance record is a string that only contains the following three characters:
//
// - 'A' : Absent.
// - 'L' : Late.
// - 'P' : Present.
//
// A record is regarded as rewardable if it doesn't contain more than one 'A' (absent) or more than two continuous 'L' (late).
//
// Example 1:
// Input: n = 2
// Output: 8
// Explanation:
// There are 8 records with length 2 will be regarded as rewardable:
// "PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
// Only "AA" won't be regarded as rewardable owing to more than one absent times.
//
// Note: The value of n won't exceed 100,000.

/**
 * @param {number} n
 * @return {number}
 */

/** 1) Dynamic Programming */
// https://www.youtube.com/watch?v=zd20HrEb5dg
//
// Time O(n)
// Space O(n)
const checkRecord1 = (n) => {
  const mod = 10 ** 9 + 7;

  const dp00 = Array(n + 1).fill(0); // A never appeared, end with 0 L
  const dp01 = Array(n + 1).fill(0); // A never appeared, end with 1 L
  const dp02 = Array(n + 1).fill(0); // A never appeared, end with 2 L
  const dp10 = Array(n + 1).fill(0); // A appeared once, end with 0 L
  const dp11 = Array(n + 1).fill(0); // A appeared once, end with 1 L
  const dp12 = Array(n + 1).fill(0); // A appeared once, end with 2 L
  dp00[0] = 1;

  // dp00[i] = dp00[i - 1] * 1 (P) + dp01[i - 1] * 1 (P) + dp02[i - 1] * 1 (P)
  // dp01[i] = dp00[i - 1] * 1 (L)
  // dp02[i] = dp01[i - 1] * 1 (L)
  // dp10[i] = dp00[i - 1] * 1 (A) + dp01[i - 1] * 1 (A) + dp02[i - 1] * 1 (A) + dp10[i - 1] * 1 (P) + dp11[i - 1] * 1 (P) + dp12[i - 1] * 1 (P)
  // dp11[i] = dp10[i - 1] * 1 (L)
  // dp12[i] = dp11[i - 1] * 1 (L)
  for (let i = 1; i <= n; i++) {
    dp00[i] = (dp00[i - 1] * 1 + dp01[i - 1] * 1 + dp02[i - 1] * 1) % mod;
    dp01[i] = (dp00[i - 1] * 1) % mod;
    dp02[i] = (dp01[i - 1] * 1) % mod;
    dp10[i] = (dp00[i - 1] * 1 + dp01[i - 1] * 1 + dp02[i - 1] * 1 + dp10[i - 1] * 1 + dp11[i - 1] * 1 + dp12[i - 1] * 1) % mod;
    dp11[i] = (dp10[i - 1] * 1) % mod;
    dp12[i] = (dp11[i - 1] * 1) % mod;
  }

  return (dp00[n] + dp01[n] + dp02[n] + dp10[n] + dp11[n] + dp12[n]) % mod;
};

/** 2) Dynamic Programming (Optimized) */
// Time O(n)
// Space O(1)
const checkRecord = (n) => {
  const mod = 10 ** 9 + 7;

  let p = 1; // A never appeared, end with 0 L
  let l = 0; // A never appeared, end with 1 L
  let ll = 0; // A never appeared, end with 2 L
  let a = 0; // A appeared once, end with 0 L
  let al = 0; // A appeared once, end with 1 L
  let all = 0; // A appeared once, end with 2 L

  while (n--) {
    [p, a, l, ll, al, all] = [
      (p + l + ll) % mod,
      (a + al + p + l + ll + all) % mod,
      p % mod,
      l % mod,
      a % mod,
      al % mod
    ];
  }
  return (p + a + l + ll + al + all) % mod;
};
