// Given an array of integers and an integer k, you need to find the number of unique k-diff pairs in the array. Here a k-diff pair is defined as an integer pair (i, j), where i and j are both numbers in the array and their absolute difference is k.
//
// Example 1:
// Input: [3, 1, 4, 1, 5], k = 2
// Output: 2
// Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
// Although we have two 1s in the input, we should only return the number of unique pairs.
//
// Example 2:
// Input:[1, 2, 3, 4, 5], k = 1
// Output: 4
// Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
//
// Example 3:
// Input: [1, 3, 1, 5, 4], k = 0
// Output: 1
// Explanation: There is one 0-diff pair in the array, (1, 1).
//
// Note:
// The pairs (i, j) and (j, i) count as the same pair.
// The length of the array won't exceed 10,000.
// All the integers in the given input belong to the range: [-1e7, 1e7].

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// 1) Binary search
// Time O(n log n)
// Space O(1)
const findPairs1 = (nums, k) => {
  const binarySearch = (l, r, target) => {
    while (l <= r) {
      const m = ~~((l + r) / 2);
      if (nums[m] === target) return true;
      else if (nums[m] < target) l = m + 1;
      else r = m - 1;
    }
    return false;
  };

  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue; // avoid duplicates to get unique pairs
    if (binarySearch(i + 1, nums.length - 1, nums[i] + k)) {
      count++;
    }
  }
  return count;
};

// 2) Hashmap
// Time O(n)
// Space O(n)
const findPairs = (nums, k) => {
  if (k < 0) return 0;

  const map = new Map();
  for (const n of nums) {
    if (map.has(n)) {
      map.set(n, map.get(n) + 1);
    } else {
      map.set(n, 1);
    }
  }

  let res = 0;
  for (let [n] of map.entries()) {
    if (k === 0) {
      if (map.get(n) >= 2) {
        res++;
      }
    } else {
      if (map.has(n + k)) {
        res++;
      }
    }
  }
  return res;
};
