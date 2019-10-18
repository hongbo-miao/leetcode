// Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
//
// Example:
//
// Input:
//
// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0
//
// Output: 4

/**
 * @param {character[][]} matrix
 * @return {number}
 */

/** Dynamic programming */
// https://leetcode.com/problems/maximal-square/discuss/61803/Easy-DP-solution-in-C++-with-detailed-explanations-(8ms-O(n2)-time-and-O(n)-space)
//
// 1. topmost row: P[0][j] = matrix[0][j]
// 2. leftmost column: P[i][0] = matrix[i][0]
// 3. For i > 0 and j > 0
//   1) if matrix[i][j] = 0, P[i][j] = 0
//   2) if matrix[i][j] = 1, P[i][j] = min(P[i - 1][j], P[i][j - 1], P[i - 1][j - 1]) + 1
//
// Time O(n^2)
// Space O(n^2), can be optimized to O(n)
function maximalSquare(matrix) {
  if (matrix == null || matrix.length === 0) return 0;

  const h = matrix.length;
  const w = matrix[0].length;

  // init 2d sizes to 0
  const dp = [];
  for (let i = 0; i < h; i++) {
    const row = [];
    for (let j = 0; j < w; j++) row.push(0);
    dp.push(row);
  }

  let max = 0;

  for (let j = 0; j < w; j++) {
    dp[0][j] = Number(matrix[0][j]);
    max = Math.max(max, dp[0][j]);
  }

  for (let i = 0; i < h; i++) {
    dp[i][0] = Number(matrix[i][0]);
    max = Math.max(max, dp[i][0]);
  }

  for (let i = 1; i < h; i++) {
    for (let j = 1; j < w; j++) {
      if (matrix[i][j] === '1') {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        max = Math.max(max, dp[i][j]);
      }
    }
  }

  return max * max;
}
