// Given the root of a binary tree, each node in the tree has a distinct value.
// After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
// Return the roots of the trees in the remaining forest.  You may return the result in any order.
//
// Example 1:
//
//     1
//    /  \
//   2    3
//  / \   / \
// 4   5 6   7
//
// Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
// Output: [[1,2,null,4],[6],[7]]
//
// Constraints:
//
// The number of nodes in the given tree is at most 1000.
// Each node has a distinct value between 1 and 1000.
// to_delete.length <= 1000
// to_delete contains distinct values between 1 and 1000.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */

// Recursion
// Note it only needs to add each new tree root node to res
// e.g. root = [1, 2, 3, 4, 5, 6, 7], to_delete = [3, 5]
// Only need push 1, 6, 7 to res which will prints [[1, 2, null, 4], [6], [7]]
const delNodes = (root, to_delete) => {
  const set = new Set(to_delete);
  const res = [];

  const go = (node) => {
    if (node == null) return node;
    node.left = go(node.left);
    node.right = go(node.right);

    if (set.has(node.val)) {
      if (node.left) res.push(node.left);
      if (node.right) res.push(node.right);
      return null;
    }
    return node;
  };

  if (!set.has(root.val)) res.push(root);
  go(root);
  return res;
};
