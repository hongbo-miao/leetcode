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
// https://www.youtube.com/watch?v=9qFR2WQGqkU
function minWindow(s, t) {
  let minStr = '';

  // e.g. { A: 1, B: 1, C: 1 }
  let map = {};
  t.split('').forEach(ch => map[ch] = (map[ch] || 0) + 1);

  let remainingMatchCount = Object.keys(map).length;
  let l = 0;
  let r = -1;

  while (r < s.length) {
    // good condition, l ~ r contains t
    if (remainingMatchCount === 0) {
      // update minStr
      if (!minStr || r - l + 1 < minStr.length) minStr = s.slice(l, r + 1);

      // remove current c and move l
      const c = s[l];
      if (map[c] !== undefined) map[c]++;
      if (map[c] > 0) remainingMatchCount++;

      l++;
    } else {
      // bad condition, l ~ r doesn't contain t
      // move r and add new c
      r++;

      const c = s[r];
      if (map[c] !== undefined) map[c]--;
      if (map[c] === 0) remainingMatchCount--;
    }
  }

  return minStr;
}
