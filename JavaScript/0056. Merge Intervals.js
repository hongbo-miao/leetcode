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

// 1) Sorting
// Time O(n log n), other than the sort invocation, we do a simple linear scan of the list, so the runtime is dominated by the O(n log n) complexity of sorting
// Space O(1)
const merge1 = (intervals) => {
  if (intervals == null || intervals.length === 0) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  let pre = intervals[0];
  const res = [pre];

  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];

    if (pre[1] < cur[0]) {
      // e.g. [1, 2], [4, 6]
      res.push(cur);
      pre = cur;
    } else {
      // e.g. [1, 3], [2, 6] or [1, 3], [3, 6]
      pre[1] = Math.max(pre[1], cur[1]);
    }
  }
  return res;
};

// 2) Similar to 1, but slower
const merge = (intervals) => {
  if (intervals == null || intervals.length === 0) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  let i = 0;
  while (i < intervals.length - 1) {
    const a = intervals[i];
    const b = intervals[i + 1];
    if (a[1] >= b[0]) {
      intervals = [
        ...intervals.slice(0, i),
        [a[0], Math.max(a[1], b[1])],
        ...intervals.slice(i + 2),
      ];
    } else {
      i++;
    }
  }
  return intervals;
};
