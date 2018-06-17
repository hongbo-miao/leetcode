// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
//
// Your algorithm should run in O(n) complexity.
//
// Example:
//
// Input: [100, 4, 200, 1, 3, 2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

/**
 * @param {number[]} nums
 * @return {number}
 */

// https://leetcode.com/problems/longest-consecutive-sequence/discuss/41055/My-really-simple-Java-O(n)-solution-Accepted
//
// Complexity
// time O(n)
//
// Idea
// Only store the sequence length to the boundary points of the sequence
//
// Example
// e.g. for sequence [100, 4, 200, 1, 3, 2], map[1] and map[4] should both return 4 at the end
//
// lens { 100: 1 }
// lens { 4: 1, 100: 1 }
// lens { 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 3: 2, 4: 2, 100: 1, 200: 1 }
// lens { 1: 4, 2: 4, 3: 2, 4: 4, 100: 1, 200: 1 }
function longestConsecutive(nums) {
  let max = 0;
  let lens = {};
  
  for (let n of nums) {
    if (lens[n] !== undefined) continue;

    const l = lens[n - 1] || 0;   // left length
    const r = lens[n + 1] || 0;   // right length

    const len = l + r + 1;

    // extend the length to the boundaries
    lens[n - l] = len;
    lens[n] = len;
    lens[n + r] = len;

    max = Math.max(max, len);
  }

  return max;
}
