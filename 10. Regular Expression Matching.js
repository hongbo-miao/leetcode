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

/** 2D dynamic programming */
// https://www.youtube.com/watch?v=qza1UKNHAys
//
// Idea
// 1. if p[j] === s[i]
//    sp[i][j] = sp[i - 1][j - 1]
//
// 2. if p[j] === '.'
//    sp[i][j] = sp[i - 1][j - 1]
//
// 3. if p[j] === '*'
//    1) if p[j - 1] !== s[i] and p[j - 1] !== '.'  // a ab* and not a a.*
//       sp[i][j] = sp[i][j - 2]                    // e.g. a ab* -> p remove 'b*' which is j - 2
//
//    2) if p[i - 1] === s[i] or p[i - 1] == '.'
//       a) sp[i][j] = sp[i][j - 2]                 // c* - empty, e.g. ab ab.*
//       b) sp[i][j] = sp[i][j - 1]                 // c* - single c, e.g. abc abc*
//       c) sp[i][j] = sp[i - 1][j]                 // c* - multiple c, e.g. abccc abc*
//
// Example 1
// s = 'abcd', p = 'a*.cd'
//
//       p 0 1 2 3 4
//       0 1 2 3 4 5
// s 0     a * . c d
// 0 1   T F T F F F
// 1 2 a F T T T F F
// 2 3 b F F F T F F
// 3 4 c F F F F T F
// 4 5 d F F F F F T
//
// Example 2
// s = 'abaa', p = 'ab.*'
//
//     p 0 1 2 3 4
//     0 1 2 3 4 5
// s 0     a b . *
// 0 1   T F F F F
// 1 2 a F T F F F
// 2 3 b F F T F T
// 3 4 a F F F T T
// 4 5 a F F F F T

function isMatch(s, p) {
  let sp = [];

  // init 2D matrix sp[s.length][p.length] to false
  for (let i = 0; i <= s.length; i++) {
    let row = [];
    for (let j = 0; j <= p.length; j++) row.push(false);
    sp.push(row);
  }

  // init sp[0][0]
  sp[0][0] = true;

  // init sp[0][i] to true if p[i] is *
  for (let i = 1; i < p.length; i++) {
    if (p[i] === '*' && sp[0][i - 1]) {
      sp[0][i + 1] = true;
    }
  }

  for (let i = 0 ; i < s.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (p[j] === s[i]) {
        sp[i + 1][j + 1] = sp[i][j];
      } else if (p[j] === '.') {
        sp[i + 1][j + 1] = sp[i][j];
      } else if (p[j] === '*') {
        if (p[j - 1] !== s[i] && p[j - 1] !== '.') {
          sp[i + 1][j + 1] = sp[i + 1][j - 1];
        } else {
          sp[i + 1][j + 1] = sp[i + 1][j - 1] || sp[i + 1][j] || sp[i][j + 1];
        }
      }
    }
  }

  return sp[s.length][p.length];
}
