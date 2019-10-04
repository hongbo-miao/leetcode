// Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
//
// Example 1:
//
// Input: [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
//
// Example 2:
//
// Input: [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) */
// time O(n^2)
// space O(1)
function maxProduct1(nums) {
  if (nums.length === 1) return nums[0];

  let max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let p = nums[i];
    max = Math.max(max, p);

    for (let j = i + 1; j < nums.length; j++) {
      p *= nums[j];
      max = Math.max(max, p);
    }
  }
  return max;
}

/** 2) */
// time O(n)
// space O(1)
function maxProduct(nums) {
  let res = -Infinity;
  let min = 1;
  let max = 1;
  for (let n of nums) {
    [min, max] = [
      Math.min(n, min * n, max * n),
      Math.max(n, min * n, max * n),
    ];
    res = Math.max(res, max);
  }
  return res;
}
