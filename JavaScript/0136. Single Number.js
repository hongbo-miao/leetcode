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
/** 1) */
function singleNumber1(nums) {
  return nums.reduce((sum, num) => sum ^ num); // ^ is XOR
}

/** 2) */
// Time O(n)
// Space O(n)
function singleNumber2(nums) {
  const map = {};
  for (let n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  for (let k in map) {
    if (map[k] === 1) return Number(k);
  }
}

/** 3) Bit manipulation */
// Time O(n)
// Space O(1)
function singleNumber(nums) {
  let num = 0;
  for (let n of nums) {
    num ^= n;
  }
  return num;
}
