// Given a binary tree, return the postorder traversal of its nodes' res.
//
// Example:
//
// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3
//
// Output: [3,2,1]
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
function postorderTraversal1(node) {
  let res = [];
  go(node, res);
  return res;
}

function go(node, res) {
  if (!node) return;

  go(node.left, res);
  go(node.right, res);
  res.push(node.val);
}

/** 2) Iteration using stack */
function postorderTraversal(node) {
  let stack = [];
  let res = [];

  if (node) stack.push(node);

  while (stack.length) {
    node = stack.pop();

    res.unshift(node.val);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return res;
}

/**
 * Level Order Traversal / BFS
 * Iteration using queue
 */
function levelOrderTraversal(node) {
  let queue = [];
  let res = [];

  if (node) queue.push(node);

  while (queue.length) {
    node = queue.shift();

    res.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return res;
}
