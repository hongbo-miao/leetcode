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

// Use hash map to store the remainder and its index while dividing.
// Whenever a same remainder shows, it is repeating fraction.
function fractionToDecimal(numerator, denominator) {
  // To avoid if numerator = 0, denominator = 1, then Math.sign(numerator) = 0, Math.sign(denominator) = 1, s = '-0'
  if (numerator === 0) return '0';

  let s = '';
  if (Math.sign(numerator) !== Math.sign(denominator)) s += '-';

  let n = Math.abs(numerator);
  const d = Math.abs(denominator);

  s += Math.floor(n / d);
  n %= d;

  if (n === 0) return s;

  s += '.';

  const map = {};

  while (n !== 0) {
    map[n] = s.length;

    n *= 10;
    s += Math.floor(n / d);
    n %= d;

    const i = map[n];  // repeat starting index
    if (i != null) return `${s.slice(0, i)}(${s.slice(i)})`;
  }

  return s;
}
