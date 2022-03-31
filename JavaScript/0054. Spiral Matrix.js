// Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.
//
// Example 1:
//
// Input:
//   [
//     [ 1, 2, 3 ],
//     [ 4, 5, 6 ],
//     [ 7, 8, 9 ]
//   ]
// Output: [1,2,3,6,9,8,7,4,5]
//
// Example 2:
//
// Input:
//   [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9,10,11,12]
//   ]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

// Directions
// Similar
// 54. Spiral Matrix
// 59. Spiral Matrix II
//
// https://leetcode.com/problems/spiral-matrix/discuss/20573/A-concise-C++-implementation-based-on-Directions
//
// When traversing the matrix in the spiral order, at any time we follow one out of the following four directions:
// RIGHT DOWN LEFT UP. Suppose we are working on a 5 x 3 matrix as such:
// 0  1  2  3  4  5
//    6  7  8  9 10
//   11 12 13 14 15
//
// Imagine a cursor starts off at (0, -1), i.e. the position at '0', then we can achieve the spiral order by doing
// the following:
// 1. Go right 5 times
// 2. Go down 2 times
// 3. Go left 4 times
// 4. Go up 1 times.
// 5. Go right 3 times
// 6. Go down 0 times -> quit
//
// Notice that the directions we choose always follow the order 'right -> down -> left -> up', and for horizontal
// movements, the number of shifts follows: { 5, 4, 3 }, and vertical movements follows { 2, 1, 0 }.
// Thus, we can make use of a direction matrix that records the offset for all directions, then an array of two
// elements that stores the number of shifts for horizontal and vertical movements, respectively. This way, we really
// just need one for loop instead of four.
const spiralOrder = (matrix) => {
  if (matrix == null || matrix.length === 0) return [];

  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const steps = [matrix[0].length, matrix.length - 1];
  let dir = 0;
  let x = 0;
  let y = -1;
  const res = [];

  while (steps[dir % 2] > 0) {
    for (let i = 0; i < steps[dir % 2]; i++) {
      x += dirs[dir][0];
      y += dirs[dir][1];
      res.push(matrix[x][y]);
    }

    steps[dir % 2]--;
    dir = (dir + 1) % 4;
  }
  return res;
};
