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

// Dynamic programming
// yime complexity O(m * n)
// Space complexity O(n)

// 1   1  (1)  1  1  1  (initialize to 1)
// 1  (2) (3)  4  5  6  (2 + 1 = 3)
// 1   3   6  10 15 21  (return last one 21)
function uniquePaths(m, n) {
  let currentRow = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      currentRow[j] += currentRow[j - 1];
    }
  }

  return currentRow[n - 1];
}
