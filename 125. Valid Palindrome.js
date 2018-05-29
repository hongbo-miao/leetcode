// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
//
// Note: For the purpose of this problem, we define empty string as valid palindrome.
//
// Example 1:
//
// Input: "A man, a plan, a canal: Panama"
// Output: true
//
// Example 2:
//
// Input: "race a car"
// Output: false

/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  const s2 = s.replace(/\W/g, '').toLowerCase();

  for (let i = 0; i < s2.length / 2; i++) {
    if (s2[i] !== s2[s2.length - i - 1]) return false
  }

  return true;
}
