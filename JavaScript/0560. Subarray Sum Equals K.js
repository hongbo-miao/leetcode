// Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.
//
// Example 1:
// Input: nums = [1,1,1], k = 2
// Output: 2
//
// Note:
// - The length of the array is in range [1, 20,000].
// - The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/** 1) Brute force (time limit exceeded) */
// Time O(n^3)
// Space O(1)
function subarraySum1(nums, k) {
  let count = 0;
  for (let start = 0; start < nums.length; start++) {
    for (let end = start + 1; end <= nums.length; end++) {
      let sum = 0;
      for (let i = start; i < end; i++) {
        sum += nums[i];
      }
      if (sum === k) count++;
    }
  }
  return count;
}

/** 2) */
// Time O(n^2)
// Space O(1)
function subarraySum2(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) count++; // cannot break here, because next one might be 0
    }
  }
  return count;
}

/** 3) Hash map */
// Time O(n)
// Space O(n)
function subarraySum(nums, k) {
  let count = 0;
  let sum = 0;

  const map = {};
  map[0] = 1;

  for (let n of nums) {
    sum += n;

    if (map[sum - k] != null) {
      count += map[sum - k];
    }

    if (map[sum] == null) map[sum] = 0;
    map[sum]++;
  }
  return count;
}
