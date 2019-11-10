// In a row of trees, the i-th tree produces fruit with type tree[i].
// You start at any tree of your choice, then repeatedly perform the following steps:
//
// 1. Add one piece of fruit from this tree to your baskets. If you cannot, stop.
// 2. Move to the next tree to the right of the current tree. If there is no tree to the right, stop.
//
// Note that you do not have any choice after the initial choice of starting tree: you must perform step 1, then step 2, then back to step 1, then step 2, and so on until you stop.
// You have two baskets, and each basket can carry any quantity of fruit, but you want each basket to only carry one type of fruit each.
// What is the total amount of fruit you can collect with this procedure?
//
// Example 1:
//
// Input: [1,2,1]
// Output: 3
// Explanation: We can collect [1,2,1].
//
// Example 2:
//
// Input: [0,1,2,2]
// Output: 3
// Explanation: We can collect [1,2,2].
// If we started at the first tree, we would only collect [0, 1].
//
// Example 3:
//
// Input: [1,2,3,2,2]
// Output: 4
// Explanation: We can collect [2,3,2,2].
// If we started at the first tree, we would only collect [1, 2].
//
// Example 4:
//
// Input: [3,3,3,1,2,1,1,2,3,3,4]
// Output: 5
// Explanation: We can collect [1,2,1,1,2].
// If we started at the first tree or the eighth tree, we would only collect 4 fruits.
//
// Note:
//
// 1 <= tree.length <= 40000
// 0 <= tree[i] < tree.length

/**
 * @param {number[]} tree
 * @return {number}
 */

/** Sliding Window + Hash Map */
// Similar
// 3. Longest Substring Without Repeating Characters
// 904. Fruit Into Baskets
// 992. Subarrays with K Different Integers
//
// https://www.youtube.com/watch?v=wy5nQ75WBJI
//
// Time O(n), where n is the length of tree
// Space O(n)
const totalFruit = (tree) => {
  const count = new Map();
  let max = 0;
  let l = 0;
  for (let r = 0; r < tree.length; r++) {
    if (!count.has(tree[r])) count.set(tree[r], 0);
    count.set(tree[r], count.get(tree[r]) + 1);

    while (count.size > 2) {
      count.set(tree[l], count.get(tree[l]) - 1);
      if (count.get(tree[l]) === 0) count.delete(tree[l]);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
};
