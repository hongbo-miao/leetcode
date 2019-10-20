// Implement a basic calculator to evaluate a simple expression string.
//
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
//   You may assume that the given expression is always valid.
//   Do not use the eval built-in library function.

/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
  if (s == null || s.length === 0) return null;

  const isNumber = c => /\d/.test(c);
  const isSign = c => /\D/.test(c);

  // remove space
  s = s.replace(/\s/g, '');

  let st = [];
  let n = 0;
  let sign = '+';

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // number
    if (isNumber(c)) n = n * 10 + Number(c); // e.g. '14' -> 1 * 10 + 4

    // sign or last number
    if (isSign(c) || i === s.length - 1) {
      if (sign === '-') st.push(-n);
      else if (sign === '+') st.push(n);
      else if (sign === '*') st.push(st.pop() * n);
      else if (sign === '/') st.push(~~(st.pop() / n));

      sign = c;
      n = 0;
    }
  }
  return st.reduce((a, b) => a + b);
}
