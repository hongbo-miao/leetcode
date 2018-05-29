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
// Expand around center
// https://www.youtube.com/watch?v=m2Mk9JN5T4A
// Time complexity: O(n^2). Since expanding a palindrome around its center could take O(n) time, the overall complexity is O(n^2)
// Space complexity: O(1)O(1).
function longestPalindrome(s) {
  let result = '';

  for (let i = 0; i < s.length; i++) {
    const s1 = expandAroundCenter(s, i, i, result);       // situation 1: aba
    result = s1.length > result.length ? s1 : result;

    const s2 = expandAroundCenter(s, i, i + 1, result);   // situation 2: abba
    result = s2.length > result.length ? s2 : result;
  }

  return result;
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return s.substring(left + 1, right);
}
