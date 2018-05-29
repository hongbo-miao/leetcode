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
function search1(nums, target) {
  return nums.indexOf(target);
}

function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l + 1 < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] === target) return mid;

    if (nums[l] < nums[mid]) {  // e.g. 4, 5, 6, 7
      if (nums[l] <= target && target <= nums[mid]) r = mid;
      else l = mid;
    } else {  // e.g. 7, 0, 1, 2
      if (nums[mid] <= target && target <= nums[r]) l = mid;
      else r = mid;
    }
  }

  if (nums[l] === target) return l;
  if (nums[r] === target) return r;

  return -1;
}
