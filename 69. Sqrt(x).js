// Implement int sqrt(int x).
//
// Compute and return the square root of x, where x is guaranteed to be a non-negative integer.
//
// Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.
//
// Example 1:
//
// Input: 4
// Output: 2
//
// Example 2:
//
// Input: 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since
// the decimal part is truncated, 2 is returned.

/**
 * @param {number} x
 * @return {number}
 */
/** 1) */
function mySqrt1(x) {
  return Math.floor(Math.sqrt(x));
}

/** 2) Integer square root */
// https://en.wikipedia.org/wiki/Integer_square_root
function mySqrt2(x) {
  let r = x;

  while (r * r > x) {
    r = ((r + x / r) / 2) | 0;
  }

  return r;
}

/** 3) Binary search */
function mySqrt(x) {
  let start = 1;
  let end = x;

  while (start < end - 1) {   // if start < end, x = 8, at some point, start = 2, end = 3, will enter loop
    const mid = Math.floor((start + end) / 2);

    if (mid * mid < x) {
      start = mid;
    } else if (mid * mid > x) {
      end = mid;
    } else {
      return mid;
    }
  }

  return Math.min(start, end);
}
