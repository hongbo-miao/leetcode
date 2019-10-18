// Given a singly linked list, return a random node's value from the linked list. Each node must have the same probability of being chosen.
//
// Follow up:
// What if the linked list is extremely large and its length is unknown to you? Could you solve this efficiently without using extra space?
//
// Example:
//
// // Init a singly linked list [1,2,3].
// ListNode head = new ListNode(1);
// head.next = new ListNode(2);
// head.next.next = new ListNode(3);
// Solution solution = new Solution(head);
//
// // getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
// solution.getRandom();

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/** 1) Calculate the length first */
class Solution {
  /**
   * @param head The linked list's head.
   Note that the head is guaranteed to be not null, so it contains at least one node.
   * @param {ListNode} head
   */
  constructor(head) {
    this.head = head;

    let node = head;
    let len = 0;
    while (node != null) {
      node = node.next;
      len++;
    }
    this.len = len;
  }

  /**
   * Returns a random node's value.
   * @return {number}
   */
  getRandom() {
    let i = ~~(Math.random() * this.len);

    let node = this.head;
    while (i--) {
      node = node.next;
    }
    return node.val;
  }
}

/** 2) Reservoir sampling */
// https://www.youtube.com/watch?v=A1iwzSew5QY
//
// When we read the first node head, if the stream ListNode stops here, we can just return the head.val. The possibility is 1/1.
// When we read the second node, we can decide if we replace the result res or not. The possibility is 1/2. So we just generate a random number between 0 and 1, and check if it is equal to 1. If it is 1, replace res as the value of the current node, otherwise we don't touch res, so its value is still the value of head.
// When we read the third node, now the result res is one of value in the head or second node. We just decide if we replace the value of res as the value of current node(third node). The possibility of replacing it is 1/3, namely the possibility of we don't touch res is 2/3. So we just generate a random number between 0 ~ 2, and if the result is 2 we replace res.
// We can continue to do like this until the end of stream ListNode.
class Solution {
  constructor(head) {
    this.head = head;
  }

  getRandom() {
    let node = this.head;
    let res = node.val;
    for (let i = 1; node.next != null; i++) {
      node = node.next;
      const j = ~~(Math.random() * (i + 1));
      if (j === i) res = node.val;
    }
    return res;
  }
}
