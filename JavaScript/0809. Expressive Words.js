// Sometimes people repeat letters to represent extra feeling, such as "hello" -> "heeellooo", "hi" -> "hiiii".  In these strings like "heeellooo", we have groups of adjacent letters that are all the same:  "h", "eee", "ll", "ooo".
// For some given string S, a query word is stretchy if it can be made to be equal to S by any number of applications of the following extension operation: choose a group consisting of characters c, and add some number of characters c to the group so that the size of the group is 3 or more.
// For example, starting with "hello", we could do an extension on the group "o" to get "hellooo", but we cannot get "helloo" since the group "oo" has size less than 3.  Also, we could do another extension like "ll" -> "lllll" to get "helllllooo".  If S = "helllllooo", then the query word "hello" would be stretchy because of these two extension operations: query = "hello" -> "hellooo" -> "helllllooo" = S.
// Given a list of query words, return the number of words that are stretchy.
//
// Example:
// Input:
// S = "heeellooo"
// words = ["hello", "hi", "helo"]
// Output: 1
// Explanation:
// We can extend "e" and "o" in the word "hello" to get "heeellooo".
// We can't extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.
//
// Notes:
//
// 0 <= len(S) <= 100.
// 0 <= len(words) <= 100.
// 0 <= len(words[i]) <= 100.
// S and all words in words consist only of lowercase letters

/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
/** Four pointers */
// https://leetcode.com/problems/expressive-words/discuss/122660/C%2B%2BJavaPython-2-Pointers-and-4-pointers
// Easier to understand than two pointers method
const expressiveWords = (S, words) => {
  const isStretchy = (w) => {
    let i = 0;
    let j = 0;
    for (let i2 = 0, j2 = 0; i < S.length && j < w.length; i = i2, j = j2) {
      if (S[i] !== w[j]) return false;
      while (i2 < S.length && S[i2] === S[i]) i2++;
      while (j2 < w.length && w[j2] === w[j]) j2++;

      // e.g. When substring length different, the length of S substring has to be at least 3 and also has to be >= word substring.
      // Valid S 'ooo' and word 'o'
      // Valid S 'ooooo' and word 'oooo'
      if (i2 - i !== j2 - j && i2 - i < Math.max(3, j2 - j)) return false;
    }

    // Not valid S 'abcd' and word 'abc'
    // Not valid S 'abc' and word 'abcd'
    return i === S.length && j === w.length;
  };

  let res = 0;
  for (const w of words) {
    if (isStretchy(w)) res++;
  }
  return res;
};
