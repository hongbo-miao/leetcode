// Reverse a singly linked list.
//
// Example:
//
// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL
//
// Follow up:
//
// A linked list can be reversed either iteratively or recursively. Could you implement both?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val;
 *   this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/** 1) Iteration */
function reverseList1(head) {
  if (head == null) return head;

  let curr = head;
  while (head.next != null) {
    const p = head.next;
    head.next = p.next;
    p.next = curr;
    curr = p;
  }
  return curr;
}

/** 2) Recursion */
// https://leetcode.com/problems/reverse-linked-list/solution/
function reverseList(head) {
  if (!head || !head.next) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}
