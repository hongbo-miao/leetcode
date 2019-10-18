// Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.
//
// You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.
//
// Example:
// Given 1->2->3->4->5->NULL,
// return 1->3->5->2->4->NULL.
//
// Note:
// The relative order inside both the even and odd groups should remain as it was in the input.
// The first node is considered odd, the second node even and so on ...

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

// Time O(n)
// Space O(1)
//
//                odd
// Step 0  head -> 1 -> 2 -> 3 -> 4 -> 5 -> null
//                     even
//
//          evenHead -> 2
//
//
//                     odd
// Step 1  head -> 1 -> 3 -> 4 -> 5 -> null
//                          even
//
//          evenHead -> 2 -> 4
//
//
//                          odd
// Step 2  head -> 1 -> 3 -> 5 -> null
//                                even
//
//          evenHead -> 2 -> 4 -> null
//
//
//                          odd
//  Final  head -> 1 -> 3 -> 5 -> 2 -> 4 -> null
//                             evenHead     even
//
function oddEvenList1(head) {
  if (head == null) return null;

  let odd = head;
  const evenHead = head.next;

  while (odd.next && odd.next.next) {
    const even = odd.next;
    odd.next = odd.next.next;
    odd = odd.next;
    even.next = odd.next;
  }

  odd.next = evenHead;
  return head;
}
