// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
//
// Your algorithm's runtime complexity must be in the order of O(log nums.length).
//
// If the target is not found in the array, return [-1, -1].
//
// Example 1:
//
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
//
// Example 2:
//
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/** 1) Cheating */
function searchRange1(nums, target) {
  return [nums.indexOf(target), nums.lastIndexOf(target)];
}

/** 2) Binary search */
// time O(log n)
// space O(1)
function searchRange(nums, target) {
  let res = [-1, -1];

  // find the left
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);  // note using Math.floor

    if (nums[mid] < target) l = mid + 1;
    else r = mid;
  }

  if (nums[l] !== target) return res;
  else res[0] = l;

  // find the right
  r = nums.length - 1;  // no need to set l to 0

  while (l < r) {
    const mid = Math.ceil((l + r) / 2);   // note using Math.ceil

    if (nums[mid] > target) r = mid - 1;
    else l = mid;
  }

  res[1] = r;

  return res;
}
