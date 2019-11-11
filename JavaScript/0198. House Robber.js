// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
//
// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
//
// Example 1:
//
// Input: [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
//   Total amount you can rob = 1 + 3 = 4.
//
// Example 2:
//
// Input: [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
//   Total amount you can rob = 2 + 9 + 1 = 12.

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) Recursion */
// Time O(n)
// Space O(n)
const rob1 = (nums) => {
  const map = {};

  const count = (n) => {
    if (n < 0) return 0;
    if (map[n] != null) return map[n];

    map[n] = Math.max(
      count(n - 2) + nums[n],
      count(n - 1),
    );
    return map[n];
  };

  return count(nums.length - 1)
};

/** 2) Iteration (dynamic programming) */
// Time O(n)
// Space O(n)
const rob2 = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp = [nums[0], Math.max(nums[0], nums[1])];

  for (let i = 2; i < nums.length; i++) {
    dp.push(Math.max(dp[i - 2] + nums[i], dp[i - 1]));
  }
  return dp[dp.length - 1];
};

/** 3) Iteration */
// Time O(n)
// Space O(1)
const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let a = nums[0];
  let b = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const max = Math.max(a + nums[i], b);
    a = b;
    b = max;
  }
  return b;
};
