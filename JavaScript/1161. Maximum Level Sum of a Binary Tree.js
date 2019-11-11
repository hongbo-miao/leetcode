// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
//
// Return the smallest level X such that the sum of all the values of nodes at level X is maximal.
//
// Example 1:
//
//     1
//    / \
//   7   0
//  /  \
// 7   -8
//
// Input: [1,7,0,7,-8,null,null]
// Output: 2
// Explanation:
// Level 1 sum = 1.
// Level 2 sum = 7 + 0 = 7.
// Level 3 sum = 7 + -8 = -1.
// So we return the level with the maximum sum which is level 2.
//
// Note:
//
// The number of nodes in the given tree is between 1 and 10^4.
// -10^5 <= node.val <= 10^5

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

/** DFS - preorder traversal */
// 102. Binary Tree Level Order Traversal
// 103. Binary Tree Zigzag Level Order Traversal
// 1161. Maximum Level Sum of a Binary Tree
//
// Time O(n), n is the number of total nodes
// space O(n)
const maxLevelSum = (root) => {
  const levels = [];

  const go = (node, lvl) => {
    if (node == null) return;

    if (levels.length === lvl) levels.push(0);
    levels[lvl] += node.val;

    go(node.left, lvl + 1);
    go(node.right, lvl + 1);
  };

  go(root, 0);
  return levels.indexOf(Math.max(...levels)) + 1;
};
