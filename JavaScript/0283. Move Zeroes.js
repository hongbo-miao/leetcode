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


// 1) Two Pointers slow and fast
// Time O(n)
// Space O(1)
const moveZeroes1 = (nums) => {
  // If the current element is not 0, then we need to append it just in front of last non 0 element we found.
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // After we have finished processing new elements, all the non-zero elements are already at beginning of array.
  // We just need to fill remaining array with 0's.
  for (let fast = slow; fast < nums.length; fast++) {
    nums[fast] = 0;
  }
};

// 2) Two Pointers slow and fast, similar to 1)
// Time O(n)
// Space O(1)
const moveZeroes = (nums) => {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
};
