// Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.
//
// Example:
// Given a = 1 and b = 2, return 3.

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
/** 1) Iteration */
// e.g. 3 + 1
// 0b11 & 0b01 = 0b01
// 0b11 ^ 0b01 = 0b10
function getSum1(a, b) {
  while (b !== 0) {
    const carry = a & b; // carry over
    a = a ^ b; // sum without carry over
    b = carry << 1; // move the carry over to the correct position
  }

  return a;
}

/** 2) Recursion */
function getSum(a, b) {
  if (b === 0) return a;
  return getSum(a ^ b, (a & b) << 1);
}
