// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
//
// Example:
//
// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
//
// Note:
//
//   You must do this in-place without making a copy of the array.
//   Minimize the total number of operations.

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */


/** 1) */
// Time O(n)
// Space O(1)
function moveZeroes1(nums) {
  // If the current element is not 0, then we need to append it just in front of last non 0 element we found.
  let pos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[pos] = nums[i];
      pos++;
    }
  }
  // After we have finished processing new elements, all the non-zero elements are already at beginning of array.
  // We just need to fill remaining array with 0's.
  for (let i = pos; i < nums.length; i++) {
    nums[i] = 0;
  }
}

/** 2) Similar to 1), but hard to understand */
// Time O(n)
// Space O(1)
function moveZeroes(nums) {
  let pos = 0; // last non 0 element found
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[pos], nums[i]] = [nums[i], nums[pos]];
      pos++;
    }
  }
}
