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
// https://www.youtube.com/watch?v=y-zBV7uUkyI
// method: select a first, move b to right, and move c to left
// -1, 0, 1, 2, -1, -4
//  a  b             c
function threeSum(nums) {
  let result = [];

  nums = nums.sort((x, y) => x - y);  // sort() only will cause [-1, -2, -3, 1, 2, 3]

  for (let i = 0; i < nums.length - 2; i++) {
    const a = nums[i];

    if (i > 0 && a === nums[i - 1]) continue; // move a to next different one to avoid duplicate results

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const b = nums[left];
      const c = nums[right];

      const total = a + b + c;

      if (total < 0) {
        left++;
      } else if (total > 0) {
        right--;
      } else {
        result.push([a, b, c]);

        left++;
        while (left < right && nums[left] === nums[left - 1]) left++; // move b to next different one

        right--;
        while (left < right && nums[right] === nums[right + 1]) right--;  // move c to previous different one
      }
    }
  }

  return result;
}
