// Given an integer n, return the number of trailing zeroes in n!.
//
// Example 1:
//
// Input: 3
// Output: 0
// Explanation: 3! = 6, no trailing zero.
//
// Example 2:
//
// Input: 5
// Output: 1
// Explanation: 5! = 120, one trailing zero.
// Note: Your solution should be in logarithmic time complexity.

/**
 * @param {number} n
 * @return {number}
 */

/** 1 */
// each 2 * 5 will have a 0, since there are a lot of 2, so only need count the number of 5 in n!
// e.g. 26, res = (25 / 5) + (5 / 5) = 6
const trailingZeroes1 = (n) => {
  let count = 0;
  for (let i = n; i > 0; i = ~~(i / 5)) {
    count += ~~(i / 5);
  }
  return count;
};

/** 2 */
const trailingZeroes = (n) => {
  return n === 0 ?
    0 :
    ~~(n / 5) + trailingZeroes(~~(n / 5));
};
