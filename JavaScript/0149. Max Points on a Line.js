// Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
//
// Example 1:
//
// Input: [[1,1],[2,2],[3,3]]
// Output: 3
// Explanation:
// ^
// |
// |        o
// |     o
// |  o
// +------------->
// 0  1  2  3  4
//
// Example 2:
//
// Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
// Output: 4
// Explanation:
// ^
// |
// |  o
// |     o        o
// |        o
// |  o        o
// +------------------->
// 0  1  2  3  4  5  6
//
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

/**
 * @param {number[][]} points
 * @return {number}
 */
const maxPoints = (points) => {
  if (points == null || points.length === 0) return 0;

  let max = 0;
  for (let i = 0; i < points.length; i++) {
    const map = {};
    let samePointCount = 0;
    let sameSlopeCount = 0;

    for (let j = i + 1; j < points.length; j++) {
      if (isEqual(points[i], points[j])) {
        samePointCount++;
        continue;
      }

      const slope = getSlope(points[i], points[j]);
      if (map[slope] == null) map[slope] = 0;
      map[slope]++;

      sameSlopeCount = Math.max(sameSlopeCount, map[slope]);
    }
    max = Math.max(max, sameSlopeCount + samePointCount + 1);
  }
  return max;
};

const isEqual = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const getSlope = ([x1, y1], [x2, y2]) => {
  if (x1 === x2) return Infinity;
  return 1000000000000 * (y1 - y2) / (x1 - x2); // overcome JavaScript division precision issue by multiplying a large number
};
