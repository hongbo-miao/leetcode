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
// Time O(log(hw))
function searchMatrix1(matrix, target) {
  if (matrix == null || matrix.length === 0) return false;

  const h = matrix.length;
  const w = matrix[0].length;

  let l = 0;
  let r = h * w - 1;

  while (l <= r) {
    const m = ~~((l + r) / 2);

    const i = ~~(m / w); // row
    const j = m % w; // col

    if (matrix[i][j] === target) return true;
    else if (matrix[i][j] < target) l = m + 1;
    else r = m - 1;
  }

  return false;
}

/** 2) Binary search twice, locate row first, then column */
// Time O(log(h) + log(w))
function searchMatrix2(matrix, target) {
  if (matrix == null || matrix.length === 0) return false;

  const h = matrix.length;
  const w = matrix[0].length;

  if (target < matrix[0][0] || target > matrix[h - 1][w - 1]) return false;

  let l = 0;
  let r = h - 1;

  while (l <= r) {
    const m = ~~((l + r) / 2);

    if (matrix[m][0] === target) return true;
    else if (matrix[m][0] < target) l = m + 1;
    else r = m - 1;
  }

  const row = r;
  l = 0;
  r = w - 1;

  while (l <= r) {
    const m = ~~((l + r) / 2);

    if (matrix[row][m] === target) return true;
    else if (matrix[row][m] < target) l = m + 1;
    else r = m - 1;
  }

  return false;
}

/** 3) Search from top right corner */
// Similar
// 240. Search a 2D Matrix II
//
// Time O(h + w), rule out one row or one column each time
function searchMatrix(matrix, target) {
  if (matrix == null || matrix.length === 0) return false;

  const h = matrix.length;
  const w = matrix[0].length;

  let row = 0;
  let col = w - 1;

  while (col >= 0 && row <= h - 1) {
    if (target === matrix[row][col]) return true;
    else if (target < matrix[row][col]) col--;
    else if (target > matrix[row][col]) row++;
  }

  return false;
}
