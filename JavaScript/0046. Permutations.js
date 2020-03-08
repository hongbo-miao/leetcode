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
//
// Time O(∑(k = 1 to N) P(N, k)) where P(N, k) = N! / (N - k)! = N (N - 1) ... (N - k + 1) is so-called
//   k-permutations_of_n, or partial permutation.
//   Let's do a rough estimation of the result: N! <= ∑(k = 1 to N) (N! / (N - k)!) = ∑(k = 1 to N) P(N, k) <= N * N!,
//   i.e. the algorithm performs better than O(N * N!) and a bit slower than N!.
// Space O(N!) since one has to keep N! solutions.
const permute = (nums) => {
  const res = [];

  const go = (cur, rest) => {
    if (rest.length === 0) {
      res.push(cur);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      // note if using array push and splice here, it will cause mutation
      go(
        [...cur, rest[i]],
        [...rest.slice(0, i), ...rest.slice(i + 1)],
      );
    }
  };

  go([], nums);
  return res;
};
