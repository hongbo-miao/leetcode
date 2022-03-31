// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
//
// Example 1:
//
// Input: [3,0,1]
// Output: 2
//
// Example 2:
//
// Input: [9,6,4,2,3,5,7,0,1]
// Output: 8
//
// Note:
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */

// 1) Gauss' Formula
// Time O(n)
// Space O(1)
 const missingNumber1 = (nums) => {
  const sum = nums.reduce((a, b) => a + b);
  return (1 + nums.length) * nums.length / 2 - sum;
};

// 2) Hash Set
// Time O(n)
// Space O(n)
const missingNumber = (nums) => {
  const set = new Set(nums);
  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) return i;
  }
  return -1;
};
