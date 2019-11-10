// In a row of dominoes, A[i] and B[i] represent the top and bottom halves of the i-th domino.  (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)
// We may rotate the i-th domino, so that A[i] and B[i] swap values.
// Return the minimum number of rotations so that all the values in A are the same, or all the values in B are the same.
// If it cannot be done, return -1.
//
// Example 1:
//
// Original Configuration of Dominoes
// A: 2 1 2 4 2 2
// B: 5 2 6 2 3 2
//
// Dominoes after rotations
// A: 2 2 2 2 2 2
// B: 5 1 6 4 3 2
//
// Input: A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]
// Output: 2
// Explanation:
// The first figure represents the dominoes as given by A and B: before we do any rotations.
// If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.
//
// Example 2:
//
// Input: A = [3,5,1,2,3], B = [3,6,3,3,4]
// Output: -1
// Explanation:
// In this case, it is not possible to rotate the dominoes to make one row of values equal.
//
// Note:
//
// 1 <= A[i], B[i] <= 6
// 2 <= A.length == B.length <= 20000

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */

// Time O(n)
// Space O(1)
//
// In the rotated result, all values must either be A[0] or B[0].
//
// There are 4 possible cases:
// - make values in A equal to A[0]
// - make values in B equal to A[0]
// - make values in A equal to B[0]
// - make values in B equal to B[0]
//
// For each case we count rotations and we get the min rotations among them.
const minDominoRotations = (A, B) => {
  const count = (target, A, B) => {
    let rotate = 0;
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== target) {
        if (B[i] !== target) return Infinity;
        rotate++;
      }
    }
    return rotate;
  };

  const min = Math.min(
    count(A[0], A, B),
    count(B[0], A, B),
    count(A[0], B, A),
    count(B[0], B, A),
  );
  return min !== Infinity ? min : -1;
};
