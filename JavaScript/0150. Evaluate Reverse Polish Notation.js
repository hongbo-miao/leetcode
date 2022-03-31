// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
//
// Valid operators are +, -, *, /. Each operand may be an integer or another expression.
//
// Note:
//
// Division between two integers should truncate toward zero.
// The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.
//
// Example 1:
//
// Input: ["2", "1", "+", "3", "*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9
//
// Example 2:
//
// Input: ["4", "13", "5", "/", "+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6
//
// Example 3:
//
// Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
// Output: 22
// Explanation:
//       ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
//     = ((10 * (6 / (12 * -11))) + 17) + 5
//     = ((10 * (6 / -132)) + 17) + 5
//     = ((10 * 0) + 17) + 5
//     = (0 + 17) + 5
//     = 17 + 5
//     = 22

/**
 * @param {string[]} tokens
 * @return {number}
 */
// 1) Stack
const evalRPN1 = (tokens) => {
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => ~~(a / b)
  };

  const st = [];
  for (const n of tokens) {
    if (ops[n] != null) {
      const fn = ops[n];
      const b = st.pop();
      const a = st.pop();

      st.push(fn(a, b));
    } else {
      st.push(Number(n));
    }
  }
  return st[0];
};

// 2) Similar to 1), but slower
const evalRPN = (tokens) => {
  if (tokens.length === 1) return Number(tokens[0]);

  const ops = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => ~~(Number(a) / Number(b)),
  };

  let i = 2;
  while (tokens.length > 1) {
    const a = tokens[i - 2];
    const b = tokens[i - 1];
    const c = tokens[i];

    if (ops[c] != null) {
      tokens = [
        ...tokens.slice(0, i - 2),
        String(ops[c](a, b)), ...tokens.slice(i + 1),
      ];
      i--;
    } else {
      i++;
    }
  }
  return tokens[0]
};
