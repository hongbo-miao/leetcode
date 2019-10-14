// Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
//
// Calling next() will return the next smallest number in the BST.
// Note: next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.

/**
 * Definition for binary tree
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

class BSTIterator {
  /**
   * @constructor
   * @param {TreeNode} root - root of the binary search tree
   */
  constructor(root) {
    this.st = [];
    this.pushLeft(root);
  }

  /**
   * @this BSTIterator
   * @returns {boolean} - whether we have a next smallest number
   */
  hasNext() {
    return this.st.length > 0;
  }

  /**
   * @this BSTIterator
   * @returns {number} - the next smallest number
   */
  next() {
    if (this.hasNext()) {
      const node = this.st.pop();

      if (node.right) this.pushLeft(node.right);
      return node.val;
    }
  }

  pushLeft(node) {
    while (node) {
      this.st.push(node);
      node = node.left;
    }
  };
}
