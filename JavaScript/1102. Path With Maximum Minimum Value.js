// Given a matrix of integers A with R rows and C columns, find the maximum score of a path starting at [0,0] and ending at [R-1,C-1].
//
// The score of a path is the minimum value in that path.  For example, the value of the path 8 →  4 →  5 →  9 is 4.
//
// A path moves some number of times from one visited cell to any neighbouring unvisited cell in one of the 4 cardinal directions (north, east, west, south).
//
// Example 1:
//
// [5] [4] [5]
//  1   2  [6]
//  7   4  [6]
//
// Input: [[5,4,5],[1,2,6],[7,4,6]]
// Output: 4
// Explanation:
// The path with the maximum score is highlighted in yellow.
//
// Example 2:
//
// [2] [2]  1  [2] [2] [2]
//  1  [2] [2] [2]  1  [2]
//
// Input: [[2,2,1,2,2,2],[1,2,2,2,1,2]]
// Output: 2
//
// Example 3:
//
// [3] [4] [6] [3] [4]
//  0   2   1   1  [7]
// [8] [8] [3]  2  [7]
// [3]  2  [4] [9] [8]
// [4]  1   2   0   0
// [4] [6] [5] [4] [3]
//
// Input: [[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]
// Output: 3
//
// Note:
//
// 1 <= R, C <= 100
// 0 <= A[i][j] <= 10^9

/**
 * @param {number[][]} A
 * @return {number}
 */
const maximumMinimumPath = (A) => {
  if (A == null || A.length === 0) return 0;

  const h = A.length;
  const w = A[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const q = [[0, 0]];
  const dp = [...Array(h)].map(() => Array(w).fill(0));
  dp[0][0] = A[0][0];

  while (q.length) {
    const [x, y] = q.shift();
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i < 0 || j < 0 || i >= h || j >= w) continue;
      const score = Math.min(A[i][j], dp[x][y]);
      if (score > dp[i][j]) {
        // only continue if it is on the the path that has bigger score
        dp[i][j] = score;
        q.push([i, j]);
      }
    }
  }
  return dp[h - 1][w - 1];
};
