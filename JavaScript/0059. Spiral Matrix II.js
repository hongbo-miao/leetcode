// Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.
//
// Example:
//
// Input: 3
// Output:
// [
//  [ 1, 2, 3 ],
//  [ 8, 9, 4 ],
//  [ 7, 6, 5 ]
// ]

/**
 * @param {number} n
 * @return {number[][]}
 */

/** Directions */
// Similar
// 54. Spiral Matrix
// 59. Spiral Matrix II
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
const generateMatrix = (n) => {
  const matrix = [...Array(n)].map(() => Array(n).fill(null));
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
  const steps = [n, n - 1];

  let num = 1;
  let dir = 0;
  let x = 0;
  let y = -1;

  while (steps[dir % 2] > 0) {
    for (let i = 0; i < steps[dir % 2]; i++) {
      x += dirs[dir][0];
      y += dirs[dir][1];
      matrix[x][y] = num++;
    }

    steps[dir % 2]--;
    dir = (dir + 1) % 4;
  }
  return matrix;
};
