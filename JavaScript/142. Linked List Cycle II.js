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

/** Cycle detection - Floyd's Tortoise and Hare */
// Time O(n)
// Space O(1)
function detectCycle(head) {
  if (!head || !head.next || !head.next.next) return null;

  let slow = head.next;
  let fast = head.next.next;

  while (slow !== fast) {
    slow = slow.next;
    if (!fast.next || !fast.next.next) return null;
    fast = fast.next.next;
  }

  slow = head;

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}
