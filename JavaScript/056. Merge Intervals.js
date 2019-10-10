// Given a collection of intervals, merge all overlapping intervals.
//
// Example 1:
//
// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
//
// Example 2:
//
// Input: [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

/** 1) Sorting */
// Time O(n log n), other than the sort invocation, we do a simple linear scan of the list, so the runtime is dominated by the O(n log n) complexity of sorting
// Space O(1)
function merge(intervals) {
  if (intervals.length === 0) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];
  let res = [prev];

  for (let i = 1; i < intervals.length; i++) {
    const curr = intervals[i];

    if (prev[1] >= curr[0]) {
      // e.g. [1, 3], [2, 6] or [[1, 3], [3, 6]]
      prev[1] = Math.max(prev[1], curr[1]);  // here will change prev in res which is what we want
    } else {
      // e.g. [1, 2], [4, 6]
      res = [...res, curr];
      prev = curr;
    }
  }

  return res;
}

/** 2) Similar to 1, but slower */
function merge(intervals) {
  if (intervals.length === 0) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  let i = 0;
  while (i < intervals.length - 1) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      intervals = [
        ...intervals.slice(0, i),
        [intervals[i][0], Math.max(intervals[i][1], intervals[i + 1][1])],
        ...intervals.slice(i + 2),
      ];
    } else {
      i++;
    }
  }
  return intervals;
}
