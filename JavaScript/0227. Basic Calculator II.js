// Implement a basic calculator to evaluate a simple expression string.
// The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.
//
// Example 1:
//
// Input: "3+2*2"
// Output: 7
//
// Example 2:
//
// Input: " 3/2 "
// Output: 1
//
// Example 3:
//
// Input: " 3+5 / 2 "
// Output: 5
//
// Note:
//
// You may assume that the given expression is always valid.
// Do not use the eval built-in library function.

/**
 * @param {string} s
 * @return {number}
 */
const calculate = (s) => {
  s = s.replace(/\s/g, '');

  let st = [];
  let n = 0;
  let op = '+';

  for (const c of s) {
    if (isNum(c)) n = n * 10 + Number(c); // e.g. '14' -> 1 * 10 + 4
    else if (isOp(c)) {
      compute(op, st, n);
      op = c;
      n = 0;
    }
  }
  compute(op, st, n);
  return st.reduce((a, b) => a + b, 0);
};

const isNum = c => /\d/.test(c);
const isOp = c => /[+\-*/]/.test(c);
const compute = (op, st, n) => {
  if (op === '-') st.push(-n);
  else if (op === '+') st.push(n);
  else if (op === '*') st.push(st.pop() * n);
  else if (op === '/') st.push(~~(st.pop() / n));
};
