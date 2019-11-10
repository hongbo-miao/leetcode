// Given a string S, consider all duplicated substrings: (contiguous) substrings of S that occur 2 or more times.  (The occurrences may overlap.)
// Return any duplicated substring that has the longest possible length.  (If S does not have a duplicated substring, the answer is "".)
//
// Example 1:
//
// Input: "banana"
// Output: "ana"
// Example 2:
//
// Input: "abcd"
// Output: ""
//
// Note:
//
// 2 <= S.length <= 10^5
// S consists of lowercase English letters.

/**
 * @param {string} S
 * @return {string}
 */

/** Binary Search + Rabin-Karp */
// Time O(n log n). O(log n) for the binary search and O(N) for Rabin-Karp algorithm.
// Space O(n) to keep the hashset.
//
// Split into two subtasks
// Here we have "two in one" problem :
// 1. Perform a search by a substring length in the interval from 1 to N.
// 2. Check if there is a duplicate substring of a given length L.
//
// Subtask one : Binary search
// A naive solution would be to check all possible string length one by one starting from N - 1: if there is
// a duplicate substring of length N - 1, then of length N - 2, etc. Note that if there is a duplicate substring
// of length k, that means that there is a duplicate substring of length k - 1. Hence one could use a binary search
// by string length here, and have the first problem solved in O(logN) time.
//
// Subtask two : Rabin-Karp
// Check if there is duplicate substring of a given length, is a multiple pattern search.
// Let's use Rabin-Karp algorithm to solve it in a linear time.
// The idea is very simple:
// 1. Move a sliding window of length L along the string of length N.
// 2. Check if the string in the sliding window is in the hashset of already seen strings.
//   1) If yes, the duplicate substring is right here.
//   2) If not, save the string in the sliding window in the hashset.
//
// The linear time implementation of this idea is a bit tricky because of two technical problems:
// 1. How to implement a string slice in a constant time?
// 2. Hashset memory consumption could be huge for very long strings. One could keep the string hash instead of
//    string itself but hash generation costs O(L) for the string of length L, and the complexity of algorithm
//    would be O((N−L)L), N - L for the slice and L for the hash generation.
//    One has to think how to generate hash in a constant time here.
// String slice in a constant time
// The simplest solution both for Java and Python is to convert string to integer array of ascii-values.
//
// Rolling hash: hash generation in a constant time
// To generate hash of array of length L, one needs O(L) time.
//
// How to have constant time of hash generation? Use the advantage of slice: only one integer in, and only one - out.
//
// That's the idea of rolling hash. Here we'll implement the simplest one, polynomial rolling hash. Beware that's polynomial rolling hash is NOT the Rabin fingerprint.
// Since one deals here with lowercase English letters, all values in the integer array are between 0 and 25 : arr[i] = (int)S.charAt(i) - (int)'a'.
// So one could consider string abcd -> [0, 1, 2, 3] as a number in a numeral system with the base 26. Hence abcd -> [0, 1, 2, 3] could be hashed as
// h0 = 0 * 26^3 + 1 * 26^2 + 2 * 26^1 + 3 * 26^0
//
// Now let's consider the slice abcd -> bcde. For int arrays that means [0, 1, 2, 3] -> [1, 2, 3, 4], to remove number 0 and to add number 4.
// h1 = (h0 - 0 * 26^3) * 26 + 4 * 26^0
// Now hash regeneration is perfect and fits in a constant time. There is one more issue to address: possible overflow problem.
//
// How to avoid overflow
// a^L could be a large number and hence the idea is to set limits to avoid the overflow. To set limits means to
// limit a hash by a given number called modulus and use everywhere not hash itself but h % modulus.
//
// It's quite obvious that modulus should be large enough, but how large? Here one could read more about the topic
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use, for the problem here the standard int overflow in 2^32 is enough.
// In a real life, when not all testcases are known in advance, one has to check if the strings with equal hashes are
// truly equal. Such false-positive strings could happen because of a modulus which is too small and strings which are too long.
// That leads to Rabin-Karp time complexity O(NL) in the worst case then almost all strings are false-positive.
// Here it's not the case because all testcases are known and one could adjust the modulus.

const longestDupSubstring = (S) => {
  const n = S.length;
  // convert string to array of integers to implement constant time slice
  const nums = [];
  for (let i = 0; i < n; ++i) {
    nums[i] = S[i].charCodeAt(0) - 97;
  }

  const mod = 2 ** 32; // modulus value for the rolling hash function to avoid overflow

  const search = (len) => {
    // compute the hash of string S[:L]
    let hash = 0;
    for (let i = 0; i < len; i++) {
      hash = (hash * 26 + nums[i]) % mod;
    }

    // Already seen hashes of strings of length L (len)
    const seen = new Set();
    seen.add(hash);
    // const value to be used often : 26 ** len % mod
    let aL = 1;
    for (let i = 1; i <= len; i++) {
      aL = (aL * 26) % mod;  // mod is help to avoid overflow
    }

    for (let start = 1; start < n - len + 1; start++) {
      // Compute rolling hash in O(1) time
      // hash = (hash * 26 - nums[start - 1] * aL) + nums[start - 1 + len]; // without mod
      hash = ((hash * 26 - nums[start - 1] * aL % mod + mod) % mod + nums[start - 1 + len]) % mod;
      if (seen.has(hash)) return start;
      seen.add(hash);
    }
    return -1;
  };

  // Binary search
  let l = 0;
  let r = n;
  while (l < r) {
    const m = ~~((l + r) / 2); // m = repeating string length
    if (search(m) !== -1) l = m + 1;
    else r = m;
  }

  const start = search(l - 1);
  return S.slice(start, start + l - 1);
};
