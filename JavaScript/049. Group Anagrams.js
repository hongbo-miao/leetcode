// Given an array of strings, group anagrams together.
//
// Example:
//
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
//
// Note:
//
//   All inputs will be in lowercase.
//   The order of your output does not matter.

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

/** 1) Categorize by sorted strings */
// Time O(NK log K), where N is the length of strs, and K is the maximum length of a string in strs
//   The outer loop has complexity O(N) as we iterate through each string. Then, we sort each string in O(K log K) time
// Space O(NK), the total information content stored in groups.
function groupAnagrams1(strs) {
  const map = {};

  for (let s of strs) {
    const k = s.split('').sort().join('');
    if (map[k] == null) map[k] = [];
    map[k].push(s);
  }

  return Object.values(map);
}

/** 2) Categorize by character counts */
// Time O(NK), where N is the length of strs, and K is the maximum length of a string in strs. Counting each string
//   is linear in the size of the string, and we count every string.
// Space O(NK), the total information content stored in ans.
//
// Two strings are anagrams if and only if their character counts (respective number of occurrences of each character)
// are the same.
//
// We can transform each string s into a character count, count, consisting of 26 non-negative integers representing
// the number of a's, b's, c's, etc. We use these counts as the basis for our hash map.
