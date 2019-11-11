// Reverse bits of a given 32 bits unsigned integer.
//
// Example:
//
// Input: 43261596
// Output: 964176192
// Explanation: 43261596 represented in binary as 00000010100101000001111010011100,
//      return 964176192 represented in binary as 00111001011110000010100101000000.
//
// Follow up:
// If this function is called many times, how would you optimize it?

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
const reverseBits = (n) => {
  return parseInt( // Binary string to decimal, parseInt('101', 2) -> 5
    n
      .toString(2) // '5'.toString(2) -> '101'
      .padStart(32, '0') // Padding 0 to the front, '10'.padStart(5, 0) -> '00010'
      .split('')
      .reverse()
      .join(''),
    2);
};
