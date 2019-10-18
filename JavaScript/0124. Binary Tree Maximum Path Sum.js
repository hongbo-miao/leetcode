// Given a non-empty binary tree, find the maximum path sum.
//
// For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.
//
// Example 1:
//
// Input: [1,2,3]
//
//   1
//  / \
// 2   3
//
// Output: 6
//
// Example 2:
//
// Input: [-10,9,20,null,null,15,7]
//
//  -10
//  / \
// 9  20
//   /  \
//  15   7
//
// Output: 42

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

/** Recursion */
// Time O(N) where N is number of nodes, since we visit each node not more than 2 times.
// Space O(log(N)). We have to keep a recursion stack of the size of the tree height, which is O(log(N)) for the binary tree.
function maxPathSum(root) {
  let max = -Infinity;

  function getMaxGain(node) {
    if (node == null) return 0;

    const l = Math.max(0, getMaxGain(node.left));  // left max gain. If < 0, returning 0 means ignoring this branch

    const r = Math.max(0, getMaxGain(node.right));  // right max gain

    max = Math.max(max, node.val + l + r);
    return node.val + Math.max(l, r);
  }

  getMaxGain(root);
  return max;
}
