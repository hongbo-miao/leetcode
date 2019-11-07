// You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
//
// Example:
//
// Input: [5,2,6,1]
// Output: [2,1,1,0]
// Explanation:
// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/** Binary Search */
// Traverse from the back to the beginning of the array, maintain an sorted array of numbers have been visited.
// Use binary search to find the first element in the sorted array which is larger or equal to target number.
// For example, [5,2,3,6,1], when we reach 2, we have a sorted array [1,3,6], binary search returns 1,
// which is the index where 2 should be inserted and is also the number smaller than 2.
// Then we insert 2 into the sorted array to form [1,2,3,6].
const countSmaller = (nums) => {
  const res = Array(nums.length).fill(0);
  const sorted = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    const idx = lowerBound(sorted, nums[i]);
    res[i] = idx;
    sorted.splice(idx, 0, nums[i]); // insert nums[i] at idx
  }
  return res;
};

const lowerBound = (arr, target) => {
  let l = 0;
  let r = arr.length;
  while (l < r) {
    const m = ~~((l + r) / 2);
    if (arr[m] < target) l = m + 1;
    else r = m;
  }
  return l;
};
