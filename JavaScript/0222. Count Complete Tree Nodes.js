// Given a complete binary tree, count the number of nodes.
//
// Note:
//
// Definition of a complete binary tree from Wikipedia: https://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees
// In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.
//
// Example:
//
// Input:
//     1
//    / \
//   2   3
//  / \  /
// 4  5 6
//
// Output: 6

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

/** 1) DFS */
// Time O(n)
// Space O(d) = O(log n) to keep the recursion stack, where d is a tree depth
function countNodes1(root) {
  if (root == null) return 0;
  return countNodes(root.left) + countNodes(root.right) + 1;
}

/** 2) Binary Search */
// Time O(d^2) = O((log n)^2), where d is a tree depth
// Space O(1)
function countNodes(root) {
  // if the tree is empty
  if (root == null) return 0;

  const d = getDepth(root);

  // Last level nodes are enumerated from 0 to 2^d - 1 (left -> right).
  // Perform binary search to check how many nodes exist.
  let l = 0;
  let r = 2 ** d - 1;
  while (l <= r) {
    const m = ~~((l + r) / 2);
    if (exists(m, d, root)) l = m + 1;
    else r = m - 1;
  }

  // The tree contains 2^d - 1 nodes on the first (d - 1) levels
  // and l nodes on the last level.
  return 2 ** d - 1 + l;
}

// Return tree depth in O(d) time.
function getDepth(node) {
  let d = 0;
  while (node.left != null) {
    node = node.left;
    d++;
  }
  return d;
}

// Last level nodes are enumerated from 0 to 2^d - 1 (left -> right).
// Return true if last level node idx exists.
// Binary search with O(d) complexity.
function exists(idx, d, node) {
  let l = 0;
  let r = 2 ** d - 1;
  while (l < r) {
    const m = ~~((l + r) / 2);
    if (idx > m) {
      node = node.right;
      l = m + 1;
    } else {
      node = node.left;
      r = m;
    }
  }
  return node != null;
}
