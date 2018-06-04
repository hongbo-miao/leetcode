// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.
//
// Return a deep copy of the list.

/**
 * Definition for singly-linked list with a random pointer.
 * function RandomListNode(label) {
 *     this.label = label;
 *     this.next = this.random = null;
 * }
 */

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
function copyRandomList(head) {
  return copy(head, {});
}

function copy(node, map)   {
  if (!node) return node;

  if (map[node.label]) return map[node.label];

  let newNode = new RandomListNode(node.label);
  map[node.label] = newNode;

  newNode.next = copy(node.next, map);
  newNode.random = copy(node.random, map);

  return newNode;
}
