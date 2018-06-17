// Given an unsorted array of integers, find the length of longest increasing subsequence.
//
// Example:
//
// Input: [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
//
// Note:
//
//   There may be more than one LIS combination, it is only necessary for you to return the length.
//   Your algorithm should run in O(n^2) complexity.
//
// Follow up: Could you improve it to O(n log n) time complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */

// time O(n^2)
//
// Example
// nums: [10,9,2,5,3,7,101,18]
// arr:  [ 1,1,1,2,2,3,  4, 4]
// res:  4
function lengthOfLIS(nums) {
  if (!nums.length) return 0;

  let arr = Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) arr[i] = Math.max(arr[i], arr[j] + 1);
    }
  }

  return Math.max(...arr);
}
