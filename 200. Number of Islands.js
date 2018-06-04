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
/** DFS */
function numIslands(grid) {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        count++;
      }
    }
  }

  return count;
}

function dfs(grid, row, col) {
  if (grid[row][col] === '1') {
    grid[row][col] = '*'; // mark land piece as visited

    if (row > 0) dfs(grid, row - 1, col); // up
    if (row < grid.length - 1) dfs(grid, row + 1, col); // down
    if (col > 0) dfs(grid, row, col - 1); // left
    if (col < grid[row].length - 1) dfs(grid, row, col + 1);  // right
  }
}
