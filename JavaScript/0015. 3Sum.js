// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
//
// Note:
//
// The solution set must not contain duplicate triplets.
//
// Example:
//
// Given array nums = [-1, 0, 1, 2, -1, -4],
//
//   A solution set is:
//   [
//     [-1, 0, 1],
//     [-1, -1, 2]
//   ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// Three pointers
// https://www.youtube.com/watch?v=y-zBV7uUkyI
//
// Idea
// Select a first, move b to right, and move c to left
//
// Time O(n^2)
//
// Example
// -1, 0, 1, 2, -1, -4
//  a  b             c
const threeSum = (nums) => {
  if (nums == null || nums.length === 0) return [];
  nums = nums.sort((a, b) => a - b); // sort() only will cause [-1, -2, -3, 1, 2, 3]

  let res = [];
  for (let i = 0; i < nums.length - 2; i++) { // Using nums.length - 2 because of three pointers a, b, c
    const a = nums[i];

    if (i - 1 >= 0 && a === nums[i - 1]) continue; // Move a to next different one to avoid duplicate results

    let l = i + 1;
    let r = nums.length - 1;

    while (l < r) {
      const b = nums[l];
      const c = nums[r];

      const sum = a + b + c;

      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        res.push([a, b, c]);
        while (l < r && nums[l] === b) l++; // Move b to next different one
        while (l < r && nums[r] === c) r--; // Move c to previous different one
      }
    }
  }
  return res;
};
