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
const preorderTraversal1 = (root) => {
  const res = [];

  const go = (node) => {
    if (node == null) return;
    res.push(node.val);
    go(node.left);
    go(node.right);
  };

  go(root);
  return res;
};

/** 2) Iteration using stack */
const preorderTraversal = (root) => {
  const st = [];
  const res = [];

  while (root || st.length) {
    // print & drill left
    while (root) {
      res.push(root.val);
      st.push(root);
      root = root.left;
    }

    // go to right child
    root = st.pop();
    root = root.right;
  }

  return res;
};
