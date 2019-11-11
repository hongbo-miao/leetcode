// Given a column title as appear in an Excel sheet, return its corresponding column number.
//
// For example:
//
// A -> 1
// B -> 2
// C -> 3
// ...
// Z -> 26
// AA -> 27
// AB -> 28
// ...
//
// Example 1:
//
// Input: "A"
// Output: 1
//
// Example 2:
//
// Input: "AB"
// Output: 28
//
// Example 3:
//
// Input: "ZY"
// Output: 701

/**
 * @param {string} s
 * @return {number}
 */
const titleToNumber = (s) => {
  let n = 0;
  for (const c of s) {
    n = n * 26 + (c.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
  }
  return n;
};
