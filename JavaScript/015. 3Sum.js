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

/** Two pointers */
// https://www.youtube.com/watch?v=y-zBV7uUkyI
//
// Idea
// Select a first, move b to right, and move c to left
//
// Complexity
// time O(n^2)
//
// Example
// -1, 0, 1, 2, -1, -4
//  a  b             c
function threeSum(nums) {
  let res = [];

  nums = nums.sort((a, b) => a - b);  // if sort() only will cause [-1, -2, -3, 1, 2, 3]

  for (let i = 0; i < nums.length - 2; i++) { // nums.length - 2 because 3 pointers a, b, c
    const a = nums[i];

    if (i > 0 && a === nums[i - 1]) continue;  // move a to next different one to avoid duplicate results

    let l = i + 1;
    let r = nums.length - 1;

    while (l < r) {
      const b = nums[l];
      const c = nums[r];

      const sum = a + b + c;

      if (sum < 0) l++;
      else if (sum > 0) r--;
      else if (sum === 0) {
        res.push([a, b, c]);

        l++;
        while (l < r && nums[l] === nums[l - 1]) l++;  // move b to next different one

        r--;
        while (l < r && nums[r] === nums[r + 1]) r--;  // move c to previous different one
      }
    }
  }

  return res;
}
