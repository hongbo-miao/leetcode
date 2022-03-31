// The count-and-say sequence is the sequence of integers with the first five terms as following:
//
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
//
// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// Given an integer n, generate the nth term of the count-and-say sequence.
//
// Note: Each term of the sequence of integers will be represented as a string.
//
// Example 1:
//
// Input: 1
// Output: "1"
//
// Example 2:
//
// Input: 4
// Output: "1211"

/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = (n) => {
  let s = '1';
  for (let i = 0; i < n - 1; i++) {
    s = say(s);
  }
  return s;
};

const say = (s) => {
  let res = '';
  let count = 0;
  let n = s[0];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === n) {
      count++;
    } else {
      res += count + s[i - 1];
      count = 1;
      n = s[i];
    }
  }
  return res + count + n;
};
