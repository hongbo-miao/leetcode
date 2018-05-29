// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
//
// For example, given n = 3, a solution set is:
//
//   [
//     "((()))",
//     "(()())",
//     "(())()",
//     "()(())",
//     "()()()"
//   ]

/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  let res = [];
  compose(n, n, '', res);
  return res;
}

// backtracking
function compose(left, right, s, res) { // left: left remaining, right: right remaining
  if (left > right) return;   // e.g. ))(

  if (!left && !right) {
    res.push(s);
    return;
  }

  if (left) compose(left - 1, right, s + '(', res);
  if (right) compose(left, right - 1, s + ')', res);
}
