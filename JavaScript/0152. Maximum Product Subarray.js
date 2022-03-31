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

// 1) Brute force
// Time O(n^2)
// Space O(1)
const maxProduct1 = (nums) => {
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
};

// 2)
// Similar
// 53. Maximum Subarray
//
// Time O(n)
// Space O(1)
const maxProduct = (nums) => {
  let max = -Infinity;
  let currMin = 1;
  let currMax = 1;
  for (const n of nums) {
    [currMin, currMax] = [
      Math.min(n, currMin * n, currMax * n),
      Math.max(n, currMin * n, currMax * n),
    ];
    max = Math.max(max, currMax);
  }
  return max;
};
