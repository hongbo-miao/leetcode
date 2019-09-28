// Write a program to find the node at which the intersection of two singly linked lists begins.
//
//
// For example, the following two linked lists:
//
// A:          a1 → a2
//                    ↘
//                      c1 → c2 → c3
//                    ↗
// B:     b1 → b2 → b3
//
// begin to intersect at node c1.
//
// Notes:
//
// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/** 1) Hash map */
// time O(m + n)
// space O(m) or O(n)
function getIntersectionNode1(headA, headB) {
  let map = new Map();  // {} won't work here, since the key does not support ListNode

  while (headA) {
    map.set(headA, true);
    headA = headA.next;
  }

  while (headB) {
    if (map.has(headB)) return headB;
    headB = headB.next;
  }

  return null;
}

/** 2) Two pointers */
// time O(m + n)
// space O(1)
function getIntersectionNode(headA, headB) {
  let a = headA;
  let b = headB;

  // a === b happens at the connecting point or when they are both null at the end
  while (a !== b) {
    a = a ? a.next : headB;  // move a to head of b if at end
    b = b ? b.next : headA;  // move b to head of a if at end
  }

  return a;
}
