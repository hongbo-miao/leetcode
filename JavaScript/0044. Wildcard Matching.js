// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.
//
// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).
//
// Note:
//
// s could be empty and contains only lowercase letters a-z.
// p could be empty and contains only lowercase letters a-z, and characters like ? or *.
//
// Example 1:
//
// Input:
// s = "aa"
// p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
//
// Example 2:
//
// Input:
// s = "aa"
// p = "*"
// Output: true
// Explanation: '*' matches any sequence.
//
// Example 3:
//
// Input:
// s = "cb"
// p = "?a"
// Output: false
// Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
//
// Example 4:
//
// Input:
// s = "adceb"
// p = "*a*b"
// Output: true
// Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
//
// Example 5:
//
// Input:
// s = "acdcb"
// p = "a*c?b"
// Output: false

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

/** 1) Dynamic programming */
// Time O(mn)
// Space O(mn)
//
// dp[i][j] denotes whether s[0 : i - 1] matches p[0 : j - 1]
// dp[i][j] denotes whether s[0 : i-1] matches p[0 : j-1],
// First, we need to initialize dp[i][0], i = [1, m]. All the dp[i][0] should be false because p has nothing in it.
// Then, initialize dp[0][j], j = [1, n]. In this case, s has nothing, to get dp[0][j] = true, p must be '*', '**', '***',etc. Once p[j - 1] !== '*', all the dp[0][j] afterwards will be false.
// Then start the typical DP loop.
const isMatch1 = (s, p) => {
  const dp = [...Array(s.length + 1)].map(() => Array(p.length + 1).fill(false));
  dp[0][0] = true;
  for (let i = 1; i <= s.length; i++) {
    dp[i][0] = false;
  }
  for (let i = 1; i <= p.length; i++) {
    if (p[i - 1] === '*') {
      dp[0][i] = true;
    } else {
      break;
    }
  }
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '?');
      }
    }
  }
  return dp[s.length][p.length];
};

/** 2) Two pointers */
// s[i] === p[j] || p[j] === '?' in these cases, it's matched, advance both pointers.
// p[j] === '*' in this case, there are two cases that we need to try. [i, j + 1] and [i + 1, j].
// So we try one case and store another case into the stack. Whenever one path is not matched, restore i, j from stack.
// After running while (i < s.length) {} this loop, i must be equal to m.
// However, there may be remaining patterns. And also there could only be * in remaining patterns.
const isMatch = (s, p) => {
  let i = 0;
  let j = 0;
  const st = [];
  while (i < s.length) {
    if (s[i] === p[j] || p[j] === '?') {
      i++;
      j++;
    } else if (p[j] === '*') {
      st.push([i + 1, j]);
      j++;
    } else if (st.length) {
      [i, j] = st.pop();
    } else {
      return false;
    }
  }
  while (j < p.length) {
    if (p[j] !== '*') {
      return false;
    }
    j++;
  }
  return true;
};
