// Implement atoi which converts a string to an integer.
//
// The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.
//
// The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.
//
// If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.
//
// If no valid conversion could be performed, a zero value is returned.
//
// Note:
//
//   Only the space character ' ' is considered as whitespace character.
//   Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. If the numerical value is out of the range of representable values, INT_MAX (2^31 − 1) or INT_MIN (−2^31) is returned.
//
// Example 1:
//
// Input: "42"
// Output: 42
//
// Example 2:
//
// Input: "   -42"
// Output: -42
// Explanation: The first non-whitespace character is '-', which is the minus sign.
//   Then take as many numerical digits as possible, which gets 42.
//
// Example 3:
//
// Input: "4193 with words"
// Output: 4193
// Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
//
// Example 4:
//
// Input: "words and 987"
// Output: 0
// Explanation: The first non-whitespace character is 'w', which is not a numerical
// digit or a +/- sign. Therefore no valid conversion could be performed.
//
// Example 5:
//
// Input: "-91283472332"
// Output: -2147483648
// Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
//   Thefore INT_MIN (−231) is returned.

/**
 * @param {string} str
 * @return {number}
 */
function myAtoi(str) {
  // (abc) capture group
  //
  // [abc]	any of a, b, or c
  // [^abc]	not a, b, or c
  //
  // a{5} a{2,}	exactly five, two or more
  // a{1,3}	between one & three
  //
  // \w \d \s	word, digit, whitespace
  // \W \D \S	not word, digit, whitespace
  const match = str.match(/^ *([+-]{0,1}\d+)/);

  if (!match) return 0;

  const num = Number(match[1]); // regex uses capturing group, so here uses match[1]

  if (num < -Math.pow(2, 31)) return -Math.pow(2, 31);
  if (num > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;

  return num;
}
