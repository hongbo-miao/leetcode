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

// 1) Dynamic programming
// Similar
// 279. Perfect Squares
// 300. Longest Increasing Subsequence
// 322. Coin Change
//
// Time O(n^2)
// Space O(n)
//
// Example
// nums: [10,9,2,5,3,7,101,18]
// dp:   [ 1,1,1,2,2,3,  4, 4]
// res:  4
const lengthOfLIS1 = (nums) => {
  if (nums == null || nums.length === 0) return 0;

  const dp = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(
          dp[i],
          dp[j] + 1,
        );
      }
    }
  }
  return Math.max(...dp);
};

// 2) Dynamic programming with binary search
// https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation
//
// Time O(n log n)
// Space O(n)
//
// tails is an array storing the smallest tail of all increasing subsequences with length i+1 in tails[i].
// For example, say we have nums = [4,5,6,3], then all the available increasing subsequences are:
//
// len = 1  [4], [5], [6], [3]   => tails[0] = 3
// len = 2  [4, 5], [5, 6]       => tails[1] = 5
// len = 3  [4, 5, 6]            => tails[2] = 6
//
// We can easily prove that tails is a increasing array. Therefore it is possible to do a binary search in tails array to find the one needs update.
//
// Each time we only do one of the two:
//
// (1) if x is larger than all tails, append it, increase the size by 1
// (2) if tails[i-1] < x <= tails[i], update tails[i]
//
// Doing so will maintain the tails invariant. The the final answer is just the size.
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
const lengthOfLIS = (nums) => {
  if (nums == null || nums.length === 0) return 0;

  const tails = [nums[0]];

  for (const n of nums) {
    let l = 0;
    let r = tails.length;

    while (l < r) {
      const m = ~~((l + r) / 2);
      if (tails[m] < n) l = m + 1;
      else r = m;
    }

    tails[r] = n;
  }
  return tails.length;
};
