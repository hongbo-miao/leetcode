// Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:
//
// Only one letter can be changed at a time
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
//
// Note:
//
// Return an empty list if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.
// You may assume no duplicates in the word list.
// You may assume beginWord and endWord are non-empty and are not the same.
//
// Example 1:
//
// Input:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]
//
// Output:
// [
//   ["hit","hot","dot","dog","cog"],
//   ["hit","hot","lot","log","cog"]
// ]
//
// Example 2:
//
// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
//
// Output: []
//
// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */

/** BFS */
const findLadders = (beginWord, endWord, wordList) => {
  const dict = new Set(wordList);
  const visited = new Set();
  const res = [];
  const q = [[beginWord]];
  let step = Infinity;

  while (q.length) {
    const path = q.shift();
    if (path.length === step) return res;

    const w = path[path.length - 1];

    for (let i = 0; i < w.length; i++) {
      for (let j = 0; j < 26; j++) {
        const w2 = w.slice(0, i) + String.fromCharCode(97 + j) + w.slice(i + 1); // 97 -> 'a'
        if (dict.has(w2) && w2 !== w) {
          if (!visited.has(w2)) {
            q.push([...path, w2]);
          }
          if (w2 === endWord) {
            if (path.length < step) {
              step = path.length + 1;
            }
            res.push([...path, w2]);
          }
        }
      }
    }
    visited.add(w);
  }
  return res;
};

/** 2) Bidirectional BFS */
// http://zxi.mytechroad.com/blog/searching/leetcode-126-word-ladder-ii/
