// Given a linked list, determine if it has a cycle in it.
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
 * @return {boolean}
 */

/** Two pointers slow and fast */
function hasCycle1(head) {
  if (!head) return false;

  let slow = head;
  let fast = head.next;

  while (fast) {
    if (!fast.next) return false;
    if (slow === fast) return true;

    slow = slow.next;
    fast = fast.next.next;
  }

  return false;
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (!fast) return false;
    if (fast === slow) return true;
  }

  return false
}
