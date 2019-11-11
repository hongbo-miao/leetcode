// Given the root node of a binary search tree (BST) and a value to be inserted into the tree, insert the value into the BST. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.
// Note that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.
//
// For example,
// Given the tree:
//
//         4
//        / \
//       2   7
//      / \
//     1   3
//
// And the value to insert: 5
// You can return this binary search tree:
//
//          4
//        /   \
//       2     7
//      / \   /
//     1   3 5
//
// This tree is also valid:
//
//          5
//        /   \
//       2     7
//      / \
//     1   3
//          \
//           4

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */

/** 1) Recursion */
const insertIntoBST1 = (root, val) => {
  if (root == null) return new TreeNode(val);
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
};

/** 2) Iteration */
const insertIntoBST = (root, val) => {
  let node = root;
  while (node != null) {
    if (val < node.val) {
      // insert right now
      if (node.left == null) {
        node.left = new TreeNode(val);
        return root;
      } else {
        node = node.left;
      }
    } else {
      // insert right now
      if (node.right == null) {
        node.right = new TreeNode(val);
        return root;
      } else {
        node = node.right;
      }
    }
  }
  return new TreeNode(val);
};
