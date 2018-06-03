// Given n non-negative integers a_1, a_2, ..., a_n, where each represents a point at coordinate (i, a_i).
// n vertical lines are drawn such that the two endpoints of line i is at (i, a_i) and (i, 0).
// Find two lines, which together with x-axis forms a container, such that the container contains the most water.
//
// Note: You may not slant the container and n is at least 2.

/**
 * @param {number[]} height
 * @return {number}
 */

/** Two pointers */
// https://leetcode.com/problems/container-with-most-water/discuss/6099/Yet-another-way-to-see-what-happens-in-the-O(n)-algorithm
// Time complexity O(n)
// Space complexity O(1)
function maxArea(heights) {
  let max = 0;

  let l = 0;
  let r = heights.length - 1;

  while (l < r) {
    const area = Math.min(heights[l], heights[r]) * (r - l);
    max = Math.max(max, area);

    if (heights[l] < heights[r]) l++;
    else r--;
  }

  return max;
}
