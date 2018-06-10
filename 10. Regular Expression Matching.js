// Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.
//
// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
//
// The matching should cover the entire input string (not partial).
//
// Note:
//
//   s could be empty and contains only lowercase letters a-z.
//   p could be empty and contains only lowercase letters a-z, and characters like . or *.
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
// p = "a*"
// Output: true
// Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
//
// Example 3:
//
// Input:
// s = "ab"
// p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".
//
// Example 4:
//
// Input:
// s = "aab"
// p = "c*a*b"
// Output: true
// Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
//
// Example 5:
//
// Input:
// s = "mississippi"
// p = "mis*is*p*."
// Output: false

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

// https://www.youtube.com/watch?v=qza1UKNHAys
//
// 1. if p[j] === s[i]
//    dp[i][j] = dp[i - 1][j - 1]
//
// 2. if p[j] === '.'
//    dp[i][j] = dp[i - 1][j - 1]
//
// 3. if p[j] === '*'
//    1) if p[j - 1] !== s[i] && p[j - 1] !== '.'   // a ab* && not a a.*
//       dp[i][j] = dp[i][j - 2]                    // e.g. a ab* -> p remove 'b*' which is j - 2
//
//    2) if p[i - 1] === s[i] or p[i - 1] == '.'
//       a) dp[i][j] = dp[i][j - 2]                 // c* - empty, e.g. ab ab.*
//       b) dp[i][j] = dp[i][j - 1]                 // c* - single c, e.g. abc abc*
//       c) dp[i][j] = dp[i - 1][j]                 // c* - multiple c, e.g. abcc abc*

function isMatch(s, p) {
  let dp = [];

  // initialize dp[s.length][p.length] to false
  for (let i = 0; i <= s.length; i++) {
    let tmp = [];
    for (let j = 0; j <= p.length; j++) tmp.push(false);
    dp.push(tmp);
  }

  dp[0][0] = true;

  for (let i = 0; i < p.length; i++) {
    if (p[i] === '*' && dp[0][i - 1]) {
      dp[0][i + 1] = true;
    }
  }

  for (let i = 0 ; i < s.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (p[j] === s[i]) {
        dp[i + 1][j + 1] = dp[i][j];
      } else if (p[j] === '.') {
        dp[i + 1][j + 1] = dp[i][j];
      } else if (p[j] === '*') {
        if (p[j - 1] !== s[i] && p[j - 1] !== '.') {
          dp[i + 1][j + 1] = dp[i + 1][j - 1];
        } else {
          dp[i + 1][j + 1] = dp[i + 1][j - 1] || dp[i + 1][j] || dp[i][j + 1];
        }
      }
    }
  }
  return dp[s.length][p.length];
}
