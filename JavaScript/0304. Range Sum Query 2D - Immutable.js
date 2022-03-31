// Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
//
// Example:
//   Given matrix = [
//   [3, 0, 1, 4, 2],
//   [5, 6, 3, 2, 1],
//   [1, 2, 0, 1, 5],
//   [4, 1, 0, 1, 7],
//   [1, 0, 3, 0, 5]
// ]
//
// sumRegion(2, 1, 4, 3) -> 8
// sumRegion(1, 1, 2, 2) -> 11
// sumRegion(1, 2, 2, 4) -> 12
//
// Note:
//   You may assume that the matrix does not change.
//   There are many calls to sumRegion function.
//   You may assume that row1 ≤ row2 and col1 ≤ col2.

// 1) Brute force
// Time O(mn) time per query. Assume that mm and nn represents the number of rows and columns respectively, each
//   sumRegion query can go through at most m * n elements.
//
// Space O(1). Note that data is a reference to matrix and is not a copy of it.
class NumMatrix {
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    this.matrix = matrix;
  }

  /**
   * @param {number} row1
   * @param {number} col1
   * @param {number} row2
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1, col1, row2, col2) {
    let sum = 0;

    for (let i = row1; i <= row2; i++) {
      for (let j = col1; j <= col2; j++) {
        sum += this.matrix[i][j];
      }
    }

    return sum;
  }
}

// 2) Caching
// https://leetcode.com/problems/range-sum-query-2d-immutable/discuss/75350/Clean-C%2B%2B-Solution-and-Explaination-O(mn)-space-with-O(1)-time
//
// sums[i+1][j+1] represents the sum of area from matrix[0][0] to matrix[i][j]
//
// To calculate sums, the ideas as below
//
// +-----+-+-------+     +--------+-----+     +-----+---------+     +-----+--------+
// |     | |       |     |        |     |     |     |         |     |     |        |
// |     | |       |     |        |     |     |     |         |     |     |        |
// +-----+-+       |     +--------+     |     |     |         |     +-----+        |
// |     | |       |  =  |              |  +  |     |         |  -  |              |
// +-----+-+       |     |              |     +-----+         |     |              |
// |               |     |              |     |               |     |              |
// |               |     |              |     |               |     |              |
// +---------------+     +--------------+     +---------------+     +--------------+
//
//    sums[i][j]      =    sums[i-1][j]    +     sums[i][j-1]    -   sums[i-1][j-1]   +
//
//                         matrix[i-1][j-1]
// So, we use the same idea to find the specific area's sum.
//
// +---------------+   +--------------+   +---------------+   +--------------+   +--------------+
// |               |   |         |    |   |   |           |   |         |    |   |   |          |
// |   (r1,c1)     |   |         |    |   |   |           |   |         |    |   |   |          |
// |   +------+    |   |         |    |   |   |           |   +---------+    |   +---+          |
// |   |      |    | = |         |    | - |   |           | - |      (r1,c2) | + |   (r1,c1)    |
// |   |      |    |   |         |    |   |   |           |   |              |   |              |
// |   +------+    |   +---------+    |   +---+           |   |              |   |              |
// |        (r2,c2)|   |       (r2,c2)|   |   (r2,c1)     |   |              |   |              |
// +---------------+   +--------------+   +---------------+   +--------------+   +--------------+
class NumMatrix {
  constructor(matrix) {
    if (matrix == null || matrix.length === 0 || matrix[0].length === 0) return;

    const h = matrix.length;
    const w = matrix[0].length;

    const dp = [];
    for (let i = 0; i <= h; i++) {
      const r = [];
      for (let j = 0; j <= w; j++) r.push(null);
      dp.push(r);
    }

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        dp[i + 1][j + 1] = dp[i + 1][j] + dp[i][j + 1] + matrix[i][j] - dp[i][j];
      }
    }

    this.dp = dp;
  }


  sumRegion(row1, col1, row2, col2) {
    return this.dp[row2 + 1][col2 + 1]
      - this.dp[row1][col2 + 1]
      - this.dp[row2 + 1][col1]
      + this.dp[row1][col1];
  }
}
