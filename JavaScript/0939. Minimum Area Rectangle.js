// Given a set of points in the xy-plane, determine the minimum area of a rectangle formed from these points, with sides parallel to the x and y axes.
//
// If there isn't any rectangle, return 0.
//
//
//
// Example 1:
//
// Input: [[1,1],[1,3],[3,1],[3,3],[2,2]]
// Output: 4
// Example 2:
//
// Input: [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
// Output: 2
//
//
// Note:
//
// 1 <= points.length <= 500
// 0 <= points[i][0] <= 40000
// 0 <= points[i][1] <= 40000
// All points are distinct.

/**
 * @param {number[][]} points
 * @return {number}
 */

/** Count by Diagonal */
// Time O(n^2)
// Space O(n)
// For each pair of points in the array, consider them to be the long diagonal of a potential rectangle.
// We can check if all 4 points are there using a Set.
// For example, if the points are (1, 1) and (5, 5), we check if we also have (1, 5) and (5, 1). If we do, we have a candidate rectangle.
const minAreaRect = (points) => {
  const map = new Map();
  for (const [x, y] of points) {
    if (!map.has(x)) map.set(x, new Set());
    map.get(x).add(y);
  }

  let min = Infinity;
  for (const [x1, y1] of points) {
    for (const [x2, y2] of points) {
      if (x1 === x2 || y1 === y2) continue;

      // Find other two diagonal points
      if (map.get(x1).has(y2) && map.get(x2).has(y1)) {
        min = Math.min(min, Math.abs(x1 - x2) * Math.abs(y1 - y2));
      }
    }
  }
  return min === Infinity ? 0 : min;
};
