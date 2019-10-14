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

/** Brute force (time limit exceeded) */
// Time O(n^3). Note 'includes' has another O(n)
// Space O(1)
function longestConsecutive1(nums) {
  let max = 0;

  for (let num of nums) {
    let currNum = num;
    let currMax = 1;

    while (nums.includes(currNum + 1)) {
      currNum += 1;
      currMax += 1;
    }
    max = Math.max(max, currMax);
  }

  return max;
}

/** 2) Hash set and intelligent sequence building */
// Time O(n). Although the time complexity appears to be quadratic due to the while loop nested within the for loop,
//   closer inspection reveals it to be linear. Because the while loop is reached only when currentNum marks the
//   beginning of a sequence (i.e. currentNum-1 is not present in nums), the while loop can only run for n iterations
//   throughout the entire runtime of the algorithm. This means that despite looking like O(n⋅n) complexity, the
//   nested loops actually run in O(n + n) = O(n) time. All other computations occur in constant time, so the overall
//   runtime is linear.
//
// Space O(n). In order to set up O(1) containment lookups, we allocate linear space for a hash table to store the
//   O(n) numbers in nums. Other than that, the space complexity is identical to that of the brute force solution.
//
// It turns out that our initial brute force solution was on the right track, but missing a few optimizations
// necessary to reach O(n) time complexity.
//
// This optimized algorithm contains only two changes from the brute force approach: the numbers are stored in a
// HashSet (or Set, in Python) to allow O(1) lookups, and we only attempt to build sequences from numbers that are
// not already part of a longer sequence. This is accomplished by first ensuring that the number that would
// immediately precede the current number in a sequence is not present, as that number would necessarily be part
// of a longer sequence.
function longestConsecutive2(nums) {
  const set = new Set(nums);
  let max = 0;

  for (let num of set) {
    if (set.has(num - 1)) continue;

    let currNum = num;
    let currMax = 1;

    while (set.has(currNum + 1)) {
      currNum += 1;
      currMax += 1;
    }
    max = Math.max(max, currMax);
  }

  return max;
}

/** 3) */
// https://leetcode.com/problems/longest-consecutive-sequence/discuss/41055/My-really-simple-Java-O(n)-solution-Accepted
//
// Time O(n)
// Space O(n)
//
// Only store the sequence length to the boundary points of the sequence
//
// e.g. for sequence [100, 4, 200, 1, 3, 2], map[1] and map[4] should both return 4 at the end
// lens { 100: 1 }
// lens { 4: 1, 100: 1 }
// lens { 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 4: 1, 100: 1, 200: 1 }
// lens { 1: 1, 3: 2, 4: 2, 100: 1, 200: 1 }
// lens { 1: 4, 2: 4, 3: 2, 4: 4, 100: 1, 200: 1 }
function longestConsecutive(nums) {
  let max = 0;
  const lens = {};

  for (let n of nums) {
    if (lens[n] != null) continue;

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
