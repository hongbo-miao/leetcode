// Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
// The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.
//
// Note:
//
// Your returned answers (both index1 and index2) are not zero-based.
// You may assume that each input would have exactly one solution and you may not use the same element twice.
//
// Example:
//
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

/** 1) Two pointers */
// Time O(n)
// Space O(1)
const twoSum1 = function (numbers, target) {
  let l = 0;
  let r = numbers.length - 1;
  while (l < r) {
    const n = numbers[l] + numbers[r];
    if (n === target) return [l + 1, r + 1];
    else if (n < target) l++;
    else r--;
  }
  return [-1, -1];
};

/** 2) Two pointers. Similar to 1) */
// Similar
// 167. Two Sum II - Input array is sorted
// 209. Minimum Size Subarray Sum
const twoSum = function (numbers, target) {
  for (let l = 0, r = numbers.length - 1; l < r; r--) {
    while (l < r && numbers[l] + numbers[r] < target) {
      l++;
    }
    if (l !== r && numbers[l] + numbers[r] === target) {
      return [l + 1, r + 1]
    }
  }
  return [-1, -1];
};
