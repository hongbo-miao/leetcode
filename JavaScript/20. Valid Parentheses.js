// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
//
// An input string is valid if:
//
//   1. Open brackets must be closed by the same type of brackets.
//   2. Open brackets must be closed in the correct order.
//
// Note that an empty string is also considered valid.
//
// Example 1:
//
// Input: "()"
// Output: true
//
// Example 2:
//
// Input: "()[]{}"
// Output: true
//
// Example 3:
//
// Input: "(]"
// Output: false
//
// Example 4:
//
// Input: "([)]"
// Output: false
//
// Example 5:
//
// Input: "{[]}"
// Output: true

/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  const stack = [];

  for (let c of s) {
    if (map[c]) {
      stack.push(map[c]);
    } else {
      if (c !== stack.pop()) return false;
    }
  }

  return !stack.length;
}
