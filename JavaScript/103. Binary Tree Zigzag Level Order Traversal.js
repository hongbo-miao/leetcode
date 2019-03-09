// Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).
//
// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
//
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

/** DFS - preorder traversal */
// Similar
// 102. Binary Tree Level Order Traversal
function zigzagLevelOrder(root) {
  let res = [];
  go(root, 0, res);
  return res;
}

function go(node, level, res) {
  if (!node) return;

  if (res.length === level) res.push([]);
  level % 2 ? res[level].push(node.val) : res[level].unshift(node.val);

  go(node.left, level + 1, res);
  go(node.right, level + 1, res);
}
