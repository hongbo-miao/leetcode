// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
//
//   Integers in each row are sorted in ascending from left to right.
//   Integers in each column are sorted in ascending from top to bottom.
//
// Consider the following matrix:
//
//   [
//     [1,   4,  7, 11, 15],
//     [2,   5,  8, 12, 19],
//     [3,   6,  9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
//   ]
//
// Example 1:
//
// Input: matrix, target = 5
// Output: true
//
// Example 2:
//
// Input: matrix, target = 20
// Output: false

/** 1) Search from top right corner */
// Similar
// 74. Search a 2D Matrix
//
// time O(m + n), rule out one row or one column each time
function searchMatrix1(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  let i = 0;
  let j = matrix[0].length - 1;

  while (j >= 0 && i < matrix.length) {
    if (matrix[i][j] === target) return true;
    else if (matrix[i][j] > target) j--;
    else i++;
  }

  return false;
}

/** 2) Slower than 1) */
function searchMatrix(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  function go(i, j) {
    if (
      i > matrix.length - 1
      || j > matrix[0].length - 1
      || matrix[i][j] > target
      || matrix[i][j] === '*'
    ) return false;

    if (matrix[i][j] === target) return true;

    matrix[i][j] = '*';  // mark visited
    return go(i + 1, j) || go(i, j + 1);
  }

  return go(0, 0)
}
