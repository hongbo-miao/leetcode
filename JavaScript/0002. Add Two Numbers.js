// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
// Example
//
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/** 1) */
// Time O(n)
// Space O(1)
const addTwoNumbers1 = (l1, l2) => {
  let l = new ListNode(null);
  const preHead = l;
  let carry = 0;

  while (l1 || l2 || carry) {
    let n = 0;

    if (l1) {
      n += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      n += l2.val;
      l2 = l2.next;
    }

    n += carry;
    carry = n > 9 ? 1 : 0;

    l.next = new ListNode(n % 10);
    l = l.next;
  }

  return preHead.next;
};

/** 2) Similar to 1), less compact, but easy to understand carry */
// Time O(n)
// Space O(1)
const addTwoNumbers = (l1, l2) => {
  let l = new ListNode(null);
  const preHead = l;
  let carry = 0;

  while (l1 || l2) {
    let n = 0;

    if (l1) {
      n += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      n += l2.val;
      l2 = l2.next;
    }

    n += carry;
    carry = n > 9 ? 1 : 0;

    l.next = new ListNode(n % 10);
    l = l.next;
  }

  if (carry) {
    l.next = new ListNode(1)
  }

  return preHead.next;
};
