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

/** Backtracking */
function generateParenthesis(n) {
  let res = [];
  generate(n, n, '', res);
  return res;
}

function generate(l, r, s, res) { // l: left remaining, r: right remaining
  if (l > r) return;  // e.g. ))(

  if (!l && !r) return res.push(s);

  if (l) generate(l - 1, r, s + '(', res);
  if (r) generate(l, r - 1, s + ')', res);
}
