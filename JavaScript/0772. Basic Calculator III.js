// Implement a basic calculator to evaluate a simple expression string.
// The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .
// The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.
// You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].
//
// Some examples:
//
// "1 + 1" = 2
// " 6-4 / 2 " = 4
// "2*(5+5*2)/3+(6/2+8)" = 21
// "(2+6* 3+5- (3*14/7+2)*5)+3"=-12
//
// Note: Do not use the eval built-in library function.

/**
 * @param {string} s
 * @return {number}
 */

// Stack
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
        n = n * 10 + Number(c); // e.g. '14' -> 1 * 10 + 4
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
const isOp = c => /[+\-*/]/.test(c);
const compute = (op, st, n) => {
  if (op === '-') st.push(-n);
  else if (op === '+') st.push(n);
  else if (op === '*') st.push(st.pop() * n);
  else if (op === '/') st.push(~~(st.pop() / n));
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
