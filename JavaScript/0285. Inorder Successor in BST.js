// Given a binary search tree and a node in it, find the in-order successor of that node in the BST.
//
// The successor of a node p is the node with the smallest key greater than p.val.
//
// Example 1:
//
//   2
//  / \
// 1   3
//
// Input: root = [2,1,3], p = 1
// Output: 2
// Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.
//
// Example 2:
//
//       5
//      / \
//     3   6
//    / \
//   2   4
//  /
// 1
//
// Input: root = [5,3,6,2,4,null,null,1], p = 6
// Output: null
// Explanation: There is no in-order successor of the current node, so the answer is null.
//
// Note:
//
// If the given node has no in-order successor in the tree, return null.
// It's guaranteed that the values of the tree are unique.
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */

// 1)
// Time O(n)
// Space O(n)
const inorderSuccessor1 = (root, p) => {
  let arr = [];

  const go = (node) => {
    if (node == null) return;
    go(node.left);
    arr.push(node);
    go(node.right);
  };

  go(root);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === p && i + 1 < arr.length) {
      return arr[i + 1];
    }
  }

  return null;
};

// 2) Recursion
// Check the link, it also has a similar predecessor solution
// https://leetcode.com/problems/inorder-successor-in-bst/discuss/72653/Share-my-Java-recursive-solution
const inorderSuccessor2 = (root, p) => {
  if (root == null) return null;

  if (root.val <= p.val) {
    return inorderSuccessor(root.right, p);
  } else {
    const left = inorderSuccessor(root.left, p);
    return left != null ? left : root;
  }
};

// 3)
// Time O(h), h is the depth of the result node. In a balanced BST O(h) = O(log n). In the worst case, O(h) = O(n)
// Space O(1)1b
const inorderSuccessor = (root, p) => {
  let succ = null;
  while (root != null) {
    if (p.val < root.val) {
      succ = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }
  return succ;
};
