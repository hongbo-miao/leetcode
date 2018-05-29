// Given an integer, write a function to determine if it is a power of three.
//
// Follow up:
// Could you do it without using any loop / recursion?

/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfThree(n) {
  return /^10*$/.test(n.toString(3));
}
