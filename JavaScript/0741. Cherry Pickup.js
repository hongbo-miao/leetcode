// In a N x N grid representing a field of cherries, each cell is one of three possible integers.
//
// - 0 means the cell is empty, so you can pass through;
// - 1 means the cell contains a cherry, that you can pick up and pass through;
// - -1 means the cell contains a thorn that blocks your way.
//
//
// Your task is to collect maximum number of cherries possible by following the rules below:
//
// - Starting at the position (0, 0) and reaching (N-1, N-1) by moving right or down through valid path cells (cells with value 0 or 1);
// - After reaching (N-1, N-1), returning to (0, 0) by moving left or up through valid path cells;
// - When passing through a path cell containing a cherry, you pick it up and the cell becomes an empty cell (0);
// - If there is no valid path between (0, 0) and (N-1, N-1), then no cherries can be collected.

/**
 * @param {number[][]} grid
 * @return {number}
 */

/** 1) Dynamic Programming (Recursion) */
// http://zxi.mytechroad.com/blog/dynamic-programming/leetcode-741-cherry-pickup/
//
// Time O(n^3)
// Space O(n^3)
//
// Key observation: (0,0) to (n-1, n-1) to (0, 0) is the same as (n-1,n-1) to (0,0) twice
//
// Two people starting from (n-1, n-1) and go to (0, 0).
// They move one step (left or up) at a time simultaneously. And pick up the cherry within the grid (if there is one).
// If they ended up at the same grid with a cherry. Only one of them can pick up it.
const cherryPickup1 = (grid) => {
  if (grid == null || grid.length === 0) return 0;

  const n = grid.length;
  const dp = [...new Array(n)].map(() =>
    [...new Array(n)].map(() =>
      Array(n).fill(-Infinity)
    ),
  );
  dp[0][0][0] = grid[0][0];

  const go = (x1, y1, x2) => {
    const y2 = x1 + y1 - x2;
    if (x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0) return -1;
    if (grid[y1][x1] === -1 || grid[y2][x2] === -1) return -1;
    if (dp[y1][x1][x2] !== -Infinity) return dp[y1][x1][x2];

    dp[y1][x1][x2] = Math.max(
      go(x1 - 1, y1, x2 - 1),
      go(x1, y1 - 1, x2),
      go(x1, y1 - 1, x2 - 1),
      go(x1 - 1, y1, x2),
    );

    if (dp[y1][x1][x2] >= 0) {
      dp[y1][x1][x2] += grid[y1][x1];
      // If they ended up at the same grid with a cherry. Only one of them can pick up it.
      if (x1 !== x2) dp[y1][x1][x2] += grid[y2][x2];
    }
    return dp[y1][x1][x2];
  };

  return Math.max(go(n - 1, n - 1, n - 1), 0);
};

/** 2) Dynamic Programming (Iteration) */
const cherryPickup = (grid) => {
  if (grid == null || grid.length === 0) return 0;

  const n = grid.length;
  const dp = [...new Array(n + 1)].map(() =>
    [...new Array(n + 1)].map(() =>
      Array(n + 1).fill(-Infinity)
    ),
  );
  dp[1][1][1] = grid[0][0];

  for (let i1 = 1; i1 <= n; i1++) {
    for (let j1 = 1; j1 <= n; j1++) {
      for (let i2 = 1; i2 <= n; i2++) {
        const j2 = i1 + j1 - i2;
        if (i1 < 1 || j1 < 1 || i2 < 1 || j2 < 1) continue;
        if (grid[i1 - 1][j1 - 1] === -1 || grid[i2 - 1][j2 - 1] === -1) continue;

        const cur = Math.max(
          dp[i1 - 1][j1][i2],
          dp[i1 - 1][j1][i2 - 1],
          dp[i1][j1 - 1][i2],
          dp[i1][j1 - 1][i2 - 1],
        );

        if (cur >= 0) {
          dp[i1][j1][i2] = cur + grid[i1 - 1][j1 - 1];
          if (i1 !== i2) dp[i1][j1][i2] += grid[i2 - 1][j2 - 1];
        }
      }
    }
  }
  return Math.max(dp[n][n][n], 0);
};

/** 3) Dynamic Programming (Optimized) */
// Time O(n^3)
// Space O(n^2)
