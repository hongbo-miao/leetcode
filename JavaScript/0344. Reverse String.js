// Write a function that takes a string as input and returns the string reversed.
//
// Example:
// Given s = "hello", return "olleh".

/**
 * @param {string} s
 * @return {string}
 */

/** 1) Cheating */
const reverseString1 = (s) => {
  return s.split('').reverse().join('');
};

/** 2) Two pointers */
const reverseString = (s) => {
  const l = s.length - 1;
  for (let i = 0; i < ~~(s.length / 2); i++) {
    [s[i], s[l - i]] = [s[l - i], s[i]];
  }
};
