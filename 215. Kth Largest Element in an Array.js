// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Example 1:
//
// Input: [3,2,1,5,6,4] and k = 2
// Output: 5
//
// Example 2:
//
// Input: [3,2,3,1,2,4,5,5,6] and k = 4
// Output: 4
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ array's length.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/** 1) Sorting */
// time O(n log n)
// space O(1)
function findKthLargest(nums, k) {
  return nums.sort((a, b) => a - b)[nums.length - k];
}

/** 2) */
// time O(n)
// space O(1)
//
// https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/60294/Solution-explained
