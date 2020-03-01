// Given an unsorted array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....
//
// Example 1:
//
// Input: nums = [1, 5, 1, 1, 6, 4]
// Output: One possible answer is [1, 4, 1, 5, 1, 6].
//
// Example 2:
//
// Input: nums = [1, 3, 2, 2, 3, 1]
// Output: One possible answer is [2, 3, 1, 3, 1, 2].
//
// Note:
// You may assume all input has valid answer.
//
// Follow Up:
// Can you do it in O(n) time and/or in-place with O(1) extra space?

import findKthLargest from './0215. Kth Largest Element in an Array';

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/** 1) */
const wiggleSort1 = (nums) => {
  nums.sort((a, b) => a - b);

  const len = nums.length;
  let m = ~~(len / 2);
  let k = len % 2 === 0 ? m - 1 : m; // middle index

  const copy = [...nums];
  for (let i = 0, j = len - 1; i < len; i += 2, j--, k--) {
    nums[i] = copy[k];
    if (i < len - 1) {
      nums[i + 1] = copy[j];
    }
  }
};

/** 2) */
// https://leetcode.com/problems/wiggle-sort-ii/discuss/77682/Step-by-step-explanation-of-index-mapping-in-Java
const wiggleSort = (nums) => {
  if (nums == null || nums.length === 0) return;

  const len = nums.length;
  const swap = (i, j) => [nums[i], nums[j]] = [nums[j], nums[i]];
  const newIdx = (i) => (2 * i + 1) % (len | 1);

  const m = findKthLargest(nums, ~~((nums.length + 1) / 2));

  let l = 0;
  let r = len - 1;
  let i = 0;

  while (i <= r) {
    if (nums[newIdx(i)] > m) {
      swap(newIdx(l), newIdx(i));
      l++;
      i++;
    } else if (nums[newIdx(i)] < m) {
      swap(newIdx(r), newIdx(i));
      r--;
    } else {
      i++;
    }
  }
};
