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
// Time O(S), where S is the sum of all characters in all strings
//   In the worst case there will be nn equal strings with length m and the algorithm performs S = m * n character comparisons
//   In the best case there are at most n * minLen comparisons where minLen is the length of the shortest string in the array
// Space O(1)
function longestCommonPrefix1(strs) {
  if (strs == null || strs.length === 0) return '';

  const str0 = strs[0];
  for (let i = 0; i < str0.length; i++) {
    const c = str0[i];
    for (const s of strs) {
      if (s[i] !== c) return str0.slice(0, i);
    }
  }
  return str0;
}

/** 2) Binary search */
// Time O(S * log(n)), where S is the sum of all characters in all strings.
//   The algorithm makes log(n) iterations, for each of them there are S = m * n comparisons, which gives in total O(S * log(n)) time complexity.
// Space O(1)
function longestCommonPrefix(strs) {
  if (strs == null || strs.length === 0) return '';

  function isCommonPrefix(len) {
    const prefix = strs[0].slice(0, len);
    for (let i = 1; i < strs.length; i++) {
      if (!strs[i].startsWith(prefix)) return false;
    }
    return true;
  }

  let minLen = Infinity;
  for (const s of strs) {
    minLen = Math.min(minLen, s.length);
  }

  let l = 0;
  let r = minLen;
  while (l <= r) {
    const m = ~~((l + r) / 2);
    if (isCommonPrefix(m)) l = m + 1;
    else r = m - 1;
  }
  return strs[0].slice(0, (l + r) / 2); // no need Math.floor or ~~ because it will be used in slice
}
