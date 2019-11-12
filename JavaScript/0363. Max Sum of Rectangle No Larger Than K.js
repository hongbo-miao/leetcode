// Given a non-empty 2D matrix matrix and an integer k, find the max preSum of a rectangle in the matrix such that its preSum is no larger than k.
//
// Example:
//
// Input: matrix = [[1,0,1],[0,-2,3]], k = 2
// Output: 2
// Explanation: Because the preSum of rectangle [[0, 1], [-2, 3]] is 2,
//              and 2 is the max number no larger than k (k = 2).
// Note:
//
// The rectangle inside the matrix must have an area > 0.
// What if the number of rows is much larger than the number of columns?

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

// https://www.youtube.com/watch?v=RZVPX3elY9I
const maxSumSubmatrix = (matrix, k) => {
  const h = matrix.length;
  const w = matrix[0].length;
  let max = -Infinity;
  for (let l = 0; l < w; l++) {
    const sums = new Array(h).fill(0);
    for (let r = l; r < w; r++) {
      for (let i = 0; i < h; i++) {
        sums[i] += matrix[i][r];
      }
      max = Math.max(max, findMax(sums, k));
    }
  }
  return max;
};

const findMax = (sums, k) => {
  const preSums = [0];
  let preSum = 0;
  let max = -Infinity;
  for (const sum of sums) {
    preSum += sum;
    // preSums[r] - preSums[l] <= k
    // preSum - preSums[l] <= k
    // preSum - k <= preSums[l]
    const l = lowerBound(preSums, preSum - k);
    if (l < preSums.length) { // preSum - k <= one of preSums
      max = Math.max(max, preSum - preSums[l]);
    }

    // Insert new preSum
    const i = lowerBound(preSums, preSum);
    preSums.splice(i, 0, preSum);
  }
  return max;
};

const lowerBound = (arr, target) => {
  let l = 0;
  let r = arr.length;
  while (l < r) {
    const m = ~~((l + r) / 2);
    if (arr[m] < target) l = m + 1;
    else r = m;
  }
  return l;
};
