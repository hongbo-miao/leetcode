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

// 1) Cheating
// Time O(n)
// Space O(1)
const searchRange1 = (nums, target) => {
  return [nums.indexOf(target), nums.lastIndexOf(target)];
};

// 2) Brute force / Linear scan
// Time O(n)
// Space O(1)

// 3) Binary search
// Time O(log n)
// Space O(1)
const searchRange3 = (nums, target) => {
  let res = [-1, -1];

  // find the left
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = ~~((l + r) / 2);
    if (nums[m] < target) l = m + 1;
    else r = m;
  }

  if (nums[l] !== target) return res;
  else res[0] = l;

  // find the right
  r = nums.length - 1; // no need to set l to 0

  while (l < r) {
    const m = Math.ceil((l + r) / 2);   // note using Math.ceil
    if (nums[m] > target) r = m - 1;
    else l = m;
  }

  res[1] = r;
  return res;
};

// 4) Similar to 3), not optimized, but easier to understand
const searchRange = (nums, target) => {
  const res = [-1, -1];

  // find the left
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = ~~((l + r) / 2);
    if (nums[m] < target) l = m + 1;
    else r = m;
  }

  if (nums[l] === target) res[0] = l;

  // find the right
  l = 0;
  r = nums.length - 1;

  while (l < r) {
    const m = Math.ceil((l + r) / 2);   // note using Math.ceil
    if (nums[m] > target) r = m - 1;
    else l = m;
  }

  if (nums[r] === target) res[1] = r;
  return res;
};
