// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
//
// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:
//
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
//
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

/** Recursion */
// Time O(n). Since traversing the entire input tree once, the total run time is O(n)
// Space O(n). The number of recursive calls is bound by the height of the tree. In the worst case, the tree is linear and the height is in O(n)
function isSymmetric(root) {
  if (!root) return true;
  return isMirror(root.left, root.right);
}

function isMirror(a, b) {
  if(!a && !b) return true;
  if(!a || !b || a.val !== b.val) return false;

  return isMirror(a.left, b.right) && isMirror(a.right, b.left);
}
