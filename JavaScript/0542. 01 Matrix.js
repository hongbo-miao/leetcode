// Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.
// The distance between two adjacent cells is 1.
//
// Example 1:
//
// Input:
// [[0,0,0],
//  [0,1,0],
//  [0,0,0]]
//
// Output:
// [[0,0,0],
//  [0,1,0],
//  [0,0,0]]
//
// Example 2:
//
// Input:
// [[0,0,0],
//  [0,1,0],
//  [1,1,1]]
//
// Output:
// [[0,0,0],
//  [0,1,0],
//  [1,2,1]]
//
// Note:
//
// The number of elements of the given matrix will not exceed 10,000.
// There are at least one 0 in the given matrix.
// The cells are adjacent in only four directions: up, down, left and right.

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

// 1) BFS
// Time O(r * c). 2 passes of r * c each
// Space O(r * c).
//
// For our BFS routine, we keep a queue, q to maintain the queue of cells to be examined next.
// We start by adding all the cells with 0s to q.
// Initially, distance for each 0 cell is 0 and distance for each 1 is Infinity, which is updated during the BFS.
// Pop the cell from queue, and examine its neighbours. If the new calculated distance for neighbour {i,j} is smaller,
// we add {i,j} to q and update matrix[i][j].
const updateMatrix = (matrix) => {
  if (matrix == null || matrix.length === 0 || matrix[0].length === 0) return matrix;

  const h = matrix.length;
  const w = matrix[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const q = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (matrix[i][j] === 0) {
        q.push([i, j]);
      } else {
        matrix[i][j] = Infinity;
      }
    }
  }

  while (q.length) {
    const [x, y] = q.shift();
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i < 0 || i >= h || j < 0 || j >= w) continue;
      if (matrix[i][j] > matrix[x][y] + 1) {
        q.push([i, j]);
        matrix[i][j] = matrix[x][y] + 1;
      }
    }
  }
  return matrix;
};

// 2) Dynamic programming
// Time O(r * c). 2 passes of r * c each
// Space O(r * c)
