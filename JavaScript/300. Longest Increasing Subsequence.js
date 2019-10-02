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

/** 1) Dynamic programming */
// Similar
// 322. Coin Change
//
// time O(n^2)
// space O(n)
//
// Example
// nums: [10,9,2,5,3,7,101,18]
// arr:  [ 1,1,1,2,2,3,  4, 4]
// res:  4
function lengthOfLIS1(nums) {
  if (nums.length === 0) return 0;

  const arr = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        arr[i] = Math.max(arr[i], arr[j] + 1);
      }
    }
  }

  return Math.max(...arr);
}

/** 2) Dynamic programming with binary search */
// https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation
//
// time O(n log n)
// space O(n)
//
// Example
// nums = [10, 9, 2, 5, 3, 7, 101, 18]
//
// tails =
// [10]
// [9]
// [2]
// [2, 5]
// [2, 3]
// [2, 3, 7]
// [2, 3, 7, 101]
// [2, 3, 7, 18]
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  const tails = [nums[0]];

  for (let n of nums) {
    let i = 0;
    let j = tails.length;

    while (j > i) {
      const mid = Math.floor((i + j) / 2);

      if (tails[mid] < n) i = mid + 1;
      else j = mid;
    }

    tails[j] = n;
  }

  return tails.length;
}
