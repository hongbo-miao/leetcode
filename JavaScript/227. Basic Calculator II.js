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
  if (s == null || s.length === 0) return 0;

  // remove space
  s = s.replace(/\s/g, '');

  let st = [];
  let num = 0;
  let sign = '+';

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // number
    if (/\d/.test(c)) {
      // e.g. '14' -> 1 * 10 + 4
      num = num * 10 + Number(c);
    }

    // sign or last number
    if (/\D/.test(c) || i === s.length - 1) {
      if (sign === '-') st.push(-num);
      else if (sign === '+') st.push(num);
      else if (sign === '*') st.push(st.pop() * num);
      else if (sign === '/') st.push(~~(st.pop() / num));

      sign = c;
      num = 0;
    }
  }

  return st.reduce((a, b) => a + b);
}
