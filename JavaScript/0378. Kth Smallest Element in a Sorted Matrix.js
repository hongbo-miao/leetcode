// Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.
// Note that it is the kth smallest element in the sorted order, not the kth distinct element.
//
// Example:
//
// matrix = [
//    [ 1,  5,  9],
//    [10, 11, 13],
//    [12, 13, 15]
// ],
// k = 8,
//
// return 13.
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ n^2.

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const kthSmallest = (matrix, k) => {
  if (matrix == null || matrix.length === 0) return -1;
  const len = matrix.length;

  const countLessEqual = (m) => {
    let count = 0;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (matrix[i][j] > m) break;
        count++;
      }
    }
    return count;
  };

  let l = matrix[0][0];
  let r = matrix[len - 1][len - 1] + 1; // + 1 to include last number
  while (l < r) {
    const m = Math.floor((l + r) / 2); // Since negative number exists, cannot use ~~
    const count = countLessEqual(m);
    if (count < k) l = m + 1;
    else r = m;
  }
  return l
};
