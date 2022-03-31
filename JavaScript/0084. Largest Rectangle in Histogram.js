// Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
//
//       |
//     | |
//     | |
//     | |   |
// |   | | | |
// | | | | | |
//
// Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].
// The largest rectangle is shown in the shaded area, which has area = 10 unit.
//
// Example:
//
// Input: [2,1,5,6,2,3]
// Output: 10

/**
 * @param {number[]} heights
 * @return {number}
 */

// Monotonic Stack
// https://youtu.be/KkJrGxuQtYo?t=479
// Time O(n)
// Space O(n)
//
// Last pop() is hIdx
// Then peak() is lIdx
//
// st     hIdx lIdx rIdx h w area max
// [0]
// []      0   U    1    2 1  2    2
// [1]
// [1,2]
// [1,2,3]
// [1,2]   3   2    4    6 1  6    6
// [1]     2   1    4    5 2  10   10
// [1,4]
// [1,4,5]
// [1,4]   5   4    6    3 1  3    10
// [1]     4   1    6    2 4  8    10
// []      1   U    6    1 6  6    10
const largestRectangleArea = (heights) => {
  const st = [];

  const getArea = (rIdx) => {
    const hIdx = st.pop();
    const h = heights[hIdx];

    const lIdx = st[st.length - 1];

    const w = st.length ? rIdx - lIdx - 1 : rIdx;
    return w * h;
  };

  let max = 0;
  for (let rIdx = 0; rIdx < heights.length; rIdx++) {
    while (st.length && heights[rIdx] < heights[st[st.length - 1]]) {
      const area = getArea(rIdx);
      max = Math.max(max, area);
    }
    st.push(rIdx);
  }
  while (st.length) {
    const area = getArea(heights.length);
    max = Math.max(max, area);
  }
  return max;
};
