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

import mergeTwoLists from './0021. Merge Two Sorted Lists';

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

/** 1）Brute force */
// Time O(n log n) where n is the total number of nodes.
// - Collecting all the values costs O(n) time.
// - A stable sorting algorithm costs O(n log n) time.
// - Iterating for creating the linked list costs O(n) time.
//
// Space O(n)
// - Sorting cost O(n) space (depends on the algorithm you choose).
// - Creating a new linked list costs O(n) space.
//
// Traverse all the linked lists and collect the values of the nodes into an array.
// Sort and iterate over this array to get the proper value of nodes.
// Create a new sorted linked list and extend it with the new nodes.

/** 2）Compare one by one */
// Time O(k * n) where k is the number of linked lists.
// - Almost every selection of node in final linked costs O(k) (k-1 times comparison).
// - There are n nodes in the final linked list.
//
// Space
// - O(n) Creating a new linked list costs O(n) space.
// - O(1) It's not hard to apply in-place method - connect selected nodes instead of creating new nodes to fill the new linked list.
// Compare every k nodes (head of every linked list) and get the node with the smallest value.
// Extend the final sorted linked list with the selected nodes.

/** 3）Priority queue, optimize 2) */
// Time O(n log k) where k is the number of linked lists.
// - The comparison cost will be reduced to O(log k) for every pop and insertion to priority queue. But finding the
//   node with the smallest value just costs O(1) time.
// - There are n nodes in the final linked list.

// Space
// - O(n) Creating a new linked list costs O(n) space.
// - O(k) The code above present applies in-place method which cost O(1) space. And the priority queue (often
// implemented with heaps) costs O(k) space (it's far less than n in most situations).
//
// Almost the same as 2) but optimize the comparison process by priority queue.

/** 4) Merge lists one by one */
// Time O(k * n) where k is the number of linked lists.
// - We can merge two sorted linked list in O(n) time where n is the total number of nodes in two lists.
//
// Space O(1)
// - We can merge two sorted linked list in O(1) space.
const mergeKLists4 = (lists) => {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  const m = lists.length / 2; // no need Math.floor or ~~ because it will be used in slice
  return mergeTwoLists(
    mergeKLists(lists.slice(0, m)),
    mergeKLists(lists.slice(m)),
  );
};

/** 5) Merge with divide and conquer */
// This approach walks alongside the one above but is improved a lot. We don't need to traverse most nodes many
// times repeatedly
// - Pair up k lists and merge each pair.
// - After the first pairing, k lists are merged into k/2 lists with average 2N/k length, then k/4, k/8 and so on.
// - Repeat this procedure until we get the final sorted linked list.
// Thus, we'll traverse almost n nodes per pairing and merging, and repeat this procedure about log k times.
//
// l0 l1 l2 l3 l4 l5
//   l0    l2    l4
//      l0       l4
//           l0
const mergeKLists = (lists) => {
  if (lists.length === 0) return null;

  let interval = 1;
  while (interval < lists.length) {
    for (let i = 0; i < lists.length - interval; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
    interval *= 2
  }
  return lists[0];
};
