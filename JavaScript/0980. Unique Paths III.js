// On a 2-dimensional grid, there are 4 types of squares:
//
// - 1 represents the starting square.  There is exactly one starting square.
// - 2 represents the ending square.  There is exactly one ending square.
// - 0 represents empty squares we can walk over.
// - -1 represents obstacles that we cannot walk over.
//
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.
//
// Example 1:
//
// Input: [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
// Output: 2
// Explanation: We have the following two paths:
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
// 2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
//
// Example 2:
//
// Input: [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
// Output: 4
// Explanation: We have the following four paths:
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
// 2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
// 3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
// 4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
//
// Example 3:
//
// Input: [[0,1],[2,0]]
// Output: 0
// Explanation:
// There is no path that walks over every empty square exactly once.
// Note that the starting and ending square can be anywhere in the grid.
//
// Note:
//
// 1 <= grid.length * grid[0].length <= 20

/**
 * @param {number[][]} grid
 * @return {number}
 */
const uniquePathsIII = (grid) => {
  if (grid == null || grid.length === 0) return 0;

  const h = grid.length;
  const w = grid[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let start;
  let end;
  let emptyCount = 1;
  let res = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] === 0) emptyCount++;
      else if (grid[i][j] === 1) start = [i, j];
      else if (grid[i][j] === 2) end = [i, j];
    }
  }

  const go = (x, y, count) => {
    if (grid[x][y] === -1 || grid[x][y] === Infinity) return;

    if (x === end[0] && y === end[1]) {
      if (count === emptyCount) res++;
      return;
    }

    grid[x][y] = Infinity; // Mark visited
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w) {
        go(i, j, count + 1);
      }
    }
    grid[x][y] = 0; // Reset
  };

  go(start[0], start[1], 0);
  return res;
};
