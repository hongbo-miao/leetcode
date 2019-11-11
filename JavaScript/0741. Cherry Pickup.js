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

/** 1) Dynamic Programming */
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
const cherryPickup = (grid) => {
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
    if (x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0) return -Infinity;
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

  return Math.max(0, go(n - 1, n - 1, n - 1));
};

/** 2) Dynamic Programming (Optimized) */
// Time O(n^3)
// Space O(n^2)
