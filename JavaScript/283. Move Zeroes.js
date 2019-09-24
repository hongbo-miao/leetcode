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
// left to right
function moveZeroes1(nums) {
  let r = nums.length;
  for (let i = 0; i < nums.length - 1, r--; i++) {
    if (nums[i] === 0) {
      nums.push(...nums.splice(i, 1));
      i--;
    }
  }
}

// right to left
function moveZeroes(nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.push(...nums.splice(i, 1));
    }
  }
}
