// Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.
//
// In Pascal's triangle, each number is the sum of the two numbers directly above it.
//
// Example:
//
// Input: 5
// Output:
//   [
//         [1],
//        [1,1],
//       [1,2,1],
//      [1,3,3,1],
//     [1,4,6,4,1]
//   ]

/**
 * @param {number} numRows
 * @return {number[][]}
 */

// 1) Dynamic programming
// Time O(numRows^2), consider how many overall loop iterations there are. The outer loop obviously runs numRows times, but for each iteration of the outer loop, the inner loop runs rowNum times
//   Therefore, the overall number of triangle updates that occur is 1 + 2 + 3 + ... + numRows, which, according to Gauss' formula, is (1 + numRows) * numRows / 2 -> O(numRows^2)
// Space O(numRows^2), we need to store each number that we update in triangle, so the space requirement is the same as the time complexity
const generate1 = (numRows) => {
  const res = [];
  for (let i = 0; i < numRows; i++) {
    const row = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = res[i - 1][j - 1] + res[i - 1][j]
    }
    res.push(row);
  }
  return res;
};

// 2) Similar to 1
const generate = (numRows) => {
  if (numRows === 0) return [];
  if (numRows === 1) return [[1]];

  const res = [[1], [1, 1]];
  for (let i = 2; i < numRows; i++) {
    const row = [1];
    for (let j = 1; j < i; j++) {
      row[j] = res[i - 1][j - 1] + res[i - 1][j]
    }
    row.push(1);
    res.push(row);
  }
  return res;
};
