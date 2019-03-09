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
// 1) Linear scan
// time O(n)
// space O(1)
function findPeakElement1(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) return i;
  }

  return nums.length - 1;
}

// 2) Binary search (recursion)
// time O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. n refers to the size of nums array
// space O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. Thus, the depth of recursion tree will go up to log(n)
function findPeakElement2(nums) {
  return search(nums, 0, nums.length - 1);
}

function search(nums, l, r) {
  if (l === r) return l;

  const mid = Math.floor((l + r) / 2);

  if (nums[mid] > nums[mid + 1]) return search(nums, l, mid);
  else return search(nums, mid + 1, r);
}

// 3) Binary search (iteration)
// time O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. n refers to the size of nums array
// space O(1)
function findPeakElement(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] > nums[mid + 1]) r = mid;
    else l = mid + 1;
  }

  return l;
}
