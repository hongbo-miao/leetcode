// Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
//
// Example 1:
//
// Input:
//   [
//     [1,1,1],
//     [1,0,1],
//     [1,1,1]
//   ]
// Output:
//   [
//     [1,0,1],
//     [0,0,0],
//     [1,0,1]
//   ]
//
// Example 2:
//
// Input:
//   [
//     [0,1,2,0],
//     [3,4,5,2],
//     [1,3,1,5]
//   ]
// Output:
//   [
//     [0,0,0,0],
//     [0,4,5,0],
//     [0,3,1,0]
//   ]
//
// Follow up:
//
//   A straight forward solution using O(mn) space is probably a bad idea.
//   A simple improvement uses O(m + n) space, but still not the best solution.
//   Could you devise a constant space solution?

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 0 === -0          true
// Object.is(-0, 0)  false
//
// 0 && 0     0
// 0 && -0    0
// -0 && 0   -0
// -0 && -0  -0
function setZeroes(matrix) {
  let height = matrix.length;
  let width = matrix[0].length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!Object.is(matrix[i][j], 0)) continue;

      for (let x = 0; x < width; x++) {
        matrix[i][x] = matrix[i][x] && -0;
      }

      for (let y = 0; y < height; y++) {
        matrix[y][j] = matrix[y][j] && -0;
      }
    }
  }
}
