// Given a 32-bit signed integer, reverse digits of an integer.
//
// Example 1:
//
// Input: 123
// Output: 321
//
// Example 2:
//
// Input: -123
// Output: -321
//
// Example 3:
//
// Input: 120
// Output: 21
//
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

/**
 * @param {number} x
 * @return {number}
 */

/** 1) */
const reverse1 = (x) => {
  const n = Math.sign(x) *
    parseInt(String(x)
      .split('')
      .reverse()
      .join(''));

  if (n < -(2 ** 31) || n > 2 ** 31 - 1) return 0;
  return n;
};

/** 2) Pop and push */
// Time O(n)
// Space O(1)
//
// e.g. 123
// d: 3, x: 12, n: 3
// d: 2, x: 1,  n: 32
// d: 1, x: 0,  n: 321
const reverse = (x) => {
  let n = 0;

  while (x !== 0) {
    // pop
    const d = x % 10;
    x = ~~(x / 10);

    // push
    n = n * 10 + d;

    // Above codes can be combined to these, but hard to understand
    // n = n * 10 + x % 10;
    // x = ~~(x / 10);

    if (n < -(2 ** 31) || n > 2 ** 31 - 1) return 0;
  }
  return n;
};
