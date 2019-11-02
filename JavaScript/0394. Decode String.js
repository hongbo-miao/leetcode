// Given an encoded string, return its decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.
// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].
//
// Examples:
//
// s = "3[a]2[bc]", return "aaabcbc".
// s = "3[a2[c]]", return "accaccacc".
// s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

/**
 * @param {string} s
 * @return {string}
 */

/** Stack */
// After read:  3    [     a     ]     2    [    b      3       [      d       ]      c       ]
// countStack: (3)  (3)   (3)    ()   (2)  (2)  (2)   (2 3)   (2 3)   (2 3)   (2)    (2)      ()
//   resStack: ()   ('')  ('')   ()   ()  (aaa) (aaa) (aaa)  (aaa b) (aaa b)  (aaa) (aaa)     ()
//        res: ''    ''    a     aaa  aaa   ''   b      b       ''     d      bddd  bdddc  aaabdddcbdddc
function decodeString(s) {
  const isNum = c => /\d/.test(c);

  const countStack = [];
  const resStack = [];
  let res = '';
  let i = 0;

  while (i < s.length) {
    if (isNum(s[i])) {
      let count = 0;
      while (isNum(s[i])) {
        count = 10 * count + Number(s[i]);
        i++;
      }
      countStack.push(count);
    } else if (s[i] === '[') {
      resStack.push(res);
      res = '';
      i++;
    } else if (s[i] === ']') {
      const repeatTimes = countStack.pop();
      res = resStack.pop() + res.repeat(repeatTimes);
      i++;
    } else {
      res += s[i];
      i++;
    }
  }
  return res;
}
