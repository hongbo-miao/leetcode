// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.
//
// Note:
//
// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.
//
// Example 1:
//
// Input:
// s = "catsanddog"
// wordDict = ["cat", "cats", "and", "sand", "dog"]
// Output:
// [
//   "cats and dog",
//   "cat sand dog"
// ]
//
// Example 2:
//
// Input:
// s = "pineapplepenapple"
// wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
// Output:
// [
//   "pine apple pen apple",
//   "pineapple pen apple",
//   "pine applepen apple"
// ]
// Explanation: Note that you are allowed to reuse a dictionary word.
//
// Example 3:
//
// Input:
// s = "catsandog"
// wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output:
// []

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

/** Backtracking + Memoization */
// Similar
// 139. Word Break
// 140. Word Break II
const wordBreak = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return [];

  const cache = new Map();
  const go = (s) => {
    if (cache.has(s)) return cache.get(s);

    const res = [];
    for (const w of wordDict) {
      if (s.startsWith(w)) {
        const s2 = s.slice(w.length);
        if (s2 === '') {
          res.push(w);
        } else {
          const vals = go(s2);
          vals.forEach(val => res.push(w + ' ' + val));
        }
      }
    }

    cache.set(s, res);
    return res;
  };

  return go(s);
};
