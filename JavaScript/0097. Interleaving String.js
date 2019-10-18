// Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.
//
// Example 1:
//
// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// Output: true
// Example 2:
//
// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
// Output: false

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */

// 1. If both s1 and s2 is currently empty, s3 is empty too, and it is considered interleaving.
// 2. If only s1 is empty, then if previous s2 position is interleaving and current s2 position char is equal to s3 current position char, it is considered interleaving.
// 3. Similar idea applies to when s2 is empty.
// 4. When both s1 and s2 is not empty, then
//   1) if we arrive i, j from i - 1, j, then if i - 1, j is already interleaving and i and current s3 position equal, it is interleaving.
//   2) if we arrive i, j from i, j - 1, then if i, j - 1 is already interleaving and j and current s3 position equal, it is interleaving.
function isInterleave(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;

  const dp = [];
  for (let i = 0; i <= s1.length; i++) {
    const row = [];
    for (let j = 0; j <= s2.length; j++) row.push(false);
    dp.push(row);
  }

  // dp[i][j] means whether s3[0:i+j] is formed by the interleaving of s1[0:i] and s2[0;j]
  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = true;
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      } else {
        dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
      }
    }
  }
  return dp[s1.length][s2.length];
}
