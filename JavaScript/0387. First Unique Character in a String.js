// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.
//
// Examples:
//
// s = "leetcode"
// return 0.
//
// s = "loveleetcode",
// return 2.
//
// Note: You may assume the string contain only lowercase letters.

/**
 * @param {string} s
 * @return {number}
 */

// 1)
const firstUniqChar1 = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return i;
  }
  return -1;
};

// 2) Hashmap
// Time O(n)
// Space O(n)
const firstUniqChar = (s) => {
  const map = {};

  for (const c of s) {
    if (map[c] == null) map[c] = 1;
    else map[c]++;
  }

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }
  return -1;
};
