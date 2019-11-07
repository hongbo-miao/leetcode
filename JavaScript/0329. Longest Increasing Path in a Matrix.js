// Given an integer matrix, find the length of the longest increasing path.
// From each cell, you can either move to four directions: left, right, up or down. You may NOT move diagonally or move outside of the boundary (i.e. wrap-around is not allowed).
//
// Example 1:
//
// Input: nums =
// [
//   [9,9,4],
//   [6,6,8],
//   [2,1,1]
// ]
// Output: 4
// Explanation: The longest increasing path is [1, 2, 6, 9].
//
// Example 2:
//
// Input: nums =
// [
//   [3,4,5],
//   [3,2,6],
//   [2,2,1]
// ]
// Output: 4
// Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

/**
 * @param {number[][]} matrix
 * @return {number}
 */

/** Backtracking + Memoization */
const longestIncreasingPath = (matrix) => {
  if (matrix == null || matrix.length === 0) return 0;
  const h = matrix.length;
  const w = matrix[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const cache = [...Array(h)].map(() => Array(w).fill(null));

  const go = (x, y) => {
    if (cache[x][y] != null) return cache[x][y];
    let max = 1;
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w && matrix[i][j] > matrix[x][y]) {
        const len = go(i, j) + 1;
        max = Math.max(max, len);
      }
    }
    cache[x][y] = max;
    return max;
  };

  let max = 1;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const len = go(i, j);
      max = Math.max(max, len);
    }
  }
  return max;
};
