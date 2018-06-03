// Given an unsorted integer array, find the smallest missing positive integer.
//
// Example 1:
//
// Input: [1,2,0]
// Output: 3
//
// Example 2:
//
// Input: [3,4,-1,1]
// Output: 2
//
// Example 3:
//
// Input: [7,8,9,11,12]
// Output: 1
//
// Note:
//
// Your algorithm should run in O(n) time and uses constant extra space.

/**
 * @param {number[]} nums
 * @return {number}
 */
// Put each number in its right place.
// When we find n, then swap it with nums[n - 1].
// At last, the first place where its number is not right, return the place + 1.
//
// Time complexity O(n)
// Space complexity O(1)
function firstMissingPositive(nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] > 0 && nums[i] <= nums.length && nums[nums[i] - 1] !== nums[i]) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    } else {
      i++;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  
  return nums.length + 1;
}
