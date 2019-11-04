// A message containing letters from A-Z is being encoded to numbers using the following mapping:
//
// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// Given a non-empty string containing only digits, determine the total number of ways to decode it.
//
// Example 1:
//
// Input: "12"
// Output: 2
// Explanation: It could be decoded as "AB" (1 2) or "L" (12).
//
// Example 2:
//
// Input: "226"
// Output: 3
// Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

/**
 * @param {string} s
 * @return {number}
 */

/** Dynamic programming */
// Similar
// 70. Climbing Stairs
// 91. Decode Ways
//
// Time O(n)
// Space O(n)
//
// dp[n] =
//   dp[n - 2] // the number made by s[n - 1] and s[n] should be between 10 to 26
// + dp[n - 1] // s[n] !== 0
//
// e.g. '226'
// dp = [1, 1, 2, 3]
//
// e.g. '236'
// dp = [1, 1, 2, 2]
//
// e.g. '101'
// dp = [1, 1, 1, 1]
//
// e.g. '110'
// dp = [1, 1, 2, 1]
const numDecodings = (s) => {
  if (s == null || s.length === 0) return 0;
  if (s[0] === '0') return 0;

  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    const a = Number(s[i - 1]); // last one digit
    if (a !== 0) {
      dp[i] += dp[i - 1];
    }

    const b = Number(s.slice(i - 2, i)); // last two digits
    if (b >= 10 && b <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[s.length];
};
