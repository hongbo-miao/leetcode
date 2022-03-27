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

/** 1) Brute force */
// Time O((2^2n) * n) For each of 2^2n sequences, we need to create and validate the sequence, which takes O(n) work.
// Space O((2^2n) * n)
//
// We can generate all 2^2n sequences of '(' and ')' characters. Then, we will check if each one is valid.
const generateParenthesis1 = (n) => {
  let res = [];

  const generate = (arr) => {
    if (arr.length === 2 * n) {
      if (valid(arr)) {
        res.push(arr.join(''));
      }
    } else {
      arr.push('(');
      generate(arr);
      arr.pop();
      arr.push(')');
      generate(arr);
      arr.pop();
    }
  };

  const valid = (arr) => {
    let bal = 0;
    for (const c of arr) {
      if (c === '(') bal += 1;
      else bal -= 1;
      if (bal < 0) return false
    }
    return bal === 0;
  };

  generate([]);
  return res;
};

/** 2) Backtracking */
// The complexity analysis rests on understanding how many elements there are in generateParenthesis(n). It turns out
// this is the n-th Catalan number 1 / n+1 (2n n), which is bounded asymptotically by 4^n / (n * sqrt(n))
// Time O(4^n / sqrt(n)). Each valid sequence has at most n steps during the backtracking procedure.
// Space O(4^n / sqrt(n)). As described above, and using O(n) space to store the sequence.

const generateParenthesis2 = (n) => {
  const res = [];

  const go = (l, r, s) => {
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }

    if (l < n) go(l + 1, r, s + '(');
    if (r < l) go(l, r + 1, s + ')');
  };

  go(0, 0, '');
  return res;
};

/** 3) Backtracking, similar to 2) */
const generateParenthesis3 = (n) => {
  const res = [];

  const go = (l, r, s) => { // l: left remaining, r: right remaining
    if (l > r) return; // Validate by the number of '(' should be always >= ')'

    if (l === 0 && r === 0) {
      res.push(s);
      return;
    }

    if (l > 0) go(l - 1, r, s + '(');
    if (r > 0) go(l, r - 1, s + ')');
  };

  go(n, n, '');
  return res;
};

/** 4) Closure number */
// Time O(4^n / sqrt(n))
// Space O(4^n / sqrt(n))
//
// To enumerate something, generally we would like to express it as a sum of disjoint subsets that are easier to count.
//
// Consider the closure number of a valid parentheses sequence S: the least index >= 0 so that
// S[0], S[1], ..., S[2*index+1] is valid. Clearly, every parentheses sequence has a unique closure number.
// We can try to enumerate them individually.
//
// Algorithm
//
// For each closure number i, we know the starting and ending brackets must be at index 0 and 2*i + 1. Then, the
// 2*i elements between must be a valid sequence, plus the rest of the elements must be a valid sequence.
const generateParenthesis = (n) => {
  const res = [];
  if (n === 0) {
      res.push('');
  } else {
    for (let i = 0; i < n; i++) {
      for (const l of generateParenthesis(i)) {
        for (const r of generateParenthesis(n - 1 - i)) {
          res.push('(' + l + ')' + r);
        }
      }
    }
  }
  return res;
};
