// A peak element is an element that is greater than its neighbors.
//
// Given an input array nums, where nums[i] ≠ nums[i+1], find a peak element and return its index.
//
// The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.
//
// You may imagine that nums[-1] = nums[n] = -∞.
//
// Example 1:
//
// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
//
// Example 2:
//
// Input: nums = [1,2,1,3,5,6,4]
// Output: 1 or 5
// Explanation: Your function can return either index number 1 where the peak element is 2,
//   or index number 5 where the peak element is 6.
//
// Note:
//
// Your solution should be in logarithmic complexity.

/**
 * @param {number[]} nums
 * @return {number}
 */
/** 1) Linear scan */
// Time O(n)
// Space O(1)
function findPeakElement1(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) return i;
  }

  return nums.length - 1;
}

/** 2) Binary search (recursion) */
// Consider that each local maximum is one valid peak.
//             5
//            / \
//           /   -∞
//          3
//     2   /
//    / \ /
//   1   1
//  /
// -∞
//   0 1 2  3  4
//   l   m     r     l = 0, m = 2, r = 4
//          lm r     l = 3, m = 3, r = 4
//             lr    l = 4,        r = 4
// Time O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. n refers to the size of nums array
// Space O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. Thus, the depth of recursion tree will go up to log(n)
function findPeakElement2(nums) {
  function go(l, r) {
    if (l === r) return l;

    const m = Math.floor((l + r) / 2);

    if (nums[m] > nums[m + 1]) return go(l, m);
    else go(m + 1, r);
  }

  return go(0, nums.length - 1);
}


/** 3) Binary search (iteration) */
// Time O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. n refers to the size of nums array
// Space O(1)
function findPeakElement3(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const m = Math.floor((l + r) / 2);

    if (nums[m] > nums[m + 1]) r = m;
    else l = m + 1;
  }

  return l;
}

/** 4) Binary search (iteration), similar to 3) */
function findPeakElement(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l + 1 < r) {
    const m = Math.floor((l + r) / 2);

    if (nums[m] > nums[m + 1]) r = m;
    else l = m;
  }

  if (nums[l] > nums[l + 1]) return l;
  if (nums[r] > nums[r - 1]) return r;

  return l;
}
