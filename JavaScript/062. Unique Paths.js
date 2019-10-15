// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
//
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
//
// How many possible unique paths are there?
//
// Note: m and n will be at most 100.
//
// Example 1:
//
// Input: m = 3, n = 2
// Output: 3
// Explanation:
// From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right
//
// Example 2:
//
// Input: m = 7, n = 3
// Output: 28

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

/** 1) Dynamic programming */
// Time O(mn)
// Space O(n)
//
// Example
// 1   1  (1)  1  1  1  (init current row to 1)
// 1  (2) (3)  4  5  6  (e.g. 3 = 1 + 2)
// 1   3   6  10 15 21  (return the last number in the last row which is 21)
function uniquePaths1(m, n) {
  const row = Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      row[j] += row[j - 1];
    }
  }

  return row[n - 1];
}

/** 2) */
// Time O(mn)
// Space O(mn)
function uniquePaths(m, n) {
  // init first row and col to 1, and the rest to 0
  const matrix = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) row.push(1);
      else row.push(0);
    }
    matrix.push(row);
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      matrix[i][j] = matrix[i - 1][j] + matrix[i][j - 1];
    }
  }
  return matrix[m - 1][n - 1];
}
