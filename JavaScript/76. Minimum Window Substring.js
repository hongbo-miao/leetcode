// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).
//
// Example:
//
// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC"
//
// Note:
//
//   If there is no such window in S that covers all characters in T, return the empty string "".
//   If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

/** 1) */
// https://www.youtube.com/watch?v=9qFR2WQGqkU
function minWindow1(s, t) {
  let res = '';

  // e.g. ABC -> { A: 1, B: 1, C: 1 }
  const map = {};
  t.split('').forEach(c => map[c] = (map[c] || 0) + 1);

  let count = Object.keys(map).length;  // rest matching count
  let l = 0;
  let r = -1;

  while (r < s.length) {
    // good condition, l ~ r contains t
    if (count === 0) {
      // update res
      if (!res || r - l + 1 < res.length) res = s.slice(l, r + 1);

      // remove current c and move l
      const c = s[l];

      if (map[c] !== undefined) map[c]++;
      if (map[c] > 0) count++;

      l++;
    } else {
      // bad condition, l ~ r doesn't contain t
      // move r and add new c
      r++;

      const c = s[r];

      if (map[c] !== undefined) map[c]--;
      if (map[c] === 0) count--;
    }
  }

  return res;
}

/** 2) */
// https://leetcode.com/problems/minimum-window-substring/discuss/26808/Here-is-a-10-line-template-that-can-solve-most-'substring'-problems
function minWindow(s, t) {
  const map = {};
  t.split('').forEach(c => map[c] = (map[c] || 0) + 1);

  let count = t.length;   // rest matching count

  let l = 0;
  let r = 0;

  let start = 0;
  let minLen = Infinity;

  while (r < s.length) {
    if (map[s[r++]]-- > 0) count--;

    while (count === 0) {   // valid
      if (r - l < minLen) {
        minLen = r - l;
        start = l;
      }

      if (map[s[l++]]++ === 0) count++; // make it invalid
    }
  }

  return minLen === Infinity ? '' : s.substr(start, minLen);
}
