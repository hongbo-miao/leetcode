// Given a binary tree, determine if it is a valid binary search tree (BST).
//
// Assume a BST is defined as follows:
//
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
//
// Example 1:
//
// Input:
//     2
//    / \
//   1   3
// Output: true
//
// Example 2:
//
//     5
//    / \
//   1   4
//      / \
//     3   6SudokuSudoku
// Output: false
// Explanation: The input is: [5,1,4,null,null,3,6]. The root node's value
// is 5 but its right child's value is 4.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

// Recursion
const isValidBST = (root) => {
  const isValid = (node, min, max) => {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
  };
  return isValid(root, -Infinity, Infinity);
};

