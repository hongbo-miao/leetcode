// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
//
// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
//
// Example:
//
// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
//
// Note:
//
// Although the above answer is in lexicographical order, your answer could be in any order you want.

/**
 * @param {string} digits
 * @return {string[]}
 */

/** 1) DFS */
function letterCombinations(digits) {
  if (digits.length === 0) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  };

  let prefix = [];
  let res = [];

  function go(i) {
    if (i === digits.length) {
      res.push(prefix.join(''));
      return;
    }

    for (let c of map[digits[i]]) {
      prefix.push(c);
      go(i + 1);
      prefix.pop();
    }
  }

  go(0);
  return res;
}

/** 2) Similar to 1), but easier to understand */
function letterCombinations(digits) {
  if (digits.length === 0) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  let res = [];
  function go(i, s) {
    if (i === digits.length) {
      res.push(s);
      return;
    }

    for (let c of map[digits[i]]) {
      go(i + 1, s + c);
    }
  }

  go(0, '');
  return res;
}
