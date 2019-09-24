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
function singleNumber1(nums) {
  const map = {};
  for (let n of nums) {
    if (map[n]) map[n] = false;  // second time mark to false
    else map[n] = true;  // first time mark to true
  }

  for (let i = 0, keys = Object.keys(map); i < keys.length; i++) {
    const key = keys[i];
    if (map[key]) return Number(key);
  }
}

function singleNumber(nums) {
  return nums.reduce((sum, num) => sum ^ num);  // ^ is XOR
}
