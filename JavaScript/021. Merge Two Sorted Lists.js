// Merge two sorted linked lists and return it as l1 new list. The new list should be made by splicing together the nodes of the first two lists.
//
// Example:
//
// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

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

/** 1) Iteration */
// Time O(n + m)
// Space O(1)
function mergeTwoLists1(l1, l2) {
  let l = new ListNode(null);
  const preHead = l;

  while (l1 != null && l2 != null) {
    if (l1.val < l2.val) {
      l.next = l1;
      l1 = l1.next;
    } else {
      l.next = l2;
      l2 = l2.next;
    }

    l = l.next;
  }

  l.next = l1 || l2;

  return preHead.next;
}

/** 2) Recursion */
// Time O(n + m)
// Space O(n + m). The first call to mergeTwoLists does not return until the ends of both l1 and l2 have been reached,
//   so n + mn+m stack frames consume O(n + m) space.
export function mergeTwoLists(l1, l2) {
  if (l1 == null || l2 == null) return l1 || l2;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
