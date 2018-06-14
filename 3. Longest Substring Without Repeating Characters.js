// Given a string, find the length of the longest substring without repeating characters.
//
// Examples:
//
// Given "abcabcbb", the answer is "abc", which the length is 3.
//
// Given "bbbbb", the answer is "b", with the length of 1.
//
// Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */

/** 1) */
function lengthOfLongestSubstring1(s) {
  let max = 0;
  let chars = [];

  for (let c of s) {
    chars = chars.slice(chars.indexOf(c) + 1);  // remove everything before when find duplicate one, e.g. awke + w -> ke + w
    max = Math.max(chars.push(c), max);   // push returns the array length
  }

  return max;
}

/** 2) Sliding Window */
// Time complexity O(n)
// Space complexity O(min(m, n)), m is the size of the hash map
//
// pwwkew
//   i j
//   3 5
//
// map { p: 1, w: 6, k: 4, e: 5 }
function lengthOfLongestSubstring(s) {
  let max = 0;
  let map = {};

  for (let i = 0, j = 0; j < s.length; j++) {
    const c = s[j];

    if (map[c]) i = Math.max(map[c], i);

    max = Math.max(max, j - i + 1);
    map[c] = j + 1;
  }

  return max;
}
