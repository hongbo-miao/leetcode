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

// 1) DFS
// Similar
// 200. Number of Islands
// 547. Friend Circles
//
// Time O(M * N) where M is the number of rows and N is the number of columns.
// Space O(M * N). Worst case O(M * N) in case that the grid map is filled with lands where DFS goes by M * N deep.
const numIslands = (grid) => {
  if (grid.length === 0) return 0;

  const h = grid.length;
  const w = grid[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  const go = (x, y) => {
    grid[x][y] = '*'; // Mark visited
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w && grid[i][j] === '1') {
        go(i, j);
      }
    }
  };

  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        go(i, j);
        res++;
      }
    }
  }
  return res;
};

// 2) BFS
// https://leetcode.com/problems/number-of-islands/solution/
// Time O(M * N) where M is the number of rows and N is the number of columns.
// Space O(min(M, N)) because in worst case where the grid is filled with lands, the size of queue can grow up to min(M,N).


// 3) Union Find
// Time O(M * N) where M is the number of rows and N is the number of columns. Note that Union operation takes
//   essentially constant time[1] when UnionFind is implemented with both path compression and union by rank.
// Space O(M * N) as required by UnionFind data structure.
