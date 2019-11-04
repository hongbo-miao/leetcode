// Given a list of words (without duplicates), please write a program that returns all concatenated words in the given list of words.
// A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.
//
// Example:
// Input: ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
// Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
// Explanation:
// "catsdogcats" can be concatenated by "cats", "dog" and "cats";
// "dogcatsdog" can be concatenated by "dog", "cats" and "dog";
// "ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
//
// Note:
// The number of elements of the given array will not exceed 10,000
// The length sum of elements in the given array will not exceed 600,000.
// All the input string will only include lower case letters.
// The returned elements order does not matter.

/**
 * @param {string[]} words
 * @return {string[]}
 */

/** Reuse any O(n^2) solution in 139. Word Break */
// Similar
// 139. Word Break
// 472. Concatenated Words
//
// Time  O(N * L^2) where L is the word length
//
// This problem is just one more step further for the question 139. Word Break.
// We iterate through each word and see if it can be formed by using other words.
// A word can only be formed by words shorter than it. So we need first sort the input by length of each word,
// and only try to form one word by using words in front of it.
//
// Note it need modify 139. Word Break a little bit, instead of passing array and create set each time,
// need pass set directly to save time.
const findAllConcatenatedWordsInADict = (words) => {
  const res = [];
  const set = new Set();
  words.sort((w1, w2) => w1.length - w2.length);

  for (const w of words) {
    if (wordBreak(w, set)) {
      res.push(w);
    }
    set.add(w);
  }
  return res;
};

const wordBreak = (s, dict) => {
  if (dict.size === 0) return false;

  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const w = s.slice(start, end);
      if (dp[start] === true && dict.has(w)) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
