// Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// Count the number of distinct islands. An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
//
// Example 1:
// 11000
// 11000
// 00011
// 00011
// Given the above grid map, return 1.
//
// Example 2:
// 11011
// 10000
// 00001
// 11011
// Given the above grid map, return 3.
//
// Notice that:
// 11
// 1
// and
//  1
// 11
// are considered different island shapes, because we do not consider reflection / rotation.
// Note: The length of each dimension in the given grid does not exceed 50.

/**
 * @param {number[][]} grid
 * @return {number}
 */

/** Backtracking */
// Time O(R * C)
// Space O(R * C)
//
// e.g.
// 11011
// 10000
// 00001
// 11011
// set = { 'odbrbb', 'orbb', 'odlbbb' }
//
// e.g.
// 110
// 011
// 000
// 111
// 010
// set = { 'ordrbbbb', 'ordbrbbb' } // without 'b', will be same as 'ordr' which is wrong
const numDistinctIslands = (grid) => {
  if (grid == null || grid.length === 0) return 0;

  const h = grid.length;
  const w = grid[0].length;
  const set = new Set();

  const go = (x, y, dir) => {
    if (x < 0 || x >= h || y < 0 || y >= w || grid[x][y] === 0) return '';
    grid[x][y] = 0; // Mark visited
    return dir +
      go(x - 1, y, 'u') +
      go(x + 1, y, 'd') +
      go(x, y + 1, 'r') +
      go(x, y - 1, 'l') +
      'b'; // Mark 'back', because e.g. down -> right (dr) is not same as down -> back -> right (dbr)
  };

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] === 1) {
        set.add(go(i, j, 'o'))
      }
    }
  }
  return set.size;
};
