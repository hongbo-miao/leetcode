// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Example 1:
//
// Input: [3,2,1,5,6,4] and k = 2
// Output: 5
//
// Example 2:
//
// Input: [3,2,3,1,2,4,5,5,6] and k = 4
// Output: 4
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ array's length.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/** 1) Sorting */
// Time O(n log n)
// Space O(1)
const findKthLargest1 = (nums, k) => {
  return nums.sort((a, b) => b - a)[k - 1];
};

/** 2) */
// Time O(n)
// Space O(1)
//
// https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/60294/Solution-explained

/** 3) Quick sort idea */
const findKthLargest = (nums, k) => {
  const swap = (i, j) => [nums[i], nums[j]] = [nums[j], nums[i]];

  const quickSelect = (l, r, k) => {
    // Quick sort idea
    // put nums that are <= pivot to the left
    // put nums that are > pivot to the right
    let p = l;
    for (let j = l; j < r; j++) {
      if (nums[j] <= nums[r]) {
        swap(p, j);
        p++;
      }
    }
    swap(p, r);

    // count the nums that are > pivot
    const count = r - p + 1;

    if (count > k) {
      // pivot is too small, so it must be on the right
      return quickSelect(p + 1, r, k);
    } else if (count < k) {
      // pivot is too big, so it must be on the left
      return quickSelect(l, p - 1, k - count);
    } else {
      return nums[p];
    }
  };

  return quickSelect(0, nums.length - 1, k);
};

export default findKthLargest;
