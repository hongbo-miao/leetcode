// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
//
// Example:
//
// Input:  [1,2,3,4]
// Output: [24,12,8,6]
// Note: Please solve it without division and in O(n).
//
// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/** 1) */
// Complexity
// time O(n)
// space O(n)
//
// Idea
// The trick is to construct the arrays (in the case for 4 elements)
// [             1,       a[0],  a[0]*a[1],  a[0]*a[1]*a[2]]
// [a[1]*a[2]*a[3],  a[2]*a[3],       a[3],               1]
function productExceptSelf1(nums) {
  let l = [];
  for (let i = 0, p = 1; i < nums.length; i++) {
    l[i] = p;
    p *= nums[i];
  }

  let r = [];
  for (let i = nums.length - 1, p = 1; i >= 0; i--) {
    r[i] = p;
    p *= nums[i];
  }

  let res = [];
  for (let i = 0; i < nums.length; i++) {
    res[i] = l[i] * r[i];
  }
  
  return res;
}

/** 2) Improvement by saving some space which is less clear */
// time O(n)
// space O(1)
function productExceptSelf(nums) {
  let res = [1];

  for (let i = 1; i < nums.length; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }

  for (let i = nums.length - 1, p = 1; i >= 0; i--) {
    res[i] *= p;
    p *= nums[i];
  }

  return res;
}
