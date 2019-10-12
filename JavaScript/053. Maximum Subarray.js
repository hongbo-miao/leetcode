// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest currMax and return its currMax.
//
// Example:
//
// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest currMax = 6.
//
// Follow up:
//
// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) Brute force (time limit exceeded) */
// Time O(n^3)
// Space O(1)
function maxSubArray1(nums) {
  let max = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum += nums[k];
      }
      if (sum > max) max = sum;
    }
  }

  return max;
}

/** 2) Kadane's algorithm */
// Time O(n)
// Space O(1)
//
// Idea
// Suppose we've solved the problem for A[1 .. i - 1]; how can we extend that to A[1 .. i]?
//
// Example
// 5 -12 10
//
// 5
// 5
//    -7
//     5
//       10 (recalculate from nums[i])
//       10
function maxSubArray2(nums) {
  let currMax = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(currMax + nums[i], nums[i]);  // if nums[i] is bigger, recalculate from nums[i]
    max = Math.max(max, currMax);
  }

  return max;
}

/** 3) Same to 2 */
function maxSubArray(nums) {
  let currMax = -Infinity;
  let max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + currMax < nums[i]) {
      currMax = nums[i];
    } else {
      currMax += nums[i];
    }
    max = Math.max(max, currMax);
  }

  return max;
}
