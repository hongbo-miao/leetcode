// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.
//
// Example:
//
// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7]
// Explanation:
//
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ input array's size for non-empty array.
//
// Follow up:
// Could you solve it in linear time?

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/** 1) Monotonic queue */
// https://www.youtube.com/watch?v=2SXqBsTR6a8
//
// Time O(n)
// Space O(k)
//
// Using monotonic queue to push an element in the queue will pop all elements smaller than it.
//
// e.g. nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
//
// Monotonic queue  max
// [1]              -
// [3]              -
// [3, -1]          3
// [3, -1, -3]      3
// [5]              5
// [5, 3]           5
// [6]              6
// [7]              7
const maxSlidingWindow1 = (nums, k) => {
  const res = [];
  const q = [];

  for (let i = 0; i < nums.length; i++) {
    while (q.length - 1 >= 0 && nums[i] > q[q.length - 1]) q.pop();
    q.push(nums[i]);

    // When i + 1 - k >= 0, the window is fully overlapping nums
    const j = i + 1 - k;
    if (j >= 0) {
      res.push(q[0]);
      if (nums[j] === q[0]) q.shift(); // If the biggest element in q is about to exit window, remove it from q
    }
  }
  return res;
};

/** 2) Dynamic programming */
const maxSlidingWindow = (nums, k) => {
  let n = nums.length;
  if (n === 0) return [];
  if (n * k === 0) return [0];
  if (k === 1) return nums;

  const left = [nums[0]];
  const right = [];
  right[n - 1] = nums[n - 1];
  for (let i = 1; i < n; i++) {
    // from left to right
    if (i % k === 0) left[i] = nums[i]; // block_start
    else left[i] = Math.max(left[i - 1], nums[i]);

    // from right to left
    let j = n - i - 1;
    if ((j + 1) % k === 0) right[j] = nums[j]; // block_end
    else right[j] = Math.max(right[j + 1], nums[j]);
  }

  const res = [];
  for (let i = 0; i < n - k + 1; i++) {
    res[i] = Math.max(left[i + k - 1], right[i]);
  }
  return res;
};

