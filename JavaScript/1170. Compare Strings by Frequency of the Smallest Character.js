// Let's define a function f(s) over a non-empty string s, which calculates the frequency of the smallest character in s. For example, if s = "dcce" then f(s) = 2 because the smallest character is "c" and its frequency is 2.
// Now, given string arrays queries and words, return an integer array answer, where each answer[i] is the number of words such that f(queries[i]) < f(W), where W is a word in words.
//
// Example 1:
//
// Input: queries = ["cbd"], words = ["zaaaz"]
// Output: [1]
// Explanation: On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").
//
// Example 2:
//
// Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
// Output: [1,2]
// Explanation: On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").
//
// Constraints:
//
// 1 <= queries.length <= 2000
// 1 <= words.length <= 2000
// 1 <= queries[i].length, words[i].length <= 10
// queries[i][j], words[i][j] are English lowercase letters.

/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */

/** Binary Search */
const numSmallerByFrequency = (queries, words) => {
  const w = [];
  for (const s of words) w.push(calc(s));
  w.sort((a, b) => a - b);

  const res = [];
  for (const s of queries) {
    const idx = upperBound(w, calc(s));
    res.push(words.length - idx);
  }
  return res;
};

const upperBound = (w, target) => {
  let l = 0;
  let r = w.length;
  while (l < r) {
    const m = ~~((l + r) / 2);
    if (w[m] <= target) l = m + 1;
    else r = m;
  }
  return l;
};

const calc = (s) => {
  const map = {};
  for (const c of s) {
    if (map[c] == null) map[c] = 0;
    map[c]++;
  }
  for (let i = 0; i < 26; i++) {
    const c = String.fromCharCode(97 + i);
    if (c in map) return map[c];
  }
};
