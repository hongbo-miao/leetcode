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
/** recursive */
// time complexity O(n), space complexity O(n)
function rob1(nums) {
  return count(nums.length - 1, [], nums)
}

function count(n, cache, nums) {
  if (n < 0) return 0;
  if (cache[n] !== undefined) return cache[n];

  cache[n] = Math.max(
    count(n - 2, cache, nums) + nums[n],
    count(n - 1, cache, nums)
  );

  return cache[n];
}

/** iterative */
// 1) time complexity O(n), space complexity O(n)
function rob2(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const totals = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    totals.push(Math.max(totals[i - 2] + nums[i], totals[i - 1]));
  }

  return totals[totals.length - 1];
}

// 2) time complexity O(n), space complexity O(n)
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let slow = nums[0];
  let fast = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const max = Math.max(slow + nums[i], fast);
    slow = fast;
    fast = max;
  }

  return fast;
}
