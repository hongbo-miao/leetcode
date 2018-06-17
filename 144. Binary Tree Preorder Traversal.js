// Given a binary tree, return the preorder traversal of its nodes' values.
//
// Example:
//
//   Input: [1,null,2,3]
//     1
//      \
//       2
//      /
//     3
//
// Output: [1,2,3]
//
// Follow up: Recursive solution is trivial, could you do it iteratively?

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

/** 1) Recursion */
function preorderTraversal1(node) {
  let res = [];
  go(node, res);
  return res;
}

function go(node, res) {
  if (!node) return;

  res.push(node.val);
  go(node.left, res);
  go(node.right, res);
}

/** 2) Iteration using stack */
function preorderTraversal(node) {
  let stack = [];
  let res = [];

  while (node || stack.length) {
    // print & drill left
    while (node) {
      res.push(node.val);

      stack.push(node);
      node = node.left;
    }

    // go to right child
    node = stack.pop();
    node = node.right;
  }

  return res;
}
