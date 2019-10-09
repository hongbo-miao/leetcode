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
function reverse1(x) {
  const n = Math.sign(x) *
    parseInt(String(x)
      .split('')
      .reverse()
      .join(''));

  if (n < -(2 ** 31) || n > 2 ** 31 - 1) return 0;
  return n;
}

/** 2) */
// Time complexity O(n)
// Space complexity O(1)
function reverse(x) {
  let n = 0;

  while (x !== 0) {
    n = n * 10 + x % 10;
    x = ~~(x / 10);

    if (n < -(2 ** 31) || n > 2 ** 31 - 1) return 0;
  }

  return n;
}
