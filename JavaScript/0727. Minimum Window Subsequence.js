// Given strings S and T, find the minimum (contiguous) substring W of S, so that T is a subsequence of W.
// If there is no such window in S that covers all characters in T, return the empty string "". If there are multiple such minimum-length windows, return the one with the left-most starting index.
//
// Example 1:
//
// Input:
// S = "abcdebdde", T = "bde"
// Output: "bcde"
// Explanation:
// "bcde" is the answer because it occurs before "bdde" which has the same length.
// "deb" is not a smaller window because the elements of T in the window must occur in order.
//
// Note:
//
// All the strings in the input will only contain lowercase letters.
// The length of S will be in the range [1, 20000].
// The length of T will be in the range [1, 100].

/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */

/** 1) Dynamic Programming */
// https://leetcode.com/problems/minimum-window-subsequence/discuss/109362/Java-Super-Easy-DP-Solution-(O(mn)
//
// Time O(S * T)
// Space O(S * T)
//
// dp[i][j] stores the starting index of the substring where T has length i and S has length j.
//
// So dp[i][j would be:
// if T[i - 1] == S[j - 1], this means we could borrow the start index from dp[i - 1][j - 1] to make the current substring valid;
// else, we only need to borrow the start index from dp[i][j - 1] which could either exist or not.
//
// Finally, go through the last row to find the substring with min length and appears first.
//
// e.g. S = 'abcdebdde', T = 'bde'
// dp = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//       [I, I, 2, 2, 2, 2, 6, 6, 6, 6],  <- b
//       [I, I, I, I, 2, 2, 2, 6, 6, 6],  <- d
//       [I, I, I, I, I, 2, 2, 2, 2, 6]]  <- e
// start = 1
// len = 4
// res = 'bcde'
const minWindow = (S, T) => {
  const m = T.length;
  const n = S.length;
  const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(Infinity));
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j + 1;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (T[i - 1] === S[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  let start = 0;
  let len = n + 1;
  for (let j = 1; j <= n; j++) {
    if (dp[m][j] !== Infinity) {
      if (j - dp[m][j] + 1 < len) {
        start = dp[m][j] - 1;
        len = j - dp[m][j] + 1;
      }
    }
  }
  return len === n + 1 ? '' : S.slice(start, start + len);
};

/** 2) Dynamic Programming (Optimized) */
// Time O(S * T)
// Space O(S)
