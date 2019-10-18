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

/** 1) Backtracking */
// Similar
// 46. Permutations
function subsets1(nums) {
  const res = [];

  function go(curr, rest, start) {
    res.push(curr);

    for (let i = start; i < rest.length; i++) {
      go(
        [...curr, rest[i]],
        [...rest.slice(0, i), ...rest.slice(i + 1)],
        start,
      );

      start++;
    }
  }

  go([], nums, 0);
  return res;
}

/** 2) Similar to 1) */
function subsets(nums) {
  const res = [];

  function go(curr, rest, l) {
    if (l === curr.length) {
      res.push(curr);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      go(
        [...curr, rest[i]],
        [...rest.slice(i + 1)],
        l,
      );
    }
  }

  for (let i = 0; i <= nums.length; i++) {
    go([], nums, i);
  }

  return res;
}
