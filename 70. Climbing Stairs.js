// You are climbing a stair case. It takes n steps to reach to the top.
//
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
//
// Note: Given n will be a positive integer.
//
// Example 1:
//
// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
//
// Example 2:
//
// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

/**
 * @param {number} n
 * @return {number}
 */

/** Recursion */
// 1) time complexity O(2^n), space complexity O(n) - O(recursion depth)
function climbStairs1(n) {
  return climb(n);
}

function climb(n) {
  if (n < 2) return 1;
  return climb(n - 2) + climb(n - 1);
}

// 2) memoization
// time complexity O(n), space complexity O(n)
function climbStairs2(n) {
  return climb(n, [1, 1]);
}

function climb(n, cache) {
  if (cache[n]) return cache[n];

  cache[n] = climb(n - 2, cache) + climb(n - 1, cache);
  return cache[n];
}

/** Dynamic programming - Fibonacci */
// 1) time complexity O(n), space complexity O(n)
function climbStairs3(n) {
  let array = [1, 1];

  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 2] + array[i - 1];
  }

  return array[n];
}

// 2) time complexity O(n), space complexity O(1)
function climbStairs(n) {
  let a = 1;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }

  return b;
}
