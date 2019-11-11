// Given an integer, write a function to determine if it is a power of three.
//
// Follow up:
// Could you do it without using any loop / recursion?

/**
 * @param {number} n
 * @return {boolean}
 */

/** 1) */
// Time O(log n). In our case that is O(log3 n). The number of divisions is given by that logarithm.
// Space O(1)
const isPowerOfThree1 = (n) => {
  if (n === 0) return false;
  while (n % 3 === 0) n /= 3;
  return n === 1;
};

/** 2) */
const isPowerOfThree2 = (n) => {
  for (let i = 0; i < n; i++) {
    if (3 ** i === n) return true;
    else if (3 ** i > n) return false;
  }
  return false;
};

/** 3) */
const isPowerOfThree3 = (n) => {
  return /^10*$/.test(n.toString(3));
};

/** 4) Mathematics */
// n = 3^i
// i = log3(n)
// i = log10(n) / log10(3)
const isPowerOfThree4 = (n) => {
  return (Math.log10(n) / Math.log10(3)) % 1 === 0; // using % 1 to get the decimal part
};

/** 5) Similar to 4) */
const isPowerOfThree = (n) => {
  return Number.isInteger(Math.log10(n) / Math.log10(3));
};
