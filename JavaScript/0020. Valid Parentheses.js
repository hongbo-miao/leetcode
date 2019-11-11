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

// Time O(n)
// Space O(n), as we push all opening brackets onto the stack and in the worst case, we will end up pushing all the
//   brackets onto the stack. e.g. ((((((((((.
const isValid = (s) => {
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  const st = [];
  for (let c of s) {
    if (map[c]) {
      st.push(map[c]);
    } else {
      if (c !== st.pop()) return false;
    }
  }
  return st.length === 0;
};
