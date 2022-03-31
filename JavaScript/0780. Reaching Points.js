// A move consists of taking a point (x, y) and transforming it to either (x, x+y) or (x+y, y).
// Given a starting point (sx, sy) and a target point (tx, ty), return True if and only if a sequence of moves exists to transform the point (sx, sy) to (tx, ty). Otherwise, return False.
//
// Examples:
// Input: sx = 1, sy = 1, tx = 3, ty = 5
// Output: True
// Explanation:
// One series of moves that transforms the starting point to the target is:
// (1, 1) -> (1, 2)
// (1, 2) -> (3, 2)
// (3, 2) -> (3, 5)
//
// Input: sx = 1, sy = 1, tx = 2, ty = 2
// Output: False
//
// Input: sx = 1, sy = 1, tx = 1, ty = 1
// Output: True
//
// Note:
//
// sx, sy, tx, ty will all be integers in the range [1, 10^9].

/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */

// 1) Work Backwards (Naive Variant). Extremely slow.
// Time O(max(tx,ty)). If say ty = 1, we could be subtracting tx times.
// Space O(1)
const reachingPoints1 = (sx, sy, tx, ty) => {
  while (tx >= sx && ty >= sy) {
    if (sx === tx && sy === ty) return true;
    if (tx > ty) tx -= ty;
    else ty -= tx;
  }
  return false;
};

// 2) Work Backwards (Modulo Variant)*/
// https://leetcode.com/problems/reaching-points/discuss/114856/JavaC%2B%2BPython-Modulo-from-the-End
//
// Time O(log(max(tx, ty))). The analysis is similar to the analysis of the Euclidean algorithm, and we assume that the modulo operation can be done in O(1) time.
// Space O(1)
//
// If we start from sx, sy, it will be hard to find tx, ty.
// If we start from tx, ty, we can find only one path to go back to sx, sy.
// If cut down one by one at, it will be time limit exceeded. Remainder helps.
//
// If 2 target points are still bigger than 2 starting point, we reduce target points.
// Check if we reduce target points to (x, y + kx) or (x + ky, y)
const reachingPoints = (sx, sy, tx, ty) => {
  while (sx < tx && sy < ty) {
    if (tx < ty) ty %= tx;
    else tx %= ty;
  }
  return (sx === tx && sy <= ty && (ty - sy) % sx === 0) ||
    (sy === ty && sx <= tx && (tx - sx) % sy === 0);
};
