// Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
//
// If the fractional part is repeating, enclose the repeating part in parentheses.
//
// Example 1:
//
// Input: numerator = 1, denominator = 2
// Output: "0.5"
//
// Example 2:
//
// Input: numerator = 2, denominator = 1
// Output: "2"
//
// Example 3:
//
// Input: numerator = 2, denominator = 3
// Output: "0.(6)"

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */

// Use hash map to store the remainder and its index while dividing. Whenever a same remainder shows, it is repeating fraction
function fractionToDecimal(numerator, denominator) {
  if (numerator === 0) return '0';
  let res = '';

  if (Math.sign(numerator) !== Math.sign(denominator)) res += '-';

  let n = Math.abs(numerator);
  const d = Math.abs(denominator);

  res += Math.floor(n / d);
  n %= d;

  if (n === 0) return res;

  res += '.';

  let map = {};

  while (n !== 0) {
    map[n] = res.length;

    n *= 10;
    res += Math.floor(n / d);
    n %= d;

    const i = map[n]; // repeat starting index
    if (i !== undefined) return `${res.substr(0, i)}(${res.substr(i)})`;
  }

  return res;
}
