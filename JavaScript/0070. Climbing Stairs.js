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

// 1) Recursion (time limit exceeded)
// Time O(2^n) - O(branch ^ recursion depth)
// Space O(n) - O(recursion depth)
const climbStairs1 = (n) => {
  if (n < 2) return 1;
  return climbStairs(n - 2) + climbStairs(n - 1);
};

// 2) Recursion (memoization)
// Time O(n)
// Space O(n)
const climbStairs2 = (n) => {
  const map = {};
  const go = (n) => {
    if (n < 2) return 1;
    if (map[n] != null) return map[n];
    map[n] = go(n - 2) + go(n - 1);
    return map[n];
  };
  return go(n);
};

// 3) Dynamic programming - Fibonacci
// Similar
// 70. Climbing Stairs
// 91. Decode Ways
//
// Time O(n)
// Space O(n)
const climbStairs3 = (n) => {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
};

// 4) Dynamic programming - Fibonacci (optimization)
// Time O(n)
// Space O(1)
const climbStairs = (n) => {
  let a = 1;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

// 5) Binet's Fibonacci number formula
// Time O(log n)
// Space O(1)
// https://leetcode.com/problems/climbing-stairs/solution/
