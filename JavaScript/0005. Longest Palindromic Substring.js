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

/** 1) Brute force */
// Time O(n^3)
// Space O(1)
//
// Pick all possible starting and ending positions for a substring, and verify if it is a palindrome

/** 2) Dynamic programming */
// Time O(n^2)
// Space O(n^2)
//
// To improve over the brute force solution, we first observe how we can avoid unnecessary re-computation while
// validating palindromes. Consider the case "ababa". If we already knew that "bab" is a palindrome, it is obvious
// that "ababa" must be a palindrome since the two left and right end letters are the same.
//
// Therefore,
// dp(i, j) = dp(i + 1, j − 1) and s(i) == s(j)
//
// The base cases are:
// dp(i, i) = true
// dp(i, i + 1) = s(i) == s(j + 1)
//
// This yields a straight forward DP solution, which we first initialize the one and two letters palindromes, and work
// our way up finding all three letters palindromes, and so on.

/** 3) Expand around center */
// https://www.youtube.com/watch?v=m2Mk9JN5T4A
//
// Time O(n^2). Expanding a palindrome around its center takes O(n) time, so the overall complexity is O(n^2)
// Space O(1)

function longestPalindrome(s) {
  let res = '';

  for (let i = 0; i < s.length; i++) {
    const s1 = expandFromCenter(s, i, i); // case 1: aba
    if (s1.length > res.length) res = s1;

    const s2 = expandFromCenter(s, i, i + 1); // case 2: abba
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

/** 4) Manacher's algorithm */
// Time O(n)
//
// It is a non-trivial algorithm
