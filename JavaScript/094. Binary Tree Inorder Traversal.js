// Given a binary tree, return the inorder traversal of its nodes' values.
//
// Example:
//
// Input: [1,null,2,3]
//    1
//     \
//      2
//      /
//     3
//
// Output: [1,3,2]
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
// Time O(n), the time complexity is O(n) because the recursive function is T(n) = 2 * T(n / 2) + 1
// Space O(log n), n is number of nodes. The worst case space is O(n)
function inorderTraversal1(node) {
  let res = [];
  go(node, res);
  return res;
}

function go(node, res) {
  if (!node) return;

  go(node.left, res);
  res.push(node.val);
  go(node.right, res);
}

/** 2) Iteration using stack */
// Time O(n)
// Space O(n)
function inorderTraversal(node) {
  let stack = [];
  let res = [];

  while (node || stack.length) {
    // drill left
    while (node) {
      stack.push(node);
      node = node.left;
    }

    // print & go to right child
    node = stack.pop();
    res.push(node.val);
    node = node.right;
  }

  return res;
}
