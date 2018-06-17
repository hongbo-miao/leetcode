// Given an array of size n, find the majority element. The majority element is the element that appears more than n/2 times.
//
// You may assume that the array is non-empty and the majority element always exist in the array.
//
// Example 1:
//
// Input: [3,2,3]
// Output: 3
// Example 2:
//
// Input: [2,2,1,1,1,2,2]
// Output: 2

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) Sorting */
// time O(n log n)
// space O(1)
function majorityElement(nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}

/** 2) Hash map */
// time O(n)
// space O(n)
function majorityElement1(nums) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = (map[nums[i]] || 0) + 1;
    if (map[nums[i]] > nums.length / 2) return nums[i];
  }
}
