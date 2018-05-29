// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
//
// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:
//
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// But the following [1,2,2,null,3,null,3] is not:
//    1
//   / \
//   2  2
//    \  \
//     3  3
//
// Note:
//   Bonus points if you could solve it both recursively and iteratively.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
  if (!root) return true;

  // BFS recursive
  return isMirror(root.left, root.right);
}

function isMirror(a, b) {
  if(!a && !b) return true;
  if(!a || !b || a.val !== b.val) return false;

  return isMirror(a.left, b.right) && isMirror(a.right, b.left);
}
