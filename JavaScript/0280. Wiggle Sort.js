// Given an unsorted array nums, reorder it in-place such that nums[0] <= nums[1] >= nums[2] <= nums[3]....
//
// Example:
//
// Input: nums = [3,5,2,1,6,4]
// Output: One possible answer is [3,5,1,6,2,4]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 1) Sorting
// Time O(n log n)
// Space O(1)
const wiggleSort1 = (nums) => {
  const swap = (i, j) => [nums[i], nums[j]] = [nums[j], nums[i]];

  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length - 1; i += 2) {
    swap(i, i + 1);
  }
};

// 2) One-pass swap
// Time O(n)
// Space O(1)
const wiggleSort = (nums) => {
  const swap = (i, j) => [nums[i], nums[j]] = [nums[j], nums[i]];

  for (let i = 0; i < nums.length - 1; i++) {
    if ((i % 2 === 0) === (nums[i] > nums[i + 1])) {
      swap(i, i + 1);
    }
  }
};
