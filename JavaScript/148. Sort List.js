// Sort a linked list in O(n log n) time using constant space complexity.
//
// Example 1:
//
// Input: 4->2->1->3
// Output: 1->2->3->4
//
// Example 2:
//
// Input: -1->5->3->4->0
// Output: -1->0->3->4->5

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

/** Merge sort */
// Time O(n log n)
// Space O(n)
function sortList(head) {
  if (!head || !head.next) return head;

  const { left, right } = split(head);

  const l1 = sortList(left);
  const l2 = sortList(right);

  return merge(l1, l2);
}

function split(head) {
  let preSlow;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    preSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  preSlow.next = null;

  return { left: head, right: slow };
}

function merge(l1, l2) {
  const preHead = new ListNode(null);
  let p = preHead;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }

    p = p.next;
  }

  p.next = l1 || l2;

  return preHead.next;
}
