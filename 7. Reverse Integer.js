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
  const res = Math.sign(x) *
    parseInt(String(x)
      .split('')
      .reverse()
      .join(''));

  if (res < -(2 ** 31) || res > 2 ** 31 - 1) return 0;
  return res;
}

/** 2) */
// Time complexity O(n)
// Space complexity O(1)
function reverse(x) {
  let res = 0;

  while (x !== 0) {
    res = res * 10 + x % 10;
    x = ~~(x / 10);

    if (res < -(2 ** 31) || res > 2 ** 31 - 1) return 0;
  }

  return res;
}
