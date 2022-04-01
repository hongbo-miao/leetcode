// Implement pow(x, n), which calculates x raised to the power n (x^n).
//
// Example 1:
//
// Input: 2.00000, 10
// Output: 1024.00000
//
// Example 2:
//
// Input: 2.10000, 3
// Output: 9.26100
//
// Example 3:
//
// Input: 2.00000, -2
// Output: 0.25000
// Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
//
// Note:
//
// -100.0 < x < 100.0
// n is a 32-bit signed integer, within the range [−2^31, 2^31 − 1]

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

// 1) Cheating
const myPow1 = (x, n) => {
  return x ** n;
};

// 2) Brute force (time limit exceeded)
const myPow2 = (x, n) => {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let res = 1;
  for (let i = 0; i < n; i++) {
    res = res * x;
  }
  return res;
};

// 3) Fast power algorithm (recursive)
// Time O(log n)
// Space O(log n)
const myPow3 = (x, n) => {
  if (n === 0) return 1;
  if (n === -1) return 1 / x;

  if (n % 2) { // cannot be n % 2 === 1 because the result can be negative
    return x * myPow(x, n - 1); // 3^5 -> 3 * 3^4
  } else {
    const m = myPow(x, n / 2); // 3^4 -> 3^2 * 3^2
    return m * m;
  }
};

// 4) Similar to 3), but easier to understand
// Time O(log n)
// Space O(log n)
const myPow4 = (x, n) => {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  const go = (x, n) => {
    if (n === 0) return 1;

    if (n % 2 === 1) {
      return x * go(x, n - 1);
    } else {
      const m = go(x, n / 2);
      return m * m;
    }
  };

  return go(x, n);
};

// 5) Fast power algorithm (iterative)
// Time O(log n)
// Space O(1)
const myPow = (x, n) => {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let res = 1;
  let product = x;
  for (let i = n; i > 0; i = ~~(i / 2)) {
    if (i % 2 === 1) {
      res = res * product;
    }
    product = product * product;
  }
  return res;
};
