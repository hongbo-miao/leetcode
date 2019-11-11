// Given a non-empty array of integers, every element appears twice except for one. Find that single one.
//
// Note:
//
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
//
// Example 1:
//
// Input: [2,2,1]
// Output: 1
//
// Example 2:
//
// Input: [4,1,2,1,2]
// Output: 4

/**
 * @param {number[]} nums
 * @return {number}
 */
/** 1) Hash Map */
// Time O(n)
// Space O(n)
const singleNumber2 = (nums) => {
  const map = {};
  for (const n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  for (const k in map) {
    if (map[k] === 1) return Number(k);
  }
};

/** 2) Bit manipulation */
// Time O(n)
// Space O(1)
const singleNumber = (nums) => {
  return nums.reduce((sum, n) => sum ^ n); // ^ is XOR
};
