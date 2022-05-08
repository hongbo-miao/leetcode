// From any string, we can form a subsequence of that string by deleting some number of characters (possibly no deletions).
// Given two strings source and target, return the minimum number of subsequences of source such that their concatenation equals target. If the task is impossible, return -1.
//
// Example 1:
//
// Input: source = "abc", target = "abcbc"
// Output: 2
// Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".
//
// Example 2:
//
// Input: source = "abc", target = "acdbc"
// Output: -1
// Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.
//
// Example 3:
//
// Input: source = "xyz", target = "xzyxz"
// Output: 3
// Explanation: The target string can be constructed as follows "xz" + "y" + "xz".
//
// Constraints:
//
// Both the source and target strings consist of only lowercase English letters from "a"-"z".
// The lengths of source and target string are between 1 and 1000.

/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
// 1) Greedy
// https://leetcode.com/problems/shortest-way-to-form-string/discuss/309404/C%2B%2B-with-picture-greedy
//
// Time O(ST), where S and T are sizes of the source and target.
// Space O(1)
//
// Intuition
// When the data needs to be processed in a certain order, think greedy.
// Here, greedy means exhausting all characters in the source before starting a new subsequence.
// We can use a contradiction to see if greedy works. Let's say that greedy produced 3 subsequences,
// and another algorithm produced two (see the picture below).
// To do that, the other algorithm must end the subsequence before the source is exhausted and start the second
// subsequence at position #3. However, if the second subsequence covers positions [3...9], then it also covers
// positions [4...9] and therefore greedy would also produce 2 subsequenes as the result.
//
// [0 1 2 3] [4 5 6] [7 8 9]
// [0 1 2] [3 4 5 6 7 8 9]
//
// Solution
// Match characters in source and target by moving indices s and t. Every time we run out of characters in the
// source (t == s.length), we increase the number of subsequences and reset the source index (t = 0).
// Since the number of subsequences cannot be larger than the target, we can use this fact to exist and return -1
// when a character is missing in the source.
const shortestWay1 = (source, target) => {
  let t = 0;
  let s = 0;
  let res = 0;
  while (t < target.length && res <= t) {
    while (source[s] !== target[t] && s < source.length) {
      s++;
    }

    if (s === source.length) {
      s = 0;
      res++;
    } else {
      s++;
      t++;
    }
  }
  return res > t ? -1 : res + 1 ;
};

// 2) Greedy + Hashset, taking more space, but easier to understand
// Time O(ST), where S and T are sizes of the source and target.
// Space O(S)
const shortestWay = (source, target) => {
  const set = new Set(source);
  let t = 0;
  let s = 0;
  let res = 0;
  while (t < target.length) {
    if (!set.has(target[t])) return -1;

    while (source[s] !== target[t] && s < source.length) {
      s++;
    }

    if (s === source.length) {
      s = 0;
      res++;
    } else {
      s++;
      t++;
    }
  }
  return res + 1;
};

// 3) Binary Search
// Time O(S + TlogT)
// space: O(S)

// 4) Inverted Index
// Time O(S + T)
// space: O(S)
