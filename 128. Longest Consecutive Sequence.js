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
// Time complexity O(n)
//
// The key thing is to keep track of the sequence length and store that in the boundary points of the sequence
// e.g. for sequence [100, 4, 200, 1, 3, 2], map[1] and map[4] should both return 4 at the end
//
// lens { 100: 1 }
// lens { 4: 1, 100: 1 }
// lens { 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 3: 2, 4: 2, 100: 1, 200: 1 }
// lens { 1: 4, 2: 4, 3: 2, 4: 4, 100: 1, 200: 1 }
function longestConsecutive(nums) {
  let maxLength = 0;
  let lens = {};
  
  for (let n of nums) {
    if (lens[n] !== undefined) continue;

    const lLen = lens[n - 1] !== undefined ? lens[n - 1] : 0;
    const rLen = lens[n + 1] !== undefined ? lens[n + 1] : 0;

    const newLen = lLen + rLen + 1;

    // extend the length to the boundary(s)
    lens[n - lLen] = newLen;
    lens[n] = newLen;
    lens[n + rLen] = newLen;

    maxLength = Math.max(maxLength, newLen);
  }

  return maxLength;
}
