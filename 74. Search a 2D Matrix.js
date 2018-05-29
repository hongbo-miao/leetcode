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
// 1) Treat 2d matrix as a long array
// Time complexity O(log(mn))
function searchMatrix1(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  
  const m = matrix.length;
  const n = matrix[0].length;
  
  let start = 0;
  let end = m * n - 1;
  let mid = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    const i = Math.floor((mid / n));
    const j = mid - i * n;

    if (matrix[i][j] === target) return true;
    matrix[i][j] < target ? start = mid + 1 : end = mid - 1;
  }

  return false;
}

// 2) Binary search twice, locate row first, then column
// Time complexity O(log(m) + log(n))
function searchMatrix2(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) return false;

  let start = 0;
  let end = m - 1;
  let mid = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (matrix[mid][0] === target) return true;
    matrix[mid][0] > target ? end = mid - 1 : start = mid + 1;
  }

  const row = end;
  start = 0;
  end = n - 1;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (matrix[row][mid] === target) return true;
    matrix[row][mid] > target ? end = mid - 1 : start = mid + 1;
  }

  return false;
}

// 3) Search from top right corner
// Time complexity O(m + n), rule out one row or one column each time
function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (col >= 0 && row <= matrix.length - 1) {
    if (matrix[row][col] === target) return true;
    else if (matrix[row][col] > target) col--;
    else if (matrix[row][col] < target) row++;
  }

  return false;
}
