// Count the number of prime numbers less than a non-negative number, n.
//
// Example:
//
// Input: 10
// Output: 4
// Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

/**
 * @param {number} n
 * @return {number}
 */

/** Sieve of Eratosthenes*/
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function countPrimes(n) {
  let map = [];
  let count = 0;

  for (let i = 2; i < n; i++){
    if (map[i] === 0) continue;

    // mark as prime
    map[i] = 1;
    count++;

    // mark as not prime
    for (let j = 2; i * j < n; j++) {
      map[i * j] = 0;
    }
  }

  return count;
}
