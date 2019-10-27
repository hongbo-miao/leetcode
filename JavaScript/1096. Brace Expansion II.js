// Under a grammar given below, strings can represent a set of lowercase words.  Let's use R(expr) to denote the set of words the expression represents.
// Grammar can best be understood through simple examples:
//
// - Single letters represent a singleton set containing that word.
//   - R("a") = {"a"}
//   - R("w") = {"w"}
//
// - When we take a comma delimited list of 2 or more expressions, we take the union of possibilities.
//   - R("{a,b,c}") = {"a","b","c"}
//   - R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
//
// - When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
//   - R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
//   - R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
//
// Formally, the 3 rules for our grammar:
//
// - For every lowercase letter x, we have R(x) = {x}
// - For expressions e_1, e_2, ... , e_k with k >= 2, we have R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...
// - For expressions e_1 and e_2, we have R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}, where + denotes concatenation, and × denotes the cartesian product.
//
// Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.
//
// Example 1:
//
// Input: "{a,b}{c,{d,e}}"
// Output: ["ac","ad","ae","bc","bd","be"]
//
// Example 2:
//
// Input: "{{a,z},a{b,c},{ab,z}}"
// Output: ["a","ab","ac","z"]
// Explanation: Each distinct word is written only once in the final answer.
//
// Constraints:
//
// 1 <= expression.length <= 60
// expression[i] consists of '{', '}', ','or lowercase English letters.
// The given expression represents a set of words based on the grammar given in the description.

/**
 * @param {string} expression
 * @return {string[]}
 */

/** Recursion + Stack */
// https://leetcode.com/problems/brace-expansion-ii/discuss/318366/Java-Solution-using-stack
//
// Time O(N) traverse whole string , N means the item number of result list.
//   It may cost O(l^k) of length of the string, e.g. {a,b,c}{d,e,f}{g,h,i} is O((L/3)^3) = 27 items
// Space O(N) use stack save output list
const braceExpansionII = (expression) => {
  let sign = ',';
  const st = [];
  for (let i = 0; i < expression.length; i++) {
    let c = expression[i];
    // Case 1 {...} recursive
    if (c === '{') {
      let j = i;
      let bal = 1;
      while (expression[j] !== '}' || bal > 0) {
        j++;
        if (expression[j] === '{') bal++;
        if (expression[j] === '}') bal--;
      }
      const l = braceExpansionII(expression.slice(i + 1, j));
      if (sign === '*') {
        st.push(merge(st.pop(), l));
      } else {
        st.push(l);
      }
      i = j;
      sign = '*';
    } else if (isLetter(c)) {
      // Case 2 letter
      const l = [];
      l.push(c);
      if (sign === '*') {
        st.push(merge(st.pop(), l));
      } else {
        st.push(l);
      }
      sign = '*';
    } else if (c ===',') {
      // Case 3 ','
      sign = ',';
    }
  }

  // Flatten result. Some browsers do not support st.flat()
  const set = new Set();
  while (st.length) {
    for (let c of st.pop()) {
      set.add(c);
    }
  }
  return Array.from(set).sort();
};

const isLetter = (c) => /[a-z]/.test(c);

const merge = (l1, l2) => {
  const res = [];
  for (const s1 of l1) {
    for (const s2 of l2) {
      res.push(s1 + s2);
    }
  }
  return res;
};
