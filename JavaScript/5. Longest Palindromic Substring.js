// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
//
// Example 1:
//
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
//
// Example 2:
//
// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 */

/** Expand around center */
// https://www.youtube.com/watch?v=m2Mk9JN5T4A
//
// Time complexity: O(n^2). Expanding a palindrome around its center takes O(n) time, so the overall complexity is O(n^2)
// Space complexity: O(1)

function longestPalindrome(s) {
  let res = '';

  for (let i = 0; i < s.length; i++) {
    const s1 = expandFromCenter(s, i, i);  // case 1: aba
    if (s1.length > res.length) res = s1;

    const s2 = expandFromCenter(s, i, i + 1);  // case 2: abba
    if (s2.length > res.length) res = s2;
  }

  return res;
}

function expandFromCenter(s, l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.substring(l + 1, r);
}
