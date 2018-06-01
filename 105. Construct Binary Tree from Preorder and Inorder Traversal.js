// Given preorder and inorder traversal of a tree, construct the binary tree.
//
// Note:
// You may assume that duplicates do not exist in the tree.
//
// For example, given
//
// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]
//
// Return the following binary tree:
//
//     3
//    / \
//   9  20
//     /  \
//    15   7

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  function build(left, right) {
    if (left > right) return null;

    const val = preorder.shift();
    const idx = inorder.indexOf(val);
    const root = new TreeNode(val);

    root.left = build(left, idx - 1);
    root.right = build(idx + 1, right);

    return root;
  }

  return build(0, inorder.length - 1);
}
