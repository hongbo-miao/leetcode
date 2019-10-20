// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
// Now consider if some obstacles are added to the grids. How many unique paths would there be?
//
// An obstacle and empty space is marked as 1 and 0 respectively in the grid.
//
// Note: m and n will be at most 100.
//
// Example 1:
//
// Input:
// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// Output: 2
// Explanation:
// There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */

/** Dynamic programming */
function uniquePathsWithObstacles(obstacleGrid) {
  if (obstacleGrid == null || obstacleGrid.length === 0 || obstacleGrid[0].length === 0) return 0;

  const h = obstacleGrid.length;
  const w = obstacleGrid[0].length;
  const dp = [...Array(h + 1)].map(() => Array(w + 1).fill(0));

  // Because you can only arrive to dp[1][1] from dp[0][1] or dp[1][0], you can only set one of them as 1
  // so that dp[1][1] can be 1, which means when you at the obstacleGrid[0][0], there are only 1 path.
  dp[0][1] = 1;
  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= w; j++) {
      if (obstacleGrid[i - 1][j - 1] === 0) {  // continue moving if it is not obstacle
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[h][w];
}
