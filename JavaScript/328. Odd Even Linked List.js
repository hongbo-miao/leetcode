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

/** 1) */
function oddEvenList1(head) {
  if (!head) return head;

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

/** 2) Similar to 1), but less compact */
function oddEvenList(head) {
  if (!head) return head;

  let odd = head;
  let even = new ListNode(null);
  const evenHead = head.next;

  while (odd && odd.next) {
    even.next = odd.next;
    odd.next = odd.next.next;

    even = even.next;
    if (odd.next) odd = odd.next;  // stop before odd becomes null
  }

  even.next = null;  // cut the rest of odd after even
  odd.next = evenHead;
  return head;
}
