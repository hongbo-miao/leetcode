// Given a binary tree
//
// struct TreeLinkNode {
//   TreeLinkNode *left;
//   TreeLinkNode *right;
//   TreeLinkNode *next;
// }
//
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
//
//   Initially, all next pointers are set to NULL.
//
// Note:
//
//   You may only use constant extra space.
//   Recursive approach is fine, implicit stack space does not count as extra space for this problem.
//   You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
//
// Example:
//
// Given the following perfect binary tree,
//
//     1
//    /  \
//   2    3
//  / \  / \
// 4  5  6  7
//
// After calling your function, the tree should look like:
//
//     1 -> NULL
//    /  \
//   2 -> 3 -> NULL
//  / \  / \
// 4->5->6->7 -> NULL

/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */

// 1)
// Time O(n)
// Space O(1)
const connect1 = (root) => {
  if (root == null || root.left == null) return root;

  root.left.next = root.right; // connect left -> right
  root.right.next = root.next ? root.next.left : null; // connect right -> next's left

  connect(root.left);
  connect(root.right);

  return root;
};

// 2) BFS - level-order traversal
// Similar
// 102. Binary Tree Level Order Traversal
// 116. Populating Next Right Pointers in Each Node
//
// Time O(n)
const connect = (root) => {
  if (root == null) return null;

  let q = [root];

  while (q.length) {
    const nodes = [...q];
    q = [];
    while (nodes.length) {
      const node = nodes.shift();
      node.next = nodes.length ? nodes[0] : null;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return root;
};
