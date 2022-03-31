// Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.
// Return the quotient after dividing dividend by divisor.
// The integer division should truncate toward zero.
//
// Example 1:
//
// Input: dividend = 10, divisor = 3
// Output: 3
//
// Example 2:
//
// Input: dividend = 7, divisor = -3
// Output: -2
//
// Note:
//
// Both dividend and divisor will be 32-bit signed integers.
// The divisor will never be 0.
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 2^31 − 1 when the division res overflows.

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */

// 1) Cheating
const divide1 = (dividend, divisor) => {
  if (dividend === -(2 ** 31) && divisor === -1) return 2 ** 31 - 1;
  return ~~(dividend / divisor);
};

// 2)
// https://leetcode.com/problems/divide-two-integers/discuss/13407/Detailed-Explained-8ms-C++-solution
const divide = (dividend, divisor) => {
  if (dividend === -(2 ** 31) && divisor === -1) return 2 ** 31 - 1;

  const sign = Math.sign(dividend) * Math.sign(divisor);

  divisor = Math.abs(divisor);
  dividend = Math.abs(dividend);

  let multiple = 1;
  let res = 0;
  let tmp;

  while (dividend >= divisor) {
    multiple = 1;
    tmp = divisor;

    while (tmp <= (dividend >> 1)) {
      tmp = tmp << 1;
      multiple = multiple << 1;
    }

    res += multiple;
    dividend -= tmp;
  }
  return sign * res;
};
