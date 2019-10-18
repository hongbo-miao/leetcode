// Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ BST's total elements.
//
// Example 1:
//
// Input: root = [3,1,4,null,2], k = 1
// Output: 1
//
// Example 2:
//
// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3
//
// Follow up:
// What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
/** 1) In-order traversal, DFS */
function kthSmallest1(root, k) {
  function go(node) {
    if (node == null) return [];

    return [
      ...go(node.left),
      node.val,
      ...go(node.right)
    ];
  }

  return go(root)[k - 1];
}

/** 2) Similar to 1 */
function kthSmallest(root, k) {
  const arr = [];

  function go(node) {
    if (node == null) return;

    go(node.left);
    arr.push(node.val);
    go(node.right);
  }

  go(root, k);
  return arr[k - 1];
}
