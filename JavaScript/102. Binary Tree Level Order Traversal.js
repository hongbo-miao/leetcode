// Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
//
// For example:
// Given binary tree [3,9,20,null,null,15,7],
//    3
//   / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

/** DFS - preorder traversal */
// Similar
// 103. Binary Tree Zigzag Level Order Traversal
//
// Time O(n)
// Space O(n)
function levelOrder(root) {
  const res = [];

  function go(node, lvl) {
    if (!node) return;

    if (res.length === lvl) res.push([]);
    res[lvl].push(node.val);

    go(node.left, lvl + 1);
    go(node.right, lvl + 1);
  }

  go(root, 0);
  return res;
}
