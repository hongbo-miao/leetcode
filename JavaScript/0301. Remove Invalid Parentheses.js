// Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.
//
// Note: The input string may contain letters other than the parentheses ( and ).
//
// Example 1:
//
// Input: "()())()"
// Output: ["()()()", "(())()"]
//
// Example 2:
//
// Input: "(a)())()"
// Output: ["(a)()()", "(a())()"]
//
// Example 3:
//
// Input: ")("
// Output: [""]

// BFS
const removeInvalidParentheses = (s) => {
  let q = new Set([s]);
  while (q.size) {
    const q2 = new Set();
    for (const v of q) {
      if (isValid(v)) {
        return Array.from(q).filter(isValid);
      }

      for (let i = 0; i < v.length; i++) {
        q2.add(v.slice(0, i) + v.slice(i + 1));
      }
    }
    q = q2;
  }
  return [''];
};

const isValid = (s) => {
  let bal = 0;
  for (const c of s) {
    if (c === '(') bal++;
    else if (c === ')') bal--;
    if (bal < 0) return false;
  }
  return bal === 0;
};
