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

/** Monotonic queue */
// https://www.youtube.com/watch?v=2SXqBsTR6a8
//
// Complexity
// time O(n)
// space O(k)
//
// Idea
// push an element in the queue will pop all elements smaller than it
//
// Monotonic queue   max
// [ 1 ]              -
// [ 3 ]              -
// [ 3, -1 ]          3
// [ 3, -1, -3 ]      3
// [ 5 ]              5
// [ 5, 3 ]           5
// [ 6 ]              6
// [ 7 ]              7
function maxSlidingWindow(nums, k) {
  let res = [];
  let q = [];

  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[i] > q[q.length - 1]) q.pop();

    q.push(nums[i]);

    const startIdx = i - k + 1;

    if (startIdx < 0) continue;

    res.push(q[0]);
    if (nums[startIdx] === q[0]) q.shift(); // make sure no duplicated one
  }

  return res;
}
