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

function go(node, l, res) {  // l means level
  if (!node) return;

  if (res[l] == null) {
    res.push([]);
  }

  if (l % 2 === 0) {
    res[l].push(node.val);
  } else {
    res[l].unshift(node.val);
  }

  go(node.left, l + 1, res);
  go(node.right, l + 1, res);
}
