// A string S of lowercase letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.
//
// Example 1:
// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
//
// Note:
//
// S will have length in range [1, 500].
// S will consist of lowercase letters ('a' to 'z') only.

/**
 * @param {string} S
 * @return {number[]}
 */

/** Greedy */
// Let's try to repeatedly choose the smallest left-justified partition.
// Consider the first label, say it's 'a'. The first partition must include it, and also the last occurrence of 'a'.
// However, between those two occurrences of 'a', there could be other labels that make the minimum size of this partition bigger.
// For example, in "abccaddbeffe", the minimum first partition is "abccaddb".
// This gives us the idea for the algorithm: For each letter encountered, process the last occurrence of that letter,
// extending the current partition [start, end] appropriately.
function partitionLabels(S) {
  if (S == null || S.length === 0) return null;

  const res = [];
  const map = {};  // record the last seen index of the each char

  for (let i = 0; i < S.length; i++) {
    map[S[i]] = i;
  }

  // record the end index of the current sub string
  let last = 0;
  let start = 0;
  for (let i = 0; i < S.length; i++) {
    last = Math.max(last, map[S[i]]);
    if (last === i) {
      res.push(last - start + 1);
      start = last + 1;
    }
  }
  return res;
}
