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
// Time O(n)
// Space O(1)
const removeNthFromEnd = (head, n) => {
  const preHead = new ListNode(null); // for case n = 1, to remove the last node in the list to avoid slow.next is null in slow.next.next
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
};
