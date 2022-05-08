// Given a linked list, return the node where the cycle begins. If there is no cycle, return null.
//
// Note: Do not modify the linked list.
//
// Follow up:
// Can you solve it without using extra space?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 1) Hashset
// Time O(n)
// Space O(n)
const detectCycle1 = (head) => {
  const visited = new Set();

  let node = head;
  while (node != null) {
    if (visited.has(node)) return node;
    visited.add(node);
    node = node.next;
  }

  return null;
};

// 2) Floyd's Tortoise and Hare
// Time O(n)
// Space O(1)
const detectCycle = (head) => {
  if (head == null) return null;

  const getIntersect = (head) => {
    let slow = head;
    let fast = head;

    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return fast;
    }
    return null;
  };

  const intersect = getIntersect(head);
  if (intersect == null) return null;

  let slow = head;
  let fast = intersect;

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};
