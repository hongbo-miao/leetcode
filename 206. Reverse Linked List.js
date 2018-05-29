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
// iterative
function reverseList1(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// recursive
// https://leetcode.com/problems/reverse-linked-list/solution/
function reverseList(head) {
  if (!head || !head.next) return head;

  let newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}
