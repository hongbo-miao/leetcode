// There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.
//
// Example 1:
//
// Input:
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]
//
// Output: "wertf"
//
// Example 2:
//
// Input:
// [
//   "z",
//   "x"
// ]
//
// Output: "zx"
//
// Example 3:
//
// Input:
// [
//   "z",
//   "x",
//   "z"
// ]
//
// Output: ""
//
// Explanation: The order is invalid, so return "".
//
// Note:
//
// You may assume all letters are in lowercase.
// You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
// If the order is invalid, return an empty string.
// There may be multiple valid order of letters, return any one of them is fine.

/**
 * @param {string[]} words
 * @return {string}
 */

/** Topological sorting */
// https://www.youtube.com/watch?v=RIrTuf4DfPE
function alienOrder(words) {
  // Build graph
  const graph = {};
  const inDegree = {};

  for (let w of words) {
    for (let c of w) {
      inDegree[c] = 0;
      graph[c] = [];
    }
  }

  for (let i = 1; i < words.length; i++) {
    const w1 = words[i - 1];
    const w2 = words[i];

    const len = Math.min(w1.length, w2.length);
    for (let j = 0; j < len; j++) {
      const c1 = w1[j];
      const c2 = w2[j];

      if (c1 !== c2) {
        if (!graph[c1].includes(c2)) {
          graph[c1].push(c2);
          inDegree[c2]++;
        }
        break;
      }
    }
  }

  // BFS
  let s = '';
  const q = [];

  for (let c in inDegree) {
    if (inDegree[c] === 0) q.push(c);
  }

  while (q.length) {
    const c1 = q.shift();  // If use pop() here, it will be DFS
    s += c1;
    for (const c2 of graph[c1]) {
      inDegree[c2]--;
      if (inDegree[c2] === 0) {
        q.push(c2);
      }
    }
  }

  return s.length === Object.keys(graph).length ? s : '';
}
