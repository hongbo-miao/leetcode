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

// 1) Brute force
// Time O(mn)
// Space O(1)
const searchMatrix1 = (matrix, target) => {
  if (matrix == null || matrix.length === 0) return false;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === target) return true;
    }
  }
  return false;
};

// 2) Recursion
const searchMatrix2 = (matrix, target) => {
  if (matrix == null || matrix.length === 0) return false;
  const h = matrix.length;
  const w = matrix[0].length;

  const go = (i, j) => {
    if (
      i >= h
      || j >= w
      || matrix[i][j] > target
      || matrix[i][j] === '*'
    ) return false;

    if (matrix[i][j] === target) return true;

    matrix[i][j] = '*'; // mark visited
    return go(i + 1, j) || go(i, j + 1);
  };

  return go(0, 0)
};

// 3) Binary Search
// https://leetcode.com/problems/search-a-2d-matrix-ii/solution/

// 4) Search from top right corner
// Similar
// 74. Search a 2D Matrix
//
// Time O(m + n), rule out one row or one column each time
// Space O(1)
//
// Idea
//
// Like tree: https://leetcode.com/problems/search-a-2d-matrix-ii/discuss/66140/My-concise-O(m+n)-Java-solution/68155
// We start search the matrix from top right corner, # initialize the current position to top right corner.
// - If the target is greater than the value in current position,
//   then the target can not be in entire row of current position because the row is sorted.
// - If the target is less than the value in current position,
//   then the target can not in the entire column because the column is sorted too.
// We can rule out one row or one column each time, so the time complexity is O(m + n).
const searchMatrix = (matrix, target) => {
  if (matrix == null || matrix.length === 0) return false;
  const h = matrix.length;
  const w = matrix[0].length;

  let i = 0;
  let j = w - 1;
  while (j >= 0 && i < h) {
    if (matrix[i][j] === target) return true;
    else if (matrix[i][j] < target) i++;
    else j--;
  }
  return false;
};
