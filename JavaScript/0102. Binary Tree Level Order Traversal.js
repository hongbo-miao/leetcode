p// Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
//
// For example:
// Given binary tree [3,9,20,null,null,15,7],
//    3
//   / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 1) DFS - preorder traversal
// Similar
// 102. Binary Tree Level Order Traversal
// 103. Binary Tree Zigzag Level Order Traversal
// 1161. Maximum Level Sum of a Binary Tree
//
// Time O(n)
// Space O(n)
const levelOrder1 = (root) => {
  const res = [];

  const go = (node, lvl) => {
    if (node == null) return;

    if (res.length === lvl) res.push([]);
    res[lvl].push(node.val);

    go(node.left, lvl + 1);
    go(node.right, lvl + 1);
  };

  go(root, 0);
  return res;
};

// 2) BFS - level-order traversal
// Similar
// 102. Binary Tree Level Order Traversal
// 116. Populating Next Right Pointers in Each Node
const levelOrder = (root) => {
  if (root == null) return [];

  const res = [];

  let q = [root];
  while (q.length) {
    const nodes = [...q];
    q = [];

    const row = [];
    while (nodes.length) {
      const node = nodes.shift();
      row.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(row);
  }
  return res;
};
