// Given an array A of positive integers, A[i] represents the value of the i-th sightseeing spot, and two sightseeing spots i and j have distance j - i between them.
// The score of a pair (i < j) of sightseeing spots is (A[i] + A[j] + i - j) : the sum of the values of the sightseeing spots, minus the distance between them.
// Return the maximum score of a pair of sightseeing spots.
//
// Example 1:
//
// Input: [8,1,5,2,6]
// Output: 11
// Explanation: i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11
//
// Note:
//
// 2 <= A.length <= 50000
// 1 <= A[i] <= 1000

/**
 * @param {number[]} A
 * @return {number}
 */

/** 1) */
// https://leetcode.com/problems/best-sightseeing-pair/discuss/260850/JavaC%2B%2BPython-One-Pass
function maxScoreSightseeingPair1(A) {
  let max = 0;
  let cur = 0;
  for (const a of A) {
    max = Math.max(max, cur + a);
    cur = Math.max(cur, a) - 1;
  }
  return max;
}

/** 2) Similar to 1), but easier to understand */
// We want to get the max value of (A[i] + i) + (A[j] - j), where i < j, so we need to keep record of the previous
// best index which can make the max A[i] + i.
function maxScoreSightseeingPair(A) {
  let max = A[0];
  let i = 0; // prev best index
  for (let j = 1; j < A.length; j++) {
    max = Math.max(max, A[i] + A[j] + i - j);
    if (A[i] + i < A[j] + j) {
      i = j;
    }
  }
  return max;
}
