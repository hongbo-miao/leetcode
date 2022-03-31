// Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.
//
// Example:
//
// Input: s = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: the subarray [4,3] has the minimal length under the problem constraint.
//
// Follow up:
// If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n).

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */

// 1) Brute Force
// Time O(n^3)
// Space O(1)

// 2) Two Pointers / Sliding Window
// Similar
// 167. Two Sum II - Input array is sorted
// 209. Minimum Size Subarray Sum
//
// Time O(n)
// Space O(1)
const minSubArrayLen = (s, nums) => {
  if (nums == null || nums.length === 0) return 0;

  let sum = 0;
  let res = Infinity;

  for (let l = 0, r = 0; r < nums.length; r++) {
    sum += nums[r];

    while (sum >= s) {
      res = Math.min(res, r - l + 1);
      sum -= nums[l];
      l++;
    }
  }

  return res === Infinity ? 0 : res;
};
