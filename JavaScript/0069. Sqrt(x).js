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
/** 1) Cheating */
const mySqrt1 = (x) => {
  return ~~(x ** 0.5);
};

/** 2) */
// Time O(n)
// Space O(1)
const mySqrt2 = (x) => {
  for (let i = 0; i <= x; i++) {
    if (i * i === x) return i;
    else if (i * i > x) return i - 1;
  }
  return x;
};

/** 3) Integer square root */
// https://en.wikipedia.org/wiki/Integer_square_root
const mySqrt3 = (x) => {
  let r = x;
  while (r * r > x) {
    r = ((r + x / r) / 2) | 0;
  }
  return r;
};

/** 4) Binary search */
// Time O(log n)
// Space O(1)
const mySqrt = (x) => {
  let l = 1;
  let r = x;

  while (l <= r) {
    const m = ~~((l + r) / 2);

    if (m * m === x) return m;
    else if (m * m < x) l = m + 1;
    else r = m - 1;
  }
  return r;
};
