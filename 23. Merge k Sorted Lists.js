// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
//
// Example:
//
// Input:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// Output: 1->1->2->3->4->4->5->6

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

import { mergeTwoLists } from './';

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
  if (lists.length === 0) return lists;
  if (lists.length === 1) return lists[0];
  if (lists.length === 2) return mergeTwoLists(lists[0], lists[1]);

  const mid = Math.ceil(lists.length / 2);

  return mergeTwoLists(
    mergeKLists(lists.slice(0, mid)),
    mergeKLists(lists.slice(mid))
  );
}
