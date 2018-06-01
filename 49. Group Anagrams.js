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
function groupAnagrams(strs) {
  const groups = {};

  for (let str of strs) {
    const key = str.split('').sort().join('');

    groups[key] = [
      ...groups[key] || [],
      str
    ];
  }

  return Object.values(groups);
}
// Time complexity O(NKlog(K)), where N is the length of strs, and K is the maximum length of a string in strs. The outer loop has complexity O(N) as we iterate through each string. Then, we sort each string in O(KlogK) time.
// Space complexity O(N * K), the total information content stored in groups.
