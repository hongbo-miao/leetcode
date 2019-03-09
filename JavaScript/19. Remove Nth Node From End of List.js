// Given a linked list, remove the n-th node from the end of list and return its head.
//
// Example:
// Given linked list: 1->2->3->4->5, and n = 2.
// After removing the second node from the end, the linked list becomes 1->2->3->5.
//
// Note:
// Given n will always be valid.
//
// Follow up:
// Could you do this in one pass?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

/** Two pointers slow and fast */
// time O(n)
// space O(1)
function removeNthFromEnd(head, n) {
  let preHead = new ListNode(null);  // for removing the only 1 node in list case
  preHead.next = head;

  let slow = preHead;
  let fast = head;

  while (n--) {
    fast = fast.next;
  }

  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;

  return preHead.next;
}
