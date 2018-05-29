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
// base question: 46. Permutations
function subsets(nums) {
  let res = [];

  function search(curr, remaining, start) {
    res.push(curr);

    for (let i = start; i < remaining.length; i++) {
      search(
        [...curr, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)],
        start
      );

      start++;
    }
  }

  search([], nums, 0);

  return res;
}
