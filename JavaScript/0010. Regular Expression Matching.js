// Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.
//
// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
//
// The matching should cover the entire input string (not partial).
//
// Note:
//
// s could be empty and contains only lowercase letters a-z.
// p could be empty and contains only lowercase letters a-z, and characters like . or *.
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

/** 1) Recursion */
// If there were no Kleene stars (the * wildcard character for regular expressions), the problem would be easier -
// we simply check from left to right if each character of the text matches the pattern.
//
// When a star is present, we may need to check many different suffixes of the text and see if they match the rest of
// the pattern. A recursive solution is a straightforward way to represent this relationship.
// Without a Kleene star, our solution would look like this:
//
// const = isMatch(s, p) => {
//   if (p.length === 0) return s.length === 0;
//   const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');
//   return firstMatch && isMatch(s.slice(1), p.slice(1));
// };
//
// If a star is present in the pattern, it will be in the second position pattern[1]. Then, we may
// ignore this part of the pattern, or delete a matching character in the text. If we have a match on the remaining
// strings after any of these operations, then the initial inputs matched.
const isMatch1 = (s, p) => {
  if (p.length === 0) return s.length === 0;
  const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');

  if (p.length >= 2 && p[1] === '*') {
    return isMatch(s, p.slice(2)) || (firstMatch && isMatch(s.slice(1), p));
  } else {
    return firstMatch && isMatch(s.slice(1), p.slice(1));
  }
};

/** 2) Dynamic programming (top-down variation, recursion) */
// Time O(S * P). S and P are the lengths of the text and the pattern
// Space O(S * P)
// We proceed with the same recursion as in Approach 1, except because calls will only ever be made to
// match(s[i:], p[j:]), we use dp(i, j) to handle those calls instead, saving us expensive string-building
// operations and allowing us to cache the intermediate results.

const isMatch2 = (s, p) => {
  // init 2D matrix dp[s.length][p.length]
  const dp = [];
  for (let i = 0; i <= s.length; i++) {
    const r = [];
    for (let j = 0; j <= p.length; j++) r.push(null);
    dp.push(r);
  }

  const go = (i, j) => {
    if (dp[i][j] != null) return dp[i][j] === true;

    let res;
    if (j === p.length) {
      res = i === s.length;
    } else {
      const firstMatch = (i < s.length && (p[j] === s[i] || p[j] === '.'));

      if (j + 1 < p.length && p[j + 1] === '*') {
        res = go(i, j + 2) || (firstMatch && go(i + 1, j));
      } else {
        res = firstMatch && go(i + 1, j + 1);
      }
    }
    dp[i][j] = res === true;
    return res;
  };

  return go(0, 0);
};

/** 3) Dynamic programming (bottom-up variation) */
const isMatch3 = (s, p) => {
  // init 2D matrix dp[s.length][p.length]
  const dp = [];
  for (let i = 0; i <= s.length; i++) {
    const r = [];
    for (let j = 0; j <= p.length; j++) r.push(false);
    dp.push(r);
  }
  dp[s.length][p.length] = true;

  for (let i = s.length; i >= 0; i--) {
    for (let j = p.length - 1; j >= 0; j--) {
      const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');

      if (j + 1 < p.length && p[j + 1] === '*') {
        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};

/** 4) Dynamic programming */
// https://leetcode.com/problems/regular-expression-matching/discuss/5651/Easy-DP-Java-Solution-with-detailed-Explanation/238767
//
// dp[i][j] denotes whether s[0 : i - 1] matches p[0 : j - 1]
//
// 1. if p[j] === s[i]
//    dp[i][j] = dp[i - 1][j - 1]
//
// 2. if p[j] === '.'
//    dp[i][j] = dp[i - 1][j - 1]
//
// 3. if p[j] === '*', also need consider p[j - 1]
//    1) if p[j - 1] !== s[i] and p[j - 1] !== '.'  // a ab* and not a a.*
//       dp[i][j] = dp[i][j - 2]                    // e.g. a ab* -> p remove 'b*' which is j - 2
//
//    2) if p[j - 1] === s[i] or p[j - 1] === '.'
//       a) dp[i][j] = dp[i][j - 2]                 // c* - no 'c', e.g. ab ab.*
//       b) dp[i][j] = dp[i][j - 1]                 // c* - single 'c', e.g. abc abc*
//       c) dp[i][j] = dp[i - 1][j]                 // c* - multiple 'c', e.g. abccc abc*
//
// Example 1
// s = 'abcd', p = 'a*.cd'
//
//     p 0 1 2 3 4
// s     a * . c d
// 0   T F T F F F
// 1 a F T T T F F
// 2 b F F F T F F
// 3 c F F F F T F
// 4 d F F F F F T
//
// Example 2
// s = 'abaa', p = 'ab.*'
//
//   p 0 1 2 3 4
// s     a b . *
// 0   T F F F F
// 1 a F T F F F
// 2 b F F T F T
// 3 a F F F T T
// 4 a F F F F T

const isMatch = (s, p) => {
  const dp = [...Array(s.length + 1)].map(() => Array(p.length + 1).fill(false));

  // Initialization
  // 1) empty string matches empty pattern
  dp[0][0] = true;

  // 2) dp[i][0] = false (which is default value of the boolean array) since empty pattern cannot match non-empty string
  // 3) dp[0][j]: what pattern matches empty string ""? It should be #*#*#*#*..., or (#*)* if allow me to represent regex using regex :P,
  //    and for this case we need to check manually:
  //    as we can see, the length of pattern should be even && the character at the even position should be *,
  //    thus for odd length, dp[0][j] = false which is default. So we can just skip the odd position, i.e. j starts from 2, the interval of j is also 2.
  //    and notice that the length of repeat sub-pattern #* is only 2, we can just make use of dp[0][j - 2] rather than scanning j length each time
  //    for checking if it matches #*#*#*#*.
  for (let j = 2; j < p.length; j += 2) {
    if (p[j - 1] === '*' && dp[0][j - 2]) {
      dp[0][j] = true;
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
};
