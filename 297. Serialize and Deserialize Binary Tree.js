// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
//
// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
//
// Example:
//
// You may serialize the following tree:
//
//     1
//    / \
//   2   3
//      / \
//     4   5
//
// as "[1,2,3,null,null,4,5]"
//
// Clarification: Just the same as how LeetCode OJ serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
//
// Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(node) {
  let q = [];
  let res = [];

  if (node) q.push(node);

  while (q.length) {
    node = q.shift();

    if (node) {
      res.push(node.val);

      q.push(node.left || null);
      q.push(node.right || null);
    } else {
      res.push(null);
    }
  }

  return JSON.stringify(res);
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
  const arr = JSON.parse(data);
  if (!arr.length) return null;

  const root = new TreeNode(arr.shift());
  const q = [root];

  while (q.length) {
    const node = q.shift();

    let val = arr.shift();
    node.left = val !== null ? new TreeNode(val) : null;

    val = arr.shift();
    node.right = val !== null ? new TreeNode(val) : null;

    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }

  return root;
}
