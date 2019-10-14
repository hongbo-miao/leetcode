// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
//
// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
//
// Example 1:
//
// Input:
//   matrix = [
//     [1,   3,  5,  7],
//     [10, 11, 16, 20],
//     [23, 30, 34, 50]
//   ]
// target = 3
// Output: true
//
// Example 2:
//
// Input:
//   matrix = [
//     [1,   3,  5,  7],
//     [10, 11, 16, 20],
//     [23, 30, 34, 50]
//   ]
// target = 13
// Output: false

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

/** 1) Binary search twice, treat 2d matrix as a long array */
// Time O(log(mn))
function searchMatrix1(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  let l = 0;
  let r = m * n - 1;
  let mid = 0;

  while (l <= r) {
    mid = ~~((l + r) / 2);

    const i = Math.floor((mid / n));  // row
    const j = mid % n;  // col

    if (matrix[i][j] === target) return true;
    else if (matrix[i][j] < target) l = mid + 1;
    else r = mid - 1;
  }

  return false;
}

/** 2) Binary search twice, locate row first, then column */
// Time O(log(m) + log(n))
function searchMatrix2(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) return false;

  let l = 0;
  let r = m - 1;

  while (l <= r) {
    const mid = ~~((l + r) / 2);

    if (matrix[mid][0] === target) return true;
    else if (matrix[mid][0] < target) l = mid + 1;
    else r = mid - 1;
  }

  const row = r;
  l = 0;
  r = n - 1;

  while (l <= r) {
    const mid = ~~((l + r) / 2);

    if (matrix[row][mid] === target) return true;
    else if (matrix[row][mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return false;
}

/** 3) Search from top right corner */
// Similar
// 240. Search a 2D Matrix II
//
// Time O(m + n), rule out one row or one column each time
function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (col >= 0 && row <= matrix.length - 1) {
    if (target === matrix[row][col]) return true;
    else if (target < matrix[row][col]) col--;
    else if (target > matrix[row][col]) row++;
  }

  return false;
}
