// Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.
//
// Example 1:
//
// Input: [1,3,4,2,2]
// Output: 2
//
// Example 2:
//
// Input: [3,1,3,4,2]
// Output: 3
//
// Note:
//
// You must not modify the array (assume the array is read only).
// You must use only constant, O(1) extra space.
// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once.

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) Sorting */
// Time O(n)
// Space O(n)
const findDuplicate1 = (nums) => {
  const set = new Set();
  for (let n of nums) {
    if (set.has(n)) return n;
    set.add(n);
  }
  return null;
};

/** 2) Sorting */
// Time O(n log n)
// Space O(1)
const findDuplicate2 = (nums) => {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return nums[i];
  }
  return null;
};

/** 3) Cycle detection - Floyd's Tortoise and Hare */
// Similar
// 142. Linked List Cycle II
//
// Time O(n)
// Space O(1)
const findDuplicate = (nums) => {
  const getIntersect = (head) => {
    let slow = head;
    let fast = head;

    while (fast != null && nums[fast] != null) {
      slow = nums[slow];
      fast = nums[nums[fast]];
      if (slow === fast) return fast;
    }
    return null;
  };

  const intersect = getIntersect(nums[0]);
  if (intersect == null) return null;

  let slow = nums[0];
  let fast = intersect;

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return fast;
};
