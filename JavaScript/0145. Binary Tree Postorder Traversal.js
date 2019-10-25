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
  const res = [];
  go(node, res);
  return res;
}

function go(node, res) {
  if (node == null) return;
  go(node.left, res);
  go(node.right, res);
  res.push(node.val);
}

/** 2) Iteration using stack */
function postorderTraversal(node) {
  const st = [];
  const res = [];

  if (node) st.push(node);

  while (st.length) {
    node = st.pop();
    res.unshift(node.val);
    if (node.left) st.push(node.left);
    if (node.right) st.push(node.right);
  }

  return res;
}

/**
 * Level Order Traversal / BFS
 * Iteration using queue
 */
function levelOrderTraversal(node) {
  const q = [];
  const res = [];

  if (node) q.push(node);

  while (q.length) {
    node = q.shift();
    res.push(node.val);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }

  return res;
}
