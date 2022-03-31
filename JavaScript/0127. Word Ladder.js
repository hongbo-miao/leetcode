// Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:
//
// 1. Only one letter can be changed at a time.
// 2. Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
//
// Note:
//
// - Return 0 if there is no such transformation sequence.
// - All words have the same length.
// - All words contain only lowercase alphabetic characters.
// - You may assume no duplicates in the word list.
// - You may assume beginWord and endWord are non-empty and are not the same.
//
// Example 1:
//
// Input:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]
//
// Output: 5
//
// Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.
//
// Example 2:
//
// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
//
// Output: 0
//
// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

// 1) BFS
// Time O(M * N), where M is the length of words and N is the total number of words in the input word list. Finding
//   out all the transformations takes M iterations for each of the N words. Also, breadth first search in the worst
//   case might go to each of the N words.
//
// Space O(M * N), to store all M transformations for each of the N words, in the all_combo_dict dictionary. Visited
// dictionary is of N size. Queue for BFS in worst case would need space for all N words.
const ladderLength = (beginWord, endWord, wordList) => {
  const dict = new Set(wordList);
  let step = 1;
  let q = [beginWord];

  while (q.length) {
    const q2 = [];
    for (const w of q) {
      if (w === endWord) return step;

      for (let i = 0; i < w.length; i++) {
        for (let j = 0; j < 26; j++) {
          const w2 = w.slice(0, i) + String.fromCharCode(97 + j) + w.slice(i + 1); // 97 -> 'a'
          if (dict.has(w2) && w2 !== w) {
            q2.push(w2);
            dict.delete(w2);
          }
        }
      }
    }
    q = q2;
    step++;
  }
  return 0;
};

// 2) Bidirectional BFS
// https://leetcode.com/problems/word-ladder/solution/
//
// Time O(M * N), where M is the length of words and NN is the total number of words in the input word list. Similar
//   to one directional, bidirectional also takes M*N for finding out all the transformations. But the search time
//   reduces to half, since the two parallel searches meet somewhere in the middle.
//
// Space O(M * N), to store all MM transformations for each of the N words, in the all_combo_dict dictionary, same
//   as one directional. But bidirectional reduces the search space. It narrows down because of meeting in the middle.
