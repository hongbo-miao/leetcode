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
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
function merge(intervals) {
  if (!intervals.length) return intervals;

  intervals.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end);

  let prev = intervals[0];
  let results = [prev];

  for (let i = 1; i < intervals.length; i++) {
    const curr = intervals[i];

    if (prev.end >= curr.start) {
      prev.end = Math.max(prev.end, curr.end);  // here will change prev in results and intervals too
    } else {
      results = [...results, curr];

      prev = curr;
    }
  }

  return results;
}
