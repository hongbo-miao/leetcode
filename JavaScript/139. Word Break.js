// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.
//
// Note:
//
// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.
//
// Example 1:
//
// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
//
// Example 2:
//
// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
//              Note that you are allowed to reuse a dictionary word.
// Example 3:
//
// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

/** 1) Dynamic programming */
// e.g.
// 'leetcode'
// ['leet', 'code']
//
// i = 1 j = 0 l
// dp = [true, false, false, false, false, false, false, false, false]
// i = 2 j = 0 le
// i = 2 j = 1  e
// dp = [true, false, false, false, false, false, false, false, false]
// i = 3 j = 0 lee
// i = 3 j = 1  ee
// i = 3 j = 2   e
// dp = [true, false, false, false, false, false, false, false, false]
// i = 4 j = 0 leet
// match
// dp = [true, false, false, false, true, false, false, false, false]
//
// i = 5 j = 0 leetc
// i = 5 j = 1  eetc
// i = 5 j = 2   etc
// i = 5 j = 3    tc
// i = 5 j = 4     c
// dp = [true, false, false, false, true, false, false, false, false]
// i = 6 j = 0 leetco
// i = 6 j = 1  eetco
// i = 6 j = 2   etco
// i = 6 j = 3    tco
// i = 6 j = 4     co
// i = 6 j = 5      o
// dp = [true, false, false, false, true, false, false, false, false]
// i = 7 j = 0 leetcod
// i = 7 j = 1  eetcod
// i = 7 j = 2   etcod
// i = 7 j = 3    tcod
// i = 7 j = 4     cod
// i = 7 j = 5      od
// i = 7 j = 6       d
// dp = [true, false, false, false, true, false, false, false, false]
// i = 8 j = 0 leetcode
// i = 8 j = 1  eetcode
// i = 8 j = 2   etcode
// i = 8 j = 3    tcode
// i = 8 j = 4     code
// match
// dp = [true, false, false, false, true, false, false, false, true]
function wordBreak1(s, wordDict) {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      const w = s.slice(j, i);
      if (dp[j] === true && wordDict.includes(w)) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

/** 2) Warning: time limit exceeded */
function wordBreak(s, wordDict) {
  function go(rest) {
    if (rest === '') return true;
    for (let w of wordDict) {
      if (rest.startsWith(w)) {
        if (go(rest.slice(w.length))) return true;
      }
    }
    return false;
  }

  return go(s);
}
