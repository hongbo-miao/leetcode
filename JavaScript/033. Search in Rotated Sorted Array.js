// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
//
// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
//
// You are given a target value to search. If found in the array return its index, otherwise return -1.
//
// You may assume no duplicate exists in the array.
//
// Your algorithm's runtime complexity must be in the order of O(log n).
//
// Example 1:
//
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
//
// Example 2:
//
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/** 1) Cheating */
// Time O(n)
// Space O(1)
function search1(nums, target) {
  return nums.indexOf(target);
}

/** 2) Brute force / Linear scan */
// Time O(n)
// Space O(1)

/** 3) Binary search */
// https://leetcode.com/problems/search-in-rotated-sorted-array/discuss/273622/Javascript-Simple-O(log-N)-Binary-Search-Solution
//
// Time O(log n)
// Space O(1)
//
// e.g. [1, 2, 3, 4, 5, 6, 7]
//
// When you divide the rotated array into two halves, using mid index, at least one of them should remain sorted ALWAYS.
//
// [3, 4, 5] [6, 7, 1, 2] the left side remains sorted
// [6, 7, 1] [2, 3, 4, 5] the right side remains sorted
// [1, 2, 3] [4, 5, 6, 7] Both sides remain sorted.
//
// If you know one side is sorted, the rest of logic becomes very simple.
// If one side is sorted, check if the target is in the boundary, otherwise it's on the other side.
//
// IF smallest <= target <= biggest
//   then target is here
// ELSE
//   then target is on the other side
function search3(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);

    if (nums[m] === target) return m;

    // When dividing the rotated array into two halves, one must be sorted
    // Check if the left side is sorted
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target <= nums[m]) r = m - 1;  // target is in the left
      else l = m + 1;  // target is in the right
    } else {
      if (nums[m] <= target && target <= nums[r]) l = m + 1;  // target is in the right
      else r = m - 1;  // target is in the left
    }
  }

  return -1;
}

/** 4) Similar to 3) */
function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l + 1 < r) {
    const m = Math.floor((l + r) / 2);

    if (nums[m] === target) return m;

    if (nums[l] < nums[m]) {  // e.g. 4, 5, 6, 7
      if (nums[l] <= target && target <= nums[m]) r = m;
      else l = m;
    } else {  // e.g. 7, 0, 1, 2
      if (nums[m] <= target && target <= nums[r]) l = m;
      else r = m;
    }
  }

  if (nums[l] === target) return l;
  if (nums[r] === target) return r;

  return -1;
}
