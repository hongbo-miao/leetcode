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

/** 1) Brute force - recursion and backtracking (time limit exceeded) */
// Time O(n^n). Consider the worst case where ss = "aaaaaaa" and every prefix of s is present in the dictionary of
//   words, then the recursion tree can grow upto n^n.
// Space O(n). The depth of the recursion tree can go upto n.
const wordBreak1 = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;

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
};

/** 2) Recursion with memoization */
// Time O(n^2). Size of recursion tree can go up to n^2.
// Space O(n). The depth of recursion tree can go up to n.
const wordBreak2 = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;
  const dict = new Set(wordDict);
  const map = {};

  function go(s, start) {
    if (start === s.length) return true;
    if (map[start] != null) return map[start];

    for (let end = start + 1; end <= s.length; end++) {
      if (dict.has(s.slice(start, end)) && go(s, end)) {
        map[start] = true;
        return true;
      }
    }
    map[start] = false;
    return false;
  }

  return go(s, 0);
};

/** 3) BFS */
// Time O(n^2). For every starting index, the search can continue till the end of the given string.
// Space O(n). Queue of at most n size is needed.
const wordBreak3 = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;
  const set = new Set(wordDict);

  // When s = 'catsandog', wordDict = ['cats', 'ca', 'ts']
  // After 'cats' and 'ca', it will become 'andog', 'tsandog'
  // For 'tsandog', after 'ts', it will become 'andog' again, visited set here is for memoization
  const visited = new Set();
  const q = [0];

  while (q.length) {
    const start = q.shift();

    if (!visited.has(start)) {
      for (let end = start + 1; end <= s.length; end++) {
        if (set.has(s.slice(start, end))) {
          if (end === s.length) return true;
          q.push(end);
        }
      }
      visited.add(start);
    }
  }
  return false;
};

/** 4) Dynamic programming */
// Time O(n^2). Two loops are their to fill dp array.
// Space O(n). Length of dp array is n + 1.
//
// e.g.
// 'leetcode'
// ['leet', 'code']
//
// end = 1 start = 0 l
// dp = [true, false, false, false, false, false, false, false, false]
// end = 2 start = 0 le
// end = 2 start = 1  e
// dp = [true, false, false, false, false, false, false, false, false]
// end = 3 start = 0 lee
// end = 3 start = 1  ee
// end = 3 start = 2   e
// dp = [true, false, false, false, false, false, false, false, false]
// end = 4 start = 0 leet
// match
// dp = [true, false, false, false, true, false, false, false, false]
//
// end = 5 start = 0 leetc
// end = 5 start = 1  eetc
// end = 5 start = 2   etc
// end = 5 start = 3    tc
// end = 5 start = 4     c
// dp = [true, false, false, false, true, false, false, false, false]
// end = 6 start = 0 leetco
// end = 6 start = 1  eetco
// end = 6 start = 2   etco
// end = 6 start = 3    tco
// end = 6 start = 4     co
// end = 6 start = 5      o
// dp = [true, false, false, false, true, false, false, false, false]
// end = 7 start = 0 leetcod
// end = 7 start = 1  eetcod
// end = 7 start = 2   etcod
// end = 7 start = 3    tcod
// end = 7 start = 4     cod
// end = 7 start = 5      od
// end = 7 start = 6       d
// dp = [true, false, false, false, true, false, false, false, false]
// end = 8 start = 0 leetcode
// end = 8 start = 1  eetcode
// end = 8 start = 2   etcode
// end = 8 start = 3    tcode
// end = 8 start = 4     code
// match
// dp = [true, false, false, false, true, false, false, false, true]
const wordBreak = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;

  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const w = s.slice(start, end);
      if (dp[start] === true && set.has(w)) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
