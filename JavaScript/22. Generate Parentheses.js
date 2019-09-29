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
  const res = [];

  function go(l, r, s) {  // l: left remaining, r: right remaining
    if (l > r) return;  // e.g. the number of ( should be >= ) at any moment

    if (l === 0 && r === 0) {
      res.push(s);
      return;
    }

    if (l > 0) go(l - 1, r, s + '(');
    if (r > 0) go(l, r - 1, s + ')');
  }

  go(n, n, '', res);
  return res;
}
