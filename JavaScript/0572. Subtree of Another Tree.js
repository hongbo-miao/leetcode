// Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.
//
// Example 1:
// Given tree s:
//
//      3
//     / \
//    4   5
//   / \
//  1   2
// Given tree t:
//    4
//   / \
//  1   2
// Return true, because t has the same structure and node values with a subtree of s.
//
// Example 2:
// Given tree s:
//
//      3
//     / \
//    4   5
//   / \
//  1   2
//     /
//    0
// Given tree t:
//    4
//   / \
//  1   2
// Return false.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */

// 1)
const isSubtree1 = (s, t) => {
  s = JSON.stringify(s);
  t = JSON.stringify(t);
  return s.indexOf(t) !== -1;
};

// 2) DFS
const isSubtree = (s, t) => {
  if (s == null) return false;
  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

const isEqual = (n1, n2) => {
  if (n1 == null || n2 == null) return n1 === n2;
  else if (n1.val !== n2.val) return false;
  else return isEqual(n1.left, n2.left) && isEqual(n1.right, n2.right);
};
