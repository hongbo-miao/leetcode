// Return all non-negative integers of length N such that the absolute difference between every two consecutive digits is K.
//
// Note that every number in the answer must not have leading zeros except for the number 0 itself. For example, 01 has one leading zero and is invalid, but 0 is valid.
//
// You may return the answer in any order.
//
// Example 1:
//
// Input: N = 3, K = 7
// Output: [181,292,707,818,929]
// Explanation: Note that 070 is not a valid number, because it has leading zeroes.
// Example 2:
//
// Input: N = 2, K = 1
// Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
//
// Note:
//
// 1 <= N <= 9
// 0 <= K <= 9

/**
 * @param {number} N
 * @param {number} K
 * @return {number[]}
 */

/** Brute force */
// Time O(2^n)
// Space O(2^n)
//
// Let's try to write some number in the answer digit by digit.
// For each digit except the first, there are at most 2 choices for that digit. This means that there are at most
// 9 * 2^8  possible 9 digit numbers, for example. This is small enough to brute force.
const numsSameConsecDiff = (N, K) => {
  let set = new Set();
  for (let i = 1; i <= 9; i++) {
    set.add(i);
  }

  for (let steps = 1; steps <= N - 1; steps++) {
    const set2 = new Set();
    for (let n of set) {
      const d = n % 10;
      if (d - K >= 0) set2.add(10 * n + (d - K));
      if (d + K <= 9) set2.add(10 * n + (d + K));
    }
    set = set2;
  }

  // Be careful about leading zeroes - only 1 digit numbers will start with 0.
  if (N === 1) set.add(0);
  return Array.from(set);
};
