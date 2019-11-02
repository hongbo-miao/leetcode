// Implement a basic calculator to evaluate a simple expression string.
// The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .
//
// Example 1:
//
// Input: "1 + 1"
// Output: 2
//
// Example 2:
//
// Input: " 2-1 + 2 "
// Output: 3
//
// Example 3:
//
// Input: "(1+(4+5+2)-3)+(6+8)"
// Output: 23
//
// Note:
// You may assume that the given expression is always valid.
// Do not use the eval built-in library function.

/**
 * @param {string} s
 * @return {number}
 */

/** Stack */
// Similar
// 224. Basic Calculator
// 227. Basic Calculator II
// 772. Basic Calculator III
//
// Time O(n)
// Space O(n)
const calculate = (s) => {
  s = s.replace(/\s/g, '');
  const bracketMap = getBracketMap(s);

  const calc = (start, end) => {
    const st = [];
    let op = '+';
    let n = 0;
    for (let i = start; i < end; i++) {
      const c = s[i];
      if (isNum(c)) {
        n = n * 10 + Number(c);
      } else if (c === '(') {
        n = calc(i + 1, bracketMap[i]);
        i = bracketMap[i];
      } else if (isOp(c)) {
        compute(op, st, n);
        op = c;
        n = 0;
      }
    }
    compute(op, st, n);
    return st.reduce((a, b) => a + b, 0);
  };

  return calc(0, s.length);
};

const isNum = c => /\d/.test(c);
const isOp = c => /[+\-]/.test(c);
const compute = (op, st, n) => {
  if (op === '-') st.push(-n);
  else if (op === '+') st.push(n);
};
const getBracketMap = (s) => {
  const map = {};
  const st = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      st.push(i);
    } else if (s[i] === ')') {
      map[st.pop()] = i;
    }
  }
  return map;
};
