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
// Time O(n log n)
// Space O(1)
function majorityElement1(nums) {
  nums.sort((a, b) => a - b);
  return nums[~~(nums.length / 2)];
}

/** 2) Hash map */
// Time O(n)
// Space O(n)
function majorityElement(nums) {
  const map = {};
  for (let n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
    if (map[n] > nums.length / 2) return n;
  }
}
