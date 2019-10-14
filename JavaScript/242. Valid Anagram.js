// Given two strings s and t , write a function to determine if t is an anagram of s.
//
// Example 1:
//
// Input: s = "anagram", t = "nagaram"
// Output: true
//
// Example 2:
//
// Input: s = "rat", t = "car"
// Output: false
//
// Note:
// You may assume the string contains only lowercase alphabets.
//
// Follow up:
// What if the inputs contain unicode characters? How would you adapt your solution to such case?

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

/** 1) Sorting */
// Time O(n log n)
// Space O(1). Space depends on the sorting implementation which, usually, costs O(1)O(1) auxiliary space if heapsort is used.
function isAnagram1(s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('');
}

/** 2) Hash map */
// Time O(n)
// Space O(n)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = {};

  for (let c of s) {
    if (map[c] == null) map[c] = 0;
    map[c]++;
  }

  for (let c of t) {
    if (map[c] != null) map[c]--;
    else return false;
  }

  return true;
}
