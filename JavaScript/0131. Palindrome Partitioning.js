// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all lsible palindrome partitioning of s.
//
// Example:
//
// Input: "aab"
// Output:
// [
//   ["aa","b"],
//   ["a","a","b"]
// ]

/**
 * @param {string} s
 * @return {string[][]}
 */

// Backtracking
const partition = (s) => {
  const res = [];

  const isPalindrome = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };

  const go = (l, list) => {
    if (l === s.length) {
      res.push(list);
    } else {
      for (let r = l; r < s.length; r++) {
        if (isPalindrome(l, r)) {
          go(r + 1, [...list, s.slice(l, r + 1)]);
        }
      }
    }
  };

  go(0, []);
  return res;
};
