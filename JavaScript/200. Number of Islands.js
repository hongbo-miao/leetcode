// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
//
// Example 1:
//
// Input:
// 11110
// 11010
// 11000
// 00000
//
// Output: 1
//
// Example 2:
//
// Input:
// 11000
// 11000
// 00100
// 00011
//
// Output: 3

/**
 * @param {character[][]} grid
 * @return {number}
 */

/** 1) DFS */
// Similar
// 547. Friend Circles
function numIslands(grid) {
  function go(i, j) {
    if (grid[i][j] !== '1') return;

    grid[i][j] = '*';  // go land piece as visited

    if (i > 0) go(i - 1, j);  // up
    if (i < grid.length - 1) go(i + 1, j);  // down
    if (j > 0) go(i, j - 1);  // left
    if (j < grid[i].length - 1) go(i, j + 1);  // right
  }

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        go(i, j);
        count++;
      }
    }
  }

  return count;
}


/** 2) Similar to 1) */
function numIslands(grid) {
  if (grid.length === 0) return 0;

  const h = grid.length;
  const w = grid[0].length;

  function go(i, j) {
    if (i < 0 || i >= h || j < 0 || j >= w || grid[i][j] !== '1') {
      return false;
    }

    grid[i][j] = '*';
    go(i - 1, j);
    go(i + 1, j);
    go(i, j - 1);
    go(i, j + 1);
    return true;
  }

  let count = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (go(i, j) === true) {
        count++;
      }
    }
  }

  return count;
}
