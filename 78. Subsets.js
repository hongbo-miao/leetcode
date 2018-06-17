// Given a set of distinct integers, nums, return all possible subsets (the power set).
//
// Note: The solution set must not contain duplicate subsets.
//
// Example:
//
// Input: nums = [1,2,3]
// Output:
//   [
//     [3],
//     [1],
//     [2],
//     [1,2,3],
//     [1,3],
//     [2,3],
//     [1,2],
//     []
//   ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/** Backtracking */
// Similar to 46. Permutations
function subsets(nums) {
  let res = [];

  function find(curr, rest, start) {
    res.push(curr);

    for (let i = start; i < rest.length; i++) {
      find(
        [...curr, rest[i]],
        [...rest.slice(0, i), ...rest.slice(i + 1)],
        start
      );

      start++;
    }
  }

  find([], nums, 0);

  return res;
}
