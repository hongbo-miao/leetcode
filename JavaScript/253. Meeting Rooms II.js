// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.
//
// Example 1:
//
// Input: [[0, 30],[5, 10],[15, 20]]
// Output: 2
//
// Example 2:
//
// Input: [[7,10],[2,4]]
// Output: 1
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

/**
 * @param {number[][]} intervals
 * @return {number}
 */

/** Chronological ordering */
// https://leetcode.com/problems/meeting-rooms-ii/discuss/67855/Explanation-of-%22Super-Easy-Java-Solution-Beats-98.8%22-from-%40pinkfloyda
// For simulation, check @JobQ' comment under the post.
//
// Time O(n log n)
// Space O(n)
function minMeetingRooms(intervals) {
  const starts = intervals
    .concat()  // make sure shallow copy, otherwise when sort 'ends', 'starts' will change too
    .map(a => a[0])
    .sort((a, b) => a - b);

  const ends = intervals
    .map(a => a[1])
    .sort((a, b) => a - b);

  let room = 0;
  let endIdx = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[endIdx]) {
      room++;
    } else {
      endIdx++;
    }
  }
  return room;
}
