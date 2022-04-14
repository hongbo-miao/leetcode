// Given a binary tree, find its maximum depth.
//
// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
//
// Note: A leaf is a node with no children.
//
// Example:
//
// Given binary tree [3,9,20,null,null,15,7],
//
//     3
//    / \
//   9   20
//      /  \
//     15   7
// return its depth = 3.

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

// 1) DFS (top-down)
const maxDepth1 = (root) => {
  let max = 0;

  const go = (node, depth) => {
    if (node == null) return;
    max = Math.max(max, depth);
    go(node.left, depth + 1);
    go(node.right, depth + 1);
  };

  go(root, max + 1);
  return max;
};

// 2) DFS (bottom-up)
const maxDepth = (root) => {
  if (root == null) return 0;
  const l = maxDepth(root.left);
  const r = maxDepth(root.right);
  return Math.max(l, r) + 1;
};
