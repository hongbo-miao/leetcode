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

// 1) Recursion
const postorderTraversal1 = (root) => {
  const res = [];

  const go = (node) => {
    if (node == null) return;
    go(node.left);
    go(node.right);
    res.push(node.val);
  };

  go(root);
  return res;
};

// 2) Iteration using stack
const postorderTraversal2 = (root) => {
  const st = [];
  const res = [];

  if (root != null) st.push(root);

  while (st.length) {
    root = st.pop();
    res.unshift(root.val);
    if (root.left) st.push(root.left);
    if (root.right) st.push(root.right);
  }
  return res;
};
