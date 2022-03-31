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

// 1) Recursion
// Time O(n), the time complexity is O(n) because the recursive function is T(n) = 2 * T(n / 2) + 1
// Space O(log n), n is number of nodes. The worst case space is O(n)
const inorderTraversal1 = (root) => {
  const res = [];

  const go = (node) => {
    if (node == null) return;

    go(node.left, res);
    res.push(node.val);
    go(node.right, res);
  };

  go(root);
  return res;
};

// 2) Iteration using stack
// Time O(n)
// Space O(n)
const inorderTraversal = (root) => {
  const st = [];
  const res = [];

  while (root != null || st.length > 0) {
    // drill left
    while (root) {
      st.push(root);
      root = root.left;
    }

    // print & go to right child
    root = st.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};
