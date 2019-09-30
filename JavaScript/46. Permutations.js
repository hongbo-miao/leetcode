// Given a collection of distinct integers, return all possible permutations.
//
// Example:
//
// Input: [1,2,3]
// Output:
//   [
//     [1,2,3],
//     [1,3,2],
//     [2,1,3],
//     [2,3,1],
//     [3,1,2],
//     [3,2,1]
//   ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/** Backtracking */
// Similar
// 78. Subsets
function permute(nums) {
  let res = [];

  function go(curr, rest) {
    if (!rest.length) {
      res.push(curr);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      go(
        [...curr, rest[i]],
        [...rest.slice(0, i), ...rest.slice(i + 1)],  // note if using splice here, it will cause mutation
      );
    }
  }

  go([], nums);
  return res;
}
