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
// function permute(nums) {
//   if (nums.length === 1) return [nums];
//
//   let res = [];
//
//   nums.forEach(num =>
//     permute(nums.filter(n => n !== num))
//       .forEach(arr => res.push([...arr, num]))
//   );
//
//   return res;
// }

// backtracking
function permute(nums) {
  let res = [];

  function find(curr, remaining) {
    if (!remaining.length) {
      res.push(curr);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      find(
        [...curr, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      );
    }
  }

  find([], nums);

  return res;
}
