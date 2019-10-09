// Write a function to find the longest common prefix string amongst an array of strings.
//
// If there is no common prefix, return an empty string "".
//
// Example 1:
//
// Input: ["flower","flow","flight"]
// Output: "fl"
//
// Example 2:
//
// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
//
// Note:
//
// All given inputs are in lowercase letters a-z.

/**
 * @param {string[]} strs
 * @return {string}
 */

/** 1) Vertical scanning */
// Complexity
// time O(S), where S is the sum of all characters in all strings
//   In the worst case there will be nn equal strings with length mm and the algorithm performs S = m * n character comparisons
//   In the best case there are at most n * minLen comparisons where minLen is the length of the shortest string in the array
// space O(1)
function longestCommonPrefix1(strs) {
  if (strs.length === 0) return '';

  const str0 = strs[0];

  for (let i = 0; i < str0.length; i++) {
    const c = str0[i];

    for (let j = 1; j < strs.length; j++) {
      const s = strs[j];
      if (s[i] !== c) return str0.slice(0, i);
    }
  }

  return str0;
}

/** 2) Binary search */
// Complexity
// time O(S * log(n)), where S is the sum of all characters in all strings.
//   The algorithm makes log(n) iterations, for each of them there are S = m * n comparisons, which gives in total O(S * log(n)) time complexity.
// space O(1)
function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';

  let minLen = Infinity;
  for (let s of strs) {
    minLen = Math.min(minLen, s.length);
  }

  let l = 0;
  let r = minLen;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (isCommonPrefix(strs, mid)) l = mid + 1;
    else r = mid - 1;
  }

  return strs[0].slice(0, Math.floor((l + r) / 2));
}

function isCommonPrefix(strs, len) {
  const prefix = strs[0].slice(0, len);

  for (let i = 1; i < strs.length; i++) {
    if (!strs[i].startsWith(prefix)) return false;
  }

  return true;
}
