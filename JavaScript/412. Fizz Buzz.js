// Write a program that outputs the string representation of numbers from 1 to n.
//
// But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.
//
// Example:
//
// n = 15,
//
// Return:
// [
//   "1",
//   "2",
//   "Fizz",
//   "4",
//   "Buzz",
//   "Fizz",
//   "7",
//   "8",
//   "Fizz",
//   "Buzz",
//   "11",
//   "Fizz",
//   "13",
//   "14",
//   "FizzBuzz"
// ]

/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  let arr = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) arr.push('FizzBuzz');
    else if (i % 3 === 0) arr.push('Fizz');
    else if (i % 5 === 0) arr.push('Buzz');
    else arr.push(String(i));
  }

  return arr;
}
