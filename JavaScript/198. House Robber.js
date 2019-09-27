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
// time O(n)
// space O(n)
function rob1(nums) {
  return count(nums.length - 1, {}, nums)
}

function count(n, map, nums) {
  if (n < 0) return 0;
  if (map[n] != null) return map[n];

  map[n] = Math.max(
    count(n - 2, map, nums) + nums[n],
    count(n - 1, map, nums)
  );

  return map[n];
}

/** 2) Iteration */
// time O(n)
// space O(n)
function rob2(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const totals = [nums[0], Math.max(nums[0], nums[1])];

  for (let i = 2; i < nums.length; i++) {
    totals.push(Math.max(totals[i - 2] + nums[i], totals[i - 1]));
  }

  return totals[totals.length - 1];
}

/** 3) Iteration */
// time O(n)
// space O(1)
function rob3(nums) {
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
}

/** 4) Iteration */
// time O(n)
// space O(1)
function rob(nums) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) a = Math.max(a + nums[i], b);
    else b = Math.max(a, b + nums[i]);
  }

  return Math.max(a, b);
}
