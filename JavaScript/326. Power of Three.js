// Given an integer, write a function to determine if it is a power of three.
//
// Follow up:
// Could you do it without using any loop / recursion?

/**
 * @param {number} n
 * @return {boolean}
 */

/** 1) */
function isPowerOfThree1(n) {
  for (let i = 0; i < n; i++) {
    if (3 ** i === n) return true;
    else if (3 ** i > n) return false;
  }
  return false;
}

/** 2) */
function isPowerOfThree(n) {
  return /^10*$/.test(n.toString(3));
}
