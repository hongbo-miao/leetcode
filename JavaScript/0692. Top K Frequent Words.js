// Given a non-empty list of words, return the k most frequent elements.
// Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.
//
// Example 1:
// Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
// Output: ["i", "love"]
// Explanation: "i" and "love" are the two most frequent words.
//     Note that "i" comes before "love" due to a lower alphabetical order.
//
// Example 2:
// Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
// Output: ["the", "is", "sunny", "day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
//     with the number of occurrence being 4, 3, 2 and 1 respectively.
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Input words contain only lowercase letters.
//
// Follow up:
// Try to solve it in O(n log k) time and O(n) extra space.

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */

// 1) Sorting
// Time O(n log n)
// Space O(n)
const topKFrequent = (words, k) => {
  if (words == null || words.length === 0) return null;

  const map = {};
  for (const w of words) {
    if (map[w] == null) map[w] = 0;
    map[w]++;
  }

  const compare = (w1, w2) => {
    if (map[w1] !== map[w2]) return map[w2] - map[w1];
    return w1.localeCompare(w2);
  };
  return Object.keys(map).sort(compare).slice(0, k);
};

// 2) Priority Queue
// JavaScript is lack of priority queue, check Python version
