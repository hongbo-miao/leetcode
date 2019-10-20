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
// Time O(m + n)
// Space O(m) or O(n)
function getIntersectionNode1(headA, headB) {
  let map = new Map(); // {} does not work here, since the key does not support ListNode

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

/** 2) Two pointers (slow version) */
function getIntersectionNode2(headA, headB) {
  let a = headA;
  let b = headB;

  while (a !== b) {
    a = a ? a.next : headA; // no exchange which is why it is slow
    b = b ? b.next : headB;
  }

  return a;
}

/** 3) Two pointers (fast version) */
// Time O(m + n)
// Space O(1)
//
// To see why the above trick would work, consider the following two lists: A = {1,3,5,7,9,11} and B = {2,4,9,11},
// which are intersected at node '9'. Since B.length (=4) < A.length (=6), b would reach the end of the merged list
// first, because b traverses exactly 2 nodes less than a does. By redirecting b to head A, and a to head B, we now ask
// b to travel exactly 2 more nodes than a would. So in the second iteration, they are guaranteed to reach the
// intersection node at the same time.
function getIntersectionNode(headA, headB) {
  let a = headA;
  let b = headB;

  // a === b happens at the connecting point or when they are both null at the end which means no intersection
  while (a !== b) {
    a = a ? a.next : headB; // move a to head of b if at end
    b = b ? b.next : headA; // move b to head of a if at end
  }

  return a;
}
