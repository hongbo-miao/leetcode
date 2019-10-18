// Write an algorithm to determine if a number is "happy".
//
// A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.
//
// Example:
//
// Input: 19
// Output: true
// Explanation:
// 1^2 + 9^2 = 82
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1

/**
 * @param {number} n
 * @return {boolean}
 */
/** 1) */
function isHappy1(n) {
  const map = {};

  while (n !== 1 && map[n] == null) {
    map[n] = true;
    n = sumOfSquares(n);
  }

  return n === 1;
}

function sumOfSquares(num) {
  return String(num)
    .split('')
    .reduce((sum, n) => sum + Number(n) ** 2, 0);
}

/** 2) */
function isHappy(n) {
  const map = {};

  function go(num) {
    if (num === 1) return true;
    if (map[num] != null) return false;
    map[num] = true;

    const s = String(num).split('');
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += Number(s[i]) ** 2;
    }
    return go(sum);
  }

  return go(n);
}
