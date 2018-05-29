// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
//
// Example:
//
// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
//
// Follow up:
//
// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/**
 * @param {number[]} nums
 * @return {number}
 */
// Kadane's algorithm, time complexity O(n)
// Suppose we've solved the problem for A[1 .. i - 1]; how can we extend that to A[1 .. i]?
function maxSubArray(nums) {
  let sum = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i]); // if nums[i] is bigger, recalculate from nums[i]
    max = Math.max(max, sum);
  }
  
  return max;
}
// 5 -12 10
//
// 5
// 5
//    -7
//     5
//       10 (recalculate from nums[i])
//       10
