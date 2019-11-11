// Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.
//
// Note:
//
// - The length of both num1 and num2 is < 5100.
// - Both num1 and num2 contains only digits 0-9.
// - Both num1 and num2 does not contain any leading zero.
// - You must not use any built-in BigInteger library or convert the inputs to integer directly.

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = (num1, num2) => {
  let s = '';
  for (let i = num1.length - 1, j = num2.length - 1, carry = 0; i >= 0 || j >= 0 || carry === 1; i--, j--) {
    const n1 = i < 0 ? 0 : Number(num1[i]);
    const n2 = j < 0 ? 0 : Number(num2[j]);
    const sum = n1 + n2 + carry;
    s = String(sum % 10) + s;
    carry = ~~(sum / 10);
  }
  return s;
};
